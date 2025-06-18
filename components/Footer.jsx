"use client"

import Link from "next/link"
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Courses", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Features", href: "#" },
    { name: "Mobile App", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  categories: [
    { name: "Web Development", href: "#" },
    { name: "Data Science", href: "#" },
    { name: "Design", href: "#" },
    { name: "Business", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-emerald-100/80 backdrop-blur-md text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="container px-4 py-16 mx-auto sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              
              <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
              <span className="text-lg font-bold text-white">L</span>
            </div>
            <span className="ml-2 text-lg text-emerald-800 font-bold">Lucis</span>
          </div>
              </Link>
            </div>
            </div>

            
            <p className="text-gray-900 mb-6 max-w-md">
              Empowering learners worldwide with high-quality, accessible education. Join millions of students in their
              journey to success.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-900 hover:text-emerald-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-900 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-900 hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-900 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-900 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-900 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-900 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-900 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
              <div className="flex items-center gap-2 text-gray-900">
                <Mail className="w-4 h-4" />
                <span>support@learnhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-900">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <p className="text-gray-900 text-sm">© 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
