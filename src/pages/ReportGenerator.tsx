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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAYE Tax Calculation Report - ${reportId}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px; 
        }
        .container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            border-radius: 12px;
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            text-align: center; 
            padding: 40px 30px; 
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 20px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .logo { 
            width: 60px; 
            height: 60px; 
            background: white; 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin: 0 auto 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .logo-text { 
            font-size: 28px; 
            font-weight: bold; 
            color: #1e40af; 
        }
        .company-name { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tagline { 
            color: #e0e7ff; 
            font-style: italic; 
            font-size: 16px; 
            margin-bottom: 20px;
        }
        .report-title { 
            font-size: 28px; 
            font-weight: bold; 
            margin: 20px 0 10px; 
        }
        .report-meta {
            color: #e0e7ff;
            font-size: 13px;
            margin-top: 12px;
        }
        .report-id {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            margin-top: 8px;
        }
        .content { padding: 40px 30px; }
        
        /* Dashboard Summary */
        .dashboard {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .dashboard-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .dashboard-item {
            background: rgba(255,255,255,0.15);
            border-radius: 8px;
            padding: 15px;
            backdrop-filter: blur(10px);
        }
        .dashboard-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        .dashboard-value {
            font-size: 24px;
            font-weight: bold;
        }
        .dashboard-status {
            grid-column: span 2;
            text-align: center;
            padding: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        .status-overpaid { background: rgba(16, 185, 129, 0.3); }
        .status-underpaid { background: rgba(239, 68, 68, 0.3); }
        .status-accurate { background: rgba(59, 130, 246, 0.3); }
        
        .section { 
            margin-bottom: 40px; 
            page-break-inside: avoid;
        }
        .section-title { 
            font-size: 22px; 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 20px; 
            padding-bottom: 12px; 
            border-bottom: 3px solid #dbeafe; 
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section-icon {
            width: 28px;
            height: 28px;
            background: #dbeafe;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
        
        /* Two Column Layout */
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 20px;
        }
        .card-title {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .data-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 0; 
            border-bottom: 1px solid #e5e7eb; 
        }
        .data-row:last-child { border-bottom: none; }
        .data-label { 
            color: #6b7280; 
            font-size: 14px; 
        }
        .data-value { 
            font-weight: 600; 
            color: #1f2937; 
            font-size: 14px; 
        }
        
        /* Breakdown Tree */
        .breakdown-tree {
            background: #f9fafb;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 2;
        }
        .breakdown-tree .tree-line {
            padding-left: 20px;
            position: relative;
        }
        .breakdown-tree .tree-line::before {
            content: '├─';
            position: absolute;
            left: 0;
        }
        .breakdown-tree .tree-line:last-child::before {
            content: '└─';
        }
        .breakdown-tree .tree-sub {
            padding-left: 40px;
        }
        .breakdown-tree .tree-sub::before {
            content: '│ ├─';
            position: absolute;
            left: 20px;
        }
        .breakdown-tree .amount {
            float: right;
            font-weight: bold;
        }
        
        .highlight-box { 
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-radius: 10px; 
            padding: 20px; 
            margin-top: 20px; 
            border: 2px solid #93c5fd;
        }
        .highlight-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 10px 0; 
        }
        .highlight-label { 
            font-weight: 600; 
            color: #1e40af; 
            font-size: 15px; 
        }
        .highlight-value { 
            font-weight: bold; 
            color: #1e40af; 
            font-size: 18px; 
        }
        
        .takehome-box {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border: 2px solid #6ee7b7;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .takehome-label {
            font-size: 14px;
            color: #065f46;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .takehome-value {
            font-size: 32px;
            font-weight: bold;
            color: #065f46;
        }
        
        .employer-section { 
            background: white;
            padding: 20px; 
            margin-bottom: 15px; 
            border-radius: 10px; 
            border: 2px solid #e5e7eb; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .employer-section h4 { 
            margin: 0 0 15px 0; 
            color: #1f2937; 
            font-weight: 600;
            font-size: 16px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f3f4f6;
        }
        
        /* Comparison Section */
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        .comparison-card {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid;
        }
        .comparison-card.calculated {
            background: #dbeafe;
            border-color: #3b82f6;
        }
        .comparison-card.actual {
            background: #f3f4f6;
            border-color: #9ca3af;
        }
        .comparison-card.difference {
            background: #fed7aa;
            border-color: #f97316;
        }
        .comparison-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 8px;
            color: #374151;
            letter-spacing: 0.5px;
        }
        .comparison-amount {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .comparison-sublabel {
            font-size: 11px;
            color: #6b7280;
        }
        
        /* Alert Boxes */
        .alert-box {
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        .alert-box.danger {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border: 2px solid #f87171;
        }
        .alert-box.success {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border: 2px solid #34d399;
        }
        .alert-box.warning {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #fbbf24;
        }
        .alert-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .alert-box.danger .alert-title { color: #991b1b; }
        .alert-box.success .alert-title { color: #065f46; }
        .alert-box.warning .alert-title { color: #92400e; }
        .alert-text {
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 15px;
        }
        .alert-box.danger .alert-text { color: #7f1d1d; }
        .alert-box.success .alert-text { color: #064e3b; }
        .alert-box.warning .alert-text { color: #78350f; }
        
        /* Recommendations */
        .recommendation-box {
            background: white;
            border: 2px solid #fca5a5;
            border-radius: 10px;
            padding: 20px;
            margin-top: 15px;
        }
        .recommendation-title {
            font-size: 16px;
            font-weight: bold;
            color: #991b1b;
            margin-bottom: 12px;
        }
        .recommendation-list {
            list-style: none;
            padding: 0;
        }
        .recommendation-list li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            color: #7f1d1d;
            font-size: 14px;
        }
        .recommendation-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #dc2626;
            font-weight: bold;
        }
        
        /* Tips Box */
        .tips-box {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .tips-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 12px;
        }
        .tips-list {
            list-style: none;
            padding: 0;
        }
        .tips-list li {
            font-size: 13px;
            color: #1e3a8a;
            padding: 6px 0;
            padding-left: 20px;
            position: relative;
        }
        .tips-list li::before {
            content: '💡';
            position: absolute;
            left: 0;
        }
        
        /* Disclaimer */
        .disclaimer {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #fbbf24;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
        }
        .disclaimer-title {
            font-size: 15px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 8px;
        }
        .disclaimer-text {
            font-size: 12px;
            color: #78350f;
            line-height: 1.6;
        }
        
        /* Footer */
        .footer {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            margin-top: 60px;
            padding: 40px 30px;
            border-radius: 0 0 12px 12px;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-bottom: 30px;
        }
        .footer-section h4 {
            font-size: 16px;
            margin-bottom: 15px;
            color: #60a5fa;
        }
        .footer-text {
            color: #d1d5db;
            font-size: 13px;
            line-height: 1.8;
        }
        .footer-bottom {
            border-top: 1px solid #374151;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                border-radius: 0;
            }
            .section {
                page-break-inside: avoid;
            }
            .alert-box, .recommendation-box {
                page-break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            .two-column, .dashboard-grid, .comparison-grid, .footer-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
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
            
            <!-- Employment Information -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">💼</span>
                    Employment Information
                </h2>
                ${employers.map((employer, index) => `
                    <div class="employer-section">
                        <h4>${employer.name || `Employer ${index + 1}`}</h4>
                        <div class="data-row">
                            <span class="data-label">Monthly Income:</span>
                            <span class="data-value">${formatCurrency(employer.income.amount)} (${employer.income.frequency})</span>
                        </div>
                        <div class="data-row">
                            <span class="data-label">Annual Income:</span>
                            <span class="data-value">${formatCurrency(employer.income.amount * (employer.income.frequency === 'monthly' ? 12 : employer.income.frequency === 'weekly' ? 52 : 1))}</span>
                        </div>
                        <div class="data-row">
                            <span class="data-label">Pension Contribution:</span>
                            <span class="data-value">${formatCurrency(employer.pensionContribution.amount)} (${employer.pensionContribution.frequency})</span>
                        </div>
                        ${employer.hasDeductibleExpenses ? `
                        <div class="data-row">
                            <span class="data-label">Deductible Expenses:</span>
                            <span class="data-value">${formatCurrency(employer.deductibleExpenses?.amount || 0)} (${employer.deductibleExpenses?.frequency || 'monthly'})</span>
                        </div>
                        ` : ''}
                    </div>
                `).join('')}
                
                <div class="two-column" style="margin-top: 20px;">
                    <div class="card">
                        <div class="card-title">Working Conditions</div>
                        <div class="data-row">
                            <span class="data-label">Works From Home:</span>
                            <span class="data-value">${workingConditions.worksFromHome ? '✓ Yes' : '✗ No'}</span>
                        </div>
                        <div class="data-row">
                            <span class="data-label">Dedicated Workspace:</span>
                            <span class="data-value">${workingConditions.hasDedicatedWorkspace ? '✓ Yes' : '✗ No'}</span>
                        </div>
                        <div class="data-row">
                            <span class="data-label">Travel Allowance:</span>
                            <span class="data-value">${workingConditions.hasVariableTravelAllowance ? '✓ Yes' : '✗ No'}</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Tax Bracket</div>
                        <div style="text-align: center; padding: 20px 0;">
                            <div style="font-size: 36px; font-weight: bold; color: #1e40af;">${taxBracket.bracket}</div>
                            <div style="color: #6b7280; font-size: 13px; margin-top: 8px;">${taxBracket.range}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Tax Calculation Breakdown -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🧮</span>
                    Tax Calculation Breakdown
                </h2>
                
                <div class="breakdown-tree">
                    <div><strong>Gross Annual Income</strong><span class="amount">${formatCurrency(results.grossIncome)}</span></div>
                    <div class="tree-line">Less: Deductions</div>
                    ${results.deductions.pensionContributions > 0 ? `<div class="tree-sub">Pension Contributions<span class="amount">${formatCurrency(results.deductions.pensionContributions)}</span></div>` : ''}
                    ${results.deductions.workFromHomeDeduction > 0 ? `<div class="tree-sub">Work From Home<span class="amount">${formatCurrency(results.deductions.workFromHomeDeduction)}</span></div>` : ''}
                    ${results.deductions.businessExpenses > 0 ? `<div class="tree-sub">Business Expenses<span class="amount">${formatCurrency(results.deductions.businessExpenses)}</span></div>` : ''}
                    ${results.deductions.travelAllowance > 0 ? `<div class="tree-sub">Travel Allowance<span class="amount">${formatCurrency(results.deductions.travelAllowance)}</span></div>` : ''}
                    <div class="tree-line"><strong>Taxable Income</strong><span class="amount">${formatCurrency(results.taxableIncome)}</span></div>
                    <div class="tree-line">Tax Before Rebates<span class="amount">${formatCurrency(results.taxExpense)}</span></div>
                    <div class="tree-line">Less: Primary Rebate<span class="amount">-${formatCurrency(results.primaryRebate)}</span></div>
                    <div class="tree-line"><strong style="color: #1e40af;">Annual Tax Liability</strong><span class="amount" style="color: #1e40af;">${formatCurrency(results.taxLiability)}</span></div>
                </div>
                
                <div class="two-column" style="margin-top: 20px;">
                    <div class="highlight-box">
                        <div class="highlight-row">
                            <span class="highlight-label">Annual Tax Liability:</span>
                            <span class="highlight-value">${formatCurrency(results.taxLiability)}</span>
                        </div>
                        <div class="highlight-row">
                            <span class="highlight-label">Monthly PAYE:</span>
                            <span class="highlight-value">${formatCurrency(results.monthlyPAYE)}</span>
                        </div>
                        <div class="highlight-row" style="border-top: 2px solid #93c5fd; margin-top: 10px; padding-top: 10px;">
                            <span class="highlight-label">Effective Tax Rate:</span>
                            <span class="highlight-value">${effectiveTaxRate}%</span>
                        </div>
                    </div>
                    
                    <div class="takehome-box">
                        <div class="takehome-label">💰 Monthly Take Home Pay</div>
                        <div style="margin: 15px 0;">
                            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #065f46; padding: 5px 0;">
                                <span>Gross Income:</span>
                                <span>${formatCurrency(monthlyGross)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #065f46; padding: 5px 0;">
                                <span>Less: PAYE</span>
                                <span>-${formatCurrency(results.monthlyPAYE)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #065f46; padding: 5px 0;">
                                <span>Less: UIF</span>
                                <span>-${formatCurrency(monthlyUIF)}</span>
                            </div>
                        </div>
                        <div style="border-top: 2px solid #6ee7b7; padding-top: 15px; margin-top: 10px;">
                            <div class="takehome-label">Net Take Home:</div>
                            <div class="takehome-value">${formatCurrency(monthlyTakeHome)}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Deductions Detail -->
                <div class="card" style="margin-top: 20px;">
                    <div class="card-title">📋 Deductions Breakdown</div>
                    <div class="data-row">
                        <span class="data-label">Pension Contributions:</span>
                        <span class="data-value">${formatCurrency(results.deductions.pensionContributions)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Work From Home Deduction:</span>
                        <span class="data-value">${formatCurrency(results.deductions.workFromHomeDeduction)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Business Expenses:</span>
                        <span class="data-value">${formatCurrency(results.deductions.businessExpenses)}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Travel Allowance:</span>
                        <span class="data-value">${formatCurrency(results.deductions.travelAllowance)}</span>
                    </div>
                    <div class="data-row" style="background: #f3f4f6; margin-top: 10px; padding: 15px; border-radius: 6px;">
                        <span class="data-label" style="font-weight: bold;">Total Deductions:</span>
                        <span class="data-value" style="font-size: 16px; color: #1e40af;">${formatCurrency(results.deductions.total)}</span>
                    </div>
                </div>
            </div>
            
            ${actualPAYE > 0 ? `
            <!-- PAYE Comparison & Analysis -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📊</span>
                    PAYE Comparison & Analysis
                </h2>
                
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px; color: #6b7280;">Your Current PAYE:</span>
                        <span style="font-size: 18px; font-weight: 600; color: #1f2937;">${formatCurrency(actualPAYE)} ${payeFrequency}</span>
                    </div>
                </div>
                
                <div class="comparison-grid">
                    <div class="comparison-card calculated">
                        <div class="comparison-label">Calculated Tax</div>
                        <div class="comparison-amount" style="color: #1e40af;">${formatCurrency(comparison.calculatedTax)}</div>
                        <div class="comparison-sublabel">Annual</div>
                    </div>
                    <div class="comparison-card actual">
                        <div class="comparison-label">Actual PAYE</div>
                        <div class="comparison-amount" style="color: #4b5563;">${formatCurrency(comparison.actualPaid)}</div>
                        <div class="comparison-sublabel">Annualized</div>
                    </div>
                    <div class="comparison-card difference">
                        <div class="comparison-label">Difference</div>
                        <div class="comparison-amount" style="color: ${comparison.isUnderpaid ? '#dc2626' : '#10b981'};">${formatCurrency(comparison.difference)}</div>
                        <div class="comparison-sublabel">${comparison.isUnderpaid ? 'Underpaid' : 'Overpaid'}</div>
                    </div>
                </div>
                
                ${comparison.status === 'underpaid' ? `
                <div class="alert-box danger">
                    <div class="alert-title">⚠️ Action Required - You Are Underpaying PAYE</div>
                    <div class="alert-text">
                        You are currently underpaying your PAYE by <strong>${formatCurrency(comparison.difference)}</strong> annually. 
                        This means you may face a significant tax bill when you file your tax return. It's important to take 
                        immediate action to avoid penalties and interest charges from SARS.
                    </div>
                    
                    <div class="recommendation-box">
                        <div class="recommendation-title">📋 Recommended Actions:</div>
                        <ul class="recommendation-list">
                            <li>Request your employer to increase your monthly PAYE deduction by <strong>${formatCurrency(comparison.monthlyAdditional)}</strong></li>
                            <li>Make voluntary additional PAYE payments through eFiling</li>
                            <li>Consider making quarterly provisional tax payments</li>
                            <li>Update your tax directive with SARS if you have multiple employers</li>
                            <li>Contact itax@allob.co.za for professional assistance</li>
                        </ul>
                        
                        <div style="margin-top: 15px; padding: 15px; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: #991b1b;">Monthly Additional Payment:</span>
                                <span style="font-weight: bold; color: #dc2626; font-size: 18px;">${formatCurrency(comparison.monthlyAdditional)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600; color: #991b1b;">Annual Shortfall:</span>
                                <span style="font-weight: bold; color: #dc2626; font-size: 18px;">${formatCurrency(comparison.difference)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ` : comparison.status === 'overpaid' ? `
                <div class="alert-box success">
                    <div class="alert-title">✅ Good News - You Are Overpaying PAYE</div>
                    <div class="alert-text">
                        You are currently overpaying your PAYE by <strong>${formatCurrency(comparison.difference)}</strong> annually. 
                        This means you are entitled to a tax refund when you file your tax return. You can also request an 
                        adjustment to reduce your monthly PAYE deductions.
                    </div>
                    
                    <div class="recommendation-box" style="border-color: #6ee7b7; background: white;">
                        <div class="recommendation-title" style="color: #065f46;">📋 Recommended Actions:</div>
                        <ul class="recommendation-list">
                            <li style="color: #064e3b;">File your tax return to claim your refund of <strong>${formatCurrency(comparison.difference)}</strong></li>
                            <li style="color: #064e3b;">Request your employer to reduce monthly PAYE by <strong>${formatCurrency(comparison.monthlyAdditional)}</strong></li>
                            <li style="color: #064e3b;">Update your tax directive with SARS</li>
                            <li style="color: #064e3b;">Ensure you file within 5 years to claim the refund</li>
                            <li style="color: #064e3b;">Keep all supporting documents for verification</li>
                        </ul>
                        
                        <div style="margin-top: 15px; padding: 15px; background: #d1fae5; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: #065f46;">Potential Monthly Savings:</span>
                                <span style="font-weight: bold; color: #10b981; font-size: 18px;">${formatCurrency(comparison.monthlyAdditional)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600; color: #065f46;">Estimated Refund:</span>
                                <span style="font-weight: bold; color: #10b981; font-size: 18px;">${formatCurrency(comparison.difference)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ` : `
                <div class="alert-box success">
                    <div class="alert-title">✓ Excellent - Your PAYE is Accurate</div>
                    <div class="alert-text">
                        Your current PAYE deductions are within an acceptable range of your calculated tax liability. 
                        The difference of <strong>${formatCurrency(comparison.difference)}</strong> is minimal and falls within normal tolerances.
                    </div>
                </div>
                `}
                
                <div class="tips-box">
                    <div class="tips-title">💡 Pro Tips for Managing Your PAYE:</div>
                    <ul class="tips-list">
                        <li>Make voluntary PAYE payments through the SARS eFiling platform if underpaid</li>
                        <li>Consider quarterly payments to spread the tax burden evenly</li>
                        <li>Keep detailed records of all PAYE payments for verification</li>
                        <li>Review and update your PAYE when your income changes significantly</li>
                        <li>File your tax return annually even if you're a salaried employee</li>
                        <li>Claim all eligible deductions to minimize your tax liability</li>
                    </ul>
                </div>
            </div>
            ` : ''}
            
            ${results.warnings.length > 0 ? `
            <!-- Important Notes & Warnings -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">⚠️</span>
                    Important Notes & Warnings
                </h2>
                <div class="alert-box warning">
                    <div class="alert-title">⚠️ Please Note:</div>
                    <ul style="padding-left: 20px; margin: 0;">
                        ${results.warnings.map(warning => `<li style="margin: 8px 0; color: #78350f;">${warning}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
            
            <!-- Disclaimer -->
            <div class="disclaimer">
                <div class="disclaimer-title">⚖️ Important Disclaimer</div>
                <div class="disclaimer-text">
                    This calculation is for <strong>informational and planning purposes only</strong>. Tax calculations are based on 
                    current SARS tax tables and rates for the ${taxYear} tax year. Your actual tax liability may vary based on 
                    various factors including additional income, deductions, and changes in tax legislation. This report does not 
                    constitute professional tax advice. For personalized tax planning and compliance, please consult with a 
                    registered tax practitioner. AlloB Consultants accepts no liability for decisions made based solely on this report.
                    <br><br>
                    <strong>SARS Filing Requirements:</strong> All individuals with taxable income must register as taxpayers and 
                    file annual tax returns. Deadlines and requirements apply - please visit www.sars.gov.za for more information.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>Contact Information</h4>
                    <div class="footer-text">
                        <div style="margin-bottom: 8px;"><strong>AlloB Consultants</strong></div>
                        <div>📧 Email: itax@allob.co.za</div>
                        <div>📱 Phone: +27 67 921 1947</div>
                        <div>🌐 Web: www.allob.co.za</div>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Our Services</h4>
                    <div class="footer-text">
                        <div>• PAYE Tax Planning</div>
                        <div>• Tax Return Preparation</div>
                        <div>• Tax Compliance Services</div>
                        <div>• Business Advisory</div>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Need Help?</h4>
                    <div class="footer-text">
                        Our team of experienced tax professionals is ready to assist you with:
                        <div style="margin-top: 10px;">
                            • Detailed tax planning<br>
                            • SARS correspondence<br>
                            • Tax optimization strategies
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div style="margin-bottom: 10px;">
                    This report was generated using <strong>AlloB My PAYE Calculator</strong> on ${calculationDate}
                </div>
                <div>
                    © ${new Date().getFullYear()} AlloB Consultants. All rights reserved. | Report ID: ${reportId}
                </div>
                <div style="margin-top: 10px; font-size: 11px;">
                    Integrity and Innovation in Financial Services
                </div>
            </div>
        </div>
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