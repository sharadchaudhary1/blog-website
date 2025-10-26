


import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-200 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Contact Us</h1>
        <p className="text-gray-400 text-center mb-10">
          Have questions, feedback, or partnership ideas? We’d love to hear from you.
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <p> New Delhi, India</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+91" className="hover:text-primary transition-colors">
                +91
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:contact@blogsphere.com" className="hover:text-primary transition-colors">
                contact@blogsphere.com
              </a>
            </div>
          </div>

          {/*  Form */}
          <form className="flex-1 bg-slate-900 border border-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
