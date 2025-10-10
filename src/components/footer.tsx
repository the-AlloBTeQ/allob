import { Calculator, Phone, Mail, Building, ExternalLink, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AlloB Consultants</h3>
                <p className="text-sm text-gray-400 italic">Integrity and Innovation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Professional accounting, tax, and business advisory services with innovative digital solutions.
            </p>
            <p className="text-gray-400 text-xs">
              Building tomorrow's financial ecosystem today.
            </p>
          </div>
          
          {/* Digital Tools */}
          <div>
            <h4 className="font-semibold mb-4">Digital Tools</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/TaxCalculator" className="hover:text-white transition-colors flex items-center space-x-2">
                  <Calculator className="w-4 h-4" />
                  <span>My PAYE Calculator</span>
                  <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">LIVE</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.fynanckit.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>FynancKit</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded">EARLY ACCESS</span>
                </a>
              </li>
              <li className="text-gray-500 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>Full ERP Suite</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">COMING SOON</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/services/accounting" className="hover:text-white transition-colors">
                  Accounting Services
                </a>
              </li>
           
              <li>
                <a href="/services/business-advisory" className="hover:text-white transition-colors">
                  Business Advisory
                </a>
              </li>
              <li>
                <a href="/services/digital-transformation" className="hover:text-white transition-colors">
                  Digital Transformation
                </a>
              </li>
              <li>
                <a href="/services/payroll" className="hover:text-white transition-colors">
                  Payroll Management
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+27679211947" className="hover:text-white transition-colors">
                  +27 67 921 1947
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@allob.co.za" className="hover:text-white transition-colors">
                  info@allob.co.za
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Building className="w-4 h-4 mt-0.5" />
                <span>Anrickle Place, Kiaat Street, Noordwyk, Gauteng, 1687</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6">
              <a 
                href="/booking" 
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                <span>Get Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} AlloB Consultants. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          
          {/* Innovation Badge */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
              <Calculator className="w-3 h-3" />
              <span>Powered by Innovation & Integrity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;