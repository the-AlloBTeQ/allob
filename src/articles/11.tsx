import { FileSignature, ArrowRight, Building2, ListChecks } from 'lucide-react';

const Grap109: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mb-3">
          GRAP Watch Series &middot; Article 4 of 5
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          GRAP 109 Amended: Why the Sharpened "Binding Arrangement" Test Changes How You Account for Agency Income
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          If your municipality collects money, manages funds, or delivers a programme on behalf of another
          sphere of government, GRAP 109 already governs how you account for it.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <p className="text-gray-700">
            The amendments, issued in July 2026 following a 2023 post-implementation review, do not invent the
            binding arrangement concept - it has been part of GRAP 109 since the Standard was first issued.
            What they do is consolidate the guidance, sharpen the assessment, and add disclosure that makes the
            judgement calls visible to users.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FileSignature className="mr-3 text-blue-600" />
          What GRAP 109 has always been about
        </h2>
        <p className="text-gray-700 mb-4">
          Public sector entities constantly act on one another's behalf: a municipality collects a levy for a
          provincial department, manages the flow of conditional grant funds to a contractor, or administers a
          national programme locally. GRAP 109 exists to answer a deceptively hard question - when this
          happens, which entity accounts for the transaction as its own revenue, expense, asset or liability
          (the <em>principal</em>), and which merely facilitates the transaction on the principal's behalf,
          recognising only a fee or commission for doing so (the <em>agent</em>)?
        </p>
        <p className="text-gray-700">
          Before this Standard existed, entities leaned on risks-and-rewards analysis borrowed from private
          sector revenue accounting. The Board's basis for conclusions is candid about why that did not work
          well in government: risks-and-rewards indicators are frequently not relevant to public sector
          arrangements, particularly where two organs of state have overlapping mandates. GRAP 109 replaced
          that with a "beneficial control" model built around directed transactions and a binding arrangement -
          and the 2026 amendments sharpen how that model is applied.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What the 2026 amendments actually changed</h2>
        <p className="text-gray-700 mb-4">
          Following the Board's 2023 post-implementation review, the amendments (ED 215) are best read as a
          clarification exercise, not a new concept. The key changes:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
          <li>The binding arrangement guidance is consolidated into the definitions section (paragraphs .05A to .05D), with a new point that in the public sector, past conduct that leaves a party with no realistic alternative but to act a certain way can itself evidence a binding arrangement - even with no contract or legislation behind it.</li>
          <li>A binding arrangement can consist of a <strong>combination</strong> of mechanisms - legislation setting the overarching framework, and a contract filling in the detail - read together.</li>
          <li>The assessment is done <strong>per transaction, or per group of transactions that share similar characteristics</strong> - not once for the whole arrangement. A single MOU can contain both principal activities and agent activities within it.</li>
          <li>Where the terms of a binding arrangement are modified, the parties must re-assess whether it still meets the definition, and whether their roles have changed.</li>
          <li>The "direction" a principal gives an agent does not require an active instruction - it can be established by the rights and obligations in the arrangement itself.</li>
          <li>Substance over form governs the whole assessment: a binding arrangement may label parties "principal", "agent" or use entirely different terms, but the economic substance of the rights and obligations decides the outcome, regardless of legal opinions or labels.</li>
          <li>A new disclosure objective replaces the old materiality guidance, and a new paragraph .62A requires disclosure of the significant judgements made both in concluding whether a principal-agent arrangement exists at all, and in concluding which party is which.</li>
          <li>A cross-reference is added to the encouraged disclosure in GRAP 2 on restricted cash balances.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <ListChecks className="mr-3 text-blue-600" />
          Assessing who is the principal and who is the agent
        </h2>
        <p className="text-gray-700 mb-4">
          The beneficial-control indicators themselves are not new, but they remain the operative test once a
          binding arrangement and third-party transactions are confirmed:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
          <li>the power to determine the significant terms and conditions of the transactions with third parties;</li>
          <li>the ability to use all or substantially all of the resources that result from those transactions; and</li>
          <li>exposure to variability in the results of the transactions with third parties.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This Standard does not require identifying specific individual third parties - the assessment is made
          at the level of the class of transaction, not beneficiary by beneficiary - but it does require an
          entity to work through the assessment for each individual arrangement, and for each significant
          transaction type within a broader programme, rather than assuming one conclusion covers everything
          the arrangement touches.
        </p>
      </section>

      <section className="mb-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-amber-700" />
          Worked example - drawn from GRAP 109's own illustration
        </h2>
        <p className="text-gray-800 text-sm mb-3">
          A provincial housing department contracts a municipality to manage the construction of 500 houses and
          hand them over to beneficiaries the department has selected, for a fee of R1,000 per house. The
          department sets the specifications, appoints the contractor and funds the build. The municipality
          does not set the terms, cannot keep the houses or the funds, and bears no loss if a contractor
          overruns - it is the <strong>agent</strong>, and recognises only its R1,000-per-house fee as revenue.
        </p>
        <p className="text-gray-800 text-sm">
          But if the same municipality also collects a R500 connection fee from each beneficiary under its own
          tariff policy and keeps it, that transaction is assessed <strong>separately</strong> and the
          municipality is the <strong>principal</strong> for it. One agreement, two conclusions, both
          disclosed under the new significant-judgements requirement in paragraph .62A.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">National Housing Programme arrangements</h2>
        <p className="text-gray-700 mb-4">
          The amendments to GRAP 109 are accompanied by amendments to the existing ASB Guideline on Accounting
          for Arrangements Undertaken in terms of the National Housing Programme. The Guideline makes a point
          that is easy to miss under time pressure: labels used in a binding arrangement - "project manager,"
          "project developer" and similar terms - do not determine the accounting outcome. A municipality must
          still assess its actual roles, responsibilities and authority for each activity and related
          transaction to determine whether it is acting as principal or agent, regardless of what the
          arrangement calls it. The focus should be on the individual transactions a municipality undertakes
          with beneficiaries, contractors and other service providers - not on the housing arrangement as a
          single, undifferentiated whole.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Presentation: when agency cash flows can be shown net</h2>
        <p className="text-gray-700 mb-4">
          GRAP 2, Cash Flow Statements, already permitted cash receipts collected and payments made on behalf
          of customers, taxpayers or beneficiaries to be reported on a net basis where the cash flows reflect
          the activities of the other party rather than the entity's own. The consequential amendment simply
          adds a cross-reference to GRAP 109's definition of a principal-agent arrangement as an example of
          when this applies - it is a clarification of an existing permission, not a new one. Directly
          relevant public sector examples remain: the collection of taxes by one level of government for
          another (excluding taxes collected for the government's own use under a tax-sharing arrangement), and
          rents collected on behalf of, and paid over to, property owners. Getting the principal/agent
          conclusion right under GRAP 109 therefore has a direct, visible effect on how the cash flow statement
          is presented, not just on the statement of financial performance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Transition and new disclosure</h2>
        <p className="text-gray-700 mb-4">
          The amendments apply <strong>retrospectively</strong>, with earlier application permitted once a
          date is set. Historical agency arrangements will need to be re-assessed against the sharpened
          per-transaction approach, and comparatives may need restating. For an entity managing several
          intergovernmental or agency arrangements at once, the working papers behind each principal/agent
          conclusion need to be maintained in a form that can support a stand-alone disclosure note under the
          new .62A requirement, not just an internal file.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting ahead of it</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ol className="list-decimal ml-6 space-y-2 text-gray-800 text-sm">
            <li>Map every arrangement where the entity collects funds, manages fund flows, or delivers services on behalf of another organ of state, or has another entity acting on its behalf - including conditional grant administration, housing programme arrangements, and shared-services agreements.</li>
            <li>Confirm the binding arrangement behind each one - contract, MOU, service level agreement, legislative delegation, or established past conduct - and document it where that documentation does not already exist in a readily retrievable form.</li>
            <li>Re-run the principal/agent assessment for each arrangement under the beneficial-control indicators, at the level of individual transaction types rather than the arrangement as a whole.</li>
            <li>Check cash flow statement presentation against the confirmed conclusions, and correct any arrangements currently presented gross that should be net, or vice versa.</li>
            <li>Build the significant-judgements disclosure into the accounting policy note template ahead of the first affected reporting period, and plan for retrospective restatement of prior-period agency arrangements.</li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Administering grants, housing programmes or agency collections?</h2>
        <p className="mb-4">
          AlloB Consultants can map your intergovernmental and agency arrangements against the amended
          GRAP 109 test, document the binding arrangements behind them, and build the significant-judgements
          disclosures your auditors will expect.
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

export default Grap109;
