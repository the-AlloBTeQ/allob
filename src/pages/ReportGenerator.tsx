// components/ReportGenerator.tsx
import { useState, useEffect } from 'react';
import { Download, Mail, FileText, X, AlertTriangle, CheckCircle, TrendingUp, PieChart } from 'lucide-react';
import type { 
    Employer, 
    TaxCalculationResult, 
    FrequencyType,
    WorkingConditions
} from '../types/calculator';
import { formatCurrency } from '../types/calculator';

interface ReportGeneratorProps {
    results: TaxCalculationResult;
    employers: Employer[];
    workingConditions: WorkingConditions;
    age: number;
    taxYear: number;
    actualPAYE: number;
    payeFrequency: FrequencyType;
    userEmail?: string;
    name?: string;
    surname?: string;
    onClose: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    results,
    employers,
    workingConditions,
    age,
    taxYear,
    actualPAYE,
    payeFrequency,
    userEmail = '',
    name = '',
    surname = '',
    onClose
}) => {
    const [email, setEmail] = useState(userEmail);
    const [isSending, setIsSending] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [logoBase64, setLogoBase64] = useState<string>('');

    // Load and convert logo to base64 for embedding in HTML
    useEffect(() => {
        const loadLogo = async () => {
            try {
                // Try to load the logo from the public folder
                const response = await fetch('/logo.png');
                if (response.ok) {
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setLogoBase64(reader.result as string);
                    };
                    reader.readAsDataURL(blob);
                }
            } catch (error) {
                console.log('Logo not found, using fallback');
            }
        };
        loadLogo();
    }, []);

    // Calculate comparison data
    const getComparisonData = () => {
        const frequencyMultipliers: Record<FrequencyType, number> = {
            'once-off': 1,
            'weekly': 52,
            'monthly': 12,
            'annual': 1
        };
        
        const calculatedTax = results.taxLiability;
        const actualPaid = actualPAYE * (frequencyMultipliers[payeFrequency] || 12);
        const difference = Math.abs(calculatedTax - actualPaid);
        const isUnderpaid = calculatedTax > actualPaid;
        const monthlyAdditional = isUnderpaid ? difference / 12 : 0;
        const status = difference > 1000 ? (isUnderpaid ? 'underpaid' : 'overpaid') : 'accurate';
        
        return {
            calculatedTax,
            actualPaid,
            difference,
            isUnderpaid,
            monthlyAdditional,
            status
        };
    };

    const comparison = getComparisonData();
    const calculationDate = new Date().toLocaleDateString('en-ZA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const reportId = `PAYE-${Date.now().toString(36).toUpperCase()}`;
    
    // Calculate additional metrics
    const effectiveTaxRate = ((results.taxLiability / results.grossIncome) * 100).toFixed(1);
    const monthlyGross = results.grossIncome / 12;
    const monthlyUIF = results.UIF / 12;
    const monthlyTakeHome = monthlyGross - results.monthlyPAYE - monthlyUIF;
    
    // Get tax bracket
    const getTaxBracket = () => {
        const taxableIncome = results.taxableIncome;
        if (taxableIncome <= 237100) return { bracket: '18%', range: 'R0 - R237,100' };
        if (taxableIncome <= 370500) return { bracket: '26%', range: 'R237,101 - R370,500' };
        if (taxableIncome <= 512800) return { bracket: '31%', range: 'R370,501 - R512,800' };
        if (taxableIncome <= 673000) return { bracket: '36%', range: 'R512,801 - R673,000' };
        if (taxableIncome <= 857900) return { bracket: '39%', range: 'R673,001 - R857,900' };
        if (taxableIncome <= 1817000) return { bracket: '41%', range: 'R857,901 - R1,817,000' };
        return { bracket: '45%', range: 'Above R1,817,000' };
    };
    
    const taxBracket = getTaxBracket();

    const generatePDF = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(getReportHTML());
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        }
    };

    const downloadHTML = () => {
        const blob = new Blob([getReportHTML()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PAYE-Tax-Report-${new Date().toISOString().split('T')[0]}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const sendEmail = async () => {
        if (!email) {
            alert('Please enter an email address');
            return;
        }
        setIsSending(true);
        try {
            console.log('Email functionality requires backend implementation');
            downloadHTML();
            alert(`Report downloaded. Email functionality requires backend setup.`);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try downloading the report instead.');
        } finally {
            setIsSending(false);
        }
    };

    const getReportHTML = () => {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
       @media print {
    /* Prevent page breaks inside these containers */
    .section,
    .card,
    .dashboard,
    .emp-section > div:not(:last-child),
    .working-conditions,
    .action-box,
    .protips-box,
    .client-info,
    .tax-bracket-box {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Ensure sections start on a new page if they won’t fit */
    .section {
      page-break-before: auto;
    }

    /* Avoid breaking within table-like rows or key rows */
    .dashboard-grid,
    .client-info-grid,
    .emp-grid {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Keep related items together */
    .condition-item {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Improve spacing for print */
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: white !important;
    }

    .container {
      padding: 10px !important;
    }

    /* Ensure iframe preview doesn’t interfere — not needed in print */
    iframe {
      display: none !important;
    }
    }
    </head>
    <body>
        <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
            ${logoBase64 ? `<img src="${logoBase64}" alt="AlloB Consultants Logo" style="width: 100%; height: 100%; object-fit: contain;" />` : '<div class="logo-text">AB</div>'}
            </div>
            <div class="company-name">AlloB Consultants</div>
            <div class="tagline">Integrity and Innovation</div>
            <div class="report-title">PAYE Tax Calculation Report</div>
            <div class="report-meta">
            Generated on ${calculationDate}
            <div class="report-id">Report ID: ${reportId}</div>
            </div>
        </div>
        <div class="content">
                <div class="card-title">Name</div>
                <div class="data-value" style="font-size: 20px;">${name || '-'}</div>
                </div>
                <div class="card">
                <div class="card-title">Surname</div>
                <div class="data-value" style="font-size: 20px;">${surname || '-'}</div>
                </div>
                <div class="card">
                <div class="card-title">Surname</div>
                <div class="data-value" style="font-size: 20px;">${surname || '-'}</div>
                </div>
            </div>
            </div>
            <!-- Dashboard Summary -->
            <div class="dashboard">
            <div class="dashboard-title">📊 Key Figures at a Glance</div>
            <div class="dashboard-grid">
                <div class="dashboard-item">
                <div class="dashboard-label">Annual Income</div>
                <div class="dashboard-value">${formatCurrency(results.grossIncome)}</div>
                </div>
                <div class="dashboard-item">
                <div class="dashboard-label">Tax Liability</div>
                <div class="dashboard-value">${formatCurrency(results.taxLiability)}</div>
                </div>
                <div class="dashboard-item">
                <div class="dashboard-label">Effective Tax Rate</div>
                <div class="dashboard-value">${effectiveTaxRate}%</div>
                </div>
                <div class="dashboard-item">
                <div class="dashboard-label">Monthly PAYE</div>
                <div class="dashboard-value">${formatCurrency(results.monthlyPAYE)}</div>
                </div>
                ${actualPAYE > 0 ? `
                <div class="dashboard-status ${comparison.status === 'overpaid' ? 'status-overpaid' : comparison.status === 'underpaid' ? 'status-underpaid' : 'status-accurate'}">
                ${comparison.status === 'overpaid' ? '✅ OVERPAID' : comparison.status === 'underpaid' ? '⚠️ UNDERPAID' : '✓ ACCURATE'}
                </div>
                ` : ''}
            </div>
            </div>
            <!-- ... rest of report unchanged ... -->
            <!-- Personal Information -->
            <div class="section">
            <h2 class="section-title">
                <span class="section-icon">👤</span>
                Personal Information
            </h2>
            <div class="two-column">
                <div class="card">
                <div class="card-title">Tax Year</div>
                <div class="data-value" style="font-size: 24px;">${taxYear}</div>
                <div style="color: #6b7280; font-size: 12px; margin-top: 5px;">
                    (March ${taxYear - 1} - February ${taxYear})
                </div>
                </div>
                <div class="card">
                <div class="card-title">Age & Rebates</div>
                <div class="data-value" style="font-size: 24px;">${age} years</div>
                <div style="color: #6b7280; font-size: 12px; margin-top: 5px;">
                    Primary Rebate: ${formatCurrency(results.primaryRebate)}
                </div>
                </div>
            </div>
            </div>
            <!-- ... rest of report unchanged ... -->
        </div>
        <!-- ... footer unchanged ... -->
        </div>
    </body>
    </html>`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Professional Tax Report</h2>
                            <p className="text-sm text-gray-600">Generate, preview, and share your comprehensive PAYE report</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                
                <div className="p-6">
                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <button 
                            onClick={() => setShowPreview(!showPreview)} 
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                        >
                            <FileText className="w-5 h-5" />
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                        
                        <button 
                            onClick={generatePDF} 
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                        >
                            <Download className="w-5 h-5" />
                            Print / Save PDF
                        </button>
                        
                        <button 
                            onClick={downloadHTML} 
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
                        >
                            <Download className="w-5 h-5" />
                            Download HTML
                        </button>
                    </div>
                    
                    {/* Report Features Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            What's Included in Your Report
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Dashboard with key metrics
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Detailed tax breakdown
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Monthly take-home calculation
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                PAYE comparison & analysis
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Actionable recommendations
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Professional formatting
                            </div>
                        </div>
                    </div>
                    
                    {/* Email Section */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Send Report via Email
                        </h3>
                        <div className="flex gap-3">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter email address" 
                                className="flex-1 px-4 py-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                            />
                            <button 
                                onClick={sendEmail} 
                                disabled={!email || isSending} 
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                            >
                                <Mail className="w-5 h-5" />
                                {isSending ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                        <p className="text-xs text-indigo-600 mt-2">📝 Note: Email functionality not implemented yet</p>
                    </div>
                    
                    {/* Report Info */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-yellow-800">
                                <strong className="block mb-1">Professional Report Ready</strong>
                                Your report includes comprehensive tax calculations, visual breakdowns, and actionable 
                                recommendations. Save it for your records or share with your tax practitioner.
                            </div>
                        </div>
                    </div>
                    
                    {/* Preview */}
                    {showPreview && (
                        <div className="border-2 border-blue-200 rounded-lg overflow-hidden shadow-lg">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 border-b flex items-center justify-between">
                                <p className="text-sm font-semibold text-white flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Report Preview
                                </p>
                                <span className="text-xs text-blue-100">ID: {reportId}</span>
                            </div>
                            <iframe 
                                srcDoc={getReportHTML()} 
                                className="w-full h-[600px] border-0 bg-white" 
                                title="Report Preview" 
                            />
                        </div>
                    )}
                    
                    {/* Usage Instructions */}
                    <div className="mt-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">📖 How to Use Your Report:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <div className="font-semibold text-gray-900 mb-1">💾 Save for Records</div>
                                <p className="text-xs">Download and keep for tax filing season and audits</p>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 mb-1">📧 Share with Advisor</div>
                                <p className="text-xs">Email to your tax practitioner for professional review</p>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 mb-1">🖨️ Print Copy</div>
                                <p className="text-xs">Keep a physical copy for your tax documentation</p>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 mb-1">👀 Preview First</div>
                                <p className="text-xs">Review all details before downloading or sharing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportGenerator;