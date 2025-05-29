"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, ArrowLeft, Edit, Mail, Phone, Calendar, UserIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { el } from "date-fns/locale"
import Link from "next/link"

interface AppUser {
  id: string
  name: string | null
  email: string
  phone: string | null
  photo_url: string | null
  role: "admin" | "mini-admin" | "athlete" | "parent" | "coach" | "both" | "general"
  user_status: "active" | "inactive"
  created_at: string
  birth_date: string | null
}

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    try {
      setLoading(true)

      // Try to find user by slug (name) first, then by ID
      let userData = null

      if (typeof params.id === "string") {
        // First try to find by slug (name converted to URL-friendly format)
        const { data: userBySlug } = await supabase
          .from("app_users")
          .select("*")
          .ilike("name", params.id.replace(/-/g, " "))
          .single()

        if (userBySlug) {
          userData = userBySlug
        } else {
          // If not found by slug, try by ID
          const { data: userById } = await supabase.from("app_users").select("*").eq("id", params.id).single()

          userData = userById
        }
      }

      if (userData) {
        setUser(userData)
      } else {
        setError("Ο χρήστης δεν βρέθηκε")
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      setError("Σφάλμα κατά τη φόρτωση του χρήστη")
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadgeVariant = (role: AppUser["role"]) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "mini-admin":
        return "destructive"
      case "coach":
        return "default"
      case "athlete":
        return "secondary"
      case "parent":
        return "outline"
      case "both":
        return "default"
      case "general":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getRoleText = (role: AppUser["role"]) => {
    switch (role) {
      case "admin":
        return "Διαχειριστής"
      case "mini-admin":
        return "Μικρός Διαχειριστής"
      case "coach":
        return "Προπονητής"
      case "athlete":
        return "Αθλητής"
      case "parent":
        return "Γονέας"
      case "both":
        return "Αθλητής & Γονέας"
      case "general":
        return "Γενικός Χρήστης"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση προφίλ χρήστη...</span>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Χρήστης δεν βρέθηκε</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.push("/dashboard/users")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή στους χρήστες
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard/users")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Πίσω
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Προφίλ Χρήστη</h1>
        </div>
        <Button asChild>
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Επεξεργασία
          </Link>
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photo_url || ""} alt={user.name || "User"} />
              <AvatarFallback className="text-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{user.name || "Χωρίς όνομα"}</CardTitle>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant={getRoleBadgeVariant(user.role)} className="text-sm">
                  {getRoleText(user.role)}
                </Badge>
                <Badge variant={user.user_status === "active" ? "default" : "secondary"}>
                  {user.user_status === "active" ? "Ενεργός" : "Ανενεργός"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Στοιχεία Επικοινωνίας</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Τηλέφωνο</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
                {user.birth_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Ημερομηνία Γέννησης</p>
                      <p className="font-medium">{format(new Date(user.birth_date), "dd MMMM yyyy", { locale: el })}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Πληροφορίες Λογαριασμού</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Ημερομηνία Δημιουργίας</p>
                    <p className="font-medium">{format(new Date(user.created_at), "dd MMMM yyyy", { locale: el })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">ID Χρήστη</p>
                    <p className="font-medium text-xs text-gray-500">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
