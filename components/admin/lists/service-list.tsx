"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/types"

interface ServiceListProps {
  services: Service[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  onReorder?: (services: Service[]) => void
  token?: string
}

export default function ServiceList({ services, onEdit, onDelete, onReorder, token }: ServiceListProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [items, setItems] = useState(services)

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === index) return

    const newItems = [...items]
    const draggedItemContent = newItems[draggedItem]
    newItems.splice(draggedItem, 1)
    newItems.splice(index, 0, draggedItemContent)

    setDraggedItem(index)
    setItems(newItems)
  }

  const handleDragEnd = async () => {
    setDraggedItem(null)
    if (onReorder && token) {
      onReorder(items)
      // Call API to save new order
      try {
        await fetch("/api/reorder/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items }),
        })
      } catch (error) {
        console.error("Error saving order:", error)
      }
    }
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-500">
          No services yet. Create one to get started.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((service, index) => (
        <Card
          key={service._id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`cursor-move transition-opacity ${draggedItem === index ? "opacity-50" : ""}`}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">⋮⋮</span>
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                </div>
                <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                  <span>Price: {service.price || "N/A"}</span>
                  <span>Published: {service.published ? "Yes" : "No"}</span>
                  <span>Order: {service.order}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(service)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(service._id || "")}>
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
