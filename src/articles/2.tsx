
import { 
  Calculator, FileText, Globe, Users, TrendingUp, CheckCircle, AlertCircle, 
   ArrowLeft, Share2, Bookmark, Shield, BarChart3, Clock, 
  Settings, Target, Database, Brain, Zap, Award, Building, Scale,
  Layers, PieChart, Lightbulb, Workflow, BookOpen
} from 'lucide-react';

const IFRS17Article: React.FC = () => {
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <Calculator className="w-4 h-4 mr-2" />
              Financial Standards & Compliance
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            IFRS 17 Implementation: A Glimpse into Insurance Contracts for Insurance Companies
          </h1>
          <div className="text-xl text-gray-600 mb-8">
            Navigating the New Insurance Accounting Landscape
          </div>
          <div className="flex items-center text-sm text-gray-500 border-b border-gray-200 pb-8">
            <span>Published on July 28, 2025</span>
            <span className="mx-2">•</span>
            <span>20 min read</span>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-8 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              IFRS 17 represents the most fundamental transformation in insurance accounting since the inception of international financial reporting standards. As South African insurance companies adapt to this new reality, understanding both the technical requirements and strategic implications has become critical for sustainable business operations.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-indigo-600" />
            Understanding IFRS 17: Core Principles and Objectives
          </h2>

          <div className="bg-white p-8 rounded-lg shadow mb-8">
            <p className="text-gray-700 leading-relaxed mb-8">
              The International Financial Reporting Standard 17 aims to provide a consistent global framework for insurance contract accounting, ensuring entities faithfully represent these contracts in their financial statements. The standard's primary objective is to increase transparency and comparability across entities and jurisdictions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-6">The Four Pillars of IFRS 17:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Current Value Measurement</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Unlike previous standards, IFRS 17 requires insurance contracts to be measured at current fulfillment value, reflecting up-to-date assumptions about cash flows, discount rates, and risk.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-green-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Profit Recognition Over Time</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  The standard introduces the Contractual Service Margin (CSM), representing unearned profit that must be recognized systematically as insurance services are provided.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-purple-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Enhanced Granularity</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Contracts must be grouped based on similar profitability and measured collectively, requiring sophisticated data management and actuarial modeling.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-orange-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Comprehensive Disclosure</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Stakeholders receive significantly more information about insurance operations, including detailed reconciliations and sensitivity analyses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Measurement Models */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Layers className="w-8 h-8 mr-3 text-blue-600" />
            The Three Measurement Models: Choosing the Right Approach
          </h2>

          <div className="space-y-8">
            {/* General Measurement Model */}
            <div className="bg-white border border-blue-200 rounded-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Calculator className="w-6 h-6 mr-3" />
                  General Measurement Model (GMM)
                </h3>
                <p className="text-blue-100 mt-2">The default approach for most insurance contracts</p>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Key Components:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Fulfillment Cash Flows:</span>
                      <p className="text-gray-600 text-sm">Present value of future cash flows plus risk adjustment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Contractual Service Margin:</span>
                      <p className="text-gray-600 text-sm">Unearned profit recognized over coverage period</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Current Estimates:</span>
                      <p className="text-gray-600 text-sm">Regular updates reflecting assumption changes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Practical Example:</h5>
                  <p className="text-gray-700 mb-3">Consider a 3-year term life insurance policy with R1,000 annual premiums:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Present value of premiums:</span>
                      <p className="text-blue-600">R2,850 (discounted)</p>
                    </div>
                    <div>
                      <span className="font-medium">Present value of claims:</span>
                      <p className="text-blue-600">R2,500 (discounted)</p>
                    </div>
                    <div>
                      <span className="font-medium">Risk adjustment:</span>
                      <p className="text-blue-600">R200</p>
                    </div>
                    <div>
                      <span className="font-medium">Initial CSM:</span>
                      <p className="text-blue-600">R150 (balancing)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Allocation Approach */}
            <div className="bg-white border border-green-200 rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Zap className="w-6 h-6 mr-3" />
                  Premium Allocation Approach (PAA)
                </h3>
                <p className="text-green-100 mt-2">Simplified model for short-term contracts</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">When to Use PAA:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Coverage period is one year or less</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Contract measurement would not differ materially from GMM</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Simpler operational requirements</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Implementation Benefits:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Reduced actuarial complexity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Lower system requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Faster financial reporting processes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Variable Fee Approach */}
            <div className="bg-white border border-purple-200 rounded-lg overflow-hidden">
              <div className="bg-purple-600 text-white p-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <PieChart className="w-6 h-6 mr-3" />
                  Variable Fee Approach (VFA)
                </h3>
                <p className="text-purple-100 mt-2">For contracts with direct participation features</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Characteristics:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Policyholders share in performance of underlying items</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Entity acts as investment manager</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Common in unit-linked and with-profit products</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Key Consideration:</h5>
                    <p className="text-gray-700 text-sm">
                      Changes in underlying asset values directly impact the CSM, creating dynamic profit emergence patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Challenges */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <AlertCircle className="w-8 h-8 mr-3 text-red-600" />
            Critical Implementation Challenges and Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Data Architecture */}
            <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Data Architecture & Systems</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">The Challenge:</h4>
                <p className="text-gray-700 text-sm mb-4">
                  IFRS 17 demands granular data capture and sophisticated calculation engines that most legacy systems cannot support.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Solution Framework:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Data mapping and inventory
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Gap analysis and integration
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Testing and validation protocols
                  </li>
                </ul>
              </div>
            </div>

            {/* Actuarial Capability */}
            <div className="bg-white p-6 rounded-lg shadow border border-green-200">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Actuarial Capability</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Enhanced Requirements:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Cash flow modeling at contract group level
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Risk adjustment calculations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    Discount curve construction
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    CSM allocation methodologies
                  </li>
                </ul>
              </div>
            </div>

            {/* Financial Reporting Volatility */}
            <div className="bg-white p-6 rounded-lg shadow border border-purple-200">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Volatility Management</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Mitigation Strategies:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    Stakeholder education
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    Enhanced management commentary
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    Comprehensive sensitivity analysis
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    Robust internal controls
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Workflow className="w-8 h-8 mr-3 text-orange-600" />
            Detailed Implementation Roadmap
          </h2>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-white border border-blue-200 rounded-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4 flex items-center">
                <div className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                <div>
                  <h3 className="text-lg font-semibold">Foundation Building</h3>
                  <p className="text-blue-100">Months 1-6</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Governance and Project Management:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Establish dedicated IFRS 17 steering committee
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Define project scope, timeline, and resources
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Engage external advisors for specialized expertise
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Assessment:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Comprehensive gap analysis
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Product inventory and contract boundary assessment
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Initial grouping and measurement decisions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white border border-green-200 rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4 flex items-center">
                <div className="bg-green-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                <div>
                  <h3 className="text-lg font-semibold">System Design and Development</h3>
                  <p className="text-green-100">Months 7-18</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technology Infrastructure:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Procurement or development of IFRS 17 calculation engines
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Data warehouse enhancement for granular storage
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Integration with existing financial reporting systems
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Model Development:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Cash flow projection models for each product line
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Risk adjustment methodologies and parameterization
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        CSM allocation and release mechanisms
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white border border-purple-200 rounded-lg overflow-hidden">
              <div className="bg-purple-600 text-white p-4 flex items-center">
                <div className="bg-purple-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                <div>
                  <h3 className="text-lg font-semibold">Testing and Validation</h3>
                  <p className="text-purple-100">Months 19-24</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Parallel Processing:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Run IFRS 17 calculations alongside existing methods
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Validate results through multiple independent approaches
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Stress test systems under various scenarios
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Process Refinement:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Optimize calculation performance and accuracy
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Develop exception handling procedures
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        Train operational teams on new processes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white border border-orange-200 rounded-lg overflow-hidden">
              <div className="bg-orange-600 text-white p-4 flex items-center">
                <div className="bg-orange-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                <div>
                  <h3 className="text-lg font-semibold">Go-Live and Monitoring</h3>
                  <p className="text-orange-100">Month 25+</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Transition Management:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    Execute transition adjustments and restatement of comparatives
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    Monitor and refine processes based on initial experience
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    Continuous improvement based on regulatory feedback
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Business Implications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-600" />
            Strategic Business Implications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Enhanced Business Intelligence</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                IFRS 17 provides unprecedented insight into insurance contract profitability:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Product-level profit analysis through CSM tracking
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Risk-adjusted return measurement
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Cross-subsidization identification
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Capital Management Optimization</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Current value approach better aligns accounting and economic capital:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Improved asset-liability matching strategies
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Enhanced risk management integration
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Sophisticated pricing capabilities
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Stakeholder Value Creation</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Enhanced transparency creates improved stakeholder relationships:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Investor confidence through clear profit patterns
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Rating agency recognition
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Competitive advantage through superior communication
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Expert Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
            Expert Resources and Ongoing Support
          </h2>

          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-700 leading-relaxed mb-6">
              Successful IFRS 17 implementation requires diverse expertise across multiple disciplines:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Actuarial Sciences
                </h4>
                <p className="text-gray-700 text-sm">Experienced professionals in insurance mathematics and financial modeling</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-600" />
                  Information Technology
                </h4>
                <p className="text-gray-700 text-sm">Systems architects specializing in insurance and financial reporting systems</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Financial Reporting
                </h4>
                <p className="text-gray-700 text-sm">Accounting professionals with deep IFRS knowledge and insurance industry experience</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-600" />
                  Project Management
                </h4>
                <p className="text-gray-700 text-sm">Leaders capable of managing complex, multi-year transformation initiatives</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-red-600" />
                  Data Management
                </h4>
                <p className="text-gray-700 text-sm">Specialists in data governance, quality assurance, and analytics</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-indigo-600" />
                  Regulatory Affairs
                </h4>
                <p className="text-gray-700 text-sm">Professionals monitoring regulatory developments and interpretation guidance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Considerations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Building className="w-8 h-8 mr-3 text-gray-600" />
            Regulatory Considerations for South African Insurers
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-6">
              South African insurance companies must navigate both IFRS 17 requirements and local regulatory expectations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-600" />
                  Prudential Authority Expectations
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Robust governance over IFRS 17 implementation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Clear communication of impacts to stakeholders
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Demonstration of ongoing compliance capabilities
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-green-600" />
                  Coordination Considerations
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Alignment with SAM (Solvency Assessment and Management) requirements
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Integration with existing regulatory reporting processes
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Management of potential timing differences
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Award className="w-8 h-8 mr-3" />
              IFRS 17 as Transformation Catalyst
            </h2>
            <p className="text-blue-100 leading-relaxed mb-6">
              While IFRS 17 compliance represents a significant undertaking, forward-thinking insurance companies are positioning the standard as a catalyst for broader business transformation. The enhanced data infrastructure, sophisticated modeling capabilities, and improved analytical insights required for compliance create foundations for competitive advantage in an increasingly complex marketplace.
            </p>
            <p className="text-blue-100 leading-relaxed mb-6">
              Success requires viewing IFRS 17 not merely as an accounting exercise, but as an opportunity to fundamentally improve how insurance businesses understand, manage, and communicate their value creation processes. Companies that embrace this perspective will emerge from implementation better positioned for sustainable growth and stakeholder value creation.
            </p>
            <p className="text-blue-100 leading-relaxed italic">
              The journey is complex, but the destination—a more transparent, analytically sophisticated, and strategically informed insurance operation—justifies the investment required to get there.
            </p>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Published by AlloB Consultants Financial Standards Team
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

export default IFRS17Article;