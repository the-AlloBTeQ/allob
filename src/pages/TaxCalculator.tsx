// pages/TaxCalculator.tsx
import { useState, useMemo, useCallback } from 'react';
import { Calculator, CreditCard, AlertCircle, CheckCircle, Phone, Mail, FileText } from 'lucide-react';
import { debounce } from 'lodash';
import type { 
    Employer, 
    WorkingConditions, 
    TaxCalculationResult, 
    FrequencyType,
    TaxYear
} from '../types/calculator';
import { 
    calculateTaxLiability, 
    validateEmployers, 
    calculatePAYEComparison,
    formatCurrency 
} from '../paye-calculator/tax-calculator/tax-utils';
import ReportGenerator from '../pages/ReportGenerator';

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

const TaxCalculator = () => {
    // State
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
    const [results, setResults] = useState<TaxCalculationResult | null>(null);
    const [actualPAYE, setActualPAYE] = useState<number>(0);
    const [payeFrequency, setPayeFrequency] = useState<FrequencyType>('monthly');
    const [showComparison, setShowComparison] = useState<boolean>(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const [email, setEmail] = useState<string>("");

    // Performance monitoring
    const { isCalculating, calculationTime, startCalculation, endCalculation } = usePerformanceMonitor();
    
    // Input validation
    const validation = useMemoizedValidation(employers, age);

    // Debounced calculation function
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

    // Memoized employer change handler
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

    // Memoized comparison calculations
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

                                    <div className="mb-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={employer.hasDeductibleExpenses}
                                                onChange={(e) => handleEmployerChange(index, 'hasDeductibleExpenses', e.target.checked)}
                                                disabled={isCalculating}
                                                className="rounded focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Has Deductible Expenses</span>
                                        </label>
                                    </div>

                                    {employer.hasDeductibleExpenses && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Deductible Expenses
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={employer.deductibleExpenses?.amount || 0}
                                                    onChange={(e) => handleEmployerChange(index, 'deductibleExpenses', { amount: Number(e.target.value) })}
                                                    disabled={isCalculating}
                                                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                    placeholder="Amount"
                                                    min="0"
                                                />
                                                <select
                                                    value={employer.deductibleExpenses?.frequency || 'monthly'}
                                                    onChange={(e) => handleEmployerChange(index, 'deductibleExpenses', { frequency: e.target.value as FrequencyType })}
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
                                    )}

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
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.worksFromHome}
                                        onChange={(e) => setWorkingConditions({
                                            ...workingConditions,
                                            worksFromHome: e.target.checked
                                        })}
                                        disabled={isCalculating}
                                        className="rounded focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Works From Home</span>
                                </label>

                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.hasDedicatedWorkspace}
                                        onChange={(e) => setWorkingConditions({
                                            ...workingConditions,
                                            hasDedicatedWorkspace: e.target.checked
                                        })}
                                        disabled={isCalculating}
                                        className="rounded focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Has Dedicated Workspace</span>
                                </label>

                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={workingConditions.hasVariableTravelAllowance}
                                        onChange={(e) => setWorkingConditions({
                                            ...workingConditions,
                                            hasVariableTravelAllowance: e.target.checked
                                        })}
                                        disabled={isCalculating}
                                        className="rounded focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Has Variable Travel Allowance</span>
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
                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 border border-blue-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Calculation Results</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Gross Income:</span>
                                                    <span className="font-semibold">{formatCurrency(results.grossIncome)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Deductions:</span>
                                                    <span className="font-semibold">-{formatCurrency(results.deductions.total)}</span>
                                                </div>
                                                <div className="flex justify-between pt-3 border-t">
                                                    <span className="text-gray-600 font-medium">Taxable Income:</span>
                                                    <span className="font-bold">{formatCurrency(results.taxableIncome)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-blue-900 text-white rounded-lg p-4">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span>Annual Tax:</span>
                                                    <span className="font-bold">{formatCurrency(results.taxLiability)}</span>
                                                </div>
                                                <div className="flex justify-between text-lg">
                                                    <span>Monthly PAYE:</span>
                                                    <span className="font-bold">{formatCurrency(results.monthlyPAYE)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Monthly UIF:</span>
                                                    <span>{formatCurrency(results.UIF / 12)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {results.warnings.length > 0 && (
                                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
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
                    userEmail={email}
                    onClose={() => setShowReportGenerator(false)}
                />
            )}
        </div>
    );
};

export default TaxCalculator;