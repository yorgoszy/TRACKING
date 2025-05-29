"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, User } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  // Safe access to auth context
  let user = null
  let logout = () => {}
  let auth = { user: null, logout: () => {} } // Provide default values
  try {
    auth = useAuth()
    user = auth?.user
    logout = auth?.logout
  } catch (error) {
    // Auth provider not available
    console.log("Auth provider not available")
  }

  // Safe access to language context with fallbacks
  let t = (key: string) => key
  let language = "el"
  let setLanguage = (lang: string) => {}
  let langContext
  try {
    langContext = useLanguage()
    t = langContext.t
    language = langContext.language
    setLanguage = langContext.setLanguage
  } catch (error) {
    console.log("Language provider not available")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            Performance Gym
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/programs" className="text-sm font-medium hover:text-primary transition-colors">
            Programs
          </Link>
          <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
                {language === "en" && <span className="ml-2">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("el")}>
                Greek
                {language === "el" && <span className="ml-2">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {auth.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(auth.user?.role === "admin" || auth.user?.role === "mini-admin") && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-base font-medium" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/services" className="text-base font-medium" onClick={() => setOpen(false)}>
                  Services
                </Link>
                <Link href="/programs" className="text-base font-medium" onClick={() => setOpen(false)}>
                  Programs
                </Link>
                <Link href="/articles" className="text-base font-medium" onClick={() => setOpen(false)}>
                  Articles
                </Link>
                <Link href="/about" className="text-base font-medium" onClick={() => setOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-base font-medium" onClick={() => setOpen(false)}>
                  Contact
                </Link>
                {!auth.user && (
                  <Button asChild className="mt-4" onClick={() => setOpen(false)}>
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
