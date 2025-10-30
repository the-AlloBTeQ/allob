import { useState, useEffect } from 'react';
import { 
  Calculator, FileText, Award, Users, Target, ArrowRight, 
  ChevronLeft, ChevronRight, Play, Pause
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [serviceIndex, setServiceIndex] = useState(0);

  // Stats data
  const stats = [
    { label: 'Years of Experience', value: '8+', icon: Award },
    { label: 'Served Clients', value: '100+', icon: Users },
    { label: 'Tax Returns Filed', value: '75+', icon: FileText },
    { label: 'Client Satisfaction', value: '98%', icon: Target }
  ];

  // Main services data
  const mainServices = [
    {
      title: 'Accounting Services',
      description: 'Comprehensive accounting solutions from bookkeeping to financial statements, management accounts, and regulatory compliance for businesses of all sizes.',
      features: ['Monthly Management Accounts', 'Annual Financial Statements (AFS)', 'Bookkeeping & Record Maintenance', 'Payroll Administration'],
      color: 'blue',
      pricing: 'From R2,500/month',
      link: '/services/accounting'
    },
    {
      title: 'Tax Services', 
      description: 'Expert tax planning and compliance to optimize your tax position and ensure SARS compliance. Specializing in individual and corporate tax solutions.',
      features: ['Individual Income Tax Returns', 'Corporate Tax Compliance', 'VAT Registration & Returns', 'PAYE Administration'],
      color: 'green',
      pricing: 'From R1,500/return',
      link: '/services/payroll'
    },
    {
      title: 'Business Advisory',
      description: 'Strategic guidance to help your business grow and thrive in competitive markets with expert financial insights and planning.',
      features: ['Business Strategy Development', 'Financial Planning & Forecasting', 'Risk Management', 'Mergers & Acquisitions'],
      color: 'purple',
      pricing: 'From R3,500/month',
      link: '/services/business-advisory'
    }
  ];

  // Insight carousels data
  const insightCarousels = [
    {
      title: 'Accounting Insight',
      items: [
        'Monthly Management Accounts Best Practices',
        'Cash Flow Optimization for SMEs',
        'IFRS Compliance Simplified',
        'Annual Financial Statement Preparation',
        'Payroll Administration Efficiency'
      ]
    },
    {
      title: 'Tax Insight',
      items: [
        'SARS Compliance Updates 2025',
        'Individual vs Corporate Tax Planning',
        'VAT Registration Benefits',
        'PAYE Multi-Income Stream Planning',
        'Provisional Tax Calculation Tips'
      ]
    },
    {
      title: 'Business Advisory Insight',
      items: [
        'Strategic Business Planning Framework',
        'Financial Forecasting Methods',
        'Risk Management for Growing Businesses',
        'M&A Due Diligence Essentials',
        'Business Valuation Techniques'
      ]
    }
  ];

  // Tools data
  const tools = [
    {
      category: 'Accounting Tools',
      items: [
        {
          name: 'FynancKit',
          description: 'Your document repository - Generate your invoices and payslips',
          subtext: 'Professional invoice generation with blockchain verification and multi-currency support'
        }
      ]
    },
    {
      category: 'Tax Tools',
      items: [
        {
          name: 'My PAYE Calculator',
          description: 'PAYE Calculator that caters for more than one stream of income',
          subtext: 'Avoid tax liability shocks - Calculate accurate PAYE for multiple income sources'
        }
      ]
    },
    {
      category: 'Business Advisory Tools',
      items: [
        {
          name: 'FynancKit',
          description: 'Keep the professional agreements at your fingertips',
          subtext: 'Digital contract and agreement management system for businesses'
        }
      ]
    }
  ];

  // Auto-rotate hero service cards (3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % mainServices.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [mainServices.length]);

  // Auto-advance main carousel (5 seconds) - only when autoplay is on
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainServices.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, mainServices.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainServices.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainServices.length) % mainServices.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-300 via-cyan-800 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforming Business Challenges into 
                <span className="text-blue-300"> Opportunities</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Since 2016, AlloB Consultants has been providing dynamic and affordable 
                consulting solutions to businesses across various industries. Our commitment to 
                innovation and excellence drives us to deliver customized services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Schedule Consultation
                  </button>
                </Link>
                <Link to="/services">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    View Services
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right Column - Animated Service Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="bg-blue-600 text-white text-center py-3 rounded-lg mb-4">
                <span className="font-semibold">Our Core Services</span>
              </div>
              
              <div className="relative h-64 overflow-hidden rounded-lg">
                {/* Animated cards */}
                {mainServices.map((service, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                      index === serviceIndex
                        ? 'translate-x-0 opacity-100'
                        : index < serviceIndex
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-blue-100 text-sm mb-4">{service.description}</p>
                        <div className="text-xl font-bold text-yellow-300">
                          {service.pricing}
                        </div>
                      </div>
                      
                      <Link 
                        to={service.link}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-center flex items-center justify-center"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {mainServices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setServiceIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === serviceIndex 
                        ? 'w-8 bg-blue-400' 
                        : 'w-2 bg-white/30'
                    }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insight Carousels Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insightCarousels.map((carousel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">
                  {carousel.title}
                </h3>
                <div className="space-y-3">
                  {carousel.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50 border-4 border-blue-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((toolCategory, index) => (
              <div key={index} className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-center mb-6 text-gray-800 bg-gray-50 py-2 rounded">
                  {toolCategory.category}
                </h3>
                <div className="space-y-4">
                  {toolCategory.items.map((tool, toolIndex) => (
                    <div key={toolIndex} className="space-y-2">
                      <h4 className="font-bold text-blue-600">{tool.name}</h4>
                      <p className="text-sm text-gray-700 font-medium">{tool.description}</p>
                      <p className="text-xs text-gray-500">{tool.subtext}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Innovation in Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just use what's available - we build what's needed. Our custom-developed 
              tools showcase our commitment to innovation and solving real business challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FynancKit Showcase */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">FynancKit</h3>
                <p className="text-blue-600 font-semibold">Professional Document Management</p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Invoice Generation</h4>
                  <p className="text-sm text-gray-600">Professional invoices with blockchain verification and multi-currency support</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Payslip Creation</h4>
                  <p className="text-sm text-gray-600">Automated payslip generation with SARS compliance</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Agreement Management</h4>
                  <p className="text-sm text-gray-600">Digital contract repository at your fingertips</p>
                </div>
              </div>
              <a href="https://www.fynanckit.com" target="_blank" rel="noopener noreferrer">
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Try FynancKit
                </button>
              </a>
            </div>

            {/* PAYE Calculator Showcase */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">My PAYE Calculator</h3>
                <p className="text-green-600 font-semibold">Multi-Income Tax Planning</p>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-semibold text-red-800 mb-2">The Problem We Solved</h4>
                  <p className="text-sm text-red-700">Many individuals with multiple income streams under-pay PAYE, resulting in tax liability shocks during filing season.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Our Innovation</h4>
                  <p className="text-sm text-green-700">Calculate accurate PAYE across multiple income sources to avoid year-end tax surprises.</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>✓ Multiple income streams</span>
                  <span>✓ SARS compliant</span>
                  <span>✓ Proactive planning</span>
                </div>
              </div>
              <Link to="/TaxCalculator">
                <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Calculate My PAYE
                </button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              These tools represent our commitment to solving real-world problems through innovation.
            </p>
            <Link to="/tools">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Explore All Our Tools
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive accounting, tax, and business advisory solutions delivered 
              with integrity and powered by innovation.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Controls */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                {mainServices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Content */}
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {mainServices.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-lg p-8 mx-2">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <div className="text-xl font-bold text-green-600 mb-4">{service.pricing}</div>
                        <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Link to={service.link || '/services'}>
                          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            Learn More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / mainServices.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Experience the perfect blend of integrity and innovation. Get expert advice on 
            accounting, tax planning, and business strategy with our custom digital tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors">
                Schedule Free Consultation
              </button>
            </Link>
            <Link to="/tools">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors">
                Try Our Tools
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;