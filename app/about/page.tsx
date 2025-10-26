


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-200 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">About BlogSphere</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          At BlogSphere, we believe in the power of ideas and stories to inspire and educate. 
          Our mission is to create a space where curious minds can explore a wide range of topics — from technology and creativity to lifestyle and self-improvement.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 text-left mt-10">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Our Mission</h3>
            <p className="text-gray-400 text-sm">
              To empower readers through meaningful content that informs, entertains, and sparks conversation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Our Vision</h3>
            <p className="text-gray-400 text-sm">
              To be the go-to hub for thoughtful insights and original stories across diverse domains.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Our Values</h3>
            <p className="text-gray-400 text-sm">
              Authenticity, creativity, and community are at the heart of everything we publish.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
