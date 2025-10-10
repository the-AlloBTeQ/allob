import { FileText, Scale, Users, CreditCard } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Scale className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
              <p className="text-blue-100 text-lg">
                Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
          <div className="text-sm text-blue-200">
            Effective date: {new Date().toLocaleDateString('en-US', { 
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
          
          {/* Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Agreement to Terms
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and 
                AlloB Consultants ("Company," "we," "us," or "our") regarding your use of our website 
                and services. By accessing our website or engaging our services, you agree to be bound 
                by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </div>
          </section>

          {/* Services Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Our Services
            </h2>
            <p className="text-gray-700 mb-4">
              AlloB Consultants provides professional accounting, tax advisory, and business consulting services, including:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Accounting and bookkeeping services</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Tax preparation and advisory</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Business strategy consultation</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Company secretarial services</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Financial planning and analysis</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Risk management consulting</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Management accounts preparation</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Online tools and calculators</p>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">By using our services, you agree to:</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Accuracy of Information</h3>
                <p className="text-gray-700 text-sm">
                  Provide accurate, complete, and up-to-date information necessary for the provision of our services.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Timely Cooperation</h3>
                <p className="text-gray-700 text-sm">
                  Respond promptly to requests for information and cooperate with our team to ensure efficient service delivery.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Compliance with Laws</h3>
                <p className="text-gray-700 text-sm">
                  Comply with all applicable laws and regulations in your business operations and tax obligations.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Confidentiality</h3>
                <p className="text-gray-700 text-sm">
                  Maintain confidentiality of any proprietary information shared during our professional relationship.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Payment Terms
            </h2>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees and Payment</h3>
              <div className="space-y-3 text-gray-700">
                <p>• Fees for services will be clearly outlined in our service agreement or proposal</p>
                <p>• Payment is due within 30 days of invoice date unless otherwise agreed</p>
                <p>• Late payment may result in suspension of services and additional charges</p>
                <p>• All fees are exclusive of applicable taxes unless stated otherwise</p>
                <p>• Refund policies vary by service type and will be specified in individual agreements</p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Our Intellectual Property</h3>
                <p className="text-gray-700 text-sm">
                  All content, tools, methodologies, and materials provided by AlloB Consultants remain 
                  our intellectual property. You may not reproduce, distribute, or create derivative works 
                  without our written permission.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Your Information</h3>
                <p className="text-gray-700 text-sm">
                  You retain ownership of any personal information you provide to us. We will only use 
                  your information in accordance with our Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, AlloB Consultants shall not be liable for any indirect, 
              incidental, special, or consequential damages arising out of or in connection with the use of our services.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which AlloB Consultants operates, without regard to its conflict of law principles.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Any changes will be effective immediately 
              upon posting the revised Terms on our website. Your continued use of our services after any changes 
              constitutes your acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions or concerns about these Terms, please contact us at:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Email: support@allob.co.za</li>
              <li>Phone: +27 (067) 921 1947</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;