import { Shield, Eye, Database, UserCheck, Mail, Phone, XCircle, Lock } from 'lucide-react';

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
              AlloB Consultants ("we," "our," or "us") is a SAICA accredited accounting and tax practice
              (SAICA Practice No. 31838440) based in Midrand, South Africa. We are committed to protecting
              your privacy in accordance with South Africa's Protection of Personal Information Act, 2013
              (POPIA). This Privacy Policy explains what information this website collects, how we use it,
              and your rights regarding that information. Please read it carefully.
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information You Provide to Us</h3>
                <p className="text-gray-700 mb-3">
                  We only collect personal information when you voluntarily submit it through a form on this
                  website — for example, when requesting a consultation, a service quote, or an inquiry. This
                  may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and contact details (email address, phone number)</li>
                  <li>Business name, business type, and industry</li>
                  <li>Information you share about your needs — for example, services required, an
                    approximate turnover range, or your current accounting arrangements</li>
                  <li>Any other information you choose to include in your message to us</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2 text-gray-500" />
                  What We Do Not Collect
                </h3>
                <p className="text-gray-700 mb-3">In the interest of transparency, this website currently does not:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Use cookies, analytics software, or tracking scripts to monitor your browsing activity</li>
                  <li>Process payments or collect payment or billing details</li>
                  <li>Collect tax identification numbers or supporting documents through the website itself
                    (these are only exchanged directly with your consultant once you become a client)</li>
                  <li>Operate an email newsletter</li>
                </ul>
                <p className="text-gray-700 mt-3 text-sm">
                  We do keep an anonymous count of how many times each article on our site has been read.
                  This count is not linked to your identity, IP address, or any other personal information.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              How We Use Your Information
            </h2>
            
            <p className="text-gray-700 mb-4">We use the information you submit to us for the following purposes:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Responding to your enquiry or consultation request</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Preparing quotes or proposals for the services you've asked about</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Communicating with you about your enquiry</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Complying with our legal and professional obligations (including SAICA and, where applicable, FICA client due diligence)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Improving this website based on the enquiries we receive</p>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell or trade your personal information. Information you submit through this website
              is sent directly to the relevant AlloB Consultants team and is not shared with third parties,
              except in the following circumstances:
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <ul className="text-gray-700 space-y-2">
                <li><strong>Hosting and Email Providers:</strong> The infrastructure providers who host this website and deliver enquiry emails to us</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Consent:</strong> When you have given us explicit permission to share your information</li>
                <li><strong>Professional Engagement:</strong> If, once you are a client, we need to involve another professional in your matter — always with your knowledge</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We take reasonable steps to protect the information you send us:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Encrypted Connection</h3>
                <p className="text-sm text-gray-600">This website is served over an encrypted (HTTPS) connection</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Direct Delivery</h3>
                <p className="text-sm text-gray-600">Form submissions are sent by email directly to our team</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Access Control</h3>
                <p className="text-sm text-gray-600">Limited to authorised AlloB Consultants staff on a need-to-know basis</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under POPIA</h2>
            <p className="text-gray-700 mb-4">Under the Protection of Personal Information Act, you have the right to:</p>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Correction:</strong> Request corrections to inaccurate information</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal information, subject to our legal and professional record-keeping obligations</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Objection:</strong> Object to how we process your information</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700"><strong>Complaint:</strong> Lodge a complaint with the Information Regulator of South Africa if you believe we have not handled your information properly</span>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or how we handle your information, please contact us:
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
