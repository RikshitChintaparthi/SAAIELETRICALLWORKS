"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ImageUpload from "../image-upload"
import type { Company } from "@/lib/types"

interface CompanyFormProps {
  company?: Company
  onSave: (company: Company) => void
  token: string
}

export default function CompanyForm({ company, onSave, token }: CompanyFormProps) {
  const [formData, setFormData] = useState<Company>(
    company || {
      id: "",
      name: "",
      logo: "",
      website: "",
      description: "",
      projects_list: [],
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
        <CardTitle>{company ? "Edit Company" : "Add New Company"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
            <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
            <ImageUpload
              images={formData.logo ? [formData.logo] : []}
              onImagesChange={(images) => setFormData({ ...formData, logo: images[0] || "" })}
              token={token}
              maxFiles={1}
            />
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
            {company ? "Update Company" : "Create Company"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
