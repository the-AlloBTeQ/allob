// pages/api/analytics/track.ts - Next.js API Route
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, AnalyticsEvent } from '../../../lib/mongodb';
import { validateAnalyticsEvent, hashIP } from '../../../lib/validation';
import { rateLimit } from '../../../lib/rate-limit';
import type { 
  AnalyticsEventRequest, 
  AnalyticsResponse 
} from '../../../types/api';

// Configure rate limiting
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse>
) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
    return;
  }

  try {
    // Rate limiting
    await limiter.check(res, 100, getClientIP(req)); // 100 requests per interval per IP
  } catch {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP'
    });
    return;
  }

  try {
    // Validate request body
    const validationResult = validateAnalyticsEvent(req.body);
    if (!validationResult.valid) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.errors,
        message: 'Invalid request data'
      });
      return;
    }

    const {
      eventType,
      eventAction,
      sessionId,
      userId,
      calculatorInputs,
      calculatorResults,
      userAgent,
      platform,
      screenResolution,
      language,
      timezone,
      timeOnPage,
      calculationTime,
      errorMessage,
      referrer,
      pageUrl
    }: AnalyticsEventRequest = req.body;

    // Connect to database
    await connectToDatabase();

    // Get client IP
    const clientIP = getClientIP(req);

    // Create analytics event
    const analyticsEvent = new AnalyticsEvent({
      eventType,
      eventAction,
      sessionId,
      userId: userId || sessionId,
      calculatorInputs: calculatorInputs || {},
      calculatorResults: calculatorResults || {},
      userAgent,
      platform,
      screenResolution,
      language,
      timezone,
      timeOnPage,
      calculationTime,
      errorMessage,
      referrer,
      pageUrl,
      ipHash: hashIP(clientIP),
      timestamp: new Date()
    });

    // Save to database
    const savedEvent = await analyticsEvent.save();

    res.status(200).json({
      success: true,
      message: 'Analytics event tracked successfully',
      eventId: (savedEvent as { _id: { toString: () => string } })._id.toString()
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to track analytics event'
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