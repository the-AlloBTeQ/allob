// lib/validation.ts - Validation utilities for Next.js serverless functions
import crypto from 'crypto';
import { z } from 'zod';

// Validation result interface
interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

// Analytics event validation schema
const analyticsEventSchema = z.object({
  eventType: z.enum(['calculation', 'page_view', 'button_click', 'form_interaction', 'error']),
  eventAction: z.string().min(1).max(100),
  sessionId: z.string().min(1).max(100),
  userId: z.string().optional(),
  calculatorInputs: z.object({
    annualSalary: z.number().min(0).max(10000000).optional(),
    monthlyBonus: z.number().min(0).max(1000000).optional(),
    annualBonus: z.number().min(0).max(1000000).optional(),
    medicalAidContribution: z.number().min(0).max(100000).optional(),
    medicalAidDependants: z.number().min(0).max(20).optional(),
    pensionContribution: z.number().min(0).max(100000).optional(),
    pensionPercentage: z.number().min(0).max(100).optional(),
    travelAllowance: z.number().min(0).max(100000).optional(),
    otherAllowances: z.number().min(0).max(100000).optional(),
    uifOptOut: z.boolean().optional(),
    taxYear: z.string().optional(),
    payFrequency: z.enum(['monthly', 'weekly', 'bi-weekly']).optional()
  }).optional(),
  calculatorResults: z.object({
    grossMonthlyIncome: z.number().optional(),
    totalTaxableIncome: z.number().optional(),
    incomeTax: z.number().optional(),
    uif: z.number().optional(),
    totalDeductions: z.number().optional(),
    netMonthlyIncome: z.number().optional(),
    effectiveTaxRate: z.number().optional(),
    marginalTaxRate: z.number().optional(),
    annualTax: z.number().optional(),
    monthlyTax: z.number().optional()
  }).optional(),
  userAgent: z.string().optional(),
  platform: z.string().optional(),
  screenResolution: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  timeOnPage: z.number().min(0).max(86400).optional(), // Max 24 hours
  calculationTime: z.number().min(0).max(60000).optional(), // Max 60 seconds
  errorMessage: z.string().max(500).optional(),
  referrer: z.string().optional(),
  pageUrl: z.string().optional()
});

// Customer data validation schema
const customerDataSchema = z.object({
  businessName: z.string().min(1).max(200),
  contactPerson: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^(\+27|0)[0-9]{9}$/, 'Invalid South African phone number'),
  alternatePhone: z.string().regex(/^(\+27|0)[0-9]{9}$/).optional(),
  businessType: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  registrationNumber: z.string().max(50).optional(),
  yearsInBusiness: z.string().max(50).optional(),
  employees: z.string().max(50).optional(),
  streetAddress: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  province: z.string().min(1).max(100),
  postalCode: z.string().max(20).optional(),
  servicesNeeded: z.array(z.string()).optional(),
  monthlyTurnover: z.string().max(100).optional(),
  urgency: z.enum(['immediate', 'within_month', 'within_quarter', 'flexible']).optional(),
  currentAccountant: z.string().max(200).optional(),
  preferredContactTime: z.string().max(100).optional(),
  additionalRequirements: z.string().max(1000).optional(),
  referralSource: z.string().max(200).optional()
});

// Service package validation schema
const servicePackageSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  popular: z.boolean().optional()
});

// Checkout validation schema
const checkoutSchema = z.object({
  package: servicePackageSchema,
  customerData: customerDataSchema,
  timestamp: z.string()
});

// Validate analytics event
export function validateAnalyticsEvent(data: any): ValidationResult {
  try {
    analyticsEventSchema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: (error as z.ZodError).issues.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
      } as ValidationResult;
    }
    return {
      valid: false,
      errors: ['Invalid analytics event data']
    };
  }
}

// Validate checkout data
export function validateCheckoutData(data: any): ValidationResult {
  try {
    checkoutSchema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: (error as z.ZodError).issues.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return {
      valid: false,
      errors: ['Invalid checkout data']
    };
  }
}

// Legacy validation functions for backwards compatibility
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^(\+27|0)[0-9]{9}$/;
  return re.test(phone.replace(/\s/g, ''));
};

// Hash IP address for privacy
export const hashIP = (ip: string): string => {
  const salt = process.env.IP_SALT || 'allob-default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex');
};

// Get salary range for analytics
export const getSalaryRange = (salary: number | undefined): string => {
  if (!salary) return 'unknown';
  if (salary < 100000) return '0-100k';
  if (salary < 200000) return '100k-200k';
  if (salary < 300000) return '200k-300k';
  if (salary < 500000) return '300k-500k';
  if (salary < 750000) return '500k-750k';
  if (salary < 1000000) return '750k-1M';
  return '1M+';
};

// Sanitize string input
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Validate environment variables
export const validateEnvironment = (): void => {
  const required = ['MONGODB_URI'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Rate limiting key generator
export const generateRateLimitKey = (ip: string, endpoint: string): string => {
  return `${endpoint}:${hashIP(ip)}`;
};