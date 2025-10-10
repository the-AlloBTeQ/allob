// analytics-tracker.ts - Frontend Analytics Integration for PAYE Calculator
import { useEffect, useState } from 'react';

export interface PayeCalculatorInputs {
  annualSalary: number;
  monthlyBonus: number;
  annualBonus: number;
  medicalAidContribution: number;
  medicalAidDependants: number;
  pensionContribution: number;
  pensionPercentage: number;
  travelAllowance: number;
  otherAllowances: number;
  uifOptOut: boolean;
  taxYear: string;
  payFrequency: 'monthly' | 'weekly' | 'bi-weekly';
}

export interface PayeCalculatorResults {
  grossMonthlyIncome: number;
  totalTaxableIncome: number;
  incomeTax: number;
  uif: number;
  totalDeductions: number;
  netMonthlyIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  annualTax: number;
  monthlyTax: number;
}

export interface EnvironmentData {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  timezone: string;
  pageUrl: string;
  referrer: string;
}

export interface AnalyticsEvent {
  eventType: 'calculation' | 'page_view' | 'button_click' | 'form_interaction' | 'error' | 'timing';
  eventAction: string;
  sessionId: string;
  userId: string;
  timestamp: string;
  calculatorInputs?: Partial<PayeCalculatorInputs>;
  calculatorResults?: Partial<PayeCalculatorResults>;
  buttonContext?: Record<string, any>;
  fieldName?: string;
  fieldValue?: number | null;
  interactionType?: string;
  timeOnPage?: number;
  errorMessage?: string;
  errorContext?: Record<string, any>;
  timeSpent?: number;
  calculationTime?: number;
  pageUrl?: string;
}

export interface PayeAnalyticsConfig {
  apiUrl?: string;
  enabled?: boolean;
  batchSize?: number;
  flushInterval?: number;
}

export class PayeAnalyticsTracker {
  private apiUrl: string;
  private enabled: boolean;
  private sessionId: string;
  private userId: string;
  private batchSize: number;
  private flushInterval: number;
  private eventQueue: AnalyticsEvent[];
  private pageStartTime: number;
  private flushIntervalId: NodeJS.Timeout | null = null;

  constructor(config: PayeAnalyticsConfig = {}) {
    this.apiUrl = config.apiUrl || import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:3002';
    this.enabled = config.enabled !== false;
    this.sessionId = this.generateSessionId();
    this.userId = this.generateUserId();
    this.batchSize = config.batchSize || 10;
    this.flushInterval = config.flushInterval || 30000;
    this.eventQueue = [];
    this.pageStartTime = Date.now();
    
    this.init();
  }

