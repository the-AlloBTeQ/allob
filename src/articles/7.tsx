import { 
  Calculator, FileText, Globe, Users, TrendingDown, CheckCircle, AlertCircle, 
  ArrowLeft, Share2, Bookmark, Shield, Heart, AlertTriangle,
  UserCheck, Phone, Mail, ExternalLink, Clock, CreditCard, Building,
  HelpCircle, ChevronRight, Home, Baby, Briefcase, Calendar,
  Zap, Star, BookOpen, Scale
} from 'lucide-react';

const UIFCompliance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Articles
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <Shield className="w-4 h-4 mr-2" />
              Employee Protection & Compliance
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            UIF Compliance for SMEs: Your Moral and Legal Obligation to Protect Your Employees
          </h1>
          <div className="text-xl text-gray-600 mb-8">
            The human cost of non-compliance and why doing right by your employees matters
          </div>
          <div className="flex items-center text-sm text-gray-500 border-b border-gray-200 pb-8">
            <span>Published on July 28, 2025</span>
            <span className="mx-2">•</span>
            <span>18 min read</span>
          </div>
        </header>

        {/* The Harsh Reality */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3" />
              The Harsh Reality: When SMEs Fail Without UIF Coverage
            </h2>
            <p className="text-red-100 leading-relaxed mb-4">
              Every month in South Africa, small businesses close their doors. Economic downturns, client losses, system failures, or global crises like COVID-19 can devastate even the most promising enterprises. But there's a critical difference between businesses that fail responsibly and those that leave their employees devastated: <strong>UIF registration and compliance</strong>.
            </p>
            <p className="text-red-100 leading-relaxed">
              When your business struggles, your employees - the people who helped build your dream - shouldn't have to face financial ruin because you chose to ignore UIF obligations. Yet countless SME owners continue to view UIF as "unnecessary red tape" rather than what it truly is: <strong>a lifeline for the people who trust you with their livelihoods</strong>.
            </p>
          </div>
        </section>

        {/* Human Cost */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-600" />
            The Human Cost of Non-Compliance: Real Consequences for Real People
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Immediate Devastation */}
            <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Immediate Devastation
                </h3>
                <p className="text-red-100 text-sm mt-2">When employees can't access UIF benefits</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">No Income Replacement:</span>
                      <p className="text-gray-700 text-sm">UIF provides up to 60% of salary for up to 8 months - without it, families face immediate financial crisis</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Basic Needs Crisis:</span>
                      <p className="text-gray-700 text-sm">Inability to meet rent, food, children's school fees, medical care</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Desperate Acceptance:</span>
                      <p className="text-gray-700 text-sm">Forced to accept any work, regardless of skill level or fair compensation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Crushing Debt:</span>
                      <p className="text-gray-700 text-sm">Families forced into debt as they struggle without income support</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Long-term Destruction */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg overflow-hidden">
              <div className="bg-orange-600 text-white p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3" />
                  Long-term Destruction
                </h3>
                <p className="text-orange-100 text-sm mt-2">The lasting impact on families and communities</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Skills Deterioration:</span>
                      <p className="text-gray-700 text-sm">Extended unemployment periods lead to skill degradation and reduced employability</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Mental Health Crisis:</span>
                      <p className="text-gray-700 text-sm">Financial stress and loss of dignity create lasting psychological damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Educational Disruption:</span>
                      <p className="text-gray-700 text-sm">Children's education interrupted when school fees become unaffordable</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Asset Loss:</span>
                      <p className="text-gray-700 text-sm">Loss of homes, vehicles, and years of hard-earned possessions</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ripple Effect */}
          <div className="mt-8 bg-gray-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-blue-400" />
              The Ripple Effect You Create
            </h3>
            <p className="text-gray-300 mb-4">Your decision not to register for UIF doesn't just affect your employees - it devastates entire communities:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm"><strong>Local businesses</strong> lose customers when your former employees have no spending power</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm"><strong>Healthcare systems</strong> become overburdened when families can't afford private care</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm"><strong>Social services</strong> strain under increased demand for emergency assistance</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm"><strong>Society</strong> bears the cost of increased poverty, crime, and instability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legal and Moral Obligation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Scale className="w-8 h-8 mr-3 text-indigo-600" />
            Your Legal and Moral Obligation: Why UIF Compliance Matters
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Law is Clear */}
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-indigo-600" />
                The Law is Clear
              </h3>
              <p className="text-gray-700 mb-4">
                The Unemployment Insurance Act <strong>requires all employers</strong> with one or more employees to register for UIF. There are no exceptions for "small businesses" or "growing companies." If you employ people, you must comply. Period.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-3">Legal Consequences of Non-Compliance:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Criminal charges and potential imprisonment</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Substantial financial penalties and interest</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Personal liability for unpaid contributions</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Inability to tender for government contracts</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Permanent damage to business reputation</span>
                </li>
              </ul>
            </div>

            {/* The Moral Imperative */}
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-green-600" />
                The Moral Imperative
              </h3>
              <p className="text-gray-700 mb-4">
                Beyond legal requirements, UIF registration is fundamentally about <strong>human decency</strong>. When someone works for you, they're trusting you with their financial security. They're giving you their time, skills, and dedication.
              </p>
              
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Ask yourself:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <HelpCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Would you work for an employer who didn't provide UIF coverage?</span>
                  </li>
                  <li className="flex items-start">
                    <HelpCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">How would you feel if your employer's negligence left you with no safety net?</span>
                  </li>
                  <li className="flex items-start">
                    <HelpCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">What kind of business leader do you want to be remembered as?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* UIF Benefits Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            Understanding What UIF Provides Your Employees
          </h2>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <p className="text-gray-700 mb-6">UIF isn't just unemployment benefits. You're providing your employees with comprehensive protection:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Unemployment Benefits</h4>
                <p className="text-gray-700 text-sm">Up to 60% of salary for up to 8 months</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <Heart className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Illness Benefits</h4>
                <p className="text-gray-700 text-sm">Support during extended illness periods</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-pink-200">
                <Baby className="w-8 h-8 text-pink-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Maternity Benefits</h4>
                <p className="text-gray-700 text-sm">Financial support for new mothers</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <Home className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Adoption Benefits</h4>
                <p className="text-gray-700 text-sm">Support for growing families</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Dependants' Benefits</h4>
                <p className="text-gray-700 text-sm">Support for families of deceased contributors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <UserCheck className="w-8 h-8 mr-3 text-emerald-600" />
            UIF Registration: Your Step-by-Step Guide to Doing Right
          </h2>

          <div className="space-y-8">
            {/* Commercial Employers */}
            <div className="bg-white border border-emerald-200 rounded-lg overflow-hidden shadow">
              <div className="bg-emerald-600 text-white p-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Building className="w-6 h-6 mr-3" />
                  For Commercial Employers
                </h3>
                <p className="text-emerald-100 mt-2">Complete registration process for business entities</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">What You'll Need:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Owner/Partner/Director/Member's valid 13-digit SA ID or passport
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Email address for all UIF correspondence
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Company registration details (CK1 for CCs, CM1/CM3 for Pty Ltd)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Banking account details and valid branch code
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Each employee's valid 13-digit SA ID or passport
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        Detailed employment information for each employee
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Registration Steps:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</div>
                        <div>
                          <span className="font-medium text-gray-900">Visit Registration Portal</span>
                          <p className="text-gray-700 text-sm">Go to www.ufiling.co.za immediately</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</div>
                        <div>
                          <span className="font-medium text-gray-900">Begin Registration</span>
                          <p className="text-gray-700 text-sm">Click REGISTER and agree to terms and conditions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</div>
                        <div>
                          <span className="font-medium text-gray-900">Provide Details</span>
                          <p className="text-gray-700 text-sm">Complete all required company and personal information</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</div>
                        <div>
                          <span className="font-medium text-gray-900">Await Confirmation</span>
                          <p className="text-gray-700 text-sm">Wait for SMS/email with temporary password</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">5</div>
                        <div>
                          <span className="font-medium text-gray-900">Complete Setup</span>
                          <p className="text-gray-700 text-sm">Log in, change password, complete vetting process</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Obligations */}
            <div className="bg-white border border-blue-200 rounded-lg overflow-hidden shadow">
              <div className="bg-blue-600 text-white p-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Calculator className="w-6 h-6 mr-3" />
                  Understanding Your Financial Obligations
                </h3>
                <p className="text-blue-100 mt-2">Current UIF contribution rates and calculations</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Current UIF Contribution Rates (2024):</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-gray-900">Employee Contribution:</span>
                        <span className="text-blue-600 font-bold">1% of gross salary</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-gray-900">Employer Contribution:</span>
                        <span className="text-blue-600 font-bold">1% of gross salary</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-gray-900">Maximum Salary for UIF:</span>
                        <span className="text-blue-600 font-bold">R17,712 per month</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                        <span className="font-medium text-gray-900">Maximum Monthly Contribution:</span>
                        <span className="text-blue-600 font-bold">R354.24 total</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Real-World Example:</h4>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-medium text-gray-900 mb-3">Employee earning R12,000 per month:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Employee deduction:</span>
                          <span className="font-medium">R120 (1% of R12,000)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Your contribution:</span>
                          <span className="font-medium">R120 (1% of R12,000)</span>
                        </div>
                        <div className="border-t border-green-300 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">Total monthly cost:</span>
                            <span className="font-bold text-green-600">R240</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-green-700 text-sm mt-3 font-medium italic">
                        Can you honestly say that R240 per month isn't worth your employee's financial security?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-purple-600" />
            Monthly Declarations and Payments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Declaration */}
            <div className="bg-white border border-purple-200 rounded-lg overflow-hidden shadow">
              <div className="bg-purple-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Monthly Declaration
                </h3>
              </div>
              <div className="p-4">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
                    Access Menu → Declarations Manager
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
                    Select your employer profile
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
                    Click Edit/View for each employee
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">4</span>
                    Add/update employment information
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">5</span>
                    Save all declarations
                  </li>
                </ol>
              </div>
            </div>

            {/* Submission Process */}
            <div className="bg-white border border-blue-200 rounded-lg overflow-hidden shadow">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Submission Process
                </h3>
              </div>
              <div className="p-4">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
                    Menu → Declarations Manager
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
                    Select Employer → View Declarations
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
                    Calculate Declarations
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">4</span>
                    Select View on monthly grid
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">5</span>
                    <span><strong>Submit by 7th of following month</strong></span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Payment Process */}
            <div className="bg-white border border-green-200 rounded-lg overflow-hidden shadow">
              <div className="bg-green-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Process
                </h3>
              </div>
              <div className="p-4">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
                    Menu → Declarations Manager
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
                    Select Employer → View Declarations
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
                    Calculate Declarations
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">4</span>
                    Select View for applicable month
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">5</span>
                    Choose payment option (online recommended)
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Common Excuses */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-yellow-600" />
            Common Excuses and Why They Don't Hold Water
          </h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">"We're too small to worry about UIF"</h3>
                  <p className="text-gray-700"><strong>Reality Check:</strong> The law applies to ALL employers, regardless of size. Your "small" business failure can destroy multiple families.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">"It's too complicated"</h3>
                  <p className="text-gray-700"><strong>Reality Check:</strong> The process takes less time than writing a single business proposal. UIF support is available at ufilingsupport@labour.gov.za and 012 337 1680.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">"We can't afford the contributions"</h3>
                  <p className="text-gray-700"><strong>Reality Check:</strong> If you can't afford 1% of salaries for UIF, you can't afford to employ people responsibly. This is a basic cost of doing business ethically.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-gray-600 mr-3 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">"Our employees don't care about UIF"</h3>
                  <p className="text-gray-700"><strong>Reality Check:</strong> They will care deeply when they need it. By then, it will be too late.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of Compliance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-emerald-600" />
            Benefits of Immediate Compliance
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Your Employees */}
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-emerald-600" />
                For Your Employees
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Financial Security:</span>
                    <p className="text-gray-700 text-sm">Peace of mind knowing they're protected if the unexpected happens</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Increased Loyalty:</span>
                    <p className="text-gray-700 text-sm">Higher motivation when employees see you care about their wellbeing</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Improved Work-Life Balance:</span>
                    <p className="text-gray-700 text-sm">Reduced stress knowing they have a safety net</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Professional Respect:</span>
                    <p className="text-gray-700 text-sm">Recognition of you as a responsible, caring employer</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* For Your Business */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2 text-blue-600" />
                For Your Business
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Legal Protection:</span>
                    <p className="text-gray-700 text-sm">Full compliance with labor law requirements</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Enhanced Reputation:</span>
                    <p className="text-gray-700 text-sm">Recognition as a responsible employer in the market</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Easier Recruitment:</span>
                    <p className="text-gray-700 text-sm">Attract better candidates with proper benefits</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Government Access:</span>
                    <p className="text-gray-700 text-sm">Eligibility for government contracts and incentives</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900 to-green-900 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3" />
              Take Action Today: Your Employees Are Counting on You
            </h2>
            <p className="text-emerald-100 leading-relaxed mb-6">
              UIF registration isn't just about ticking a compliance box - it's about recognizing that the people who work for you are human beings with families, dreams, and financial responsibilities. They deserve better than empty promises and good intentions. They deserve the security that comes from knowing their employer cares enough to provide proper protection.
            </p>
            <div className="bg-emerald-800 p-6 rounded-lg mb-6">
              <p className="text-emerald-100 text-lg font-semibold mb-4">
                Don't be the employer who leaves devastated families in your wake when things go wrong. Be the employer who does right by their people, even when times are tough.
              </p>
              <p className="text-emerald-100 text-xl font-bold">
                Register for UIF today. Your employees - and your conscience - depend on it.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
            Getting Started Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-indigo-200 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-4">UIF Registration & Support</h3>
              <div className="space-y-3">
                <a href="https://www.ufiling.co.za" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  UIF Registration Portal
                </a>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  ufilingsupport@labour.gov.za
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  012 337 1680 (Call Centre)
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  adminchangerequest@labour.gov.za (Account Issues)
                </div>
              </div>
            </div>

            <div className="bg-white border border-emerald-200 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-4">Professional Assistance</h3>
              <p className="text-gray-700 mb-4">
                For professional UIF compliance assistance and comprehensive employment law guidance:
              </p>
              <div className="flex items-center text-emerald-600 hover:text-emerald-800">
                <Mail className="w-4 h-4 mr-2" />
                tax@allob.co.za
              </div>
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section className="mb-12">
          <div className="bg-gray-100 border-l-4 border-red-500 p-6 rounded-lg">
            <p className="text-gray-700 text-lg font-semibold text-center">
              <strong>Remember: Good intentions don't pay the bills when your employees need help. Only proper UIF registration does.</strong>
            </p>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Published by AlloB Consultants Employment Law Team
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default UIFCompliance;