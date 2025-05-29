"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Plus, Users, Edit, Trash2, Search } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface User {
  id: string
  name: string | null
  email: string
  role: string
}

interface Group {
  id: string
  name: string
  description: string | null
  created_at: string
  member_count: number
  members: User[]
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Form states
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  // Edit states
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [editGroupName, setEditGroupName] = useState("")
  const [editGroupDescription, setEditGroupDescription] = useState("")
  const [editSelectedMembers, setEditSelectedMembers] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from("app_users")
        .select("id, name, email, role")
        .order("name")

      if (usersError) {
        console.error("Error fetching users:", usersError)
      } else {
        setUsers(usersData || [])
      }

      // Fetch groups with member count
      const { data: groupsData, error: groupsError } = await supabase
        .from("groups")
        .select(`
          id,
          name,
          description,
          created_at,
          group_members (
            user_id,
            app_users (
              id,
              name,
              email,
              role
            )
          )
        `)
        .order("created_at", { ascending: false })

      if (groupsError) {
        console.error("Error fetching groups:", groupsError)
      } else {
        const formattedGroups =
          groupsData?.map((group) => ({
            id: group.id,
            name: group.name,
            description: group.description,
            created_at: group.created_at,
            member_count: group.group_members?.length || 0,
            members: group.group_members?.map((gm: any) => gm.app_users).filter(Boolean) || [],
          })) || []

        setGroups(formattedGroups)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Παρακαλώ εισάγετε όνομα ομάδας")
      return
    }

