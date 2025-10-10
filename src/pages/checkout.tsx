// pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, MapPin, Building, Users, Calendar, CreditCard, Shield, AlertCircle } from 'lucide-react';

declare var gtag: ((...args: any[]) => void) | undefined;

type PackageKey = 'starter' | 'professional' | 'enterprise';

interface HandleInputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {}

interface FormData {
    businessName: string;
    registrationNumber: string;
    businessType: string;
    industry: string;
    yearsInBusiness: string;
    contactPerson: string;
    email: string;
    phone: string;
    alternatePhone: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    employees: string;
    monthlyTurnover: string;
    currentAccountant: string;
    servicesNeeded: string[];
    urgency: string;
    additionalRequirements: string;
    preferredContactTime: string;
    referralSource: string;
    [key: string]: string | string[];
}

interface SubmissionResult {
    submissionId: string;
    packageName: string;
    customerName: string;
    salesEmailSent: boolean;
    customerEmailSent: boolean;
    fallbackUsed?: boolean;
    timestamp: string;
}

// Input sanitization utility
const sanitizeInput = (input: string): string => {
    if (!input || typeof input !== 'string') return '';
    
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/['"]/g, '') // Remove quotes that could break JSON
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/data:/gi, '') // Remove data: protocol
        .replace(/vbscript:/gi, '') // Remove vbscript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 500); // Limit length
};

