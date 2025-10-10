// paye-analytics-server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting for analytics
const analyticsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: {
    error: 'Too many analytics requests from this IP, please slow down.'
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/allob_analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Analytics Event Schema
const analyticsEventSchema = new mongoose.Schema({
  // Event Information
  eventType: {
    type: String,
    required: true,
    enum: ['calculation', 'page_view', 'button_click', 'form_interaction', 'error']
  },
  eventAction: {
    type: String,
    required: true // e.g., 'calculate_paye', 'view_results', 'modify_inputs'
  },
  
  // Session Information
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String, // Anonymous user ID
    index: true
  },
  
  // Calculator Input Data
  calculatorInputs: {
    annualSalary: { type: Number },
    monthlyBonus: { type: Number },
    annualBonus: { type: Number },
    medicalAidContribution: { type: Number },
    medicalAidDependants: { type: Number },
    pensionContribution: { type: Number },
    pensionPercentage: { type: Number },
    travelAllowance: { type: Number },
    otherAllowances: { type: Number },
    uifOptOut: { type: Boolean, default: false },
    taxYear: { type: String },
    payFrequency: { type: String, enum: ['monthly', 'weekly', 'bi-weekly'] }
  },
  
  // Calculator Results Data
  calculatorResults: {
    grossMonthlyIncome: { type: Number },
    totalTaxableIncome: { type: Number },
    incomeTax: { type: Number },
    uif: { type: Number },
    totalDeductions: { type: Number },
    netMonthlyIncome: { type: Number },
    effectiveTaxRate: { type: Number },
    marginalTaxRate: { type: Number },
    annualTax: { type: Number },
    monthlyTax: { type: Number }
  },
  
  // User Environment Data
  userAgent: { type: String },
  platform: { type: String },
  screenResolution: { type: String },
  language: { type: String },
  timezone: { type: String },
  
  // Geographic Data (from IP - anonymized)
  country: { type: String },
  region: { type: String },
  city: { type: String },
  
  // Interaction Data
  timeOnPage: { type: Number }, // seconds
  calculationTime: { type: Number }, // milliseconds from input to calculation
  errorMessage: { type: String },
  
  // Metadata
  timestamp: { type: Date, default: Date.now, index: true },
  ipHash: { type: String }, // Hashed IP for privacy
  referrer: { type: String },
  pageUrl: { type: String }
}, {
  timestamps: true
});

// Create indexes for performance
analyticsEventSchema.index({ timestamp: -1 });
analyticsEventSchema.index({ eventType: 1, timestamp: -1 });
analyticsEventSchema.index({ sessionId: 1, timestamp: -1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

// Daily Summary Schema for aggregated data
const dailySummarySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  totalCalculations: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
  totalPageViews: { type: Number, default: 0 },
  averageTimeOnPage: { type: Number, default: 0 },
  topSalaryRanges: [{
    range: String,
    count: Number
  }],
  topCountries: [{
    country: String,
    count: Number
  }],
  errorRate: { type: Number, default: 0 },
  bounceRate: { type: Number, default: 0 }
}, {
  timestamps: true
});

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

// Validation middleware
const validateAnalyticsEvent = [
  body('eventType').isIn(['calculation', 'page_view', 'button_click', 'form_interaction', 'error']),
  body('eventAction').isLength({ min: 1, max: 100 }),
  body('sessionId').isLength({ min: 1, max: 100 }),
  body('calculatorInputs.annualSalary').optional().isNumeric().isFloat({ min: 0, max: 10000000 }),
  body('calculatorInputs.monthlyBonus').optional().isNumeric().isFloat({ min: 0, max: 1000000 }),
  body('timeOnPage').optional().isNumeric().isFloat({ min: 0, max: 86400 }) // Max 24 hours
];

// Utility functions
const hashIP = (ip) => {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT || 'allob-salt').digest('hex');
};

const getSalaryRange = (salary) => {
  if (!salary) return 'unknown';
  if (salary < 100000) return '0-100k';
  if (salary < 200000) return '100k-200k';
  if (salary < 300000) return '200k-300k';
  if (salary < 500000) return '300k-500k';
  if (salary < 750000) return '500k-750k';
  if (salary < 1000000) return '750k-1M';
  return '1M+';
};

// Analytics Event Tracking Endpoint
app.post('/api/analytics/track', analyticsLimiter, validateAnalyticsEvent, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
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
    } = req.body;

    // Get IP address (considering proxy headers)
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    req.ip;

    // Create analytics event
    const analyticsEvent = new AnalyticsEvent({
      eventType,
      eventAction,
      sessionId,
      userId: userId || sessionId, // Fallback to sessionId if no userId
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

    // Save event
    await analyticsEvent.save();

    // Update daily summary asynchronously
    updateDailySummary(analyticsEvent).catch(err => {
      console.error('Error updating daily summary:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Analytics event tracked successfully',
      eventId: analyticsEvent._id
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track analytics event'
    });
  }
});

// Batch Analytics Tracking (for multiple events)
app.post('/api/analytics/track-batch', analyticsLimiter, async (req, res) => {
  try {
    const { events } = req.body;
    
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Events array is required'
      });
    }

    if (events.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 50 events per batch'
      });
    }

    const clientIP = req.headers['x-forwarded-for'] || req.ip;
    const savedEvents = [];

    for (const eventData of events) {
      const analyticsEvent = new AnalyticsEvent({
        ...eventData,
        ipHash: hashIP(clientIP),
        timestamp: new Date()
      });
      
      await analyticsEvent.save();
      savedEvents.push(analyticsEvent._id);
    }

    res.status(200).json({
      success: true,
      message: `${savedEvents.length} analytics events tracked successfully`,
      eventIds: savedEvents
    });

  } catch (error) {
    console.error('Batch analytics tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track batch analytics events'
    });
  }
});

