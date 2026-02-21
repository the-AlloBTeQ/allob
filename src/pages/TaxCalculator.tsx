import { useState, useMemo, useCallback, useEffect } from 'react';
import { Calculator, CreditCard, AlertCircle, Phone, Mail, FileText, ChevronDown, ChevronUp, Heart, Shield } from 'lucide-react';
import { debounce } from 'lodash';
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

// ─── Extended Types ────────────────────────────────────────────────────────────

interface MedicalAidInfo {
    isMainMember: boolean;
    numberOfDependents: number;
    monthlyContribution: number;
    hasDisability: boolean;
}

interface OtherDeductions {
    providentFundAmount: number;
    providentFundFrequency: FrequencyType;
    retirementAnnuityAmount: number;
    retirementAnnuityFrequency: FrequencyType;
    incomeProtectionAmount: number;
    incomeProtectionFrequency: FrequencyType;
    donationsAmount: number;
    travelAllowanceAnnual: number;
    businessTravelKm: number;
}

const MEDICAL_CREDITS = {
    mainMember: 364,
    firstDependent: 364,
    additionalDependent: 246,
};

const emptyOtherDeductions = (): OtherDeductions => ({
    providentFundAmount: 0,
    providentFundFrequency: 'monthly',
    retirementAnnuityAmount: 0,
    retirementAnnuityFrequency: 'monthly',
    incomeProtectionAmount: 0,
    incomeProtectionFrequency: 'monthly',
    donationsAmount: 0,
    travelAllowanceAnnual: 0,
    businessTravelKm: 0,
});

// ─── Validation ────────────────────────────────────────────────────────────────

function validateEmployers(employers: Employer[], age: number) {
    const errors: string[] = [];
    if (!Array.isArray(employers) || employers.length === 0) errors.push('At least one employer must be provided.');
    employers.forEach((emp, idx) => {
        if (!emp.name || emp.name.trim() === '') errors.push(`Employer ${idx + 1}: Name is required.`);
        if (typeof emp.income.amount !== 'number' || emp.income.amount <= 0) errors.push(`Employer ${idx + 1}: Income amount must be greater than zero.`);
        if (!emp.income.frequency) errors.push(`Employer ${idx + 1}: Income frequency is required.`);
        if (typeof emp.pensionContribution.amount !== 'number' || emp.pensionContribution.amount < 0) errors.push(`Employer ${idx + 1}: Pension contribution cannot be negative.`);
    });
    if (typeof age !== 'number' || age < 18 || age > 100) errors.push('Age must be between 18 and 100.');
    return { isValid: errors.length === 0, errors };
}

// ─── Utility ──────────────────────────────────────────────────────────────────

const toAnnual = (amount: number, frequency: FrequencyType): number => {
    const m: Record<FrequencyType, number> = { 'once-off': 1, 'weekly': 52, 'monthly': 12, 'annual': 1 };
    return amount * m[frequency];
};

// ─── Tax Calculation ───────────────────────────────────────────────────────────

const calculateTaxLiability = (
    employers: Employer[],
    workingConditions: WorkingConditions,
    age: number,
    taxYear: TaxYear,
    medicalAid: MedicalAidInfo,
    otherDeductions: OtherDeductions
): TaxCalculationResult & Record<string, any> => {
    const yearData = TAX_YEAR_DATA[taxYear];
    const frequencyMultipliers: Record<FrequencyType, number> = { 'once-off': 1, 'weekly': 52, 'monthly': 12, 'annual': 1 };

    // 1. Gross income + pension
    let grossIncome = 0;
    let totalPensionContributions = 0;
    employers.forEach(emp => {
        grossIncome += emp.income.amount * frequencyMultipliers[emp.income.frequency];
        totalPensionContributions += emp.pensionContribution.amount * frequencyMultipliers[emp.pensionContribution.frequency];
    });

    // 2. All retirement
    const annualProvident = toAnnual(otherDeductions.providentFundAmount, otherDeductions.providentFundFrequency);
    const annualRA = toAnnual(otherDeductions.retirementAnnuityAmount, otherDeductions.retirementAnnuityFrequency);
    const totalRetirementContributions = totalPensionContributions + annualProvident + annualRA;
    const pensionLimit = Math.min(grossIncome * yearData.PENSION_LIMITS.PERCENTAGE, yearData.PENSION_LIMITS.AMOUNT);
    const pensionDeductions = Math.min(totalRetirementContributions, pensionLimit);
    const excessPension = totalRetirementContributions - pensionDeductions;

    // 3. Income protection (fully deductible)
    const annualIncomeProtection = toAnnual(otherDeductions.incomeProtectionAmount, otherDeductions.incomeProtectionFrequency);

    // 4. Travel (20% of allowance if logbook km provided)
    const travelDeduction = otherDeductions.businessTravelKm > 0 && otherDeductions.travelAllowanceAnnual > 0
        ? Math.min(otherDeductions.travelAllowanceAnnual * 0.2, otherDeductions.travelAllowanceAnnual)
        : 0;

    // 5. Work from home
    const workFromHomeDeduction = workingConditions.worksFromHome && workingConditions.hasDedicatedWorkspace ? 1000 : 0;

    // 6. Pre-donations taxable income
    const preDonationsTaxable = Math.max(0, grossIncome - pensionDeductions - annualIncomeProtection - travelDeduction - workFromHomeDeduction);

    // 7. Donations capped at 10%
    const maxDonations = preDonationsTaxable * 0.10;
    const donationsDeduction = Math.min(otherDeductions.donationsAmount, maxDonations);

    // 8. Final taxable income
    const taxableIncome = Math.max(0, preDonationsTaxable - donationsDeduction);

    // 9. Gross tax via brackets
    let taxExpense = 0;
    const brackets = yearData.BRACKETS;
    for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i];
        if (i === brackets.length - 1) {
            taxExpense = bracket.base + (taxableIncome - brackets[i - 1].threshold) * bracket.rate;
            break;
        } else if (taxableIncome <= bracket.threshold) {
            taxExpense = bracket.base + (taxableIncome - (i > 0 ? brackets[i - 1].threshold : 0)) * bracket.rate;
            break;
        }
    }

    // 10. Age-based rebates
    let primaryRebate = yearData.REBATES.PRIMARY;
    if (age >= yearData.AGE_THRESHOLDS.TERTIARY) {
        primaryRebate = yearData.REBATES.PRIMARY + yearData.REBATES.SECONDARY + yearData.REBATES.TERTIARY;
    } else if (age >= yearData.AGE_THRESHOLDS.SECONDARY) {
        primaryRebate = yearData.REBATES.PRIMARY + yearData.REBATES.SECONDARY;
    }

    // 11. Medical Aid Tax Credit (Section 6A)
    const mainCredit = medicalAid.isMainMember ? MEDICAL_CREDITS.mainMember : 0;
    const firstDepCredit = medicalAid.numberOfDependents >= 1 ? MEDICAL_CREDITS.firstDependent : 0;
    const additionalDepsCredit = medicalAid.numberOfDependents > 1 ? (medicalAid.numberOfDependents - 1) * MEDICAL_CREDITS.additionalDependent : 0;
    const annualMedicalCredit = (mainCredit + firstDepCredit + additionalDepsCredit) * 12;

    // Additional medical deduction: age 65+ or disability — 33% of excess above 3× credit
    let additionalMedicalDeduction = 0;
    if ((age >= 65 || medicalAid.hasDisability) && medicalAid.monthlyContribution > 0) {
        const excess = Math.max(0, medicalAid.monthlyContribution * 12 - annualMedicalCredit * 3);
        additionalMedicalDeduction = excess * 0.33;
    }

    // 12. Net tax
    const taxLiability = Math.max(0, taxExpense - primaryRebate - annualMedicalCredit - additionalMedicalDeduction);
    const monthlyPAYE = taxLiability / 12;
    const UIF = Math.min(grossIncome * 0.01, 177.12 * 12);
    const totalDeductions = pensionDeductions + annualIncomeProtection + travelDeduction + workFromHomeDeduction + donationsDeduction;

    // Warnings
    const warnings: string[] = [];
    if (employers.length > 1) warnings.push('Multiple income sources detected. Ensure you get the IRP5 from each employer.');
    if (excessPension > 0) warnings.push(`Retirement contributions exceed the allowable limit. Only ${formatCurrency(pensionDeductions)} of ${formatCurrency(totalRetirementContributions)} can be deducted (27.5% or ${formatCurrency(yearData.PENSION_LIMITS.AMOUNT)}, whichever is lower).`);
    if (otherDeductions.donationsAmount > maxDonations && maxDonations > 0) warnings.push(`Donations capped at 10% of taxable income (${formatCurrency(maxDonations)}). Ensure you hold valid Section 18A certificates.`);
    if (workingConditions.worksFromHome) warnings.push('📋 Working From Home: Get a letter from your employer confirming you worked from home for the year of assessment. Keep records of electricity, internet, equipment costs with supporting invoices.');
    if (workingConditions.hasVariableTravelAllowance || otherDeductions.businessTravelKm > 0) warnings.push('🚗 Travel Allowance: Maintain a SARS-compliant logbook showing start/end locations, distance, and purpose of each business trip throughout the tax year.');
    if (employers.some(emp => emp.hasDeductibleExpenses)) warnings.push('💼 Deductible Expenses: Prepare a detailed trading statement with all supporting documents (invoices, receipts, bank statements) for SARS verification.');

    return {
        grossIncome,
        taxableIncome,
        taxLiability,
        monthlyPAYE,
        UIF,
        primaryRebate,
        deductions: {
            pensionFund: totalPensionContributions,
            pensionContributions: pensionDeductions,
            medicalAid: annualMedicalCredit,
            other: annualIncomeProtection + travelDeduction + workFromHomeDeduction + donationsDeduction,
            workFromHomeDeduction,
            travelAllowance: travelDeduction,
            businessExpenses: 0,
            total: totalDeductions
        },
        taxExpense,
        deductibleExpensesCarryForward: {},
        warnings,
        // Extended fields for display
        _medicalCredit: annualMedicalCredit,
        _additionalMedicalDeduction: additionalMedicalDeduction,
        _retirementTotal: totalRetirementContributions,
        _incomeProtection: annualIncomeProtection,
        _donations: donationsDeduction,
        _travelDeduction: travelDeduction,
    };
};