const sanitizeEmail = (email: string): string => {
    if (!email || typeof email !== 'string') return '';
    
    // Basic email sanitization
    const cleaned = email
        .toLowerCase()
        .replace(/[<>'"]/g, '')
        .trim()
        .substring(0, 254); // RFC compliant max length
    
    return cleaned;
};

const sanitizePhone = (phone: string): string => {
    if (!phone || typeof phone !== 'string') return '';
    
    // Only allow numbers, spaces, +, -, (, )
    return phone
        .replace(/[^0-9\s\+\-\(\)]/g, '')
        .trim()
        .substring(0, 20);
};

const CheckoutPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>('professional');
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    registrationNumber: '',
    businessType: '',
    industry: '',
    yearsInBusiness: '',
    contactPerson: '',
    email: '',
    phone: '',
    alternatePhone: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    employees: '',
    monthlyTurnover: '',
    currentAccountant: '',
    servicesNeeded: [],
    urgency: '',
    additionalRequirements: '',
    preferredContactTime: '',
    referralSource: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [apiError, setApiError] = useState<string>('');
  
  type Errors = {
    [K in keyof FormData]?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const packages: Record<PackageKey, {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  }> = {
    starter: {
      name: 'Starter Package',
      price: 'R3,500/month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Monthly Bookkeeping',
        'VAT Returns',
        'Basic Tax Advisory',
        'Email Support'
      ]
    },
    professional: {
      name: 'Professional Package',
      price: 'R7,500/month',
      description: 'Comprehensive services for growing businesses',
      features: [
        'Full Accounting Services',
        'Tax Planning & Compliance',
        'Management Accounts',
        'Business Advisory',
        'Priority Phone Support'
      ],
      popular: true
    },
    enterprise: {
      name: 'Enterprise Package',
      price: 'Custom Pricing',
      description: 'Full-service solution for established companies',
      features: [
        'All Professional Features',
        'Strategic Planning',
        'M&A Advisory',
        'Dedicated Account Manager',
        '24/7 Support'
      ]
    }
  };

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Close Corporation (CC)',
    'Private Company (Pty Ltd)',
    'Public Company',
    'Trust',
    'Non-Profit Organization'
  ];

  const industries = [
    'Technology',
    'Manufacturing',
    'Retail',
    'Healthcare',
    'Construction',
    'Professional Services',
    'Hospitality',
    'Agriculture',
    'Transport & Logistics',
    'Education',
    'Other'
  ];

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];

  const serviceOptions = [
    'Bookkeeping',
    'Tax Returns',
    'Payroll',
    'VAT Services',
    'Business Advisory',
    'Financial Planning',
    'Auditing',
    'Company Registrations'
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    if (packageParam && ['starter', 'professional', 'enterprise'].includes(packageParam)) {
      setSelectedPackage(packageParam as PackageKey);
    }
  }, []);

  const handleInputChange = (e: HandleInputChangeEvent) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
        setFormData((prev: FormData) => ({
            ...prev,
            servicesNeeded: checked 
                ? [...prev.servicesNeeded, sanitizeInput(value)]
                : prev.servicesNeeded.filter(item => item !== value)
        }));
    } else {
        let sanitizedValue = value;
        
        // Apply specific sanitization based on field type
        switch (name) {
            case 'email':
                sanitizedValue = sanitizeEmail(value);
                break;
            case 'phone':
            case 'alternatePhone':
                sanitizedValue = sanitizePhone(value);
                break;
            default:
                sanitizedValue = sanitizeInput(value);
                break;
        }
        
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: sanitizedValue
        }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
        setApiError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'businessName', 'contactPerson', 'email', 'phone', 
      'businessType', 'industry', 'city', 'province'
    ];
    
    requiredFields.forEach(field => {
      const value = formData[field];
      if (typeof value === 'string') {
        if (!value.trim()) {
          newErrors[field] = 'This field is required';
        }
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          newErrors[field] = 'This field is required';
        }
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (South African format)
    if (formData.phone && !/^(\+27|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid South African phone number';
    }
    
    // Additional security checks
    if (formData.businessName && formData.businessName.length > 100) {
      newErrors.businessName = 'Business name is too long';
    }
    
    if (formData.additionalRequirements && formData.additionalRequirements.length > 2000) {
      newErrors.additionalRequirements = 'Additional requirements text is too long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create email fallback mailto link
  const createEmailFallback = (submissionData: any): string => {
    const { package: pkg, customerData } = submissionData;
    
    const subject = encodeURIComponent(`Service Package Request: ${pkg.name} - ${customerData.businessName}`);
    const body = encodeURIComponent(`NEW SERVICE PACKAGE REQUEST
=========================

Package Details:
- Package: ${pkg.name}
- Price: ${pkg.price}
- Description: ${pkg.description}

Customer Information:
- Contact Person: ${customerData.contactPerson}
- Business Name: ${customerData.businessName}
- Email: ${customerData.email}
- Phone: ${customerData.phone}
- Alternate Phone: ${customerData.alternatePhone || 'Not provided'}

Business Details:
- Business Type: ${customerData.businessType}
- Industry: ${customerData.industry}
- Years in Business: ${customerData.yearsInBusiness || 'Not specified'}
- Number of Employees: ${customerData.employees || 'Not specified'}

Address:
${customerData.streetAddress || 'Not provided'}
${customerData.city}, ${customerData.province}
Postal Code: ${customerData.postalCode || 'Not provided'}

Service Requirements:
- Services Needed: ${customerData.servicesNeeded.join(', ') || 'Not specified'}
- Monthly Turnover: ${customerData.monthlyTurnover || 'Not disclosed'}
- Urgency: ${customerData.urgency || 'Not specified'}
- Current Accountant: ${customerData.currentAccountant || 'Not specified'}

Contact Preferences:
- Preferred Contact Time: ${customerData.preferredContactTime || 'Any time'}
- How they heard about us: ${customerData.referralSource || 'Not specified'}

Additional Requirements:
${customerData.additionalRequirements || 'None specified'}

Submission Details:
- Submitted: ${new Date().toLocaleString()}
- Source: Website Checkout Form (Email Fallback)

URGENT: Please contact this prospect within 24 hours.

Regards

${customerData.contactPerson}
${customerData.businessName}
Phone: ${customerData.phone}
Email: ${customerData.email}`);
    
    return `mailto:sales@allob.co.za?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async () => {
    setApiError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare sanitized submission data
      const sanitizedCustomerData = {
        ...formData,
        businessName: sanitizeInput(formData.businessName),
        contactPerson: sanitizeInput(formData.contactPerson),
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        alternatePhone: sanitizePhone(formData.alternatePhone),
        streetAddress: sanitizeInput(formData.streetAddress),
        city: sanitizeInput(formData.city),
        additionalRequirements: sanitizeInput(formData.additionalRequirements)
      };
      
      const submissionData = {
        package: packages[selectedPackage],
        customerData: sanitizedCustomerData,
        timestamp: new Date().toISOString(),
        source: 'Website Checkout'
      };
      
      console.log('Attempting API submission...');
      
      // Try API first
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const responseText = await response.text();
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from server');
      }
      
      const result = JSON.parse(responseText);
      
      if (result.success) {
        setSubmissionResult(result.data);
        setIsSubmitted(true);
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            event_category: 'checkout',
            event_label: selectedPackage,
            value: 1
          });
        }
        
        console.log('API submission successful');
        return;
      } else {
        throw new Error(result.message || 'API request failed');
      }
      
    } catch (error) {
      console.log('API submission failed, using email fallback:', error);
      
      // Fallback to email
      try {
        const sanitizedSubmissionData = {
          package: packages[selectedPackage],
          customerData: {
            ...formData,
            businessName: sanitizeInput(formData.businessName),
            contactPerson: sanitizeInput(formData.contactPerson),
            email: sanitizeEmail(formData.email),
            phone: sanitizePhone(formData.phone),
            alternatePhone: sanitizePhone(formData.alternatePhone),
            streetAddress: sanitizeInput(formData.streetAddress),
            city: sanitizeInput(formData.city),
            additionalRequirements: sanitizeInput(formData.additionalRequirements)
          }
        };
        
        const emailUrl = createEmailFallback(sanitizedSubmissionData);
        
        // Open email client
        window.location.href = emailUrl;
        
        // Show success message for email fallback
        const fallbackResult: SubmissionResult = {
          submissionId: `EMAIL-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          packageName: packages[selectedPackage].name,
          customerName: formData.contactPerson,
          salesEmailSent: true, // Will be sent via email client
          customerEmailSent: false,
          fallbackUsed: true,
          timestamp: new Date().toISOString()
        };
        
        setSubmissionResult(fallbackResult);
        setIsSubmitted(true);
        
        console.log('Email fallback initiated successfully');
        
      } catch (emailError) {
        console.error('Email fallback failed:', emailError);
        setApiError('Unable to submit your request automatically. Please contact us directly at sales@allob.co.za or call +27 67 921 1947.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success page
  if (isSubmitted && submissionResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {submissionResult.fallbackUsed ? 'Email Prepared Successfully!' : 'Request Submitted Successfully!'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {submissionResult.fallbackUsed 
              ? `Your email client should have opened with a pre-filled message. Please send the email to complete your ${submissionResult.packageName} request.`
              : `Thank you for your interest in our ${submissionResult.packageName}. Our sales team will contact you within 24 hours to discuss your requirements.`
            }
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-blue-800">
              <p><strong>Reference ID:</strong> {submissionResult.submissionId}</p>
              <p><strong>Package:</strong> {submissionResult.packageName}</p>
              <p><strong>Contact:</strong> {submissionResult.customerName}</p>
              <p><strong>Submitted:</strong> {new Date(submissionResult.timestamp).toLocaleString()}</p>
            </div>
          </div>
          
          {submissionResult.fallbackUsed && (
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-orange-800">
                <strong>Important:</strong> If your email client didn't open automatically, please contact us directly at:
                <br />
                <strong>Email:</strong> sales@allob.co.za
                <br />
                <strong>Phone:</strong> +27 67 921 1947
                <br />
                Reference ID: {submissionResult.submissionId}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {!submissionResult.fallbackUsed && (
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <p className="text-sm text-green-800">
                  <strong>Email Status:</strong><br />
                  Sales Team: {submissionResult.salesEmailSent ? '✅ Notified' : '❌ Failed'}<br />
                  Confirmation: {submissionResult.customerEmailSent ? '✅ Sent' : '❌ Failed'}
                </p>
                {!submissionResult.customerEmailSent && (
                  <p className="text-xs text-orange-600 mt-2">
                    If you don't receive a confirmation email, please check your spam folder or contact us directly.
                  </p>
                )}
              </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong><br />
                1. Sales consultation within 24 hours<br />
                2. Custom proposal preparation<br />
                3. Service implementation planning
              </p>
            </div>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Service Package Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your information to get started with our professional services</p>
        </div>

        {/* API Error Display */}
        {apiError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                <p className="text-sm text-red-700 mt-1">{apiError}</p>
                <p className="text-xs text-red-600 mt-2">
                  If this problem persists, please contact us directly at sales@allob.co.za or +27 67 921 1947.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Package Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Package Summary</h3>
              
              {/* Package Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Package
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value as PackageKey)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  {Object.entries(packages).map(([key, pkg]) => (
                    <option key={key} value={key}>
                      {pkg.name} - {pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Package Details */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{packages[selectedPackage].name}</h4>
                    {packages[selectedPackage]?.popular && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {packages[selectedPackage].price}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {packages[selectedPackage].description}
                </p>
                
                <div>
                  <h5 className="font-medium mb-2">Included Services:</h5>
                  <ul className="space-y-1">
                    {packages[selectedPackage].features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Your information is secure and protected. We use encryption and never share your data.
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Business Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-blue-600" />
                  Business Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={100}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.businessName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={50}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Company registration number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.businessType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.industry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years in Business
                    </label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select years</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Employees
                    </label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select range</option>
                      <option value="1">Just me</option>
                      <option value="2-5">2-5 employees</option>
                      <option value="6-10">6-10 employees</option>
                      <option value="11-20">11-20 employees</option>
                      <option value="21-50">21-50 employees</option>
                      <option value="50+">50+ employees</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={100}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Full name"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={254}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={20}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+27 11 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Alternate number"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                  Business Address
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={200}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={100}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province *
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.province ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>

              {/* Service Requirements */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                  Service Requirements
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Which services are you most interested in? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {serviceOptions.map(service => (
                        <label key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            name="servicesNeeded"
                            value={service}
                            checked={formData.servicesNeeded.includes(service)}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                          />
                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Turnover (Optional)
                      </label>
                      <select
                        name="monthlyTurnover"
                        value={formData.monthlyTurnover}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select range</option>
                        <option value="0-50k">R0 - R50,000</option>
                        <option value="50k-100k">R50,000 - R100,000</option>
                        <option value="100k-250k">R100,000 - R250,000</option>
                        <option value="250k-500k">R250,000 - R500,000</option>
                        <option value="500k-1m">R500,000 - R1,000,000</option>
                        <option value="1m+">R1,000,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How urgently do you need these services?
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select urgency</option>
                        <option value="immediate">Immediate (Within 1 week)</option>
                        <option value="soon">Soon (Within 1 month)</option>
                        <option value="planning">Planning (2-3 months)</option>
                        <option value="future">Future reference</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you currently have an accountant?
                    </label>
                    <select
                      name="currentAccountant"
                      value={formData.currentAccountant}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select option</option>
                      <option value="no">No, we don't have an accountant</option>
                      <option value="yes-happy">Yes, but looking for better service</option>
                      <option value="yes-unhappy">Yes, but not satisfied</option>
                      <option value="diy">We do our own accounting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements or Comments
                    </label>
                    <textarea
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows={4}
                      maxLength={2000}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Please describe any specific requirements or questions you have..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.additionalRequirements.length}/2000 characters
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Contact */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Preferences
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Time
                    </label>
                    <select
                      name="preferredContactTime"
                      value={formData.preferredContactTime}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Any time</option>
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 5pm)</option>
                      <option value="evening">Evening (5pm - 7pm)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select source</option>
                      <option value="google">Google Search</option>
                      <option value="referral">Referral from friend/colleague</option>
                      <option value="social">Social Media</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="website">Your website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-white transition-all transform ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed scale-95'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Request...
                      </span>
                    ) : (
                      'Submit Request for Consultation'
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    By submitting this form, you agree to be contacted by our sales team regarding our services.
                  </p>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Next Steps:</strong> Our sales team will review your requirements and contact you within 24 hours to schedule a consultation and provide a customized quote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;