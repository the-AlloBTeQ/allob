// types/calculator-types.ts
// Core types and interfaces for the PAYE Tax Calculator

export type FrequencyType = 'once-off' | 'monthly' | 'weekly' | 'annual';
export type TaxYear = 2022 | 2023 | 2024 | 2025 | 2026;

// Income and payment interfaces
export interface Income {
    amount: number;
    frequency: FrequencyType;
}

// Employer interface
export interface Employer {
    name: string;
    income: Income;
    pensionContribution: Income;
    hasDeductibleExpenses: boolean;
    deductibleExpenses?: Income;
}

// Working conditions interface
export interface WorkingConditions {
    worksFromHome: boolean;
    hasDedicatedWorkspace: boolean;
    hasVariableTravelAllowance: boolean;
}

// Tax deductions interface
export interface TaxDeductions {
    pensionContributions: number;
    workFromHomeDeduction: number;
    travelAllowance: number;
    businessExpenses: number;
    total: number;
        pensionFund: number;
    medicalAid: number;
    other: number;
}


// Tax calculation result interface
export interface TaxCalculationResult {
    grossIncome: number;
    deductions: TaxDeductions;
    taxableIncome: number;
    taxExpense: number;
    primaryRebate: number;
    taxLiability: number;
    monthlyPAYE: number;
    UIF: number;
    deductibleExpensesCarryForward: Record<string, number>;
    warnings: string[];
}

// Tax bracket interface
export interface TaxBracket {
    threshold: number;
    rate: number;
    base: number;
}

// Tax year data structure
interface TaxYearData {
    BRACKETS: TaxBracket[];
    REBATES: {
        PRIMARY: number;
        SECONDARY: number;
        TERTIARY: number;
    };
    AGE_THRESHOLDS: {
        SECONDARY: number;
        TERTIARY: number;
    };
    PENSION_LIMITS: {
        PERCENTAGE: number;
        AMOUNT: number;
    };
}

// Constants for tax calculations - multiple years
export const TAX_YEAR_DATA: Record<TaxYear, TaxYearData> = {
    2022: {
        BRACKETS: [
            { threshold: 216200, rate: 0.18, base: 0 },
            { threshold: 337800, rate: 0.26, base: 38916 },
            { threshold: 467500, rate: 0.31, base: 70532 },
            { threshold: 613600, rate: 0.36, base: 110739 },
            { threshold: 782200, rate: 0.39, base: 163335 },
            { threshold: 1656600, rate: 0.41, base: 229089 },
            { threshold: Infinity, rate: 0.45, base: 587593 }
        ],
        REBATES: {
            PRIMARY: 15714,
            SECONDARY: 8613,
            TERTIARY: 2871
        },
        AGE_THRESHOLDS: {
            SECONDARY: 65,
            TERTIARY: 75
        },
        PENSION_LIMITS: {
            PERCENTAGE: 0.275,
            AMOUNT: 350000
        }
    },
    2023: {
        BRACKETS: [
            { threshold: 226000, rate: 0.18, base: 0 },
            { threshold: 353100, rate: 0.26, base: 40680 },
            { threshold: 488700, rate: 0.31, base: 73726 },
            { threshold: 641400, rate: 0.36, base: 115762 },
            { threshold: 817600, rate: 0.39, base: 170734 },
            { threshold: 1731600, rate: 0.41, base: 239452 },
            { threshold: Infinity, rate: 0.45, base: 614192 }
        ],
        REBATES: {
            PRIMARY: 16425,
            SECONDARY: 9000,
            TERTIARY: 2997
        },
        AGE_THRESHOLDS: {
            SECONDARY: 65,
            TERTIARY: 75
        },
        PENSION_LIMITS: {
            PERCENTAGE: 0.275,
            AMOUNT: 350000
        }
    },
    2024: {
        BRACKETS: [
            { threshold: 237100, rate: 0.18, base: 0 },
            { threshold: 370500, rate: 0.26, base: 42678 },
            { threshold: 512800, rate: 0.31, base: 77362 },
            { threshold: 673000, rate: 0.36, base: 121475 },
            { threshold: 857900, rate: 0.39, base: 179147 },
            { threshold: 1817000, rate: 0.41, base: 251258 },
            { threshold: Infinity, rate: 0.45, base: 644489 }
        ],
        REBATES: {
            PRIMARY: 17235,
            SECONDARY: 9444,
            TERTIARY: 3145
        },
        AGE_THRESHOLDS: {
            SECONDARY: 65,
            TERTIARY: 75
        },
        PENSION_LIMITS: {
            PERCENTAGE: 0.275,
            AMOUNT: 350000
        }
    },
    2025: {
        BRACKETS: [
            { threshold: 237100, rate: 0.18, base: 0 },
            { threshold: 370500, rate: 0.26, base: 42678 },
            { threshold: 512800, rate: 0.31, base: 77362 },
            { threshold: 673000, rate: 0.36, base: 121475 },
            { threshold: 857900, rate: 0.39, base: 179147 },
            { threshold: 1817000, rate: 0.41, base: 251258 },
            { threshold: Infinity, rate: 0.45, base: 644489 }
        ],
        REBATES: {
            PRIMARY: 17235,
            SECONDARY: 9444,
            TERTIARY: 3145
        },
        AGE_THRESHOLDS: {
            SECONDARY: 65,
            TERTIARY: 75
        },
        PENSION_LIMITS: {
            PERCENTAGE: 0.275,
            AMOUNT: 350000
        }
    },
    2026: {
        BRACKETS: [
            { threshold: 237100, rate: 0.18, base: 0 },
            { threshold: 370500, rate: 0.26, base: 42678 },
            { threshold: 512800, rate: 0.31, base: 77362 },
            { threshold: 673000, rate: 0.36, base: 121475 },
            { threshold: 857900, rate: 0.39, base: 179147 },
            { threshold: 1817000, rate: 0.41, base: 251258 },
            { threshold: Infinity, rate: 0.45, base: 644489 }
        ],
        REBATES: {
            PRIMARY: 17235,
            SECONDARY: 9444,
            TERTIARY: 3145
        },
        AGE_THRESHOLDS: {
            SECONDARY: 65,
            TERTIARY: 75
        },
        PENSION_LIMITS: {
            PERCENTAGE: 0.275,
            AMOUNT: 350000
        }
    }
};

// Utility function: Format currency to South African Rand
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
    }).format(amount);
};

// Validation interface
export interface TaxInputValidation {
    isValid: boolean;
    errors: string[];
}

// Usage tracking interface
export interface TaxCalculatorUsage {
    sessionId: string;
    timestamp: Date;
    grossIncome: number;
    hasMultipleEmployers: boolean;
    hasDeductions: boolean;
    calculationSuccessful: boolean;
}