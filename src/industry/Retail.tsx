import { Link } from 'react-router-dom'
import { 
  ShoppingCart, Globe, CreditCard, BarChart3, Users,
  Package, TrendingUp, DollarSign, CheckCircle, ArrowRight 
} from 'lucide-react'

const RetailServices = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: "Multi-Channel Revenue Management",
      description: "Comprehensive revenue tracking and reconciliation across online, in-store, and marketplace channels.",
      features: [
        "Omnichannel sales integration",
        "Marketplace revenue consolidation",
        "POS system integration",
        "Real-time revenue reporting"
      ]
    },
    {
      icon: Package,
      title: "Inventory Optimization",
      description: "Advanced inventory management across multiple channels with real-time tracking and valuation.",
      features: [
        "Multi-location inventory tracking",
        "Dropshipping accounting",
        "Seasonal inventory planning",
        "Dead stock analysis and writeoffs"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Processing & Reconciliation",
      description: "Streamlined payment processing accounting for multiple payment methods and platforms.",
      features: [
        "Payment gateway reconciliation",
        "Credit card processing fees",
        "Refund and chargeback management",
        "Cash flow optimization"
      ]
    },
    {
      icon: Globe,
      title: "VAT & Sales Tax Compliance",
      description: "Navigate complex VAT requirements across multiple jurisdictions and sales channels.",
      features: [
        "Multi-jurisdiction VAT compliance",
        "Digital services VAT",
        "Cross-border sales tax",
        "Automated tax calculation"
      ]
    },
    {
      icon: BarChart3,
      title: "Customer Analytics & Profitability",
      description: "Advanced customer segmentation and profitability analysis for data-driven decision making.",
      features: [
        "Customer lifetime value analysis",
        "Channel profitability insights",
        "Product margin analysis",
        "Customer acquisition cost tracking"
      ]
    },
    {
      icon: TrendingUp,
      title: "Seasonal Cash Flow Management",
      description: "Strategic cash flow planning for seasonal businesses and promotional periods.",
      features: [
        "Seasonal forecasting models",
        "Working capital optimization",
        "Promotional ROI analysis",
        "Supplier payment scheduling"
      ]
    }
  ]

  const challenges = [
    {
      challenge: "Multi-Channel Complexity",
      solution: "We integrate all your sales channels into a unified accounting system, providing consolidated reporting and eliminating manual reconciliation work.",
      impact: "90% reduction in reconciliation time and improved financial accuracy"
    },
    {
      challenge: "Inventory Management Across Channels",
      solution: "Real-time inventory tracking systems that sync across all sales channels, preventing overselling and optimizing stock levels.",
      impact: "Reduced stockouts by 40% and improved inventory turnover"
    },
    {
      challenge: "Complex Tax Compliance",
      solution: "Automated tax calculation and filing systems that handle VAT, sales tax, and cross-border compliance requirements.",
      impact: "100% tax compliance with 60% reduction in preparation time"
    },
    {
      challenge: "Seasonal Cash Flow Volatility",
      solution: "Predictive cash flow models and strategic financial planning to smooth seasonal variations and optimize working capital.",
      impact: "Improved cash flow predictability and reduced financing costs"
    }
  ]

  const caseStudies = [
    {
      title: "Fashion E-commerce Growth",
      industry: "Fashion Retail",
      challenge: "Fast-growing online fashion retailer struggled with inventory management across multiple platforms and seasonal cash flow.",
      solution: "Implemented integrated inventory system with seasonal forecasting and automated VAT compliance across EU markets.",
      result: "50% reduction in inventory discrepancies and successful expansion to 5 new European markets."
    },
    {
      title: "Multi-Store Restaurant Chain",
      industry: "Food & Beverage Retail",
      challenge: "Restaurant chain needed consolidated reporting across 15 locations with complex cost allocation and labor management.",
      solution: "Centralized accounting system with location-based profitability analysis and automated cost allocation.",
      result: "Identified underperforming locations and improved overall profitability by 25%."
    },
    {
      title: "Electronics Marketplace Success",
      industry: "Electronics Retail",
      challenge: "Electronics retailer selling on multiple marketplaces faced complex fee structures and payment reconciliation issues.",
      solution: "Automated marketplace fee allocation and payment reconciliation system with real-time profitability tracking.",
      result: "Improved margin visibility by 60% and reduced accounting overhead by 40%."
    }
  ]

  // const retailStats = [
  //   { number: '60+', label: 'Retail Clients' },
  //   { number: '15+', label: 'E-commerce Platforms' },
  //   { number: '98%', label: 'Tax Compliance Rate' },
  //   { number: 'R75M+', label: 'Revenue Processed' }
  // ]

  const ecommerceTools = [
    {
      title: "Shopify Integration",
      description: "Seamless integration with Shopify for automated transaction sync and inventory management.",
      features: ["Real-time sync", "Order reconciliation", "Tax automation"]
    },
    {
      title: "Amazon & Marketplace",
      description: "Specialized accounting for Amazon FBA, eBay, and other marketplace sales.",
      features: ["Fee allocation", "FBA cost tracking", "Multi-marketplace reporting"]
    },
    {
      title: "WooCommerce & WordPress",
      description: "Custom integrations for WooCommerce and WordPress-based e-commerce sites.",
      features: ["Plugin compatibility", "Custom reporting", "Payment gateway sync"]
    },
    {
      title: "Point of Sale Systems",
      description: "Integration with major POS systems for unified omnichannel reporting.",
      features: ["Real-time sync", "Multi-location support", "Inventory integration"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <ShoppingCart className="w-12 h-12 text-purple-300 mr-4" />
                <span className="text-purple-300 font-semibold">Retail & E-commerce</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Retail Financial
                <span className="block text-purple-300">Solutions</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Comprehensive accounting and financial management for retail businesses, e-commerce stores, 
                and omnichannel operations. Navigate complex multi-channel sales with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-purple-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">Retail Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Omnichannel Integration</h4>
                      <p className="text-purple-100 text-sm">Unified accounting across all sales channels</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Inventory Optimization</h4>
                      <p className="text-purple-100 text-sm">Advanced inventory management and forecasting</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Tax Compliance</h4>
                      <p className="text-purple-100 text-sm">Multi-jurisdiction VAT and sales tax expertise</p>
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
            {retailStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
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
              Comprehensive Retail Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial solutions for modern retail and e-commerce operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-purple-600" />
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

      {/* E-commerce Platform Integration */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              E-commerce Platform Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Seamless integration with all major e-commerce platforms and marketplaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecommerceTools.map((tool, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{tool.description}</p>
                
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
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
              Retail Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common retail and e-commerce financial challenges and our proven solutions
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
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-800 font-semibold">Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies 
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Retail Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our retail and e-commerce clients
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

      {/* Retail KPIs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Retail Performance Metrics We Track
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for retail success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Revenue Per Channel</h3>
              <p className="text-gray-600 text-sm">Track performance across all sales channels</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Inventory Turnover</h3>
              <p className="text-gray-600 text-sm">Optimize stock levels and reduce carrying costs</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Customer LTV</h3>
              <p className="text-gray-600 text-sm">Lifetime value and acquisition cost analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Gross Margins</h3>
              <p className="text-gray-600 text-sm">Product and category profitability insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Grow Your Retail Business</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Partner with retail accounting experts who understand omnichannel operations. 
            Streamline your finances and focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-purple-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Retail Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RetailServices