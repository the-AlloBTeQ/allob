import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, User, Phone, Building2, MessageSquare, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

interface IndustryInfo {
  name: string;
  blurb: string;
}

const INDUSTRY_INFO: Record<string, IndustryInfo> = {
  technology: {
    name: 'Technology & Software',
    blurb: 'Serving tech startups, software companies, and digital service providers with specialized accounting and tax solutions.'
  },
  manufacturing: {
    name: 'Manufacturing',
    blurb: 'Supporting manufacturers with cost accounting, inventory management, and supply chain financial optimization.'
  },
  retail: {
    name: 'Retail & E-commerce',
    blurb: 'Helping retail businesses and e-commerce companies manage multi-channel operations and complex sales tax.'
  },
  professional: {
    name: 'Professional Services',
    blurb: 'Providing specialized services to law firms, consulting companies, and other professional service providers.'
  },
  healthcare: {
    name: 'Healthcare',
    blurb: 'Supporting healthcare providers with specialized compliance, billing, and financial management needs.'
  },
  construction: {
    name: 'Construction',
    blurb: 'Helping construction companies with project accounting, progress billing, and equipment asset management.'
  },
  'import-export': {
    name: 'Import/Export',
    blurb: 'Specialized services for import/export businesses, including customs registration and trade compliance.'
  },
  nonprofit: {
    name: 'Non-Profit Organizations',
    blurb: 'Supporting NPOs and NGOs with specialized reporting, donor management, and regulatory compliance.'
  }
};

const DEFAULT_INDUSTRY: IndustryInfo = {
  name: 'General',
  blurb: 'Tell us about your business and how we can help.'
};

const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/['"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .substring(0, 1000);
};

const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase().replace(/[<>'"]/g, '').substring(0, 254);
};

interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
}

const ServiceInquiry = () => {
  const [searchParams] = useSearchParams();
  const industrySlug = searchParams.get('industry') || '';
  const industryInfo = INDUSTRY_INFO[industrySlug] || DEFAULT_INDUSTRY;

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof InquiryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us a bit about what you need';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailtoUrl = (): string => {
    const subject = encodeURIComponent(
      `${industryInfo.name} Service Inquiry — ${sanitizeInput(formData.businessName) || sanitizeInput(formData.fullName)}`
    );
    const body = encodeURIComponent(`NEW ${industryInfo.name.toUpperCase()} SERVICE INQUIRY
=========================

Industry: ${industryInfo.name}

Contact Information:
- Name: ${sanitizeInput(formData.fullName)}
- Email: ${sanitizeEmail(formData.email)}
- Phone: ${sanitizeInput(formData.phone) || 'Not provided'}
- Business Name: ${sanitizeInput(formData.businessName) || 'Not provided'}

What they need help with:
${sanitizeInput(formData.message)}

Submitted: ${new Date().toLocaleString()}
Source: Website — ${industryInfo.name} industry page

Regards
${sanitizeInput(formData.fullName)}`);

    return `mailto:pservices@allob.co.za?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const mailtoUrl = buildMailtoUrl();
    window.location.href = mailtoUrl;
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <SEO
          title="Inquiry Sent"
          description="Your service inquiry has been prepared for AlloB Consultants."
          noIndex
        />
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Almost done</h1>
          <p className="text-gray-600 mb-6">
            We've opened your email client with your {industryInfo.name.toLowerCase()} inquiry ready to go —
            just review it and hit Send. One of our consultants will follow up with you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildMailtoUrl()}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold transition-colors"
            >
              Open Email Client Again
            </a>
            <Link
              to="/industries"
              className="border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              Back to Industries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${industryInfo.name} Service Inquiry`}
        description={`Get in touch with AlloB Consultants about ${industryInfo.name} services. No pricing, no obligation — we'll follow up with you directly.`}
        keywords={`${industryInfo.name} accounting, AlloB Consultants inquiry, South Africa`}
        canonical="/service-inquiry"
        noIndex
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/industries" className="inline-flex items-center text-blue-200 hover:text-white text-sm mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Industries
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{industryInfo.name} Service Inquiry</h1>
          <p className="text-lg text-blue-100">{industryInfo.blurb}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-600 mb-8 text-sm">
              No packages, no pricing — just tell us what you need and we'll follow up with you directly.
              Submitting this form prepares an email to our team; you'll need to press Send in your own email client to complete it.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" /> Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fullName ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 071 234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-1" /> Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" /> What do you need help with? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder={`Tell us a bit about your ${industryInfo.name.toLowerCase()} business and what you're looking for`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Prepare Inquiry Email</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceInquiry;
