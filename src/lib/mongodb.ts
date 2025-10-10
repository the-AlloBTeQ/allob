// lib/mongodb.ts - MongoDB connection and models for Next.js serverless
import mongoose, { Document, Schema, Model } from 'mongoose';

// Global mongoose instance for serverless
declare global {
  var mongoose: any;
}

interface IAnalyticsEvent extends Document {
  eventType: 'calculation' | 'page_view' | 'button_click' | 'form_interaction' | 'error';
  eventAction: string;
  sessionId: string;
  userId?: string;
  calculatorInputs?: {
    annualSalary?: number;
    monthlyBonus?: number;
    annualBonus?: number;
    medicalAidContribution?: number;
    medicalAidDependants?: number;
    pensionContribution?: number;
    pensionPercentage?: number;
    travelAllowance?: number;
    otherAllowances?: number;
    uifOptOut?: boolean;
    taxYear?: string;
    payFrequency?: 'monthly' | 'weekly' | 'bi-weekly';
  };
  calculatorResults?: {
    grossMonthlyIncome?: number;
    totalTaxableIncome?: number;
    incomeTax?: number;
    uif?: number;
    totalDeductions?: number;
    netMonthlyIncome?: number;
    effectiveTaxRate?: number;
    marginalTaxRate?: number;
    annualTax?: number;
    monthlyTax?: number;
  };
  userAgent?: string;
  platform?: string;
  screenResolution?: string;
  language?: string;
  timezone?: string;
  country?: string;
  region?: string;
  city?: string;
  timeOnPage?: number;
  calculationTime?: number;
  errorMessage?: string;
  timestamp: Date;
  ipHash?: string;
  referrer?: string;
  pageUrl?: string;
}

const analyticsEventSchema = new Schema<IAnalyticsEvent>({
  eventType: {
    type: String,
    required: true,
    enum: ['calculation', 'page_view', 'button_click', 'form_interaction', 'error']
  },
  eventAction: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
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
  userAgent: { type: String },
  platform: { type: String },
  screenResolution: { type: String },
  language: { type: String },
  timezone: { type: String },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  timeOnPage: { type: Number },
  calculationTime: { type: Number },
  errorMessage: { type: String },
  timestamp: { type: Date, default: Date.now, index: true },
  ipHash: { type: String },
  referrer: { type: String },
  pageUrl: { type: String }
}, {
  timestamps: true
});

// Create indexes for performance
analyticsEventSchema.index({ timestamp: -1 });
analyticsEventSchema.index({ eventType: 1, timestamp: -1 });
analyticsEventSchema.index({ sessionId: 1, timestamp: -1 });

interface IDailySummary extends Document {
  date: Date;
  totalCalculations: number;
  uniqueUsers: number;
  totalPageViews: number;
  averageTimeOnPage: number;
  topSalaryRanges: Array<{ range: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  errorRate: number;
  bounceRate: number;
}

const dailySummarySchema = new Schema<IDailySummary>({
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

// Serverless connection management
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Export models - use existing model if already compiled
export const AnalyticsEvent: Model<IAnalyticsEvent> = 
  mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>('AnalyticsEvent', analyticsEventSchema);

export const DailySummary: Model<IDailySummary> = 
  mongoose.models.DailySummary || mongoose.model<IDailySummary>('DailySummary', dailySummarySchema);

// Utility function to disconnect (useful for testing)
export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('Disconnected from MongoDB');
  }
}