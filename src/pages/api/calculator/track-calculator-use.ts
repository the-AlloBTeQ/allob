import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req as any).method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sessionId, timestamp, userAgent, incomeRange, ageRange, hasResult } = req.body;

    // Store the analytics data
    await prisma.calculatorAnalytics.create({
      data: {
        sessionId,
        timestamp,
        userAgent,
        incomeRange,
        ageRange,
        hasResult
      }
    });

    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to store analytics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}