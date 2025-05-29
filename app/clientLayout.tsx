"use client"

import type React from "react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style jsx global>{`
          @font-face {
            font-family: 'RoobertPRO';
            src: url('/fonts/RoobertPRO-Medium.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'RoobertPRO';
            src: url('/fonts/RoobertPRO-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
