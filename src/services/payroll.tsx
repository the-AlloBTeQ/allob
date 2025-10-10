import { Link } from 'react-router-dom';
import {
  Calculator,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const PayrollManagementServices = () => {
  const compliance = [
    {
      requirement: 'PAYE Submissions',
      frequency: 'Monthly by 7th',
      description:
        'Employee tax calculations and submissions to SARS',
    },
    {
      requirement: 'UIF Declarations',
      frequency: 'Monthly by 7th',
      description:
        'Unemployment Insurance Fund contributions and claims',
    },
    {
      requirement: 'Skills Development Levy',
      frequency: 'Monthly by 7th',
      description:
        '1% of payroll for companies with annual payroll > R500,000',
    },
    {
      requirement: 'IRP5 Certificates',
      frequency: 'Annual by 31 May',
      description:
        'Employee tax certificates for the tax year',
    },
    {
      requirement: 'EMP501 Reconciliation',
      frequency: 'Annual by 31 May',
      description:
        'Employer reconciliation declaration to SARS',
    },
  ];

  const features = [
    'Automated PAYE calculations for multiple income streams',
    'Real-time compliance monitoring and alerts',
    'Secure employee self-service portal',
    'Integration with time and attendance systems',
    'Multi-company payroll management',
    'Detailed audit trails and documentation',
  ];

  const process = [
    {
      step: 1,
      title: 'Setup & Configuration',
      description:
        'Configure payroll system with your company structure and policies',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      step: 2,
      title: 'Data Migration',
      description:
        'Securely transfer existing employee and payroll data',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      step: 3,
      title: 'Processing',
      description:
        'Monthly payroll calculation, review, and approval process',
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      step: 4,
      title: 'Distribution & Reporting',
      description:
        'Payment processing, payslip distribution, and compliance reporting',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Professional Payroll Management
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Comprehensive payroll services that ensure accurate calculations, timely payments, 
                and full compliance with South African labor and tax legislation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/tax-consultation"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Get Payroll Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/TaxCalculatorS"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Try PAYE Calculator
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Compliance Status</h3>
              <div className="space-y-4">
                {compliance.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/20 rounded-lg p-4"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                      <span className="font-medium">{item.requirement}</span>
                    </div>
                    <span className="text-green-300 text-sm font-semibold">✓ On Track</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/compliance-checklist"
                  className="text-sm underline hover:text-indigo-200"
                >
                  View All 5 Compliance Requirements →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Payroll Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine automation, local expertise, and rigorous compliance checks to deliver 
              seamless, secure, and stress-free payroll management tailored to South African regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <CheckCircle className="w-6 h-6 text-indigo-600 mb-4" />
                <p className="text-gray-800">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">SARS & Labour Compliance</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-4xl">
            Stay audit-ready with automated tracking of all statutory requirements. We handle deadlines, submissions, 
            and documentation so you avoid penalties and maintain trust.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {compliance.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-600 pl-6 py-2 bg-gray-50 rounded-r-lg"
              >
                <h3 className="font-semibold text-gray-900">{item.requirement}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                  {item.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Payroll Process</h2>
            <p className="text-lg text-gray-600 mt-4">
              Simple, secure, and scalable — from setup to monthly delivery.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 w-0.5 h-full bg-indigo-300 hidden md:block"></div>

            <div className="space-y-8">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white p-6 rounded-xl shadow-md md:ml-16 relative group hover:shadow-lg transition-shadow"
                >
                  <div className="absolute -left-10 top-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-10 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="mr-4 text-indigo-600">{step.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Simplify Your Payroll?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Focus on growing your business while we handle accurate, compliant, and timely payroll processing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tax-consultation"
              className="bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors inline-flex items-center"
            >
              Schedule a Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/services/payroll"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-700 font-semibold transition-colors"
            >
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PayrollManagementServices;