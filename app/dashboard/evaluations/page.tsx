"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, Target, TrendingUp, Calendar, User, Plus, Eye, Edit } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { el } from "date-fns/locale"

interface Evaluation {
  id: string
  athlete_id: string
  athlete_name: string
  program_id: string
  program_name: string
  evaluation_type: "progress" | "performance" | "technique" | "overall"
  score: number
  notes: string
  created_at: string
  evaluator: string
}

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [filteredEvaluations, setFilteredEvaluations] = useState<Evaluation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    fetchEvaluations()
  }, [])

  useEffect(() => {
    filterEvaluations()
  }, [evaluations, searchTerm, typeFilter])

  const fetchEvaluations = async () => {
    try {
      setLoading(true)

      // Fetch athletes and programs for mock data
      const { data: athletes, error: athletesError } = await supabase
        .from("app_users")
        .select("id, name, email")
        .eq("role", "athlete")

      const { data: programs, error: programsError } = await supabase.from("programs").select("id, name")

      if (athletesError || programsError) {
        console.error("Error fetching data:", athletesError || programsError)
        return
      }

      // Create mock evaluations
      const mockEvaluations: Evaluation[] = []
      const evaluationTypes: Array<"progress" | "performance" | "technique" | "overall"> = [
        "progress",
        "performance",
        "technique",
        "overall",
      ]

      athletes?.forEach((athlete, index) => {
        programs?.slice(0, 2).forEach((program, progIndex) => {
          const evalType = evaluationTypes[index % evaluationTypes.length]
          const score = Math.floor(Math.random() * 40) + 60 // Score between 60-100

          mockEvaluations.push({
            id: `eval-${athlete.id}-${program.id}`,
            athlete_id: athlete.id,
            athlete_name: athlete.name || athlete.email,
            program_id: program.id,
            program_name: program.name,
            evaluation_type: evalType,
            score: score,
            notes: `Αξιολόγηση ${evalType} για τον αθλητή. Παρατηρήσεις και σχόλια για τη βελτίωση.`,
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            evaluator: "Προπονητής Γιάννης",
          })
        })
      })

      setEvaluations(mockEvaluations)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterEvaluations = () => {
    let filtered = evaluations

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (evaluation) =>
          evaluation.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evaluation.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evaluation.notes.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((evaluation) => evaluation.evaluation_type === typeFilter)
    }

    setFilteredEvaluations(filtered)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "progress":
        return "bg-blue-100 text-blue-800"
      case "performance":
        return "bg-green-100 text-green-800"
      case "technique":
        return "bg-purple-100 text-purple-800"
      case "overall":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "progress":
        return "Πρόοδος"
      case "performance":
        return "Απόδοση"
      case "technique":
        return "Τεχνική"
      case "overall":
        return "Συνολική"
      default:
        return "Άγνωστο"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση αξιολογήσεων...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Αξιολόγηση Αθλητών</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Αναζήτηση αξιολογήσεων..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white border-gray-300"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue placeholder="Τύπος αξιολόγησης" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Όλοι οι τύποι</SelectItem>
                <SelectItem value="progress">Πρόοδος</SelectItem>
                <SelectItem value="performance">Απόδοση</SelectItem>
                <SelectItem value="technique">Τεχνική</SelectItem>
                <SelectItem value="overall">Συνολική</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Νέα Αξιολόγηση
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Συνολικές Αξιολογήσεις</p>
                  <p className="text-2xl font-bold text-gray-900">{evaluations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Μέσος Όρος Βαθμολογίας</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {evaluations.length > 0
                      ? Math.round(evaluations.reduce((sum, e) => sum + e.score, 0) / evaluations.length)
                      : 0}
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
                  <p className="text-sm font-medium text-gray-600">Αξιολογημένοι Αθλητές</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(evaluations.map((e) => e.athlete_id)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Αυτή την Εβδομάδα</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      evaluations.filter((e) => new Date(e.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evaluations List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvaluations.map((evaluation) => (
            <Card key={evaluation.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{evaluation.athlete_name}</CardTitle>
                    <p className="text-sm text-gray-600">{evaluation.program_name}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getTypeColor(evaluation.evaluation_type)}>
                      {getTypeText(evaluation.evaluation_type)}
                    </Badge>
                    <div className={`text-2xl font-bold ${getScoreColor(evaluation.score)}`}>
                      {evaluation.score}/100
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Notes */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-3">{evaluation.notes}</p>
                </div>

                {/* Evaluator and Date */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Αξιολογητής: {evaluation.evaluator}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(new Date(evaluation.created_at), "dd/MM/yyyy", { locale: el })}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-white border-gray-300">
                    <Eye className="h-4 w-4 mr-1" />
                    Προβολή
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-white border-gray-300">
                    <Edit className="h-4 w-4 mr-1" />
                    Επεξεργασία
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvaluations.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν βρέθηκαν αξιολογήσεις</h3>
            <p className="text-gray-600">
              {searchTerm || typeFilter !== "all"
                ? "Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης"
                : "Δεν υπάρχουν αξιολογήσεις ακόμη"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
