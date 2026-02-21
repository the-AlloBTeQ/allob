import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Star, Phone, Mail, User, Building, ArrowRight, Shield, Award, Users, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

<SEO
  title="Tax Consultation"
  description="Book a professional tax consultation with AlloB Consultants. Expert tax advisory services for individuals and businesses across South Africa."
  keywords="tax consultation South Africa, book tax advisor, tax planning Midrand, tax advisory services Gauteng"
  canonical="/tax-consultation"
/>

declare var gtag: ((...args: any[]) => void) | undefined;

type ConsultationServiceKey = 'tax-planning' | 'business-tax' | 'tax-audit' | 'estate-planning';

interface TaxConsultationFormData {
    fullName: string;
    email: string;
    phone: string;
    preferredContactMethod: string;
    businessName: string;
    businessType: string;
    industry: string;
    annualIncome: string;
    currentTaxSituation: string;
    consultationType: ConsultationServiceKey;
    urgency: string;
    specificConcerns: string;
    previousAccountant: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    howDidYouHear: string;
    additionalNotes: string;
}

interface TaxConsultationInputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {}

interface SubmissionResult {
    submissionId: string;
    serviceName: string;
    customerName: string;
    salesEmailSent: boolean;
    customerEmailSent: boolean;
    fallbackUsed?: boolean;
    timestamp: string;
}

// Input sanitization utilities
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

