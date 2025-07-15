"use client";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans flex flex-col items-center px-4 py-20">
      <div className="max-w-3xl w-full mx-auto bg-neutral-900 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-cyan-400">GENERAL TERMS AND CONDITIONS</h1>
        <p className="text-gray-400 mb-2">ActARion B.V.<br/>Version: July 2025</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">1. Definitions</h2>
        <p className="text-gray-300 mb-2">In these General Terms and Conditions, the following terms shall have the meanings ascribed to them below:</p>
        <ul className="text-gray-300 list-disc list-inside mb-4">
          <li><b>ActARion:</b> ActARion B.V., registered in the Netherlands, offering AR-driven SOP software solutions.</li>
          <li><b>Client:</b> Any natural or legal person who enters into an agreement with ActARion or uses its services.</li>
          <li><b>Agreement:</b> Any contract between ActARion and the Client concerning the provision of Services or Software.</li>
          <li><b>Software:</b> Any software products, including AR applications and platforms, provided by ActARion under license.</li>
          <li><b>Services:</b> Any professional services such as implementation, training, consulting or support related to the Software.</li>
          <li><b>Partner:</b> A third party engaged by ActARion for implementation or technology integration.</li>
        </ul>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">2. Applicability</h2>
        <p className="text-gray-300 mb-2">2.1 These Terms and Conditions apply to all offers, quotations, agreements and deliveries of ActARion unless explicitly agreed otherwise in writing.<br/>2.2 The Client’s general terms and conditions are expressly rejected.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">3. Offers and Agreements</h2>
        <p className="text-gray-300 mb-2">3.1 All offers and quotations by ActARion are non-binding and valid for 30 days unless otherwise stated.<br/>3.2 An agreement is established only when confirmed in writing by ActARion or upon commencement of delivery of services or access to software.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">4. Use of Software</h2>
        <p className="text-gray-300 mb-2">4.1 The Client is granted a non-exclusive, non-transferable, and time-limited right to use the Software solely for internal business purposes.<br/>4.2 The Client shall not (i) copy, modify or create derivative works, (ii) sublicense or distribute, or (iii) reverse engineer the Software.<br/>4.3 Licenses are subject to payment in accordance with the Agreement and may be suspended in case of late payment.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">5. Implementation and Support</h2>
        <p className="text-gray-300 mb-2">5.1 ActARion and its certified Partners may provide implementation services.<br/>5.2 Support levels, response times, and service levels are described in a separate SLA (if applicable).<br/>5.3 ActARion is not liable for the performance of third-party implementation partners unless explicitly stated.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">6. Prices and Payment</h2>
        <p className="text-gray-300 mb-2">6.1 All prices are exclusive of VAT and other government-imposed taxes or levies.<br/>6.2 Invoices must be paid within 30 days unless otherwise agreed.<br/>6.3 In case of late payment, ActARion may charge statutory commercial interest and suspend services.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">7. Confidentiality</h2>
        <p className="text-gray-300 mb-2">7.1 Both parties shall keep confidential information strictly confidential and use it solely for the performance of the Agreement.<br/>7.2 Confidentiality obligations remain in effect for a period of five (5) years after termination of the Agreement.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">8. Intellectual Property</h2>
        <p className="text-gray-300 mb-2">8.1 All intellectual property rights related to the Software, content, and services remain with ActARion or its licensors.<br/>8.2 The Client shall not remove or obscure any proprietary notices.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">9. Data Protection</h2>
        <p className="text-gray-300 mb-2">9.1 ActARion processes personal data in accordance with applicable data protection laws, including the GDPR.<br/>9.2 A separate Data Processing Agreement (DPA) shall be concluded if required by law.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">10. Liability and Indemnification</h2>
        <p className="text-gray-300 mb-2">10.1 ActARion’s liability is limited to direct damages and capped at the total fees paid in the preceding 12 months.<br/>10.2 ActARion is not liable for indirect, consequential, or incidental damages, including loss of data or business interruption.<br/>10.3 The Client shall indemnify ActARion against claims by third parties arising from breach of the Agreement or misuse of the Software.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">11. Duration and Termination</h2>
        <p className="text-gray-300 mb-2">11.1 The Agreement is valid for the term specified therein and renews automatically unless terminated in writing at least 30 days prior to expiration.<br/>11.2 Either party may terminate the Agreement with immediate effect in the event of a material breach or insolvency of the other party.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">12. Governing Law and Dispute Resolution</h2>
        <p className="text-gray-300 mb-2">12.1 These Terms and Conditions are governed by the laws of the Netherlands.<br/>12.2 Any disputes shall be submitted to the competent court in Amsterdam, the Netherlands.</p>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">13. Miscellaneous</h2>
        <p className="text-gray-300 mb-2">13.1 Changes to these Terms and Conditions will be published on www.actarion.com and take effect 30 days after publication.<br/>13.2 If any provision is deemed invalid or unenforceable, the remaining provisions shall remain in full force.</p>
        <Link href="/" className="text-cyan-400 hover:underline text-base font-medium mt-8">← Back to Home</Link>
      </div>
    </div>
  );
} 