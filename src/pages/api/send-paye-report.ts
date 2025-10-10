// pages/api/send-paye-report.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Types
interface PayeReportData {
  userInfo: {
    email: string;
    calculationDate: string;
    taxYear: number;
    age: number;
  };
  inputData: {
    employers: Array<{
      name: string;
      income: { amount: number; frequency: string };
      pensionContribution: { amount: number; frequency: string };
      hasDeductibleExpenses: boolean;
      deductibleExpenses?: { amount: number; frequency: string };
    }>;
    workingConditions: {
      worksFromHome: boolean;
      hasDedicatedWorkspace: boolean;
      hasVariableTravelAllowance: boolean;
    };
    actualPAYE: number;
    payeFrequency: string;
  };
  results: {
    grossIncome: number;
    deductions: {
      total: number;
      pensionContributions: number;
      businessExpenses: number;
    };
    taxableIncome: number;
    taxExpense: number;
    primaryRebate: number;
    taxLiability: number;
    monthlyPAYE: number;
    warnings: string[];
  };
}

interface ApiRequest extends NextApiRequest {
  body: {
    to: string;
    reportData: PayeReportData;
  };
}

// Rate limiting with simple in-memory store (for serverless)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const key = ip;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

// Input validation
function validateInput(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.to || !data.to.includes('@')) {
    errors.push('Valid email address required');
  }

  if (!data.reportData) {
    errors.push('Report data is required');
  }

  if (!data.reportData?.userInfo?.email || !data.reportData.userInfo.email.includes('@')) {
    errors.push('Valid user email required');
  }

  if (!data.reportData?.userInfo?.taxYear || data.reportData.userInfo.taxYear < 2020 || data.reportData.userInfo.taxYear > 2030) {
    errors.push('Valid tax year required');
  }

  if (!data.reportData?.userInfo?.age || data.reportData.userInfo.age < 18 || data.reportData.userInfo.age > 100) {
    errors.push('Valid age required');
  }

  if (!data.reportData?.inputData?.employers || !Array.isArray(data.reportData.inputData.employers) || data.reportData.inputData.employers.length === 0) {
    errors.push('At least one employer required');
  }

  if (!data.reportData?.results) {
    errors.push('Tax calculation results required');
  }

  return { valid: errors.length === 0, errors };
}

