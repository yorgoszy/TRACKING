"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
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
import { PlusCircle, Search, Eye, Edit, Trash, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "athlete" | "parent" | "coach" | "both"
  status: "active" | "inactive"
}

interface Athlete {
  id: string
  userId: string
  name: string
  email: string
  status: "active" | "inactive"
  program?: string
  group?: string
}

export default function AthletesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [users, setUsers] = useState<User[]>([])

  // Simulate fetching users from a database
  useEffect(() => {
    // This would be an API call in a real app
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  // Filter athletes based on search query
  const filteredAthletes = athletes.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get users who are athletes or both but not already in the athletes list
  const availableUsers = users.filter(
    (user) =>
      (user.role === "athlete" || user.role === "both") && !athletes.some((athlete) => athlete.userId === user.id),
  )

  const handleAddAthlete = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUser) {
      const newAthlete: Athlete = {
        id: Date.now().toString(),
        userId: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        status: "active",
      }
      setAthletes([...athletes, newAthlete])
      setSelectedUser(null)
      setIsUserDialogOpen(false)
    }
  }

  const handleDeleteAthlete = (id: string) => {
    if (confirm("Are you sure you want to delete this athlete?")) {
      setAthletes(athletes.filter((athlete) => athlete.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Athletes</h1>
        <div className="flex gap-2">
          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add from Users
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddAthlete}>
                <DialogHeader>
                  <DialogTitle>Add User as Athlete</DialogTitle>
                  <DialogDescription>
                    Select an existing user with the Athlete role to add them to the athletes list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select onValueChange={(value) => setSelectedUser(users.find((u) => u.id === value) || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUsers.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No available users with Athlete role
                          </SelectItem>
                        ) : (
                          availableUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={!selectedUser}>
                    Add as Athlete
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Athlete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Athlete</DialogTitle>
                <DialogDescription>
                  This will create a new user with the Athlete role and add them to the athletes list.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter athlete name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter athlete email" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Athlete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search athletes..."
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
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAthletes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No athletes found. Add athletes from existing users or create new ones.
                </TableCell>
              </TableRow>
            ) : (
              filteredAthletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell className="font-medium">{athlete.name}</TableCell>
                  <TableCell>{athlete.email}</TableCell>
                  <TableCell>
                    <Badge variant={athlete.status === "active" ? "default" : "secondary"}>{athlete.status}</Badge>
                  </TableCell>
                  <TableCell>{athlete.program || "—"}</TableCell>
                  <TableCell>{athlete.group || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/athletes/${athlete.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/athletes/${athlete.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAthlete(athlete.id)}>
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
