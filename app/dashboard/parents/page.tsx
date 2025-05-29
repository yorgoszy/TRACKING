"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Edit, Trash } from "lucide-react"

interface Parent {
  id: string
  userId: string
  name: string
  email: string
  status: "active" | "inactive"
  children: string[]
}

export default function ParentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [parents, setParents] = useState<Parent[]>([])

  // Filter parents based on search query
  const filteredParents = parents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteParent = (id: string) => {
    if (confirm("Are you sure you want to delete this parent?")) {
      setParents(parents.filter((parent) => parent.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Parents</h1>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search parents..."
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
              <TableHead>Children</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No parents found. Add parents from the Users section.
                </TableCell>
              </TableRow>
            ) : (
              filteredParents.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">{parent.name}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>
                    <Badge variant={parent.status === "active" ? "default" : "secondary"}>{parent.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {parent.children.length > 0 ? parent.children.join(", ") : "No children assigned"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/parents/${parent.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/parents/${parent.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteParent(parent.id)}>
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
