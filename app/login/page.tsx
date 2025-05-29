"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const { login, isLoading, user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleOneClickLogin = async () => {
    try {
      // Login with default credentials
      await login("admin@hyperkids.com", "password")
      toast({
        title: "Login successful",
        description: "You are now logged in as admin.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <SiteHeader />
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("auth.login")}</CardTitle>
            <CardDescription>Click the button below to login as admin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              No password required. Just click the button to access the dashboard.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOneClickLogin} className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login as Admin"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
