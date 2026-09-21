import { Link } from 'react-router-dom';
import {
  ClipboardCheck, ShieldCheck, Landmark, Users2,
  CheckCircle, ArrowRight, Search, Info
} from 'lucide-react';
import SEO from '../components/SEO';

const AuditConsultingServices = () => {
  const services = [
    {
      title: "Audit Readiness & Preparation",
      description: "Get your records, controls, and documentation in order before your external auditor's fieldwork begins.",
      features: ["Pre-audit control reviews", "Working paper preparation", "PBC (prepared-by-client) schedules", "Gap identification & remediation"],
      icon: ClipboardCheck
    },
    {
      title: "Internal Control & Risk Reviews",
      description: "COSO-aligned assessments of your control environment to reduce audit findings and strengthen governance.",
      features: ["Control environment assessment", "Risk and control matrices", "Process walkthroughs", "Remediation action plans"],
      icon: ShieldCheck
    },
    {
      title: "Public Sector & GRAP Compliance",
      description: "Implementation support for municipalities and public entities navigating GRAP 104/108 and related reporting standards.",
      features: ["GRAP 104/108 implementation", "Accounting policy alignment", "Disclosure preparation", "Financial instrument classification"],
      icon: Landmark
    },
    {
      title: "External Audit Liaison & EQA Reviews",
      description: "Coordination and support throughout the audit process, plus external quality assurance reviews of audit and governance functions.",
      features: ["Auditor query management", "Information request coordination", "External Quality Assurance (EQA) reviews", "Audit committee reporting support"],
      icon: Search
    }
  ];

  const industries = [
    {
      name: "Public Sector & Municipalities",
      description: "GRAP compliance and Auditor-General readiness",
      challenges: "Reporting deadlines, GRAP 104/108 transition, AGSA findings"
    },
    {
      name: "Financial Services & SACCOs",
      description: "Regulatory reporting and control assurance",
      challenges: "Member fund controls, regulatory reporting, audit scope"
    },
    {
      name: "Non-Profit Organisations",
      description: "Grant accounting and donor compliance readiness",
      challenges: "Grant recognition, donor reporting, governance evidence"
    },
    {
      name: "Construction",
      description: "Contract accounting and project control reviews",
      challenges: "Revenue recognition, retention accounting, WIP controls"
    },
    {
      name: "Retail & Manufacturing",
      description: "Inventory and revenue control assurance",
      challenges: "Stock controls, cut-off testing, systems reliability"
    },
    {
      name: "Professional Services",
      description: "Trust account and client fund control reviews",
      challenges: "Client fund segregation, billing controls, compliance evidence"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Scoping & Engagement Letter",
      description: "We understand your entity type, reporting deadlines, and prior audit history to define a tailored scope and fee."
    },
    {
      step: 2,
      title: "Readiness Assessment",
      description: "We review your records, controls, and prior audit findings to identify gaps before fieldwork begins."
    },
    {
      step: 3,
      title: "Remediation & Preparation",
      description: "We prepare working papers and PBC schedules, and help resolve identified control or documentation gaps."
    },
    {
      step: 4,
      title: "Audit Support & Liaison",
      description: "We support you through fieldwork, coordinating information requests and queries through to sign-off."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Audit Consultants"
        description="Audit readiness, internal control reviews, and GRAP/IFRS compliance support from AlloB Consultants — a SAICA accredited accounting practice supporting you and your appointed registered auditor."
        keywords="audit readiness South Africa, internal control review, GRAP 104 108 compliance, EQA review, audit preparation Midrand"
        canonical="/services/audit-consulting"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Audit Consultants
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Audit readiness, internal control reviews, and compliance support that prepare you
                for your external audit and support you through it — so fieldwork runs smoothly
                and findings stay minimal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold transition-colors inline-flex items-center"
                >
                  Discuss Your Engagement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/checkout?package=audit"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-700 font-semibold transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Why Engage Us</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ClipboardCheck className="w-6 h-6 mr-4 text-indigo-200" />
                  <span>Fewer findings, smoother fieldwork</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="w-6 h-6 mr-4 text-indigo-200" />
                  <span>COSO-aligned control assessments</span>
                </div>
                <div className="flex items-center">
                  <Landmark className="w-6 h-6 mr-4 text-indigo-200" />
                  <span>GRAP and public sector expertise</span>
                </div>
                <div className="flex items-center">
                  <Users2 className="w-6 h-6 mr-4 text-indigo-200" />
                  <span>CA(SA)-led preparation and liaison</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Disclosure */}
      <section className="bg-indigo-50 border-b border-indigo-100 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-3 text-sm text-indigo-900">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              AlloB Consultants is a SAICA accredited accounting and tax practice (SAICA Practice No. 31838440).
              We are not registered with the Independent Regulatory Board for Auditors (IRBA) and do not perform
              statutory audits or issue audit opinions. Our audit consulting service supports you and your
              appointed registered auditor throughout the audit process — it does not replace the independent audit itself.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Audit Consulting Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preparation, control assurance, and liaison support — built around your audit timeline
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <IconComponent className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Support</h2>
            <p className="text-xl text-gray-600">Audit consulting experience across regulated and reporting-intensive sectors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-indigo-50 transition-colors group">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600">
                  {industry.name}
                </h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="text-sm text-indigo-600 font-medium">
                  Key Challenges: {industry.challenges}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Audit Consulting Process</h2>
            <p className="text-xl text-gray-600">A structured approach to a smoother audit</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="bg-white pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Pricing</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Audit consulting is scoped and priced per engagement — it depends on your entity type, reporting
            framework, prior audit history, and timeline. Get in touch for a tailored quote.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Preparing for an Audit?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's scope your audit consulting engagement and get you ready for a smoother, faster audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/checkout?package=audit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              to="/booking"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 font-semibold transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuditConsultingServices;
