



export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-200 px-2 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-gray-400 mb-6">
          Welcome to BlogSphere! By using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">1. Use of Content</h2>
        <p className="text-gray-400 mb-4">
          All articles, media, and information published on BlogSphere are for informational purposes only. Republishing or redistributing without permission is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">2. User Conduct</h2>
        <p className="text-gray-400 mb-4">
          You agree not to engage in any activity that could harm or disrupt our services, including unauthorized access or data scraping.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">3. Disclaimer</h2>
        <p className="text-gray-400 mb-4">
          BlogSphere is not liable for any loss or damages resulting from the use of our site or reliance on information provided here.
        </p>

        <p className="text-gray-400 mt-10">
          If you have any questions about these terms, please contact us at{" "}
          <span className="text-primary">contact@blogsphere.com</span>.
        </p>
      </div>
    </main>
  );
}
