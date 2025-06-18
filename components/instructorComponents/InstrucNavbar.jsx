"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"




export default function InstructorNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism effect container */}
      <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  GlassBrand
                </span>
              </Link>
            </div>

           

            {/* CTA button
            <div className="hidden md:flex md:items-center">
              <Link href={'/auth'}><Button size="sm"  className="ml-4 rounded-full hover:bg-slate-700">
                Get Started
              </Button></Link>
            </div> */}

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  )
}

