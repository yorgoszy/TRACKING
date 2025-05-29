"use client"

import { useEffect } from "react"

export default function ClientWrapper({ children }) {
  // Εδώ μπορείτε να προσθέσετε οποιαδήποτε client-side λογική χρειάζεστε
  useEffect(() => {
    // Client-side λογική που χρειάζεται να εκτελεστεί μετά το mounting
  }, [])

  return <>{children}</>
}
