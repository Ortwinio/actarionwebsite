import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ActARion',
  description: 'Learn about how ActARion collects, uses, and protects your personal information and cookie usage.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you contact us through our website forms or email.
            </p>
            <p className="text-gray-300">
              We also automatically collect certain information when you visit our website, including your IP address, browser type, 
              operating system, referring URLs, and information about your use of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">2. How We Use Cookies</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. Here are the types of cookies we use:
            </p>
            
            <div className="space-y-4">
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Necessary Cookies</h3>
                <p className="text-gray-300 text-sm">
                  These cookies are essential for the website to function properly. They enable basic functions like page navigation 
                  and access to secure areas of the website. The website cannot function properly without these cookies.
                </p>
              </div>
              
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
                <p className="text-gray-300 text-sm">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information 
                  anonymously. This helps us improve our website and services.
                </p>
              </div>
              
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
                <p className="text-gray-300 text-sm">
                  These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">4. Information Sharing</h2>
            <p className="text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this privacy policy or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">5. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">6. Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Withdraw consent for cookie usage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">7. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this privacy policy or our practices, please contact us at{' '}
              <a href="mailto:privacy@actarion.com" className="text-cyan-400 hover:text-cyan-300 underline">
                privacy@actarion.com
              </a>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-neutral-700">
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 