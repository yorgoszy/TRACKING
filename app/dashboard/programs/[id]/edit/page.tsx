"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Program {
  id: string
  name: string
  description: string | null
  type: string | null
  start_date: string | null
  end_date: string | null
  is_template: boolean
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

interface Exercise {
  id: string
  name: string
  category: string | null
  muscle_groups: string[] | null
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
  exercise: Exercise
}

export default function EditProgramPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [program, setProgram] = useState<Program | null>(null)
  const [weeks, setWeeks] = useState<ProgramWeek[]>([])
  const [days, setDays] = useState<ProgramDay[]>([])
  const [blocks, setBlocks] = useState<ProgramBlock[]>([])
  const [exercises, setExercises] = useState<ProgramExercise[]>([])
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Dialog states
  const [weekDialogOpen, setWeekDialogOpen] = useState(false)
  const [dayDialogOpen, setDayDialogOpen] = useState(false)
  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false)

  // Form states
  const [newWeek, setNewWeek] = useState({ name: "", week_number: 1 })
  const [newDay, setNewDay] = useState({ name: "", day_number: 1, week_id: "" })
  const [newBlock, setNewBlock] = useState({ name: "", description: "", day_id: "", block_order: 1 })
  const [newExercise, setNewExercise] = useState({
    exercise_id: "",
    block_id: "",
    sets: 3,
    reps: "10",
    weight: null as number | null,
    percentage: null as number | null,
    tempo: "",
    rest: null as number | null,
    velocity: null as number | null,
    exercise_order: 1,
    notes: "",
  })

  const [selectedWeekId, setSelectedWeekId] = useState<string>("")
  const [selectedDayId, setSelectedDayId] = useState<string>("")
  const [selectedBlockId, setSelectedBlockId] = useState<string>("")

  useEffect(() => {
    fetchProgramData()
    fetchAvailableExercises()
  }, [params.id])

  const fetchProgramData = async () => {
    try {
      setLoading(true)

      // Φόρτωση προγράμματος
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("id", params.id)
        .single()

      if (programError) throw programError
      setProgram(programData)

      // Φόρτωση εβδομάδων
      const { data: weeksData, error: weeksError } = await supabase
        .from("program_weeks")
        .select("*")
        .eq("program_id", params.id)
        .order("week_number", { ascending: true })

      if (weeksError) throw weeksError
      setWeeks(weeksData || [])

      if (weeksData && weeksData.length > 0) {
        const weekIds = weeksData.map((week) => week.id)

        // Φόρτωση ημερών
        const { data: daysData, error: daysError } = await supabase
          .from("program_days")
          .select("*")
          .in("week_id", weekIds)
          .order("day_number", { ascending: true })

        if (daysError) throw daysError
        setDays(daysData || [])

        if (daysData && daysData.length > 0) {
          const dayIds = daysData.map((day) => day.id)

          // Φόρτωση blocks
          const { data: blocksData, error: blocksError } = await supabase
            .from("program_blocks")
            .select("*")
            .in("day_id", dayIds)
            .order("block_order", { ascending: true })

          if (blocksError) throw blocksError
          setBlocks(blocksData || [])

          if (blocksData && blocksData.length > 0) {
            const blockIds = blocksData.map((block) => block.id)

            // Φόρτωση ασκήσεων
            const { data: exercisesData, error: exercisesError } = await supabase
              .from("program_exercises")
              .select("*, exercise:exercises(*)")
              .in("block_id", blockIds)
              .order("exercise_order", { ascending: true })

            if (exercisesError) throw exercisesError
            setExercises(exercisesData || [])
          }
        }
      }
    } catch (error: any) {
      console.error("Error fetching program data:", error)
      toast({
        title: "Error",
        description: "Failed to load program data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableExercises = async () => {
    try {
      const { data, error } = await supabase.from("exercises").select("*").order("name", { ascending: true })

      if (error) throw error
      setAvailableExercises(data || [])
    } catch (error) {
      console.error("Error fetching exercises:", error)
    }
  }

  const handleAddWeek = async () => {
    try {
      setSaving(true)
      const { data, error } = await supabase
        .from("program_weeks")
        .insert([
          {
            program_id: params.id,
            name: newWeek.name,
            week_number: newWeek.week_number,
          },
        ])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        setWeeks([...weeks, data[0]])
        setNewWeek({ name: "", week_number: weeks.length + 1 })
        setWeekDialogOpen(false)
        toast({
          title: "Week added",
          description: "New week has been added to the program.",
        })
      }
    } catch (error: any) {
      console.error("Error adding week:", error)
      toast({
        title: "Error",
        description: "Failed to add week. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddDay = async () => {
    try {
      setSaving(true)
      const { data, error } = await supabase
        .from("program_days")
        .insert([
          {
            week_id: newDay.week_id,
            name: newDay.name,
            day_number: newDay.day_number,
          },
        ])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        setDays([...days, data[0]])
        setNewDay({ name: "", day_number: 1, week_id: "" })
        setDayDialogOpen(false)
        toast({
          title: "Day added",
          description: "New day has been added to the week.",
        })
      }
    } catch (error: any) {
      console.error("Error adding day:", error)
      toast({
        title: "Error",
        description: "Failed to add day. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddBlock = async () => {
    try {
      setSaving(true)
      const { data, error } = await supabase
        .from("program_blocks")
        .insert([
          {
            day_id: newBlock.day_id,
            name: newBlock.name,
            description: newBlock.description || null,
            block_order: newBlock.block_order,
          },
        ])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        setBlocks([...blocks, data[0]])
        setNewBlock({ name: "", description: "", day_id: "", block_order: 1 })
        setBlockDialogOpen(false)
        toast({
          title: "Block added",
          description: "New block has been added to the day.",
        })
      }
    } catch (error: any) {
      console.error("Error adding block:", error)
      toast({
        title: "Error",
        description: "Failed to add block. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddExercise = async () => {
    try {
      setSaving(true)
      const { data, error } = await supabase
        .from("program_exercises")
        .insert([
          {
            block_id: newExercise.block_id,
            exercise_id: newExercise.exercise_id,
            sets: newExercise.sets,
            reps: newExercise.reps,
            weight: newExercise.weight,
            percentage: newExercise.percentage,
            tempo: newExercise.tempo || null,
            rest: newExercise.rest,
            velocity: newExercise.velocity,
            exercise_order: newExercise.exercise_order,
            notes: newExercise.notes || null,
          },
        ])
        .select("*, exercise:exercises(*)")

      if (error) throw error

      if (data && data.length > 0) {
        setExercises([...exercises, data[0]])
        setNewExercise({
          exercise_id: "",
          block_id: "",
          sets: 3,
          reps: "10",
          weight: null,
          percentage: null,
          tempo: "",
          rest: null,
          velocity: null,
          exercise_order: 1,
          notes: "",
        })
        setExerciseDialogOpen(false)
        toast({
          title: "Exercise added",
          description: "New exercise has been added to the block.",
        })
      }
    } catch (error: any) {
      console.error("Error adding exercise:", error)
      toast({
        title: "Error",
        description: "Failed to add exercise. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteWeek = async (weekId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this week? This will also delete all days, blocks, and exercises in this week.",
      )
    ) {
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase.from("program_weeks").delete().eq("id", weekId)

      if (error) throw error

      setWeeks(weeks.filter((w) => w.id !== weekId))
      setDays(days.filter((d) => d.week_id !== weekId))

      const weekDayIds = days.filter((d) => d.week_id === weekId).map((d) => d.id)
      setBlocks(blocks.filter((b) => !weekDayIds.includes(b.day_id)))

      const weekBlockIds = blocks.filter((b) => weekDayIds.includes(b.day_id)).map((b) => b.id)
      setExercises(exercises.filter((e) => !weekBlockIds.includes(e.block_id)))

      toast({
        title: "Week deleted",
        description: "Week and all its content has been deleted.",
      })
    } catch (error: any) {
      console.error("Error deleting week:", error)
      toast({
        title: "Error",
        description: "Failed to delete week. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteDay = async (dayId: string) => {
    if (
      !confirm("Are you sure you want to delete this day? This will also delete all blocks and exercises in this day.")
    ) {
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase.from("program_days").delete().eq("id", dayId)

      if (error) throw error

      setDays(days.filter((d) => d.id !== dayId))
      setBlocks(blocks.filter((b) => b.day_id !== dayId))

      const dayBlockIds = blocks.filter((b) => b.day_id === dayId).map((b) => b.id)
      setExercises(exercises.filter((e) => !dayBlockIds.includes(e.block_id)))

      toast({
        title: "Day deleted",
        description: "Day and all its content has been deleted.",
      })
    } catch (error: any) {
      console.error("Error deleting day:", error)
      toast({
        title: "Error",
        description: "Failed to delete day. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteBlock = async (blockId: string) => {
    if (!confirm("Are you sure you want to delete this block? This will also delete all exercises in this block.")) {
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase.from("program_blocks").delete().eq("id", blockId)

      if (error) throw error

      setBlocks(blocks.filter((b) => b.id !== blockId))
      setExercises(exercises.filter((e) => e.block_id !== blockId))

      toast({
        title: "Block deleted",
        description: "Block and all its exercises have been deleted.",
      })
    } catch (error: any) {
      console.error("Error deleting block:", error)
      toast({
        title: "Error",
        description: "Failed to delete block. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteExercise = async (exerciseId: string) => {
    try {
      setSaving(true)
      const { error } = await supabase.from("program_exercises").delete().eq("id", exerciseId)

      if (error) throw error

      setExercises(exercises.filter((e) => e.id !== exerciseId))

      toast({
        title: "Exercise deleted",
        description: "Exercise has been removed from the block.",
      })
    } catch (error: any) {
      console.error("Error deleting exercise:", error)
      toast({
        title: "Error",
        description: "Failed to delete exercise. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!program) {
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
              <p className="text-lg text-red-500">Program not found.</p>
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
          <Button variant="ghost" onClick={() => router.push(`/dashboard/programs/${program.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Program
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/programs/${program.id}`)}>
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Program: {program.name}</CardTitle>
          <CardDescription>Manage the structure and content of your training program.</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="structure" className="w-full">
        <TabsList>
          <TabsTrigger value="structure">Program Structure</TabsTrigger>
          <TabsTrigger value="settings">Program Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Program Structure</h3>
            <Dialog open={weekDialogOpen} onOpenChange={setWeekDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Week
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Week</DialogTitle>
                  <DialogDescription>Add a new week to your training program.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="week-name">Week Name</Label>
                    <Input
                      id="week-name"
                      placeholder="e.g., Week 1 - Foundation"
                      value={newWeek.name}
                      onChange={(e) => setNewWeek({ ...newWeek, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="week-number">Week Number</Label>
                    <Input
                      id="week-number"
                      type="number"
                      min="1"
                      value={newWeek.week_number}
                      onChange={(e) => setNewWeek({ ...newWeek, week_number: Number.parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setWeekDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddWeek} disabled={saving || !newWeek.name}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Add Week
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {weeks.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No weeks added yet. Start by adding your first week.</p>
                  <Button onClick={() => setWeekDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Week
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {weeks.map((week) => (
                <Card key={week.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{week.name}</CardTitle>
                        <CardDescription>Week {week.week_number}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={dayDialogOpen} onOpenChange={setDayDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedWeekId(week.id)
                                setNewDay({ ...newDay, week_id: week.id })
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Day
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Day</DialogTitle>
                              <DialogDescription>Add a new training day to {week.name}.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="day-name">Day Name</Label>
                                <Input
                                  id="day-name"
                                  placeholder="e.g., Upper Body, Lower Body, Push Day"
                                  value={newDay.name}
                                  onChange={(e) => setNewDay({ ...newDay, name: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="day-number">Day Number</Label>
                                <Input
                                  id="day-number"
                                  type="number"
                                  min="1"
                                  value={newDay.day_number}
                                  onChange={(e) =>
                                    setNewDay({ ...newDay, day_number: Number.parseInt(e.target.value) || 1 })
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDayDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddDay} disabled={saving || !newDay.name}>
                                {saving ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Plus className="mr-2 h-4 w-4" />
                                )}
                                Add Day
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteWeek(week.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {days
                        .filter((day) => day.week_id === week.id)
                        .map((day) => (
                          <Card key={day.id} className="border-dashed">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-md">{day.name}</CardTitle>
                                  <CardDescription>Day {day.day_number}</CardDescription>
                                </div>
                                <div className="flex gap-1">
                                  <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setSelectedDayId(day.id)
                                          setNewBlock({ ...newBlock, day_id: day.id })
                                        }}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Add New Block</DialogTitle>
                                        <DialogDescription>Add a new training block to {day.name}.</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <Label htmlFor="block-name">Block Name</Label>
                                          <Input
                                            id="block-name"
                                            placeholder="e.g., Warm-up, Main Set, Accessory"
                                            value={newBlock.name}
                                            onChange={(e) => setNewBlock({ ...newBlock, name: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="block-description">Description (Optional)</Label>
                                          <Textarea
                                            id="block-description"
                                            placeholder="Brief description of this block"
                                            value={newBlock.description}
                                            onChange={(e) => setNewBlock({ ...newBlock, description: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="block-order">Block Order</Label>
                                          <Input
                                            id="block-order"
                                            type="number"
                                            min="1"
                                            value={newBlock.block_order}
                                            onChange={(e) =>
                                              setNewBlock({
                                                ...newBlock,
                                                block_order: Number.parseInt(e.target.value) || 1,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
                                          Cancel
                                        </Button>
                                        <Button onClick={handleAddBlock} disabled={saving || !newBlock.name}>
                                          {saving ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          ) : (
                                            <Plus className="mr-2 h-4 w-4" />
                                          )}
                                          Add Block
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeleteDay(day.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                {blocks
                                  .filter((block) => block.day_id === day.id)
                                  .map((block) => (
                                    <div key={block.id} className="border rounded p-3 bg-muted/50">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-sm">{block.name}</h4>
                                        <div className="flex gap-1">
                                          <Dialog open={exerciseDialogOpen} onOpenChange={setExerciseDialogOpen}>
                                            <DialogTrigger asChild>
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                  setSelectedBlockId(block.id)
                                                  setNewExercise({ ...newExercise, block_id: block.id })
                                                }}
                                              >
                                                <Plus className="h-3 w-3" />
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                              <DialogHeader>
                                                <DialogTitle>Add Exercise</DialogTitle>
                                                <DialogDescription>
                                                  Add a new exercise to {block.name}.
                                                </DialogDescription>
                                              </DialogHeader>
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                  <Label htmlFor="exercise-select">Exercise</Label>
                                                  <Select
                                                    value={newExercise.exercise_id}
                                                    onValueChange={(value) =>
                                                      setNewExercise({ ...newExercise, exercise_id: value })
                                                    }
                                                  >
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select an exercise" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {availableExercises.map((exercise) => (
                                                        <SelectItem key={exercise.id} value={exercise.id}>
                                                          {exercise.name}
                                                        </SelectItem>
                                                      ))}
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                                <div>
                                                  <Label htmlFor="exercise-order">Exercise Order</Label>
                                                  <Input
                                                    id="exercise-order"
                                                    type="number"
                                                    min="1"
                                                    value={newExercise.exercise_order}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        exercise_order: Number.parseInt(e.target.value) || 1,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="sets">Sets</Label>
                                                  <Input
                                                    id="sets"
                                                    type="number"
                                                    min="1"
                                                    value={newExercise.sets}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        sets: Number.parseInt(e.target.value) || 1,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="reps">Reps</Label>
                                                  <Input
                                                    id="reps"
                                                    placeholder="e.g., 10, 8-12, AMRAP"
                                                    value={newExercise.reps}
                                                    onChange={(e) =>
                                                      setNewExercise({ ...newExercise, reps: e.target.value })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="weight">Weight (kg)</Label>
                                                  <Input
                                                    id="weight"
                                                    type="number"
                                                    step="0.5"
                                                    value={newExercise.weight || ""}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        weight: Number.parseFloat(e.target.value) || null,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="percentage">% 1RM</Label>
                                                  <Input
                                                    id="percentage"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={newExercise.percentage || ""}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        percentage: Number.parseFloat(e.target.value) || null,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="tempo">Tempo</Label>
                                                  <Input
                                                    id="tempo"
                                                    placeholder="e.g., 3-1-2-0"
                                                    value={newExercise.tempo}
                                                    onChange={(e) =>
                                                      setNewExercise({ ...newExercise, tempo: e.target.value })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="rest">Rest (seconds)</Label>
                                                  <Input
                                                    id="rest"
                                                    type="number"
                                                    min="0"
                                                    value={newExercise.rest || ""}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        rest: Number.parseInt(e.target.value) || null,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <Label htmlFor="velocity">Velocity (m/s)</Label>
                                                  <Input
                                                    id="velocity"
                                                    type="number"
                                                    step="0.01"
                                                    value={newExercise.velocity || ""}
                                                    onChange={(e) =>
                                                      setNewExercise({
                                                        ...newExercise,
                                                        velocity: Number.parseFloat(e.target.value) || null,
                                                      })
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-2">
                                                  <Label htmlFor="notes">Notes</Label>
                                                  <Textarea
                                                    id="notes"
                                                    placeholder="Additional notes for this exercise"
                                                    value={newExercise.notes}
                                                    onChange={(e) =>
                                                      setNewExercise({ ...newExercise, notes: e.target.value })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button variant="outline" onClick={() => setExerciseDialogOpen(false)}>
                                                  Cancel
                                                </Button>
                                                <Button
                                                  onClick={handleAddExercise}
                                                  disabled={saving || !newExercise.exercise_id}
                                                >
                                                  {saving ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                  ) : (
                                                    <Plus className="mr-2 h-4 w-4" />
                                                  )}
                                                  Add Exercise
                                                </Button>
                                              </DialogFooter>
                                            </DialogContent>
                                          </Dialog>
                                          <Button size="sm" variant="ghost" onClick={() => handleDeleteBlock(block.id)}>
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      {block.description && (
                                        <p className="text-xs text-muted-foreground mb-2">{block.description}</p>
                                      )}
                                      <div className="space-y-1">
                                        {exercises
                                          .filter((ex) => ex.block_id === block.id)
                                          .map((ex) => (
                                            <div
                                              key={ex.id}
                                              className="flex items-center justify-between text-xs bg-background rounded p-2"
                                            >
                                              <div className="flex items-center gap-2">
                                                <GripVertical className="h-3 w-3 text-muted-foreground" />
                                                <span className="font-medium">{ex.exercise.name}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">
                                                  {ex.sets} × {ex.reps}
                                                  {ex.weight && ` @ ${ex.weight}kg`}
                                                  {ex.percentage && ` @ ${ex.percentage}%`}
                                                </span>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() => handleDeleteExercise(ex.id)}
                                                >
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          ))}
                                        {exercises.filter((ex) => ex.block_id === block.id).length === 0 && (
                                          <p className="text-xs text-muted-foreground py-2">No exercises added</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                {blocks.filter((block) => block.day_id === day.id).length === 0 && (
                                  <p className="text-sm text-muted-foreground py-4 text-center">No blocks added</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                    {days.filter((day) => day.week_id === week.id).length === 0 && (
                      <p className="text-sm text-muted-foreground py-8 text-center">No days added to this week</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
              <CardDescription>Modify the basic settings and information for this program.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Program settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
