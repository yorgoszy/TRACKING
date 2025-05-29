"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

export function LoginModal() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)
  const { login, loginWithGoogle, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation for admin user
    if (email === "yorgoszy@gmail.com" && password === "admin") {
      toast({
        title: t("login.success"),
        description: `Welcome, Admin!`,
      })
      setOpen(false)
      // In a real app, you would set authentication state here
    } else {
      toast({
        title: t("login.error"),
        description: t("login.error"),
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">{t("nav.signin")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("login.title")}</DialogTitle>
          <DialogDescription>
            {t("login.noAccount")}{" "}
            <a href="#" className="text-primary hover:underline">
              {t("login.createAccount")}
            </a>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("login.email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("login.password")}</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                {t("login.forgotPassword")}
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Google Login Button */}
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => {
                loginWithGoogle().catch(() => {
                  toast({
                    title: t("login.error"),
                    description: t("login.googleError"),
                    variant: "destructive",
                  })
                })
              }}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              {isLoading ? "..." : t("login.googleLogin")}
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "..." : t("login.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
