


export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-200 px-2 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-6">
          Your privacy is important to us at <span className="text-primary font-semibold">BlogSphere</span>. 
          This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
        <p className="text-gray-400 mb-4">
          We may collect personal information such as your name, email address, and any details you submit through forms (like newsletter subscriptions or contact messages). 
          We also collect non-personal data, including browser type, device information, and anonymous site usage statistics.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-400 mb-4">
          The information we collect helps us improve your experience, send relevant updates, and enhance our content. 
          We may use your email address to send newsletters or respond to your inquiries.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">3. Cookies</h2>
        <p className="text-gray-400 mb-4">
          Our website may use cookies to improve user experience. 
          Cookies help us analyze web traffic and customize content based on your preferences. 
          You can choose to accept or decline cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">4. Data Protection</h2>
        <p className="text-gray-400 mb-4">
          We use appropriate security measures to protect your personal data from unauthorized access or disclosure. 
          However, please note that no method of online transmission or storage is completely secure.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">5. Third-Party Links</h2>
        <p className="text-gray-400 mb-4">
          BlogSphere may contain links to external sites. We are not responsible for the content or privacy practices of those websites. 
          We encourage you to review the privacy policies of any external sites you visit.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">6. Your Rights</h2>
        <p className="text-gray-400 mb-4">
          You may request access to, correction of, or deletion of your personal data by contacting us. 
          You also have the right to unsubscribe from any newsletters at any time.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">7. Updates to This Policy</h2>
        <p className="text-gray-400 mb-4">
          We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated revision date.
        </p>

        <p className="text-gray-400 mt-10">
          If you have any questions about this policy, please contact us at{" "}
          <a
            href="mailto:contact@blogsphere.com"
            className="text-primary hover:underline"
          >
            contact@blogsphere.com
          </a>.
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Last updated: October 23, 2025
        </p>
      </div>
    </main>
  );
}
