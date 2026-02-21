import { Link } from 'react-router-dom'
import { 
  HardHat, Building, Wrench, FileText, Calculator, DollarSign,
  Truck, Users, BarChart3, Shield, CheckCircle, ArrowRight 
} from 'lucide-react'

const ConstructionServices = () => {
  const services = [
    {
      icon: FileText,
      title: "Project-Based Accounting",
      description: "Comprehensive project accounting systems for accurate cost tracking, progress billing, and profitability analysis per project.",
      features: [
        "Job costing and project tracking",
        "Work-in-progress reporting",
        "Project profitability analysis",
        "Multi-project portfolio management"
      ]
    },
    {
      icon: DollarSign,
      title: "Progress Billing & Revenue Recognition",
      description: "Sophisticated billing systems for construction contracts, including progress billing and percentage-of-completion accounting.",
      features: [
        "Progress billing automation",
        "Percentage-of-completion revenue",
        "Retention management",
        "Contract variation tracking"
      ]
    },
    {
      icon: Truck,
      title: "Equipment & Asset Management",
      description: "Specialized accounting for construction equipment, machinery depreciation, and asset utilization optimization.",
      features: [
        "Equipment depreciation strategies",
        "Asset utilization tracking",
        "Maintenance cost allocation",
        "Equipment financing optimization"
      ]
    },
    {
      icon: Users,
      title: "Subcontractor Management",
      description: "Streamlined subcontractor payment processing, compliance tracking, and cost allocation systems.",
      features: [
        "Subcontractor payment automation",
        "Compliance certificate tracking",
        "Lien waiver management",
        "Subcontractor performance analytics"
      ]
    },
    {
      icon: Shield,
      title: "Construction Compliance & Safety",
      description: "Navigate construction industry regulations, safety compliance, and contractor licensing requirements.",
      features: [
        "CIDB registration compliance",
        "Safety compliance tracking",
        "Construction permit management",
        "Industry regulation monitoring"
      ]
    },
    {
      icon: BarChart3,
      title: "Cash Flow & Working Capital",
      description: "Strategic cash flow management for construction projects with long payment cycles and capital requirements.",
      features: [
        "Cash flow forecasting",
        "Working capital optimization",
        "Progress payment tracking",
        "Credit facility management"
      ]
    }
  ]

  const constructionTypes = [
    {
      title: "General Contractors",
      icon: Building,
      description: "Commercial and residential construction contractors",
      services: ["Project accounting", "Subcontractor management", "Progress billing", "Equipment tracking"]
    },
    {
      title: "Specialized Contractors",
      icon: Wrench,
      description: "Electrical, plumbing, HVAC, and trade specialists",
      services: ["Trade-specific costing", "Equipment optimization", "License compliance", "Project profitability"]
    },
    {
      title: "Civil Engineering",
      icon: HardHat,
      description: "Infrastructure, roads, and civil construction projects",
      services: ["Large project accounting", "Government contract compliance", "Equipment depreciation", "Progress reporting"]
    },
    {
      title: "Property Developers",
      icon: Building,
      description: "Residential and commercial property development",
      services: ["Development accounting", "Land cost allocation", "Presale management", "Joint venture accounting"]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Project Costing",
      solution: "We implement sophisticated job costing systems that track all project expenses in real-time, providing accurate profitability analysis and early warning of cost overruns.",
      impact: "25% improvement in project margin visibility and proactive cost management"
    },
    {
      challenge: "Cash Flow Management",
      solution: "Strategic cash flow forecasting that accounts for construction payment cycles, retention holdbacks, and seasonal variations in construction activity.",
      impact: "Improved cash flow predictability and reduced financing requirements"
    },
    {
      challenge: "Subcontractor Compliance",
      solution: "Automated subcontractor management systems that track compliance certificates, insurance, and payment schedules while ensuring regulatory compliance.",
      impact: "100% subcontractor compliance with 50% reduction in administrative overhead"
    },
    {
      challenge: "Equipment Cost Allocation",
      solution: "Advanced equipment tracking and cost allocation systems that optimize asset utilization and provide accurate project costing.",
      impact: "20% improvement in equipment utilization and accurate project cost allocation"
    }
  ]

  const caseStudies = [
    {
      title: "Commercial Construction Growth",
      industry: "Commercial Construction",
      challenge: "Mid-sized contractor managing 15 simultaneous projects struggled with accurate job costing and cash flow management.",
      solution: "Implemented integrated project accounting system with real-time cost tracking and cash flow forecasting.",
      result: "Improved project profitability by 30% and reduced cash flow volatility through better forecasting."
    },
    {
      title: "Residential Developer Success",
      industry: "Property Development",
      challenge: "Property developer with multiple subdivisions needed better cost allocation and presale revenue recognition.",
      solution: "Developed comprehensive development accounting system with land cost allocation and presale management.",
      result: "Streamlined accounting across 5 developments with 40% improvement in financial reporting accuracy."
    },
    {
      title: "Electrical Contractor Optimization",
      industry: "Specialized Contracting",
      challenge: "Electrical contractor needed better equipment utilization tracking and project profitability analysis.",
      solution: "Implemented trade-specific accounting system with equipment tracking and job profitability analysis.",
      result: "Increased equipment utilization by 25% and identified most profitable project types for business focus."
    }
  ]

  //const constructionStats = [
   // { number: '200+', label: 'Construction Projects' },
   // { number: 'R500M+', label: 'Project Value Managed' },
    //{ number: '95%', label: 'On-Time Delivery' },
    //{ number: '30%', label: 'Average Margin Improvement' }
  //]

  const complianceAreas = [
    {
      title: "CIDB Registration",
      description: "Construction Industry Development Board compliance",
      items: ["CIDB grading applications", "Annual compliance renewals", "Performance tracking"]
    },
    {
      title: "Tax Compliance",
      description: "Construction-specific tax requirements",
      items: ["Withholding tax on contractors", "VAT on construction services", "Employee tax compliance"]
    },
    {
      title: "Safety Regulations",
      description: "Occupational health and safety compliance",
      items: ["Safety compliance costs", "Incident reporting", "Safety training tracking"]
    },
    {
      title: "Environmental Compliance",
      description: "Environmental impact and waste management",
      items: ["Environmental impact assessments", "Waste disposal tracking", "Sustainability reporting"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <HardHat className="w-12 h-12 text-amber-300 mr-4" />
                <span className="text-amber-300 font-semibold">Construction</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Construction
                <span className="block text-amber-300">Financial Management</span>
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Specialized accounting and financial services for construction companies, contractors, 
                and property developers. Master project accounting, manage cash flow, and ensure compliance 
                in the construction industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-amber-900 px-8 py-3 rounded-lg hover:bg-amber-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">Construction Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Project Accounting</h4>
                      <p className="text-amber-100 text-sm">Accurate job costing and project profitability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Cash Flow Management</h4>
                      <p className="text-amber-100 text-sm">Strategic planning for construction payment cycles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">CIDB Compliance</h4>
                      <p className="text-amber-100 text-sm">Navigate construction industry regulations</p>
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
            {constructionStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Construction Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across different construction industry segments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {constructionTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-6 h-6 text-amber-600" />
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
              Comprehensive Construction Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial solutions for construction companies and contractors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-amber-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-amber-600" />
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
              Construction Compliance Management
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive compliance support across all construction regulatory areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
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
              Construction Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common challenges facing construction companies and our proven solutions
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
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-amber-800 font-semibold">Impact: {item.impact}</p>
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
              Construction Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our construction clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
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

      {/* Construction KPIs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Construction Financial KPIs We Monitor
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for construction success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Calculator className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Project Margins</h3>
              <p className="text-gray-600 text-sm">Individual project profitability analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Cash Flow Cycle</h3>
              <p className="text-gray-600 text-sm">Payment timing and working capital optimization</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Equipment Utilization</h3>
              <p className="text-gray-600 text-sm">Asset efficiency and cost allocation</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Project Performance</h3>
              <p className="text-gray-600 text-sm">Schedule and budget variance analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Build Financial Success</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-amber-100">
            Partner with construction accounting specialists who understand your industry. 
            Optimize project profitability, manage cash flow, and ensure compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-amber-900 px-8 py-3 rounded-lg hover:bg-amber-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Construction Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ConstructionServices