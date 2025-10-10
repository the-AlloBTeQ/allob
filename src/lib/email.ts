// lib/email.ts - Production Mailtrap Email Service
import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Define interfaces directly in this file to avoid import issues
interface CustomerData {
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
}

interface PackageInfo {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface CheckoutRequest {
  package: PackageInfo;
  customerData: CustomerData;
  timestamp: string;
  source: string;
}

interface EmailResult {
  salesEmailSent: boolean;
  customerEmailSent: boolean;
  error?: string;
}

// Create production Mailtrap transporter
const createTransporter = (): Transporter => {
  const apiToken = process.env.MAILTRAP_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('MAILTRAP_API_TOKEN environment variable is not set');
  }

  return nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: apiToken
    },
    secure: false, // Use TLS
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Enhanced sales email template
const generateSalesEmailHTML = (data: CheckoutRequest): string => {
  const { package: packageInfo, customerData, timestamp } = data;
  const submissionDate = new Date(timestamp).toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Service Request - ${packageInfo.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { background: white; padding: 0; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .section { padding: 25px 30px; border-bottom: 1px solid #e5e7eb; }
        .section:last-child { border-bottom: none; }
        .section h3 { color: #1f2937; margin-bottom: 15px; font-size: 18px; }
        .package-highlight { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; padding: 20px; border-radius: 10px; margin: 20px 0; position: relative; }
        .urgent-alert { background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 15px; margin: 15px 0; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .info-card { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .info-label { font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { color: #1f2937; font-size: 16px; margin-top: 5px; }
        .info-value a { color: #2563eb; text-decoration: none; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 15px; }
        .service-tag { background: #e0f2fe; color: #0277bd; padding: 8px 12px; border-radius: 20px; font-size: 13px; text-align: center; font-weight: 500; }
        .cta-section { background: #f8fafc; padding: 25px; text-align: center; }
        .cta-button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 0 10px 10px 0; font-weight: 600; }
        .footer { background: #1f2937; color: #d1d5db; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; }
        .priority-high { border-left-color: #ef4444; }
        .priority-medium { border-left-color: #f59e0b; }
        .priority-low { border-left-color: #10b981; }
        @media (max-width: 600px) {
          .container { padding: 10px; }
          .header { padding: 20px; }
          .section { padding: 20px; }
          .info-grid { grid-template-columns: 1fr; }
          .cta-button { display: block; margin: 10px 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Service Package Request</h1>
          <p>A potential client has requested ${packageInfo.name}</p>
        </div>
        
        <div class="content">
          ${customerData.urgency === 'immediate' ? `
            <div class="section">
              <div class="urgent-alert">
                <strong>URGENT REQUEST</strong> - Customer needs immediate service within 1 week!
              </div>
            </div>
          ` : ''}
          
          <div class="section">
            <div class="package-highlight">
              <h2 style="margin: 0 0 10px 0; color: #1e40af;">${packageInfo.name}</h2>
              <p style="margin: 0 0 5px 0;"><strong>Price:</strong> ${packageInfo.price}</p>
              <p style="margin: 0;">${packageInfo.description}</p>
              ${packageInfo.popular ? '<div style="background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; display: inline-block; margin-top: 10px; font-weight: 600;">MOST POPULAR PACKAGE</div>' : ''}
            </div>
          </div>
          
          <div class="section">
            <h3>Contact Information</h3>
            <div class="info-grid">
              <div class="info-card priority-high">
                <div class="info-label">Contact Person</div>
                <div class="info-value">${customerData.contactPerson}</div>
              </div>
              <div class="info-card priority-high">
                <div class="info-label">Email Address</div>
                <div class="info-value"><a href="mailto:${customerData.email}">${customerData.email}</a></div>
              </div>
              <div class="info-card priority-high">
                <div class="info-label">Primary Phone</div>
                <div class="info-value"><a href="tel:${customerData.phone}">${customerData.phone}</a></div>
              </div>
              ${customerData.alternatePhone ? `
                <div class="info-card priority-medium">
                  <div class="info-label">Alternate Phone</div>
                  <div class="info-value"><a href="tel:${customerData.alternatePhone}">${customerData.alternatePhone}</a></div>
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="section">
            <h3>Business Information</h3>
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">Business Name</div>
                <div class="info-value">${customerData.businessName}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Business Type</div>
                <div class="info-value">${customerData.businessType || 'Not specified'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Industry</div>
                <div class="info-value">${customerData.industry || 'Not specified'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Location</div>
                <div class="info-value">${customerData.city || 'Not specified'}, ${customerData.province || 'Not specified'}</div>
              </div>
              ${customerData.employees ? `
                <div class="info-card">
                  <div class="info-label">Employees</div>
                  <div class="info-value">${customerData.employees}</div>
                </div>
              ` : ''}
              ${customerData.monthlyTurnover ? `
                <div class="info-card">
                  <div class="info-label">Monthly Turnover</div>
                  <div class="info-value">${customerData.monthlyTurnover}</div>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${(customerData.servicesNeeded && customerData.servicesNeeded.length > 0) ? `
            <div class="section">
              <h3>Services of Interest</h3>
              <div class="services-grid">
                ${customerData.servicesNeeded.map((service: string) => `<div class="service-tag">${service}</div>`).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="section">
            <h3>Lead Details</h3>
            <div class="info-grid">
              <div class="info-card priority-low">
                <div class="info-label">Submission Time</div>
                <div class="info-value">${submissionDate}</div>
              </div>
              <div class="info-card priority-low">
                <div class="info-label">Source</div>
                <div class="info-value">Website Checkout</div>
              </div>
              ${customerData.urgency ? `
                <div class="info-card ${customerData.urgency === 'immediate' ? 'priority-high' : 'priority-medium'}">
                  <div class="info-label">Urgency Level</div>
                  <div class="info-value">${customerData.urgency}</div>
                </div>
              ` : ''}
              ${customerData.preferredContactTime ? `
                <div class="info-card priority-medium">
                  <div class="info-label">Preferred Contact Time</div>
                  <div class="info-value">${customerData.preferredContactTime}</div>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${customerData.additionalRequirements ? `
            <div class="section">
              <h3>Additional Requirements</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #6b7280;">
                <p style="margin: 0;">${customerData.additionalRequirements}</p>
              </div>
            </div>
          ` : ''}
          
          <div class="cta-section">
            <h3 style="margin-bottom: 20px;">Quick Actions</h3>
            <a href="mailto:${customerData.email}?subject=Re: ${packageInfo.name} Inquiry" class="cta-button">Reply to Customer</a>
            <a href="tel:${customerData.phone}" class="cta-button" style="background: #059669;">Call Now</a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Action Required:</strong> Please follow up within 24 hours as promised to the customer.</p>
          <p>This lead was generated from the AlloB Consultants website checkout page.</p>
          <p>AlloB Consultants - Integrity and Innovation</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Customer confirmation email template
const generateCustomerConfirmationHTML = (data: CheckoutRequest): string => {
  const { package: packageInfo, customerData } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - AlloB Consultants</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .package-box { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #3b82f6; }
        .steps-container { background: #f0f9ff; padding: 25px; border-radius: 10px; margin: 20px 0; }
        .step { background: white; margin: 10px 0; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .step-number { background: #1e40af; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; }
        .contact-box { background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #10b981; margin: 20px 0; }
        .benefits-list { background: #fef7ff; padding: 20px; border-radius: 10px; border: 2px solid #a855f7; margin: 20px 0; }
        .footer { background: #1f2937; color: #d1d5db; padding: 25px; text-align: center; border-radius: 0 0 12px 12px; }
        @media (max-width: 600px) {
          .container { padding: 10px; }
          .header { padding: 30px 20px; }
          .content { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You, ${customerData.contactPerson}!</h1>
          <p>We've received your request for our ${packageInfo.name}</p>
        </div>
        
        <div class="content">
          <p>Dear ${customerData.contactPerson},</p>
          
          <p style="margin: 20px 0;">Thank you for choosing <strong>AlloB Consultants</strong> for your business needs. We're excited to help ${customerData.businessName} achieve its financial and strategic goals.</p>
          
          <div class="package-box">
            <h3 style="margin: 0 0 10px 0; color: #1e40af;">Your Selected Package</h3>
            <h4 style="margin: 0 0 5px 0;">${packageInfo.name} - ${packageInfo.price}</h4>
            <p style="margin: 0 0 15px 0;">${packageInfo.description}</p>
            ${packageInfo.popular ? '<div style="background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; display: inline-block; font-weight: 600;">MOST POPULAR CHOICE</div>' : ''}
            
            <div style="margin-top: 15px;">
              <h4 style="color: #374151; margin-bottom: 10px;">Included Services:</h4>
              <ul style="list-style: none; padding: 0;">
                ${packageInfo.features.map((feature: string) => `<li style="margin: 5px 0; padding-left: 20px; position: relative;"><span style="position: absolute; left: 0; color: #10b981;">✓</span>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="steps-container">
            <h3 style="margin-bottom: 20px; color: #1f2937; text-align: center;">What Happens Next?</h3>
            
            <div class="step">
              <span class="step-number">1</span>
              <div style="display: inline-block;">
                <strong>Personal Consultation (Within 24 hours)</strong><br>
                Our senior consultant will contact you to discuss your specific requirements and answer any questions.
              </div>
            </div>
            
            <div class="step">
              <span class="step-number">2</span>
              <div style="display: inline-block;">
                <strong>Custom Proposal & Pricing</strong><br>
                We'll prepare a detailed proposal tailored to ${customerData.businessName}'s unique needs and budget.
              </div>
            </div>
            
            <div class="step">
              <span class="step-number">3</span>
              <div style="display: inline-block;">
                <strong>Implementation Planning</strong><br>
                Once approved, we'll create a comprehensive timeline and plan for seamless service delivery.
              </div>
            </div>
            
            <div class="step">
              <span class="step-number">4</span>
              <div style="display: inline-block;">
                <strong>Onboarding & Support</strong><br>
                Smooth transition with dedicated support to ensure your business operations continue without disruption.
              </div>
            </div>
          </div>
          
          <div class="contact-box">
            <h3 style="margin: 0 0 15px 0; color: #065f46;">Need Immediate Assistance?</h3>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:+263771234567" style="color: #059669; text-decoration: none;">+263 77 123 4567</a></p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:info@allobconsultants.com" style="color: #059669; text-decoration: none;">info@allobconsultants.com</a></p>
            <p style="margin: 5px 0;"><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM (CAT)</p>
            <p style="margin: 15px 0 0 0; font-size: 14px; color: #065f46;">Our team is ready to assist you with any questions or concerns.</p>
          </div>
          
          <div class="benefits-list">
            <h3 style="margin: 0 0 15px 0; color: #7c2d12;">Why AlloB Consultants?</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 8px 0; padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #a855f7; font-size: 18px;">🏆</span><strong>8+ Years of Excellence</strong> - Proven track record in the industry</li>
              <li style="margin: 8px 0; padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #a855f7; font-size: 18px;">⚖️</span><strong>Regulatory Compliance</strong> - IFRS compliant financial reporting</li>
              <li style="margin: 8px 0; padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #a855f7; font-size: 18px;">💼</span><strong>Strategic Guidance</strong> - Business advisory beyond numbers</li>
              <li style="margin: 8px 0; padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #a855f7; font-size: 18px;">🤝</span><strong>Dedicated Support</strong> - Personal account management</li>
              <li style="margin: 8px 0; padding-left: 25px; position: relative;"><span style="position: absolute; left: 0; color: #a855f7; font-size: 18px;">🌍</span><strong>Local Expertise</strong> - Deep understanding of Zimbabwean market</li>
            </ul>
          </div>
          
          <p style="margin: 20px 0;">We look forward to partnering with ${customerData.businessName} and contributing to your continued success.</p>
          
          <p style="margin: 20px 0;">Best regards,<br><strong>The AlloB Consultants Team</strong><br><em>Integrity and Innovation</em></p>
        </div>
        
        <div class="footer">
          <p><strong>AlloB Consultants</strong></p>
          <p>Your Trusted Business Partner Since 2016</p>
          <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">This email was sent because you requested information about our services from our website.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Main email sending function
export async function sendEmails(checkoutData: CheckoutRequest): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    const { package: packageInfo, customerData } = checkoutData;
    
    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
    
    // Prepare email content
    const salesEmailHTML = generateSalesEmailHTML(checkoutData);
    const customerConfirmationHTML = generateCustomerConfirmationHTML(checkoutData);
    
    // Sales team email
    const salesEmailOptions: SendMailOptions = {
      from: {
        name: 'AlloB Website',
        address: process.env.FROM_EMAIL || 'noreply@allobconsultants.com'
      },
      to: process.env.SALES_EMAIL || 'sales@allobconsultants.com',
      cc: process.env.SALES_CC_EMAIL || 'info@allobconsultants.com',
      subject: `🎯 NEW ${packageInfo.name.toUpperCase()} REQUEST - ${customerData.businessName}`,
      html: salesEmailHTML,
      text: `NEW SERVICE PACKAGE REQUEST

Package: ${packageInfo.name} (${packageInfo.price})
Business: ${customerData.businessName}
Contact: ${customerData.contactPerson}
Email: ${customerData.email}
Phone: ${customerData.phone}
Industry: ${customerData.industry || 'Not specified'}
Location: ${customerData.city || 'Not specified'}, ${customerData.province || 'Not specified'}
Urgency: ${customerData.urgency || 'Not specified'}

Please follow up within 24 hours as promised to the customer.
      `,
      priority: customerData.urgency === 'immediate' ? 'high' : 'normal'
    };
    
    // Customer confirmation email
    const customerEmailOptions: SendMailOptions = {
      from: {
        name: 'AlloB Consultants',
        address: process.env.FROM_EMAIL || 'noreply@allobconsultants.com'
      },
      to: customerData.email,
      subject: `Thank you for your interest in our ${packageInfo.name} - AlloB Consultants`,
      html: customerConfirmationHTML,
      text: `Dear ${customerData.contactPerson},

Thank you for your interest in our ${packageInfo.name}!

We've received your request and our team will contact you within 24 hours to discuss your requirements and provide a customized proposal.

Your selected package: ${packageInfo.name} - ${packageInfo.price}
${packageInfo.description}

What happens next:
1. Personal consultation within 24 hours
2. Custom proposal preparation
3. Implementation planning
4. Onboarding and support

If you have any immediate questions, please contact us:
Phone: +263 77 123 4567
Email: info@allobconsultants.com

Best regards,
The AlloB Consultants Team
"Integrity and Innovation"
      `
    };
    
    // Send both emails concurrently
    const emailResults = await Promise.allSettled([
      transporter.sendMail(salesEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ]);
    
    const salesEmailSent = emailResults[0].status === 'fulfilled';
    const customerEmailSent = emailResults[1].status === 'fulfilled';
    
    // Log results
    if (salesEmailSent) {
      console.log('✅ Sales team notification sent successfully');
    } else {
      const error = emailResults[0].status === 'rejected' ? emailResults[0].reason : 'Unknown error';
      console.error('❌ Failed to send sales email:', error);
    }
    
    if (customerEmailSent) {
      console.log('✅ Customer confirmation sent successfully');
    } else {
      const error = emailResults[1].status === 'rejected' ? emailResults[1].reason : 'Unknown error';
      console.error('❌ Failed to send customer confirmation:', error);
    }
    
    return {
      salesEmailSent,
      customerEmailSent,
      error: !salesEmailSent ? 'Failed to send sales notification' : undefined
    };
    
  } catch (error) {
    console.error('💥 Email service error:', error);
    return {
      salesEmailSent: false,
      customerEmailSent: false,
      error: error instanceof Error ? error.message : 'Unknown email service error'
    };
  }
}

// Email verification function
export const verifyEmailService = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Mailtrap email service verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service verification failed:', error);
    return false;
  }
};