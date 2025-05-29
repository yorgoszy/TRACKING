"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Edit, Trash, Plus, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Program {
  id: string
  name: string
  description: string | null
  type: string | null
  start_date: string | null
  end_date: string | null
  created_at: string
  weeks_count?: number
  days_per_week?: number
}

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Φόρτωση προγραμμάτων από τη Supabase
  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching programs:", error)
          setErrorMessage("Failed to load programs. Please try again.")
        } else {
          // Μετά τη φόρτωση των προγραμμάτων, φορτώστε και τις εβδομάδες και ημέρες
          if (data && data.length > 0) {
            const programIds = data.map((p) => p.id)

            // Φόρτωση εβδομάδων
            const { data: weeksData } = await supabase
              .from("program_weeks")
              .select("program_id, id")
              .in("program_id", programIds)

            // Φόρτωση ημερών
            const weekIds = weeksData?.map((w) => w.id) || []
            const { data: daysData } = await supabase.from("program_days").select("week_id").in("week_id", weekIds)

            // Υπολογισμός εβδομάδων και ημερών ανά πρόγραμμα
            const programStats = data.map((program) => {
              const programWeeks = weeksData?.filter((w) => w.program_id === program.id) || []
              const weekIds = programWeeks.map((w) => w.id)
              const programDays = daysData?.filter((d) => weekIds.includes(d.week_id)) || []
              const daysPerWeek = programWeeks.length > 0 ? Math.round(programDays.length / programWeeks.length) : 0

              return {
                ...program,
                weeks_count: programWeeks.length,
                days_per_week: daysPerWeek,
              }
            })

            setPrograms(programStats)
          } else {
            setPrograms(data || [])
          }
        }
      } catch (error) {
        console.error("Error:", error)
        setErrorMessage("An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const filteredPrograms = programs.filter((program) => program.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteProgram = async (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      try {
        setLoading(true)

        // Διαγραφή προγράμματος από τη Supabase
        const { error } = await supabase.from("programs").delete().eq("id", id)

        if (error) {
          console.error("Error deleting program:", error)
          setErrorMessage("Failed to delete program. Please try again.")
        } else {
          // Ενημέρωση του τοπικού state
          setPrograms(programs.filter((program) => program.id !== id))
          setSuccessMessage("Program has been successfully deleted!")

          // Καθαρισμός του μηνύματος επιτυχίας μετά από 3 δευτερόλεπτα
          setTimeout(() => {
            setSuccessMessage("")
          }, 3000)
        }
      } catch (error) {
        console.error("Error:", error)
        setErrorMessage("An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Training Programs</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/dashboard/programs/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Link>
        </Button>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrorMessage("")}>
            <span className="sr-only">Close</span>
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search programs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Program Structure</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading programs...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredPrograms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No programs found. Click "Add Program" to create your first program.
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>
                    {program.weeks_count && program.days_per_week
                      ? `${program.weeks_count} εβδομάδες, ${program.days_per_week} ημέρες/εβδομάδα`
                      : "Δεν έχει δομή"}
                  </TableCell>
                  <TableCell>
                    {program.type ? (
                      <Badge variant="outline">{program.type}</Badge>
                    ) : (
                      <span className="text-muted-foreground">No type</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(program.start_date)}</TableCell>
                  <TableCell>{formatDate(program.end_date)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/programs/${program.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/programs/${program.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProgram(program.id)}
                        disabled={loading}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
