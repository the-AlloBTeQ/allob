// pages/api/analytics/track-batch.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, AnalyticsEvent } from '../../../lib/mongodb';
import { hashIP } from '../../../lib/validation';
import { rateLimit } from '../../../lib/rate-limit';
import { corsHeaders } from '../../../lib/cors';
import type { 
  AnalyticsBatchRequest 
} from '../../../types/api';
import type { 
  AnalyticsResponse 
} from '../../../types/api';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse>
) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value as string | number | readonly string[]);
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
    return;
  }

  try {
    await limiter.check(res, 50, getClientIP(req)); // Lower limit for batch operations
  } catch {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      message: 'Too many batch requests from this IP'
    });
    return;
  }

  try {
    const { events }: AnalyticsBatchRequest = req.body;
    
    if (!Array.isArray(events) || events.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Events array is required',
        message: 'Invalid request format'
      });
      return;
    }

    if (events.length > 50) {
      res.status(400).json({
        success: false,
        error: 'Maximum 50 events per batch',
        message: 'Batch size exceeded'
      });
      return;
    }

    await connectToDatabase();
    
    const clientIP = getClientIP(req);
    const savedEventIds: string[] = [];

    // Process events in batch
    for (const eventData of events) {
      try {
        const analyticsEvent = new AnalyticsEvent({
          ...eventData,
          userId: eventData.userId || eventData.sessionId,
          ipHash: hashIP(clientIP),
          timestamp: new Date()
        });
        
        const savedEvent = await analyticsEvent.save();
        savedEventIds.push((savedEvent._id as string).toString());
      } catch (error) {
        console.error('Error saving individual event:', error);
        // Continue processing other events
      }
    }

    res.status(200).json({
      success: true,
      message: `${savedEventIds.length} analytics events tracked successfully`,
      eventIds: savedEventIds
    });

  } catch (error) {
    console.error('Batch analytics tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track batch analytics events',
      message: 'Internal server error'
    });
  }
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  
  if (forwarded) {
    return typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0];
  }
  if (realIP) {
    return typeof realIP === 'string' ? realIP : realIP[0];
  }
  return req.socket.remoteAddress || '';
}