import { Link } from 'react-router-dom';
import { 
  Map, 
  Home, 
  Briefcase, 
  Users, 
  Building, 
  FileText, 
  Phone, 
  Calculator,
  Settings,
  ShoppingCart,
  MessageSquare,
  Shield,
  Scale,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const SiteMap = () => {
  const siteStructure = [
    {
      title: 'Main Pages',
      icon: <Home className="w-5 h-5" />,
      pages: [
        { name: 'Home', path: '/', icon: <Home className="w-4 h-4" />, description: 'Welcome page and company overview' },
        { name: 'About Us', path: '/about', icon: <Users className="w-4 h-4" />, description: 'Learn about our company and team' },
        { name: 'Contact', path: '/contact', icon: <Phone className="w-4 h-4" />, description: 'Get in touch with our team' },
        { name: 'Careers', path: '/careers', icon: <Briefcase className="w-4 h-4" />, description: 'Join our growing team' }
      ]
    },
    {
      title: 'Our Services',
      icon: <Briefcase className="w-5 h-5" />,
      pages: [
        { name: 'Services Overview', path: '/services', icon: <Settings className="w-4 h-4" />, description: 'Comprehensive list of our services' },
        { name: 'Industries We Serve', path: '/industries', icon: <Building className="w-4 h-4" />, description: 'Sectors and industries we specialise in' }
      ]
    },
    {
      title: 'Deals & Origination',
      icon: <TrendingUp className="w-5 h-5" />,
      pages: [
        { name: 'Deals', path: '/deals', icon: <TrendingUp className="w-4 h-4" />, description: 'We find, package and connect investment opportunities with the right funders' },
      ]
    },
    {
      title: 'Tools & Resources',
      icon: <Calculator className="w-5 h-5" />,
      pages: [
        { name: 'Tools Hub', path: '/tools', icon: <Calculator className="w-4 h-4" />, description: 'Access all our business tools' },
        { name: 'PAYE Tax Calculator', path: '/taxcalculator', icon: <Calculator className="w-4 h-4" />, description: 'Calculate your PAYE tax obligations' }
      ]
    },
    {
      title: 'Knowledge Base',
      icon: <FileText className="w-5 h-5" />,
      pages: [
        { name: 'Articles', path: '/articles', icon: <FileText className="w-4 h-4" />, description: 'Industry insights and expert advice' }
      ]
    },
    {
      title: 'Business Services',
      icon: <ShoppingCart className="w-5 h-5" />,
      pages: [
        { name: 'Tax Consultation', path: '/tax-consultation', icon: <MessageSquare className="w-4 h-4" />, description: 'Professional tax advisory services' },
        { name: 'Checkout', path: '/checkout', icon: <ShoppingCart className="w-4 h-4" />, description: 'Complete your service purchase' }
      ]
    },
    {
      title: 'Legal & Policies',
      icon: <Scale className="w-5 h-5" />,
      pages: [
        { name: 'Privacy Policy', path: '/privacy', icon: <Shield className="w-4 h-4" />, description: 'How we protect your information' },
        { name: 'Terms of Service', path: '/terms', icon: <Scale className="w-4 h-4" />, description: 'Terms and conditions for our services' }
      ]
    }
  ];

  const serviceCategories = [
    {
      title: 'Accounting Services',
      services: ['Bookkeeping', 'Financial Statements', 'Management Accounts', 'Payroll Processing']
    },
    {
      title: 'Tax Services',
      services: ['Tax Preparation', 'Tax Planning', 'PAYE Calculations', 'Tax Compliance']
    },
    {
      title: 'Business Advisory',
      services: ['Strategic Planning', 'Risk Management', 'Business Analysis', 'Financial Planning']
    },
    {
      title: 'Company Secretarial',
      services: ['Company Formation', 'Compliance Management', 'Board Support', 'Statutory Filings']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Map className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Site Map</h1>
              <p className="text-blue-100 text-lg">
                Navigate through all pages and services on our website
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Navigation */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {siteStructure.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-700 text-white p-4">
                    <div className="flex items-center">
                      {section.icon}
                      <h2 className="text-xl font-bold ml-2">{section.title}</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      {section.pages.map((page, pageIndex) => (
                        <Link
                          key={pageIndex}
                          to={page.path}
                          className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200"
                        >
                          <div className="flex items-center flex-1">
                            <div className="text-blue-600 group-hover:text-blue-700 mr-3">
                              {page.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-800">
                                {page.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {page.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-800 text-white p-4">
                <h3 className="text-lg font-bold">Quick Links</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <Link to="/contact" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Get Quote
                  </Link>
                  <Link to="/deals" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                    Submit a Deal
                  </Link>
                  <Link to="/taxcalculator" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors">
                    <Calculator className="w-4 h-4 mr-2 text-blue-600" />
                    PAYE Calculator
                  </Link>
                  <Link to="/tax-consultation" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                    Book Consultation
                  </Link>
                  <Link to="/articles" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Latest Articles
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 text-white p-4">
                <h3 className="text-lg font-bold">Service Categories</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {serviceCategories.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white p-4">
                <h3 className="text-lg font-bold">Contact Information</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    +27 (067) 921 1947
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@allob.co.za
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Midrand Office, Gauteng, South Africa
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Site Map</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Structure</h3>
              <p className="text-gray-700 mb-4">
                Our website is organised to provide easy access to all our services and resources.
                The main sections include our service offerings, business tools, knowledge base, and company information.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span><strong>Main Pages:</strong> Core company and contact information</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-700 rounded-full mr-3"></div>
                  <span><strong>Services:</strong> Professional accounting and advisory services</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>Deals:</strong> Deal origination and financing readiness</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span><strong>Tools:</strong> Interactive business calculators and utilities</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span><strong>Resources:</strong> Articles, insights, and expert guidance</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Finding Something?</h3>
              <p className="text-gray-700 mb-4">
                If you can't find what you're looking for on this site map, we're here to help.
                Contact our team for assistance navigating our services or finding specific information.
              </p>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Sections</h4>
                <div className="space-y-2">
                  <Link to="/services" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    → Our Services Overview
                  </Link>
                  <Link to="/deals" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    → Deals & Origination
                  </Link>
                  <Link to="/taxcalculator" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    → PAYE Tax Calculator
                  </Link>
                  <Link to="/articles" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    → Latest Business Articles
                  </Link>
                  <Link to="/contact" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    → Contact & Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SiteMap;