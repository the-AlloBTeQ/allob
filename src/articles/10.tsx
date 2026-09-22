import { HeartHandshake, ArrowRight, AlertCircle, Calculator } from 'lucide-react';

const Grap111: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mb-3">
          GRAP Watch Series &middot; Article 3 of 5
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          GRAP 111 Explained: Accounting for Social Benefits for the First Time
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A wholly new Standard, and a recognition point that runs against most preparers' first instinct.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <p className="text-gray-700">
            Unlike the other Standards in this series, GRAP 111 has no predecessor to amend. Issued in April
            2026 and based on IPSAS 42 with deliberate local departures, it gives South African public sector
            entities a dedicated recognition and measurement model for cash social benefits - and, for some
            municipalities, a liability recognised earlier and reviewed more often than they may expect.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <HeartHandshake className="mr-3 text-blue-600" />
          Why a new standard was needed
        </h2>
        <p className="text-gray-700 mb-4">
          Government at every level pays out cash to individuals and households who meet defined eligibility
          criteria - indigent support, rates and service-charge rebates, grants-in-aid, disaster relief
          payments, and a wide range of national social assistance programmes. Before GRAP 111, there was no
          dedicated Standard telling preparers exactly when to recognise a liability for these payments, how to
          measure it, or how to distinguish a social benefit from an ordinary provision, an employee benefit,
          or a waived debt. GRAP 111 closes that gap. Its objective is "to prescribe accounting requirements
          for the recognition, measurement, presentation and disclosure of social benefits provided in cash."
        </p>
        <p className="text-gray-700">
          As with every Standard in this series, GRAP 111's effective date has not yet been determined by the
          Minister of Finance. Because it is a genuinely new recognition model rather than an amendment to
          something already embedded in accounting policy, it carries the longest lead time of anything in
          this line-up - municipalities with material indigent or rebate programmes should not wait for the
          gazette to start scoping the exercise.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Which municipal programme is actually in scope?</h2>
        <p className="text-gray-700 mb-4">
          GRAP 111 applies only to a transaction that meets the definition of a social benefit
          <em> and</em> is provided in cash. That single word "cash" does most of the scoping work, and it is
          the point most likely to be misread. Social benefits are cash transfers and in-kind benefits provided
          to specific individuals and/or households who meet eligibility criteria, to mitigate the effect of
          social risks, and to address the needs of society as a whole - but GRAP 111's recognition and
          measurement requirements apply only to the cash-transfer portion of that definition.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3">Municipal programme</th>
                <th className="px-4 py-3">Cash or in-kind?</th>
                <th className="px-4 py-3">Standard that applies</th>
                <th className="px-4 py-3">GRAP 111 effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-4 py-3">Free basic water, electricity, refuse for indigent households</td>
                <td className="px-4 py-3">In-kind</td>
                <td className="px-4 py-3">GRAP 19</td>
                <td className="px-4 py-3">None</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3">Rates rebate or write-off of arrears under an indigent policy</td>
                <td className="px-4 py-3">Waiver of a receivable</td>
                <td className="px-4 py-3">GRAP 108 / GRAP 104</td>
                <td className="px-4 py-3">Presentation &amp; disclosure only</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3">Grants-in-aid, burial assistance, cash disaster relief to eligible households</td>
                <td className="px-4 py-3">Cash</td>
                <td className="px-4 py-3">GRAP 111</td>
                <td className="px-4 py-3">Full recognition &amp; measurement</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3">Vouchers, or reimbursement of clinic costs</td>
                <td className="px-4 py-3">Service the entity pays for</td>
                <td className="px-4 py-3">Not GRAP 111</td>
                <td className="px-4 py-3">None</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3">Staff pension or medical benefits</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3">GRAP 25</td>
                <td className="px-4 py-3">None</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 text-sm">
          In other words: for most municipalities, the recognition and measurement model bites hardest on
          genuine cash transfers with eligibility criteria - grants-in-aid, bursaries paid direct to
          households, burial assistance, cash disaster relief - not on the free-basic-services and rebate
          programmes that dominate a typical indigent register. Those still need a scoping exercise, but most
          of them land in GRAP 19, GRAP 108 or GRAP 104, with GRAP 111 adding only presentation and disclosure.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">The core distinction: social security insurance benefits vs social assistance benefits</h2>
        <p className="text-gray-700 mb-4">GRAP 111 splits all social benefits into two categories, because they are recognised differently:</p>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3">Social security insurance benefits</th>
                <th className="px-4 py-3">Social assistance benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white align-top">
                <td className="px-4 py-3">
                  Managed in a manner similar to insurance contracts - a social risk is transferred to the
                  provider in return for contributions by, or on behalf of, participants. Recognised when the
                  insured event occurs.
                </td>
                <td className="px-4 py-3">
                  All other social benefits, typically assessed, managed and funded by government on an
                  ongoing basis through policy decisions, with little or no beneficiary contribution.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 text-sm">
          For most municipalities, the great majority of social benefit programmes - indigent registers, rates
          and tariff rebates, grants-in-aid to vulnerable households - fall into the social assistance category
          rather than the insurance-type category, which is more typical of national schemes such as
          contributory pension or unemployment arrangements.
        </p>
      </section>

      <section className="mb-12 bg-amber-50 border border-amber-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-amber-700" />
          The point most preparers will get wrong: when does the liability arise?
        </h2>
        <p className="text-gray-800 text-sm mb-3">
          The intuitive answer is "once we have checked that the applicant qualifies." GRAP 111 says otherwise,
          and does so deliberately. A liability for a social assistance benefit is recognised when the entity
          providing the benefit <strong>receives an application from a potential beneficiary</strong> - not
          once that application has been verified or approved.
        </p>
        <p className="text-gray-800 text-sm mb-3">
          The Board considered, and rejected, the "verified and approved" recognition point. Its concern was
          that recognising a liability only once an entity's own internal process has cleared an application
          gives limited information (nothing is disclosed about the backlog of unverified applications) and
          makes the liability dependent on how efficiently that particular entity happens to process paperwork
          - which undermines comparability between entities. So: applications received on or before the
          reporting date create a liability; applications received after the reporting date do not, regardless
          of how far verification has progressed.
        </p>
        <p className="text-gray-800 text-sm">
          Practical consequence: an unprocessed backlog of applications sitting in an inbox at year-end is not
          a footnote risk - it is a liability that needs to be estimated and recognised, at the best estimate
          of what will ultimately be paid out.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="mr-3 text-blue-600" />
          Measuring the liability - and where it stops
        </h2>
        <p className="text-gray-700 mb-4">
          The liability is measured at the best estimate of the social benefit payments the entity expects to
          incur in fulfilling the obligation, reviewed and adjusted at each reporting date, with any discount
          unwound as a finance expense. Where a benefit is paid on a recurring basis, the measurement question
          becomes: for how long into the future does the liability extend?
        </p>
        <p className="text-gray-700 mb-4">
          GRAP 111 draws a boundary around this using the idea of <strong>substantive ongoing eligibility
          criteria</strong>. Where a benefit's rules require existing beneficiaries to satisfy eligibility
          criteria again at set intervals, and the entity has a genuine history of enforcing that - stopping
          payment to anyone who fails re-verification, not just having the rule on paper - the criteria are
          "substantive." In that case, any potential payments beyond the <em>next</em> point of verification are
          measured at zero. Indicators of real enforcement include a communicated verification process,
          dedicated staff and systems, external data checks (SARS, Home Affairs) and supervisory review.
        </p>
        <p className="text-gray-700 mb-4">
          If the criteria are not substantive - the rules do not actually stop payment until re-verification,
          or the entity has a history of continuing to pay beneficiaries who no longer qualify - the estimate
          must extend over the full period a beneficiary is expected to remain eligible, discounted. That can
          be years rather than months, and the liability grows accordingly.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Worked example</h4>
          <p className="text-gray-700 text-sm mb-2">
            Municipality X pays a R1,500 monthly grant-in-aid to households on its indigent register.
            Beneficiaries must re-apply every 30 June with proof of income; the municipality checks
            applications against SARS and Home Affairs data, and removes anyone who fails before the July
            payment run. At 30 June 20X1 the register has 4,000 approved households and 300 applications
            received but not yet processed.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Liability at 30 June:</strong> the July-to-June payments for the 4,000 approved households
            (12 &times; R1,500 &times; 4,000, discounted at the government bond rate) plus a best estimate for
            the 300 unprocessed applications (say 70% historically approved). Nothing beyond the next 30 June
            verification point is recognised, because the criteria are enforced and therefore substantive.
          </p>
          <p className="text-gray-700 text-sm">
            If the municipality did not actually enforce re-registration in practice, the estimate would
            instead extend over the expected period each household stays eligible - often several years - and
            the liability would be a multiple of the figure above.
          </p>
        </div>
        <p className="text-gray-700 mt-4 text-sm">
          Because the liability is often not limited to the next single payment, a present value calculation
          will frequently be required - unlike the narrower model in IPSAS 42. The discount rate follows the
          government bond rate, consistent with GRAP 25's employee benefits guidance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Presentation and disclosure</h2>
        <p className="text-gray-700 mb-4">
          The liability for social benefits is presented separately in the statement of financial position.
          Disclosure goes well beyond a single note line and includes:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
          <li>The nature of the social benefits provided and the basis on which eligibility is assessed;</li>
          <li>The measurement basis and any significant assumptions or estimation techniques used, including the discount rate approach;</li>
          <li>A roll-forward of the liability: opening balance, additional liabilities recognised, reductions from payments made, remeasurements of estimated future payments, reversed unused amounts, and the unwinding of discount during the period;</li>
          <li>For contractual and statutory debts waived that meet the definition of a social benefit: the nature, reasons, and amount waived;</li>
          <li>For benefits introduced, amended or terminated during the period: the effective date, the legislation or arrangement giving effect to the change, and its financial implications; and</li>
          <li>The significant judgements made in classifying benefits as social security insurance or social assistance benefits.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting ahead of it</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ol className="list-decimal ml-6 space-y-2 text-gray-800 text-sm">
            <li>Inventory every cash social benefit programme currently run by the entity - indigent support, rebates, grants-in-aid, disaster relief - and classify each against the GRAP 111 scope paragraphs, including the interaction with GRAP 104, 108, 19 and 25. Separate genuine cash transfers from in-kind services and receivable waivers early; most of the "readiness work" collapses once this split is done properly.</li>
            <li>Classify each cash programme as a social security insurance benefit or a social assistance benefit, and document the basis for that judgement.</li>
            <li>Assess whether ongoing eligibility criteria are actually enforced in practice, not just written into policy - this single fact determines whether the liability is measured to the next verification date or over the full expected eligibility period.</li>
            <li>Assess data readiness: does the entity capture eligibility data, beneficiary numbers, unprocessed-application volumes and average benefit amounts in a form that supports a best-estimate liability calculation at each reporting date?</li>
            <li>Design the measurement methodology, including discounting, and test it against at least one full reporting cycle of real data before it becomes mandatory.</li>
            <li>Update accounting policies and disclosure templates, and brief the audit committee on the expected balance sheet and expense recognition impact well ahead of the first affected financial year.</li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Running an indigent register or grants-in-aid programme?</h2>
        <p className="mb-4">
          AlloB Consultants can help you inventory and classify your social benefit programmes against
          GRAP 111, design a defensible measurement methodology, and build the liability model your finance
          team and auditors will need.
        </p>
        <a href="/contact" className="inline-flex items-center font-semibold text-white hover:text-amber-300">
          Talk to AlloB Consultants <ArrowRight className="w-4 h-4 ml-2" />
        </a>
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

export default Grap111;
