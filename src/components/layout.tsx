import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Footer from '../components/footer' 

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Industries', path: '/industries' },
    { name: 'Articles', path: '/articles' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'Deals', path: '/deals' },
    
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50" aria-label="Main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <img 
                  src="/logo.png" 
                  alt="" 
                  className="h-10 w-auto mr-2"
                />
                <div>
                  <span className="block text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    AlloB Consultants
                  </span>
                  <span className="text-sm text-gray-600 italic font-medium">
                    Integrity and Innovation
                  </span>
                </div>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
        {children}
      </main>

      {/* Use the new Footer component */}
      <Footer />
    </div>
  )
}

export default Layout