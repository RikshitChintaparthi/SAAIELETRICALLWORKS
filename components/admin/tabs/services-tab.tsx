"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceForm from "../forms/service-form"
import ServiceList from "../lists/service-list"
import type { Service } from "@/lib/types"

interface ServicesTabProps {
  token: string
}

export default function ServicesTab({ token }: ServicesTabProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (service: Service) => {
    try {
      if (editingService?._id) {
        await fetch(`/api/services/${editingService._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(service),
        })
      } else {
        await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(service),
        })
      }
      fetchServices()
      setShowForm(false)
      setEditingService(null)
    } catch (error) {
      console.error("Error saving service:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchServices()
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Services</h2>
          <p className="text-sm text-slate-600">Manage your services</p>
        </div>
        <Button
          onClick={() => {
            setEditingService(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? "Cancel" : "Add Service"}
        </Button>
      </div>

      {showForm && <ServiceForm service={editingService || undefined} onSave={handleSave} token={token} />}

      {loading ? (
        <Card>
          <CardContent className="pt-6">Loading...</CardContent>
        </Card>
      ) : (
        <ServiceList
          services={services}
          onEdit={(service) => {
            setEditingService(service)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
