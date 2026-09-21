import { Link } from 'react-router-dom'
import {
  Truck, FileCheck, Calculator, Globe, Shield, TrendingUp,
  Package, CheckCircle, ArrowRight, AlertTriangle
} from 'lucide-react'

const ImportExportServices = () => {
  const services = [
    {
      icon: FileCheck,
      title: "Customs Registration & Licensing",
      description: "We handle SARS customs client registration and import/export licence applications, so your business is cleared to trade.",
      features: [
        "SARS customs client registration",
        "Import and export licence applications",
        "Trader registration and code allocation",
        "Controlled goods permit support"
      ]
    },
    {
      icon: Calculator,
      title: "Customs Duty & Accounting",
      description: "Accurate accounting for customs duties, VAT on imports, and landed cost calculations.",
      features: [
        "Customs duty calculation and accrual",
        "Import VAT accounting",
        "Landed cost analysis",
        "Duty rebate and drawback claims"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Currency Accounting",
      description: "Financial management for businesses transacting in multiple currencies across borders.",
      features: [
        "Foreign currency transaction accounting",
        "Exchange rate exposure tracking",
        "Multi-currency reconciliation",
        "Forward cover accounting support"
      ]
    },
    {
      icon: Shield,
      title: "International Tax Compliance",
      description: "Navigate cross-border tax obligations for import/export operations.",
      features: [
        "Cross-border transaction tax treatment",
        "Transfer pricing considerations",
        "Double taxation agreement guidance",
        "SARS international trade reporting"
      ]
    },
    {
      icon: TrendingUp,
      title: "Trade Finance Advisory",
      description: "Guidance on financing structures for import/export operations and working capital cycles.",
      features: [
        "Letters of credit accounting",
        "Trade finance facility structuring support",
        "Working capital cycle analysis",
        "Supplier and buyer credit terms review"
      ]
    },
    {
      icon: Package,
      title: "Supply Chain & Logistics Accounting",
      description: "Financial tracking across the import/export supply chain, from procurement to delivery.",
      features: [
        "Freight and logistics cost allocation",
        "Inventory in transit accounting",
        "Incoterms cost impact analysis",
        "Supplier and freight forwarder reconciliation"
      ]
    }
  ]

  const challenges = [
    {
      challenge: "Customs & Duties Accounting",
      solution: "We manage customs duty calculations, import VAT, and landed cost accounting, so your margins reflect the true cost of goods.",
      impact: "Accurate product costing and fewer surprises at customs clearance"
    },
    {
      challenge: "Multi-Currency Transactions",
      solution: "Our multi-currency accounting systems track foreign currency exposure and reconcile transactions across suppliers and currencies.",
      impact: "Clearer visibility into currency risk and more reliable reporting"
    },
    {
      challenge: "International Tax Compliance",
      solution: "We help you understand the tax treatment of cross-border transactions and keep your SARS trade reporting up to date.",
      impact: "Reduced compliance risk on cross-border transactions"
    },
    {
      challenge: "Trade Finance Management",
      solution: "We review your trade finance facilities and credit terms to support healthier working capital cycles.",
      impact: "Better-managed cash flow across the import/export cycle"
    }
  ]

  const complianceServices = [
    {
      title: "Customs Registration",
      description: "Registration with SARS Customs as an importer or exporter, including code allocation and licence applications for controlled goods.",
      benefits: ["SARS customs client registration", "Import/export licence applications", "Controlled goods permit support"]
    },
    {
      title: "Trade Documentation",
      description: "Support with the financial and compliance documentation that keeps shipments moving through customs.",
      benefits: ["Bill of entry review support", "Certificate of origin guidance", "Documentation record-keeping"]
    },
    {
      title: "Ongoing Compliance",
      description: "Keeping your business up to date as customs regulations, tariff codes, and licence conditions change.",
      benefits: ["Tariff code monitoring", "Regulatory update guidance", "Licence renewal tracking"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-900 via-sky-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Truck className="w-12 h-12 text-cyan-300 mr-4" />
                <span className="text-cyan-300 font-semibold">Import/Export</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Import/Export
                <span className="block text-cyan-300">Trade & Customs Advisory</span>
              </h1>
              <p className="text-xl text-cyan-100 mb-8">
                Specialized accounting and compliance support for import/export businesses. From customs
                registration and licensing to multi-currency accounting, we understand the complexities of
                international trade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-cyan-900 px-8 py-3 rounded-lg hover:bg-cyan-50 font-semibold transition-colors flex items-center justify-center"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/service-inquiry?industry=import-export"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
                >
                  Customs & Trade Advisory
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Import/Export Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Customs Registration & Licensing</h4>
                      <p className="text-cyan-100 text-sm">We offer customs registration and have completed import and export licence registrations for clients</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Multi-Currency Accounting</h4>
                      <p className="text-cyan-100 text-sm">Financial management across currencies, suppliers, and trade finance facilities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Regulatory Compliance</h4>
                      <p className="text-cyan-100 text-sm">Navigate customs and cross-border tax requirements with confidence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Import/Export Accounting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial and compliance services designed for the unique challenges of international trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-cyan-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-cyan-600" />
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

      {/* Customs & Licensing Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Customs Registration & Licensing
            </h2>
            <p className="text-xl text-gray-600">
              We offer customs registration and have completed import and export licence registrations for clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
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
              Import/Export Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common financial hurdles in international trade and our proven solutions
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
                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-cyan-800 font-semibold">Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Trade With Confidence</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-cyan-100">
            Partner with import/export accounting specialists who understand customs, licensing, and
            cross-border compliance. Let us handle the complexity so you can focus on trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-cyan-900 px-8 py-3 rounded-lg hover:bg-cyan-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/service-inquiry?industry=import-export"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Customs & Trade Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ImportExportServices
