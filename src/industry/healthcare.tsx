import { Link } from 'react-router-dom'
import { 
  Heart, Stethoscope, Building2, FileText, Shield, Calculator,
  Users, ClipboardCheck, TrendingUp, DollarSign, CheckCircle, ArrowRight 
} from 'lucide-react'

const HealthcareServices = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Healthcare Compliance Management",
      description: "Navigate complex healthcare regulations, licensing requirements, and industry-specific compliance standards.",
      features: [
        "HPCSA registration compliance",
        "Practice license management",
        "Regulatory reporting automation",
        "Compliance risk assessment"
      ]
    },
    {
      icon: DollarSign,
      title: "Medical Aid & Insurance Billing",
      description: "Streamlined medical aid claims processing, insurance billing, and accounts receivable management.",
      features: [
        "Medical aid scheme integration",
        "Claims processing automation",
        "Insurance billing optimization",
        "Patient account management"
      ]
    },
    {
      icon: Calculator,
      title: "Practice Financial Management",
      description: "Comprehensive financial management for medical practices, clinics, and healthcare facilities.",
      features: [
        "Practice profitability analysis",
        "Cash flow management",
        "Expense categorization",
        "Financial performance reporting"
      ]
    },
    {
      icon: Building2,
      title: "Equipment & Asset Management",
      description: "Specialized accounting for medical equipment, depreciation strategies, and capital asset optimization.",
      features: [
        "Medical equipment financing",
        "Depreciation optimization",
        "Asset lifecycle management",
        "Equipment ROI analysis"
      ]
    },
    {
      icon: Users,
      title: "Staff & Payroll Management",
      description: "Healthcare-specific payroll processing, locum management, and staff cost optimization.",
      features: [
        "Medical professional payroll",
        "Locum payment processing",
        "Benefits administration",
        "Staff cost analysis"
      ]
    },
    {
      icon: Shield,
      title: "Risk Management & Insurance",
      description: "Professional indemnity insurance optimization and healthcare risk management strategies.",
      features: [
        "Professional indemnity optimization",
        "Malpractice insurance planning",
        "Risk assessment frameworks",
        "Claims impact analysis"
      ]
    }
  ]

  const healthcareTypes = [
    {
      title: "Private Medical Practices",
      icon: Stethoscope,
      description: "Solo practitioners and small group practices",
      services: ["Practice management", "Medical aid billing", "Tax optimization", "Equipment financing"]
    },
    {
      title: "Specialist Clinics",
      icon: Heart,
      description: "Specialized medical facilities and treatment centers",
      services: ["Multi-practitioner accounting", "Procedure costing", "Equipment depreciation", "Compliance monitoring"]
    },
    {
      title: "Healthcare Facilities",
      icon: Building2,
      description: "Hospitals, nursing homes, and medical centers",
      services: ["Complex billing systems", "Departmental accounting", "Capital management", "Regulatory compliance"]
    },
    {
      title: "Allied Health Professionals",
      icon: Users,
      description: "Physiotherapists, psychologists, and other healthcare professionals",
      services: ["Professional registration", "Session billing", "Practice optimization", "Tax planning"]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Medical Aid Billing",
      solution: "We implement automated medical aid billing systems that integrate with practice management software, ensuring accurate claims submission and faster payments.",
      impact: "50% reduction in claims processing time and 95% first-submission approval rate"
    },
    {
      challenge: "Healthcare Regulatory Compliance",
      solution: "Comprehensive compliance monitoring systems that track licensing requirements, regulatory changes, and professional registration deadlines.",
      impact: "100% compliance maintenance with automated alerts and reporting"
    },
    {
      challenge: "Equipment Investment Decisions",
      solution: "Financial modeling and ROI analysis for medical equipment purchases, including financing options and depreciation strategies.",
      impact: "Optimized equipment investments with 25% improvement in asset utilization"
    },
    {
      challenge: "Cash Flow Management",
      solution: "Specialized cash flow forecasting that accounts for medical aid payment cycles, seasonal variations, and practice growth patterns.",
      impact: "Improved cash flow predictability and reduced financing requirements"
    }
  ]

  const caseStudies = [
    {
      title: "Multi-Practitioner Clinic Optimization",
      industry: "General Practice",
      challenge: "A 6-doctor family practice struggled with complex billing across multiple medical aids and poor visibility into individual practitioner profitability.",
      solution: "Implemented integrated practice management system with automated medical aid billing and practitioner-specific profitability tracking.",
      result: "Increased collection rates by 30% and provided clear profitability insights leading to optimized service offerings."
    },
    {
      title: "Specialist Practice Growth",
      industry: "Cardiology Specialist",
      challenge: "Cardiologist needed financial planning for expensive diagnostic equipment and optimization of procedure billing.",
      solution: "Developed equipment financing strategy and implemented procedure-based costing system with medical aid optimization.",
      result: "Successfully financed R2.5M in diagnostic equipment with 40% improvement in procedure profitability."
    },
    {
      title: "Physiotherapy Practice Expansion",
      industry: "Allied Health",
      challenge: "Growing physiotherapy practice with multiple locations needed centralized accounting and standardized billing processes.",
      solution: "Centralized accounting system with location-based reporting and automated session billing across all sites.",
      result: "Streamlined operations across 4 locations with 35% reduction in administrative overhead."
    }
  ]

  //const healthcareStats = [
  //  { number: '120+', label: 'Healthcare Clients' },
  //  { number: '95%', label: 'Claims Approval Rate' },
  //  { number: '100%', label: 'Regulatory Compliance' },
 //   { number: 'R200M+', label: 'Medical Aid Claims Processed' }
 // ]

  const complianceAreas = [
    {
      title: "Professional Registration",
      description: "HPCSA and professional body registration compliance",
      items: ["Annual registration renewals", "CPD point tracking", "Professional indemnity requirements"]
    },
    {
      title: "Practice Licensing",
      description: "Healthcare facility and practice licensing management",
      items: ["Practice permits", "Facility licenses", "Controlled substance permits"]
    },
    {
      title: "Data Protection",
      description: "Patient data privacy and POPIA compliance",
      items: ["Patient record security", "Data processing compliance", "Privacy impact assessments"]
    },
    {
      title: "Financial Regulations",
      description: "Healthcare-specific financial and tax compliance",
      items: ["Medical aid regulations", "Healthcare VAT treatment", "Professional service tax planning"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 via-cyan-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-12 h-12 text-teal-300 mr-4" />
                <span className="text-teal-300 font-semibold">Healthcare</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Healthcare
                <span className="block text-teal-300">Financial Management</span>
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Specialized accounting and financial services for healthcare professionals, medical practices, 
                and healthcare facilities. Navigate complex regulations, optimize billing, and focus on patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-teal-900 px-8 py-3 rounded-lg hover:bg-teal-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">Healthcare Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Medical Aid Billing</h4>
                      <p className="text-teal-100 text-sm">Streamlined claims processing and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Regulatory Compliance</h4>
                      <p className="text-teal-100 text-sm">Navigate complex healthcare regulations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Practice Optimization</h4>
                      <p className="text-teal-100 text-sm">Financial strategies for practice growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section 
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {healthcareStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across different healthcare practice types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {healthcareTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-6 h-6 text-teal-600" />
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
              Comprehensive Healthcare Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial solutions for healthcare professionals and facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-teal-600" />
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

      {/* Compliance Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Compliance Management
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive compliance support across all healthcare regulatory areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">{area.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{area.description}</p>
                
                <ul className="space-y-2">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{item}</span>
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
              Healthcare Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common challenges facing healthcare providers and our proven solutions
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
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-teal-800 font-semibold">Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies 
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our healthcare clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
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
      </section>*/}

      {/* Healthcare KPIs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Financial KPIs We Monitor
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for healthcare practice success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Collection Rates</h3>
              <p className="text-gray-600 text-sm">Medical aid and patient payment efficiency</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Claims Processing</h3>
              <p className="text-gray-600 text-sm">Medical aid submission and approval rates</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Patient Volume</h3>
              <p className="text-gray-600 text-sm">Practice capacity and utilization metrics</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Practice Profitability</h3>
              <p className="text-gray-600 text-sm">Revenue optimization and cost management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-900 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Focus on Patient Care, Not Paperwork</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
            Partner with healthcare accounting specialists who understand your industry. 
            Streamline your practice finances and ensure regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-teal-900 px-8 py-3 rounded-lg hover:bg-teal-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Healthcare Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HealthcareServices