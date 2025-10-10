// services/EmailService.ts
import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult, 
    FrequencyType 
} from '../paye-calculator/tax-calculator/tax-interface';
import { formatCurrency } from '../paye-calculator/tax-calculator/tax-utils';

export interface PayeReportData {
    userInfo: {
        email: string;
        calculationDate: Date;
        taxYear: number;
        age: number;
    };
    inputData: {
        employers: Employer[];
        workingConditions: WorkingConditions;
        actualPAYE: number;
        payeFrequency: FrequencyType;
    };
    results: TaxCalculationResult;
    comparison?: {
        calculatedTax: number;
        actualPaid: number;
        difference: number;
        status: 'underpaid' | 'overpaid' | 'accurate';
        recommendations: string[];
    };
}

export class ProductionEmailService {
    private apiUrl: string;
    
    constructor(apiUrl: string = '/api/send-paye-report') {
        this.apiUrl = apiUrl;
    }

    async sendPayeReport(reportData: PayeReportData): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: reportData.userInfo.email,
                    reportData: reportData
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: result.error || `HTTP error! status: ${response.status}`
                };
            }

            return { success: true };
        } catch (error) {
            console.error('Email service error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    generateComparisonAnalysis(
        results: TaxCalculationResult,
        actualPAYE: number,
        payeFrequency: FrequencyType
    ): PayeReportData['comparison'] {
        const frequencyMultipliers: Record<FrequencyType, number> = {
            'once-off': 1,
            'weekly': 52,
            'monthly': 12,
            'annual': 1
        };
        
        const calculatedTax = results.taxLiability;
        const actualPaid = actualPAYE * frequencyMultipliers[payeFrequency];
        const difference = Math.abs(calculatedTax - actualPaid);
        
        let status: 'underpaid' | 'overpaid' | 'accurate';
        let recommendations: string[] = [];
        
        if (calculatedTax > actualPaid + 1000) {
            status = 'underpaid';
            recommendations = [
                `Make additional voluntary PAYE payments of ${formatCurrency(difference)} annually`,
                `Break this down to ${formatCurrency(difference / 12)} monthly additional payments`,
                'Make payments through eFiling or your bank',
                'Keep records of additional payments for your tax return',
                'Consider quarterly payments to spread the impact'
            ];
        } else if (actualPaid > calculatedTax + 1000) {
            status = 'overpaid';
            recommendations = [
                `You may receive a refund of approximately ${formatCurrency(difference)} when filing`,
                'Ensure all supporting documents are ready for your tax return',
                'Consider adjusting your PAYE for the remainder of the tax year',
                'Keep records of all payments made for your tax return'
            ];
        } else {
            status = 'accurate';
            recommendations = [
                'Your PAYE payments are well-aligned with your tax liability',
                'Continue with your current payment structure',
                'Review your PAYE if your income changes significantly',
                'Keep monitoring throughout the tax year'
            ];
        }
        
        return { calculatedTax, actualPaid, difference, status, recommendations };
    }
}

// Hook for React component integration
export function useEmailService() {
    const emailService = new ProductionEmailService();

    const sendReport = async (
        email: string,
        employers: Employer[],
        workingConditions: WorkingConditions,
        age: number,
        taxYear: number,
        results: TaxCalculationResult,
        actualPAYE: number = 0,
        payeFrequency: FrequencyType = 'monthly'
    ): Promise<{ success: boolean; error?: string }> => {
        
        if (!email || !email.includes('@')) {
            return { success: false, error: 'Valid email address is required' };
        }

        if (!results) {
            return { success: false, error: 'Tax calculation results are required' };
        }

        const reportData: PayeReportData = {
            userInfo: {
                email,
                calculationDate: new Date(),
                taxYear,
                age
            },
            inputData: {
                employers,
                workingConditions,
                actualPAYE,
                payeFrequency
            },
            results,
            comparison: actualPAYE > 0 ? 
                emailService.generateComparisonAnalysis(results, actualPAYE, payeFrequency) : 
                undefined
        };

        return await emailService.sendPayeReport(reportData);
    };

    return { sendReport };
}