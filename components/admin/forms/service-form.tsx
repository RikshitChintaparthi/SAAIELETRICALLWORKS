"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ImageUpload from "../image-upload"
import type { Service } from "@/lib/types"

interface ServiceFormProps {
  service?: Service
  onSave: (service: Service) => void
  token: string
}

export default function ServiceForm({ service, onSave, token }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>(
    service || {
      id: "",
      title: "",
      description: "",
      price: "",
      icon: "",
      images: [],
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
        <CardTitle>{service ? "Edit Service" : "Add New Service"}</CardTitle>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
            <Input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Icon URL</label>
            <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Images</label>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData({ ...formData, images })}
              token={token}
            />
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
            {service ? "Update Service" : "Create Service"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
