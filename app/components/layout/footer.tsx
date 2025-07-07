"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Logo Section */}
        <div className="flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
          <Link href="/" className="text-2xl font-bold">
            Didwa Foods
          </Link>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 gap-4 p-8 md:p-12 col-span-2">
          <Link 
            href="https://twitter.com/didwafoods" 
            target="_blank"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Twitter className="h-5 w-5" />
            </div>
            <span>Twitter</span>
          </Link>

          <Link 
            href="https://instagram.com/didwafoods" 
            target="_blank"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Instagram className="h-5 w-5" />
            </div>
            <span>Instagram</span>
          </Link>

          <Link 
            href="https://facebook.com/didwafoods" 
            target="_blank"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Facebook className="h-5 w-5" />
            </div>
            <span>Facebook</span>
          </Link>

          <Link 
            href="https://linkedin.com/company/didwafoods" 
            target="_blank"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Linkedin className="h-5 w-5" />
            </div>
            <span>LinkedIn</span>
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-400 text-center">
            © All Rights Reserved. {new Date().getFullYear()}, Didwa Foods Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
} 