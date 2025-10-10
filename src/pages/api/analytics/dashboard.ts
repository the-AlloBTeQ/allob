// pages/api/dashboard.ts - Main Dashboard API for AlloB Business Intelligence
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, AnalyticsEvent } from '../../../lib/mongodb';
import { corsHeaders, setCorsHeaders } from '../../../lib/cors';
import { rateLimit } from '../../../lib/rate-limit';
import { validateEnvironment } from '../../../lib/validation';

interface DashboardMetrics {
  analytics: {
    totalCalculations: number;
    uniqueUsers: number;
    totalPageViews: number;
    averageTimeOnPage: number;
    errorRate: number;
    topSalaryRanges: Array<{
      range: string;
      count: number;
      percentage: number;
    }>;
    recentActivity: Array<{
      timestamp: string;
      eventType: string;
      sessionId: string;
      salaryRange?: string;
    }>;
    conversionMetrics: {
      calculationToContactRate: number;
      averageSessionDuration: number;
      bounceRate: number;
    };
  };
  business: {
    totalLeads: number;
    recentLeads: Array<{
      businessName: string;
      contactPerson: string;
      package: string;
      urgency: string;
      timestamp: string;
    }>;
    leadsByPackage: Array<{
      package: string;
      count: number;
    }>;
    leadsByIndustry: Array<{
      industry: string;
      count: number;
    }>;
    leadsByUrgency: Array<{
      urgency: string;
      count: number;
    }>;
  };
  performance: {
    apiResponseTimes: {
      average: number;
      p95: number;
      errors: number;
    };
    calculationPerformance: {
      averageCalculationTime: number;
      slowCalculations: number;
      errorCalculations: number;
    };
  };
  insights: {
    popularCalculationTimes: Array<{
      hour: number;
      count: number;
    }>;
    userBehaviorPatterns: {
      averageCalculationsPerSession: number;
      returnUserRate: number;
      mobileUsageRate: number;
    };
    businessGrowth: {
      weekOverWeekGrowth: number;
      monthOverMonthGrowth: number;
      leadQualityScore: number;
    };
  };
}

interface DashboardResponse {
  success: boolean;
  data?: DashboardMetrics;
  error?: string;
  message?: string;
  timestamp: string;
  cacheStatus?: 'hit' | 'miss' | 'refresh';
}

// Rate limiter for dashboard
const dashboardLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 200,
});

// Simple cache for dashboard data (consider Redis in production)
interface CacheEntry {
  data: DashboardMetrics;
  timestamp: number;
  expiresAt: number;
}

const dashboardCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardResponse>
) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only GET requests are allowed',
      timestamp: new Date().toISOString()
    });
    return;
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    try {
      await dashboardLimiter.check(res, 30, clientIP); // 30 requests per minute per IP
    } catch {
      res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many dashboard requests',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Check cache first
    const cacheKey = `dashboard:${req.query.period || '7d'}:${req.query.refresh || 'false'}`;
    const now = Date.now();
    const cachedData = dashboardCache.get(cacheKey);
    
    if (cachedData && now < cachedData.expiresAt && req.query.refresh !== 'true') {
      res.status(200).json({
        success: true,
        data: cachedData.data,
        timestamp: new Date().toISOString(),
        cacheStatus: 'hit'
      });
      return;
    }

    // Validate environment
    validateEnvironment();

    // Connect to database
    await connectToDatabase();

    // Calculate date ranges
    const { startDate, endDate, period = '7d' } = req.query;
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : getStartDateFromPeriod(period as string);
    
    // Previous period for comparison
    const periodLength = end.getTime() - start.getTime();

    // Fetch all data in parallel
    const [
      analyticsData,
      businessData,
      performanceData,
      insightsData
    ] = await Promise.all([
      getAnalyticsMetrics(start, end),
      getBusinessMetrics(start, end),
      getPerformanceMetrics(start, end),
      getInsightsData(start, end)
    ]);

    const dashboardData: DashboardMetrics = {
      analytics: analyticsData,
      business: businessData,
      performance: performanceData,
      insights: insightsData
    };

    // Cache the result
    dashboardCache.set(cacheKey, {
      data: dashboardData,
      timestamp: now,
      expiresAt: now + CACHE_TTL
    });

    res.status(200).json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString(),
      cacheStatus: 'refresh'
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch dashboard data',
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to get start date from period
function getStartDateFromPeriod(period: string): Date {
  const now = new Date();
  switch (period) {
    case '1d': return new Date(now.getTime() - (1 * 24 * 60 * 60 * 1000));
    case '7d': return new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    case '30d': return new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    case '90d': return new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
    case '1y': return new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
    default: return new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  }
}

// Get analytics metrics
async function getAnalyticsMetrics(start: Date, end: Date) {
  const [
    totalCalculations,
    uniqueUsers,
    totalPageViews,
    averageTimeOnPage,
    errorRate,
    topSalaryRanges,
    recentActivity,
    conversionMetrics
  ] = await Promise.all([
    // Total calculations
    AnalyticsEvent.countDocuments({
      eventType: 'calculation',
      timestamp: { $gte: start, $lte: end }
    }),
    
    // Unique users
    AnalyticsEvent.distinct('userId', {
      timestamp: { $gte: start, $lte: end }
    }).then(users => users.length),
    
    // Total page views
    AnalyticsEvent.countDocuments({
      eventType: 'page_view',
      timestamp: { $gte: start, $lte: end }
    }),
    
    // Average time on page
    AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'page_view',
          timeOnPage: { $exists: true, $gt: 0 },
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          averageTime: { $avg: '$timeOnPage' }
        }
      }
    ]).then(result => result[0]?.averageTime || 0),
    
    // Error rate
    Promise.all([
      AnalyticsEvent.countDocuments({
        eventType: 'error',
        timestamp: { $gte: start, $lte: end }
      }),
      AnalyticsEvent.countDocuments({
        timestamp: { $gte: start, $lte: end }
      })
    ]).then(([errors, total]) => total > 0 ? (errors / total) * 100 : 0),
    
    // Top salary ranges with percentages
    AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'calculation',
          'calculatorInputs.annualSalary': { $exists: true },
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $addFields: {
          salaryRange: {
            $switch: {
              branches: [
                { case: { $lt: ['$calculatorInputs.annualSalary', 100000] }, then: '0-100k' },
                { case: { $lt: ['$calculatorInputs.annualSalary', 200000] }, then: '100k-200k' },
                { case: { $lt: ['$calculatorInputs.annualSalary', 300000] }, then: '200k-300k' },
                { case: { $lt: ['$calculatorInputs.annualSalary', 500000] }, then: '300k-500k' },
                { case: { $lt: ['$calculatorInputs.annualSalary', 750000] }, then: '500k-750k' },
                { case: { $lt: ['$calculatorInputs.annualSalary', 1000000] }, then: '750k-1M' }
              ],
              default: '1M+'
            }
          }
        }
      },
      {
        $group: {
          _id: '$salaryRange',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]).then(results => {
      const total = results.reduce((sum, item) => sum + item.count, 0);
      return results.map(item => ({
        range: item._id,
        count: item.count,
        percentage: total > 0 ? Math.round((item.count / total) * 100) : 0
      }));
    }),
    
    // Recent activity
    AnalyticsEvent.find({
      timestamp: { $gte: start, $lte: end }
    })
    .select('timestamp eventType sessionId calculatorInputs.annualSalary')
    .sort({ timestamp: -1 })
    .limit(20)
    .then(events => events.map(event => ({
      timestamp: event.timestamp.toISOString(),
      eventType: event.eventType,
      sessionId: event.sessionId,
      salaryRange: event.calculatorInputs?.annualSalary ? getSalaryRange(event.calculatorInputs.annualSalary) : undefined
    }))),
    
    // Conversion metrics
    Promise.all([
      AnalyticsEvent.aggregate([
        {
          $match: {
            timestamp: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: '$sessionId',
            events: { $push: '$eventType' },
            duration: {
              $max: {
                $subtract: ['$timestamp', { $min: '$timestamp' }]
              }
            }
          }
        }
      ]),
      AnalyticsEvent.countDocuments({
        eventType: 'page_view',
        timeOnPage: { $lt: 30 }, // Less than 30 seconds = bounce
        timestamp: { $gte: start, $lte: end }
      })
    ]).then(([sessions, bounces]) => {
      const totalSessions = sessions.length;
      const calculationSessions = sessions.filter((s: any) => s.events.includes('calculation')).length;
      const averageSessionDuration = sessions.reduce((sum: number, s: any) => sum + (s.duration || 0), 0) / Math.max(totalSessions, 1);
      
      return {
        calculationToContactRate: totalSessions > 0 ? Math.round((calculationSessions / totalSessions) * 100) : 0,
        averageSessionDuration: Math.round(averageSessionDuration / 1000), // Convert to seconds
        bounceRate: totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 0
      };
    })
  ]);

  return {
    totalCalculations,
    uniqueUsers,
    totalPageViews,
    averageTimeOnPage: Math.round(averageTimeOnPage),
    errorRate: Math.round(errorRate * 100) / 100,
    topSalaryRanges,
    recentActivity,
    conversionMetrics
  };
}

