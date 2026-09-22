import { AlertTriangle, Calendar, ArrowRight, ClipboardList } from 'lucide-react';

const GrapWatchOverview: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mb-3">
          GRAP Watch Series &middot; Article 1 of 5
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Approved but Not Yet Effective: The GRAP Standards Every Municipality Must Prepare For
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A new cluster of Standards of GRAP has cleared the Accounting Standards Board and is waiting
          only for the Minister of Finance to gazette an effective date.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <p className="text-gray-700">
            History says that date will arrive faster than finance departments expect. This series unpacks
            what has been approved, what it changes, and why the preparation work needs to start now - not
            once the directive lands.
          </p>
        </div>
      </div>

      {/* Why it matters */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-amber-600" />
          Why "not yet effective" is the most dangerous phrase in public sector accounting
        </h2>
        <p className="text-gray-700 mb-4">
          Every year, municipalities, municipal entities, provincial and national departments, constitutional
          institutions and public entities prepare their financial statements against a moving target: the
          Standards of Generally Recognised Accounting Practice (GRAP), as determined by the Accounting
          Standards Board (ASB) and given legal force by the Minister of Finance. Most finance teams track the
          standards already in force. Far fewer keep a disciplined eye on the standards sitting in the gap
          between approved and effective - and that gap is exactly where the risk, and the opportunity, lives.
        </p>
        <p className="text-gray-700 mb-4">
          At the time of writing, a cluster of new and revised Standards of GRAP has been through the Board's
          due process, been issued in final form, and is now waiting on a single missing ingredient: a
          Government Gazette notice from the Minister of Finance fixing the date from which they must be
          applied. Every one of these pronouncements carries the same closing sentence in its "Effective date"
          paragraph - "An entity shall apply this Standard for annual financial statements covering periods
          beginning on or after a date to be determined by the Minister of Finance." Until that date is set,
          entities cannot use these standards to develop accounting policy. But that is precisely why waiting
          for the gazette before starting preparation is the single most common - and most expensive - mistake
          finance departments make.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-gray-800">
          <p>
            <strong>Confirmed by the ASB's own Directive 5.</strong> The Board's Directive 5 for the 2026/2027
            reporting framework states plainly that, for periods beginning on or after 1 April 2026, no new
            Standards or amendments have been approved by the Minister for that framework. Every pronouncement
            in this series remains, for now, approved but not yet effective.
          </p>
        </div>
      </section>

      {/* How a standard moves */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How a standard moves from "approved" to "in force"</h2>
        <p className="text-gray-700 mb-4">
          It helps to be precise about the mechanics, because the terminology gets used loosely in practice:
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="font-semibold text-gray-900 mb-1">1. The Board approves the text</h3>
            <p className="text-gray-700 text-sm">
              The ASB develops a standard or amendment through discussion papers, exposure drafts and public
              comment, then formally approves the final wording at a Board meeting. From that point the
              standard exists in its final, authoritative form.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="font-semibold text-gray-900 mb-1">2. The Minister of Finance determines the effective date</h3>
            <p className="text-gray-700 text-sm">
              A standard has no legal force for financial reporting purposes until the Minister publishes a
              notice in the Government Gazette fixing the date from which it applies. This is a separate, later
              step - sometimes by months, sometimes by years.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="font-semibold text-gray-900 mb-1">3. The ASB confirms the reporting framework annually via Directive 5</h3>
            <p className="text-gray-700 text-sm">
              Each year the Board issues an updated Directive 5, "Determining the GRAP Reporting Framework,"
              which consolidates exactly which standards, amendments and interpretations apply to which
              category of entity for the period ahead, and lists what remains approved but not yet effective.
            </p>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          Between the first step and the second, entities are in a holding pattern: the accounting policy
          choice legally available to them is still the old standard, even though everyone in the room knows
          the new one is coming, what it will require, and roughly what it will do to the numbers. Once a date
          is gazetted, each amendment's own transitional paragraph also permits earlier application - so
          "not yet effective" is not the same as "cannot be adopted early forever." That holding pattern is
          where readiness work has to happen - not after the gazette, when the clock on the first mandatory
          reporting period is already running.
        </p>
      </section>

      {/* Lineup table */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <ClipboardList className="mr-3 text-blue-600" />
          What has been approved and is waiting in the queue
        </h2>
        <p className="text-gray-700 mb-6">
          The table below summarises the current line-up of approved-but-not-yet-effective Standards of GRAP
          relevant to municipalities and other public sector entities. Each is covered in more depth in the
          articles that follow.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3">Standard</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Who is affected</th>
                <th className="px-4 py-3">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-4 py-3 font-semibold text-gray-900">GRAP 111</td>
                <td className="px-4 py-3">April 2026</td>
                <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">New standard</span></td>
                <td className="px-4 py-3">Entities with cash grant-in-aid or indigent cash programmes</td>
                <td className="px-4 py-3">First dedicated recognition and measurement model for cash social benefits.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">GRAP 105, 106 &amp; 107</td>
                <td className="px-4 py-3">February 2024 (approved Dec 2023)</td>
                <td className="px-4 py-3"><span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">Revised suite</span></td>
                <td className="px-4 py-3">Any entity restructuring, amalgamating or transferring a function</td>
                <td className="px-4 py-3">New "function" and "concentration test" definitions change how transfers and mergers are accounted for.</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 font-semibold text-gray-900">GRAP 109</td>
                <td className="px-4 py-3">July 2026</td>
                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">Amended</span></td>
                <td className="px-4 py-3">Entities collecting funds or delivering programmes for another organ of state</td>
                <td className="px-4 py-3">Clarifies the binding arrangement and principal/agent assessment; affects conditional grants and agency collections.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">GRAP 1</td>
                <td className="px-4 py-3">Nov 2022 (going concern); April 2026 (materiality &amp; current/non-current)</td>
                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">Amended</span></td>
                <td className="px-4 py-3">All entities, especially those under financial distress or with covenanted loans</td>
                <td className="px-4 py-3">Structured going concern disclosure and a rewritten current/non-current liability test.</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 font-semibold text-gray-900">GRAP 103</td>
                <td className="px-4 py-3">June 2022</td>
                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">Amended</span></td>
                <td className="px-4 py-3">Metros, districts and provincial entities with heritage portfolios</td>
                <td className="px-4 py-3">Realigns the definition with the National Heritage Resources Act and pulls alternative-use heritage assets out of PPE.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">Improvements to GRAP (2026)</td>
                <td className="px-4 py-3">April 2026</td>
                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">Omnibus</span></td>
                <td className="px-4 py-3">All entities - touches GRAP 1, 3, 4, 17, 18, 19, 20 and 35</td>
                <td className="px-4 py-3">Individually minor, collectively a full accounting policy review across eight standards.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-6">
          Two things stand out when you look at this line-up as a set rather than as isolated pronouncements.
          First, several of these standards are deliberately complementary - GRAP 105, 106 and 107 were
          revised together, in the same Board project, and are meant to be read and applied as one coherent
          model for entity combinations in the public sector. Second, GRAP 111's scope paragraphs explicitly
          cross-reference GRAP 104, GRAP 108, GRAP 19 and GRAP 25, so a proper Social Benefits readiness
          assessment cannot be done in isolation from an entity's existing debt-relief, indigent and
          provisioning policies. Standards of GRAP are rarely amended one at a time by accident.
        </p>
      </section>

      {/* Cost of waiting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">The cost of treating "not yet effective" as "not yet important"</h2>
        <p className="text-gray-700 mb-4">
          In our public sector engagements - including leading a revised GRAP 104 (Financial Instruments)
          implementation for a district municipality client and conducting an external quality assurance
          review of a metro's General Accounting Records function - the same pattern recurs. Finance
          departments that start preparing for a not-yet-effective standard only once the Minister has
          gazetted the date lose the ability to:
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <ul className="list-disc ml-6 space-y-2 text-gray-800 text-sm">
            <li>Phase the data-gathering work (function-transfer registers, binding-arrangement schedules, social benefit eligibility data) across more than one financial year;</li>
            <li>Test new accounting policies against real transactions before they become mandatory;</li>
            <li>Brief the audit committee and Municipal Public Accounts Committee before the first qualified or emphasis-of-matter comment, rather than in response to one; and</li>
            <li>Negotiate a realistic implementation budget, rather than an emergency one.</li>
          </ul>
        </div>
        <p className="text-gray-700 mt-4 text-sm">
          Weak preparation for new reporting requirements is a recurring theme in the Auditor-General's local
          government audit outcomes. A standard that is "approved but not yet effective" today is, in
          practical terms, a standard your external auditors already know is coming.
        </p>
      </section>

      {/* Series roadmap */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Calendar className="mr-3 text-blue-600" />
          What this series covers
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Article 2</p>
            <h3 className="font-semibold text-gray-900 mb-2">GRAP 105, 106 &amp; 107 - the new entity combinations suite</h3>
            <p className="text-gray-600 text-sm mb-3">
              How to apply the "concentration test," when a transfer of functions becomes a merger, and what
              the new disclosure requirements mean for restructurings and amalgamations.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Article 3</p>
            <h3 className="font-semibold text-gray-900 mb-2">GRAP 111 - accounting for social benefits for the first time</h3>
            <p className="text-gray-600 text-sm mb-3">
              Distinguishing social security insurance benefits from social assistance benefits, and building
              a defensible measurement model for indigent support and grant obligations.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Article 4</p>
            <h3 className="font-semibold text-gray-900 mb-2">GRAP 109 - the amended "binding arrangement" test</h3>
            <p className="text-gray-600 text-sm mb-3">
              Why the sharpened principal/agent assessment changes how conditional grants and intergovernmental
              collection arrangements are documented and disclosed.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Article 5</p>
            <h3 className="font-semibold text-gray-900 mb-2">GRAP 1, GRAP 103 &amp; the 2026 Improvements package</h3>
            <p className="text-gray-600 text-sm mb-3">
              Going concern disclosure changes, the heritage asset reclassification, and the eight-standard
              housekeeping package hiding inside "Improvements to the Standards of GRAP (2026)."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready before the gazette lands</h2>
        <p className="mb-4">
          AlloB Consultants is a SAICA-registered accounting and advisory practice (Practice No. 31838440)
          based in Midrand, Johannesburg, with a portfolio built around public sector and municipal clients -
          from AFS compilation under the Standards of GRAP and ISRS 4410, to tax and payroll compliance, to
          standard-specific implementation projects.
        </p>
        <p className="mb-4">
          We are not offering a generic training slide deck. We build the readiness assessment, draft the
          accounting policies, quantify the transition impact, and hand your team - and your audit committee -
          a defensible implementation plan.
        </p>
        <div className="bg-blue-800 p-6 rounded-lg mt-6">
          <p className="mb-3">
            If your municipality or public entity needs a GRAP readiness assessment for any of the standards
            in this series - or a second opinion on how far along your current implementation already is -
            our public sector and advisory team can help.
          </p>
          <a href="/contact" className="inline-flex items-center font-semibold text-white hover:text-amber-300">
            Talk to AlloB Consultants <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          AlloB Consultants &middot; SAICA Practice No. 31838440 &middot; Midrand, Johannesburg. This article is
          provided for general information purposes and does not constitute accounting, audit or professional
          advice. Effective dates and requirements should always be confirmed against the latest Directive 5
          and Government Gazette notices issued by the Accounting Standards Board and National Treasury.
        </p>
      </section>
    </div>
  );
};

export default GrapWatchOverview;
