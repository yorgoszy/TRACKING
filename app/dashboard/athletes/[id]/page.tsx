"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

export default function AthleteViewPage() {
  const params = useParams()
  const router = useRouter()
  const athleteId = params.id as string

  // In a real app, you would fetch the athlete data from your database
  // For now, we'll use mock data
  const athlete = {
    id: athleteId,
    name: "Athlete Name",
    email: "athlete@example.com",
    status: "active" as const,
    phone: "+30 123 456 7890",
    dateJoined: "2024-01-15",
    program: "Youth Strength",
    notes: "Shows great potential in strength training.",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Athlete Details</h1>
        </div>
        <Button asChild>
          <Link href={`/dashboard/athletes/${athleteId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic information about the athlete</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-lg">{athlete.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg">{athlete.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-lg">{athlete.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={athlete.status === "active" ? "default" : "secondary"}>{athlete.status}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date Joined</p>
                <p className="text-lg">{athlete.dateJoined}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Program</p>
                <p className="text-lg">{athlete.program}</p>
              </div>
            </div>
            {athlete.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="text-lg">{athlete.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
