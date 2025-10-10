
import { Calculator, FileText, Globe, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const TaxAmendments:React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Understanding the New Tax Amendments for 2025
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A Comprehensive view for South African Businesses
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700">
            The 2025 tax season brings significant changes that every South African business needs to understand. 
            As your trusted accounting and tax advisory partner, AlloB Consultants breaks down the key 
            amendments affecting your business with practical examples and real-world applications.
          </p>
        </div>
      </div>

      {/* Key Changes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="mr-3 text-blue-600" />
          Key Changes for 2025
        </h2>

        {/* Auto Assessment */}
        <div className="mb-10 border-l-4 border-blue-500 pl-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calculator className="mr-2 text-blue-600" />
            1. Auto Assessment for Provisional Taxpayers
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">What it means:</p>
            <p className="text-gray-700">
              SARS has introduced auto assessment for eligible provisional taxpayers, automatically calculating 
              your tax liability based on submitted information.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
            <h4 className="font-semibold text-green-800 mb-3">Practical Example:</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Before 2025:</strong> Jane's consulting business submitted provisional tax returns, then waited for SARS assessment and potential queries.</p>
              
              <p><strong>With 2025 Auto Assessment:</strong> Jane submits her provisional return on 31 August 2024. SARS automatically processes it within 21 days, calculating her liability based on:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Submitted income: R850,000</li>
                <li>Allowable deductions: R125,000</li>
                <li>Estimated tax: R145,000</li>
                <li>Auto-calculated liability: R130,250</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Benefits:</h4>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>Reduced processing time from 6-8 weeks to 2-3 weeks</li>
              <li>Fewer manual queries and correspondence</li>
              <li>Immediate clarity on payment obligations</li>
            </ul>
          </div>
        </div>

        {/* Foreign Tax Credits */}
        <div className="mb-10 border-l-4 border-green-500 pl-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="mr-2 text-green-600" />
            2. Foreign Tax Credits Enhancement - Section 6quat
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">What Section 6quat does:</p>
            <p className="text-gray-700">
              This section allows South African tax residents to claim credits for foreign taxes paid, 
              preventing double taxation on the same income.
            </p>
            <p className="font-semibold text-gray-800 mt-3 mb-2">The 2025 Enhancement:</p>
            <p className="text-gray-700">
              Strengthened provisions make it easier to utilize foreign tax credits effectively, 
              particularly for businesses with international operations.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-800 mb-3">Detailed Example:</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Company:</strong> TechCorp SA (South African company)</p>
              <p><strong>Scenario:</strong> Receives dividends from US subsidiary</p>
              
              <div className="bg-white p-4 rounded mt-4">
                <h5 className="font-semibold mb-2">2025 Enhancement Benefits:</h5>
                <div className="font-mono text-xs space-y-1">
                  <p>US Dividend Income: $100,000 (R1,700,000 at R17/$)</p>
                  <p>US Withholding Tax: $15,000 (R255,000)</p>
                  <p>SA Tax Before Credit: R255,000 (15% on R1,700,000)</p>
                  <p>Enhanced Section 6quat Credit: R255,000 (full credit now more easily claimable)</p>
                  <p className="font-bold">Net SA Tax Payable: R0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Codes */}
        <div className="mb-10 border-l-4 border-purple-500 pl-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="mr-2 text-purple-600" />
            3. New Source Codes for Enhanced Reporting
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">What Source Codes Are:</p>
            <p className="text-gray-700">
              Unique identifiers SARS uses to track different types of income and payments for accurate tax processing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Source Codes 3623 and 3673</h4>
              <p className="text-sm text-gray-700 mb-2">Backdated Payments</p>
              <ul className="text-xs space-y-1">
                <li><strong>3623:</strong> Backdated salary payments</li>
                <li><strong>3673:</strong> Backdated pension payments</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Source Codes 4306 and 4307</h4>
              <p className="text-sm text-gray-700 mb-2">Dividend Reporting</p>
              <ul className="text-xs space-y-1">
                <li><strong>4306:</strong> Local dividends</li>
                <li><strong>4307:</strong> Foreign dividends</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h4 className="font-semibold text-indigo-800 mb-3">Practical Scenario - Backdated Payments:</h4>
            <div className="text-sm space-y-2">
              <p><strong>Employee:</strong> Marcus, promoted in January 2024 with salary increase backdated to October 2023</p>
              
              <div className="bg-white p-4 rounded mt-3">
                <h5 className="font-semibold mb-2">Reporting Requirements:</h5>
                <div className="font-mono text-xs space-y-1">
                  <p>Current Salary (Jan-Dec 2024): R45,000/month</p>
                  <p>Backdated Increase: R5,000/month for Oct-Dec 2023</p>
                  <p>Total Backdated Amount: R15,000</p>
                  <p className="mt-2 font-bold">Employer Must Report:</p>
                  <p>- Regular 2024 salary under normal source codes</p>
                  <p>- R15,000 backdated portion under Source Code 3623</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* R&D Sections */}
        <div className="mb-10 border-l-4 border-orange-500 pl-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="mr-2 text-orange-600" />
            4. Enhanced Reporting - Sections 11(nA) and 11(nB)
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">What These Sections Cover:</p>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li><strong>Section 11(nA):</strong> Deductions for expenditure on research and development</li>
              <li><strong>Section 11(nB):</strong> Additional deductions for qualifying R&D expenditure</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="font-semibold text-orange-800 mb-3">Manufacturing Company Example:</h4>
            <div className="text-sm space-y-2">
              <p><strong>Company:</strong> AutoParts SA</p>
              <p><strong>R&D Project:</strong> Developing electric vehicle components</p>
              
              <div className="bg-white p-4 rounded mt-3">
                <h5 className="font-semibold mb-2">Section 11(nA) Deduction Calculation:</h5>
                <div className="font-mono text-xs space-y-1">
                  <p>Qualifying R&D Expenditure:</p>
                  <p>- Salaries (R&D team): R2,400,000</p>
                  <p>- Equipment depreciation: R850,000</p>
                  <p>- Materials and supplies: R650,000</p>
                  <p>- Contracted research: R400,000</p>
                  <p>Total Qualifying: R4,300,000</p>
                  <p className="mt-2"></p>
                  <p>Section 11(nA) Deduction: R4,300,000 (100%)</p>
                  <p>Section 11(nB) Additional: R1,505,000 (35% additional)</p>
                  <p className="font-bold">Total R&D Deduction: R5,805,000</p>
                  <p className="font-bold text-green-600">Tax Saving (at 27%): R1,567,350</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learnership Extensions */}
        <div className="mb-10 border-l-4 border-red-500 pl-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="mr-2 text-red-600" />
            5. Learnership Agreement Extensions - Section 12H
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">What Section 12H Provides:</p>
            <p className="text-gray-700 mb-2">
              Tax deductions for businesses implementing learnership agreements with SETA-approved training programs.
            </p>
            <p className="font-semibold text-gray-800 mb-2">2025 Extension:</p>
            <p className="text-gray-700">
              Agreements now extended to 31 March 2027, providing continued tax benefits.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="font-semibold text-red-800 mb-3">Construction Company Example:</h4>
            <div className="text-sm space-y-2">
              <p><strong>Company:</strong> BuildRight Construction</p>
              <p><strong>Training Initiative:</strong> Artisan development program</p>
              
              <div className="bg-white p-4 rounded mt-3">
                <h5 className="font-semibold mb-2">Financial Impact Calculation:</h5>
                <div className="font-mono text-xs space-y-1">
                  <p>Learnership Costs (2024-2027):</p>
                  <p>- Learner allowances: R150,000/year × 20 learners = R3,000,000/year</p>
                  <p>- Training provider fees: R50,000/year × 20 learners = R1,000,000/year</p>
                  <p>- Internal training costs: R500,000/year</p>
                  <p>Total Annual Cost: R4,500,000</p>
                  <p className="mt-2"></p>
                  <p>Section 12H Deduction (100%): R4,500,000</p>
                  <p>Normal Business Deduction: R4,500,000</p>
                  <p>Additional Deduction Benefit: R4,500,000</p>
                  <p className="font-bold text-green-600">Tax Benefit (at 27%): R1,215,000/year</p>
                  <p className="font-bold text-green-600">Four-year Total Benefit: R4,860,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <AlertCircle className="mr-3 text-yellow-600" />
          Strategic Implementation for Your Business
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3">Immediate Action Steps</h3>
            <div className="text-sm space-y-2">
              <p><strong>System Updates (By 28 Feb 2025):</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Update payroll systems for new source codes</li>
                <li>Implement enhanced R&D tracking</li>
                <li>Review foreign tax credit procedures</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-3">Process Reviews</h3>
            <div className="text-sm space-y-2">
              <p><strong>By 31 March 2025:</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Assess auto assessment eligibility</li>
                <li>Document learnership agreement benefits</li>
                <li>Establish enhanced reporting protocols</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-3">Training Requirements</h3>
            <div className="text-sm space-y-1">
              <ul className="list-disc ml-4 space-y-1">
                <li>Finance team briefing on new requirements</li>
                <li>Payroll administrator certification</li>
                <li>R&D documentation procedures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center">
            
            Example: Medium Manufacturing Business Annual Benefits
          </h3>
          <div className="font-mono text-sm space-y-1">
            <p>Enhanced Foreign Credits: R180,000</p>
            <p>Additional R&D Deductions: R250,000</p>
            <p>Learnership Benefits: R320,000</p>
            <p>Auto Assessment Efficiency: R15,000 (reduced professional fees)</p>
            <p className="font-bold text-green-700 text-lg">Total Annual Benefit: R765,000</p>
          </div>
        </div>
      </section>

      {/* AlloB Polompa Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          AlloB Polompa's Specialized Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Compliance Implementation</h3>
            <ul className="list-disc ml-4 text-sm space-y-1">
              <li>System configuration for new source codes</li>
              <li>Foreign tax credit optimization reviews</li>
              <li>R&D expenditure classification and tracking</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3">Strategic Planning</h3>
            <ul className="list-disc ml-4 text-sm space-y-1">
              <li>Auto assessment eligibility evaluation</li>
              <li>Learnership program design and implementation</li>
              <li>International tax structure optimization</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 mb-3">Ongoing Support</h3>
            <ul className="list-disc ml-4 text-sm space-y-1">
              <li>Quarterly compliance reviews</li>
              <li>SARS liaison and query resolution</li>
              <li>Performance monitoring and reporting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p className="mb-4">
          The 2025 tax amendments present both opportunities and obligations. Early preparation ensures 
          compliance while maximizing available benefits. These changes reflect SARS's modernization 
          efforts and provide genuine value for businesses that adapt proactively.
        </p>
        
        <div className="bg-blue-800 p-6 rounded-lg mt-6">
          <h3 className="font-semibold mb-3">Next Steps:</h3>
          <p className="mb-3">Schedule a consultation with our tax specialists to:</p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Assess your specific amendment impacts</li>
            <li>Develop implementation timelines</li>
            <li>Identify optimization opportunities</li>
            <li>Ensure seamless 2025 compliance</li>
          </ol>
          <p className="mt-4 font-semibold">
            The investment in proper planning today generates measurable returns throughout 2025 and beyond.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TaxAmendments;