const TaxConsultationPage = () => {
  const [selectedService, setSelectedService] = useState<ConsultationServiceKey>('tax-planning');
  const [formData, setFormData] = useState<TaxConsultationFormData>({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    preferredContactMethod: 'phone',
    
    // Business Information
    businessName: '',
    businessType: '',
    industry: '',
    annualIncome: '',
    currentTaxSituation: '',
    
    // Consultation Details
    consultationType: 'tax-planning' as ConsultationServiceKey,
    urgency: 'within-week',
    specificConcerns: '',
    previousAccountant: '',
    
    // Scheduling
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // Additional Information
    howDidYouHear: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const consultationServices = {
    'tax-planning': {
      name: 'Tax Planning Strategy',
      price: 'R1,500',
      duration: '60 minutes',
      description: 'Comprehensive tax planning to minimize your tax liability',
      features: [
        'Personal tax assessment',
        'Tax minimization strategies',
        'Deduction optimization',
        'Future tax planning roadmap',
        'Written tax strategy report'
      ]
    },
    'business-tax': {
      name: 'Business Tax Consultation',
      price: 'R2,500',
      duration: '90 minutes',
      description: 'Specialized business tax advice and compliance guidance',
      features: [
        'Business structure optimization',
        'Corporate tax planning',
        'VAT and PAYE guidance',
        'Tax compliance review',
        'Business expense optimization'
      ]
    },
    'tax-audit': {
      name: 'Tax Audit Support',
      price: 'R3,500',
      duration: '2 hours',
      description: 'Expert support for SARS audits and investigations',
      features: [
        'Audit preparation assistance',
        'SARS correspondence handling',
        'Documentation organization',
        'Audit meeting representation',
        'Resolution strategy development'
      ]
    },
    'estate-planning': {
      name: 'Estate Planning & Tax',
      price: 'R2,000',
      duration: '75 minutes',
      description: 'Estate planning with tax optimization focus',
      features: [
        'Estate duty planning',
        'Capital gains tax strategies',
        'Trust structure advice',
        'Succession planning',
        'Will and estate review'
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
    'Technology', 'Manufacturing', 'Retail', 'Healthcare',
    'Construction', 'Professional Services', 'Hospitality',
    'Agriculture', 'Transport & Logistics', 'Education', 'Other'
  ];

  const incomeRanges = [
    'Under R100,000', 'R100,000 - R300,000', 'R300,000 - R500,000',
    'R500,000 - R750,000', 'R750,000 - R1,000,000', 'Over R1,000,000'
  ];

  const handleInputChange = (e: TaxConsultationInputChangeEvent) => {
    const { name, value } = e.target;
    
    let sanitizedValue = value;
    
    // Apply specific sanitization based on field type
    switch (name) {
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhone(value);
        break;
      case 'fullName':
      case 'businessName':
        sanitizedValue = sanitizeInput(value).substring(0, 100);
        break;
      case 'specificConcerns':
      case 'additionalNotes':
        sanitizedValue = sanitizeInput(value).substring(0, 2000);
        break;
      default:
        sanitizedValue = sanitizeInput(value);
        break;
    }
    
    setFormData((prev: TaxConsultationFormData) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'consultationType'
    ];
    
    requiredFields.forEach(field => {
      const key = field as keyof typeof formData;
      if (!formData[key].trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^(\+27|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid South African phone number';
    }
    
    // Additional security checks
    if (formData.fullName && formData.fullName.length > 100) {
      newErrors.fullName = 'Full name is too long';
    }
    
    if (formData.specificConcerns && formData.specificConcerns.length > 2000) {
      newErrors.specificConcerns = 'Specific concerns text is too long';
    }
    
    if (formData.additionalNotes && formData.additionalNotes.length > 2000) {
      newErrors.additionalNotes = 'Additional notes text is too long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create email fallback mailto link
  const createEmailFallback = (submissionData: any): string => {
    const { service, customerData } = submissionData;
    
    const subject = encodeURIComponent(`Tax Consultation Request: ${service.name} - ${customerData.fullName}`);
    const body = encodeURIComponent(`NEW TAX CONSULTATION REQUEST
=============================

Service Details:
- Service: ${service.name}
- Price: ${service.price}
- Duration: ${service.duration}
- Description: ${service.description}

Personal Information:
- Full Name: ${customerData.fullName}
- Email: ${customerData.email}
- Phone: ${customerData.phone}
- Preferred Contact Method: ${customerData.preferredContactMethod}

Business Information:
- Business Name: ${customerData.businessName || 'Not provided'}
- Business Type: ${customerData.businessType || 'Not specified'}
- Industry: ${customerData.industry || 'Not specified'}
- Annual Income Range: ${customerData.annualIncome || 'Not disclosed'}

Tax Situation:
- Current Tax Situation: ${customerData.currentTaxSituation || 'Not specified'}
- Consultation Type: ${service.name}
- Urgency: ${customerData.urgency || 'Not specified'}
- Previous Accountant: ${customerData.previousAccountant || 'Not specified'}

Specific Concerns:
${customerData.specificConcerns || 'None specified'}

Contact Preferences:
- Preferred Contact Method: ${customerData.preferredContactMethod}
- Preferred Time: ${customerData.preferredTime || 'Any time'}
- Timezone: ${customerData.timezone}

How They Found Us:
${customerData.howDidYouHear || 'Not specified'}

Additional Notes:
${customerData.additionalNotes || 'None'}

Submission Details:
- Submitted: ${new Date().toLocaleString()}
- Source: Tax Consultation Page (Email Fallback)

URGENT: Please contact this prospect within 24 hours for tax consultation.

Best regards,

${customerData.fullName}
${customerData.businessName ? customerData.businessName : 'Personal Consultation'}
Phone: ${customerData.phone}
Email: ${customerData.email}`);
    
    return `mailto:tax@allob.co.za?subject=${subject}&body=${body}`;
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
        fullName: sanitizeInput(formData.fullName),
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        businessName: sanitizeInput(formData.businessName),
        specificConcerns: sanitizeInput(formData.specificConcerns),
        additionalNotes: sanitizeInput(formData.additionalNotes)
      };
      
      const submissionData = {
        type: 'tax_consultation',
        service: consultationServices[formData.consultationType as ConsultationServiceKey],
        customerData: sanitizedCustomerData,
        timestamp: new Date().toISOString(),
        source: 'Tax Consultation Page'
      };

      console.log('Attempting API submission...');

      // Try API first
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/consultation`, {
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
            event_category: 'tax_consultation',
            event_label: selectedService,
            value: 1
          });
        }
        
        console.log('API submission successful');
        return;
      } else {
        throw new Error(result.error || 'API request failed');
      }

    } catch (error) {
      console.log('API submission failed, using email fallback:', error);
      
      // Fallback to email
      try {
        const sanitizedSubmissionData = {
          service: consultationServices[formData.consultationType as ConsultationServiceKey],
          customerData: {
            ...formData,
            fullName: sanitizeInput(formData.fullName),
            email: sanitizeEmail(formData.email),
            phone: sanitizePhone(formData.phone),
            businessName: sanitizeInput(formData.businessName),
            specificConcerns: sanitizeInput(formData.specificConcerns),
            additionalNotes: sanitizeInput(formData.additionalNotes)
          }
        };
        
        const emailUrl = createEmailFallback(sanitizedSubmissionData);
        
        // Open email client
        window.location.href = emailUrl;
        
        // Show success message for email fallback
        const fallbackResult: SubmissionResult = {
          submissionId: `EMAIL-TAX-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          serviceName: consultationServices[formData.consultationType as ConsultationServiceKey].name,
          customerName: formData.fullName,
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
        setApiError('Unable to submit your consultation request automatically. Please contact us directly at tax@allob.co.za or call +27 67 921 1947.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && submissionResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {submissionResult.fallbackUsed ? 'Email Prepared Successfully!' : 'Consultation Request Submitted!'}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {submissionResult.fallbackUsed 
              ? `Your email client should have opened with a pre-filled message. Please send the email to complete your ${submissionResult.serviceName} request.`
              : `Thank you for requesting a tax consultation. Our qualified tax professionals will contact you within 24 hours to schedule your appointment.`
            }
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-blue-800">
              <p><strong>Reference ID:</strong> {submissionResult.submissionId}</p>
              <p><strong>Service:</strong> {submissionResult.serviceName}</p>
              <p><strong>Contact:</strong> {submissionResult.customerName}</p>
              <p><strong>Submitted:</strong> {new Date(submissionResult.timestamp).toLocaleString()}</p>
            </div>
          </div>
          
          {submissionResult.fallbackUsed && (
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-orange-800">
                <strong>Important:</strong> If your email client didn't open automatically, please contact us directly at:
                <br />
                <strong>Email:</strong> tax@allob.co.za
                <br />
                <strong>Phone:</strong> +27 67 921 1947
                <br />
                Reference ID: {submissionResult.submissionId}
              </p>
            </div>
          )}
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                <span>Personal consultation call within 24 hours</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                <span>Appointment scheduling and preparation materials</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                <span>Professional tax consultation session</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                <span>Detailed tax strategy report and recommendations</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {!submissionResult.fallbackUsed && (
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <p className="text-sm text-green-800">
                  <strong>Email Status:</strong><br />
                  Tax Team: {submissionResult.salesEmailSent ? '✅ Notified' : '❌ Failed'}<br />
                  Confirmation: {submissionResult.customerEmailSent ? '✅ Sent' : '❌ Failed'}
                </p>
                {!submissionResult.customerEmailSent && (
                  <p className="text-xs text-orange-600 mt-2">
                    If you don't receive a confirmation email, please check your spam folder or contact us directly.
                  </p>
                )}
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Need immediate assistance?</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a href="tel:+27679211947" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call us: +27 67 921 1947
                </a>
                <a href="mailto:tax@allob.co.za" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  tax@allob.co.za
                </a>
              </div>
            </div>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tax Consultation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Get personalized tax planning strategies from our qualified South African tax professionals. 
              Minimize your tax liability and maximize your savings with expert guidance.
            </p>
            <div className="flex items-center justify-center space-x-6 text-blue-100">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Qualified Tax Practitioners</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>SARS Registered</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>500+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Error Display */}
      {apiError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                <p className="text-sm text-red-700 mt-1">{apiError}</p>
                <p className="text-xs text-red-600 mt-2">
                  If this problem persists, please contact us directly at tax@allob.co.za or +27 67 921 1947.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Select Your Consultation</h3>
              
              <div className="space-y-4">
                {Object.entries(consultationServices).map(([key, service]) => (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedService(key as ConsultationServiceKey);
                      setFormData(prev => ({ ...prev, consultationType: key as ConsultationServiceKey }));
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedService === key
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{service.name}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{service.price}</div>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-blue-600">
                          +{service.features.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">4.9/5 from 200+ client reviews</p>
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

          {/* Consultation Booking Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={100}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
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
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-blue-600" />
                  Business Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      maxLength={100}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Your business name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select business type</option>
                      <option value="individual">Individual/Personal</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income Range
                    </label>
                    <select
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select income range</option>
                      {incomeRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Consultation Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Tax Situation
                    </label>
                    <select
                      name="currentTaxSituation"
                      value={formData.currentTaxSituation}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select your situation</option>
                      <option value="up-to-date">All tax returns up to date</option>
                      <option value="behind">Behind on tax returns</option>
                      <option value="sars-issues">Issues with SARS</option>
                      <option value="audit">Facing an audit</option>
                      <option value="new-business">New business owner</option>
                      <option value="life-change">Major life changes</option>
                      <option value="optimization">Looking to optimize taxes</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How urgent is this consultation?
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="within-week">Within this week</option>
                        <option value="within-month">Within this month</option>
                        <option value="within-quarter">Within 3 months</option>
                        <option value="planning">Future planning</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you currently have an accountant?
                      </label>
                      <select
                        name="previousAccountant"
                        value={formData.previousAccountant}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select option</option>
                        <option value="no">No accountant</option>
                        <option value="yes-satisfied">Yes, but need specialist advice</option>
                        <option value="yes-unsatisfied">Yes, but looking to change</option>
                        <option value="diy">I do my own taxes</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Tax Concerns or Questions
                    </label>
                    <textarea
                      name="specificConcerns"
                      value={formData.specificConcerns}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows={4}
                      maxLength={2000}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Please describe your specific tax concerns, questions, or what you'd like to achieve from this consultation..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.specificConcerns.length}/2000 characters
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select source</option>
                      <option value="google">Google search</option>
                      <option value="social-media">Social media</option>
                      <option value="referral">Referral from friend/colleague</option>
                      <option value="existing-client">Existing client</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="TaxCalculator">PAYE Calculator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Consultation Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
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
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={3}
                    maxLength={2000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Any additional information or special requirements..."
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.additionalNotes.length}/2000 characters
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Selected Service Summary</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-semibold">{consultationServices[selectedService].name}</h5>
                          <p className="text-sm text-gray-600">{consultationServices[selectedService].description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {consultationServices[selectedService].price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {consultationServices[selectedService].duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
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
                        Submitting Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Book Tax Consultation <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    By submitting this form, you agree to be contacted by our tax professionals regarding your consultation.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      100% Confidential
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      24hr Response Time
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <Award className="w-4 h-4 mr-2" />
                      Qualified Professionals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">What should I prepare for the consultation?</h3>
              <p className="text-gray-600">Bring your latest tax returns, financial statements, and any SARS correspondence. We'll send you a detailed preparation checklist after booking.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Are consultations conducted in person or online?</h3>
              <p className="text-gray-600">We offer both in-person consultations at our Sunninghill office and secure video consultations. You can choose your preference during booking.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What if I need ongoing tax services?</h3>
              <p className="text-gray-600">After your consultation, we can discuss ongoing tax planning, compliance services, or representation. We'll provide a customized service proposal based on your needs.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Is the consultation fee refundable?</h3>
              <p className="text-gray-600">The consultation fee is applied as a credit toward any ongoing services you choose to engage us for within 3 months of your consultation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxConsultationPage;