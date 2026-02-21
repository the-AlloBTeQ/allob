import { Link } from 'react-router-dom'
import { 
  Monitor, Factory, ShoppingCart, Briefcase, Heart, 
  HardHat, Truck, Users, Building, Zap, ArrowRight 
} from 'lucide-react'
import SEO from '../components/SEO';

<SEO
  title="Industries We Serve"
  description="AlloB Consultants serves clients across multiple industries in South Africa including retail, manufacturing, technology, healthcare, agriculture, and professional services."
  keywords="industries served, accounting for retail, manufacturing advisory, healthcare consulting South Africa"
  canonical="/industries"
/>

interface Industry {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  challenges: string[]
  solutions: string[]
  caseStudy?: {
    title: string
    description: string
    result: string
  }
  link: string
}

const Industries = () => {
  const industries: Industry[] = [
    {
      id: 'technology',
      name: 'Technology & Software',
      icon: Monitor,
      description: 'Serving tech startups, software companies, and digital service providers with specialized accounting and tax solutions.',
      challenges: [
        'Complex revenue recognition for SaaS models',
        'R&D tax incentives and deductions',
        'Stock option accounting',
        'International tax compliance for global operations'
      ],
      solutions: [
        'SaaS revenue recognition expertise',
        'R&D tax credit optimization',
        'Equity compensation planning',
        'Multi-jurisdiction tax compliance'
      ],
      caseStudy: {
        title: 'Software Startup Growth',
        description: 'Helped a fintech startup structure their accounting for SaaS revenue and prepare for Series A funding.',
        result: 'Secured Series A funding and improved financial reporting accuracy.'
      },
      link: '/industries/tech'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      description: 'Supporting manufacturers with cost accounting, inventory management, and supply chain financial optimization.',
      challenges: [
        'Complex inventory valuation',
        'Cost center accounting',
        'Regulatory compliance',
        'Supply chain cost management'
      ],
      solutions: [
        'Advanced cost accounting systems',
        'Inventory management optimization',
        'Compliance monitoring',
        'Supply chain financial analysis'
      ],
      link: '/industries/manufacturing'
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: ShoppingCart,
      description: 'Helping retail businesses and e-commerce companies manage multi-channel operations and complex sales tax.',
      challenges: [
        'Multi-channel inventory tracking',
        'Sales tax across jurisdictions',
        'Seasonal cash flow management',
        'Customer acquisition cost analysis'
      ],
      solutions: [
        'Integrated POS and accounting systems',
        'Automated sales tax compliance',
        'Cash flow forecasting',
        'Customer profitability analysis'
      ],
      link: '/industries/retail'
    },
    {
      id: 'professional',
      name: 'Professional Services',
      icon: Briefcase,
      description: 'Providing specialized services to law firms, consulting companies, and other professional service providers.',
      challenges: [
        'Time-based billing and project accounting',
        'Trust account management',
        'Professional indemnity considerations',
        'Partner distributions and equity'
      ],
      solutions: [
        'Project-based accounting systems',
        'Trust account compliance',
        'Risk management advisory',
        'Partnership accounting expertise'
      ],
      link: '/industries/professional'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      description: 'Supporting healthcare providers with specialized compliance, billing, and financial management needs.',
      challenges: [
        'Healthcare regulation compliance',
        'Medical aid billing complexity',
        'Professional licensing requirements',
        'Equipment financing and depreciation'
      ],
      solutions: [
        'Healthcare compliance monitoring',
        'Medical aid reconciliation',
        'Professional licensing tracking',
        'Equipment financing optimization'
      ],
      link: '/industries/healthcare'
    },
    {
      id: 'construction',
      name: 'Construction',
      icon: HardHat,
      description: 'Helping construction companies with project accounting, progress billing, and equipment asset management.',
      challenges: [
        'Project-based accounting',
        'Progress billing and revenue recognition',
        'Equipment asset management',
        'Subcontractor management'
      ],
      solutions: [
        'Project accounting systems',
        'Progress billing automation',
        'Asset tracking and depreciation',
        'Subcontractor payment management'
      ],
      link: '/industries/construction'
    },
    {
      id: 'import-export',
      name: 'Import/Export',
      icon: Truck,
      description: 'Specialized services for import/export businesses dealing with international trade and customs compliance.',
      challenges: [
        'Customs and duties accounting',
        'Multi-currency transactions',
        'International tax compliance',
        'Trade finance management'
      ],
      solutions: [
        'Customs duty optimization',
        'Multi-currency accounting',
        'International tax planning',
        'Trade finance advisory'
      ],
      link: '/industries/import-export'
    },
    {
      id: 'nonprofit',
      name: 'Non-Profit Organizations',
      icon: Users,
      description: 'Supporting NPOs and NGOs with specialized reporting, donor management, and regulatory compliance.',
      challenges: [
        'Donor fund restrictions',
        'NPO regulatory compliance',
        'Grant reporting requirements',
        'Tax-exempt status maintenance'
      ],
      solutions: [
        'Fund accounting systems',
        'NPO compliance monitoring',
        'Grant reporting automation',
        'Tax-exempt advisory services'
      ],
      link: '/industries/npo'
    }
  ]

  const stats = [
    { number: '8+', label: 'Industries Served' },
    { number: '50+', label: 'Active Clients' },
    { number: '98%', label: 'Client Retention' },
    { number: '100+', label: 'Projects Completed' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized expertise across diverse business sectors, with deep understanding 
              of industry-specific challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sector Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that each industry has unique financial challenges. Our specialized 
              knowledge helps us provide targeted solutions that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div key={industry.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <industry.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{industry.name}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Challenges:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {industry.challenges.slice(0, 2).map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Solutions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {industry.solutions.slice(0, 2).map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {industry.caseStudy && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">{industry.caseStudy.title}</h4>
                    <p className="text-sm text-blue-800 mb-2">{industry.caseStudy.description}</p>
                    <p className="text-sm font-medium text-green-700">{industry.caseStudy.result}</p>
                  </div>
                )}

                <Link
                  to={industry.link}
                  className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Common focus areas across all industries we serve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compliance</h3>
              <p className="text-gray-600">Industry-specific regulatory compliance and reporting requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Optimization</h3>
              <p className="text-gray-600">Tax optimization strategies tailored to industry-specific opportunities.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Technology</h3>
              <p className="text-gray-600">Modern accounting systems and digital solutions for each industry.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advisory</h3>
              <p className="text-gray-600">Strategic business advice based on industry trends and benchmarks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results across different sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tech Startup Success</h3>
              <p className="text-gray-600 mb-4">
                Helped a SaaS startup implement proper revenue recognition and prepare for investor due diligence.
              </p>
              <div className="text-green-600 font-bold">Result: Successful R15M Series A funding</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Factory className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Manufacturing Efficiency</h3>
              <p className="text-gray-600 mb-4">
                Streamlined cost accounting processes for a manufacturing company, improving margin visibility.
              </p>
              <div className="text-green-600 font-bold">Result: 25% improvement in cost visibility</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Retail Growth</h3>
              <p className="text-gray-600 mb-4">
                Implemented multi-channel inventory tracking for a retail chain expanding into e-commerce.
              </p>
              <div className="text-green-600 font-bold">Result: 40% reduction in inventory discrepancies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Is Your Industry Listed?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Don't see your industry? We work with businesses across all sectors. 
            Contact us to discuss how we can support your specific industry needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              Discuss Your Industry
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Industries