  private init(): void {
    if (!this.enabled) return;
    
    this.trackPageView();
    
    this.flushIntervalId = setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
    
    window.addEventListener('beforeunload', () => {
      this.flushEvents(true);
    });
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flushEvents();
      }
    });
  }

  private generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private generateUserId(): string {
    let userId = localStorage.getItem('allob_analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('allob_analytics_user_id', userId);
    }
    return userId;
  }

  private track(eventType: AnalyticsEvent['eventType'], eventAction: string, data: Partial<AnalyticsEvent> = {}): void {
    if (!this.enabled) return;

    const event: AnalyticsEvent = {
      eventType,
      eventAction,
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      ...this.getEnvironmentData(),
      ...data
    };

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.batchSize) {
      this.flushEvents();
    }

    console.log('Analytics tracked:', eventType, eventAction);
  }

  public trackCalculation(
    inputs: Partial<PayeCalculatorInputs>, 
    results: Partial<PayeCalculatorResults>, 
    calculationTime: number = 0
  ): void {
    this.track('calculation', 'calculate_paye', {
      calculatorInputs: inputs,
      calculatorResults: results,
      calculationTime
    });
  }

  public trackButtonClick(buttonName: string, context: Record<string, any> = {}): void {
    this.track('button_click', `click_${buttonName}`, {
      buttonContext: context
    });
  }

  public trackFormInteraction(fieldName: string, action: string, value: number | string | boolean | null = null): void {
    this.track('form_interaction', `${action}_${fieldName}`, {
      fieldName,
      fieldValue: typeof value === 'number' ? value : null,
      interactionType: action
    });
  }

  public trackPageView(pageUrl: string = window.location.pathname): void {
    this.track('page_view', 'view_page', {
      pageUrl,
      timeOnPage: Math.round((Date.now() - this.pageStartTime) / 1000)
    });
  }

  public trackError(errorMessage: string, errorContext: Record<string, any> = {}): void {
    this.track('error', 'application_error', {
      errorMessage: errorMessage.substring(0, 500),
      errorContext
    });
  }

  public trackTimeSpent(action: string, timeInSeconds: number): void {
    this.track('timing', action, {
      timeSpent: timeInSeconds
    });
  }

  private getEnvironmentData(): EnvironmentData {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pageUrl: window.location.pathname,
      referrer: document.referrer
    };
  }

  private async flushEvents(isSync: boolean = false): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      const payload = { events };

      if (isSync && navigator.sendBeacon) {
        navigator.sendBeacon(
          `${this.apiUrl}/api/analytics/track-batch`,
          JSON.stringify(payload)
        );
      } else {
        const response = await fetch(`${this.apiUrl}/api/analytics/track-batch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          console.warn('Analytics batch failed:', response.status);
          this.eventQueue.unshift(...events);
        }
      }
    } catch (error) {
      console.warn('Analytics flush error:', error);
      this.eventQueue.unshift(...events);
    }
  }

  public flush(): void {
    this.flushEvents();
  }

  public disable(): void {
    this.enabled = false;
    this.eventQueue = [];
    if (this.flushIntervalId) {
      clearInterval(this.flushIntervalId);
      this.flushIntervalId = null;
    }
  }

  public enable(): void {
    this.enabled = true;
    this.init();
  }

  public destroy(): void {
    this.disable();
  }
}

// React Hook for Analytics
export interface UsePayeAnalyticsReturn {
  trackCalculation: (inputs: Partial<PayeCalculatorInputs>, results: Partial<PayeCalculatorResults>, calculationTime?: number) => void;
  trackButtonClick: (buttonName: string, context?: Record<string, any>) => void;
  trackFormInteraction: (fieldName: string, action: string, value?: number | string | boolean | null) => void;
  trackError: (errorMessage: string, errorContext?: Record<string, any>) => void;
  trackTimeSpent: (action: string, timeInSeconds: number) => void;
  flush: () => void;
}

export const usePayeAnalytics = (config: PayeAnalyticsConfig = {}): UsePayeAnalyticsReturn => {
  const [tracker] = useState(() => new PayeAnalyticsTracker(config));
  
  useEffect(() => {
    return () => {
      tracker.flush();
      tracker.destroy();
    };
  }, [tracker]);

  return {
    trackCalculation: tracker.trackCalculation.bind(tracker),
    trackButtonClick: tracker.trackButtonClick.bind(tracker),
    trackFormInteraction: tracker.trackFormInteraction.bind(tracker),
    trackError: tracker.trackError.bind(tracker),
    trackTimeSpent: tracker.trackTimeSpent.bind(tracker),
    flush: tracker.flush.bind(tracker)
  };
};

// PAYE Calculation Logic
export const performPayeCalculation = (inputs: Partial<PayeCalculatorInputs>): PayeCalculatorResults => {
  const annualSalary = inputs.annualSalary || 0;
  const monthlyBonus = inputs.monthlyBonus || 0;
  const medicalAid = inputs.medicalAidContribution || 0;
  const pensionPercentage = inputs.pensionPercentage || 0;
  
  const grossMonthlyIncome = (annualSalary / 12) + monthlyBonus;
  const pensionContribution = (annualSalary * pensionPercentage) / 100 / 12;
  const taxableIncome = grossMonthlyIncome - pensionContribution - medicalAid;
  
  let monthlyTax = 0;
  if (taxableIncome > 87300 / 12) {
    monthlyTax = (taxableIncome - 87300 / 12) * 0.26 + (87300 / 12 - 26000 / 12) * 0.18;
  } else if (taxableIncome > 26000 / 12) {
    monthlyTax = (taxableIncome - 26000 / 12) * 0.18;
  }
  
  const uif = inputs.uifOptOut ? 0 : Math.min(grossMonthlyIncome * 0.01, 177.12);
  const totalDeductions = monthlyTax + pensionContribution + medicalAid + uif;
  const netMonthlyIncome = grossMonthlyIncome - totalDeductions;
  const effectiveTaxRate = grossMonthlyIncome > 0 ? (monthlyTax / grossMonthlyIncome) * 100 : 0;
  
  return {
    grossMonthlyIncome,
    totalTaxableIncome: taxableIncome,
    incomeTax: monthlyTax,
    uif,
    totalDeductions,
    netMonthlyIncome,
    effectiveTaxRate,
    marginalTaxRate: taxableIncome > 87300 / 12 ? 26 : 18,
    annualTax: monthlyTax * 12,
    monthlyTax
  };
};