import { useState, useMemo, useCallback, useEffect } from 'react';
import { Calculator, CreditCard, AlertCircle, Phone, Mail, FileText } from 'lucide-react';
import { debounce } from 'lodash';
// Import from centralized types file
import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult, 
    FrequencyType,
    TaxYear
} from '../types/calculator';
import { 
    TAX_YEAR_DATA,
    formatCurrency
} from '../types/calculator';

// Employer validation function
function validateEmployers(employers: Employer[], age: number) {
    const errors: string[] = [];
    if (!Array.isArray(employers) || employers.length === 0) {
        errors.push('At least one employer must be provided.');
    }
    employers.forEach((emp, idx) => {
        if (!emp.name || emp.name.trim() === '') {
            errors.push(`Employer ${idx + 1}: Name is required.`);
        }
        if (typeof emp.income.amount !== 'number' || emp.income.amount <= 0) {
            errors.push(`Employer ${idx + 1}: Income amount must be greater than zero.`);
        }
        if (!emp.income.frequency) {
            errors.push(`Employer ${idx + 1}: Income frequency is required.`);
        }
        if (typeof emp.pensionContribution.amount !== 'number' || emp.pensionContribution.amount < 0) {
            errors.push(`Employer ${idx + 1}: Pension contribution cannot be negative.`);
        }
        if (!emp.pensionContribution.frequency) {
            errors.push(`Employer ${idx + 1}: Pension contribution frequency is required.`);
        }
    });
    if (typeof age !== 'number' || age < 18 || age > 100) {
        errors.push('Age must be between 18 and 100.');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Main tax calculation function using centralized constants
const calculateTaxLiability = (
    employers: Employer[],
    workingConditions: WorkingConditions,
    age: number,
    taxYear: TaxYear
): TaxCalculationResult => {
    // Get tax year data from centralized constants
    const yearData = TAX_YEAR_DATA[taxYear];
    const frequencyMultipliers: Record<FrequencyType, number> = {
        'once-off': 1,
        'weekly': 52,
        'monthly': 12,
        'annual': 1
    };
    let grossIncome = 0;
    let totalPensionContributions = 0;
    employers.forEach(emp => {
        const annualIncome = emp.income.amount * frequencyMultipliers[emp.income.frequency];
        grossIncome += annualIncome;
        totalPensionContributions += emp.pensionContribution.amount * frequencyMultipliers[emp.pensionContribution.frequency];
    });

    // Apply pension deduction limit using constants
    const pensionLimit = Math.min(
        grossIncome * yearData.PENSION_LIMITS.PERCENTAGE, 
        yearData.PENSION_LIMITS.AMOUNT
    );
    const pensionDeductions = Math.min(totalPensionContributions, pensionLimit);
    const excessPension = totalPensionContributions - pensionDeductions;
    const taxableIncome = Math.max(0, grossIncome - pensionDeductions);

    // Calculate tax using brackets from constants
    let tax = 0;
    const brackets = yearData.BRACKETS;
    for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i];
        if (i === brackets.length - 1) {
            // Last bracket (Infinity threshold)
            tax = bracket.base + (taxableIncome - brackets[i - 1].threshold) * bracket.rate;
            break;
        } else if (taxableIncome <= bracket.threshold) {
            tax = bracket.base + (taxableIncome - (i > 0 ? brackets[i - 1].threshold : 0)) * bracket.rate;
            break;
        }
    }

    // Calculate rebate using constants based on age
    let primaryRebate = yearData.REBATES.PRIMARY;
    if (age >= yearData.AGE_THRESHOLDS.TERTIARY) {
        primaryRebate = yearData.REBATES.PRIMARY + yearData.REBATES.SECONDARY + yearData.REBATES.TERTIARY;
    } else if (age >= yearData.AGE_THRESHOLDS.SECONDARY) {
        primaryRebate = yearData.REBATES.PRIMARY + yearData.REBATES.SECONDARY;
    }
    const taxLiability = Math.max(0, tax - primaryRebate);
    const monthlyPAYE = taxLiability / 12;

    // Calculate UIF using constants
    // UIF is 1% of gross income, limited to R177.12 per month (R2,125.44 per year)
    const UIF = Math.min(
        grossIncome * 0.01,
        177.12 * 12
    );

    const warnings: string[] = [];
    // Multiple employers warning
    if (employers.length > 1) {
        warnings.push('Multiple income sources detected. Ensure you get the IRP5 from each employer.');
    }
    // Pension limit warning
    if (excessPension > 0) {
        warnings.push(`Pension contributions exceed the allowable limit. Only ${formatCurrency(pensionDeductions)} of ${formatCurrency(totalPensionContributions)} can be deducted (limited to lower of ${yearData.PENSION_LIMITS.PERCENTAGE * 100}% of remuneration or ${formatCurrency(yearData.PENSION_LIMITS.AMOUNT)}).`);
    }
    // Working from home advisory
    if (workingConditions.worksFromHome) {
        warnings.push('📋 Working From Home: Ensure you get the Letter from the Employer confirming you were working from home for the period covering the Year of Assessment. Prepare a detailed schedule of expenses incurred due to working from home. Include costs such as electricity, internet, office equipment, and ensure you have supporting invoices and receipts. SARS may require this documentation during assessment.');
    }
    // Travel allowance advisory
    if (workingConditions.hasVariableTravelAllowance) {
        warnings.push('🚗 Travel Allowance: Prepare a SARS-acceptable logbook showing the start and end locations, distance traveled, and purpose of each business trip. The logbook must be maintained throughout the tax year and is essential for claiming travel deductions.');
    }
    // Deductible expenses advisory
    const hasDeductibleExpenses = employers.some(emp => emp.hasDeductibleExpenses);
    if (hasDeductibleExpenses) {
        warnings.push('💼 Deductible Expenses: Are you earning a commission or running an enterprise that is not incorporated? Prepare a detailed trading statement showing income and expenses. Ensure all supporting documents (invoices, receipts, bank statements) for claimed expenses are readily available for SARS verification.');
    }

    return {
        grossIncome,
        taxableIncome,
        taxLiability,
        monthlyPAYE,
        UIF,
        primaryRebate,
        deductions: {
            pensionFund: pensionDeductions,
            pensionContributions: pensionDeductions,
            medicalAid: 0,
            other: 0,
            workFromHomeDeduction: 0,
            travelAllowance: 0,
            businessExpenses: 0,
            total: pensionDeductions
        },
        taxExpense: tax,
        deductibleExpensesCarryForward: {},
        warnings
    };
};

