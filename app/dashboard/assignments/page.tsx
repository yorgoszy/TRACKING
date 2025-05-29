"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, Calendar, User, Dumbbell, Clock, TrendingUp, Eye, Edit } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format, differenceInDays, addDays } from "date-fns"
import { el } from "date-fns/locale"

interface Assignment {
  id: string
  program_id: string
  program_name: string
  athlete_id: string
  athlete_name: string
  athlete_email: string
  start_date: string
  end_date: string | null
  status: "active" | "completed" | "paused"
  progress_percentage: number
  total_days: number
  completed_days: number
  created_at: string
}

export default function AssignmentsPage() {
  const router = useRouter()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchAssignments()
  }, [])

  useEffect(() => {
    filterAssignments()
  }, [assignments, searchTerm, statusFilter])

  const fetchAssignments = async () => {
    try {
      setLoading(true)

      // Fetch only basic program data that exists
      const { data: programs, error: programsError } = await supabase.from("programs").select(`
        id,
        name,
        created_at
      `)

      if (programsError) {
        console.error("Error fetching programs:", programsError)
        return
      }

      // Fetch athletes
      const { data: athletes, error: athletesError } = await supabase.from("app_users").select("id, name, email")

      if (athletesError) {
        console.error("Error fetching athletes:", athletesError)
        return
      }

      // Create mock assignments for demonstration
      const assignmentsData: Assignment[] = []

      programs?.forEach((program, programIndex) => {
        // For demo purposes, assign each program to the first 2 athletes
        const selectedAthletes = athletes?.slice(0, 2) || []

        selectedAthletes.forEach((athlete, athleteIndex) => {
          // Create mock start and end dates based on creation date
          const createdDate = new Date(program.created_at)
          const startDate = addDays(createdDate, programIndex * 7) // Stagger start dates
          const endDate = addDays(startDate, 30 + programIndex * 10) // 30-50 day programs
          const today = new Date()

          // Calculate progress
          let progressPercentage = 0
          const totalDays = differenceInDays(endDate, startDate)
          let completedDays = Math.min(differenceInDays(today, startDate), totalDays)
          let status: "active" | "completed" | "paused" = "active"

          if (completedDays >= totalDays) {
            status = "completed"
            progressPercentage = 100
          } else if (completedDays < 0) {
            status = "paused"
            progressPercentage = 0
            completedDays = 0
          } else {
            progressPercentage = Math.round((completedDays / totalDays) * 100)
          }

          // Add some variety to the statuses
          if (athleteIndex === 1 && programIndex % 3 === 0) {
            status = "completed"
            progressPercentage = 100
            completedDays = totalDays
          } else if (athleteIndex === 0 && programIndex % 4 === 0) {
            status = "paused"
            progressPercentage = Math.max(0, progressPercentage - 20)
          }

          assignmentsData.push({
            id: `${program.id}-${athlete.id}`,
            program_id: program.id,
            program_name: program.name,
            athlete_id: athlete.id,
            athlete_name: athlete.name || athlete.email,
            athlete_email: athlete.email,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            status,
            progress_percentage: Math.max(0, Math.min(100, progressPercentage)),
            total_days: totalDays,
            completed_days: Math.max(0, completedDays),
            created_at: program.created_at,
          })
        })
      })

      setAssignments(assignmentsData)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAssignments = () => {
    let filtered = assignments

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (assignment) =>
          assignment.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.athlete_email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((assignment) => assignment.status === statusFilter)
    }

    setFilteredAssignments(filtered)
  }

  const handleViewAssignment = (assignment: Assignment) => {
    // Navigate to assignment view page
    router.push(`/dashboard/programs/${assignment.program_id}`)
  }

  const handleEditAssignment = (assignment: Assignment) => {
    // Navigate to assignment edit page
    router.push(`/dashboard/programs/${assignment.program_id}/edit`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ενεργό"
      case "completed":
        return "Ολοκληρωμένο"
      case "paused":
        return "Σε Αναμονή"
      default:
        return "Άγνωστο"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση αναθέσεων...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Αναθέσεις Προγραμμάτων</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Αναζήτηση προγραμμάτων ή ασκουμένων..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white border-gray-300"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue placeholder="Φίλτρο κατάστασης" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                <SelectItem value="active">Ενεργά</SelectItem>
                <SelectItem value="completed">Ολοκληρωμένα</SelectItem>
                <SelectItem value="paused">Σε Αναμονή</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Dumbbell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Συνολικές Αναθέσεις</p>
                  <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ενεργά</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assignments.filter((a) => a.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ολοκληρωμένα</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assignments.filter((a) => a.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Μέσος Όρος Προόδου</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assignments.length > 0
                      ? Math.round(assignments.reduce((sum, a) => sum + a.progress_percentage, 0) / assignments.length)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {assignment.program_name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      {assignment.athlete_name}
                    </div>
                  </div>
                  <Badge className={getStatusColor(assignment.status)}>{getStatusText(assignment.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Πρόοδος</span>
                    <span className="font-medium text-gray-900">{assignment.progress_percentage}%</span>
                  </div>
                  <Progress value={assignment.progress_percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {assignment.completed_days} από {assignment.total_days} ημέρες
                    </span>
                    <span>
                      {assignment.total_days - assignment.completed_days > 0
                        ? `${assignment.total_days - assignment.completed_days} ημέρες απομένουν`
                        : "Ολοκληρωμένο"}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Έναρξη: {format(new Date(assignment.start_date), "dd/MM/yyyy", { locale: el })}</span>
                  </div>
                  {assignment.end_date && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Λήξη: {format(new Date(assignment.end_date), "dd/MM/yyyy", { locale: el })}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white border-gray-300"
                    onClick={() => handleViewAssignment(assignment)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Προβολή
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white border-gray-300"
                    onClick={() => handleEditAssignment(assignment)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Επεξεργασία
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν αναθέσεις</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης"
                : "Δεν υπάρχουν αναθέσεις προγραμμάτων ακόμη"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
