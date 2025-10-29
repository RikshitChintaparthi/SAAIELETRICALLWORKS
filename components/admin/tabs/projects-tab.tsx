"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProjectForm from "../forms/project-form"
import ProjectList from "../lists/project-list"
import type { Project } from "@/lib/types"

interface ProjectsTabProps {
  token: string
}

export default function ProjectsTab({ token }: ProjectsTabProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (project: Project) => {
    try {
      if (editingProject?._id) {
        await fetch(`/api/projects/${editingProject._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        })
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        })
      }
      fetchProjects()
      setShowForm(false)
      setEditingProject(null)
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-600">Manage your projects</p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {showForm && <ProjectForm project={editingProject || undefined} onSave={handleSave} token={token} />}

      {loading ? (
        <Card>
          <CardContent className="pt-6">Loading...</CardContent>
        </Card>
      ) : (
        <ProjectList
          projects={projects}
          onEdit={(project) => {
            setEditingProject(project)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