const calculatePAYEComparison = (calculatedTax: number, actualPAYE: number, frequency: FrequencyType) => {
    const frequencyMultipliers: Record<FrequencyType, number> = {
        'once-off': 1,
        'weekly': 52,
        'monthly': 12,
        'annual': 1
    };
    const actualPaid = actualPAYE * frequencyMultipliers[frequency];
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

// Performance monitoring hook
const usePerformanceMonitor = () => {
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationTime, setCalculationTime] = useState(0);
    const startCalculation = useCallback(() => {
        setIsCalculating(true);
        return performance.now();
    }, []);
    const endCalculation = useCallback((startTime: number) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        setCalculationTime(duration);
        setIsCalculating(false);
        if (duration > 1000) {
            console.warn(`Slow calculation detected: ${duration}ms`);
        }
    }, []);
    return { isCalculating, calculationTime, startCalculation, endCalculation };
};

// Memoized input validation
const useMemoizedValidation = (employers: Employer[], age: number) => {
    return useMemo(() => {
        return validateEmployers(employers, age);
    }, [employers, age]);
};

// Report Generator Component
const ReportGenerator = ({ 
    results, 
    employers, 
    workingConditions, 
    age, 
    taxYear, 
    actualPAYE, 
    payeFrequency,
    name,
    surname,
    onClose 
}: {
    results: TaxCalculationResult;
    employers: Employer[];
    workingConditions: WorkingConditions;
    age: number;
    taxYear: number;
    actualPAYE: number;
    payeFrequency: FrequencyType;
    name: string;
    surname: string;
    onClose: () => void;
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [logoBase64, setLogoBase64] = useState<string>('');

    // Load logo from public folder
    useEffect(() => {
        const loadLogo = async () => {
            try {
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

    const calculationDate = new Date().toLocaleDateString('en-ZA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const reportId = `PAYE-${Date.now().toString(36).toUpperCase()}`;
    const effectiveTaxRate = ((results.taxLiability / results.grossIncome) * 100).toFixed(1);
    const comparison = actualPAYE > 0 ? calculatePAYEComparison(results.taxLiability, actualPAYE, payeFrequency) : null;

    const getReportHTML = () => {
        const monthlyGross = results.grossIncome / 12;
        const monthlyPension = results.deductions.total / 12;
        const monthlyUIF = results.UIF / 12;
        const monthlyTakeHome = (results.grossIncome - results.deductions.total - results.taxLiability - results.UIF) / 12;

        // Determine tax bracket
        const getTaxBracket = () => {
            const yearData = TAX_YEAR_DATA[taxYear as TaxYear];
            const brackets = yearData.BRACKETS;
            const taxableIncome = results.taxableIncome;
            for (let i = 0; i < brackets.length - 1; i++) {
                if (taxableIncome <= brackets[i].threshold) {
                    const prevThreshold = i > 0 ? brackets[i - 1].threshold : 0;
                    return {
                        rate: `${(brackets[i].rate * 100).toFixed(0)}%`,
                        range: `R${prevThreshold.toLocaleString()} - R${brackets[i].threshold.toLocaleString()}`
                    };
                }
            }
            // Last bracket
            const lastBracket = brackets[brackets.length - 2];
            return {
                rate: `${(brackets[brackets.length - 1].rate * 100).toFixed(0)}%`,
                range: `R${lastBracket.threshold.toLocaleString()} and above`
            };
        };

        const taxBracket = getTaxBracket();
        const payeStatus = comparison ? (comparison.isUnderpaid ? 'UNDERPAID' : 'OVERPAID') : null;
        const statusColor = comparison ? (comparison.isUnderpaid ? '#dc2626' : '#059669') : '#3b82f6';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAYE Tax Report - ${name} ${surname}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
        .logo { width: 80px; height: 80px; margin: 0 auto 20px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .logo-text { font-size: 32px; font-weight: bold; color: #1e40af; }
        .company-name { font-size: 32px; font-weight: bold; margin-bottom: 5px; }
        .tagline { font-size: 14px; opacity: 0.9; margin-bottom: 20px; font-style: italic; }
        .report-title { font-size: 24px; font-weight: 600; margin: 20px 0 10px; }
        .report-meta { font-size: 14px; opacity: 0.9; }
        .report-id { margin-top: 5px; font-size: 12px; }
        .client-info { background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .client-info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .client-info-item { padding: 15px; background: #f9fafb; border-radius: 8px; }
        .client-info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .client-info-value { font-size: 18px; font-weight: 600; color: #1f2937; }
        .dashboard { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
        .dashboard-title { font-size: 24px; font-weight: 600; margin-bottom: 30px; text-align: center; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
        .dashboard-item { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 25px; border-radius: 12px; }
        .dashboard-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; margin-bottom: 8px; }
        .dashboard-value { font-size: 32px; font-weight: bold; }
        .dashboard-status { grid-column: 1 / -1; padding: 20px; background: ${statusColor}; border-radius: 12px; text-align: center; font-weight: bold; font-size: 20px; margin-top: 10px; }
        .emp-section { background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .emp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .emp-item { padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .emp-label { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
        .emp-value { font-size: 16px; font-weight: 600; color: #1f2937; }
        .working-conditions { margin-top: 20px; padding: 20px; background: #f0f9ff; border-radius: 8px; }
        .condition-item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #dbeafe; }
        .condition-item:last-child { border-bottom: none; }
        .condition-label { flex: 1; color: #1e40af; font-weight: 500; }
        .condition-status { font-weight: bold; }
        .tax-bracket-box { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 40px; border-radius: 12px; text-align: center; margin-top: 20px; }
        .tax-bracket-percentage { font-size: 64px; font-weight: bold; margin: 20px 0; }
        .tax-bracket-range { font-size: 16px; opacity: 0.9; }
        .action-box { background: ${comparison?.isUnderpaid ? '#fee2e2' : '#dcfce7'}; border: 2px solid ${comparison?.isUnderpaid ? '#dc2626' : '#059669'}; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .action-title { font-size: 24px; font-weight: bold; color: ${comparison?.isUnderpaid ? '#991b1b' : '#166534'}; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .action-text { color: ${comparison?.isUnderpaid ? '#991b1b' : '#166534'}; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
        .recommendations { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${comparison?.isUnderpaid ? '#dc2626' : '#059669'}; }
        .rec-title { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        .rec-list { list-style: none; padding: 0; }
        .rec-list li { padding: 10px 0; padding-left: 30px; position: relative; color: #374151; }
        .rec-list li:before { content: '✓'; position: absolute; left: 0; color: ${comparison?.isUnderpaid ? '#dc2626' : '#059669'}; font-weight: bold; font-size: 18px; }
        .savings-box { background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; }
        .protips-box { background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .protips-title { font-size: 20px; font-weight: 600; color: #1e40af; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .protips-list { list-style: none; padding: 0; }
        .protips-list li { padding: 12px 0; padding-left: 30px; position: relative; color: #1e40af; border-bottom: 1px solid #bfdbfe; }
        .protips-list li:last-child { border-bottom: none; }
        .protips-list li:before { content: '💡'; position: absolute; left: 0; font-size: 18px; }
        .section { background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .section-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1f2937; display: flex; align-items: center; gap: 10px; }
        .section-icon { font-size: 24px; }
        .card { padding: 20px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
        .footer { text-align: center; padding: 30px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; margin-top: 40px; }
        @media print { body { background: white; } .container { padding: 20px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                ${logoBase64 ? `<img src="${logoBase64}" alt="AlloB Consultants Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;" />` : '<div class="logo-text">AB</div>'}
            </div>
            <div class="company-name">AlloB Consultants</div>
            <div class="tagline">Integrity and Innovation</div>
            <div class="report-title">PAYE Tax Calculation Report</div>
            <div class="report-meta">
                Generated on ${calculationDate}
                <div class="report-id">Report ID: ${reportId}</div>
            </div>
        </div>

        <!-- Dashboard: Key Figures at a Glance -->
        <div class="dashboard">
            <div class="dashboard-title">📊 Key Figures at a Glance</div>
            <div class="dashboard-grid">
                <div class="dashboard-item">
                    <div class="dashboard-label">ANNUAL INCOME</div>
                    <div class="dashboard-value">${formatCurrency(results.grossIncome)}</div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-label">TAX LIABILITY</div>
                    <div class="dashboard-value">${formatCurrency(results.taxLiability)}</div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-label">EFFECTIVE TAX RATE</div>
                    <div class="dashboard-value">${effectiveTaxRate}%</div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-label">MONTHLY PAYE</div>
                    <div class="dashboard-value">${formatCurrency(results.monthlyPAYE)}</div>
                </div>
                ${payeStatus ? `<div class="dashboard-status">${payeStatus === 'UNDERPAID' ? '⚠️' : '✅'} ${payeStatus}</div>` : ''}
            </div>
        </div>

        <!-- Personal Information -->
        <div class="client-info">
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #1f2937;">Client Information</h2>
            <div class="client-info-grid">
                <div class="client-info-item">
                    <div class="client-info-label">Full Name</div>
                    <div class="client-info-value">${name || 'Not Provided'} ${surname || ''}</div>
                </div>
                <div class="client-info-item">
                    <div class="client-info-label">Age</div>
                    <div class="client-info-value">${age} years</div>
                </div>
                <div class="client-info-item">
                    <div class="client-info-label">Tax Year</div>
                    <div class="client-info-value">${taxYear}</div>
                </div>
                <div class="client-info-item">
                    <div class="client-info-label">Report Date</div>
                    <div class="client-info-value">${calculationDate}</div>
                </div>
            </div>
        </div>

        <!-- Employment Information -->
        <div class="emp-section">
            <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">💼</span> Employment Information
            </h2>
            ${employers.map((emp, idx) => `
                <div style="margin-bottom: ${idx < employers.length - 1 ? '30px' : '0'}; padding-bottom: ${idx < employers.length - 1 ? '30px' : '0'}; border-bottom: ${idx < employers.length - 1 ? '2px solid #e5e7eb' : 'none'};">
                    <h3 style="font-size: 18px; font-weight: 600; color: #1e40af; margin-bottom: 15px;">${emp.name || `Employer ${idx + 1}`}</h3>
                    <div class="emp-grid">
                        <div class="emp-item">
                            <div class="emp-label">Monthly Income</div>
                            <div class="emp-value">${formatCurrency(emp.income.amount * (emp.income.frequency === 'monthly' ? 1 : emp.income.frequency === 'annual' ? 1/12 : emp.income.frequency === 'weekly' ? 52/12 : 1))} (${emp.income.frequency})</div>
                        </div>
                        <div class="emp-item">
                            <div class="emp-label">Annual Income</div>
                            <div class="emp-value">${formatCurrency(emp.income.amount * (emp.income.frequency === 'monthly' ? 12 : emp.income.frequency === 'annual' ? 1 : emp.income.frequency === 'weekly' ? 52 : 1))}</div>
                        </div>
                        <div class="emp-item">
                            <div class="emp-label">Pension Contribution</div>
                            <div class="emp-value">${formatCurrency(emp.pensionContribution.amount)} (${emp.pensionContribution.frequency})</div>
                        </div>
                    </div>
                </div>
            `).join('')}

            <!-- Working Conditions -->
            <div class="working-conditions">
                <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin-bottom: 15px;">Working Conditions</h4>
                <div class="condition-item">
                    <span class="condition-label">Works From Home:</span>
                    <span class="condition-status">${workingConditions.worksFromHome ? '✓ Yes' : '✗ No'}</span>
                </div>
                <div class="condition-item">
                    <span class="condition-label">Dedicated Workspace:</span>
                    <span class="condition-status">${workingConditions.hasDedicatedWorkspace ? '✓ Yes' : '✗ No'}</span>
                </div>
                <div class="condition-item">
                    <span class="condition-label">Travel Allowance:</span>
                    <span class="condition-status">${workingConditions.hasVariableTravelAllowance ? '✓ Yes' : '✗ No'}</span>
                </div>
            </div>

            <!-- Tax Bracket -->
            <div class="tax-bracket-box">
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Tax Bracket</div>
                <div class="tax-bracket-percentage">${taxBracket.rate}</div>
                <div class="tax-bracket-range">${taxBracket.range}</div>
            </div>
        </div>

        <!-- Tax Calculation Breakdown -->
        <div class="section">
            <h2 class="section-title">
                <span class="section-icon">🧮</span>
                Complete Tax Calculation Breakdown
            </h2>
            <div class="card" style="padding: 30px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #1e40af;">Annual Breakdown</h3>
                <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 3px solid #1e40af;">
                    <span style="font-weight: 600; font-size: 16px;">Total Income</span>
                    <span style="font-weight: bold; font-size: 20px; color: #1e40af;">${formatCurrency(results.grossIncome)}</span>
                </div>
                <div style="margin-top: 15px;">
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; color: #dc2626;">
                        <span style="font-weight: 600;">Less: Deductions</span>
                        <span></span>
                    </div>
                    <div style="margin-left: 30px; font-size: 14px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; color: #4b5563;">
                            <span>• Pension Contributions</span>
                            <span style="font-weight: 500;">(${formatCurrency(results.deductions.pensionFund || 0)})</span>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626; font-weight: 600;">
                        <span>Total Deductions</span>
                        <span>(${formatCurrency(results.deductions.total)})</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px; border-bottom: 2px solid #d1d5db; background: #eff6ff; border-radius: 8px; margin-top: 10px;">
                    <span style="font-weight: 600; font-size: 16px;">Taxable Income</span>
                    <span style="font-weight: bold; font-size: 20px; color: #1e40af;">${formatCurrency(results.taxableIncome)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span style="font-weight: 600;">Less: Tax</span>
                    <span style="font-weight: bold; font-size: 18px;">(${formatCurrency(results.taxLiability)})</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px; background: #dcfce7; border-radius: 8px; margin-top: 10px; border-bottom: 1px solid #bbf7d0;">
                    <span style="font-weight: 600; font-size: 16px;">Net Earnings (After Tax)</span>
                    <span style="font-weight: bold; font-size: 20px; color: #059669;">${formatCurrency(results.grossIncome - results.taxLiability)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span style="font-weight: 600;">Less: UIF Contribution</span>
                    <span style="font-weight: bold; font-size: 18px;">(${formatCurrency(results.UIF)})</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 20px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border-radius: 8px; margin-top: 15px;">
                    <span style="font-weight: bold; font-size: 18px;">Annual Take Home</span>
                    <span style="font-weight: bold; font-size: 24px;">${formatCurrency(results.grossIncome - results.deductions.total - results.taxLiability - results.UIF)}</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">
                <span class="section-icon">📅</span>
                Monthly Breakdown
            </h2>
            <div class="card" style="padding: 30px; background: #f9fafb;">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #4b5563;">Monthly Gross Income</span>
                    <span style="font-weight: 600; color: #1f2937;">${formatCurrency(results.grossIncome / 12)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span>Monthly Pension</span>
                    <span style="font-weight: 600;">(${formatCurrency(results.deductions.total / 12)})</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span>Monthly PAYE</span>
                    <span style="font-weight: 600;">(${formatCurrency(results.monthlyPAYE)})</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span>Monthly UIF</span>
                    <span style="font-weight: 600;">(${formatCurrency(results.UIF / 12)})</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 20px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border-radius: 8px; margin-top: 15px;">
                    <span style="font-weight: bold; font-size: 16px;">Monthly Take Home</span>
                    <span style="font-weight: bold; font-size: 22px;">${formatCurrency((results.grossIncome - results.deductions.total - results.taxLiability - results.UIF) / 12)}</span>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Effective Tax Rate</div>
                    <div style="font-size: 28px; font-weight: bold; color: #1e40af;">${effectiveTaxRate}%</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Primary Rebate</div>
                    <div style="font-size: 28px; font-weight: bold; color: #1e40af;">${formatCurrency(results.primaryRebate)}</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Total Deductions</div>
                    <div style="font-size: 28px; font-weight: bold; color: #1e40af;">${formatCurrency(results.deductions.total)}</div>
                </div>
            </div>
        </div>

        ${comparison ? `
        <div class="section">
            <h2 class="section-title">
                <span class="section-icon">⚖️</span>
                PAYE Comparison Analysis
            </h2>
            <div class="card" style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <span>Calculated Annual Tax:</span>
                    <span style="font-weight: 600;">${formatCurrency(comparison.calculatedTax)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <span>Your Current Annual PAYE:</span>
                    <span style="font-weight: 600;">${formatCurrency(comparison.actualPaid)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px 0; font-weight: 600; color: ${comparison.isUnderpaid ? '#dc2626' : '#059669'};">
                    <span>Difference:</span>
                    <span style="font-size: 18px;">${formatCurrency(comparison.difference)} (${comparison.status})</span>
                </div>
            </div>
        </div>
        ` : ''}

        ${comparison ? `
        <!-- Recommended Actions / Good News -->
        <div class="action-box">
            <div class="action-title">
                <span>${comparison.isUnderpaid ? '⚠️' : '✅'}</span>
                ${comparison.isUnderpaid ? 'Action Required - You Are Underpaying PAYE' : 'Good News - You Are Overpaying PAYE'}
            </div>
            <div class="action-text">
                ${comparison.isUnderpaid 
                    ? `You are currently underpaying your PAYE by ${formatCurrency(comparison.difference)} annually. This means you may owe additional tax when you file your tax return. It's recommended to adjust your monthly PAYE deductions to avoid a year-end surprise.`
                    : `You are currently overpaying your PAYE by ${formatCurrency(comparison.difference)} annually. This means you are entitled to a tax refund when you file your tax return. You can also request an adjustment to reduce your monthly PAYE deductions.`
                }
            </div>
            <div class="recommendations">
                <div class="rec-title">
                    <span>📋</span> Recommended Actions:
                </div>
                <ul class="rec-list">
                    ${comparison.isUnderpaid ? `
                        <li>Request your employer to increase monthly PAYE by ${formatCurrency(comparison.monthlyAdditional)}</li>
                        <li>Make voluntary PAYE payments through the SARS eFiling platform</li>
                        <li>Update your tax directive with SARS to reflect correct deductions</li>
                        <li>Budget for potential year-end tax payment of ${formatCurrency(comparison.difference)}</li>
                        <li>Keep all supporting documents for verification</li>
                    ` : `
                        <li>File your tax return to claim your refund of ${formatCurrency(comparison.difference)}</li>
                        <li>Request your employer to reduce monthly PAYE by ${formatCurrency(comparison.monthlyAdditional)}</li>
                        <li>Update your tax directive with SARS</li>
                        <li>Ensure you file within 5 years to claim the refund</li>
                        <li>Keep all supporting documents for verification</li>
                    `}
                </ul>
                ${!comparison.isUnderpaid ? `
                <div class="savings-box">
                    <div>
                        <div style="font-size: 12px; color: #166534; font-weight: 600; margin-bottom: 5px;">Potential Monthly Savings:</div>
                        <div style="font-size: 24px; font-weight: bold; color: #166534;">${formatCurrency(comparison.monthlyAdditional)}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #166534; font-weight: 600; margin-bottom: 5px;">Estimated Refund:</div>
                        <div style="font-size: 24px; font-weight: bold; color: #166534;">${formatCurrency(comparison.difference)}</div>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>

        <!-- Pro Tips -->
        <div class="protips-box">
            <div class="protips-title">
                <span>💡</span> Pro Tips for Managing Your PAYE:
            </div>
            <ul class="protips-list">
                <li>Make voluntary PAYE payments through the SARS eFiling platform if underpaid</li>
                <li>Consider quarterly payments to spread the tax burden evenly</li>
                <li>Keep detailed records of all PAYE payments for verification</li>
                <li>Review and update your PAYE when your income changes significantly</li>
                <li>File your tax return annually even if you're a salaried employee</li>
                <li>Claim all eligible deductions to minimize your tax liability</li>
                <li>Set up email notifications on eFiling for SARS correspondence</li>
            </ul>
        </div>
        ` : ''}

        ${results.warnings.length > 0 ? `
        <div class="section">
            <h2 class="section-title">
                <span class="section-icon">⚠️</span>
                Important Advisories
            </h2>
            <ul class="rec-list" style="padding-left: 20px; margin-top: 10px;">
                ${results.warnings.map(w => `<li style="margin-bottom: 8px; color: #d97706;">• ${w}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="footer">
            <p><strong>AlloB Consultants</strong> - Integrity and Innovation</p>
            <p style="margin-top: 10px;">Contact: +27 67 921 1947 | itax@allob.co.za</p>
            <p style="margin-top: 10px; font-size: 11px;">This report is for informational purposes only. Please consult with a registered tax practitioner.</p>
            <p style="margin-top: 5px; font-size: 11px;">Report ID: ${reportId} | Generated: ${calculationDate}</p>
        </div>
    </div>
</body>
</html>`;
    };

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
                        <span className="text-2xl">×</span>
                    </button>
                </div>
                <div className="p-6">
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
                            <span className="text-xl">🖨️</span>
                            Print / Save PDF
                        </button>
                        <button 
                            onClick={downloadHTML} 
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
                        >
                            <span className="text-xl">⬇️</span>
                            Download HTML
                        </button>
                    </div>
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
                </div>
            </div>
        </div>
    );
};

// Main Tax Calculator Component
const TaxCalculator = () => {
    const [employers, setEmployers] = useState<Employer[]>([{
        name: '',
        income: { amount: 0, frequency: 'monthly' as FrequencyType },
        pensionContribution: { amount: 0, frequency: 'monthly' as FrequencyType },
        hasDeductibleExpenses: false,
        deductibleExpenses: { amount: 0, frequency: 'monthly' as FrequencyType }
    }]);
    const [workingConditions, setWorkingConditions] = useState<WorkingConditions>({
        worksFromHome: false,
        hasDedicatedWorkspace: false,
        hasVariableTravelAllowance: false
    });
    const [selectedYear, setSelectedYear] = useState<TaxYear>(2025);
    const [age, setAge] = useState<number>(30);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [results, setResults] = useState<TaxCalculationResult | null>(null);
    const [actualPAYE, setActualPAYE] = useState<number>(0);
    const [payeFrequency, setPayeFrequency] = useState<FrequencyType>('monthly');
    const [showComparison, setShowComparison] = useState<boolean>(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const { isCalculating, calculationTime, startCalculation, endCalculation } = usePerformanceMonitor();
    const validation = useMemoizedValidation(employers, age);

    const debouncedCalculate = useCallback(
        debounce(() => {
            if (!validation.isValid) {
                setCalculationError('Please fix validation errors before calculating');
                return;
            }
            const startTime = startCalculation();
            setCalculationError(null);
            try {
                setTimeout(() => {
                    try {
                        const result = calculateTaxLiability(employers, workingConditions, age, selectedYear);
                        setResults(result);
                        endCalculation(startTime);
                    } catch (error) {
                        console.error('Calculation error:', error);
                        setCalculationError('Failed to calculate tax. Please refresh and try again.');
                        endCalculation(startTime);
                    }
                }, 0);
            } catch (error) {
                console.error('Calculation setup error:', error);
                setCalculationError('Failed to start calculation. Please refresh and try again.');
                endCalculation(startTime);
            }
        }, 500),
        [employers, workingConditions, age, selectedYear, validation.isValid, startCalculation, endCalculation]
    );

    const handleEmployerChange = useCallback((index: number, field: keyof Employer, value: any) => {
        setEmployers(prev => {
            const updatedEmployers = [...prev];
            if (field === 'income' || field === 'pensionContribution' || field === 'deductibleExpenses') {
                updatedEmployers[index] = {
                    ...updatedEmployers[index],
                    [field]: { 
                        ...(updatedEmployers[index][field] as any), 
                        ...(typeof value === 'object' && value !== null ? value : { amount: value }) 
                    }
                };
            } else {
                updatedEmployers[index] = {
                    ...updatedEmployers[index],
                    [field]: value
                };
            }
            return updatedEmployers;
        });
        setResults(null);
        setShowComparison(false);
    }, []);

    const addEmployer = useCallback(() => {
        setEmployers(prev => [...prev, {
            name: '',
            income: { amount: 0, frequency: 'monthly' },
            pensionContribution: { amount: 0, frequency: 'monthly' },
            hasDeductibleExpenses: false,
            deductibleExpenses: { amount: 0, frequency: 'monthly' }
        }]);
    }, []);

    const removeEmployer = useCallback((index: number) => {
        if (employers.length > 1) {
            setEmployers(prev => prev.filter((_, i) => i !== index));
        }
    }, [employers.length]);

    const calculateTax = useCallback(() => {
        debouncedCalculate();
    }, [debouncedCalculate]);

    const comparisonValues = useMemo(() => {
        if (!results || actualPAYE <= 0) return null;
        return calculatePAYEComparison(results.taxLiability, actualPAYE, payeFrequency);
    }, [results, actualPAYE, payeFrequency]);

    const setYear = useCallback((newYear: number) => {
        setSelectedYear(newYear as TaxYear);
        setResults(null);
        setShowComparison(false);
    }, []);

    const handleGenerateReport = () => {
        if (!results) {
            alert('Please calculate your tax first');
            return;
        }
        setShowReportGenerator(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {calculationTime > 0 && (
                                <div className="text-xs text-gray-500">
                                    Last calculation: {calculationTime.toFixed(0)}ms
                                </div>
                            )}
                        </div>
                        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+27 67 921 1947</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>itax@allob.co.za</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">My PAYE Calculator</h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Calculate accurate PAYE across multiple income sources to avoid year-end tax surprises. 
                        Our innovative tool helps you plan proactively and stay compliant with SARS.
                    </p>
                </div>
            </div>

            {/* Main Calculator */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        {/* Calculator Header */}
                        <div className="text-center mb-8">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calculator className={`w-8 h-8 text-blue-600 ${isCalculating ? 'animate-pulse' : ''}`} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                South African PAYE Tax Calculator
                            </h2>
                            <p className="text-gray-600">Year of Assessment {selectedYear}</p>
                            {isCalculating && (
                                <div className="mt-2">
                                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
                                        Calculating...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Validation Errors */}
                        {!validation.isValid && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-red-800 mb-2">Please fix the following errors:</h4>
                                        <ul className="space-y-1">
                                            {validation.errors.map((error, index) => (
                                                <li key={index} className="text-red-700 text-sm">• {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Calculation Error */}
                        {calculationError && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-red-800 mb-1">Calculation Error</h4>
                                        <p className="text-red-700 text-sm">{calculationError}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Personal Information */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                                    <input
                                        type="text"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your surname"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Assessment</label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your age"
                                        min="18"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Employers Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Employment Income</h3>
                                <button
                                    onClick={addEmployer}
                                    disabled={isCalculating}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add Employer
                                </button>
                            </div>
                            {employers.map((employer, index) => (
                                <div key={index} className="mb-6 p-6 border rounded-lg bg-gray-50">
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Employer Name
                                            </label>
                                            <input
                                                type="text"
                                                value={employer.name}
                                                onChange={(e) => handleEmployerChange(index, 'name', e.target.value)}
                                                disabled={isCalculating}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                placeholder="Enter employer name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Income Amount
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={employer.income.amount}
                                                    onChange={(e) => handleEmployerChange(index, 'income', { amount: Number(e.target.value) })}
                                                    disabled={isCalculating}
                                                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                    placeholder="Amount"
                                                    min="0"
                                                />
                                                <select
                                                    value={employer.income.frequency}
                                                    onChange={(e) => handleEmployerChange(index, 'income', { frequency: e.target.value as FrequencyType })}
                                                    disabled={isCalculating}
                                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                >
                                                    <option value="once-off">Once-off</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pension Contribution
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={employer.pensionContribution.amount}
                                                    onChange={(e) => handleEmployerChange(index, 'pensionContribution', { amount: Number(e.target.value) })}
                                                    disabled={isCalculating}
                                                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                    placeholder="Amount"
                                                    min="0"
                                                />
                                                <select
                                                    value={employer.pensionContribution.frequency}
                                                    onChange={(e) => handleEmployerChange(index, 'pensionContribution', { frequency: e.target.value as FrequencyType })}
                                                    disabled={isCalculating}
                                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                >
                                                    <option value="once-off">Once-off</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {employers.length > 1 && (
                                        <button
                                            onClick={() => removeEmployer(index)}
                                            disabled={isCalculating}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Remove Employer
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Working Conditions */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Working Conditions</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <label className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.worksFromHome}
                                        onChange={(e) => setWorkingConditions(prev => ({ ...prev, worksFromHome: e.target.checked }))}
                                        disabled={isCalculating}
                                        className="h-4 w-4"
                                    />
                                    <div>
                                        <div className="font-medium">Works From Home</div>
                                        <div className="text-sm text-gray-500">Do you perform work duties from home?</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.hasDedicatedWorkspace}
                                        onChange={(e) => setWorkingConditions(prev => ({ ...prev, hasDedicatedWorkspace: e.target.checked }))}
                                        disabled={isCalculating}
                                        className="h-4 w-4"
                                    />
                                    <div>
                                        <div className="font-medium">Dedicated Workspace</div>
                                        <div className="text-sm text-gray-500">Do you have a dedicated, clearly defined workspace at home?</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.hasVariableTravelAllowance}
                                        onChange={(e) => setWorkingConditions(prev => ({ ...prev, hasVariableTravelAllowance: e.target.checked }))}
                                        disabled={isCalculating}
                                        className="h-4 w-4"
                                    />
                                    <div>
                                        <div className="font-medium">Variable Travel Allowance</div>
                                        <div className="text-sm text-gray-500">Do you receive a travel allowance or claim travel expenses?</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={calculateTax}
                            disabled={!validation.isValid || isCalculating}
                            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg mb-6"
                        >
                            {isCalculating ? 'Calculating...' : 'Calculate Tax'}
                        </button>

                        {/* Results Section */}
                        {results && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-200">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tax Calculation Results</h3>
                                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                        {/* Annual Breakdown */}
                                        <div className="p-6">
                                            <h4 className="text-lg font-semibold text-blue-900 mb-4">Annual Breakdown</h4>
                                            {/* Total Income */}
                                            <div className="flex justify-between items-center py-3 border-b-2 border-blue-900">
                                                <span className="font-semibold text-gray-900">Total Income</span>
                                                <span className="font-bold text-xl text-blue-900">{formatCurrency(results.grossIncome)}</span>
                                            </div>
                                            {/* Less Deductions */}
                                            <div className="mt-3">
                                                <div className="flex justify-between items-center py-2 text-red-700">
                                                    <span className="font-medium">Less: Deductions</span>
                                                    <span></span>
                                                </div>
                                                <div className="ml-6 space-y-2 text-sm">
                                                    <div className="flex justify-between items-center py-2 text-gray-700">
                                                        <span>• Pension Contributions</span>
                                                        <span className="font-medium">({formatCurrency(results.deductions.pensionFund || 0)})</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b text-red-700 font-medium">
                                                    <span>Total Deductions</span>
                                                    <span>({formatCurrency(results.deductions.total)})</span>
                                                </div>
                                            </div>
                                            {/* Taxable Income */}
                                            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 bg-blue-50 px-3 rounded mt-2">
                                                <span className="font-semibold text-gray-900">Taxable Income</span>
                                                <span className="font-bold text-xl text-blue-900">{formatCurrency(results.taxableIncome)}</span>
                                            </div>
                                            {/* Tax */}
                                            <div className="flex justify-between items-center py-3 border-b text-red-700">
                                                <span className="font-semibold">Less: Tax</span>
                                                <span className="font-bold text-lg">({formatCurrency(results.taxLiability)})</span>
                                            </div>
                                            {/* Net Earnings */}
                                            <div className="flex justify-between items-center py-3 border-b bg-green-50 px-3 rounded mt-2">
                                                <span className="font-semibold text-gray-900">Net Earnings (After Tax)</span>
                                                <span className="font-bold text-xl text-green-700">{formatCurrency(results.grossIncome - results.taxLiability)}</span>
                                            </div>
                                            {/* UIF */}
                                            <div className="flex justify-between items-center py-3 border-b text-red-700">
                                                <span className="font-semibold">Less: UIF Contribution</span>
                                                <span className="font-bold text-lg">({formatCurrency(results.UIF)})</span>
                                            </div>
                                            {/* Take Home */}
                                            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 rounded-lg mt-3">
                                                <span className="font-bold text-lg">Annual Take Home</span>
                                                <span className="font-bold text-2xl">{formatCurrency(results.grossIncome - results.deductions.total - results.taxLiability - results.UIF)}</span>
                                            </div>
                                        </div>
                                        {/* Monthly Breakdown */}
                                        <div className="bg-gray-50 p-6 border-t-2 border-gray-200">
                                            <h4 className="text-lg font-semibold text-blue-900 mb-4">Monthly Breakdown</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray-700">Monthly Gross Income</span>
                                                    <span className="font-semibold text-gray-900">{formatCurrency(results.grossIncome / 12)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-red-700">
                                                    <span>Monthly Pension</span>
                                                    <span className="font-medium">({formatCurrency(results.deductions.total / 12)})</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-red-700">
                                                    <span>Monthly PAYE</span>
                                                    <span className="font-medium">({formatCurrency(results.monthlyPAYE)})</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-red-700">
                                                    <span>Monthly UIF</span>
                                                    <span className="font-medium">({formatCurrency(results.UIF / 12)})</span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 rounded-lg mt-2">
                                                    <span className="font-bold">Monthly Take Home</span>
                                                    <span className="font-bold text-xl">{formatCurrency((results.grossIncome - results.deductions.total - results.taxLiability - results.UIF) / 12)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Additional Info */}
                                        <div className="bg-blue-50 p-6 border-t border-blue-200">
                                            <div className="grid md:grid-cols-3 gap-4 text-center">
                                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                                    <div className="text-xs text-gray-600 mb-1">Effective Tax Rate</div>
                                                    <div className="text-2xl font-bold text-blue-900">{((results.taxLiability / results.grossIncome) * 100).toFixed(1)}%</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                                    <div className="text-xs text-gray-600 mb-1">Primary Rebate</div>
                                                    <div className="text-2xl font-bold text-blue-900">{formatCurrency(results.primaryRebate)}</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                                    <div className="text-xs text-gray-600 mb-1">Total Deductions</div>
                                                    <div className="text-2xl font-bold text-blue-900">{formatCurrency(results.deductions.total)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {results.warnings.length > 0 && (
                                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5" />
                                                Important Notes:
                                            </h4>
                                            <ul className="space-y-1">
                                                {results.warnings.map((warning, index) => (
                                                    <li key={index} className="text-yellow-700 text-sm">• {warning}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* PAYE Comparison Section */}
                                {!showComparison && (
                                    <button
                                        onClick={() => setShowComparison(true)}
                                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        Compare with Current PAYE
                                    </button>
                                )}
                                {showComparison && (
                                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">PAYE Comparison</h3>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Your Current PAYE Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    value={actualPAYE}
                                                    onChange={(e) => setActualPAYE(Number(e.target.value))}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="Enter PAYE amount"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Payment Frequency
                                                </label>
                                                <select
                                                    value={payeFrequency}
                                                    onChange={(e) => setPayeFrequency(e.target.value as FrequencyType)}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                >
                                                    <option value="monthly">Monthly</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                        {comparisonValues && (
                                            <div className={`rounded-lg p-4 ${comparisonValues.status === 'underpaid' ? 'bg-red-50 border border-red-200' : comparisonValues.status === 'overpaid' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">Calculated Annual Tax:</span>
                                                        <span className="font-bold">{formatCurrency(comparisonValues.calculatedTax)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">Your Annual PAYE:</span>
                                                        <span className="font-bold">{formatCurrency(comparisonValues.actualPaid)}</span>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t">
                                                        <span className="font-bold">Difference:</span>
                                                        <span className={`font-bold ${comparisonValues.isUnderpaid ? 'text-red-600' : 'text-green-600'}`}>
                                                            {formatCurrency(comparisonValues.difference)} ({comparisonValues.status})
                                                        </span>
                                                    </div>
                                                    {comparisonValues.isUnderpaid && (
                                                        <div className="mt-4 bg-red-100 rounded p-3">
                                                            <p className="text-red-800 text-sm font-medium">
                                                                ⚠️ You need to pay an additional {formatCurrency(comparisonValues.monthlyAdditional)} per month
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Report Generator Button */}
                                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-200">
                                    <div className="text-center">
                                        <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                                            Download or Email Your Report
                                        </h4>
                                        <p className="text-gray-600 mb-4 text-sm">
                                            Get a professional PDF report of your tax calculation
                                        </p>
                                        <button
                                            onClick={handleGenerateReport}
                                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                                        >
                                            <FileText className="w-5 h-5" />
                                            <span>Generate Report</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Generator Modal */}
            {showReportGenerator && results && (
                <ReportGenerator
                    results={results}
                    employers={employers}
                    workingConditions={workingConditions}
                    age={age}
                    taxYear={selectedYear}
                    actualPAYE={actualPAYE}
                    payeFrequency={payeFrequency}
                    name={name}
                    surname={surname}
                    onClose={() => setShowReportGenerator(false)}
                />
            )}
        </div>
    );
};

export default TaxCalculator;