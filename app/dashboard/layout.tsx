"use client"

import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SiteHeader } from "@/components/site-header"

function DashboardLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-screen bg-background">
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="flex flex-col space-y-6 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
              <DashboardSidebar />
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </AuthProvider>
    </LanguageProvider>
  )
}
