"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CompanyForm from "../forms/company-form"
import CompanyList from "../lists/company-list"
import type { Company } from "@/lib/types"

interface CompaniesTabProps {
  token: string
}

export default function CompaniesTab({ token }: CompaniesTabProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/companies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setCompanies(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching companies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (company: Company) => {
    try {
      if (editingCompany?._id) {
        await fetch(`/api/companies/${editingCompany._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(company),
        })
      } else {
        await fetch("/api/companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(company),
        })
      }
      fetchCompanies()
      setShowForm(false)
      setEditingCompany(null)
    } catch (error) {
      console.error("Error saving company:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return

    try {
      await fetch(`/api/companies/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchCompanies()
    } catch (error) {
      console.error("Error deleting company:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Companies</h2>
          <p className="text-sm text-slate-600">Manage companies you've worked with</p>
        </div>
        <Button
          onClick={() => {
            setEditingCompany(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? "Cancel" : "Add Company"}
        </Button>
      </div>

      {showForm && <CompanyForm company={editingCompany || undefined} onSave={handleSave} token={token} />}

      {loading ? (
        <Card>
          <CardContent className="pt-6">Loading...</CardContent>
        </Card>
      ) : (
        <CompanyList
          companies={companies}
          onEdit={(company) => {
            setEditingCompany(company)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
