// hooks/usePayeEmailService.ts
import { useState } from 'react';
import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult, 
    FrequencyType 
} from '../paye-calculator/tax-calculator/tax-interface';

interface EmailServiceResult {
    success: boolean;
    error?: string;
}

export function usePayeEmailService() {
    const [isLoading, setIsLoading] = useState(false);
    const [lastError, setLastError] = useState<string | null>(null);

    const sendReport = async (
        email: string,
        employers: Employer[],
        workingConditions: WorkingConditions,
        age: number,
        taxYear: number,
        results: TaxCalculationResult,
        actualPAYE: number = 0,
        payeFrequency: FrequencyType = 'monthly'
    ): Promise<EmailServiceResult> => {
        setIsLoading(true);
        setLastError(null);

        try {
            // Validate inputs
            if (!email || !email.includes('@')) {
                throw new Error('Valid email address is required');
            }

            if (!results) {
                throw new Error('Tax calculation results are required');
            }

            if (employers.length === 0) {
                throw new Error('At least one employer is required');
            }

            // Prepare report data
            const reportData = {
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
                results
            };

            // Send to backend
            const response = await fetch('/api/send-paye-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    reportData
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error! status: ${response.status}`);
            }

            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setLastError(errorMessage);
            console.error('Email service error:', error);
            
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendReport,
        isLoading,
        lastError,
        clearError: () => setLastError(null)
    };
}

