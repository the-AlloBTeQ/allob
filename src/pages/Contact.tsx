import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Calendar, MessageSquare } from 'lucide-react'
import SEO from '../components/SEO';

<SEO
  title="Contact Us"
  description="Get in touch with AlloB Consultants. Request a quote, book a consultation, or reach our team in Midrand, Gauteng. Call +27 (067) 921 1947."
  keywords="contact AlloB Consultants, accounting quote South Africa, book consultation Midrand"
  canonical="/contact"
/>

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    preferredContact: 'email',
    urgency: 'medium'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailBody = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Service: ${formData.service}
Urgency: ${formData.urgency}
Preferred Contact: ${formData.preferredContact}

Message:
${formData.message}
  `.trim()
const mailtoLink = `mailto:info@allob.co.za?subject=Contact Form - ${formData.service || 'General Inquiry'}&body=${encodeURIComponent(emailBody)}`
window.location.href = mailtoLink

setFormData({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    preferredContact: 'email',
    urgency: 'medium'
  })
}


  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      description: 'Speak directly with our team',
      contact: '+27 67 921 1947',
      action: 'tel:+27679211947',
      available: 'Mon-Fri, 8:00 AM - 5:00 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us a detailed message',
      contact: 'info@allob.co.za',
      action: 'mailto:info@allob.co.za',
      available: 'We respond within 24 hours'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation',
      contact: 'Online Booking',
      action: './booking',
      available: 'Available slots this week'
    }
  ]

  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 1:00 PM (By appointment)' },
    { day: 'Sunday', hours: 'Closed' }
  ]

  const services = [
    'Accounting Services',
    'Tax Services',
    'Business Advisory',
    'All Services',
    'Not Sure - Need Consultation'
  ]

  const faqs = [
    {
      question: 'How quickly can you respond to urgent requests?',
      answer: 'For urgent matters, we typically respond within 2-4 hours during business hours. We also offer priority support for existing clients.'
    },
    {
      question: 'What information should I prepare for our first meeting?',
      answer: 'Please bring recent financial statements, tax returns, business registration documents, and any specific questions or concerns you have.'
    },
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes, we offer a complimentary 30-minute initial consultation to discuss your needs and how we can help your business.'
    },
    {
      question: 'Can you work with businesses outside of Gauteng?',
      answer: 'Absolutely! While our office is in Midrand, we serve clients throughout South Africa using digital communication and cloud-based solutions.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to transform your business with professional accounting, tax, and advisory services? 
              Let's start the conversation today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <a
                  href={method.action}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-lg block mb-2"
                >
                  {method.contact}
                </a>
                <p className="text-sm text-gray-500">{method.available}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Within a week</option>
                      <option value="high">High - Within 2-3 days</option>
                      <option value="urgent">Urgent - ASAP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your business needs, current challenges, or specific questions you have..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields. We'll respond within 24 hours during business days.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Office Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-gray-600">
                        Anrickle Place<br />
                        Kiaat Street<br />
                        Noordwyk<br />
                        Gauteng, 1687
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <a href="tel:+27679211947" className="text-blue-600 hover:text-blue-700">
                        +27 67 921 1947
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href="mailto:info@allob.co.za" className="text-blue-600 hover:text-blue-700">
                        info@allob.co.za
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Office Hours</h4>
                      <div className="space-y-1">
                        {officeHours.map((hours, index) => (
                          <div key={index} className="flex justify-between text-gray-600">
                            <span>{hours.day}</span>
                            <span>{hours.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <a
                  href="tel:+27112345678"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:info@allob.co.za"
                  className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg hover:bg-blue-50 font-semibold transition-colors flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our services and process
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-start">
                  <MessageSquare className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Our Office</h2>
            <p className="text-xl text-gray-600">Located in Midrand, easily accessible from major routes</p>
          </div>
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.931251801745!2d28.1009!3d-26.0135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU5JzE1LjQiUyAyOMKwMDcnMjQuMiJF!5e0!3m2!1sen!2sza!4v1621234567890!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '0.75rem' }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AlloB Location"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50 border-l-4 border-red-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Urgent Financial Matters?</h3>
              <p className="text-red-700">
                For urgent tax deadlines, compliance issues, or critical financial matters, contact us immediately.
              </p>
            </div>
            <a
              href="tel:+27112345678"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency Line
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact