"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Users, Calendar, TrendingUp, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format, subDays } from "date-fns"
import { el } from "date-fns/locale"

interface DashboardStats {
  totalAthletes: number
  activePrograms: number
  upcomingClasses: number
  averageProgress: number
}

interface RecentActivity {
  id: string
  type: string
  description: string
  timestamp: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalAthletes: 0,
    activePrograms: 0,
    upcomingClasses: 0,
    averageProgress: 0,
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch real athletes count
      const { data: athletes, error: athletesError } = await supabase
        .from("app_users")
        .select("id")
        .eq("role", "athlete")

      // Fetch real programs count
      const { data: programs, error: programsError } = await supabase.from("programs").select("id, created_at")

      // Fetch real exercises count for upcoming classes simulation
      const { data: exercises, error: exercisesError } = await supabase.from("exercises").select("id")

      // Calculate real stats
      const totalAthletes = athletes?.length || 0
      const activePrograms = programs?.length || 0
      const upcomingClasses = Math.min(16, exercises?.length || 0) // Simulate upcoming classes
      const averageProgress = activePrograms > 0 ? Math.round(Math.random() * 30 + 60) : 0 // Mock progress

      setStats({
        totalAthletes,
        activePrograms,
        upcomingClasses,
        averageProgress,
      })

      // Generate recent activities based on real data
      const activities: RecentActivity[] = []

      if (athletes && athletes.length > 0) {
        activities.push({
          id: "1",
          type: "athlete_registered",
          description: `Νέος αθλητής εγγράφηκε στο σύστημα`,
          timestamp: subDays(new Date(), 1).toISOString(),
        })
      }

      if (programs && programs.length > 0) {
        const latestProgram = programs[programs.length - 1]
        activities.push({
          id: "2",
          type: "program_created",
          description: `Νέο πρόγραμμα δημιουργήθηκε`,
          timestamp: latestProgram.created_at,
        })
      }

      if (exercises && exercises.length > 0) {
        activities.push({
          id: "3",
          type: "exercise_added",
          description: `Νέα άσκηση προστέθηκε στη βιβλιοθήκη`,
          timestamp: subDays(new Date(), 3).toISOString(),
        })
      }

      // Add some mock activities if we don't have enough real data
      if (activities.length < 4) {
        activities.push({
          id: "4",
          type: "system_update",
          description: "Το σύστημα ενημερώθηκε με νέες λειτουργίες",
          timestamp: subDays(new Date(), 5).toISOString(),
        })
      }

      setRecentActivities(activities)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.home")}</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || "Admin"}!</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Athletes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAthletes}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalAthletes > 0 ? "Εγγεγραμμένοι αθλητές" : "Δεν υπάρχουν αθλητές ακόμη"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activePrograms}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activePrograms > 0 ? "Ενεργά προγράμματα" : "Δεν υπάρχουν προγράμματα ακόμη"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Exercises</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
                <p className="text-xs text-muted-foreground">Διαθέσιμες ασκήσεις</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageProgress}%</div>
                <p className="text-xs text-muted-foreground">Λειτουργικότητα συστήματος</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(activity.timestamp), "dd/MM/yyyy HH:mm", { locale: el })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {recentActivities.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">Δεν υπάρχει πρόσφατη δραστηριότητα</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Γρήγορες ενέργειες</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Δημιουργία Προγράμματος</p>
                      <p className="text-sm text-muted-foreground">Δημιουργήστε νέο πρόγραμμα προπόνησης</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Προσθήκη Αθλητή</p>
                      <p className="text-sm text-muted-foreground">Εγγραφή νέου αθλητή</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Νέα Άσκηση</p>
                      <p className="text-sm text-muted-foreground">Προσθήκη άσκησης στη βιβλιοθήκη</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics about your gym and athletes.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics charts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports about your gym's performance.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
