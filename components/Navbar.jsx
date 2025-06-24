"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/authContext"

import { useRouter } from "next/navigation"

import useLogout from "@/apiRequest/logout"
import { toast } from "react-toastify"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, checkAuthStatus } = useAuth()
  const router = useRouter()

  const logout = useLogout()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setIsMenuOpen(false)
    try {
      await logout()
     // toast.success("Successfully logged out")
    } catch (error) {
     // toast.error("Failed to logout")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const popUp = async () => {
    toast.info("To access this feature ADENIYIEMMANUEL042@GMAIL.COM, 123456789")
  }

  const getUserInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    )
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism effect container */}
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-50/80 backdrop-blur-lg border-b border-border/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0" onClick={()=>setIsMenuOpen(false)}>
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
                    <span className="text-lg font-bold text-white">L</span>
                  </div>
                  <span className="ml-2 text-lg text-emerald-800 font-bold">Lucis</span>
                </div>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                className="inline-flex items-center px-1 pt-1 text-sm font-medium 
              text-foreground/80 hover:text-foreground transition-colors"
                href="#"
                onClick={popUp}
              >
                Teach on Lucis
              </Link>

              {user && (
                <Link
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium 
              text-foreground/80 hover:text-foreground transition-colors"
                  href={user?.role === "student" ? "/student" : "/instructor"}
                >
                  My Portal
                </Link>
              )}
            </nav>

            {/* CTA button */}
            <div className="hidden md:flex md:items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full hover:bg-emerald-100/50 transition-all duration-200"
                    >
                      <Avatar className="h-9 w-9 border-2 border-emerald-200">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-emerald-600 text-white text-sm font-semibold">
                          {getUserInitials(user?.name || "User")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={user?.role === "student" ? "/student" : "/instructor"} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Portal</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={"/auth"}>
                  <Button
                    size="sm"
                    className="ml-4 rounded-full hover:bg-emerald-800 bg-emerald-700 transition-all duration-200 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 z-50 bg-background/90 backdrop-blur-md border-b border-border/40 shadow-lg md:hidden transition-all duration-600 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 rounded-md transition-all",
                isMenuOpen
                  ? "opacity-100 translate-x-0 transform transition-all duration-300 ease-out"
                  : "opacity-0 -translate-x-4 transform transition-all duration-200 ease-in",
                // Add staggered delay based on index
                isMenuOpen && `delay-[${100 + index * 50}ms]`,
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
            
          ))}
            {user && (
                <Link 
                href={user?.role === "student" ? "/student" : "/instructor"}
                  className={cn(
                "block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 rounded-md transition-all",
                isMenuOpen
                  ? "opacity-100 translate-x-0 transform transition-all duration-300 ease-out"
                  : "opacity-0 -translate-x-4 transform transition-all duration-200 ease-in",
                // Add staggered delay based on index
                isMenuOpen 
              )}
              onClick={() => setIsMenuOpen(false)}
            >
                  My Portal
                </Link>
              )}

          {/* Mobile user section */}
          {user ? (
            <div
              className={cn(
                "pt-4 pb-3 border-t border-border/20 transition-all duration-300",
                isMenuOpen ? "opacity-100 translate-y-0 delay-[350ms]" : "opacity-0 translate-y-4",
              )}
            >
              <div className="flex items-center px-3 py-2 mb-3">
                <Avatar className="h-8 w-8 border-2 border-emerald-200">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-emerald-600 text-white text-xs font-semibold">
                    {getUserInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                "pt-4 pb-3 transition-all duration-300",
                isMenuOpen ? "opacity-100 translate-y-0 delay-[350ms]" : "opacity-0 translate-y-4",
              )}
            >
              <Link href={"/auth"}>
                <Button
                  className={cn(
                    "w-full rounded-full transition-all duration-300 transform hover:bg-emerald-800 bg-emerald-700",
                    isMenuOpen ? "scale-100" : "scale-95",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
