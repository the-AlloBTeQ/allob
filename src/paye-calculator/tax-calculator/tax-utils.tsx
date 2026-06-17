// utils/tax-utils.ts
// Utility Functions for Tax Calculations

import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult,
    TaxDeductions,
    FrequencyType,
    TaxYear,
    Income
} from '../../types/calculator';
import { TAX_YEAR_DATA } from '../../types/calculator';


export function formatCurrency(value: number): string {
     return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
    }).format(value);
}
/**
 * Convert any frequency income to annual amount
 */
const convertToAnnual = (income: Income): number => {
    const { amount, frequency } = income;
    
    switch (frequency) {
        case 'monthly':
            return amount * 12;
        case 'weekly':
            return amount * 52;
        case 'annual':
            return amount;
        case 'once-off':
            return amount;
        default:
            return 0;
    }
};

/**
 * Calculate UIF (Unemployment Insurance Fund)
 * UIF is 1% of gross income, capped at R177.12 per month (R2,125.44 annually)
 */
const calculateUIF = (grossIncome: number): number => {
    const UIF_RATE = 0.01;
    const UIF_MONTHLY_CAP = 177.12;
    const UIF_ANNUAL_CAP = UIF_MONTHLY_CAP * 12;
    
    const monthlyIncome = grossIncome / 12;
    const monthlyUIF = Math.min(monthlyIncome * UIF_RATE, UIF_MONTHLY_CAP);
    return Math.min(monthlyUIF * 12, UIF_ANNUAL_CAP);
};

/**
 * Calculate pension contribution deduction
 * Limited to 27.5% of the greater of remuneration or taxable income, capped at R350,000
 */
const calculatePensionDeduction = (
    totalPensionContributions: number,
    grossIncome: number,
    taxableIncome: number,
    taxYear: TaxYear
): number => {
    const yearData = TAX_YEAR_DATA[taxYear];
    const { PERCENTAGE, AMOUNT } = yearData.PENSION_LIMITS;
    
    const maxDeductible = Math.min(
        Math.max(grossIncome, taxableIncome) * PERCENTAGE,
        AMOUNT
    );
    
    return Math.min(totalPensionContributions, maxDeductible);
};

/**
 * Calculate work from home deduction
 * R5 per day for 200 working days = R1,000 per year (if dedicated workspace)
 */
const calculateWorkFromHomeDeduction = (workingConditions: WorkingConditions): number => {
    if (workingConditions.worksFromHome && workingConditions.hasDedicatedWorkspace) {
        return 0; // R5 per day for 200 days
    }
    return 0;
};

/**
 * Calculate travel allowance deduction
 * This is a simplified calculation - actual calculation requires detailed logbook
 */
const calculateTravelAllowanceDeduction = (
    workingConditions: WorkingConditions
): number => {
    if (workingConditions.hasVariableTravelAllowance) {
        // Placeholder - real calculation would use actual travel allowance amount and logbook
        // Typically 20-80% of travel allowance can be deducted with proper records
        return 0; // User should consult tax professional for accurate calculation
    }
    return 0;
};

/**
 * Calculate business expenses deduction
 * Limited to specific percentage of income (employer-specific)
 */
const calculateBusinessExpensesDeduction = (
    employers: Employer[]
): { total: number; carryForward: Record<string, number> } => {
    let totalDeduction = 0;
    const carryForward: Record<string, number> = {};
    
    employers.forEach((employer) => {
        if (employer.hasDeductibleExpenses && employer.deductibleExpenses) {
            const annualExpenses = convertToAnnual(employer.deductibleExpenses);
            const employerIncome = convertToAnnual(employer.income);
            
            // Business expenses typically limited to 10% of employment income from that employer
            const maxDeductible = employerIncome * 0.10;
            
            if (annualExpenses > maxDeductible) {
                // Carry forward excess
                carryForward[employer.name] = annualExpenses - maxDeductible;
                totalDeduction += maxDeductible;
            } else {
                totalDeduction += annualExpenses;
            }
        }
    });
    
    return { total: totalDeduction, carryForward };
};

/**
 * Calculate tax based on brackets for a specific tax year
 */
const calculateTaxFromBrackets = (taxableIncome: number, taxYear: TaxYear): number => {
    const brackets = TAX_YEAR_DATA[taxYear].BRACKETS;
    
    for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i];
        if (taxableIncome <= bracket.threshold) {
            const previousThreshold = i > 0 ? brackets[i - 1].threshold : 0;
            return bracket.base + (taxableIncome - previousThreshold) * bracket.rate;
        }
    }
    
    return 0;
};

/**
 * Calculate tax rebates based on age
 */
const calculateRebates = (age: number, taxYear: TaxYear): number => {
    const yearData = TAX_YEAR_DATA[taxYear];
    const { PRIMARY, SECONDARY, TERTIARY } = yearData.REBATES;
    const { SECONDARY: secondaryAge, TERTIARY: tertiaryAge } = yearData.AGE_THRESHOLDS;
    
    let totalRebate = PRIMARY;
    
    if (age >= tertiaryAge) {
        totalRebate += SECONDARY + TERTIARY;
    } else if (age >= secondaryAge) {
        totalRebate += SECONDARY;
    }
    
    return totalRebate;
};

/**
 * Main tax calculation function
 * Calculates complete tax liability with all deductions and rebates
 */
