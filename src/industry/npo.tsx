import { Link } from 'react-router-dom'
import { 
  Users, Heart, FileText, Shield, DollarSign, BarChart3,
  Globe, Building, CheckCircle, ArrowRight, Gift
} from 'lucide-react'

const NPOServices = () => {
  const services = [
    {
      icon: DollarSign,
      title: "Fund Accounting & Restrictions",
      description: "Specialized fund accounting systems to track restricted and unrestricted funds with donor compliance requirements.",
      features: [
        "Restricted fund management",
        "Donor designation tracking",
        "Fund balance reporting",
        "Compliance monitoring"
      ]
    },
    {
      icon: FileText,
      title: "Grant Management & Reporting",
      description: "Comprehensive grant tracking, compliance reporting, and donor stewardship management systems.",
      features: [
        "Grant application support",
        "Compliance reporting automation",
        "Performance indicator tracking",
        "Donor stewardship programs"
      ]
    },
    {
      icon: Shield,
      title: "NPO Regulatory Compliance",
      description: "Navigate complex NPO regulations, tax-exempt status maintenance, and regulatory reporting requirements.",
      features: [
        "Section 18A certification",
        "PBO status maintenance",
        "Annual return compliance",
        "SARS NPO submissions"
      ]
    },
    {
      icon: BarChart3,
      title: "Impact Measurement & Reporting",
      description: "Develop systems to measure, track, and report on organizational impact and outcomes for stakeholders.",
      features: [
        "Impact framework development",
        "Outcome measurement systems",
        "Social return on investment",
        "Stakeholder reporting"
      ]
    },
    {
      icon: Users,
      title: "Donor Management & Stewardship",
      description: "Comprehensive donor database management, gift processing, and relationship stewardship systems.",
      features: [
        "Donor database management",
        "Gift processing automation",
        "Donation receipt generation",
        "Donor analytics and segmentation"
      ]
    },
    {
      icon: Building,
      title: "Operational Efficiency",
      description: "Optimize operational costs, improve program efficiency, and maximize funds available for mission delivery.",
      features: [
        "Cost allocation strategies",
        "Program efficiency analysis",
        "Administrative cost optimization",
        "Resource allocation planning"
      ]
    }
  ]

  const npoTypes = [
    {
      title: "Charitable Organizations",
      icon: Heart,
      description: "Welfare, education, and community development organizations",
      services: ["Section 18A compliance", "Donor management", "Impact reporting", "Fund accounting"]
    },
    {
      title: "Development NGOs",
      icon: Globe,
      description: "International and community development organizations",
      services: ["Grant management", "Multi-currency accounting", "Compliance reporting", "Impact measurement"]
    },
    {
      title: "Faith-Based Organizations",
      icon: Building,
      description: "Religious and faith-based charitable organizations",
      services: ["Religious organization accounting", "Tithe management", "Property accounting", "Tax exemption"]
    },
    {
      title: "Advocacy Organizations",
      icon: Users,
      description: "Human rights, advocacy, and social justice organizations",
      services: ["Campaign accounting", "Advocacy compliance", "Public benefit reporting", "Transparency requirements"]
    }
  ]

  const challenges = [
    {
      challenge: "Complex Fund Restrictions",
      solution: "We implement sophisticated fund accounting systems that automatically track donor restrictions, ensure compliance with fund purposes, and provide clear reporting on fund utilization.",
      impact: "100% donor compliance with transparent fund utilization reporting"
    },
    {
      challenge: "Grant Compliance Requirements",
      solution: "Automated grant tracking and reporting systems that monitor compliance requirements, track deliverables, and generate required reports for funders.",
      impact: "Zero grant compliance issues with 50% reduction in reporting preparation time"
    },
    {
      challenge: "Tax-Exempt Status Maintenance",
      solution: "Comprehensive compliance monitoring that tracks all requirements for maintaining NPO and PBO status, with automated alerts for critical deadlines.",
      impact: "Maintained tax-exempt status with proactive compliance management"
    },
    {
      challenge: "Impact Measurement & Reporting",
      solution: "Develop custom impact measurement frameworks that align with organizational mission and provide meaningful data for stakeholders and funders.",
      impact: "Enhanced stakeholder confidence and improved funding success rates"
    }
  ]

  const caseStudies = [
    {
      title: "Education Foundation Growth",
      industry: "Education NPO",
      challenge: "Education foundation managing R50M+ in scholarships needed better fund tracking and donor stewardship systems.",
      solution: "Implemented comprehensive fund accounting system with automated donor reporting and scholarship tracking.",
      result: "Increased donor retention by 40% and successfully launched new R20M endowment fund."
    },
    {
      title: "Community Development Success",
      industry: "Community Development",
      challenge: "Community NGO with multiple grant funders struggled with complex reporting requirements and impact measurement.",
      solution: "Developed integrated grant management system with automated compliance reporting and impact tracking.",
      result: "Secured 3 new major grants totaling R15M through improved reporting and demonstrated impact."
    },
    {
      title: "Healthcare NPO Optimization",
      industry: "Healthcare NPO",
      challenge: "Healthcare NPO needed to optimize operational costs while maintaining service quality and demonstrating impact.",
      solution: "Implemented cost allocation system with program efficiency analysis and impact measurement framework.",
      result: "Reduced administrative costs by 25% while expanding service delivery by 30%."
    }
  ]


  const complianceAreas = [
    {
      title: "NPO Registration",
      description: "Non-Profit Organization registration and maintenance",
      items: ["NPO Act compliance", "Annual reporting", "Constitutional compliance"]
    },
    {
      title: "PBO Status",
      description: "Public Benefit Organization tax exemption",
      items: ["Section 30 exemption", "Income tax compliance", "VAT exemption management"]
    },
    {
      title: "Section 18A",
      description: "Tax deductible donation certification",
      items: ["18A certificate applications", "Donor receipt compliance", "Audit requirements"]
    },
    {
      title: "Governance",
      description: "Board governance and fiduciary responsibility",
      items: ["Board reporting", "Fiduciary compliance", "Transparency requirements"]
    }
  ]

  const fundingTypes = [
    {
      title: "Grant Funding",
      description: "Government and foundation grant management",
      features: ["Application support", "Compliance tracking", "Reporting automation"]
    },
    {
      title: "Individual Donations",
      description: "Private donor management and stewardship",
      features: ["Donor database", "Receipt generation", "Stewardship programs"]
    },
    {
      title: "Corporate Partnerships",
      description: "Corporate social responsibility partnerships",
      features: ["Partnership agreements", "CSR reporting", "Impact demonstration"]
    },
    {
      title: "Fundraising Events",
      description: "Event-based fundraising management",
      features: ["Event accounting", "Sponsorship tracking", "ROI analysis"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-12 h-12 text-green-300 mr-4" />
                <span className="text-green-300 font-semibold">Non-Profit Organizations</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                NPO Financial
                <span className="block text-green-300">Management</span>
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Specialized accounting and financial services for non-profit organizations, NGOs, 
                and charitable institutions. Maximize impact through efficient financial management, 
                compliance excellence, and transparent reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-green-900 px-8 py-3 rounded-lg hover:bg-green-50 font-semibold transition-colors flex items-center justify-center"
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
                <h3 className="text-2xl font-bold mb-6">NPO Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Fund Accounting</h4>
                      <p className="text-green-100 text-sm">Specialized tracking of restricted and unrestricted funds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Grant Management</h4>
                      <p className="text-green-100 text-sm">Comprehensive grant tracking and compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Tax Exemption</h4>
                      <p className="text-green-100 text-sm">Maintain NPO and PBO status compliance</p>
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
            {npoStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* NPO Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              NPO Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across different non-profit organization types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {npoTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-6 h-6 text-green-600" />
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
              Comprehensive NPO Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial solutions for non-profit organizations and NGOs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-green-600" />
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

      {/* Funding Management */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funding Source Management
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive management across all funding types and donor relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fundingTypes.map((funding, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">{funding.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{funding.description}</p>
                
                <ul className="space-y-2">
                  {funding.features.map((feature, idx) => (
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

      {/* Compliance Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              NPO Compliance Management
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive compliance support across all NPO regulatory requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              NPO Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Common challenges facing non-profit organizations and our proven solutions
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
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">Impact: {item.impact}</p>
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
              NPO Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our non-profit organization clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
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

      {/* NPO KPIs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              NPO Performance Metrics We Monitor
            </h2>
            <p className="text-xl text-gray-600">
              Key performance indicators essential for non-profit success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Program Efficiency</h3>
              <p className="text-gray-600 text-sm">Percentage of funds used for programs vs administration</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Impact Measurement</h3>
              <p className="text-gray-600 text-sm">Outcome tracking and social return on investment</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Donor Retention</h3>
              <p className="text-gray-600 text-sm">Donor loyalty and lifetime value analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Grant Success</h3>
              <p className="text-gray-600 text-sm">Application success rates and compliance tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Maximize Your Impact</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
            Partner with NPO accounting specialists who understand your mission. 
            Ensure compliance, optimize operations, and demonstrate impact to stakeholders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-900 px-8 py-3 rounded-lg hover:bg-green-50 font-semibold transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/tax-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              NPO Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NPOServices