"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap justify-between gap-10">
        {/* Brand Info */}
        <div className="flex-1 min-w-[250px] max-w-[300px]">
          <h2 className="text-2xl font-bold text-white mb-3">BlogSphere</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            BlogSphere is your gateway to insightful articles, creative stories, and the latest trends in tech, design, and life. Explore. Learn. Grow.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[180px] max-w-[200px]">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/blogs" className="text-gray-400 hover:text-primary transition-colors">Blogs</Link>
            </li>
            <li>
              <Link href="/categories" className="text-gray-400 hover:text-primary transition-colors">Categories</Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[250px] max-w-[300px]">
          <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary" />
              <span> New Delhi, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+91" className="hover:text-primary transition-colors">
                +91 
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:contact@blogsphere.com" className="hover:text-primary transition-colors">
                contact@blogsphere.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* privacy and terms */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">BlogSphere</span>. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