const calculatePAYEComparison = (calculatedTax: number, actualPAYE: number, frequency: FrequencyType) => {
    const m: Record<FrequencyType, number> = { 'once-off': 1, 'weekly': 52, 'monthly': 12, 'annual': 1 };
    const actualPaid = actualPAYE * m[frequency];
    const difference = Math.abs(calculatedTax - actualPaid);
    const isUnderpaid = calculatedTax > actualPaid;
    const monthlyAdditional = difference / 12;
    const status = difference > 1000 ? (isUnderpaid ? 'underpaid' : 'overpaid') : 'accurate';
    return { calculatedTax, actualPaid, difference, isUnderpaid, monthlyAdditional, status };
};

// ─── Performance Monitor ───────────────────────────────────────────────────────

const usePerformanceMonitor = () => {
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationTime, setCalculationTime] = useState(0);
    const startCalculation = useCallback(() => { setIsCalculating(true); return performance.now(); }, []);
    const endCalculation = useCallback((startTime: number) => { setCalculationTime(performance.now() - startTime); setIsCalculating(false); }, []);
    return { isCalculating, calculationTime, startCalculation, endCalculation };
};

const useMemoizedValidation = (employers: Employer[], age: number) =>
    useMemo(() => validateEmployers(employers, age), [employers, age]);

// ─── Collapsible Section ───────────────────────────────────────────────────────

const CollapsibleSection = ({
    title, icon, children, defaultOpen = false, badge
}: { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; badge?: string }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-semibold text-gray-800">{title}</span>
                    {badge && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{badge}</span>}
                </div>
                {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {open && <div className="p-6 bg-white">{children}</div>}
        </div>
    );
};

// ─── Report Generator ──────────────────────────────────────────────────────────

