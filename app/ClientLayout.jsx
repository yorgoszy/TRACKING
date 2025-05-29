"use client"

import { LanguageProvider } from "../contexts/language-context"

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
