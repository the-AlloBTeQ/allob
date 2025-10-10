// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Type definitions
interface CheckoutData {
  package: {
    name: string;
    price: string;
    description: string;
    features: string[];
  };
  customerData: {
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
  };
  timestamp: string;
  source: string;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data?: {
    submissionId: string;
    salesEmailSent: boolean;
    customerEmailSent: boolean;
    packageName: string;
    customerName: string;
    customerEmail: string;
    timestamp: string;
  };
  error?: string;
  details?: string[];
}

// Security utilities
const sanitizeString = (input: any, maxLength: number = 500): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/\x00/g, '') // Remove null bytes
    .trim()
    .substring(0, maxLength);
};

const sanitizeEmail = (email: any): string => {
  if (!email || typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .replace(/[<>'"]/g, '')
    .replace(/\s/g, '')
    .trim()
    .substring(0, 254);
};

const sanitizePhone = (phone: any): string => {
  if (!phone || typeof phone !== 'string') return '';
  
  return phone
    .replace(/[^0-9\s\+\-\(\)]/g, '')
    .trim()
    .substring(0, 20);
};

const sanitizeArray = (arr: any, maxItems: number = 10): string[] => {
  if (!Array.isArray(arr)) return [];
  
  return arr
    .slice(0, maxItems)
    .map(item => sanitizeString(item, 100))
    .filter(item => item.length > 0);
};

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+27|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateCheckoutData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check if data exists
  if (!data || typeof data !== 'object') {
    errors.push('Invalid request data format');
    return { valid: false, errors };
  }

  // Validate package
  if (!data.package || typeof data.package !== 'object') {
    errors.push('Package information is required');
  } else {
    if (!data.package.name || typeof data.package.name !== 'string') {
      errors.push('Package name is required');
    }
    if (!data.package.price || typeof data.package.price !== 'string') {
      errors.push('Package price is required');
    }
  }

  // Validate customer data
  if (!data.customerData || typeof data.customerData !== 'object') {
    errors.push('Customer data is required');
    return { valid: false, errors };
  }

  const customerData = data.customerData;

  // Required fields validation
  const requiredFields = [
    { field: 'businessName', name: 'Business name' },
    { field: 'contactPerson', name: 'Contact person' },
    { field: 'email', name: 'Email address' },
    { field: 'phone', name: 'Phone number' },
    { field: 'businessType', name: 'Business type' },
    { field: 'industry', name: 'Industry' },
    { field: 'city', name: 'City' },
    { field: 'province', name: 'Province' }
  ];

  requiredFields.forEach(({ field, name }) => {
    const value = customerData[field];
    if (!value || typeof value !== 'string' || !value.trim()) {
      errors.push(`${name} is required`);
    }
  });

  // Email validation
  if (customerData.email && !validateEmail(customerData.email)) {
    errors.push('Invalid email format');
  }

  // Phone validation
  if (customerData.phone && !validatePhone(customerData.phone)) {
    errors.push('Invalid phone number format');
  }

  // Length validations
  const lengthValidations = [
    { field: 'businessName', max: 100, name: 'Business name' },
    { field: 'contactPerson', max: 100, name: 'Contact person' },
    { field: 'streetAddress', max: 200, name: 'Street address' },
    { field: 'city', max: 100, name: 'City' },
    { field: 'additionalRequirements', max: 2000, name: 'Additional requirements' }
  ];

  lengthValidations.forEach(({ field, max, name }) => {
    const value = customerData[field];
    if (value && typeof value === 'string' && value.length > max) {
      errors.push(`${name} is too long (maximum ${max} characters)`);
    }
  });

  return { valid: errors.length === 0, errors };
};

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowStart = Math.floor(now / RATE_LIMIT_WINDOW) * RATE_LIMIT_WINDOW;
  const key = `${ip}_${windowStart}`;

  // Clean up old entries
  for (const [mapKey, data] of requestCounts.entries()) {
    if (data.resetTime < now) {
      requestCounts.delete(mapKey);
    }
  }

  const requestData = requestCounts.get(key) || { 
    count: 0, 
    resetTime: windowStart + RATE_LIMIT_WINDOW 
  };
  
  if (requestData.count >= RATE_LIMIT_MAX) {
    return false;
  }

  requestData.count++;
  requestCounts.set(key, requestData);
  return true;
};

// Get client IP
const getClientIP = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  
  if (forwarded) {
    return typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0];
  }
  if (realIP) {
    return typeof realIP === 'string' ? realIP : realIP[0];
  }
  return req.socket.remoteAddress || 'unknown';
};

// Mailtrap email service functions
const sendSalesNotificationEmail = async (data: CheckoutData): Promise<boolean> => {
  try {
    const { MailtrapClient } = require('mailtrap');

    const client = new MailtrapClient({
      endpoint: process.env.MAILTRAP_ENDPOINT,
      token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
      email: process.env.MAILTRAP_SENDER_EMAIL || 'noreply@allob.co.za',
      name: 'AlloB Consultants Website',
    };

    const emailContent = {
      from: sender,
      to: [{ email: 'sales@allob.co.za' }],
      subject: `🚨 New Service Request: ${data.package.name} - ${data.customerData.businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .section { margin-bottom: 30px; }
                .highlight { background-color: #f0f9ff; padding: 15px; border-left: 4px solid #1e40af; margin: 15px 0; }
                .urgent { background-color: #fef2f2; border-left: 4px solid #dc2626; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f8fafc; font-weight: bold; }
                .footer { background-color: #f8fafc; padding: 15px; font-size: 12px; color: #666; }
                .cta { background-color: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎯 New Service Package Request</h1>
                <p>Priority: ${data.customerData.urgency === 'immediate' ? '🔴 URGENT' : '🟡 Normal'}</p>
            </div>
            
            <div class="content">
                <div class="highlight ${data.customerData.urgency === 'immediate' ? 'urgent' : ''}">
                    <h2>📋 Quick Summary</h2>
                    <p><strong>${data.customerData.contactPerson}</strong> from <strong>${data.customerData.businessName}</strong> is interested in <strong>${data.package.name}</strong></p>
                    <p>📧 ${data.customerData.email} | 📞 ${data.customerData.phone}</p>
                    <p>🏢 ${data.customerData.industry} | 💰 ${data.customerData.monthlyTurnover || 'Not disclosed'}</p>
                </div>

                <div class="section">
                    <h3>📦 Package Details</h3>
                    <table>
                        <tr><th>Package</th><td>${data.package.name}</td></tr>
                        <tr><th>Price</th><td>${data.package.price}</td></tr>
                        <tr><th>Description</th><td>${data.package.description}</td></tr>
                        <tr><th>Features</th><td>${data.package.features.join(', ')}</td></tr>
                    </table>
                </div>

                <div class="section">
                    <h3>🏢 Business Information</h3>
                    <table>
                        <tr><th>Business Name</th><td>${data.customerData.businessName}</td></tr>
                        <tr><th>Registration Number</th><td>${data.customerData.registrationNumber || 'Not provided'}</td></tr>
                        <tr><th>Business Type</th><td>${data.customerData.businessType}</td></tr>
                        <tr><th>Industry</th><td>${data.customerData.industry}</td></tr>
                        <tr><th>Years in Business</th><td>${data.customerData.yearsInBusiness || 'Not specified'}</td></tr>
                        <tr><th>Number of Employees</th><td>${data.customerData.employees || 'Not specified'}</td></tr>
                    </table>
                </div>

                <div class="section">
                    <h3>👤 Contact Information</h3>
                    <table>
                        <tr><th>Contact Person</th><td>${data.customerData.contactPerson}</td></tr>
                        <tr><th>Email</th><td><a href="mailto:${data.customerData.email}">${data.customerData.email}</a></td></tr>
                        <tr><th>Phone</th><td><a href="tel:${data.customerData.phone}">${data.customerData.phone}</a></td></tr>
                        <tr><th>Alternate Phone</th><td>${data.customerData.alternatePhone || 'Not provided'}</td></tr>
                    </table>
                </div>

                <div class="section">
                    <h3>📍 Address</h3>
                    <p>
                        ${data.customerData.streetAddress || 'Not provided'}<br>
                        ${data.customerData.city}, ${data.customerData.province}<br>
                        ${data.customerData.postalCode || 'No postal code'}
                    </p>
                </div>

                <div class="section">
                    <h3>🎯 Service Requirements</h3>
                    <table>
                        <tr><th>Services Needed</th><td>${data.customerData.servicesNeeded.join(', ') || 'Not specified'}</td></tr>
                        <tr><th>Urgency</th><td><strong>${data.customerData.urgency || 'Not specified'}</strong></td></tr>
                        <tr><th>Monthly Turnover</th><td>${data.customerData.monthlyTurnover || 'Not disclosed'}</td></tr>
                        <tr><th>Current Accountant</th><td>${data.customerData.currentAccountant || 'Not specified'}</td></tr>
                    </table>
                </div>

                <div class="section">
                    <h3>📞 Contact Preferences</h3>
                    <table>
                        <tr><th>Preferred Contact Time</th><td>${data.customerData.preferredContactTime || 'Any time'}</td></tr>
                        <tr><th>How they heard about us</th><td>${data.customerData.referralSource || 'Not specified'}</td></tr>
                    </table>
                </div>

                ${data.customerData.additionalRequirements ? `
                <div class="section">
                    <h3>📝 Additional Requirements</h3>
                    <div class="highlight">
                        <p>${data.customerData.additionalRequirements}</p>
                    </div>
                </div>
                ` : ''}

                <div class="highlight">
                    <h3>⚡ Action Required</h3>
                    <p><strong>Contact this prospect within 24 hours!</strong></p>
                    <a href="mailto:${data.customerData.email}?subject=Re: Your ${data.package.name} Inquiry" class="cta">
                        Email ${data.customerData.contactPerson}
                    </a>
                    <a href="tel:${data.customerData.phone}" class="cta">
                        Call ${data.customerData.phone}
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Submission Details:</strong></p>
                <p>📅 Submitted: ${new Date(data.timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
                <p>🌐 Source: ${data.source}</p>
                <p>🆔 Reference: CHK_${Date.now()}</p>
            </div>
        </body>
        </html>
      `,
      category: 'Sales Lead',
    };

    await client.send(emailContent);
    console.log('✅ Sales notification email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send sales notification email:', error);
    return false;
  }
};

const sendCustomerConfirmationEmail = async (data: CheckoutData): Promise<boolean> => {
  try {
    const { MailtrapClient } = require('mailtrap');

    const client = new MailtrapClient({
      endpoint: process.env.MAILTRAP_ENDPOINT,
      token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
      email: process.env.MAILTRAP_SENDER_EMAIL || 'noreply@allob.co.za',
      name: 'AlloB Consultants',
    };

    const emailContent = {
      from: sender,
      to: [{ email: data.customerData.email }],
      subject: `Thank you for your interest in ${data.package.name} - AlloB Consultants`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background-color: #1e40af; color: white; padding: 30px 20px; text-align: center; }
                .content { padding: 30px 20px; }
                .highlight { background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .package-info { background-color: #fef9e7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; }
                .next-steps { background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
                .contact-info { background-color: #f8fafc; padding: 20px; border-radius: 8px; }
                .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #666; }
                ol { padding-left: 20px; }
                li { margin-bottom: 8px; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .tagline { font-style: italic; opacity: 0.9; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">AlloB Consultants</div>
                <div class="tagline">Integrity and Innovation</div>
                <h2>Thank you for your service request!</h2>
            </div>
            
            <div class="content">
                <p>Dear <strong>${data.customerData.contactPerson}</strong>,</p>
                
                <p>Thank you for your interest in our professional services. We have successfully received your request for our <strong>${data.package.name}</strong> and our sales team will contact you within 24 hours to discuss your specific requirements.</p>
                
                <div class="package-info">
                    <h3>📦 Your Selected Package</h3>
                    <p><strong>Package:</strong> ${data.package.name}</p>
                    <p><strong>Price:</strong> ${data.package.price}</p>
                    <p><strong>Description:</strong> ${data.package.description}</p>
                    
                    <h4>Included Services:</h4>
                    <ul>
                        ${data.package.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What happens next?</h3>
                    <ol>
                        <li><strong>Sales consultation within 24 hours</strong> - Our sales representative will contact you to understand your specific needs</li>
                        <li><strong>Custom proposal preparation</strong> - We'll create a tailored proposal based on your requirements</li>
                        <li><strong>Service implementation planning</strong> - Once approved, we'll plan the implementation of your chosen services</li>
                    </ol>
                </div>
                
                <div class="highlight">
                    <h3>📋 Your Request Summary</h3>
                    <p><strong>Business:</strong> ${data.customerData.businessName}</p>
                    <p><strong>Industry:</strong> ${data.customerData.industry}</p>
                    <p><strong>Services of Interest:</strong> ${data.customerData.servicesNeeded.join(', ') || 'As per package'}</p>
                    <p><strong>Urgency:</strong> ${data.customerData.urgency || 'Not specified'}</p>
                    <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
                </div>
                
                <div class="contact-info">
                    <h3>📞 Need immediate assistance?</h3>
                    <p>If you have any urgent questions or need to speak with us immediately, please don't hesitate to contact us:</p>
                    <ul>
                        <li><strong>Email:</strong> <a href="mailto:sales@allob.co.za">sales@allob.co.za</a></li>
                        <li><strong>Phone:</strong> <a href="tel:+27679211947">+27 67 921 1947</a></li>
                        <li><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM (SAST)</li>
                    </ul>
                </div>
                
                <p>We look forward to working with you and helping your business grow with our professional accounting and business advisory services.</p>
                
                <p>Best regards,<br>
                <strong>The AlloB Consultants Team</strong><br>
                <em>Integrity and Innovation</em></p>
            </div>
            
            <div class="footer">
                <p><strong>AlloB Consultants</strong> | Professional Accounting & Business Advisory Services</p>
                <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
                <p>If you no longer wish to receive emails from us, please contact us at sales@allob.co.za</p>
            </div>
        </body>
        </html>
      `,
      category: 'Customer Confirmation',
    };

    await client.send(emailContent);
    console.log('✅ Customer confirmation email sent successfully to:', data.customerData.email);
    return true;
  } catch (error) {
    console.error('❌ Failed to send customer confirmation email:', error);
    return false;
  }
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SITE_URL || 'https://allob.co.za'
    : '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

// Main API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse>
) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
    return;
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      message: 'Too many checkout requests. Please try again later.'
    });
    return;
  }

  try {
    console.log('Processing checkout request from IP:', clientIP);

    // Validate and sanitize input data
    const validationResult = validateCheckoutData(req.body);
    if (!validationResult.valid) {
      console.log('Validation failed:', validationResult.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.errors,
        message: 'Please check your form data and try again.'
      });
    }

    // Sanitize the input data
    const sanitizedData: CheckoutData = {
      package: {
        name: sanitizeString(req.body.package?.name, 100),
        price: sanitizeString(req.body.package?.price, 50),
        description: sanitizeString(req.body.package?.description, 500),
        features: sanitizeArray(req.body.package?.features, 20)
      },
      customerData: {
        businessName: sanitizeString(req.body.customerData?.businessName, 100),
        registrationNumber: sanitizeString(req.body.customerData?.registrationNumber, 50),
        businessType: sanitizeString(req.body.customerData?.businessType, 100),
        industry: sanitizeString(req.body.customerData?.industry, 100),
        yearsInBusiness: sanitizeString(req.body.customerData?.yearsInBusiness, 50),
        contactPerson: sanitizeString(req.body.customerData?.contactPerson, 100),
        email: sanitizeEmail(req.body.customerData?.email),
        phone: sanitizePhone(req.body.customerData?.phone),
        alternatePhone: sanitizePhone(req.body.customerData?.alternatePhone),
        streetAddress: sanitizeString(req.body.customerData?.streetAddress, 200),
        city: sanitizeString(req.body.customerData?.city, 100),
        province: sanitizeString(req.body.customerData?.province, 100),
        postalCode: sanitizeString(req.body.customerData?.postalCode, 10),
        employees: sanitizeString(req.body.customerData?.employees, 50),
        monthlyTurnover: sanitizeString(req.body.customerData?.monthlyTurnover, 50),
        currentAccountant: sanitizeString(req.body.customerData?.currentAccountant, 100),
        servicesNeeded: sanitizeArray(req.body.customerData?.servicesNeeded, 10),
        urgency: sanitizeString(req.body.customerData?.urgency, 50),
        additionalRequirements: sanitizeString(req.body.customerData?.additionalRequirements, 2000),
        preferredContactTime: sanitizeString(req.body.customerData?.preferredContactTime, 50),
        referralSource: sanitizeString(req.body.customerData?.referralSource, 100)
      },
      timestamp: new Date().toISOString(),
      source: sanitizeString(req.body.source || 'Website Checkout', 100)
    };

    console.log(`Processing request for ${sanitizedData.customerData.businessName} - ${sanitizedData.package.name}`);

    // Generate unique submission ID
    const submissionId = `CHK_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Send emails
    console.log('Sending notification emails...');
    const salesEmailSent = await sendSalesNotificationEmail(sanitizedData);
    const customerEmailSent = await sendCustomerConfirmationEmail(sanitizedData);

    // Log results
    console.log('Email results:', { salesEmailSent, customerEmailSent });

    // Check if critical email (sales notification) failed
    if (!salesEmailSent) {
      console.error('Critical error: Sales notification email failed');
      return res.status(500).json({
        success: false,
        error: 'Failed to notify sales team',
        message: 'Unable to process your request at this time. Please contact us directly at sales@allob.co.za or +27 67 921 1947.'
      });
    }

    // Save to database (if you have one)
    // await database.saveCheckoutRequest(sanitizedData, submissionId);

    // Success response
    const response: CheckoutResponse = {
      success: true,
      message: customerEmailSent 
        ? 'Request submitted successfully! Check your email for confirmation.'
        : 'Request submitted successfully! Our sales team will contact you within 24 hours.',
      data: {
        submissionId,
        salesEmailSent,
        customerEmailSent,
        packageName: sanitizedData.package.name,
        customerName: sanitizedData.customerData.contactPerson,
        customerEmail: sanitizedData.customerData.email,
        timestamp: sanitizedData.timestamp
      }
    };

    res.status(200).json(response);

    // Log successful submission
    console.log(`Checkout completed successfully: ${submissionId} for ${sanitizedData.customerData.businessName}`);

  } catch (error) {
    console.error('Checkout API error:', error);
    
    // Don't expose internal error details to client
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process your request. Please try again later or contact us directly at sales@allob.co.za.'
    });
  }
}

// Export configuration for Next.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}