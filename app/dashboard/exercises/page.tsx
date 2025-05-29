"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Trash, Video, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Exercise {
  id: string
  name: string
  description: string | null
  video_url: string | null
  created_at: string
  categories?: Category[]
}

interface Category {
  id: string
  name: string
  type: string
}

export default function ExercisesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newExerciseName, setNewExerciseName] = useState("")
  const [newExerciseVideo, setNewExerciseVideo] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryType, setNewCategoryType] = useState("")

  useEffect(() => {
    fetchExercises()
    fetchCategories()
  }, [])

  const fetchExercises = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("exercises")
        .select(`
          *,
          exercise_to_category (
            category_id,
            exercise_categories (
              id,
              name,
              type
            )
          )
        `)
        .order("name")

      if (error) {
        console.error("Error fetching exercises:", error)
      } else {
        const formattedExercises = (data || []).map((exercise) => ({
          ...exercise,
          categories: exercise.exercise_to_category?.map((etc: any) => etc.exercise_categories) || [],
        }))
        setExercises(formattedExercises)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("exercise_categories").select("*").order("name")

      if (error) {
        console.error("Error fetching categories:", error)
      } else {
        setCategories(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.categories?.some((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Προσθήκη άσκησης
      const { data: exerciseData, error: exerciseError } = await supabase
        .from("exercises")
        .insert({
          name: newExerciseName,
          video_url: newExerciseVideo || null,
        })
        .select()
        .single()

      if (exerciseError) {
        console.error("Error adding exercise:", exerciseError)
        alert("Σφάλμα κατά την προσθήκη της άσκησης")
        return
      }

      // Προσθήκη κατηγοριών
      if (selectedCategories.length > 0) {
        const categoryRelations = selectedCategories.map((categoryId) => ({
          exercise_id: exerciseData.id,
          category_id: categoryId,
        }))

        const { error: categoryError } = await supabase.from("exercise_to_category").insert(categoryRelations)

        if (categoryError) {
          console.error("Error adding categories:", categoryError)
        }
      }

      // Ανανέωση λίστας
      fetchExercises()

      // Καθαρισμός φόρμας
      setNewExerciseName("")
      setNewExerciseVideo("")
      setSelectedCategories([])
      setIsExerciseDialogOpen(false)
    } catch (error) {
      console.error("Error:", error)
      alert("Απρόσμενο σφάλμα")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { error } = await supabase.from("exercise_categories").insert({
        name: newCategoryName,
        type: newCategoryType,
      })

      if (error) {
        console.error("Error adding category:", error)
        alert("Σφάλμα κατά την προσθήκη της κατηγορίας")
      } else {
        fetchCategories()
        setNewCategoryName("")
        setNewCategoryType("")
        setIsCategoryDialogOpen(false)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Απρόσμενο σφάλμα")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExercise = async (id: string) => {
    if (confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την άσκηση;")) {
      setExercises(exercises.filter((exercise) => exercise.id !== id))
    }
  }

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("exercises.title")}</h1>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("exercises.addCategory")}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <form onSubmit={handleAddCategory}>
                <DialogHeader>
                  <DialogTitle>{t("exercises.addCategory")}</DialogTitle>
                  <DialogDescription>
                    Προσθέστε μια νέα κατηγορία άσκησης για να οργανώσετε τη βάση δεδομένων σας.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category-name">{t("exercises.category")}</Label>
                    <Input
                      id="category-name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-type">Τύπος</Label>
                    <Input
                      id="category-type"
                      value={newCategoryType}
                      onChange={(e) => setNewCategoryType(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t("exercises.addCategory")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isExerciseDialogOpen} onOpenChange={setIsExerciseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("exercises.add")}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Προσθήκη Άσκησης</DialogTitle>
                <DialogDescription>Προσθέστε μια νέα άσκηση στη βάση δεδομένων.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddExercise}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="exercise-name">Όνομα</Label>
                    <Input
                      id="exercise-name"
                      value={newExerciseName}
                      onChange={(e) => setNewExerciseName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Κατηγορία</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="video-url">Λινκ για Βίντεο</Label>
                    <Input
                      id="video-url"
                      value={newExerciseVideo}
                      onChange={(e) => setNewExerciseVideo(e.target.value)}
                      placeholder="https://example.com/video"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Προσθήκη
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("exercises.search")}
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
              <TableHead>{t("exercises.name")}</TableHead>
              <TableHead>{t("exercises.categories")}</TableHead>
              <TableHead>{t("exercises.video")}</TableHead>
              <TableHead className="text-right">Ενέργειες</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Φόρτωση ασκήσεων...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">{exercise.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {exercise.categories?.map((category) => (
                        <Badge key={category.id} variant="outline">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {exercise.video_url && (
                      <a
                        href={exercise.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Προβολή
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteExercise(exercise.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Διαγραφή</span>
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
