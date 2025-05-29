"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Calendar, Clock, Edit, Loader2, Plus, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Program {
  id: string
  name: string
  description: string | null
  type: string | null
  start_date: string | null
  end_date: string | null
  is_template: boolean
  created_at: string
}

interface ProgramWeek {
  id: string
  program_id: string
  name: string
  week_number: number
}

interface ProgramDay {
  id: string
  week_id: string
  name: string
  day_number: number
}

interface ProgramBlock {
  id: string
  day_id: string
  name: string
  description: string | null
  block_order: number
}

interface ProgramExercise {
  id: string
  block_id: string
  exercise_id: string
  sets: number
  reps: string
  weight: number | null
  percentage: number | null
  tempo: string | null
  rest: number | null
  velocity: number | null
  exercise_order: number
  notes: string | null
  exercise: {
    id: string
    name: string
    category: string | null
  }
}

export default function ProgramViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [program, setProgram] = useState<Program | null>(null)
  const [weeks, setWeeks] = useState<ProgramWeek[]>([])
  const [days, setDays] = useState<ProgramDay[]>([])
  const [blocks, setBlocks] = useState<ProgramBlock[]>([])
  const [exercises, setExercises] = useState<ProgramExercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Αν το id είναι "create" ή "new", μην προσπαθήσεις να φορτώσεις πρόγραμμα
  useEffect(() => {
    if (params.id === "create" || params.id === "new") {
      setLoading(false)
      return
    }

    async function fetchProgramData() {
      try {
        setLoading(true)

        // Φόρτωση προγράμματος
        const { data: programData, error: programError } = await supabase
          .from("programs")
          .select("*")
          .eq("id", params.id)
          .single()

        if (programError) {
          throw programError
        }

        setProgram(programData)

        // Φόρτωση εβδομάδων
        const { data: weeksData, error: weeksError } = await supabase
          .from("program_weeks")
          .select("*")
          .eq("program_id", params.id)
          .order("week_number", { ascending: true })

        if (weeksError) {
          throw weeksError
        }

        setWeeks(weeksData || [])

        if (weeksData && weeksData.length > 0) {
          const weekIds = weeksData.map((week) => week.id)

          // Φόρτωση ημερών
          const { data: daysData, error: daysError } = await supabase
            .from("program_days")
            .select("*")
            .in("week_id", weekIds)
            .order("day_number", { ascending: true })

          if (daysError) {
            throw daysError
          }

          setDays(daysData || [])

          if (daysData && daysData.length > 0) {
            const dayIds = daysData.map((day) => day.id)

            // Φόρτωση blocks
            const { data: blocksData, error: blocksError } = await supabase
              .from("program_blocks")
              .select("*")
              .in("day_id", dayIds)
              .order("block_order", { ascending: true })

            if (blocksError) {
              throw blocksError
            }

            setBlocks(blocksData || [])

            if (blocksData && blocksData.length > 0) {
              const blockIds = blocksData.map((block) => block.id)

              // Φόρτωση ασκήσεων
              const { data: exercisesData, error: exercisesError } = await supabase
                .from("program_exercises")
                .select("*, exercise:exercises(*)")
                .in("block_id", blockIds)
                .order("exercise_order", { ascending: true })

              if (exercisesError) {
                throw exercisesError
              }

              setExercises(exercisesData || [])
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching program data:", error)
        setError(error.message || "Failed to load program data")
        toast({
          title: "Error",
          description: "Failed to load program data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProgramData()
  }, [params.id])

  // Αν το id είναι "create" ή "new", επέστρεψε null
  if (params.id === "create" || params.id === "new") {
    return null
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg text-red-500">Failed to load program. Please try again.</p>
              <Button className="mt-4" onClick={() => router.push("/dashboard/programs")}>
                Return to Programs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/dashboard/programs")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Button>
        </div>
        <Button asChild>
          <a href={`/dashboard/programs/${program.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Program
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{program.name}</CardTitle>
                  {program.is_template && (
                    <Badge className="mt-2" variant="secondary">
                      Template
                    </Badge>
                  )}
                </div>
                {program.type && (
                  <Badge variant="outline" className="text-sm">
                    {program.type}
                  </Badge>
                )}
              </div>
              {program.description && <CardDescription>{program.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formatDate(program.start_date)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{formatDate(program.end_date)}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="structure">
                <TabsList className="mb-4">
                  <TabsTrigger value="structure">Program Structure</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="structure">
                  {weeks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">This program has no content yet.</p>
                      <Button asChild>
                        <a href={`/dashboard/programs/${program.id}/edit`}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Program Content
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {weeks.map((week) => (
                        <div key={week.id} className="border rounded-lg p-4">
                          <h3 className="text-lg font-semibold mb-3">{week.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {days
                              .filter((day) => day.week_id === week.id)
                              .map((day) => (
                                <Card key={day.id} className="overflow-hidden">
                                  <CardHeader className="bg-muted py-2 px-4">
                                    <CardTitle className="text-md">{day.name}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="p-3">
                                    {blocks
                                      .filter((block) => block.day_id === day.id)
                                      .map((block) => (
                                        <div key={block.id} className="mb-3 last:mb-0">
                                          <h4 className="font-medium text-sm border-b pb-1 mb-2">{block.name}</h4>
                                          <ul className="space-y-1 text-sm">
                                            {exercises
                                              .filter((ex) => ex.block_id === block.id)
                                              .map((ex) => (
                                                <li key={ex.id} className="flex justify-between">
                                                  <span>{ex.exercise.name}</span>
                                                  <span className="text-muted-foreground">
                                                    {ex.sets} × {ex.reps}
                                                  </span>
                                                </li>
                                              ))}
                                          </ul>
                                        </div>
                                      ))}
                                    {blocks.filter((block) => block.day_id === day.id).length === 0 && (
                                      <p className="text-sm text-muted-foreground py-2">No blocks added</p>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="stats">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{weeks.length}</p>
                          <p className="text-sm text-muted-foreground">Weeks</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{days.length}</p>
                          <p className="text-sm text-muted-foreground">Training Days</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{blocks.length}</p>
                          <p className="text-sm text-muted-foreground">Training Blocks</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{exercises.length}</p>
                          <p className="text-sm text-muted-foreground">Exercises</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Program Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <a href={`/dashboard/programs/${program.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Program
                </a>
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Assign to Athletes
              </Button>
              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
