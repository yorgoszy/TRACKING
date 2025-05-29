"use client"

import type React from "react"

import { AuthProvider } from "@/contexts/auth-context"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
