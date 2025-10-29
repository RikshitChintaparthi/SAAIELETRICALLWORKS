"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ContactDetails } from "@/lib/types"

interface ContactTabProps {
  token: string
}

export default function ContactTab({ token }: ContactTabProps) {
  const [contact, setContact] = useState<ContactDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContact()
  }, [])

  const fetchContact = async () => {
    try {
      const response = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setContact(data)
      } else {
        setContact({
          company_name: "",
          emails: [],
          phones: [],
          address: "",
          map: "",
          social_links: {},
        })
      }
    } catch (error) {
      console.error("Error fetching contact:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!contact) return

    setSaving(true)
    try {
      await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      })
      alert("Contact details saved successfully!")
    } catch (error) {
      console.error("Error saving contact:", error)
      alert("Failed to save contact details")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">Loading...</CardContent>
      </Card>
    )
  }

  if (!contact) {
    return (
      <Card>
        <CardContent className="pt-6">Error loading contact details</CardContent>
      </Card>
    )
  }

  const addEmail = () => {
    setContact({ ...contact!, emails: [...(contact?.emails || []), ""] })
  }

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...(contact?.emails || [])]
    newEmails[index] = value
    setContact({ ...contact!, emails: newEmails })
  }

  const removeEmail = (index: number) => {
    const newEmails = [...(contact?.emails || [])]
    newEmails.splice(index, 1)
    setContact({ ...contact!, emails: newEmails })
  }

  const addPhone = () => {
    setContact({ ...contact!, phones: [...(contact?.phones || []), ""] })
  }

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...(contact?.phones || [])]
    newPhones[index] = value
    setContact({ ...contact!, phones: newPhones })
  }

  const removePhone = (index: number) => {
    const newPhones = [...(contact?.phones || [])]
    newPhones.splice(index, 1)
    setContact({ ...contact!, phones: newPhones })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>Update your contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
          <Input
            value={contact.company_name}
            onChange={(e) => setContact({ ...contact, company_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Addresses</label>
          {(contact.emails || []).map((email, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                placeholder="email@example.com"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeEmail(index)}
                disabled={(contact.emails?.length || 0) === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addEmail} className="w-full">
            + Add Email
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Numbers</label>
          {(contact.phones || []).map((phone, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={phone}
                onChange={(e) => updatePhone(index, e.target.value)}
                placeholder="+91 1234567890"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removePhone(index)}
                disabled={(contact.phones?.length || 0) === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addPhone} className="w-full">
            + Add Phone
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
          <Textarea value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Map Embed URL</label>
          <Input
            value={contact.map}
            onChange={(e) => setContact({ ...contact, map: e.target.value })}
            placeholder="Google Maps embed URL"
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-slate-900 mb-3">Social Links</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Twitter</label>
              <Input
                value={contact.social_links?.twitter || ""}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    social_links: { ...contact.social_links, twitter: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
              <Input
                value={contact.social_links?.linkedin || ""}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    social_links: { ...contact.social_links, linkedin: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GitHub</label>
              <Input
                value={contact.social_links?.github || ""}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    social_links: { ...contact.social_links, github: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
              <Input
                value={contact.social_links?.instagram || ""}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    social_links: { ...contact.social_links, instagram: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Contact Details"}
        </Button>
      </CardContent>
    </Card>
  )
}
