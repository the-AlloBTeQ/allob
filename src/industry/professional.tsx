import { Link } from 'react-router-dom'
import { 
  Briefcase, Scale, Users, FileText, Clock, DollarSign,
  Shield, Calculator, TrendingUp, Building, CheckCircle, ArrowRight 
} from 'lucide-react'

const ProfessionalServices = () => {
  const services = [
    {
      icon: Clock,
      title: "Time-Based Billing & Project Accounting",
      description: "Sophisticated time tracking and billing systems for professional service firms with project-based revenue models.",
      features: [
        "Time and expense tracking integration",
        "Project profitability analysis",
        "Billable hour optimization",
        "Client billing automation"
      ]
    },
    {
      icon: Shield,
      title: "Trust Account Management",
      description: "Specialized trust account compliance and management for legal firms and fiduciary service providers.",
      features: [
        "Trust account reconciliation",
        "Client fund segregation",
        "Regulatory compliance monitoring",
        "Trust accounting reporting"
      ]
    },
    {
      icon: Users,
      title: "Partnership & Equity Accounting",
      description: "Complex partnership structures, profit sharing, and equity compensation management for professional partnerships.",
      features: [
        "Partner draw and distribution tracking",
        "Equity allocation modeling",
        "Partnership tax compliance",
        "Capital account management"
      ]
    },
    {
      icon: FileText,
      title: "Professional Indemnity & Risk Management",
      description: "Financial planning and accounting for professional liability, insurance, and risk management requirements.",
      features: [
        "Professional indemnity cost tracking",
        "Risk assessment financial modeling",
        "Insurance premium optimization",
        "Claims impact analysis"
      ]
    },
    {
      icon: Calculator,
      title: "Fee Structure Optimization",
      description: "Strategic fee analysis, pricing optimization, and revenue model development for professional services.",
      features: [
        "Fee structure analysis",
        "Competitive pricing research",
        "Revenue model optimization",
        "Client profitability assessment"
      ]
    },
    {
      icon: Building,
      title: "Multi-Office Operations",
      description: "Centralized accounting and financial management for professional firms with multiple locations.",
      features: [
        "Inter-office cost allocation",
        "Centralized financial reporting",
        "Location-based profitability",
        "Shared resource management"
      ]
    }
  ]

  const professionalTypes = [
    {
      title: "Legal Firms",
      icon: Scale,
      description: "Specialized accounting for law firms, chambers, and legal practices.",
      services: ["Trust account management", "Billable hour tracking", "Case cost allocation", "Professional indemnity"]
    },
    {
      title: "Consulting Firms",
      icon: Briefcase,
      description: "Financial management for management, IT, and specialized consulting practices.",
      services: ["Project accounting", "Resource allocation", "Client profitability", "Overhead management"]
    },
    {
      title: "Accounting Practices",
      icon: Calculator,
      description: "Practice management and financial optimization for accounting firms.",
      services: ["Client portfolio analysis", "Service line profitability", "Partner compensation", "Quality control costs"]
    },
    {
      title: "Engineering Firms",
      icon: Building,
      description: "Project-based accounting for engineering and technical consulting firms.",
      services: ["Project cost tracking", "Resource optimization", "Contract accounting", "Technical certification costs"]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Time and Billing",
      solution: "We implement integrated time tracking and billing systems that automate invoice generation, track project profitability, and optimize billable hour realization.",
      impact: "30% improvement in billing efficiency and 95% accurate time allocation"
    },
    {
      challenge: "Trust Account Compliance",
      solution: "Specialized trust accounting systems with built-in compliance monitoring and automated reconciliation processes.",
      impact: "100% regulatory compliance with reduced audit preparation time"
    },
    {
      challenge: "Partnership Profit Distribution",
      solution: "Sophisticated partnership accounting systems that accurately track contributions, distributions, and equity allocations.",
      impact: "Transparent profit sharing and improved partner satisfaction"
    },
    {
      challenge: "Multi-Location Coordination",
      solution: "Centralized accounting platforms with location-specific reporting and inter-office cost allocation.",
      impact: "Unified financial oversight with location-based performance insights"
    }
  ]

  const caseStudies = [
    {
      title: "Law Firm Efficiency Transformation",
      industry: "Legal Services",
      challenge: "Mid-sized law firm with 25 partners struggled with trust account management and billable hour tracking across practice areas.",
      solution: "Implemented integrated legal practice management system with automated trust accounting and time tracking.",
      result: "40% reduction in billing cycle time and 100% trust account compliance for 3 consecutive audits."
    },
    {
      title: "Consulting Firm Growth",
      industry: "Management Consulting",
      challenge: "Growing consulting firm needed better project profitability analysis and resource allocation across client engagements.",
      solution: "Deployed project accounting system with real-time cost tracking and resource optimization tools.",
      result: "Improved project margins by 25% and increased consultant utilization rates by 20%."
    },
    {
      title: "Accounting Practice Optimization",
      industry: "Accounting Services",
      challenge: "Accounting practice with multiple service lines needed better client profitability analysis and partner compensation clarity.",
      solution: "Comprehensive practice management system with client profitability tracking and automated partner reporting.",
      result: "Identified most profitable service lines and optimized partner compensation structure, increasing overall profitability by 35%."
    }
  ]

  // const professionalStats = [
  //   { number: '80+', label: 'Professional Firms' },
  //   { number: '500+', label: 'Partners Served' },
  //   { number: '100%', label: 'Trust Account Compliance' },
  //   { number: '30%', label: 'Average Efficiency Gain' }
  // ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="w-12 h-12 text-indigo-300 mr-4" />
                <span className="text-indigo-300 font-semibold">Professional Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Professional Services
                <span className="block text-indigo-300">Financial Management</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Specialized accounting and financial management for law firms, consulting practices, 
                accounting firms, and professional service providers. Navigate complex billing, 
                trust accounts, and partnership structures with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-900 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">Professional Service Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Time & Billing Mastery</h4>
                      <p className="text-indigo-100 text-sm">Optimize billable hours and project profitability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Trust Account Compliance</h4>
                      <p className="text-indigo-100 text-sm">Specialized expertise in fiduciary accounting</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Partnership Structures</h4>
                      <p className="text-indigo-100 text-sm">Complex partnership and equity management</p>
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
            {professionalStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Service Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Service Types We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across different professional service sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionalTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{type.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specialized Services:</h4>
                <ul className="space-y-1">
                  {type.services.map((service, idx) => (
                    <li key={idx} className="text-xs text-gray-600">• {service}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Professional Services Accounting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial solutions for professional service firms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-indigo-600" />
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Service Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common challenges facing professional service firms and our proven solutions
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
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-indigo-800 font-semibold">Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Services Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our professional service clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
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

      {/* Professional KPIs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Services KPIs We Monitor
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for professional service success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Billable Hours</h3>
              <p className="text-gray-600 text-sm">Utilization rates and realization analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Client Profitability</h3>
              <p className="text-gray-600 text-sm">Revenue per client and engagement margins</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Partner Performance</h3>
              <p className="text-gray-600 text-sm">Individual and team productivity metrics</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Practice Growth</h3>
              <p className="text-gray-600 text-sm">Revenue growth and market expansion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Optimize Your Professional Practice</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Partner with specialists who understand professional service operations. 
            Streamline your billing, ensure compliance, and maximize profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-indigo-900 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Professional Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfessionalServices