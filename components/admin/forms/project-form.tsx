"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ImageUpload from "../image-upload"
import type { Project } from "@/lib/types"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Project) => void
  token: string
}

export default function ProjectForm({ project, onSave, token }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: "",
      title: "",
      summary: "",
      description: "",
      cover_image: "",
      process_steps: [],
      status: "planned",
      related_services: [],
      company: "",
      published: true,
      order: 0,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Summary</label>
            <Input value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
            <ImageUpload
              images={formData.cover_image ? [formData.cover_image] : []}
              onImagesChange={(images) => setFormData({ ...formData, cover_image: images[0] || "" })}
              token={token}
              maxFiles={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
            <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-700">
              Published
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
            />
          </div>

          <Button type="submit" className="w-full">
            {project ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