// Get business/lead metrics
async function getBusinessMetrics(start: Date, end: Date) {
  // Since checkout data might be stored differently, this is a placeholder
  // You would replace this with actual checkout/lead data queries
  return {
    totalLeads: 0,
    recentLeads: [],
    leadsByPackage: [
      { package: 'Starter', count: 5 },
      { package: 'Professional', count: 12 },
      { package: 'Enterprise', count: 3 }
    ],
    leadsByIndustry: [
      { industry: 'Technology', count: 8 },
      { industry: 'Retail', count: 6 },
      { industry: 'Services', count: 6 }
    ],
    leadsByUrgency: [
      { urgency: 'immediate', count: 4 },
      { urgency: 'within_month', count: 10 },
      { urgency: 'within_quarter', count: 4 },
      { urgency: 'flexible', count: 2 }
    ]
  };
}

// Get performance metrics
async function getPerformanceMetrics(start: Date, end: Date) {
  const [
    calculationTimes,
    errorCount
  ] = await Promise.all([
    AnalyticsEvent.find({
      eventType: 'calculation',
      calculationTime: { $exists: true },
      timestamp: { $gte: start, $lte: end }
    }).select('calculationTime'),
    
    AnalyticsEvent.countDocuments({
      eventType: 'error',
      timestamp: { $gte: start, $lte: end }
    })
  ]);

  const times = calculationTimes.map(event => event.calculationTime || 0);
  const avgCalculationTime = times.length > 0 ? times.reduce((sum, time) => sum + time, 0) / times.length : 0;
  const p95CalculationTime = times.length > 0 ? times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)] : 0;
  const slowCalculations = times.filter(time => time > 2000).length; // Over 2 seconds

  return {
    apiResponseTimes: {
      average: Math.round(avgCalculationTime),
      p95: Math.round(p95CalculationTime),
      errors: errorCount
    },
    calculationPerformance: {
      averageCalculationTime: Math.round(avgCalculationTime),
      slowCalculations,
      errorCalculations: errorCount
    }
  };
}

// Get business insights
async function getInsightsData(start: Date, end: Date) {
  const [
    popularTimes,
    userBehavior
  ] = await Promise.all([
    // Popular calculation times
    AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'calculation',
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]).then(results => results.map(item => ({
      hour: item._id,
      count: item.count
    }))),
    
    // User behavior patterns
    AnalyticsEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$sessionId',
          calculations: { $sum: { $cond: [{ $eq: ['$eventType', 'calculation'] }, 1, 0] } },
          pageViews: { $sum: { $cond: [{ $eq: ['$eventType', 'page_view'] }, 1, 0] } },
          platform: { $first: '$platform' },
          userId: { $first: '$userId' }
        }
      }
    ]).then(sessions => {
      const totalSessions = sessions.length;
      const totalCalculations = sessions.reduce((sum: number, s: any) => sum + s.calculations, 0);
      const mobileUsers = sessions.filter((s: any) => s.platform && s.platform.includes('Mobile')).length;
      const uniqueUsers = new Set(sessions.map((s: any) => s.userId)).size;
      
      return {
        averageCalculationsPerSession: totalSessions > 0 ? Math.round((totalCalculations / totalSessions) * 100) / 100 : 0,
        returnUserRate: totalSessions > 0 ? Math.round((uniqueUsers / totalSessions) * 100) : 0,
        mobileUsageRate: totalSessions > 0 ? Math.round((mobileUsers / totalSessions) * 100) : 0
      };
    })
  ]);

  // Calculate growth metrics
  const currentPeriodCalculations = await AnalyticsEvent.countDocuments({
    eventType: 'calculation',
    timestamp: { $gte: start, $lte: end }
  });
  
  const previousPeriodCalculations = await AnalyticsEvent.countDocuments({
    eventType: 'calculation',
    timestamp: { $gte: new Date(start.getTime() - (end.getTime() - start.getTime())), $lte: start }
  });

  const weekOverWeekGrowth = previousPeriodCalculations > 0 
    ? Math.round(((currentPeriodCalculations - previousPeriodCalculations) / previousPeriodCalculations) * 100)
    : 0;

  return {
    popularCalculationTimes: popularTimes,
    userBehaviorPatterns: userBehavior,
    businessGrowth: {
      weekOverWeekGrowth,
      monthOverMonthGrowth: weekOverWeekGrowth, // Simplified for now
      leadQualityScore: 75 // Placeholder - would calculate based on conversion metrics
    }
  };
}

// Helper function to get client IP
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  
  if (forwarded) {
    return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded[0];
  }
  if (realIP) {
    return typeof realIP === 'string' ? realIP : realIP[0];
  }
  return req.socket?.remoteAddress || 'unknown';
}

// Helper function to get salary range
function getSalaryRange(salary: number): string {
  if (salary < 100000) return '0-100k';
  if (salary < 200000) return '100k-200k';
  if (salary < 300000) return '200k-300k';
  if (salary < 500000) return '300k-500k';
  if (salary < 750000) return '500k-750k';
  if (salary < 1000000) return '750k-1M';
  return '1M+';
}

// Configuration for different cache strategies
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '8mb',
  },
};