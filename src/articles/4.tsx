
import { Calculator, FileText, Globe, Users, TrendingUp, CheckCircle, AlertCircle, DollarSign, ArrowLeft, Share2, Bookmark } from 'lucide-react';

const ManufacturingArticle = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <TrendingUp className="w-4 h-4 mr-2" />
              Economic Analysis
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Manufacturing Sector Recovery - Post-Pandemic Strategic Positioning
          </h1>
          <div className="text-xl text-gray-600 mb-8">
            Building Resilience in South Africa's Manufacturing Renaissance
          </div>
          <div className="flex items-center text-sm text-gray-500 border-b border-gray-200 pb-8">
            <span>Published on July 28, 2025</span>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            South Africa's manufacturing sector shows encouraging recovery signs post-pandemic. Companies must understand evolving dynamics and position strategically for sustained growth.
          </p>

          {/* Recovery Indicators Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
              Current Recovery Indicators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Production Growth</h3>
                <p className="text-gray-600">Manufacturing production index improvements</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Capacity Utilization</h3>
                <p className="text-gray-600">Increased capacity utilization rates</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Export Markets</h3>
                <p className="text-gray-600">Export market re-engagement</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">Local Investment</h3>
                <p className="text-gray-600">Investment in local production capabilities</p>
              </div>
            </div>
          </section>

          {/* Key Recovery Drivers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Key Recovery Drivers
            </h2>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Supply Chain Localization
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Global supply chain disruptions have accelerated local sourcing strategies. Manufacturers investing in local supplier development gain competitive advantages through reduced dependency and improved responsiveness.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-green-600" />
                  Technology Integration
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Industry 4.0 adoption accelerates post-pandemic. Manufacturers implementing automation, IoT, and data analytics achieve operational efficiency improvements essential for competitive positioning.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Sustainability Focus
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Environmental considerations increasingly influence purchasing decisions and regulatory requirements. Manufacturers adopting sustainable practices access new markets and meet evolving customer expectations.
                </p>
              </div>
            </div>
          </section>

          {/* Strategic Positioning Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Users className="w-6 h-6 mr-3 text-indigo-600" />
              Strategic Positioning Recommendations
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Financial Management
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Implement robust cash flow forecasting systems
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Develop flexible financing arrangements for growth opportunities
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Establish cost management systems supporting operational efficiency
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-green-600" />
                  Operational Excellence
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Invest in predictive maintenance capabilities
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Develop cross-training programs ensuring workforce flexibility
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Implement quality management systems supporting export opportunities
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  Market Development
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Explore regional export opportunities through SADC integration
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Develop e-commerce capabilities reaching broader customer bases
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                    Investigate government procurement opportunities
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-12">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                Risk Management
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Post-pandemic manufacturing requires enhanced risk management approaches. This includes supply chain diversification, financial resilience planning, and operational continuity strategies.
              </p>
            </div>
          </section>

          {/* Government Support */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-green-600" />
              Government Support Utilization
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Manufacturing incentives remain available through various government programs. Companies should explore opportunities for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <span className="text-gray-700">Capital investment allowances</span>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <span className="text-gray-700">Export development support</span>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <span className="text-gray-700">Skills development incentives</span>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <span className="text-gray-700">Black industrialist support programs</span>
              </div>
            </div>
          </section>

          {/* Future Outlook */}
          <section className="mb-12">
            <div className="bg-blue-900 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Future Outlook</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                The manufacturing sector's recovery provides opportunities for well-positioned companies. Success requires strategic planning, operational excellence, and proactive adaptation to changing market conditions.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Manufacturers investing in capabilities today position themselves for long-term success in South Africa's evolving economy.
              </p>
            </div>
          </section>
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Published by AlloB Consultants Investment Research Team
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

export default ManufacturingArticle;