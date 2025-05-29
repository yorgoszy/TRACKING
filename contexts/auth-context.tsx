// ΣΗΜΕΙΩΣΗ: Για να λειτουργήσει το Google login, πρέπει να προσθέσετε τις παρακάτω μεταβλητές περιβάλλοντος:
// NEXT_PUBLIC_GOOGLE_CLIENT_ID - Το Client ID από το Google Cloud Console
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "admin" | "mini-admin" | "athlete" | null

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isFirstLogin: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
  setPassword: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Always set admin user - no authentication required
    const defaultUser = {
      id: "admin-1",
      email: "admin@hyperkids.com",
      name: "Admin User",
      role: "admin" as UserRole,
      isFirstLogin: false,
    }
    setUser(defaultUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Always succeed - no authentication required
      const adminUser = {
        id: "admin-1",
        email: email,
        name: "Admin User",
        role: "admin" as UserRole,
        isFirstLogin: false,
      }
      setUser(adminUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Αρχικοποίηση του Google OAuth client
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
      const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/api/auth/google/callback` : ""

      // Δημιουργία των παραμέτρων για το Google OAuth
      const params = {
        response_type: "code",
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        redirect_uri: redirectUri,
        scope: "openid email profile",
        prompt: "select_account",
      }

      // Δημιουργία του URL για ανακατεύθυνση
      const queryString = new URLSearchParams(params).toString()
      const authUrl = `${googleAuthUrl}?${queryString}`

      // Ανακατεύθυνση στο Google OAuth
      window.location.href = authUrl
    } catch (error) {
      console.error("Google login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        name,
        role: "athlete" as UserRole,
        isFirstLogin: false,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const setPassword = async (password: string) => {
    setIsLoading(true)
    try {
      // Simulate password setting
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (user) {
        const updatedUser = {
          ...user,
          isFirstLogin: false,
        }

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
    } catch (error) {
      console.error("Setting password failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, logout, register, setPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