const ReportGenerator = ({
    results, employers, workingConditions, age, taxYear, actualPAYE, payeFrequency,
    name, surname, medicalAid, onClose
}: {
    results: TaxCalculationResult & Record<string, any>;
    employers: Employer[];
    workingConditions: WorkingConditions;
    age: number; taxYear: number; actualPAYE: number; payeFrequency: FrequencyType;
    name: string; surname: string; medicalAid: MedicalAidInfo; onClose: () => void;
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [logoBase64, setLogoBase64] = useState<string>('');
    useEffect(() => {
        fetch('/logo.png').then(r => r.ok ? r.blob() : null).then(blob => {
            if (!blob) return;
            const reader = new FileReader();
            reader.onloadend = () => setLogoBase64(reader.result as string);
            reader.readAsDataURL(blob);
        }).catch(() => {});
    }, []);

    const calculationDate = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
    const reportId = `PAYE-${Date.now().toString(36).toUpperCase()}`;
    const effectiveTaxRate = ((results.taxLiability / results.grossIncome) * 100).toFixed(1);
    const comparison = actualPAYE > 0 ? calculatePAYEComparison(results.taxLiability, actualPAYE, payeFrequency) : null;
    const statusColor = comparison ? (comparison.isUnderpaid ? '#dc2626' : '#059669') : '#3b82f6';

    const getTaxBracket = () => {
        const yearData = TAX_YEAR_DATA[taxYear as TaxYear];
        const brackets = yearData.BRACKETS;
        for (let i = 0; i < brackets.length - 1; i++) {
            if (results.taxableIncome <= brackets[i].threshold) {
                const prev = i > 0 ? brackets[i - 1].threshold : 0;
                return { rate: `${(brackets[i].rate * 100).toFixed(0)}%`, range: `R${prev.toLocaleString()} – R${brackets[i].threshold.toLocaleString()}` };
            }
        }
        return { rate: `${(brackets[brackets.length - 1].rate * 100).toFixed(0)}%`, range: `R${brackets[brackets.length - 2].threshold.toLocaleString()} and above` };
    };
    const taxBracket = getTaxBracket();

    const getReportHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PAYE Tax Report – ${name} ${surname}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#1f2937;background:#f9fafb}
.container{max-width:1100px;margin:0 auto;padding:40px 20px}
.header{background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;padding:40px;border-radius:12px;margin-bottom:25px;text-align:center}
.logo{width:80px;height:80px;margin:0 auto 16px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center}
.section{background:white;border-radius:12px;padding:28px;margin-bottom:22px;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.section-title{font-size:18px;font-weight:600;margin-bottom:18px;color:#1f2937}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}
.info-box{padding:14px;background:#f9fafb;border-radius:8px;border-left:4px solid #3b82f6}
.info-label{font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.info-value{font-size:15px;font-weight:600;color:#1f2937}
.dashboard{background:linear-gradient(135deg,#667eea,#764ba2);color:white;border-radius:12px;padding:32px;margin-bottom:22px}
.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.dash-item{background:rgba(255,255,255,.15);padding:18px;border-radius:10px}
.dash-label{font-size:11px;text-transform:uppercase;letter-spacing:1px;opacity:.85;margin-bottom:6px}
.dash-value{font-size:26px;font-weight:bold}
.row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f0f0f0}
.row:last-child{border-bottom:none}
.total-row{display:flex;justify-content:space-between;padding:14px;border-radius:8px;font-weight:bold;font-size:16px}
table{width:100%;border-collapse:collapse}
th{background:#1e40af;color:white;padding:10px 14px;text-align:left;font-size:13px}
td{padding:9px 14px;border-bottom:1px solid #e5e7eb;font-size:14px}
tr:last-child td{background:#eff6ff;font-weight:600}
.warning-box{background:#fffbeb;border:1px solid #fbbf24;border-radius:8px;padding:12px;margin-bottom:8px}
.footer{text-align:center;padding:28px;color:#6b7280;font-size:12px;border-top:1px solid #e5e7eb;margin-top:28px}
.footer-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin:18px 0;text-align:left}
.footer-col h5{font-weight:600;color:#374151;margin-bottom:8px;font-size:13px}
.footer-col ul{list-style:none}
.footer-col ul li{font-size:12px;color:#6b7280;padding:2px 0}
@media print{body{background:white}.container{padding:20px}}
</style>
</head>
<body>
<div class="container">
<div class="header">
  <div class="logo">
    ${logoBase64 ? `<img src="${logoBase64}" style="width:100%;height:100%;object-fit:contain;border-radius:50%"/>` : '<span style="font-size:26px;font-weight:bold;color:#1e40af">AB</span>'}
  </div>
  <div style="font-size:30px;font-weight:bold">AlloB Consultants</div>
  <div style="font-size:14px;opacity:.9;font-style:italic">Integrity and Innovation</div>
  <div style="font-size:20px;font-weight:600;margin:14px 0 6px">PAYE Tax Calculation Report</div>
  <div style="font-size:13px;opacity:.85">${calculationDate} &nbsp;|&nbsp; Report ID: ${reportId}</div>
</div>

<div class="dashboard">
  <div style="font-size:18px;font-weight:600;margin-bottom:18px;text-align:center">📊 Key Figures at a Glance</div>
  <div class="dash-grid">
    <div class="dash-item"><div class="dash-label">Annual Gross Income</div><div class="dash-value">${formatCurrency(results.grossIncome)}</div></div>
    <div class="dash-item"><div class="dash-label">Annual Tax Liability</div><div class="dash-value">${formatCurrency(results.taxLiability)}</div></div>
    <div class="dash-item"><div class="dash-label">Monthly PAYE</div><div class="dash-value">${formatCurrency(results.monthlyPAYE)}</div></div>
    <div class="dash-item"><div class="dash-label">Effective Tax Rate</div><div class="dash-value">${effectiveTaxRate}%</div></div>
  </div>
  ${comparison ? `<div style="margin-top:14px;padding:14px;background:${statusColor};border-radius:8px;text-align:center;font-weight:bold;font-size:17px">${comparison.isUnderpaid ? '⚠️ UNDERPAID' : '✅ OVERPAID'} by ${formatCurrency(comparison.difference)}</div>` : ''}
</div>

<div class="section">
  <div class="section-title">👤 Client Information</div>
  <div class="grid2">
    <div class="info-box"><div class="info-label">Full Name</div><div class="info-value">${name || 'Not provided'} ${surname || ''}</div></div>
    <div class="info-box"><div class="info-label">Age</div><div class="info-value">${age} years</div></div>
    <div class="info-box"><div class="info-label">Tax Year</div><div class="info-value">${taxYear}</div></div>
    <div class="info-box"><div class="info-label">Tax Bracket</div><div class="info-value">${taxBracket.rate} — ${taxBracket.range}</div></div>
  </div>
</div>

<div class="section">
  <div class="section-title">💼 Employment</div>
  ${employers.map((emp, idx) => `
    <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:${idx < employers.length - 1 ? '1px solid #e5e7eb' : 'none'}">
      <h4 style="color:#1e40af;margin-bottom:10px">${emp.name || `Employer ${idx + 1}`}</h4>
      <div class="grid3">
        <div class="info-box"><div class="info-label">Monthly Income</div><div class="info-value">${formatCurrency(emp.income.amount * (emp.income.frequency === 'monthly' ? 1 : emp.income.frequency === 'annual' ? 1/12 : 52/12))}</div></div>
        <div class="info-box"><div class="info-label">Annual Income</div><div class="info-value">${formatCurrency(emp.income.amount * (emp.income.frequency === 'monthly' ? 12 : emp.income.frequency === 'annual' ? 1 : 52))}</div></div>
        <div class="info-box"><div class="info-label">Pension Contribution</div><div class="info-value">${formatCurrency(emp.pensionContribution.amount)} / ${emp.pensionContribution.frequency}</div></div>
      </div>
    </div>
  `).join('')}
  <div style="margin-top:16px;padding:14px;background:#f0f9ff;border-radius:8px">
    <p style="font-size:13px;font-weight:600;color:#1e40af;margin-bottom:8px">Working Conditions</p>
    <p style="font-size:13px;color:#374151">Works from home: ${workingConditions.worksFromHome ? '✓ Yes' : '✗ No'} &nbsp;&nbsp; Dedicated workspace: ${workingConditions.hasDedicatedWorkspace ? '✓ Yes' : '✗ No'} &nbsp;&nbsp; Travel allowance: ${workingConditions.hasVariableTravelAllowance ? '✓ Yes' : '✗ No'}</p>
  </div>
</div>

<div class="section">
  <div class="section-title">🧾 Deductions Summary</div>
  <table>
    <thead><tr><th>Deduction</th><th>Annual Amount</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Retirement Contributions (Pension/Provident/RA)</td><td>${formatCurrency(results.deductions.pensionContributions)}</td><td>Capped at 27.5% or R350,000</td></tr>
      <tr><td>Medical Aid Tax Credit</td><td>${formatCurrency(results._medicalCredit || 0)}</td><td>${medicalAid.numberOfDependents} dependent(s) — R${MEDICAL_CREDITS.mainMember}/mth main + R${MEDICAL_CREDITS.firstDependent}/R${MEDICAL_CREDITS.additionalDependent} deps</td></tr>
      ${results._incomeProtection > 0 ? `<tr><td>Income Protection Insurance</td><td>${formatCurrency(results._incomeProtection)}</td><td>Fully deductible (Section 11(a))</td></tr>` : ''}
      ${results._travelDeduction > 0 ? `<tr><td>Travel Allowance (business portion)</td><td>${formatCurrency(results._travelDeduction)}</td><td>Based on business km logbook</td></tr>` : ''}
      ${results._donations > 0 ? `<tr><td>Donations (Section 18A)</td><td>${formatCurrency(results._donations)}</td><td>Capped at 10% of taxable income</td></tr>` : ''}
      ${results.deductions.workFromHomeDeduction > 0 ? `<tr><td>Home Office</td><td>${formatCurrency(results.deductions.workFromHomeDeduction)}</td><td>R1,000/year — dedicated workspace</td></tr>` : ''}
      <tr><td><strong>Total Deductions</strong></td><td><strong>${formatCurrency(results.deductions.total + (results._medicalCredit || 0))}</strong></td><td></td></tr>
    </tbody>
  </table>
</div>

<div class="section">
  <div class="section-title">🧮 Tax Calculation Breakdown</div>
  <div style="max-width:600px">
    <div class="row"><span>Gross Income</span><span style="font-weight:600">${formatCurrency(results.grossIncome)}</span></div>
    <div class="row" style="color:#dc2626"><span>Less: Retirement Contributions</span><span>(${formatCurrency(results.deductions.pensionContributions)})</span></div>
    <div class="row" style="color:#dc2626"><span>Less: Other Pre-Tax Deductions</span><span>(${formatCurrency(results.deductions.other)})</span></div>
    <div class="total-row" style="background:#eff6ff;color:#1e40af;margin:8px 0"><span>Taxable Income</span><span>${formatCurrency(results.taxableIncome)}</span></div>
    <div class="row" style="color:#6b7280;font-size:14px"><span>Gross Tax</span><span>(${formatCurrency(results.taxExpense)})</span></div>
    <div class="row" style="color:#059669;font-size:14px"><span>+ Primary Rebate</span><span>+${formatCurrency(results.primaryRebate)}</span></div>
    ${results._medicalCredit > 0 ? `<div class="row" style="color:#059669;font-size:14px"><span>+ Medical Aid Tax Credit</span><span>+${formatCurrency(results._medicalCredit)}</span></div>` : ''}
    ${results._additionalMedicalDeduction > 0 ? `<div class="row" style="color:#059669;font-size:14px"><span>+ Additional Medical (65+/Disability)</span><span>+${formatCurrency(results._additionalMedicalDeduction)}</span></div>` : ''}
    <div class="total-row" style="background:#fee2e2;color:#dc2626;margin:8px 0"><span>Net Tax Liability</span><span>${formatCurrency(results.taxLiability)}</span></div>
    <div class="row" style="color:#dc2626"><span>Less: UIF</span><span>(${formatCurrency(results.UIF)})</span></div>
    <div class="total-row" style="background:linear-gradient(135deg,#059669,#047857);color:white;margin-top:14px"><span>Annual Take Home</span><span>${formatCurrency(results.grossIncome - results.deductions.total - results.taxLiability - results.UIF)}</span></div>
  </div>
  <div class="grid4" style="margin-top:20px">
    <div style="background:#f9fafb;padding:14px;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280;margin-bottom:5px">Monthly Take-Home</div><div style="font-size:20px;font-weight:bold;color:#1e40af">${formatCurrency((results.grossIncome - results.deductions.total - results.taxLiability - results.UIF)/12)}</div></div>
    <div style="background:#f9fafb;padding:14px;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280;margin-bottom:5px">Effective Tax Rate</div><div style="font-size:20px;font-weight:bold;color:#1e40af">${effectiveTaxRate}%</div></div>
    <div style="background:#f9fafb;padding:14px;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280;margin-bottom:5px">Medical Credit</div><div style="font-size:20px;font-weight:bold;color:#059669">${formatCurrency(results._medicalCredit || 0)}</div></div>
    <div style="background:#f9fafb;padding:14px;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280;margin-bottom:5px">Primary Rebate</div><div style="font-size:20px;font-weight:bold;color:#1e40af">${formatCurrency(results.primaryRebate)}</div></div>
  </div>
</div>

${comparison ? `
<div class="section">
  <div class="section-title">⚖️ PAYE Comparison</div>
  <div style="max-width:500px">
    <div class="row"><span>Calculated Annual Tax</span><span style="font-weight:600">${formatCurrency(comparison.calculatedTax)}</span></div>
    <div class="row"><span>Your Current Annual PAYE</span><span style="font-weight:600">${formatCurrency(comparison.actualPaid)}</span></div>
    <div class="row" style="font-weight:bold;color:${statusColor}"><span>Difference</span><span>${formatCurrency(comparison.difference)} (${comparison.status})</span></div>
  </div>
  <div style="margin-top:16px;padding:18px;background:${comparison.isUnderpaid ? '#fee2e2' : '#dcfce7'};border-radius:8px">
    <p style="font-weight:bold;color:${statusColor};margin-bottom:8px">${comparison.isUnderpaid ? '⚠️ You are underpaying PAYE' : '✅ You are overpaying PAYE'}</p>
    <p style="color:${statusColor};font-size:14px">${comparison.isUnderpaid ? `Consider requesting your employer to increase monthly PAYE by ${formatCurrency(comparison.monthlyAdditional)} to avoid a year-end shortfall.` : `You are entitled to a refund of ${formatCurrency(comparison.difference)}. File your return to claim it.`}</p>
  </div>
</div>
` : ''}

${results.warnings.length > 0 ? `
<div class="section">
  <div class="section-title">⚠️ Important Advisories</div>
  ${results.warnings.map(w => `<div class="warning-box"><p style="font-size:14px;color:#92400e">${w}</p></div>`).join('')}
</div>
` : ''}

<div class="footer">
  <div class="footer-grid">
    <div class="footer-col"><h5>Accounting Services</h5><ul><li>Company Secretarial</li><li>Bookkeeping</li><li>Payroll Administration</li><li>Management Accounts</li></ul></div>
    <div class="footer-col"><h5>Tax Services</h5><ul><li>PAYE Calculator</li><li>Tax Planning & Compliance</li><li>SARS Submissions</li><li>Tax Dispute Resolution</li></ul></div>
    <div class="footer-col"><h5>Business Advisory</h5><ul><li>Strategic Planning</li><li>Risk Management</li><li>Financial Analysis</li><li>Business Structuring</li></ul></div>
  </div>
  <div style="border-top:1px solid #e5e7eb;padding-top:14px">
    <p style="font-weight:600;color:#374151;margin-bottom:4px">AlloB Consultants — Integrity and Innovation</p>
    <p>+27 67 921 1947 &nbsp;|&nbsp; itax@allob.co.za &nbsp;|&nbsp; www.allob.co.za</p>
    <p style="margin-top:8px;font-size:11px;color:#9ca3af">This report is for informational purposes only. Report ID: ${reportId}</p>
  </div>
</div>
</div>
</body>
</html>`;

    const generatePDF = () => {
        const w = window.open('', '_blank');
        if (w) { w.document.write(getReportHTML()); w.document.close(); setTimeout(() => w.print(), 250); }
    };
    const downloadHTML = () => {
        const blob = new Blob([getReportHTML()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `PAYE-Tax-Report-${name}-${new Date().toISOString().split('T')[0]}.html`;
        a.click(); URL.revokeObjectURL(url);
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
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-2xl">×</button>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <button onClick={() => setShowPreview(!showPreview)} className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                            <FileText className="w-5 h-5" />{showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                        <button onClick={generatePDF} className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                            🖨️ Print / Save PDF
                        </button>
                        <button onClick={downloadHTML} className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                            ⬇️ Download HTML
                        </button>
                    </div>
                    {showPreview && (
                        <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
                            <div className="bg-blue-700 px-4 py-3 flex justify-between">
                                <p className="text-sm font-semibold text-white flex items-center gap-2"><FileText className="w-4 h-4" />Report Preview</p>
                                <span className="text-xs text-blue-200">ID: {reportId}</span>
                            </div>
                            <iframe srcDoc={getReportHTML()} className="w-full h-[600px] border-0 bg-white" title="Report Preview" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const TaxCalculator = () => {
    const [employers, setEmployers] = useState<Employer[]>([{
        name: '',
        income: { amount: 0, frequency: 'monthly' as FrequencyType },
        pensionContribution: { amount: 0, frequency: 'monthly' as FrequencyType },
        hasDeductibleExpenses: false,
        deductibleExpenses: { amount: 0, frequency: 'monthly' as FrequencyType }
    }]);
    const [workingConditions, setWorkingConditions] = useState<WorkingConditions>({ worksFromHome: false, hasDedicatedWorkspace: false, hasVariableTravelAllowance: false });
    const [medicalAid, setMedicalAid] = useState<MedicalAidInfo>({ isMainMember: true, numberOfDependents: 0, monthlyContribution: 0, hasDisability: false });
    const [otherDeductions, setOtherDeductions] = useState<OtherDeductions>(emptyOtherDeductions());
    const [selectedYear, setSelectedYear] = useState<TaxYear>(2025);
    const [age, setAge] = useState<number>(30);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [results, setResults] = useState<(TaxCalculationResult & Record<string, any>) | null>(null);
    const [actualPAYE, setActualPAYE] = useState<number>(0);
    const [payeFrequency, setPayeFrequency] = useState<FrequencyType>('monthly');
    const [showComparison, setShowComparison] = useState<boolean>(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const { isCalculating, calculationTime, startCalculation, endCalculation } = usePerformanceMonitor();
    const validation = useMemoizedValidation(employers, age);

    const debouncedCalculate = useCallback(
        debounce(() => {
            if (!validation.isValid) { setCalculationError('Please fix validation errors before calculating'); return; }
            const startTime = startCalculation();
            setCalculationError(null);
            setTimeout(() => {
                try {
                    const result = calculateTaxLiability(employers, workingConditions, age, selectedYear, medicalAid, otherDeductions);
                    setResults(result);
                    endCalculation(startTime);
                } catch (error) {
                    console.error(error);
                    setCalculationError('Failed to calculate tax. Please refresh and try again.');
                    endCalculation(startTime);
                }
            }, 0);
        }, 500),
        [employers, workingConditions, age, selectedYear, medicalAid, otherDeductions, validation.isValid, startCalculation, endCalculation]
    );

    const handleEmployerChange = useCallback((index: number, field: keyof Employer, value: any) => {
        setEmployers(prev => {
            const updated = [...prev];
            if (['income', 'pensionContribution', 'deductibleExpenses'].includes(field)) {
                updated[index] = { ...updated[index], [field]: { ...(updated[index][field] as any), ...(typeof value === 'object' ? value : { amount: value }) } };
            } else {
                updated[index] = { ...updated[index], [field]: value };
            }
            return updated;
        });
        setResults(null);
        setShowComparison(false);
    }, []);

    const addEmployer = useCallback(() => {
        setEmployers(prev => [...prev, { name: '', income: { amount: 0, frequency: 'monthly' }, pensionContribution: { amount: 0, frequency: 'monthly' }, hasDeductibleExpenses: false, deductibleExpenses: { amount: 0, frequency: 'monthly' } }]);
    }, []);

    const removeEmployer = useCallback((index: number) => {
        if (employers.length > 1) setEmployers(prev => prev.filter((_, i) => i !== index));
    }, [employers.length]);

    const calculateTax = useCallback(() => { debouncedCalculate(); }, [debouncedCalculate]);

    const comparisonValues = useMemo(() => {
        if (!results || actualPAYE <= 0) return null;
        return calculatePAYEComparison(results.taxLiability, actualPAYE, payeFrequency);
    }, [results, actualPAYE, payeFrequency]);

    const setYear = useCallback((newYear: number) => {
        setSelectedYear(newYear as TaxYear); setResults(null); setShowComparison(false);
    }, []);

    const updateOther = (updates: Partial<OtherDeductions>) => setOtherDeductions(prev => ({ ...prev, ...updates }));

    const activeDeductionCount = [
        medicalAid.monthlyContribution > 0,
        otherDeductions.providentFundAmount > 0,
        otherDeductions.retirementAnnuityAmount > 0,
        otherDeductions.incomeProtectionAmount > 0,
        otherDeductions.donationsAmount > 0,
        otherDeductions.travelAllowanceAnnual > 0,
        workingConditions.worksFromHome,
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Header bar */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>{calculationTime > 0 && <div className="text-xs text-gray-500">Last calculation: {calculationTime.toFixed(0)}ms</div>}</div>
                    <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>+27 67 921 1947</span></div>
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>itax@allob.co.za</span></div>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">My PAYE Calculator</h1>
                    <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                        Multi-income PAYE calculation with full South African deductions support.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        {['Medical Aid Credits', 'Pension/Provident/RA', 'Income Protection', 'Section 18A Donations', 'Travel Allowance', 'Home Office'].map(tag => (
                            <span key={tag} className="bg-white/20 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calculator className={`w-8 h-8 text-blue-600 ${isCalculating ? 'animate-pulse' : ''}`} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">South African PAYE Tax Calculator</h2>
                            <p className="text-gray-600">Year of Assessment {selectedYear}</p>
                        </div>

                        {/* Errors */}
                        {!validation.isValid && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-red-800 mb-2">Complete these fields:</h4>
                                        {validation.errors.map((e, i) => <p key={i} className="text-red-700 text-sm">• {e}</p>)}
                                    </div>
                                </div>
                            </div>
                        )}
                        {calculationError && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-red-700 text-sm">{calculationError}</p>
                            </div>
                        )}

                        {/* ── PERSONAL INFO ── */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your first name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                                    <input type="text" value={surname} onChange={e => setSurname(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your surname" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Assessment</label>
                                    <select value={selectedYear} onChange={e => setYear(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="2022">2022</option><option value="2023">2023</option>
                                        <option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" min="18" max="100" />
                                    <p className="text-xs text-gray-400 mt-1">Secondary rebate at 65+, tertiary at 75+</p>
                                </div>
                            </div>
                        </div>

                        {/* ── EMPLOYMENT INCOME ── */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Employment Income</h3>
                                <button onClick={addEmployer} disabled={isCalculating} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm">
                                    + Add Employer
                                </button>
                            </div>
                            {employers.map((employer, index) => (
                                <div key={index} className="mb-6 p-6 border border-gray-200 rounded-xl bg-gray-50">
                                    <h4 className="font-medium text-gray-700 mb-4">{index === 0 ? 'Primary Employer' : `Employer ${index + 1}`}</h4>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Employer Name</label>
                                            <input type="text" value={employer.name} onChange={e => handleEmployerChange(index, 'name', e.target.value)} disabled={isCalculating} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" placeholder="Enter employer name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Income Amount</label>
                                            <div className="flex gap-2">
                                                <input type="number" value={employer.income.amount || ''} onChange={e => handleEmployerChange(index, 'income', { amount: Number(e.target.value) })} disabled={isCalculating} className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" placeholder="Amount" min="0" />
                                                <select value={employer.income.frequency} onChange={e => handleEmployerChange(index, 'income', { frequency: e.target.value as FrequencyType })} disabled={isCalculating} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                                                    <option value="monthly">Monthly</option><option value="annual">Annual</option>
                                                    <option value="weekly">Weekly</option><option value="once-off">Once-off</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pension Fund Contribution</label>
                                            <div className="flex gap-2">
                                                <input type="number" value={employer.pensionContribution.amount || ''} onChange={e => handleEmployerChange(index, 'pensionContribution', { amount: Number(e.target.value) })} disabled={isCalculating} className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" placeholder="Amount" min="0" />
                                                <select value={employer.pensionContribution.frequency} onChange={e => handleEmployerChange(index, 'pensionContribution', { frequency: e.target.value as FrequencyType })} disabled={isCalculating} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                                                    <option value="monthly">Monthly</option><option value="annual">Annual</option>
                                                    <option value="weekly">Weekly</option><option value="once-off">Once-off</option>
                                                </select>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Employee contribution only</p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={employer.hasDeductibleExpenses} onChange={e => handleEmployerChange(index, 'hasDeductibleExpenses', e.target.checked)} className="h-4 w-4" />
                                                <span className="text-sm font-medium text-gray-700">Has deductible business expenses</span>
                                            </label>
                                        </div>
                                    </div>
                                    {employers.length > 1 && (
                                        <button onClick={() => removeEmployer(index)} disabled={isCalculating} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 text-sm transition-colors">
                                            Remove Employer
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ── MEDICAL AID ── */}
                        <div className="mb-4">
                            <CollapsibleSection
                                title="Medical Aid"
                                icon={<Heart className="w-5 h-5 text-green-600" />}
                                defaultOpen={true}
                                badge={medicalAid.monthlyContribution > 0 ? `R${medicalAid.monthlyContribution.toLocaleString()}/mth` : undefined}
                            >
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution (Total)</label>
                                        <input type="number" value={medicalAid.monthlyContribution || ''} onChange={e => setMedicalAid(m => ({ ...m, monthlyContribution: Number(e.target.value) }))} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g. 3500" min="0" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                                        <input type="number" value={medicalAid.numberOfDependents} onChange={e => setMedicalAid(m => ({ ...m, numberOfDependents: Number(e.target.value) }))} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" min="0" max="20" />
                                        <p className="text-xs text-gray-400 mt-1">Spouse + children on your plan</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-6 mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={medicalAid.isMainMember} onChange={e => setMedicalAid(m => ({ ...m, isMainMember: e.target.checked }))} className="h-4 w-4 text-green-600 rounded" />
                                        <span className="text-sm text-gray-700">I am the main member</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={medicalAid.hasDisability} onChange={e => setMedicalAid(m => ({ ...m, hasDisability: e.target.checked }))} className="h-4 w-4 text-green-600 rounded" />
                                        <span className="text-sm text-gray-700">Disability (additional deduction applies)</span>
                                    </label>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                                    <p className="font-semibold mb-1">2025/2026 Medical Aid Tax Credits (Section 6A):</p>
                                    <p>Main member: R364/mth · First dependent: R364/mth · Additional dependents: R246/mth each</p>
                                    {age >= 65 && <p className="mt-1 font-medium">Age 65+: Additional deduction of 33% on excess contributions above 3× the tax credit</p>}
                                </div>
                            </CollapsibleSection>
                        </div>

                        {/* ── ADDITIONAL DEDUCTIONS ── */}
                        <div className="mb-8">
                            <CollapsibleSection
                                title="Additional Deductions"
                                icon={<Shield className="w-5 h-5 text-purple-600" />}
                                defaultOpen={false}
                                badge={activeDeductionCount > 0 ? `${activeDeductionCount} active` : undefined}
                            >
                                {/* Provident + RA */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Additional Retirement Funds</p>
                                    <p className="text-xs text-gray-400 mb-3">Combined limit (Pension + Provident + RA): 27.5% of income or R350,000/year, whichever is lower</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Provident Fund</label>
                                            <div className="flex gap-2">
                                                <input type="number" value={otherDeductions.providentFundAmount || ''} onChange={e => updateOther({ providentFundAmount: Number(e.target.value) })} className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Amount" min="0" />
                                                <select value={otherDeductions.providentFundFrequency} onChange={e => updateOther({ providentFundFrequency: e.target.value as FrequencyType })} className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                                    <option value="monthly">Monthly</option><option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Annuity (RA)</label>
                                            <div className="flex gap-2">
                                                <input type="number" value={otherDeductions.retirementAnnuityAmount || ''} onChange={e => updateOther({ retirementAnnuityAmount: Number(e.target.value) })} className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Amount" min="0" />
                                                <select value={otherDeductions.retirementAnnuityFrequency} onChange={e => updateOther({ retirementAnnuityFrequency: e.target.value as FrequencyType })} className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                                    <option value="monthly">Monthly</option><option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Income Protection */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Insurance Premiums</p>
                                    <div className="max-w-sm">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Income Protection Insurance</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={otherDeductions.incomeProtectionAmount || ''} onChange={e => updateOther({ incomeProtectionAmount: Number(e.target.value) })} className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Amount" min="0" />
                                            <select value={otherDeductions.incomeProtectionFrequency} onChange={e => updateOther({ incomeProtectionFrequency: e.target.value as FrequencyType })} className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                                <option value="monthly">Monthly</option><option value="annual">Annual</option>
                                            </select>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Premiums are fully deductible (Section 11(a))</p>
                                    </div>
                                </div>

                                {/* Donations */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Charitable Donations (Section 18A)</p>
                                    <div className="max-w-xs">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Donations to Approved PBOs</label>
                                        <input type="number" value={otherDeductions.donationsAmount || ''} onChange={e => updateOther({ donationsAmount: Number(e.target.value) })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g. 5000" min="0" />
                                        <p className="text-xs text-gray-400 mt-1">Capped at 10% of taxable income. Valid Section 18A certificate required.</p>
                                    </div>
                                </div>

                                {/* Travel */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Travel Allowance</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Travel Allowance (from employer)</label>
                                            <input type="number" value={otherDeductions.travelAllowanceAnnual || ''} onChange={e => updateOther({ travelAllowanceAnnual: Number(e.target.value) })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g. 60000" min="0" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Travel (km/year — logbook)</label>
                                            <input type="number" value={otherDeductions.businessTravelKm || ''} onChange={e => updateOther({ businessTravelKm: Number(e.target.value) })} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g. 15000" min="0" />
                                            <p className="text-xs text-gray-400 mt-1">SARS-compliant logbook required</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Working Conditions */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Working Conditions</p>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {[
                                            { checked: workingConditions.worksFromHome, onChange: (v: boolean) => setWorkingConditions(p => ({ ...p, worksFromHome: v })), title: 'Works From Home', sub: 'Perform duties at home' },
                                            { checked: workingConditions.hasDedicatedWorkspace, onChange: (v: boolean) => setWorkingConditions(p => ({ ...p, hasDedicatedWorkspace: v })), title: 'Dedicated Workspace', sub: 'R1,000/year deduction' },
                                            { checked: workingConditions.hasVariableTravelAllowance, onChange: (v: boolean) => setWorkingConditions(p => ({ ...p, hasVariableTravelAllowance: v })), title: 'Variable Travel Allowance', sub: 'Employer-provided' },
                                        ].map(item => (
                                            <label key={item.title} className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                                <input type="checkbox" checked={item.checked} onChange={e => item.onChange(e.target.checked)} className="h-4 w-4" />
                                                <div>
                                                    <div className="font-medium text-sm">{item.title}</div>
                                                    <div className="text-xs text-gray-500">{item.sub}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </CollapsibleSection>
                        </div>

                        {/* Calculate */}
                        <button onClick={calculateTax} disabled={!validation.isValid || isCalculating} className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg mb-6 flex items-center justify-center gap-2 transition-colors">
                            <Calculator className={`w-5 h-5 ${isCalculating ? 'animate-pulse' : ''}`} />
                            {isCalculating ? 'Calculating...' : 'Calculate Tax'}
                        </button>

                        {/* Results */}
                        {results && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-200">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tax Calculation Results</h3>
                                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                        <div className="p-6">
                                            <h4 className="text-lg font-semibold text-blue-900 mb-4">Annual Breakdown</h4>
                                            <div className="flex justify-between items-center py-3 border-b-2 border-blue-900">
                                                <span className="font-semibold text-gray-900">Total Gross Income</span>
                                                <span className="font-bold text-xl text-blue-900">{formatCurrency(results.grossIncome)}</span>
                                            </div>
                                            <div className="mt-3">
                                                <div className="flex justify-between py-2 text-red-700"><span className="font-medium">Less: Deductions</span><span></span></div>
                                                <div className="ml-6 space-y-1 text-sm">
                                                    <div className="flex justify-between py-1 text-gray-700"><span>• Retirement Contributions (Pension/Provident/RA)</span><span className="font-medium">({formatCurrency(results.deductions.pensionContributions)})</span></div>
                                                    {results._incomeProtection > 0 && <div className="flex justify-between py-1 text-gray-700"><span>• Income Protection Insurance</span><span className="font-medium">({formatCurrency(results._incomeProtection)})</span></div>}
                                                    {results._travelDeduction > 0 && <div className="flex justify-between py-1 text-gray-700"><span>• Travel Allowance</span><span className="font-medium">({formatCurrency(results._travelDeduction)})</span></div>}
                                                    {results._donations > 0 && <div className="flex justify-between py-1 text-gray-700"><span>• Donations (Section 18A)</span><span className="font-medium">({formatCurrency(results._donations)})</span></div>}
                                                    {results.deductions.workFromHomeDeduction > 0 && <div className="flex justify-between py-1 text-gray-700"><span>• Home Office</span><span className="font-medium">({formatCurrency(results.deductions.workFromHomeDeduction)})</span></div>}
                                                </div>
                                                <div className="flex justify-between py-2 border-b text-red-700 font-medium"><span>Total Pre-Tax Deductions</span><span>({formatCurrency(results.deductions.total)})</span></div>
                                            </div>
                                            <div className="flex justify-between py-3 bg-blue-50 px-3 rounded mt-2 border-b-2 border-gray-300">
                                                <span className="font-semibold text-gray-900">Taxable Income</span>
                                                <span className="font-bold text-xl text-blue-900">{formatCurrency(results.taxableIncome)}</span>
                                            </div>
                                            <div className="ml-6 space-y-1 text-sm mt-2">
                                                <div className="flex justify-between py-1 text-gray-500"><span>Gross Tax</span><span>({formatCurrency(results.taxExpense)})</span></div>
                                                <div className="flex justify-between py-1 text-green-600"><span>+ Primary Rebate</span><span>+{formatCurrency(results.primaryRebate)}</span></div>
                                                {results._medicalCredit > 0 && <div className="flex justify-between py-1 text-green-600"><span>+ Medical Aid Tax Credit</span><span>+{formatCurrency(results._medicalCredit)}</span></div>}
                                                {results._additionalMedicalDeduction > 0 && <div className="flex justify-between py-1 text-green-600"><span>+ Additional Medical (65+/Disability)</span><span>+{formatCurrency(results._additionalMedicalDeduction)}</span></div>}
                                            </div>
                                            <div className="flex justify-between py-3 border-b text-red-700"><span className="font-semibold">Net Tax Liability (PAYE)</span><span className="font-bold text-lg">({formatCurrency(results.taxLiability)})</span></div>
                                            <div className="flex justify-between py-3 border-b bg-green-50 px-3 rounded mt-2"><span className="font-semibold text-gray-900">Net Earnings (After Tax)</span><span className="font-bold text-xl text-green-700">{formatCurrency(results.grossIncome - results.taxLiability)}</span></div>
                                            <div className="flex justify-between py-3 border-b text-red-700"><span className="font-semibold">Less: UIF</span><span className="font-bold text-lg">({formatCurrency(results.UIF)})</span></div>
                                            <div className="flex justify-between py-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 rounded-lg mt-3">
                                                <span className="font-bold text-lg">Annual Take Home</span>
                                                <span className="font-bold text-2xl">{formatCurrency(results.grossIncome - results.deductions.total - results.taxLiability - results.UIF)}</span>
                                            </div>
                                        </div>

                                        {/* Monthly */}
                                        <div className="bg-gray-50 p-6 border-t-2 border-gray-200">
                                            <h4 className="text-lg font-semibold text-blue-900 mb-4">Monthly Breakdown</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2"><span className="text-gray-700">Monthly Gross Income</span><span className="font-semibold">{formatCurrency(results.grossIncome / 12)}</span></div>
                                                <div className="flex justify-between py-2 text-red-700"><span>Monthly Retirement Deductions</span><span>({formatCurrency(results.deductions.pensionContributions / 12)})</span></div>
                                                <div className="flex justify-between py-2 text-red-700"><span>Monthly PAYE</span><span>({formatCurrency(results.monthlyPAYE)})</span></div>
                                                <div className="flex justify-between py-2 text-red-700"><span>Monthly UIF</span><span>({formatCurrency(results.UIF / 12)})</span></div>
                                                <div className="flex justify-between py-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 rounded-lg mt-2">
                                                    <span className="font-bold">Monthly Take Home</span>
                                                    <span className="font-bold text-xl">{formatCurrency((results.grossIncome - results.deductions.total - results.taxLiability - results.UIF) / 12)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="bg-blue-50 p-6 border-t border-blue-200">
                                            <div className="grid md:grid-cols-4 gap-4 text-center">
                                                {[
                                                    { label: 'Effective Tax Rate', value: `${((results.taxLiability / results.grossIncome) * 100).toFixed(1)}%`, color: 'text-blue-900' },
                                                    { label: 'Primary Rebate', value: formatCurrency(results.primaryRebate), color: 'text-blue-900' },
                                                    { label: 'Medical Credit', value: formatCurrency(results._medicalCredit || 0), color: 'text-green-600' },
                                                    { label: 'Total Deductions', value: formatCurrency(results.deductions.total), color: 'text-blue-900' },
                                                ].map(s => (
                                                    <div key={s.label} className="bg-white p-4 rounded-lg shadow-sm">
                                                        <div className="text-xs text-gray-600 mb-1">{s.label}</div>
                                                        <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {results.warnings.length > 0 && (
                                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" />Important Notes:</h4>
                                            {results.warnings.map((w, i) => <p key={i} className="text-yellow-700 text-sm mt-1">• {w}</p>)}
                                        </div>
                                    )}
                                </div>

                                {/* PAYE Comparison */}
                                {!showComparison && (
                                    <button onClick={() => setShowComparison(true)} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2 transition-colors">
                                        <CreditCard className="w-5 h-5" />Compare with Current PAYE
                                    </button>
                                )}
                                {showComparison && (
                                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">PAYE Comparison</h3>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Current PAYE Amount</label>
                                                <input type="number" value={actualPAYE} onChange={e => setActualPAYE(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter PAYE amount" min="0" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Frequency</label>
                                                <select value={payeFrequency} onChange={e => setPayeFrequency(e.target.value as FrequencyType)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                                    <option value="monthly">Monthly</option><option value="weekly">Weekly</option><option value="annual">Annual</option>
                                                </select>
                                            </div>
                                        </div>
                                        {comparisonValues && (
                                            <div className={`rounded-lg p-4 ${comparisonValues.status === 'underpaid' ? 'bg-red-50 border border-red-200' : comparisonValues.status === 'overpaid' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between"><span className="font-medium">Calculated Annual Tax:</span><span className="font-bold">{formatCurrency(comparisonValues.calculatedTax)}</span></div>
                                                    <div className="flex justify-between"><span className="font-medium">Your Annual PAYE:</span><span className="font-bold">{formatCurrency(comparisonValues.actualPaid)}</span></div>
                                                    <div className="flex justify-between pt-2 border-t">
                                                        <span className="font-bold">Difference:</span>
                                                        <span className={`font-bold ${comparisonValues.isUnderpaid ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(comparisonValues.difference)} ({comparisonValues.status})</span>
                                                    </div>
                                                    {comparisonValues.isUnderpaid && (
                                                        <div className="mt-3 bg-red-100 rounded p-3">
                                                            <p className="text-red-800 text-sm font-medium">⚠️ You need to pay an additional {formatCurrency(comparisonValues.monthlyAdditional)} per month</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Report Generator */}
                                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-200">
                                    <div className="text-center">
                                        <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Download or Email Your Report</h4>
                                        <p className="text-gray-600 mb-4 text-sm">Get a professional branded PDF report with full deductions breakdown</p>
                                        <button onClick={() => setShowReportGenerator(true)} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 transition-colors">
                                            <FileText className="w-5 h-5" /><span>Generate Report</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Modal */}
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
                    medicalAid={medicalAid}
                    onClose={() => setShowReportGenerator(false)}
                />
            )}
        </div>
    );
};

export default TaxCalculator;