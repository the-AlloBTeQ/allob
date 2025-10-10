import { Link } from 'react-router-dom';
import { 
  Zap, Cloud, Shield, Cog, 
  CheckCircle, ArrowRight, Cpu, Globe, Database
} from 'lucide-react';

const DigitalTransformationServices = () => {
  const services = [
    {
      title: "Digital Strategy Development",
      description: "Comprehensive digital roadmaps aligned with your business objectives.",
      features: ["Digital maturity assessment", "Technology roadmap", "Change management strategy", "ROI planning"],
      icon: Zap
    },
    {
      title: "Cloud Migration & Management",
      description: "Seamless transition to cloud-based solutions for improved efficiency and scalability.",
      features: ["Cloud readiness assessment", "Migration planning", "Security implementation", "Ongoing optimization"],
      icon: Cloud
    },
    {
      title: "Process Automation",
      description: "Streamline operations with intelligent automation solutions.",
      features: ["Workflow automation", "Document management", "Approval processes", "Integration solutions"],
      icon: Cog
    },
    {
      title: "Digital Security & Compliance",
      description: "Protect your digital assets with comprehensive security frameworks.",
      features: ["Cybersecurity assessment", "Compliance frameworks", "Data protection", "Risk mitigation"],
      icon: Shield
    }
  ];

  const solutions = [
    {
      name: "FynancKit",
      description: "Comprehensive financial management platform",
      features: ["Document management", "Invoice generation", "Financial reporting", "Compliance tracking"],
      status: "Early Access",
      color: "purple"
    },
    {
      name: "PAYE Calculator",
      description: "Advanced payroll tax calculations",
      features: ["Multi-income streams", "Real-time calculations", "Compliance updates", "Export capabilities"],
      status: "Live",
      color: "green"
    },
    {
      name: "ERP Suite",
      description: "Complete business management solution",
      features: ["Integrated modules", "Real-time analytics", "Mobile access", "Custom workflows"],
      status: "Coming Soon",
      color: "blue"
    }
  ];

  const transformationSteps = [
    {
      step: 1,
      title: "Assessment & Planning",
      description: "Evaluate current systems and develop transformation roadmap"
    },
    {
      step: 2,
      title: "Infrastructure Setup",
      description: "Implement foundational technology and security frameworks"
    },
    {
      step: 3,
      title: "System Migration",
      description: "Migrate data and processes to new digital platforms"
    },
    {
      step: 4,
      title: "Training & Adoption",
      description: "Ensure team readiness and successful technology adoption"
    },
    {
      step: 5,
      title: "Optimization",
      description: "Continuous improvement and performance optimization"
    }
  ];

  const benefits = [
    "Increased operational efficiency and productivity",
    "Reduced manual processes and human errors",
    "Enhanced data security and compliance",
    "Improved customer experience and satisfaction",
    "Better decision-making with real-time analytics",
    "Scalable solutions that grow with your business"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital Transformation Services
              </h1>
              <p className="text-xl mb-8 text-cyan-100">
                Modernize your business with cutting-edge digital solutions that drive efficiency, 
                enhance security, and position you for future growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking" 
                  className="bg-white text-cyan-600 px-8 py-3 rounded-lg hover:bg-cyan-50 font-semibold transition-colors inline-flex items-center"
                >
                  Start Your Transformation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="https://www.fynanckit.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-cyan-600 font-semibold transition-colors"
                >
                  Try FynancKit
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Digital Readiness Check</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Cloud Infrastructure</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full">
                    <div className="w-16 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Process Automation</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full">
                    <div className="w-12 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Analytics</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full">
                    <div className="w-8 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mobile Integration</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full">
                    <div className="w-20 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-cyan-200 text-sm mt-4">
                Assessment based on typical SME digital maturity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Digital Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital transformation services to modernize your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                      <IconComponent className="w-8 h-8 text-cyan-600" />
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

      {/* Our Digital Solutions */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Digital Products</h2>
            <p className="text-xl text-gray-600">Innovative tools built for modern businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{solution.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    solution.color === 'green' ? 'bg-green-100 text-green-800' :
                    solution.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {solution.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-sm">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        solution.color === 'green' ? 'bg-green-500' :
                        solution.color === 'purple' ? 'bg-purple-500' :
                        'bg-blue-500'
                      }`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Process */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transformation Process</h2>
            <p className="text-xl text-gray-600">A structured approach to digital modernization</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {transformationSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-cyan-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform Your Business Today
              </h2>
              <p className="text-gray-600 mb-8">
                Digital transformation isn't just about technology—it's about reimagining how 
                your business operates to deliver better outcomes for customers and stakeholders.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ready to Start?</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-cyan-600 text-white rounded-full p-3 mr-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Modern Technology</h4>
                    <p className="text-gray-600 text-sm">Latest tools and platforms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-cyan-600 text-white rounded-full p-3 mr-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Best Practices</h4>
                    <p className="text-gray-600 text-sm">Proven methodologies and frameworks</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-cyan-600 text-white rounded-full p-3 mr-4">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data-Driven Insights</h4>
                    <p className="text-gray-600 text-sm">Analytics and intelligence capabilities</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="mt-6 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors inline-flex items-center"
              >
                Begin Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Future-Proof Your Business</h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't let outdated processes hold you back. Start your digital transformation journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 font-semibold transition-colors"
            >
              Schedule Assessment
            </Link>
            <a 
              href="https://www.fynanckit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 font-semibold transition-colors"
            >
              Explore FynancKit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalTransformationServices;