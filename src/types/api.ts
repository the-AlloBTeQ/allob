export type PayeCalculatorInputs = {
  annualSalary: number;
  monthlyBonus: number;
  medicalAidContribution: number;
  pensionPercentage: number;
  uifOptOut: boolean;
  taxYear: string;
};

export type PayeCalculatorResults = {
  grossMonthlyIncome: number;
  monthlyTax: number;
  uif: number;
  netMonthlyIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  annualTax: number;
};

export interface AnalyticsEventRequest {
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
  timeOnPage?: number;
  calculationTime?: number;
  errorMessage?: string;
  referrer?: string;
  pageUrl?: string;
}

export interface AnalyticsBatchRequest {
  events: AnalyticsEventRequest[];
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  eventId?: string;
  eventIds?: string[];
  error?: string;
  details?: string[] | any;
}

export interface DashboardData {
  success: boolean;
  data: {
    summary: {
      totalCalculations: number;
      uniqueUsers: number;
      totalPageViews: number;
      averageTimeOnPage: number;
      errorRate: number;
    };
    topSalaryRanges: Array<{
      _id: string;
      count: number;
    }>;
    popularTimes: Array<{
      _id: number;
      count: number;
    }>;
    dailyTrend: Array<{
      _id: string;
      events: Array<{
        eventType: string;
        count: number;
      }>;
    }>;
    dateRange: {
      start: string;
      end: string;
    };
  };
}

export interface RealtimeAnalytics {
  success: boolean;
  data: {
    activeUsers: number;
    recentCalculations: number;
    hourlyCalculations: Array<{
      _id: {
        hour: number;
        date: string;
      };
      count: number;
    }>;
    recentEvents: Array<{
      eventType: string;
      eventAction: string;
      calculatorInputs?: {
        annualSalary?: number;
      };
      timestamp: string;
      country?: string;
    }>;
    timestamp: string;
  };
}

export interface SalaryRangeData {
  success: boolean;
  data: Array<{
    _id: string;
    count: number;
    averageSalary: number;
    averageTax: number;
  }>;
}

export interface UserJourneyData {
  success: boolean;
  data: {
    sessionId: string;
    journey: Array<{
      eventType: string;
      eventAction: string;
      calculatorInputs?: any;
      calculatorResults?: any;
      timestamp: string;
      timeOnPage?: number;
    }>;
    totalEvents: number;
    duration: number;
  };
}

// === Checkout API Types ===

export interface CustomerData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  businessType: string;
  industry: string;
  registrationNumber?: string;
  yearsInBusiness?: string;
  employees?: string;
  streetAddress?: string;
  city: string;
  province: string;
  postalCode?: string;
  servicesNeeded?: string[];
  monthlyTurnover?: string;
  urgency?: 'immediate' | 'within_month' | 'within_quarter' | 'flexible';
  currentAccountant?: string;
  preferredContactTime?: string;
  additionalRequirements?: string;
  referralSource?: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
}

export interface CheckoutRequest {
  package: ServicePackage;
  customerData: CustomerData;
  timestamp: string;
}

export interface CheckoutResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[] | any;
  data?: {
    submissionId: string;
    salesEmailSent: boolean;
    customerEmailSent: boolean;
    packageName: string;
    customerName: string;
    timestamp: string;
  };
}

// === API Error Types ===

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  details?: string[] | any;
  status?: number;
}

export interface ApiValidationError extends ApiError {
  details: Array<{
    field: string;
    message: string;
  }>;
}

// === Health Check Types ===

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  service: string;
  database?: 'connected' | 'disconnected';
}

// === Common Types ===

export type ApiResponse<T> = T | ApiError;

// === API Client Configuration ===

export interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  apiKey?: string;
}

// === Request/Response Interceptor Types ===

export interface RequestInterceptor {
  (config: RequestInit): RequestInit | Promise<RequestInit>;
}

export interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>;
}

// === Query Parameters ===

export interface DashboardQueryParams {
  startDate?: string;
  endDate?: string;
  period?: '1d' | '7d' | '30d' | '90d' | '1y';
}

export interface SalaryRangeQueryParams {
  startDate?: string;
  endDate?: string;
}

export interface UserJourneyQueryParams {
  sessionId: string;
}

// === Database Model Types (for backend) ===

export interface AnalyticsEventModel {
  _id: string;
  eventType: string;
  eventAction: string;
  sessionId: string;
  userId: string;
  calculatorInputs?: Record<string, any>;
  calculatorResults?: Record<string, any>;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface DailySummaryModel {
  _id: string;
  date: Date;
  totalCalculations: number;
  uniqueUsers: number;
  totalPageViews: number;
  averageTimeOnPage: number;
  topSalaryRanges: Array<{
    range: string;
    count: number;
  }>;
  topCountries: Array<{
    country: string;
    count: number;
  }>;
  errorRate: number;
  bounceRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// === Utility Types ===

export type EventType = 'calculation' | 'page_view' | 'button_click' | 'form_interaction' | 'error';
export type PayFrequency = 'monthly' | 'weekly' | 'bi-weekly';
export type UrgencyLevel = 'immediate' | 'within_month' | 'within_quarter' | 'flexible';
export type DatabaseConnectionStatus = 'connected' | 'disconnected' | 'connecting';

// === Environment Variables Types ===

export interface EnvironmentConfig {
  VITE_API_URL?: string;
  VITE_ANALYTICS_API_URL?: string;
  VITE_CHECKOUT_API_URL?: string;
  VITE_ENABLE_ANALYTICS?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}