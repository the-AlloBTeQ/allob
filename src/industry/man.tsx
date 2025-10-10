import { Link } from 'react-router-dom'
import { 
  Factory, Settings, Package, TrendingUp, Shield, Calculator,
  BarChart3, Truck, CheckCircle, ArrowRight, AlertTriangle 
} from 'lucide-react'

const ManufacturingServices = () => {
  const services = [
    {
      icon: Calculator,
      title: "Cost Accounting Systems",
      description: "Advanced cost accounting methodologies for accurate product costing, overhead allocation, and margin analysis.",
      features: [
        "Activity-based costing (ABC)",
        "Standard vs. actual cost analysis",
        "Overhead allocation optimization", 
        "Product profitability analysis"
      ]
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Comprehensive inventory valuation, control systems, and optimization strategies for manufacturing operations.",
      features: [
        "Raw materials, WIP, and finished goods tracking",
        "FIFO, LIFO, and weighted average costing",
        "Inventory cycle count procedures",
        "Obsolete inventory management"
      ]
    },
    {
      icon: Settings,
      title: "Production Accounting",
      description: "Specialized accounting for manufacturing processes, including job costing and process costing methodologies.",
      features: [
        "Job order costing systems",
        "Process costing implementation",
        "Manufacturing overhead tracking",
        "Work-in-progress valuation"
      ]
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Navigate complex manufacturing regulations, environmental compliance, and industry-specific reporting requirements.",
      features: [
        "Environmental compliance reporting",
        "Health and safety cost tracking",
        "Industry-specific tax incentives",
        "Manufacturing license compliance"
      ]
    },
    {
      icon: BarChart3,
      title: "Financial Analysis & KPIs",
      description: "Manufacturing-specific financial metrics, performance indicators, and operational efficiency analysis.",
      features: [
        "Manufacturing efficiency ratios",
        "Capacity utilization analysis",
        "Break-even and CVP analysis",
        "Equipment ROI calculations"
      ]
    },
    {
      icon: Truck,
      title: "Supply Chain Finance",
      description: "Financial management of supplier relationships, procurement processes, and supply chain optimization.",
      features: [
        "Supplier payment optimization",
        "Purchase order accounting",
        "Supply chain cost analysis",
        "Vendor performance metrics"
      ]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Inventory Valuation",
      solution: "We implement sophisticated inventory management systems that accurately track raw materials, work-in-progress, and finished goods using appropriate costing methods for your industry.",
      impact: "Accurate financial reporting and improved inventory turnover"
    },
    {
      challenge: "Manufacturing Overhead Allocation",
      solution: "Our activity-based costing systems ensure accurate overhead allocation to products, providing true product profitability insights.",
      impact: "Better pricing decisions and improved profit margins"
    },
    {
      challenge: "Production Cost Control",
      solution: "Real-time cost tracking systems and variance analysis help identify cost overruns early and implement corrective measures.",
      impact: "Reduced manufacturing costs and improved operational efficiency"
    },
    {
      challenge: "Regulatory Compliance Burden",
      solution: "Streamlined compliance processes and automated reporting systems ensure adherence to manufacturing regulations without operational disruption.",
      impact: "Reduced compliance costs and minimized regulatory risk"
    }
  ]

  const caseStudies = [
    {
      title: "Food Processing Efficiency",
      industry: "Food Manufacturing",
      challenge: "A food processing company struggled with accurate cost allocation and inventory management across multiple product lines.",
      solution: "Implemented activity-based costing system with real-time inventory tracking and automated cost allocation.",
      result: "25% improvement in cost visibility and 15% reduction in inventory carrying costs."
    },
    {
      title: "Automotive Parts Optimization",
      industry: "Automotive Manufacturing",
      challenge: "Complex supply chain costs and multiple manufacturing processes made accurate product costing difficult.",
      solution: "Designed integrated cost accounting system linking procurement, production, and finished goods.",
      result: "Improved product margin visibility by 40% and reduced overhead allocation errors by 60%."
    },
    {
      title: "Chemical Manufacturing Compliance",
      industry: "Chemical Manufacturing",
      challenge: "Environmental compliance costs and complex regulatory reporting requirements were overwhelming internal resources.",
      solution: "Automated compliance tracking system with integrated environmental cost accounting and regulatory reporting.",
      result: "50% reduction in compliance preparation time and zero regulatory penalties for 3 consecutive years."
    }
  ]

  //const manufacturingStats = [
   // { number: '40+', label: 'Manufacturing Clients' },
   // { number: '25%', label: 'Average Cost Reduction' },
   // { number: '98%', label: 'Compliance Success Rate' },
   // { number: 'R50M+', label: 'Cost Savings Identified' }
  //]

  const equipmentServices = [
    {
      title: "Equipment Financing",
      description: "Optimize financing structures for manufacturing equipment and machinery purchases.",
      benefits: ["Tax-efficient depreciation", "Cash flow optimization", "Lease vs buy analysis"]
    },
    {
      title: "Asset Management",
      description: "Comprehensive fixed asset tracking and depreciation management for manufacturing equipment.",
      benefits: ["Asset lifecycle tracking", "Maintenance cost allocation", "Disposal optimization"]
    },
    {
      title: "Technology Upgrades",
      description: "Financial planning and accounting for manufacturing technology implementations and upgrades.",
      benefits: ["ROI analysis", "Implementation cost tracking", "Technology depreciation strategies"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-900 via-red-800 to-orange-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Factory className="w-12 h-12 text-orange-300 mr-4" />
                <span className="text-orange-300 font-semibold">Manufacturing</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Manufacturing
                <span className="block text-orange-300">Financial Excellence</span>
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Specialized accounting and financial management services for manufacturing companies. 
                From cost accounting to regulatory compliance, we understand the complexities of manufacturing operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-orange-900 px-8 py-3 rounded-lg hover:bg-orange-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">Manufacturing Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Cost Accounting Mastery</h4>
                      <p className="text-orange-100 text-sm">Advanced costing methodologies for accurate product pricing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Inventory Optimization</h4>
                      <p className="text-orange-100 text-sm">Sophisticated inventory management and valuation systems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Regulatory Compliance</h4>
                      <p className="text-orange-100 text-sm">Navigate complex manufacturing regulations with confidence</p>
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
            {manufacturingStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
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
              Comprehensive Manufacturing Accounting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial services designed for the unique challenges of manufacturing operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-orange-600" />
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

      {/* Equipment & Asset Management */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Equipment & Asset Management
            </h2>
            <p className="text-xl text-gray-600">
              Specialized services for manufacturing equipment and capital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipmentServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
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
              Manufacturing Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common financial hurdles in manufacturing and our proven solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="border-l-4 border-red-400 pl-6 mb-6">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Challenge: {item.challenge}</h3>
                  </div>
                </div>
                <div className="border-l-4 border-green-400 pl-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Our Solution:</h4>
                  <p className="text-gray-600">{item.solution}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-orange-800 font-semibold">Impact: {item.impact}</p>
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
              Manufacturing Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our manufacturing clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
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

      {/* Manufacturing KPIs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Manufacturing Financial KPIs We Track
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for manufacturing success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Production Efficiency</h3>
              <p className="text-gray-600 text-sm">Capacity utilization and throughput metrics</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Inventory Turnover</h3>
              <p className="text-gray-600 text-sm">Raw materials and finished goods optimization</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Calculator className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Cost Per Unit</h3>
              <p className="text-gray-600 text-sm">Direct and indirect cost allocation analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Margin Analysis</h3>
              <p className="text-gray-600 text-sm">Product and process profitability insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Optimize Your Manufacturing Operations</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-orange-100">
            Partner with manufacturing accounting specialists who understand your industry's unique challenges. 
            Improve efficiency, reduce costs, and enhance profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-orange-900 px-8 py-3 rounded-lg hover:bg-orange-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Manufacturing Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ManufacturingServices