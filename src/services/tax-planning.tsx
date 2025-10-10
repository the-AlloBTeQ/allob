import { Link } from 'react-router-dom';
import { 
  Calculator, FileText, TrendingUp, Shield, Clock, 
  CheckCircle, ArrowRight, Users, DollarSign, BarChart3
} from 'lucide-react';

const AccountingServices = () => {
  const services = [
    {
      title: "Bookkeeping & Financial Records",
      description: "Comprehensive bookkeeping services to maintain accurate financial records and ensure compliance.",
      features: ["Daily transaction recording", "Bank reconciliation", "Accounts payable/receivable", "Financial statements preparation"],
      icon: FileText
    },
    {
      title: "Management Accounting",
      description: "Strategic financial insights to help you make informed business decisions.",
      features: ["Cost analysis", "Budget preparation", "Variance analysis", "Performance reporting"],
      icon: BarChart3
    },
    {
      title: "Financial Statement Preparation",
      description: "Professional preparation of comprehensive financial statements for stakeholders.",
      features: ["Annual financial statements", "IFRS compliance", "Audit support", "Investor reporting"],
      icon: TrendingUp
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure your business meets all regulatory requirements and filing deadlines.",
      features: ["CIPC annual returns", "SARS compliance", "Industry-specific regulations", "Deadline management"],
      icon: Shield
    }
  ];

  const benefits = [
    "Accurate financial records for better decision making",
    "Reduced compliance risks and penalties",
    "Time savings to focus on core business activities",
    "Professional financial reporting for stakeholders",
    "Expert guidance on accounting best practices",
    "Scalable solutions that grow with your business"
  ];

  const process = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "We assess your current accounting needs and business requirements."
    },
    {
      step: 2,
      title: "System Setup",
      description: "Implementation of appropriate accounting systems and processes."
    },
    {
      step: 3,
      title: "Ongoing Support",
      description: "Regular bookkeeping, reporting, and advisory services."
    },
    {
      step: 4,
      title: "Review & Optimize",
      description: "Periodic review and optimization of accounting processes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Accounting Services
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Comprehensive accounting solutions to keep your business financially healthy and compliant. 
                From bookkeeping to financial reporting, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors inline-flex items-center"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  to="/paye-calculator" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 font-semibold transition-colors"
                >
                  Try Our PAYE Calculator
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="font-semibold text-lg">Expert Team</h3>
                    <p className="text-blue-200">Qualified accountants</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="font-semibold text-lg">Timely Service</h3>
                    <p className="text-blue-200">Never miss deadlines</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="font-semibold text-lg">Dedicated Support</h3>
                    <p className="text-blue-200">Personal attention</p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="font-semibold text-lg">Cost-Effective</h3>
                    <p className="text-blue-200">Affordable solutions</p>
                  </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Accounting Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive accounting solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
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

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Accounting Services?
              </h2>
              <p className="text-gray-600 mb-8">
                Partner with AlloB Consultants for reliable, professional accounting services 
                that help your business thrive while ensuring full compliance.
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get Started Today</h3>
              <p className="text-gray-600 mb-6">
                Ready to streamline your accounting processes? Contact us for a free consultation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <span className="text-gray-700">Free initial consultation</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <span className="text-gray-700">Customized service proposal</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <span className="text-gray-700">Seamless implementation</span>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple, efficient, and tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
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
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Accounting?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let our expert team handle your accounting so you can focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 font-semibold transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountingServices;