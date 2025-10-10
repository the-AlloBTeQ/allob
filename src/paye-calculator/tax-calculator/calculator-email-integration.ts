// hooks/usePayeEmailService.ts - Updated for Next.js serverless
import { useState } from 'react';
import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult, 
    FrequencyType 
} from '../tax-calculator/tax-interface';

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

            // Prepare report data for Next.js API
            const reportData = {
                userInfo: {
                    email,
                    calculationDate: new Date().toISOString(),
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

            // Send to Next.js API route
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

// Integration instructions for your existing TaxCalculator component:
export const TaxCalculatorIntegration = `
// 1. Add this import to your existing TaxCalculator component:
import { usePayeEmailService } from '../hooks/usePayeEmailService';

// 2. Add these state variables if not already present:
const [email, setEmail] = useState<string>('');
const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

// 3. Add the email service hook:
const { sendReport, isLoading: isEmailLoading, lastError: emailError } = usePayeEmailService();

// 4. Add these handler functions:
const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !results) {
        setCalculationError('Please enter a valid email and ensure tax calculation is complete');
        return;
    }
    setEmailStatus('idle');
    setShowDisclaimer(true);
};

const handleEmailConfirm = async () => {
    setShowDisclaimer(false);
    
    const result = await sendReport(
        email,
        employers,
        workingConditions,
        age,
        selectedYear,
        results!,
        actualPAYE,
        payeFrequency
    );
    
    if (result.success) {
        setEmailStatus('success');
        setEmail(''); // Clear email on success
    } else {
        setEmailStatus('error');
        setCalculationError(result.error || 'Failed to send report');
    }
};

// 5. Replace your existing email form section with this JSX:
`;

// Updated Email Form Component for your TaxCalculator
export const EmailFormJSX = `
{/* Add this inside your results section, after the comparison analysis */}
<div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
    <div className="flex items-center mb-4">
        <Mail className="w-5 h-5 text-blue-600 mr-2" />
        <h5 className="font-semibold text-blue-900">Send Results to Your Email</h5>
    </div>

    {/* Success Message */}
    {emailStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Report sent successfully!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">Check your inbox for your comprehensive PAYE report.</p>
        </div>
    )}

    {/* Error Message */}
    {(emailStatus === 'error' || emailError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Failed to send report</span>
            </div>
            <p className="text-red-700 text-sm mt-1">{emailError || 'Unknown error occurred'}</p>
        </div>
    )}

    <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
            <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEmailLoading || isCalculating}
            />
            <button
                type="submit"
                disabled={!email.trim() || isEmailLoading || isCalculating || !results}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
                {isEmailLoading ? 'Sending...' : 'Send to Email'}
            </button>
        </div>
    </form>

    {/* Enhanced Disclaimer Modal */}
    {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
                <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-blue-100 rounded-full p-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Email Report Consent</h4>
                    </div>
                </div>
                
                <div className="space-y-4 text-sm text-gray-700 mb-6">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-1">What you'll receive:</h5>
                        <ul className="text-green-700 space-y-1">
                            <li>• Complete tax calculation breakdown</li>
                            <li>• Professional PAYE comparison analysis</li>
                            <li>• Personalized recommendations</li>
                            <li>• Working from home guidance (if applicable)</li>
                            <li>• Tax planning tips and next steps</li>
                        </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-1">Privacy & Communications:</h5>
                        <ul className="text-blue-700 space-y-1">
                            <li>• Your calculation data is processed securely</li>
                            <li>• We'll send occasional tax tips and updates</li>
                            <li>• No spam - you can unsubscribe anytime</li>
                            <li>• Data handled per our privacy policy</li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={() => setShowDisclaimer(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        onClick={handleEmailConfirm}
                        disabled={isEmailLoading}
                    >
                        {isEmailLoading ? 'Sending Report...' : 'I Agree & Send Report'}
                    </button>
                </div>
            </div>
        </div>
    )}
</div>
`;

// Environment Variables Setup for Next.js
export const environmentSetup = {
    // .env.local file in your Next.js root directory
    envLocal: `
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=itax@allob.co.za

# Optional: For development/testing
NODE_ENV=development
`,

    // package.json dependencies to add
    dependencies: {
        "@sendgrid/mail": "^7.7.0"
    },

    // Setup steps
    steps: [
        "1. Sign up for SendGrid and get your API key",
        "2. Add environment variables to .env.local",
        "3. Install @sendgrid/mail: npm install @sendgrid/mail",
        "4. Verify your sender email (itax@allob.co.za) in SendGrid",
        "5. Add the usePayeEmailService hook to your project",
        "6. Update your TaxCalculator component with the integration code",
        "7. Test with a real email address"
    ]
};

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

// Analytics tracking (optional)
export const trackEmailSent = (email: string, taxYear: number, taxLiability: number) => {
    const analyticsData = {
        event: 'paye_report_sent',
        timestamp: new Date().toISOString(),
        email_domain: email.split('@')[1],
        tax_year: taxYear,
        tax_liability_range: getTaxLiabilityRange(taxLiability),
        report_type: 'paye_calculator'
    };
    
    // Send to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'paye_report_sent', {
            custom_parameter_1: analyticsData.tax_year,
            custom_parameter_2: analyticsData.tax_liability_range
        });
    }
    
    console.log('Email report sent:', analyticsData);
};

const getTaxLiabilityRange = (amount: number): string => {
    if (amount < 10000) return '0-10k';
    if (amount < 50000) return '10k-50k';
    if (amount < 100000) return '50k-100k';
    if (amount < 200000) return '100k-200k';
    return '200k+';
};

export default {
    usePayeEmailService,
    TaxCalculatorIntegration,
    EmailFormJSX,
    environmentSetup,
    trackEmailSent
};