import { GitMerge, ArrowRight, Building2, Scale } from 'lucide-react';

const Grap105106107: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mb-3">
          GRAP Watch Series &middot; Article 2 of 5
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          GRAP 105, 106 &amp; 107 Revised: Getting Ready for the New Rules on Transfers of Functions and Mergers
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Three Standards, one Board project, one shared logic.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <p className="text-gray-700">
            Revised GRAP 105, 106 and 107 (issued February 2024, following Board approval in December 2023)
            replace the 2010 originals with a single, consistent model for deciding whether a restructuring is
            a transfer of functions or a merger - and how to account for it either way. Here is what changed,
            and where municipalities are most exposed.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <GitMerge className="mr-3 text-blue-600" />
          Why these three Standards belong in one article, not three
        </h2>
        <p className="text-gray-700 mb-4">
          The Accounting Standards Board revised the Standards on Transfer of Functions Between Entities Under
          Common Control (GRAP 105), Transfer of Functions Between Entities Not Under Common Control (GRAP 106),
          and Mergers (GRAP 107) together, as a single project. They are not three unrelated amendments that
          happen to have consecutive numbers. They share the same definitions, the same test for identifying
          whether a "function" has actually been transferred, and largely the same disclosure architecture.
          Read one in isolation and you will misapply all three; read them together and the logic is genuinely
          coherent.
        </p>
        <p className="text-gray-700">
          As with every pronouncement in this series, the effective date has not yet been determined by the
          Minister of Finance. Entities cannot early adopt the revisions or use them to develop accounting
          policy in the meantime - but the ASB's own communique on the revisions is explicit that the changes
          are being flagged well ahead of that date precisely so that entities can prepare.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What actually counts as a "transfer of functions"?</h2>
        <p className="text-gray-700 mb-4">
          This is the question the revised suite spends the most effort answering, because it is also the
          question municipalities get wrong most often in practice. A transfer of functions occurs when
          functions previously undertaken by one entity are reorganised or reallocated to another entity or
          entities - but not every reshuffle of assets, staff or budget lines meets that bar. The revised
          Standards introduce a structured, two-step assessment.
        </p>

        <div className="border-l-4 border-blue-500 pl-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 1: The concentration test (optional, elected per transaction)</h3>
          <p className="text-gray-700 text-sm">
            An entity can choose to apply a simplified test for any given transfer or merger. The test is met
            if substantially all of the carrying amount (for GRAP 105, common control) or fair value (for
            GRAP 106, not under common control) of the gross assets acquired or received is concentrated in a
            single identifiable asset. If met, there is no function - the individual asset or group of
            assets and/or liabilities is simply accounted for under the applicable Standards of GRAP for that
            item.
          </p>
        </div>
        <div className="border-l-4 border-blue-500 pl-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 2: The inputs-and-process test (if the concentration test is not elected, or not met)</h3>
          <p className="text-gray-700 text-sm">
            The entity assesses whether the acquired or received set of activities and assets and/or
            liabilities includes, at minimum, an input and a substantive process that together significantly
            contribute to the ability to create output. Whether a process is "substantive" depends on whether
            the transferred set already has outputs at the transfer date, and on the role of an organised
            workforce - a workforce with the skills, knowledge or experience to operate the process and
            produce outputs.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3">Set has no outputs at transfer date</th>
                <th className="px-4 py-3">Set has outputs at transfer date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white align-top">
                <td className="px-4 py-3">
                  A process is substantive when it is critical to converting the input(s) into outputs, and the
                  input(s) include both an organised workforce and other inputs that workforce could develop
                  or convert into outputs.
                </td>
                <td className="px-4 py-3">
                  A process is substantive when it is critical to continuing to produce outputs and the
                  input(s) include an organised workforce; or it significantly contributes to continuing
                  outputs and is unique or scarce, or cannot be replaced without significant cost, effort or
                  delay.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700">
          If both an input and a substantive process are present, the set is a function, and GRAP 105 or
          GRAP 106 applies. If not, the individual or group of assets and/or liabilities is accounted for
          under whichever ordinary Standards of GRAP apply to those items - property, plant and equipment,
          financial instruments, and so on.
        </p>
      </section>

      <section className="mb-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-amber-700" />
          Worked example
        </h2>
        <p className="text-gray-800 text-sm mb-3">
          A district municipality hands the water services provider function to a local municipality:
          reservoirs, the pipe network, the operations team, billing records and the bulk-supply contract all
          move across. There is an organised workforce and a set of assets that already produce outputs, so
          this is a function.
        </p>
        <p className="text-gray-800 text-sm mb-3">
          Districts and local municipalities are <strong>not</strong> under common control of one another
          (only municipalities and their own municipal entities are related in that sense). So <strong>GRAP
          106</strong> applies, not GRAP 105 - and the assets received are measured at fair value on the
          transfer date, not carrying amount. This is the opposite of what most readers assume by default, and
          it is the single most useful distinction to get right before the effective date lands.
        </p>
        <p className="text-gray-800 text-sm">
          Contrast: the same district instead transfers only a vacant office building to the local
          municipality. Substantially all of the value sits in a single identifiable asset, the concentration
          test is met, there is no function, and the building is simply recognised under GRAP 17.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">GRAP 105 vs GRAP 106: does common control change the accounting?</h2>
        <p className="text-gray-700 mb-4">
          Both Standards deal with transfers of functions; the dividing line is whether the entities involved
          are under common control (GRAP 105) or not under common control (GRAP 106). Under the related-party
          guidance in the Improvements to the Standards of GRAP (2026), national and provincial entities within
          the same sphere of government are under common control; municipalities are not under common control
          with each other, though a municipality is related to its own municipal entities. The concentration
          test threshold differs accordingly - carrying amount for GRAP 105, fair value for GRAP 106 -
          reflecting that transactions between unrelated entities are more likely to be measured at fair value
          from the outset.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">When does a transfer of functions become a merger?</h3>
        <p className="text-gray-700 mb-4">
          GRAP 107 applies when no single party gains control of the combining entities or functions and,
          instead, a new combined entity is formed. The revised Standard is explicit about what the combined
          entity's first set of financial statements after a merger must comprise: an opening statement of
          financial position as at the merger date; statements of financial position and financial performance
          for the period from the merger date to the reporting date; a statement of changes in net assets and a
          cash flow statement covering that same period; a budget-versus-actual comparison where GRAP 24
          requires one; and full notes. This is materially more prescriptive than the 2010 Standard, with
          direct implications for how a newly amalgamated municipality's first annual financial statements are
          structured.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What changes in measurement and disclosure</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
          <li><strong>Gross recognition.</strong> Under both GRAP 105 and GRAP 107, assets acquired or received and liabilities assumed are recognised at gross amounts - cost, accumulated depreciation and accumulated impairment losses are recognised separately on the transfer or merger date, rather than net. This is a change to build into transition working papers, not just disclosure notes.</li>
          <li>Aligned scope exclusions and recognition exceptions across all three Standards, removing several inconsistencies between the 2010 versions.</li>
          <li>New illustrative examples on the measurement period (the window during which provisional amounts recognised at the transfer or merger date can be adjusted) and on distinguishing a transfer of functions or merger from a separate transaction.</li>
          <li>New and aligned disclosures: the primary reason for the transfer or merger; disclosure of transfers or mergers occurring after the reporting date but before the financial statements are authorised for issue; amounts recognised for each major class of assets acquired or received and liabilities assumed; disclosure of individually immaterial transfers or mergers that are collectively material; and information letting users understand measurement-period adjustments.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Scale className="mr-3 text-blue-600" />
          Transitional provisions: what happens on day one
        </h2>
        <p className="text-gray-700 mb-4">
          The revisions apply <strong>prospectively</strong>: they apply to a transfer of functions or merger
          only where the transfer or merger date falls on or after the date the revisions become effective.
          Financial statements do not need to be adjusted for transfers or mergers that occurred before that
          date. The detailed transitional provisions will be set out in the Directive relevant to each category
          of entity once the Minister of Finance has determined the effective date - so the transition
          mechanics themselves are one more reason not to wait for the gazette before doing the groundwork.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Worked scenario - from the ASB's own guidance</h4>
          <p className="text-gray-700 text-sm">
            A provincial department transfers a function to another department in the same province. A
            directive states the effective date of the transfer is 1 June. The receiving department, however,
            only obtains control of the assets and liabilities on 1 July, once a memorandum of understanding
            has been concluded between the two departments. Because the receiving department can only use or
            otherwise benefit from the transfer from the date it obtains control, the transfer is recognised
            from 1 July - not the date stated in the directive. The same logic applies to a new metropolitan
            municipality formed through amalgamation: control, not the administrative effective date in a
            directive, drives recognition.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting ahead of it</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ol className="list-decimal ml-6 space-y-2 text-gray-800 text-sm">
            <li>Build a register of function transfers and mergers over the past several years, and re-test each one against the new concentration test and inputs-and-process test to identify where the accounting treatment may need to change prospectively.</li>
            <li>Update accounting policies and delegate a documented process for assessing new transactions as they arise - the concentration test election, in particular, needs a documented basis for each transaction.</li>
            <li>Review current disclosure notes against the new, more prescriptive requirements, and identify where systems or working papers do not currently capture the information needed (gross asset/liability components, measurement-period adjustments, timing of control).</li>
            <li>Brief the audit committee on the coming change well before the first affected transaction, particularly if an amalgamation, boundary change or function transfer is already in progress or anticipated.</li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Restructuring, amalgamating, or standing up a municipal entity?</h2>
        <p className="mb-4">
          AlloB Consultants can assess your historical and planned function transfers against the revised
          GRAP 105/106/107 model, and build the accounting policies and disclosure templates your finance
          team and auditors will need once the effective date is confirmed.
        </p>
        <a href="/contact" className="inline-flex items-center font-semibold text-white hover:text-amber-300">
          Talk to AlloB Consultants <ArrowRight className="w-4 h-4 ml-2" />
        </a>
        <p className="text-xs text-gray-400 mt-6">
          AlloB Consultants &middot; SAICA Practice No. 31838440 &middot; Midrand, Johannesburg. This article is
          provided for general information purposes and does not constitute accounting, audit or professional
          advice. Effective dates and transitional provisions should always be confirmed against the latest
          Directive 5 and Government Gazette notices issued by the Accounting Standards Board and National
          Treasury.
        </p>
      </section>
    </div>
  );
};

export default Grap105106107;
