import { Shield, Eye, Database, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Shield className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-blue-100 text-lg">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
            </div>
          </div>
          <div className="text-sm text-blue-200">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <UserCheck className="w-6 h-6 mr-2 text-blue-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AlloB Consultants ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2 text-blue-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-3">We may collect personal information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Business information and financial details</li>
                  <li>Tax identification numbers and related documents</li>
                  <li>Payment and billing information</li>
                  <li>Communications with our team</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-3">When you visit our website, we may automatically collect:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              How We Use Your Information
            </h2>
            
            <p className="text-gray-700 mb-4">We use the information we collect for various purposes, including:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Providing and maintaining our services</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Processing transactions and payments</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Communicating with you about our services</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Improving our website and services</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Complying with legal and regulatory requirements</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Preventing fraud and ensuring security</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Sending relevant updates and newsletters</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Analyzing usage patterns and trends</p>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except in the following circumstances:
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <ul className="text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our business</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you have given us explicit permission to share your information</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Encryption</h3>
                <p className="text-sm text-gray-600">SSL/TLS encryption for data transmission</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Secure Storage</h3>
                <p className="text-sm text-gray-600">Protected servers and databases</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Access Control</h3>
                <p className="text-sm text-gray-600">Limited access on need-to-know basis</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have certain rights regarding your personal information:</p>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Access:</strong> Request a copy of your personal information</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Correction:</strong> Request corrections to inaccurate information</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal information</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Opt-out:</strong> Unsubscribe from marketing communications</span>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-700">privacy@allob.co.za</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-700">+27 (067) 921 1947</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
      
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;