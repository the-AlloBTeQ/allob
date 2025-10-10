import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calculator, FileText, Briefcase, ArrowRight, 
  ChevronLeft, ChevronRight, Play, Pause 
} from 'lucide-react'

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  pricing: string
  link: string
}

interface ServicesCarouselProps {
  autoPlay?: boolean
  showControls?: boolean
  showProgress?: boolean
  interval?: number
}

const ServicesCarousel = ({ 
  autoPlay = true, 
  showControls = true, 
  showProgress = true,
  interval = 5000 
}: ServicesCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const services: Service[] = [
    {
      icon: Calculator,
      title: 'Accounting Services',
      description: 'Comprehensive accounting solutions from bookkeeping to financial statements, management accounts, and regulatory compliance.',
      features: ['Monthly Management Accounts', 'Annual Financial Statements', 'Bookkeeping', 'Payroll Administration'],
      pricing: 'From R2,500/month',
      link: '/services'
    },
    {
      icon: FileText,
      title: 'Tax Services',
      description: 'Expert tax planning and compliance to optimize your tax position and ensure SARS compliance.',
      features: ['Individual Tax Returns', 'Corporate Tax', 'VAT Returns', 'Tax Planning'],
      pricing: 'From R1,500/return',
      link: '/services'
    },
    {
      icon: Briefcase,
      title: 'Business Advisory',
      description: 'Strategic guidance to help your business grow and thrive in competitive markets.',
      features: ['Business Strategy', 'Financial Planning', 'Risk Management', 'M&A Advisory'],
      pricing: 'From R3,500/month',
      link: '/services'
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlaying, services.length, interval])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative">
      {/* Carousel Controls */}
      {showControls && (
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label={isAutoPlaying ? 'Pause carousel' : 'Play carousel'}
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
      )}

      {/* Carousel Content */}
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {services.map((service, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-8 mx-2 hover-lift">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Service Icon and Title */}
                  <div className="text-center lg:text-left">
                    <div className="bg-blue-100 w-20 h-20 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <div className="text-2xl font-bold text-green-600 mb-4">{service.pricing}</div>
                    <Link
                      to={service.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                    >
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Service Description */}
                  <div className="lg:col-span-2">
                    <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center animate-fade-in">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mt-6 bg-gray-200 rounded-full h-1">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / services.length) * 100}%` }}
          />
        </div>
      )}

      {/* Quick Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
              currentSlide === index 
                ? 'border-blue-600 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
            onClick={() => goToSlide(index)}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${currentSlide === index ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <service.icon className={`w-8 h-8 ${currentSlide === index ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h4 className="font-bold">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.pricing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesCarousel