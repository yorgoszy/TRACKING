"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function CreateProgramPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    is_template: false,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name.trim()) {
      toast({
        title: "Error",
        description: "Program name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)

      const { data, error } = await supabase
        .from("programs")
        .insert([
          {
            name: form.name.trim(),
            description: form.description.trim() || null,
            type: form.type.trim() || null,
            is_template: form.is_template,
          },
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Success",
        description: "Program created successfully!",
      })

      // Redirect to edit page to add structure
      router.push(`/dashboard/programs/${data.id}/edit`)
    } catch (error: any) {
      console.error("Error creating program:", error)
      toast({
        title: "Error",
        description: "Failed to create program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push("/dashboard/programs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Program</CardTitle>
          <CardDescription>
            Create a new training program. You can add weeks, days, and exercises after creating the basic program.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  Program Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Beginner Strength Program, Advanced Powerlifting"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the program goals and target audience"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">Program Type</Label>
                <Input
                  id="type"
                  placeholder="e.g., Strength, Hypertrophy, Powerlifting, Conditioning"
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_template"
                  checked={form.is_template}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, is_template: checked }))}
                />
                <Label htmlFor="is_template">Save as Template</Label>
              </div>
              <p className="text-sm text-muted-foreground">Templates can be reused to create new programs quickly</p>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/programs")}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving || !form.name.trim()}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Create Program
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>After creating your program, you'll be able to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Add training weeks to structure your program</li>
              <li>Create training days within each week</li>
              <li>Add exercise blocks to organize your workouts</li>
              <li>Add specific exercises with sets, reps, and other parameters</li>
              <li>Assign the program to athletes or groups</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
