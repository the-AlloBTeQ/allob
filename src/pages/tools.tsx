
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Users, CheckCircle, Phone, Mail, Star, Zap, Shield, BarChart3, CreditCard } from 'lucide-react';

const ToolsPage = () => {
  const payeFeatures = [
    "Calculate accurate PAYE across multiple income sources",
    "Age-based tax rebates (65+ and 75+ considerations)",
    "Pension contribution optimization (27.5% rule)",
    "Business expense deductions and carry-forwards",
    "PAYE comparison with actionable recommendations",
    "Monthly take-home pay calculations",
    "2025 tax year compliance"
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             

            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+27 67 921 1947</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@allob.co.za</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Digital Tools Hub
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Innovative digital solutions designed to simplify your financial life. 
              From tax calculations to comprehensive business management - we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-blue-800 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>SARS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-800 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span>Real-time Calculations</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-800 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>Professional Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Digital Solutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional-grade tools backed by years of accounting expertise and innovative technology.
          </p>
        </div>

        {/* PAYE Calculator */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Calculator className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">My PAYE Calculator</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">Matches industry leaders</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                  South Africa's most accurate PAYE calculator. Eliminate year-end tax surprises with 
                  our innovative multi-income tax planning tool. Built for the 2025 tax year with 
                  professional-grade accuracy.
                </p>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {payeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/TaxCalculator" className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                        <Calculator className="w-5 h-5" />
                        <span>Try PAYE Calculator</span>
                    </Link>

                </div>
              </div>

              {/* Visual/Stats */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 lg:p-12 flex items-center">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                      <div className="text-sm text-gray-600">SARS Accuracy</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-2">2025</div>
                      <div className="text-sm text-gray-600">Tax Year Ready</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-2">Multi</div>
                      <div className="text-sm text-gray-600">Income Sources</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-2">Free</div>
                      <div className="text-sm text-gray-600">To Use</div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="bg-green-600 text-white p-4 rounded-lg">
                      <div className="text-lg font-semibold">Problem Solved!</div>
                      <div className="text-sm mt-1">No more year-end tax liability surprises</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FynancKit */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Visual/Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-100 p-8 lg:p-12 flex items-center lg:order-1">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        <CreditCard className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="text-sm text-gray-600">Professional Invoices</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        <BarChart3 className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="text-sm text-gray-600">Smart Payslips</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        <Users className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="text-sm text-gray-600">Legal Agreements</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        <Zap className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="text-sm text-gray-600">Early Access</div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg">
                      <div className="text-lg font-semibold">Building the Future</div>
                      <div className="text-sm mt-1">Full Accounting ERP + Payroll + Contract Management</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">FynancKit</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">IN DEVELOPMENT</span>
                      <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">EARLY ACCESS</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900">🚀 Building Business Solution by Business Owners!</h4>
                      <p className="text-orange-800 text-sm mt-1">
                        We're crafting the solution professionals have been waiting for - join our early access community!
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                  The future of business management is coming! Professional invoices, payslips & agreements 
                  that make you an established business. 
                </p>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Coming Soon:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Professional Invoice Generator with VAT compliance</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Smart Payslip Generator with SARS EMP201/EMP501 compliance</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Legal Agreements & E-Sign workflows</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Full Accounting ERP system (Future)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Complete Payroll management (Future)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Contract drafting & management (Future)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://www.fynanckit.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Star className="w-5 h-5" />
                    <span>Join Early Access</span>
                  </a>
                  <a 
                    href="https://www.fynanckit.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Preview Tools</span>
                  </a>
                </div>

                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Early bird pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Building the Complete Financial Ecosystem</h3>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            We're creating an integrated ecosystem that starts with personal tax planning and evolves into 
            comprehensive business management. From accurate PAYE calculations today to full ERP capabilities tomorrow - 
            join us on this exciting journey!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Personal Tax Planning</h4>
              <p className="text-gray-600 text-sm">Live now - Start with accurate PAYE calculations</p>
              <div className="mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">✅ LIVE</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Business Management</h4>
              <p className="text-gray-600 text-sm">Professional invoices, payslips & agreements</p>
              <div className="mt-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">🚀 BUILDING</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Full ERP Suite</h4>
              <p className="text-gray-600 text-sm">Complete accounting, payroll & contract management</p>
              <div className="mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">🔮 FUTURE</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 text-white p-6 rounded-xl mb-6">
            <h4 className="text-lg font-bold mb-2">🎯 The Vision</h4>
            <p className="text-sm">
              From individual tax calculations to full business management - one integrated platform, 
              built by South African professionals, for South African businesses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/TaxCalculator" >
            <button className="bg-green-600 text-white py-4 px-8 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Try PAYE Calculator</span>
            </button>
            </Link>
            <a 
              href="https://www.fynanckit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-purple-600 text-white py-4 px-8 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>Join FynancKit Early Access</span>
            </a>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ToolsPage;