    try {
      setSaving(true)

      // Create group
      const { data: group, error: groupError } = await supabase
        .from("groups")
        .insert({
          name: groupName,
          description: groupDescription || null,
        })
        .select()
        .single()

      if (groupError) {
        console.error("Error creating group:", groupError)
        alert("Σφάλμα κατά τη δημιουργία της ομάδας")
        return
      }

      // Add members
      if (selectedMembers.length > 0) {
        const memberInserts = selectedMembers.map((userId) => ({
          group_id: group.id,
          user_id: userId,
        }))

        const { error: membersError } = await supabase.from("group_members").insert(memberInserts)

        if (membersError) {
          console.error("Error adding members:", membersError)
          alert("Η ομάδα δημιουργήθηκε αλλά υπήρξε πρόβλημα με την προσθήκη μελών")
        }
      }

      // Reset form
      setGroupName("")
      setGroupDescription("")
      setSelectedMembers([])
      setShowCreateDialog(false)

      // Refresh data
      fetchData()

      alert("Η ομάδα δημιουργήθηκε με επιτυχία!")
    } catch (error) {
      console.error("Error:", error)
      alert("Απρόσμενο σφάλμα")
    } finally {
      setSaving(false)
    }
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setEditGroupName(group.name)
    setEditGroupDescription(group.description || "")
    setEditSelectedMembers(group.members.map((m) => m.id))
    setShowEditDialog(true)
  }

  const handleUpdateGroup = async () => {
    if (!editingGroup || !editGroupName.trim()) {
      return
    }

    try {
      setSaving(true)

      // Update group
      const { error: groupError } = await supabase
        .from("groups")
        .update({
          name: editGroupName,
          description: editGroupDescription || null,
        })
        .eq("id", editingGroup.id)

      if (groupError) {
        console.error("Error updating group:", groupError)
        return
      }

      // Delete existing members
      await supabase.from("group_members").delete().eq("group_id", editingGroup.id)

      // Add new members
      if (editSelectedMembers.length > 0) {
        const memberInserts = editSelectedMembers.map((userId) => ({
          group_id: editingGroup.id,
          user_id: userId,
        }))

        const { error: membersError } = await supabase.from("group_members").insert(memberInserts)

        if (membersError) {
          console.error("Error updating members:", membersError)
        }
      }

      // Reset form
      setEditingGroup(null)
      setEditGroupName("")
      setEditGroupDescription("")
      setEditSelectedMembers([])
      setShowEditDialog(false)

      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleEditMemberToggle = (userId: string) => {
    if (editSelectedMembers.includes(userId)) {
      setEditSelectedMembers(editSelectedMembers.filter((id) => id !== userId))
    } else {
      setEditSelectedMembers([...editSelectedMembers, userId])
    }
  }

  const handleMemberToggle = (userId: string) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId))
    } else {
      setSelectedMembers([...selectedMembers, userId])
    }
  }

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ομάδα;")) {
      return
    }

    try {
      const { error } = await supabase.from("groups").delete().eq("id", groupId)

      if (error) {
        console.error("Error deleting group:", error)
        alert("Σφάλμα κατά τη διαγραφή της ομάδας")
        return
      }

      fetchData()
      alert("Η ομάδα διαγράφηκε με επιτυχία!")
    } catch (error) {
      console.error("Error:", error)
      alert("Απρόσμενο σφάλμα")
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Φόρτωση ομάδων...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ομάδες Αθλητών</h1>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Νέα Ομάδα
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Δημιουργία Νέας Ομάδας</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name" className="text-gray-700">
                    Όνομα Ομάδας *
                  </Label>
                  <Input
                    id="group-name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="π.χ. Ομάδα Αρχαρίων"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-description" className="text-gray-700">
                    Περιγραφή
                  </Label>
                  <Textarea
                    id="group-description"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Προαιρετική περιγραφή της ομάδας"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Μέλη Ομάδας</Label>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Αναζήτηση χρηστών..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto border rounded p-3 space-y-2">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={selectedMembers.includes(user.id)}
                          onCheckedChange={() => handleMemberToggle(user.id)}
                        />
                        <Label htmlFor={`user-${user.id}`} className="text-sm cursor-pointer text-gray-700 flex-1">
                          <div className="flex items-center justify-between">
                            <span>{user.name || user.email}</span>
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedMembers.length > 0 && (
                    <p className="text-sm text-gray-600">Επιλεγμένα: {selectedMembers.length} μέλη</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)} disabled={saving}>
                    Ακύρωση
                  </Button>
                  <Button
                    onClick={handleCreateGroup}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Δημιουργία"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Group Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Επεξεργασία Ομάδας</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-group-name" className="text-gray-700">
                    Όνομα Ομάδας *
                  </Label>
                  <Input
                    id="edit-group-name"
                    value={editGroupName}
                    onChange={(e) => setEditGroupName(e.target.value)}
                    placeholder="π.χ. Ομάδα Αρχαρίων"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-group-description" className="text-gray-700">
                    Περιγραφή
                  </Label>
                  <Textarea
                    id="edit-group-description"
                    value={editGroupDescription}
                    onChange={(e) => setEditGroupDescription(e.target.value)}
                    placeholder="Προαιρετική περιγραφή της ομάδας"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Μέλη Ομάδας</Label>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Αναζήτηση χρηστών..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto border rounded p-3 space-y-2">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-user-${user.id}`}
                          checked={editSelectedMembers.includes(user.id)}
                          onCheckedChange={() => handleEditMemberToggle(user.id)}
                        />
                        <Label htmlFor={`edit-user-${user.id}`} className="text-sm cursor-pointer text-gray-700 flex-1">
                          <div className="flex items-center justify-between">
                            <span>{user.name || user.email}</span>
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {editSelectedMembers.length > 0 && (
                    <p className="text-sm text-gray-600">Επιλεγμένα: {editSelectedMembers.length} μέλη</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={saving}>
                    Ακύρωση
                  </Button>
                  <Button
                    onClick={handleUpdateGroup}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Ενημέρωση"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{group.name}</CardTitle>
                    {group.description && <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditGroup(group)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGroup(group.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {group.member_count} μέλη
                </div>

                {group.members.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Μέλη:</p>
                    <div className="flex flex-wrap gap-1">
                      {group.members.slice(0, 3).map((member) => (
                        <Badge key={member.id} variant="secondary" className="text-xs">
                          {member.name || member.email}
                        </Badge>
                      ))}
                      {group.members.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{group.members.length - 3} ακόμη
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Δημιουργήθηκε: {new Date(group.created_at).toLocaleDateString("el-GR")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Δεν υπάρχουν ομάδες</h3>
            <p className="text-gray-600 mb-4">Δημιουργήστε την πρώτη σας ομάδα για να οργανώσετε τους αθλητές σας</p>
            <Button onClick={() => setShowCreateDialog(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Δημιουργία Ομάδας
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
