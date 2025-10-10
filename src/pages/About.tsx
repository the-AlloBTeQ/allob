import { Link } from 'react-router-dom'
import { Shield, Award, Users, TrendingUp, Target, BookOpen, Globe, CheckCircle } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards and transparency in all our professional dealings.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide, ensuring quality and precision in all deliverables.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term partnerships with our clients, becoming a trusted extension of their business teams.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace innovative solutions and modern technology to enhance our service delivery and client experience.'
    }
  ]


  const certifications = [
    'SAICA (South African Institute of Chartered Accountants)',
    'ACA BFP (Associate Chartered Accountant, Business Finance Professional)',
    'SARS Registered Tax Practitioners',
    
  ]
  
  const timeline = [
    {
      year: '2016',
      title: 'Company Founded',
      description: 'AlloB Consultants was established to provide professional accounting and advisory services.'
    },
    {
      year: '2018',
      title: 'Service Expansion',
      description: 'Expanded our service offerings to include comprehensive tax planning and consulting.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented cloud-based solutions to enhance client service delivery and operational efficiency.'
    },
    {
      year: '2022',
      title: 'Growth Milestone',
      description: 'Reached significant client growth and expanded our professional team to serve more industries.'
    }
  ]

  const team = [
    {
      name: 'Professional Team',
      role: 'Chartered Accountants',
      description: 'Our team consists of qualified CAs and tax practitioners with extensive industry experience across various sectors and jurisdictions.',
      credentials: 'CA(SA), ACA BFP , SAICA and ICAEW Members'
    },
    {
      name: 'Advisory Specialists',
      role: 'Business Consultants',
      description: 'Experienced business advisors specializing in strategic planning, financial forecasting, and growth strategies.',
      credentials: 'Strategic Planning Certifications'
    },
    {
      name: 'Tax Experts',
      role: 'Tax Practitioners',
      description: 'Specialist tax practitioners focused on compliance, planning, and optimization for individuals and businesses.',
      credentials: 'SARS Registered Practitioners'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AlloB Consultants
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Since 2016, we have been transforming business challenges into opportunities 
              through professional accounting, tax, and advisory services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                To empower South African businesses with expert financial management, strategic tax planning, 
                and comprehensive business advisory services. We are committed to delivering innovative and 
                affordable consulting solutions that transform business challenges into opportunities for growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700">Dynamic and affordable consulting solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700">Customized services that meet evolving client needs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700">Innovation and excellence in service delivery</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-8">
                To be the leading professional services firm in South Africa, recognized for our expertise, 
                integrity, and commitment to client success. We envision a future where every business, 
                regardless of size, has access to world-class financial and advisory services.
              </p>
 
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our professional practice and client relationships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              A timeline of growth, innovation, and expanding services
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-600"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-blue-600 font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Team</h2>
            <p className="text-xl text-gray-600">
              Qualified professionals dedicated to your business success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.description}</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Accreditations</h2>
            <p className="text-xl text-gray-600">
              Our qualifications and certifications ensure the highest standards of professional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose AlloB?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Target className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Industry Expertise</h3>
                    <p className="text-blue-100">Deep understanding of various industries and their specific financial challenges and opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Continuous Learning</h3>
                    <p className="text-blue-100">We stay current with changing regulations, tax laws, and industry best practices through ongoing professional development.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Technology-Driven</h3>
                    <p className="text-blue-100">We leverage modern technology and cloud-based solutions to provide efficient, secure, and accessible services.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Partner With Us?</h3>
              <p className="text-blue-100 mb-6 text-center">
                Experience the difference that professional, personalized service can make for your business.
              </p>
              <div className="text-center space-y-4">
                <Link
                  to="/contact"
                  className="block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link
                  to="/services"
                  className="block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About