// Analytics Dashboard Data Endpoints
app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    const { startDate, endDate, period = '7d' } = req.query;
    
    // Calculate date range
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));

    // Get basic metrics
    const [
      totalCalculations,
      uniqueUsers,
      totalPageViews,
      averageTimeOnPage,
      topSalaryRanges,
      popularTimes,
      errorRate
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
      
      // Top salary ranges
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
        },
        {
          $limit: 10
        }
      ]),
      
      // Popular calculation times (by hour)
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
      ]),
      
      // Error rate
      Promise.all([
        AnalyticsEvent.countDocuments({
          eventType: 'error',
          timestamp: { $gte: start, $lte: end }
        }),
        AnalyticsEvent.countDocuments({
          timestamp: { $gte: start, $lte: end }
        })
      ]).then(([errors, total]) => total > 0 ? (errors / total) * 100 : 0)
    ]);

    // Get daily trend data
    const dailyTrend = await AnalyticsEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            eventType: '$eventType'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          events: {
            $push: {
              eventType: '$_id.eventType',
              count: '$count'
            }
          }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalCalculations,
          uniqueUsers,
          totalPageViews,
          averageTimeOnPage: Math.round(averageTimeOnPage),
          errorRate: Math.round(errorRate * 100) / 100
        },
        topSalaryRanges,
        popularTimes,
        dailyTrend,
        dateRange: {
          start: start.toISOString(),
          end: end.toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics dashboard data'
    });
  }
});

// Real-time Analytics Endpoint
app.get('/api/analytics/realtime', async (req, res) => {
  try {
    const last24Hours = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const lastHour = new Date(Date.now() - (60 * 60 * 1000));
    const last5Minutes = new Date(Date.now() - (5 * 60 * 1000));

    const [
      activeUsers,
      recentCalculations,
      hourlyCalculations,
      recentEvents
    ] = await Promise.all([
      // Active users (last 5 minutes)
      AnalyticsEvent.distinct('userId', {
        timestamp: { $gte: last5Minutes }
      }).then(users => users.length),
      
      // Recent calculations (last hour)
      AnalyticsEvent.countDocuments({
        eventType: 'calculation',
        timestamp: { $gte: lastHour }
      }),
      
      // Hourly calculations (last 24 hours)
      AnalyticsEvent.aggregate([
        {
          $match: {
            eventType: 'calculation',
            timestamp: { $gte: last24Hours }
          }
        },
        {
          $group: {
            _id: {
              hour: { $hour: '$timestamp' },
              date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.date': 1, '_id.hour': 1 }
        }
      ]),
      
      // Recent events (last 10)
      AnalyticsEvent.find({
        timestamp: { $gte: lastHour }
      })
      .select('eventType eventAction calculatorInputs.annualSalary timestamp country')
      .sort({ timestamp: -1 })
      .limit(10)
    ]);

    res.json({
      success: true,
      data: {
        activeUsers,
        recentCalculations,
        hourlyCalculations,
        recentEvents,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Real-time analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch real-time analytics data'
    });
  }
});

// Popular Salary Ranges Endpoint
app.get('/api/analytics/salary-ranges', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));

    const salaryRangeData = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'calculation',
          'calculatorInputs.annualSalary': { $exists: true, $gt: 0 },
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
          count: { $sum: 1 },
          averageSalary: { $avg: '$calculatorInputs.annualSalary' },
          averageTax: { $avg: '$calculatorResults.annualTax' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: salaryRangeData
    });

  } catch (error) {
    console.error('Salary ranges analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch salary range analytics'
    });
  }
});

// User Journey Analytics
app.get('/api/analytics/user-journey', async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'SessionId is required'
      });
    }

    const userJourney = await AnalyticsEvent.find({ sessionId })
      .sort({ timestamp: 1 })
      .select('eventType eventAction calculatorInputs calculatorResults timestamp timeOnPage');

    res.json({
      success: true,
      data: {
        sessionId,
        journey: userJourney,
        totalEvents: userJourney.length,
        duration: userJourney.length > 0 ? 
          new Date(userJourney[userJourney.length - 1].timestamp) - new Date(userJourney[0].timestamp) : 0
      }
    });

  } catch (error) {
    console.error('User journey analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user journey data'
    });
  }
});

// Update daily summary function
async function updateDailySummary(event) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const summary = await DailySummary.findOneAndUpdate(
      { date: today },
      {
        $inc: {
          totalCalculations: event.eventType === 'calculation' ? 1 : 0,
          totalPageViews: event.eventType === 'page_view' ? 1 : 0
        }
      },
      { upsert: true, new: true }
    );

    // Update unique users count
    const uniqueUsers = await AnalyticsEvent.distinct('userId', {
      timestamp: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });
    
    summary.uniqueUsers = uniqueUsers.length;
    await summary.save();

  } catch (error) {
    console.error('Error updating daily summary:', error);
  }
}

// Health check endpoint
app.get('/api/analytics/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'AlloB PAYE Analytics API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`AlloB PAYE Analytics API server running on port ${PORT}`);
  console.log(`Database connection: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});

module.exports = app;