export const calculateTaxLiability = (
    employers: Employer[],
    workingConditions: WorkingConditions,
    age: number,
    taxYear: TaxYear = 2025
): TaxCalculationResult => {
    const warnings: string[] = [];
    
    // Validate tax year
    if (!TAX_YEAR_DATA[taxYear]) {
        warnings.push(`Tax year ${taxYear} not found, using 2025 data`);
        taxYear = 2025;
    }
    
    // Calculate gross income
    const grossIncome = employers.reduce((total, employer) => {
        return total + convertToAnnual(employer.income);
    }, 0);
    
    if (grossIncome === 0) {
        warnings.push('Gross income is zero - please enter employment income');
    }
    
    // Calculate total pension contributions
    const totalPensionContributions = employers.reduce((total, employer) => {
        return total + convertToAnnual(employer.pensionContribution);
    }, 0);
    
    // Calculate business expenses with carry forward
    const { total: businessExpenses, carryForward: expenseCarryForward } = 
        calculateBusinessExpensesDeduction(employers);
    
    if (Object.keys(expenseCarryForward).length > 0) {
        warnings.push('Some deductible expenses exceed the allowable limit and will carry forward');
    }
    
    // Calculate work from home deduction
    const workFromHomeDeduction = calculateWorkFromHomeDeduction(workingConditions);
    
    // Calculate travel allowance deduction
    const travelAllowance = calculateTravelAllowanceDeduction(workingConditions);
    if (workingConditions.hasVariableTravelAllowance) {
        warnings.push('Travel allowance deduction requires a compliant logbook. Contact itax@allob.co.za for assistance.');
    }
    
    // Calculate taxable income before pension deduction
    const preliminaryTaxableIncome = grossIncome - businessExpenses - workFromHomeDeduction - travelAllowance;
    
    // Calculate allowable pension deduction
    const pensionDeduction = calculatePensionDeduction(
        totalPensionContributions,
        grossIncome,
        preliminaryTaxableIncome,
        taxYear
    );
    
    if (totalPensionContributions > pensionDeduction) {
        const excess = totalPensionContributions - pensionDeduction;
        warnings.push(`Pension contributions exceed deductible limit by ${formatCurrency(excess)}`);
    }
    
    // Calculate final taxable income
    const taxableIncome = Math.max(0, preliminaryTaxableIncome - pensionDeduction);
    
    // Total deductions
    const deductions: TaxDeductions = {
        pensionContributions: pensionDeduction,
        pensionFund: 0,
        medicalAid: 0,
        other: 0,
        workFromHomeDeduction,
        travelAllowance,
        businessExpenses,
        total: pensionDeduction + workFromHomeDeduction + travelAllowance + businessExpenses
    };
    
    // Calculate tax expense (before rebates)
    const taxExpense = calculateTaxFromBrackets(taxableIncome, taxYear);
    
    // Calculate rebates
    const primaryRebate = calculateRebates(age, taxYear);
    
    // Calculate final tax liability
    const taxLiability = Math.max(0, taxExpense - primaryRebate);
    
    // Calculate monthly PAYE
    const monthlyPAYE = taxLiability / 12;
    
    // Calculate UIF
    const UIF = calculateUIF(grossIncome);

    return {
        grossIncome,
        deductions,
        taxableIncome,
        taxExpense,
        primaryRebate,
        taxLiability,
        monthlyPAYE,
        UIF,
        deductibleExpensesCarryForward: expenseCarryForward,
        warnings
    };
};

/**
 * Validate employer inputs
 */
export const validateEmployers = (employers: Employer[], age: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (age < 18 || age > 100) {
        errors.push('Please enter a valid age between 18 and 100');
    }
    
    if (employers.length === 0) {
        errors.push('At least one employer is required');
    }
    
    employers.forEach((employer, index) => {
        if (!employer.name.trim()) {
            errors.push(`Employer ${index + 1} name is required`);
        }
        if (employer.income.amount <= 0) {
            errors.push(`Employer ${index + 1} income must be greater than 0`);
        }
        if (employer.pensionContribution.amount < 0) {
            errors.push(`Employer ${index + 1} pension contribution cannot be negative`);
        }
        if (employer.hasDeductibleExpenses && (!employer.deductibleExpenses || employer.deductibleExpenses.amount < 0)) {
            errors.push(`Employer ${index + 1} deductible expenses amount is invalid`);
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Get available tax years
 */
export const getAvailableTaxYears = (): TaxYear[] => {
    return Object.keys(TAX_YEAR_DATA).map(year => parseInt(year) as TaxYear);
};

/**
 * Get tax year display string
 */
export const getTaxYearDisplay = (taxYear: TaxYear): string => {
    const startYear = taxYear - 1;
    const startMonth = 'March';
    const endMonth = 'February';
    
    return `${startMonth} ${startYear} - ${endMonth} ${taxYear}`;
};

/**
 * Calculate comparison between calculated tax and actual PAYE
 */
export const calculatePAYEComparison = (
    calculatedTax: number,
    actualPAYE: number,
    payeFrequency: FrequencyType
): {
    calculatedTax: number;
    actualPaid: number;
    difference: number;
    isUnderpaid: boolean;
    monthlyAdditional: number;
    status: 'underpaid' | 'overpaid' | 'accurate';
} => {
    const frequencyMultipliers: Record<FrequencyType, number> = {
        'once-off': 1,
        'weekly': 52,
        'monthly': 12,
        'annual': 1
    };
    
    const actualPaid = actualPAYE * frequencyMultipliers[payeFrequency];
    const difference = Math.abs(calculatedTax - actualPaid);
    const isUnderpaid = calculatedTax > actualPaid;
    const monthlyAdditional = isUnderpaid ? difference / 12 : 0;
    
    // Determine status with R1,000 tolerance
    let status: 'underpaid' | 'overpaid' | 'accurate';
    if (calculatedTax > actualPaid + 1000) {
        status = 'underpaid';
    } else if (actualPaid > calculatedTax + 1000) {
        status = 'overpaid';
    } else {
        status = 'accurate';
    }
    
    return {
        calculatedTax,
        actualPaid,
        difference,
        isUnderpaid,
        monthlyAdditional,
        status
    };
};