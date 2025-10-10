import { Link } from 'react-router-dom'
import { 
  Monitor, Code, Database, Cloud, Globe, 
  TrendingUp, Shield, DollarSign, Users, CheckCircle, ArrowRight 
} from 'lucide-react'

const TechServices = () => {
  const services = [
    {
      icon: DollarSign,
      title: "SaaS Revenue Recognition",
      description: "Expert handling of complex subscription revenue models, recurring billing, and ASC 606 compliance for software companies.",
      features: [
        "Multi-element arrangement accounting",
        "Deferred revenue management",
        "Contract modifications handling",
        "Performance obligation allocation"
      ]
    },
    {
      icon: TrendingUp,
      title: "R&D Tax Incentives",
      description: "Maximize your R&D tax credits and deductions for software development, innovation projects, and technical improvements.",
      features: [
        "R&D expenditure identification",
        "Section 11D deduction optimization",
        "Innovation incentive applications",
        "Technical documentation support"
      ]
    },
    {
      icon: Users,
      title: "Equity Compensation Accounting",
      description: "Navigate stock options, ESOP schemes, and equity compensation for startups and growing tech companies.",
      features: [
        "Stock option valuation",
        "IFRS 2 compliance",
        "Employee share schemes",
        "Equity dilution modeling"
      ]
    },
    {
      icon: Globe,
      title: "International Tax Compliance",
      description: "Handle multi-jurisdiction operations, transfer pricing, and cross-border transactions for global tech companies.",
      features: [
        "Transfer pricing documentation",
        "Permanent establishment analysis",
        "Double taxation treaty optimization",
        "International withholding taxes"
      ]
    },
    {
      icon: Shield,
      title: "IP & Intangible Assets",
      description: "Manage intellectual property valuations, amortization, and tax optimization for software and technology assets.",
      features: [
        "Software development cost capitalization",
        "IP valuation and amortization",
        "Technology licensing structures",
        "Patent and trademark accounting"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure Accounting",
      description: "Optimize accounting for cloud services, infrastructure costs, and technology investments.",
      features: [
        "Cloud cost allocation",
        "Infrastructure asset management",
        "Software licensing compliance",
        "Technology depreciation strategies"
      ]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Revenue Recognition",
      solution: "We implement robust systems to handle multi-element arrangements, subscription billing, and revenue deferrals according to IFRS 15 and ASC 606 standards.",
      impact: "Accurate financial reporting and investor confidence"
    },
    {
      challenge: "Rapid Growth Scaling",
      solution: "Our scalable accounting systems and processes grow with your business, from startup to enterprise level operations.",
      impact: "Seamless financial operations during high-growth periods"
    },
    {
      challenge: "Investor Due Diligence",
      solution: "We prepare comprehensive financial packages and ensure compliance readiness for funding rounds and acquisitions.",
      impact: "Faster deal closure and higher valuations"
    },
    {
      challenge: "International Expansion",
      solution: "Expert guidance on international tax structures, transfer pricing, and multi-jurisdiction compliance requirements.",
      impact: "Compliant global operations with optimized tax efficiency"
    }
  ]

  const caseStudies = [
    {
      title: "Fintech Startup Success",
      industry: "Financial Technology",
      challenge: "A fintech startup needed proper revenue recognition for their SaaS platform and preparation for Series A funding.",
      solution: "Implemented ASC 606 compliant revenue recognition, established financial controls, and prepared investor-ready financials.",
      result: "Successful R15M Series A funding round with 30% reduction in accounting overhead costs."
    },
    {
      title: "E-commerce Platform Growth", 
      industry: "E-commerce Technology",
      challenge: "Multi-currency transactions and complex marketplace revenue sharing needed proper accounting treatment.",
      solution: "Designed multi-entity accounting structure with automated currency conversion and revenue allocation systems.",
      result: "40% improvement in financial reporting accuracy and streamlined multi-country operations."
    },
    {
      title: "Software Development Tax Optimization",
      industry: "Enterprise Software",
      challenge: "Maximizing R&D tax incentives for software development and qualifying for innovation tax benefits.",
      solution: "Comprehensive R&D expenditure analysis and Section 11D deduction optimization strategy.",
      result: "R2.3M in additional tax savings annually through optimized R&D claims."
    }
  ]

  // const techStats = [
  //   { number: '50+', label: 'Tech Companies Served' },
  //   { number: 'R150M+', label: 'Funding Rounds Supported' },
  //   { number: '95%', label: 'Successful Due Diligence' },
  //   { number: '30%', label: 'Average Cost Reduction' }
  // ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Monitor className="w-12 h-12 text-blue-300 mr-4" />
                <span className="text-blue-300 font-semibold">Technology & Software</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Specialized Accounting for
                <span className="block text-blue-300">Tech Companies</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                From startups to scale-ups, we provide comprehensive financial services tailored 
                to the unique challenges of technology companies, software development, and digital innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors flex items-center justify-center"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/paye-calculator"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
                >
                  PAYE Calculator
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Why Tech Companies Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Industry Expertise</h4>
                      <p className="text-blue-100 text-sm">Deep understanding of tech business models and challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Investor Ready</h4>
                      <p className="text-blue-100 text-sm">Prepare financial packages that impress investors</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Scalable Solutions</h4>
                      <p className="text-blue-100 text-sm">Systems that grow with your business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section *
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Tech Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized solutions designed for the unique financial complexities of technology companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tech Industry Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common financial hurdles facing technology companies and our proven solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="border-l-4 border-red-400 pl-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Challenge: {item.challenge}</h3>
                </div>
                <div className="border-l-4 border-green-400 pl-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Our Solution:</h4>
                  <p className="text-gray-600">{item.solution}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-semibold">Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tech Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our technology sector clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  {study.industry}
                </div>
                <h3 className="text-xl font-bold mb-4">{study.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Challenge:</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Solution:</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Result:</h4>
                    <p className="text-green-700 font-medium text-sm">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-xl text-gray-600">
              We use cutting-edge tools to serve tech companies efficiently
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Cloud Accounting</h3>
              <p className="text-gray-600 text-sm">Real-time financial data access</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">API Integration</h3>
              <p className="text-gray-600 text-sm">Seamless system connectivity</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Custom Solutions</h3>
              <p className="text-gray-600 text-sm">Tailored tech integrations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Security First</h3>
              <p className="text-gray-600 text-sm">Enterprise-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Scale Your Tech Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join successful tech companies who trust us with their financial operations. 
            Get expert accounting and tax services designed for your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Tax Advisory Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TechServices