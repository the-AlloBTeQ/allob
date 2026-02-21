import { 
  Users, Award, TrendingUp, Heart, Globe, Briefcase, 
  DollarSign, MapPin, Clock, CheckCircle,
  GraduationCap, Coffee, Laptop,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

<SEO
  title="Careers"
  description="Join the AlloB Consultants team. We are looking for talented accounting, tax, and business advisory professionals in South Africa."
  keywords="accounting jobs South Africa, careers Midrand, tax advisory jobs Gauteng, AlloB Consultants careers"
  canonical="/careers"
/>

const Careers = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Above-market compensation packages with performance bonuses and annual reviews.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical aid, wellness programs, and mental health support.'
    },
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Continuous learning opportunities, certifications, and conference attendance.'
    },
    {
      icon: Clock,
      title: 'Flexible Working',
      description: 'Hybrid work options, flexible hours, and work-life balance initiatives.'
    },
    {
      icon: Coffee,
      title: 'Great Environment',
      description: 'Modern office space, team events, and collaborative work culture.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths, mentorship programs, and leadership opportunities.'
    }
  ];

  const filledPositions = [
    {
      id: 1,
      title: 'Senior Chartered Accountant',
      department: 'Accounting',
      location: 'Midrand, Gauteng',
      type: 'Full-time',
      experience: '5+ years',
      filledDate: 'January 2025',
      description: 'Join our accounting team to provide expert financial services to our diverse client base. Lead complex accounting projects and mentor junior staff.',
      requirements: [
        'CA(SA) qualification essential',
        '5+ years post-article experience',
        'Experience with IFRS and financial reporting',
        'Strong client relationship management skills',
        'Proficiency in accounting software (Sage, Xero, QuickBooks)'
      ],
      responsibilities: [
        'Prepare and review financial statements',
        'Manage client relationships and communications',
        'Supervise and mentor junior accounting staff',
        'Ensure compliance with accounting standards',
        'Participate in audit processes and year-end procedures'
      ]
    },
    {
      id: 2,
      title: 'Tax Practitioner',
      department: 'Tax Services',
      location: 'Midrand, Gauteng',
      type: 'Full-time',
      experience: '3+ years',
      filledDate: 'December 2024',
      description: 'Specialist role focusing on individual and corporate tax compliance, planning, and advisory services for our growing client portfolio.',
      requirements: [
        'Completed SAICA/SAIT tax qualification',
        '3+ years tax experience',
        'SARS registered tax practitioner',
        'Knowledge of South African tax legislation',
        'Strong analytical and problem-solving skills'
      ],
      responsibilities: [
        'Prepare individual and corporate tax returns',
        'Provide tax planning and advisory services',
        'Handle SARS correspondence and disputes',
        'Research complex tax issues',
        'Assist with tax compliance procedures'
      ]
    },
    {
      id: 3,
      title: 'Business Advisory Consultant',
      department: 'Advisory Services',
      location: 'Midrand, Gauteng',
      type: 'Full-time',
      experience: '4+ years',
      filledDate: 'November 2024',
      description: 'Strategic role helping clients with business planning, financial forecasting, and growth strategies across various industries.',
      requirements: [
        'CA(SA) or MBA qualification preferred',
        '4+ years business consulting experience',
        'Strong financial modeling skills',
        'Experience in strategic planning',
        'Excellent presentation and communication skills'
      ],
      responsibilities: [
        'Develop business strategies and plans',
        'Conduct financial analysis and modeling',
        'Provide merger and acquisition support',
        'Assist with business restructuring projects',
        'Present findings and recommendations to clients'
      ]
    },
    {
      id: 4,
      title: 'Junior Accountant',
      department: 'Accounting',
      location: 'Midrand, Gauteng',
      type: 'Full-time',
      experience: '1-2 years',
      filledDate: 'January 2025',
      description: 'Entry-level position perfect for recent graduates or candidates with limited experience looking to develop their accounting career.',
      requirements: [
        'BCom Accounting or equivalent qualification',
        '1-2 years accounting experience',
        'Currently studying towards CA(SA) preferred',
        'Proficiency in Excel and accounting software',
        'Strong attention to detail'
      ],
      responsibilities: [
        'Assist with bookkeeping and data capture',
        'Prepare basic financial statements',
        'Support senior staff with client work',
        'Learn and apply accounting standards',
        'Participate in training programs'
      ]
    }
  ];

  const companyValues = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering quality services that exceed client expectations.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster a collaborative environment where everyone contributes.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We embrace new technologies and innovative approaches to provide cutting-edge solutions.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards and maintain transparency in all our dealings.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Professional Team
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Build your career with South Africa's leading professional services firm. 
              We offer exciting opportunities for growth in accounting, tax, and business advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Current Status Notice */}
      <section className="py-8 bg-amber-50 border-l-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*<div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800">Current Recruitment Status</h3>
              <p className="text-amber-700">
                We're pleased to announce that all our current open positions have been successfully filled. 
                Thank you to everyone who applied! We'll post new opportunities as they become available.
              </p>
            </div>
          </div>*/}
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AlloB as Your Career Partner?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to creating an environment where our team members can thrive and grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our work culture and professional relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Filled Positions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recently Filled Positions</h2>
            <p className="text-xl text-gray-600">
              These roles have been filled, but you can learn more about the types of opportunities we offer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filledPositions.map((position) => (
              <div key={position.id} className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{position.department}</span>
                    <MapPin className="w-4 h-4" />
                    <span>{position.location}</span>
                    <Clock className="w-4 h-4" />
                    <span>{position.type}</span>
                  </div>
                  <p className="mb-4 text-gray-700">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Responsibilities:</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {position.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <CheckCircle className="inline-block w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-700 font-semibold">Filled: {position.filledDate}</span>
                  </div>
                </div>
                {/* Apply Section */}
                <div className="flex flex-col justify-center mt-6">
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h4 className="font-bold mb-4">Interested in this role?</h4>
                    <p className="text-gray-600 mb-6 text-sm">
                      Send us your CV to learn more about this opportunity.
                    </p>
                    <div className="space-y-3">
                    {/*  <a
                        href={`mailto:careers@allob.co.za?subject=Application for ${position.title}&body=Dear AlloB Team,%0D%0A%0D%0AI am interested in applying for the ${position.title} position.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0ABest regards`}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </a>*/}
                      <p className="text-xs text-gray-500">
                        careers@allob.co.za
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">
              A transparent and straightforward process designed to find the best fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Application</h3>
              <p className="text-gray-600">Submit your CV and cover letter via email or our online form.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Initial Review</h3>
              <p className="text-gray-600">Our HR team reviews applications and contacts shortlisted candidates.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Interview</h3>
              <p className="text-gray-600">Face-to-face or virtual interview with our team and department head.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">Decision</h3>
              <p className="text-gray-600">Final decision and job offer with onboarding process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Internships & Graduates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Graduate & Internship Programs
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Start your professional journey with our comprehensive graduate development programs. 
                We offer structured training, mentorship, and clear career progression paths for 
                aspiring accountants and business professionals.
              </p>
              
              <div className="space-y-4">
                  {/*<div className="flex items-center">
                  <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                  <span>Chartered Accountancy Training Contracts</span>
                </div>*/}
                <div className="flex items-center">
                  <Laptop className="w-6 h-6 text-blue-600 mr-3" />
                  <span>Vacation Work Programs</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <span>Graduate Development Schemes</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-blue-600 mr-3" />
                  <span>Professional Mentorship Programs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Start Your Career?</h3>
              <p className="mb-6">
                Join our dynamic team and build a rewarding career in professional services. 
                We're always looking for talented individuals to join our growing firm.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:careers@allob.co.za?subject=Graduate Program Inquiry"
                  className="block bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Apply for Graduate Programs
                </a>
                <Link
                  to="/contact"
                  className="block border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Contact HR Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Don't See the Right Role?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            We're always interested in hearing from talented professionals. 
            Send us your CV and we'll consider you for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@allob.co.za?subject=General Application"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Send Your CV
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers