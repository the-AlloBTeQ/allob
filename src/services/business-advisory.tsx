import { Link } from 'react-router-dom';
import { 
  Lightbulb, TrendingUp, Target, Users, BarChart3, 
  CheckCircle, ArrowRight, Briefcase, Shield
} from 'lucide-react';

const BusinessAdvisoryServices = () => {
  const services = [
    {
      title: "Strategic Business Planning",
      description: "Develop comprehensive business strategies to achieve your growth objectives.",
      features: ["Business plan development", "Market analysis", "Financial forecasting", "Risk assessment"],
      icon: Target
    },
    {
      title: "Financial Analysis & Reporting",
      description: "In-depth financial analysis to guide critical business decisions.",
      features: ["Performance analysis", "Cash flow management", "Investment appraisal", "Profitability analysis"],
      icon: BarChart3
    },
    {
      title: "Business Structure Optimization",
      description: "Optimize your business structure for efficiency and tax benefits.",
      features: ["Entity selection", "Restructuring advice", "Succession planning", "Governance frameworks"],
      icon: Briefcase
    },
    {
      title: "Growth & Expansion Strategy",
      description: "Strategic guidance for scaling your business and entering new markets.",
      features: ["Market entry strategies", "Expansion planning", "Partnership structures", "Investment strategies"],
      icon: TrendingUp
    }
  ];

  const industries = [
    {
      name: "Technology",
      description: "Digital transformation and tech startup advisory",
      challenges: "Rapid scaling, funding, regulatory compliance"
    },
    {
      name: "Manufacturing",
      description: "Operational efficiency and supply chain optimization",
      challenges: "Cost management, quality control, automation"
    },
    {
      name: "Retail",
      description: "Customer experience and omnichannel strategies",
      challenges: "Digital integration, inventory management, customer retention"
    },
    {
      name: "Healthcare",
      description: "Regulatory compliance and operational excellence",
      challenges: "Compliance requirements, patient care optimization"
    },
    {
      name: "Professional Services",
      description: "Practice management and client relationship optimization",
      challenges: "Scaling expertise, client acquisition, efficiency"
    },
    {
      name: "Non-Profit",
      description: "Mission optimization and sustainable funding strategies",
      challenges: "Funding diversification, impact measurement, governance"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Business Assessment",
      description: "Comprehensive analysis of your current business position and challenges."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Create tailored strategies aligned with your goals and market conditions."
    },
    {
      step: 3,
      title: "Implementation Planning",
      description: "Develop detailed action plans with timelines and success metrics."
    },
    {
      step: 4,
      title: "Ongoing Support",
      description: "Regular monitoring, adjustment, and advisory support as you execute."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Strategic Business Advisory
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Expert guidance to navigate challenges, capitalize on opportunities, and drive sustainable 
                growth for your business in today's competitive landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking" 
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 font-semibold transition-colors inline-flex items-center"
                >
                  Strategic Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  to="/articles" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 font-semibold transition-colors"
                >
                  Business Insights
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Why Businesses Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Lightbulb className="w-6 h-6 mr-4 text-purple-200" />
                  <span>Strategic thinking and innovative solutions</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-4 text-purple-200" />
                  <span>Experienced advisors across industries</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-4 text-purple-200" />
                  <span>Proven track record of driving growth</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 mr-4 text-purple-200" />
                  <span>Risk mitigation and compliance focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Advisory Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive business advisory solutions to accelerate your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Specialized expertise across diverse business sectors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-purple-50 transition-colors group">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600">
                  {industry.name}
                </h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="text-sm text-purple-600 font-medium">
                  Key Challenges: {industry.challenges}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Advisory Process</h2>
            <p className="text-xl text-gray-600">A structured approach to business transformation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with our experienced advisors to unlock your business potential and achieve sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors"
            >
              Start Your Transformation
            </Link>
            <Link 
              to="/articles" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 font-semibold transition-colors"
            >
              Read Business Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessAdvisoryServices;