import { Landmark, ArrowRight, ScrollText, Users } from 'lucide-react';

const Grap1103Improvements: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mb-3">
          GRAP Watch Series &middot; Article 5 of 5
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          The Changes That Aren't So Quiet: GRAP 1, GRAP 103 and the Improvements to the Standards of GRAP (2026)
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Not every approved-but-not-yet-effective change comes as a headline new Standard.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <p className="text-gray-700">
            Amended GRAP 1 (going concern, from November 2022, and materiality plus liability classification,
            from the April 2026 Improvements package) tightens disclosure and rewrites how liabilities are
            classified as current or non-current. Amended GRAP 103 (June 2022) reclassifies heritage assets
            with an alternative use. And an eight-Standard "Improvements" package (April 2026) quietly touches
            everything from cash flow statements to related party disclosures. None of it is as minor as the
            label suggests.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <ScrollText className="mr-3 text-blue-600" />
          Amended GRAP 1: going concern gets a real disclosure framework
        </h2>
        <p className="text-gray-700 mb-4">
          The current GRAP 1 requires management to assess an entity's ability to continue as a going concern,
          and to disclose material uncertainties where they exist. In practice, that principle-level
          requirement has produced wildly inconsistent disclosure across the municipal sector. The November
          2022 amendments replace that gap with a structured framework, built on three additions:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mb-4">
          <li><strong>Distinguishing liquidation/cessation from a transfer of functions or merger</strong> (new paragraphs .28A to .28C). Where an entity is being liquidated or is ceasing operations entirely, the going concern basis is no longer appropriate. But where a decision is taken to transfer some or all of an entity's functions to another entity, or to merge with another entity, the going concern basis remains appropriate - because the functions continue, even if not within the same entity.</li>
          <li><strong>Disclosure of significant judgements</strong> (new paragraph .134A). An entity must now disclose the significant judgements and assumptions made in assessing whether the going concern basis is appropriate - not just the conclusion.</li>
          <li><strong>A structured uncertainty disclosure</strong> (new paragraphs .134B to .134C). Where material uncertainties exist, the entity must disclose that they exist, the principal events or conditions giving rise to them, their possible effects, and - critically - management's plans to address them and mitigate their effect, with a cross-reference permitted to a published financial recovery plan.</li>
        </ul>
        <p className="text-gray-700 text-sm">
          A consequential amendment to GRAP 14 narrows when budget-funded entities face genuine going concern
          issues, to actual decisions to liquidate or cease operations - not merely a change in funding levels.
          For any municipality that has received a qualified opinion, a disclaimer, or an emphasis of matter
          referencing financial sustainability - and for any municipality under, or approaching, a financial
          recovery plan - this amendment converts going concern from a one-line judgement call into a
          disclosure that auditors, National Treasury, and the Municipal Public Accounts Committee will expect
          to be substantiated in detail.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">The other half of amended GRAP 1: classifying liabilities as current or non-current</h2>
        <p className="text-gray-700 mb-4">
          A separate set of changes, introduced through the <strong>Improvements to the Standards of GRAP
          (2026)</strong>, comprehensively rewrites how liabilities are classified as current or non-current,
          mirroring international developments on the same question. The core principle - a liability is
          non-current where the entity has the unconditional right, at the reporting date, to defer settlement
          for at least twelve months - is unchanged. What changes is the detail:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mb-4">
          <li>The right to defer settlement must have substance and must <strong>exist at the reporting date</strong>, even where compliance with a loan covenant is only assessed after that date.</li>
          <li>A covenant that must be complied with on or before the reporting date affects whether the right to defer settlement exists; a covenant only tested after the reporting date does not.</li>
          <li>A new disclosure requirement where a liability is classified as non-current despite a covenant that must be met within twelve months of the reporting date - the entity must disclose information about the covenants, the carrying amount of the related liabilities, and any facts or circumstances suggesting the entity may struggle to comply.</li>
          <li>Clarified guidance on what "settlement" means where a liability could be settled through the transfer of the entity's own equity instruments (mainly relevant to public entities with share capital, rather than municipalities).</li>
          <li>A new general requirement to disclose the materiality judgements made in preparing the financial statements as a whole (new paragraph .38A) - how materiality was assessed, not just the outcome of applying it.</li>
        </ul>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Worked example</h4>
          <p className="text-gray-700 text-sm">
            A municipality has a R200 million DBSA loan repayable over 15 years, with a debt-service cover
            ratio covenant tested on 30 June each year. At 30 June 20X1 the ratio is 1.1, below the required
            1.2. Under the amended guidance, the right to defer settlement does not exist at the reporting
            date, so the full R200 million is classified as <strong>current</strong> - unless DBSA granted a
            waiver or grace period before 30 June. If the same covenant were instead tested on 31 December, it
            would not affect classification at 30 June at all, but the entity would still need to disclose the
            covenant, the carrying amount of the related liability, and any facts suggesting difficulty
            complying.
          </p>
        </div>
        <p className="text-gray-700 mt-4 text-sm">
          Read together with the tightened going concern requirements above, this amendment is really one
          coherent change: more rigorous, more transparent reporting on financial sustainability, running
          through both the loan note and the going concern note.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Landmark className="mr-3 text-blue-600" />
          Amended GRAP 103: heritage assets, redefined and reclassified
        </h2>
        <p className="text-gray-700 mb-4">
          GRAP 103 has offered a choice between the cost model and the revaluation (fair value) model for
          heritage assets since the Standard was first issued in 2008 - the June 2022 amendments, arising from
          the Board's 2020 post-implementation review, do not introduce that choice. What they actually change
          is more consequential for a municipality's balance sheet:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mb-4">
          <li>The definition of a heritage asset now hinges on "cultural significance" as described in the National Heritage Resources Act, 1999, rather than a bespoke GRAP-only list of criteria - and an item need not be formally designated as a heritage resource in legislation to still qualify as a heritage asset for accounting purposes.</li>
          <li><strong>All heritage assets are now accounted for under GRAP 103 and presented as a single line item</strong>, including heritage assets that have an alternative use (for example, a historic building still used as municipal offices) - which could previously sit under GRAP 17, Property, Plant and Equipment, or GRAP 16, Investment Property. Because GRAP 103 does not require depreciation, these reclassified assets stop being depreciated, and any depreciation previously recognised on them is reversed retrospectively against accumulated surplus or deficit on transition. This is the change with real balance sheet impact for metros, districts and provincial entities holding heritage buildings still in active use.</li>
          <li>Where entity-specific data is insufficient, peer-group data for a comparable heritage asset may now be used to determine a reliable fair value.</li>
          <li>Legislative protective rights (for example, SAHRA permit requirements or a prohibition on sale) do not, by themselves, prevent a reliable fair value from being determined - but they must now be disclosed, along with the reasons for any disposal of a protected asset.</li>
          <li>Where the range of reasonable fair value estimates is too wide to assess meaningfully, no fair value is determined at all, and an indicator-based re-assessment is required at each reporting date to check whether a reliable value has since become available.</li>
          <li>Additional impairment indicators were added, and several encouraged (non-mandatory) disclosures with limited informational value were removed to simplify the Standard.</li>
        </ul>
        <p className="text-gray-700 text-sm">
          Transition is split: some paragraphs apply prospectively, others retrospectively - so the transition
          working paper needs to track each change separately rather than applying one blanket approach.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="mr-3 text-blue-600" />
          The 2026 Improvements package: eight Standards, one omnibus pronouncement
        </h2>
        <p className="text-gray-700 mb-4">
          The Accounting Standards Board periodically issues an omnibus "Improvements to the Standards of
          GRAP" pronouncement - a single document that bundles smaller amendments across several Standards,
          rather than issuing each as a stand-alone exposure draft. The 2026 edition touches GRAP 1, 3, 4, 17,
          18, 19, 20 and 35. Individually, several of these read as tidy-up items. Collectively, they add up to
          a full accounting policy review across most of an entity's core financial statement notes.
        </p>
        <div className="border-l-4 border-blue-500 pl-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">GRAP 20 - Related Party Disclosures</h3>
          <p className="text-gray-700 text-sm">
            The improvements expand the illustrative example in Appendix A to indicate that members of an
            entity's committees - explicitly including audit and risk committee members - may themselves be
            related persons, where their role involves planning, directing or controlling the entity's
            activities. The assessment is based on substance over form: the actual governance responsibilities
            assigned to committee members, not their titles. New implementation guidance in Appendix B also
            works through the relationships between the three spheres of government: national and provincial
            entities within the same sphere are under common control and therefore related parties, but
            municipalities are <strong>not</strong> related to each other - only to their own municipal
            entities, and potentially to a provincial department where it exercises administrative control over
            a municipality.
          </p>
        </div>
        <p className="text-gray-700 text-sm">
          The remaining changes - touching GRAP 1 (materiality and liability classification, discussed above),
          GRAP 3 (accounting policies, changes in estimates and errors), GRAP 4 (foreign exchange), GRAP 17
          (property, plant and equipment), GRAP 18 (segment reporting), GRAP 19 (provisions, contingent
          liabilities and contingent assets), and GRAP 35 (consolidated financial statements) - range from
          clarifying existing principles to introducing new illustrative examples and consequential amendments
          flowing from the other pronouncements in this series. None is individually transformative. Together,
          they mean a genuine GRAP 2026 readiness review cannot stop at the headline new and revised Standards -
          it has to work through the full omnibus document, line by line, against the entity's existing
          accounting policies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting ahead of it</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ol className="list-decimal ml-6 space-y-2 text-gray-800 text-sm">
            <li>Rebuild the going concern working paper now, in the structure the amended GRAP 1 will require - significant judgements, principal events or conditions, possible effects, and management's mitigation plans - rather than waiting until a qualification or disclaimer forces the exercise.</li>
            <li>Reassess every material loan facility with covenants against the amended current/non-current classification guidance, and identify where new covenant disclosures will be required.</li>
            <li>Identify which heritage assets currently sit in PPE or investment property because of an alternative use, and quantify the effect of reclassifying them into GRAP 103 - including reversing accumulated depreciation against accumulated surplus or deficit.</li>
            <li>Work through the full Improvements (2026) document against current accounting policies for GRAP 1, 3, 4, 17, 18, 19, 20 and 35, rather than assuming an omnibus package can be actioned at the last minute.</li>
            <li>Update the related party disclosure process to explicitly consider audit and risk committee members and inter-sphere-of-government relationships - and confirm that municipalities in the same district are correctly treated as unrelated to one another.</li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Facing a going concern qualification, covenant risk, or a heritage asset reclassification?</h2>
        <p className="mb-4">
          AlloB Consultants can build your going concern disclosure framework, assess loan covenant
          classification under amended GRAP 1, and run a full readiness review against the 2026 Improvements
          package - before your auditors raise it for you.
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

export default Grap1103Improvements;
