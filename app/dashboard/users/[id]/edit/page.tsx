"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, ArrowLeft, Save } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string | null
  email: string
  phone: string | null
  photo_url: string | null
  role: "admin" | "mini-admin" | "athlete" | "parent" | "coach" | "both" | "general"
  user_status: "active" | "inactive"
  birth_date: string | null
}

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo_url: "",
    role: "general" as User["role"],
    user_status: "active" as "active" | "inactive",
    birth_date: "",
  })

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("app_users").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error fetching user:", error)
        toast({
          title: "Σφάλμα",
          description: "Δεν ήταν δυνατή η φόρτωση του χρήστη",
          variant: "destructive",
        })
        return
      }

      setUser(data)
      setFormData({
        name: data.name || "",
        email: data.email,
        phone: data.phone || "",
        photo_url: data.photo_url || "",
        role: data.role,
        user_status: data.user_status,
        birth_date: data.birth_date || "",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Σφάλμα",
        description: "Παρουσιάστηκε σφάλμα",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from("app_users")
        .update({
          name: formData.name || null,
          email: formData.email,
          phone: formData.phone || null,
          photo_url: formData.photo_url || null,
          role: formData.role,
          user_status: formData.user_status,
          birth_date: formData.birth_date || null,
        })
        .eq("id", params.id)

      if (error) {
        console.error("Error updating user:", error)
        toast({
          title: "Σφάλμα",
          description: "Δεν ήταν δυνατή η ενημέρωση του χρήστη",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Επιτυχία",
        description: "Ο χρήστης ενημερώθηκε επιτυχώς",
      })

      // Navigate back to user profile
      router.push(`/dashboard/users/${params.id}`)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Σφάλμα",
        description: "Παρουσιάστηκε σφάλμα",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση χρήστη...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Χρήστης δεν βρέθηκε</h3>
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
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push(`/dashboard/users/${user.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Πίσω
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Επεξεργασία Χρήστη</h1>
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Στοιχεία Χρήστη</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.photo_url || "/placeholder.svg"} alt={formData.name || "User"} />
                <AvatarFallback className="text-lg">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : formData.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="photo">Φωτογραφία</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // Handle file upload here
                      console.log("File selected:", file)
                    }
                  }}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Όνομα</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Εισάγετε το όνομα"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Εισάγετε το email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Τηλέφωνο</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Εισάγετε το τηλέφωνο"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Ρόλος *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as User["role"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε ρόλο" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Διαχειριστής</SelectItem>
                    <SelectItem value="mini-admin">Μικρός Διαχειριστής</SelectItem>
                    <SelectItem value="coach">Προπονητής</SelectItem>
                    <SelectItem value="athlete">Αθλητής</SelectItem>
                    <SelectItem value="parent">Γονέας</SelectItem>
                    <SelectItem value="both">Αθλητής & Γονέας</SelectItem>
                    <SelectItem value="general">Γενικός Χρήστης</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Κατάσταση *</Label>
                <Select
                  value={formData.user_status}
                  onValueChange={(value) => setFormData({ ...formData, user_status: value as "active" | "inactive" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε κατάσταση" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ενεργός</SelectItem>
                    <SelectItem value="inactive">Ανενεργός</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birth_date">Ημερομηνία Γέννησης</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
                disabled={saving}
              >
                Ακύρωση
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Αποθήκευση...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Αποθήκευση
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
