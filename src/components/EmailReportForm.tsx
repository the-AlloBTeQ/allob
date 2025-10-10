// components/EmailReportForm.tsx
import React, { useState } from 'react';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';

interface EmailReportFormProps {
    onSendReport: (email: string) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
    disabled?: boolean;
}

export const EmailReportForm: React.FC<EmailReportFormProps> = ({ 
    onSendReport, 
    isLoading, 
    disabled = false 
}) => {
    const [email, setEmail] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || disabled) return;
        setShowDisclaimer(true);
    };

    const handleConfirm = async () => {
        setShowDisclaimer(false);
        setStatus('idle');
        setErrorMessage('');

        try {
            const result = await onSendReport(email);
            
            if (result.success) {
                setStatus('success');
                setEmail(''); // Clear email on success
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Failed to send report');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('An unexpected error occurred');
        }
    };

    return (
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <h5 className="font-semibold text-blue-900">Send Results to Your Email</h5>
            </div>

            {status === 'success' && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">Report sent successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">Check your inbox for your comprehensive PAYE report.</p>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <span className="text-red-800 font-medium">Failed to send report</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading || disabled}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!email.trim() || isLoading || disabled}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                        {isLoading ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Report
                            </>
                        )}
                    </button>
                </div>
            </form>

            {showDisclaimer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-3">Confirm Email</h3>
                        <p className="text-gray-700 mb-4">
                            Send detailed PAYE calculation report to: <strong>{email}</strong>?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDisclaimer(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm & Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};