// Email template generator
function generateEmailTemplate(reportData: PayeReportData): string {
  const { userInfo, inputData, results } = reportData;
  
  const reportDate = new Date(userInfo.calculationDate).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate comparison if actualPAYE is provided
  let comparison = null;
  if (inputData.actualPAYE > 0) {
    const frequencyMultipliers: Record<string, number> = {
      'once-off': 1,
      'weekly': 52,
      'monthly': 12,
      'annual': 1
    };
    
    const calculatedTax = results.taxLiability;
    const actualPaid = inputData.actualPAYE * (frequencyMultipliers[inputData.payeFrequency] || 12);
    const difference = Math.abs(calculatedTax - actualPaid);
    
    let status: string;
    let recommendations: string[] = [];
    
    if (calculatedTax > actualPaid + 1000) {
      status = 'underpaid';
      recommendations = [
        `Make additional voluntary PAYE payments of ${formatCurrency(difference)} annually`,
        `Break this down to ${formatCurrency(difference / 12)} monthly additional payments`,
        'Make payments through eFiling or your bank',
        'Keep records of additional payments for your tax return'
      ];
    } else if (actualPaid > calculatedTax + 1000) {
      status = 'overpaid';
      recommendations = [
        `You may receive a refund of approximately ${formatCurrency(difference)} when filing`,
        'Ensure all supporting documents are ready for your tax return',
        'Consider adjusting your PAYE for the remainder of the tax year'
      ];
    } else {
      status = 'accurate';
      recommendations = [
        'Your PAYE payments are well-aligned with your tax liability',
        'Continue with your current payment structure'
      ];
    }
    
    comparison = { calculatedTax, actualPaid, difference, status, recommendations };
  }

  const monthlyTakeHome = (results.grossIncome / 12) - 
    Math.min((results.grossIncome / 12) * 0.01, 177.12) - 
    (results.deductions.pensionContributions / 12) - 
    (results.deductions.businessExpenses / 12) - 
    results.monthlyPAYE;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PAYE Tax Calculator Report - ${userInfo.taxYear}</title>
      <style>
          body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 20px;
              background-color: #f8fafc;
          }
          .container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          .header { 
              background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
          }
          .header h1 { 
              margin: 0 0 10px 0; 
              font-size: 2.5em; 
              font-weight: 700;
          }
          .header p { 
              margin: 5px 0; 
              opacity: 0.9; 
              font-size: 1.1em;
          }
          .content { padding: 30px; }
          .section { 
              margin-bottom: 30px; 
              padding: 25px;
              background: #f8fafc;
              border-radius: 12px; 
              border-left: 4px solid #3b82f6;
          }
          .section h2 { 
              color: #1e40af; 
              margin-top: 0; 
              font-size: 1.4em;
              font-weight: 600;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 10px;
          }
          .grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
              gap: 15px; 
              margin-bottom: 20px;
          }
          .metric { 
              background: white; 
              padding: 15px; 
              border-radius: 8px; 
              border-left: 4px solid #10b981;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          .metric.warning { border-left-color: #f59e0b; }
          .metric.danger { border-left-color: #ef4444; }
          .metric-label { 
              font-size: 0.9em; 
              color: #6b7280; 
              margin-bottom: 5px;
              font-weight: 500;
          }
          .metric-value { 
              font-size: 1.3em; 
              font-weight: 700; 
              color: #111827;
          }
          .employer { 
              background: white; 
              padding: 15px; 
              margin-bottom: 15px; 
              border-radius: 8px;
              border: 1px solid #e5e7eb;
          }
          .employer h4 { 
              margin: 0 0 10px 0; 
              color: #374151;
              font-weight: 600;
          }
          .comparison { 
              padding: 25px; 
              border-radius: 10px; 
              margin-bottom: 20px;
          }
          .comparison.underpaid { 
              background: #fef2f2; 
              border: 2px solid #fecaca; 
          }
          .comparison.overpaid { 
              background: #f0fdf4; 
              border: 2px solid #bbf7d0; 
          }
          .comparison.accurate { 
              background: #eff6ff; 
              border: 2px solid #bfdbfe; 
          }
          .recommendations { 
              background: white; 
              padding: 20px; 
              border-radius: 8px; 
              margin-top: 15px;
          }
          .recommendations ul { 
              margin: 0; 
              padding-left: 20px;
          }
          .recommendations li { 
              margin-bottom: 8px; 
              color: #374151;
          }
          .footer { 
              background: #374151; 
              color: white; 
              padding: 30px; 
              text-align: center;
          }
          .footer h3 { 
              margin-top: 0; 
              color: #10b981;
          }
          .disclaimer { 
              background: #fef3c7; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0; 
              border: 1px solid #f59e0b;
          }
          .disclaimer h4 { 
              color: #92400e; 
              margin-top: 0;
          }
          .disclaimer p { 
              color: #92400e; 
              font-size: 0.9em; 
              margin-bottom: 0;
          }
          @media (max-width: 768px) {
              .grid { grid-template-columns: 1fr; }
              body { padding: 10px; }
              .content { padding: 20px; }
              .section { padding: 20px; }
              .header { padding: 30px 20px; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>PAYE Tax Calculator Report</h1>
              <p>Generated on ${reportDate} | Tax Year ${userInfo.taxYear}</p>
              <p><strong>AlloB Consultants</strong> - Integrity and Innovation</p>
          </div>

          <div class="content">
              <!-- Personal Information -->
              <div class="section">
                  <h2>Personal Information</h2>
                  <div class="grid">
                      <div class="metric">
                          <div class="metric-label">Tax Year</div>
                          <div class="metric-value">${userInfo.taxYear}</div>
                      </div>
                      <div class="metric">
                          <div class="metric-label">Age</div>
                          <div class="metric-value">${userInfo.age} years</div>
                      </div>
                  </div>
              </div>

              <!-- Employment Information -->
              <div class="section">
                  <h2>Employment Information</h2>
                  ${inputData.employers.map((employer, index) => `
                      <div class="employer">
                          <h4>${employer.name || `Employer ${index + 1}`}</h4>
                          <p><strong>Income:</strong> ${formatCurrency(employer.income.amount)} (${employer.income.frequency})</p>
                          <p><strong>Pension:</strong> ${formatCurrency(employer.pensionContribution.amount)} (${employer.pensionContribution.frequency})</p>
                          <p><strong>Deductible Expenses:</strong> ${employer.hasDeductibleExpenses ? 
                              `${formatCurrency(employer.deductibleExpenses?.amount || 0)} (${employer.deductibleExpenses?.frequency || 'monthly'})` : 
                              'None'}</p>
                      </div>
                  `).join('')}

                  <h3>Working Conditions</h3>
                  <ul>
                      <li>Works From Home: ${inputData.workingConditions.worksFromHome ? 'Yes' : 'No'}</li>
                      <li>Has Dedicated Workspace: ${inputData.workingConditions.hasDedicatedWorkspace ? 'Yes' : 'No'}</li>
                      <li>Variable Travel Allowance: ${inputData.workingConditions.hasVariableTravelAllowance ? 'Yes' : 'No'}</li>
                  </ul>
              </div>

              <!-- Tax Calculation Results -->
              <div class="section">
                  <h2>Tax Calculation Results</h2>
                  <div class="grid">
                      <div class="metric">
                          <div class="metric-label">Annual Gross Income</div>
                          <div class="metric-value">${formatCurrency(results.grossIncome)}</div>
                      </div>
                      <div class="metric">
                          <div class="metric-label">Total Deductions</div>
                          <div class="metric-value">${formatCurrency(results.deductions.total)}</div>
                      </div>
                      <div class="metric">
                          <div class="metric-label">Taxable Income</div>
                          <div class="metric-value">${formatCurrency(results.taxableIncome)}</div>
                      </div>
                      <div class="metric danger">
                          <div class="metric-label">Final Tax Liability</div>
                          <div class="metric-value">${formatCurrency(results.taxLiability)}</div>
                      </div>
                      <div class="metric warning">
                          <div class="metric-label">Monthly PAYE Required</div>
                          <div class="metric-value">${formatCurrency(results.monthlyPAYE)}</div>
                      </div>
                      <div class="metric">
                          <div class="metric-label">Estimated Monthly Take Home</div>
                          <div class="metric-value">${formatCurrency(monthlyTakeHome)}</div>
                      </div>
                  </div>
              </div>

              ${comparison ? `
              <!-- PAYE Comparison Analysis -->
              <div class="section">
                  <h2>PAYE Comparison Analysis</h2>
                  <div class="comparison ${comparison.status}">
                      <h3>${comparison.status === 'underpaid' ? 'Action Required - Underpayment Detected' : 
                             comparison.status === 'overpaid' ? 'Well Done - Overpayment Detected' : 
                             'Perfect - Accurate Payments'}</h3>
                      
                      <div class="grid">
                          <div class="metric">
                              <div class="metric-label">Calculated Annual Tax</div>
                              <div class="metric-value">${formatCurrency(comparison.calculatedTax)}</div>
                          </div>
                          <div class="metric">
                              <div class="metric-label">Your Actual PAYE (Annualized)</div>
                              <div class="metric-value">${formatCurrency(comparison.actualPaid)}</div>
                          </div>
                          <div class="metric ${comparison.status === 'underpaid' ? 'danger' : ''}">
                              <div class="metric-label">Difference</div>
                              <div class="metric-value">${formatCurrency(comparison.difference)}</div>
                          </div>
                      </div>

                      <div class="recommendations">
                          <h4>Recommendations & Next Steps</h4>
                          <ul>
                              ${comparison.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                          </ul>
                      </div>
                  </div>
              </div>
              ` : ''}

              ${results.warnings.length > 0 ? `
              <div class="section">
                  <h2>Important Notes & Warnings</h2>
                  <ul>
                      ${results.warnings.map(warning => `<li style="color: #dc2626; font-weight: 500;">${warning}</li>`).join('')}
                  </ul>
              </div>
              ` : ''}

              ${inputData.workingConditions.worksFromHome ? `
              <div class="section">
                  <h2>Working From Home Documentation Guide</h2>
                  <ul>
                      <li>Prepare proof of your home office setup (photos, layout, measurements)</li>
                      <li>Keep records of qualifying expenses (rent, utilities, internet, cleaning)</li>
                      <li>Ensure workspace is used exclusively for work purposes</li>
                      <li>Retain supporting invoices and payment confirmations</li>
                      <li>SARS may request these documents during assessment</li>
                  </ul>
              </div>
              ` : ''}

              ${inputData.workingConditions.hasVariableTravelAllowance ? `
              <div class="section">
                  <h2>Travel Allowance Optimization</h2>
                  <p>For maximum travel allowance claims, contact <strong>itax@allob.co.za</strong> for professional logbook preparation assistance.</p>
              </div>
              ` : ''}

              <div class="disclaimer">
                  <h4>Important Disclaimer</h4>
                  <p>
                      This calculation is for estimation purposes only and is based on current tax tables and the information provided. 
                      Actual tax liabilities may vary based on additional factors not captured in this calculator. 
                      For comprehensive tax planning and advice, consult with a qualified tax professional.
                      AlloB Consultants accepts no responsibility for any tax implications arising from the use of this calculator.
                  </p>
              </div>
          </div>

          <div class="footer">
              <h3>Need Professional Tax Assistance?</h3>
              <p>
                  <strong>AlloB Consultants</strong><br>
                  Integrity and Innovation in Tax Services<br><br>
                  Email: itax@allob.co.za<br>
                  Phone: +27 67 921 1947<br><br>
                  <em>Your trusted partner for comprehensive tax planning and compliance</em>
              </p>
          </div>
      </div>
  </body>
  </html>`;
}

// Main API handler
export default async function handler(req: ApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] as string || 
                     req.headers['x-real-ip'] as string || 
                     req.connection.remoteAddress || 
                     'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      const resetTimeMinutes = Math.ceil((rateLimit.resetTime! - Date.now()) / 60000);
      return res.status(429).json({
        success: false,
        error: `Too many requests. Try again in ${resetTimeMinutes} minutes.`
      });
    }

    // Validate input
    const validation = validateInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.errors
      });
    }

    // Check environment variables
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured'
      });
    }

    const { to, reportData } = req.body;

    // Generate email content
    const htmlContent = generateEmailTemplate(reportData);
    const subject = `PAYE Tax Calculator Report - ${reportData.userInfo.taxYear}`;

    // Prepare email message
    const msg = {
      to: to,
      from: {
        email: process.env.FROM_EMAIL || 'itax@allob.co.za',
        name: 'AlloB Consultants'
      },
      replyTo: 'itax@allob.co.za',
      subject: subject,
      html: htmlContent,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Log successful send
    console.log(`PAYE report sent successfully to ${to}`, {
      timestamp: new Date().toISOString(),
      taxYear: reportData.userInfo.taxYear,
      grossIncome: reportData.results.grossIncome,
      taxLiability: reportData.results.taxLiability,
      clientIp: clientIp
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Report sent successfully'
    });

  } catch (error: any) {
    console.error('Email sending error:', error);
    
    // Handle specific SendGrid errors
    let errorMessage = 'Failed to send email';
    let statusCode = 500;
    
    if (error.response?.body?.errors?.[0]) {
      errorMessage = error.response.body.errors[0].message;
      if (error.code === 400) statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
}