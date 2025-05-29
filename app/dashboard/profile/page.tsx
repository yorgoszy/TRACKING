"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Calendar, Clock, TrendingUp, Target, Activity, BarChart3, Dumbbell, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface UserProfile {
  id: string
  name: string | null
  email: string
  role: string
  created_at: string
}

interface Assignment {
  id: string
  program_id: string
  start_date: string | null
  end_date: string | null
  status: string
  program: {
    id: string
    name: string
    description: string | null
  }
}

interface TrainingStats {
  thisWeekHours: number
  thisMonthHours: number
  thisWeekVolume: number
  thisMonthVolume: number
  weeklyChange: number
  monthlyChange: number
  sessionsThisMonth: number
  remainingSessions: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [currentProgram, setCurrentProgram] = useState<Assignment | null>(null)
  const [trainingStats, setTrainingStats] = useState<TrainingStats>({
    thisWeekHours: 0,
    thisMonthHours: 0,
    thisWeekVolume: 0,
    thisMonthVolume: 0,
    weeklyChange: 0,
    monthlyChange: 0,
    sessionsThisMonth: 0,
    remainingSessions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)

      // Λήψη τρέχοντος χρήστη
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        console.error("No authenticated user")
        return
      }

      // Φόρτωση στοιχείων χρήστη
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (userError) {
        console.error("Error fetching user:", userError)
        return
      }

      setUser(userData)

      // Φόρτωση αναθέσεων προγραμμάτων
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from("program_assignments")
        .select(`
          *,
          programs (
            id,
            name,
            description
          )
        `)
        .eq("assignee_id", authUser.id)
        .eq("assignee_type", "user")
        .order("created_at", { ascending: false })

      if (assignmentsError) {
        console.error("Error fetching assignments:", assignmentsError)
      } else {
        const formattedAssignments = (assignmentsData || []).map((assignment) => ({
          ...assignment,
          program: assignment.programs,
        }))
        setAssignments(formattedAssignments)

        // Εύρεση τρέχοντος προγράμματος
        const current = formattedAssignments.find(
          (a) =>
            a.status === "active" ||
            (a.start_date &&
              new Date(a.start_date) <= new Date() &&
              (!a.end_date || new Date(a.end_date) >= new Date())),
        )
        setCurrentProgram(current || null)
      }

      // Placeholder στατιστικά
      setTrainingStats({
        thisWeekHours: 4.5,
        thisMonthHours: 18.2,
        thisWeekVolume: 2.8,
        thisMonthVolume: 12.5,
        weeklyChange: 15,
        monthlyChange: -8,
        sessionsThisMonth: 12,
        remainingSessions: 8,
      })
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση προφίλ...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Δεν βρέθηκαν στοιχεία χρήστη.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{user.name || user.email}</h1>
          <p className="text-gray-600">
            {user.role} • Μέλος από {new Date(user.created_at).toLocaleDateString("el-GR")}
          </p>
        </div>
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Επεξεργασία Προφίλ
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Επισκόπηση</TabsTrigger>
          <TabsTrigger value="programs">Προγράμματα</TabsTrigger>
          <TabsTrigger value="performance">Απόδοση</TabsTrigger>
          <TabsTrigger value="assessments">Αξιολογήσεις</TabsTrigger>
          <TabsTrigger value="recommendations">Συστάσεις</TabsTrigger>
        </TabsList>

        {/* Επισκόπηση */}
        <TabsContent value="overview" className="space-y-6">
          {/* Τρέχον Πρόγραμμα */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Τρέχον Πρόγραμμα
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentProgram ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{currentProgram.program.name}</h3>
                      <p className="text-gray-600">{currentProgram.program.description}</p>
                    </div>
                    <Badge variant="default">Ενεργό</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{trainingStats.sessionsThisMonth}</div>
                      <div className="text-sm text-gray-600">Προπονήσεις αυτόν το μήνα</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{trainingStats.remainingSessions}</div>
                      <div className="text-sm text-gray-600">Απομένουν για ολοκλήρωση</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(
                          (trainingStats.sessionsThisMonth /
                            (trainingStats.sessionsThisMonth + trainingStats.remainingSessions)) *
                            100,
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-600">Πρόοδος προγράμματος</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Πρόοδος Προγράμματος</span>
                      <span>
                        {Math.round(
                          (trainingStats.sessionsThisMonth /
                            (trainingStats.sessionsThisMonth + trainingStats.remainingSessions)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (trainingStats.sessionsThisMonth /
                          (trainingStats.sessionsThisMonth + trainingStats.remainingSessions)) *
                        100
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Δεν έχει ανατεθεί τρέχον πρόγραμμα</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Στατιστικά Προπόνησης */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ώρες Αυτή την Εβδομάδα</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trainingStats.thisWeekHours}h</div>
                <p className="text-xs text-muted-foreground">
                  <span className={trainingStats.weeklyChange > 0 ? "text-green-600" : "text-red-600"}>
                    {trainingStats.weeklyChange > 0 ? "+" : ""}
                    {trainingStats.weeklyChange}%
                  </span>{" "}
                  από την προηγούμενη
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ώρες Αυτόν το Μήνα</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trainingStats.thisMonthHours}h</div>
                <p className="text-xs text-muted-foreground">
                  <span className={trainingStats.monthlyChange > 0 ? "text-green-600" : "text-red-600"}>
                    {trainingStats.monthlyChange > 0 ? "+" : ""}
                    {trainingStats.monthlyChange}%
                  </span>{" "}
                  από τον προηγούμενο
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Όγκος Εβδομάδας</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trainingStats.thisWeekVolume}t</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+12%</span> από την προηγούμενη
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Όγκος Μήνα</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trainingStats.thisMonthVolume}t</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> από τον προηγούμενο
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Προγράμματα */}
        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ιστορικό Προγραμμάτων</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Δεν έχουν ανατεθεί προγράμματα</p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{assignment.program.name}</h3>
                          <p className="text-gray-600 text-sm">{assignment.program.description}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            {assignment.start_date && (
                              <span>Έναρξη: {new Date(assignment.start_date).toLocaleDateString("el-GR")}</span>
                            )}
                            {assignment.end_date && (
                              <span>Λήξη: {new Date(assignment.end_date).toLocaleDateString("el-GR")}</span>
                            )}
                          </div>
                        </div>
                        <Badge variant={assignment.id === currentProgram?.id ? "default" : "secondary"}>
                          {assignment.id === currentProgram?.id ? "Τρέχον" : "Ολοκληρωμένο"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Απόδοση */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Ανάλυση Απόδοσης
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Τα γραφήματα απόδοσης θα εμφανιστούν εδώ</p>
                <p className="text-sm">Βάσει ταχύτητας ασκήσεων: Strength, Power, Speed κλπ</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Αξιολογήσεις */}
        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Τεστ Αξιολόγησης</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Τα αποτελέσματα των τεστ θα εμφανιστούν εδώ</p>
                <p className="text-sm">Γραφήματα προόδου και ιστορικό αποτελεσμάτων</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Συστάσεις */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Μυς προς Ενδυνάμωση</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Βάσει τεστ λειτουργικότητας</p>
                  <p className="text-sm">Θα εμφανιστούν μετά την ολοκλήρωση των τεστ</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Προτεινόμενες Διατάσεις</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Βάσει τεστ λειτουργικότητας</p>
                  <p className="text-sm">Ασκήσεις ενεργοποίησης και διατάσεις</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
