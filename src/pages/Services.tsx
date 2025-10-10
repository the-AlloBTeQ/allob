import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, FileText, Briefcase, CheckCircle, ArrowRight, Phone } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  features: string[]
  benefits: string[]
  pricing: string
}

const Services = () => {
  const [activeService, setActiveService] = useState('accounting')

  const services: Service[] = [
    {
      id: 'accounting',
      title: 'Accounting Services',
      description: 'Comprehensive accounting solutions to keep your business finances in perfect order and ensure regulatory compliance.',
      icon: Calculator,
      color: 'blue',
      pricing: 'From R2,500/month',
      features: [
        'Monthly Management Accounts',
        'Annual Financial Statements (AFS)',
        'Bookkeeping & Record Maintenance',
        'Cash Flow Management',
        'Financial Analysis & Reporting',
        'Payroll Administration',
        'Creditors & Debtors Management',
        'Bank Reconciliations'
      ],
      benefits: [
        'IFRS Compliant Reporting',
        'Real-time Financial Insights',
        'Improved Cash Flow Visibility',
        'Regulatory Compliance',
        'Professional Financial Statements',
        'Time Savings for Business Owners'
      ]
    },
    {
      id: 'tax',
      title: 'Tax Services',
      description: 'Expert tax planning and compliance services to optimize your tax position and ensure SARS compliance.',
      icon: FileText,
      color: 'green',
      pricing: 'From R1,500/return',
      features: [
        'Individual Income Tax Returns',
        'Corporate Tax Compliance',
        'VAT Registration & Returns',
        'PAYE Administration',
        'Tax Planning & Optimization',
        'SARS Correspondence & Disputes',
        'Provisional Tax Calculations',
        'Tax Clearance Certificates'
      ],
      benefits: [
        'Minimize Tax Liabilities',
        'Ensure SARS Compliance',
        'Strategic Tax Planning',
        'Penalty Avoidance',
        'Professional SARS Representation',
        'Optimized Tax Structures'
      ]
    },
    {
      id: 'advisory',
      title: 'Business Advisory',
      description: 'Strategic guidance to help your business grow and thrive in competitive markets with expert insights.',
      icon: Briefcase,
      color: 'purple',
      pricing: 'From R3,500/month',
      features: [
        'Business Strategy Development',
        'Financial Planning & Forecasting',
        'Performance Improvement',
        'Risk Management',
        'Mergers & Acquisitions',
        'Corporate Restructuring',
        'Business Valuations',
        'Due Diligence Services'
      ],
      benefits: [
        'Strategic Growth Planning',
        'Improved Profitability',
        'Risk Mitigation',
        'Market Expansion Support',
        'Investment Readiness',
        'Operational Efficiency'
      ]
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We start with a comprehensive assessment of your business needs and current financial position.'
    },
    {
      step: '02',
      title: 'Custom Solution Design',
      description: 'Our experts design a tailored service package that addresses your specific requirements.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'We implement our services with minimal disruption to your daily operations.'
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description: 'Continuous monitoring, reporting, and advisory support to ensure optimal results.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive accounting, tax, and business advisory solutions tailored 
              to help your business succeed and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of professional services designed 
              to meet all your business financial needs.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeService === service.id
                      ? 'bg-white text-blue-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Service Details */}
          {services.map((service) => (
            activeService === service.id && (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-8 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className={`bg-${service.color}-100 w-20 h-20 rounded-lg flex items-center justify-center mb-6`}>
                      <service.icon className={`w-10 h-10 text-${service.color}-600`} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3">Pricing</h4>
                      <p className="text-2xl font-bold text-green-600">{service.pricing}</p>
                      <p className="text-sm text-gray-500">*Pricing varies based on business size and complexity</p>
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-4">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-6">What's Included:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                          <h5 className="font-medium text-gray-900">{feature}</h5>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <Link
                        to="/checkout"
                        className={`w-full bg-${service.color}-600 text-white px-8 py-3 rounded-lg hover:bg-${service.color}-700 font-semibold transition-colors flex items-center justify-center`}
                      >
                        Get Started <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                      <a
                        href="tel:+270679211947"
                        className="w-full border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center justify-center"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call for Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              A streamlined approach to delivering exceptional professional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect package for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for small businesses and startups</p>
              <div className="text-3xl font-bold text-blue-600 mb-6">R3,500/month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Monthly Bookkeeping
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  VAT Returns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Basic Tax Advisory
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Email Support
                </li>
              </ul>
              <Link
                to="/checkout"
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold transition-colors text-center block"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Package */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-gray-600 mb-6">Comprehensive services for growing businesses</p>
              <div className="text-3xl font-bold text-blue-600 mb-6">R7,500/month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Full Accounting Services
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Tax Planning & Compliance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Management Accounts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Business Advisory
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Priority Phone Support
                </li>
              </ul>
              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors text-center block"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-6">Full-service solution for established companies</p>
              <div className="text-3xl font-bold text-blue-600 mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  All Professional Features
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Strategic Planning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  M&A Advisory
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Dedicated Account Manager
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  24/7 Support
                </li>
              </ul>
              <Link
                to="/checkout"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors text-center block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Let's discuss how our professional services can help transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="tel:+27679211947"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
              <svg
                className="w-5 h-5 mr-2 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.518 2.072a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.072.518A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"
                />
              </svg>
              Call or WhatsApp us Now: +27 67 921 1947
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services