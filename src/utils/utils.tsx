import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This function combines Tailwind CSS classes intelligently, handling conflicts and merging properly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a date to a readable string (e.g., "January 1, 2024")
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' | 'full' = 'long', locale: string = 'en-US'): string {
  if (!date) return '';
  const dateObj = new Date(date);
  
  if (format === 'short') {
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  
  if (format === 'medium') {
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  
  if (format === 'full') {
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }
  
  // Default 'long' format
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Truncates text to a specified length, adding ellipsis if needed
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Generates a URL-friendly slug from a string
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Calculates reading time for a given text (returns minutes)
export function calculateReadingTime(text: string): number {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Validates email format
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Formats currency values
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  if (amount === undefined || amount === null) return '';
  
  // Special handling for ZAR (South African Rand)
  if (currency === 'ZAR') {
    locale = 'en-ZA';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Groups array items by a key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  if (!array || array.length === 0) return {};
  
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get currency symbol from currency code
export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    'ZAR': 'R',
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'AUD': 'A$',
    'CAD': 'C$',
    'JPY': '¥',
    'CNY': '¥',
    'INR': '₹',
    'CHF': 'CHF',
    'BRL': 'R$',
    'MXN': 'MX$',
    'RUB': '₽',
    'NOK': 'kr',
    'NZD': 'NZ$',
    'TRY': '₺',
    'SAR': 'ر.س',
    'AED': 'د.إ',
    'SGD': 'S$',
    'KRW': '₩'
  };
  
  return symbols[currencyCode] || currencyCode;
}

// Calculate VAT amount based on amount and rate
export function calculateVAT(amount: number, vatRate: number): number {
  if (!amount || !vatRate) return 0;
  return (amount * vatRate) / 100;
}

// Generate a random invoice number
export function generateInvoiceNumber(prefix: string = 'INV'): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
}

// Format phone number
export function formatPhoneNumber(phoneNumber: string, countryCode: string = 'ZA'): string {
  if (!phoneNumber) return '';
  
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on country code
  switch(countryCode) {
    case 'ZA': // South Africa
      if (cleaned.length === 10) {
        return `+27 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
      }
      break;
    case 'US': // United States
      if (cleaned.length === 10) {
        return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      break;
    case 'GB': // United Kingdom
      if (cleaned.length === 11) {
        return `+44 ${cleaned.slice(1, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
      }
      break;
  }
  
  // Default formatting if specific country format not available
  return phoneNumber;
}

// Format number with thousand separators
export function formatNumber(value: number, decimalPlaces: number = 2): string {
  if (value === undefined || value === null) return '';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

// Calculate due date from issue date and payment terms
export function calculateDueDate(issueDate: Date | string, paymentTerms: number): Date {
  const date = new Date(issueDate);
  date.setDate(date.getDate() + paymentTerms);
  return date;
}

// Check if a date is overdue
export function isOverdue(dueDate: Date | string): boolean {
  const now = new Date();
  const due = new Date(dueDate);
  return due < now;
}

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Get file extension
export function getFileExtension(filename: string): string {
  return filename.split('.').pop() || '';
}

// Validate VAT number format based on country
export function validateVATNumber(vatNumber: string, countryCode: string): boolean {
  if (!vatNumber || !countryCode) return false;
  
  // Remove all spaces and non-alphanumeric characters
  const cleaned = vatNumber.replace(/[^a-zA-Z0-9]/g, '');
  
  // Basic validation rules by country
  switch(countryCode) {
    case 'ZA': // South Africa
      return /^4\d{9}$/.test(cleaned); // 10 digits starting with 4
    case 'GB': // United Kingdom
      return /^GB\d{9}$/.test(cleaned) || /^GB\d{12}$/.test(cleaned); // GB + 9 or 12 digits
    case 'EU': // European Union (generic)
      return /^[A-Z]{2}[A-Z0-9]{8,12}$/.test(cleaned); // Country code + 8-12 chars
    default:
      return true; // If no specific validation, accept as is
  }
}

// Format number with thousand separators and decimal places (South African locale)
export function formatNumberZA(value: number, decimals: number = 2): string {
  if (value === undefined || value === null) return '';
  
  return new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
// Parse a CSV string into an array of objects
export function parseCSV(csvString: string, delimiter: string = ','): Record<string, string>[] {
  if (!csvString) return [];
  
  const lines = csvString.split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(delimiter).map(header => header.trim());
  
  return lines.slice(1).map(line => {
    if (!line.trim()) return null; // Skip empty lines
    
    const values = line.split(delimiter);
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || '';
    });
    
    return obj;
  }).filter(Boolean) as Record<string, string>[];
}