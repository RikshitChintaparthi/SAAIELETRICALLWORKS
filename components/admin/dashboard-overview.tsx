"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, ResponsiveContainer } from "recharts"

interface DashboardOverviewProps {
  token: string
}

interface ContentStats {
  services: number
  projects: number
  companies: number
}

export default function DashboardOverview({ token }: DashboardOverviewProps) {
  const [stats, setStats] = useState<ContentStats>({
    services: 0,
    projects: 0,
    companies: 0,
  })
  const [loading, setLoading] = useState(true)
  const [populating, setPopulating] = useState(false)

  const fetchStats = async () => {
    try {
      const [servicesRes, projectsRes, companiesRes] = await Promise.all([
        fetch("/api/services", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/companies", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const servicesData = await servicesRes.json()
      const projectsData = await projectsRes.json()
      const companiesData = await companiesRes.json()

      setStats({
        services: Array.isArray(servicesData) ? servicesData.length : 0,
        projects: Array.isArray(projectsData) ? projectsData.length : 0,
        companies: Array.isArray(companiesData) ? companiesData.length : 0,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const barChartData = [
    { name: "Mon", value: 240 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 278 },
    { name: "Thu", value: 239 },
    { name: "Fri", value: 189 },
    { name: "Sat", value: 278 },
    { name: "Sun", value: 189 },
  ]

  const lineChartData = [
    { name: "Week 1", value: 400 },
    { name: "Week 2", value: 520 },
    { name: "Week 3", value: 480 },
    { name: "Week 4", value: 390 },
    { name: "Week 5", value: 520 },
  ]

  const handlePopulateData = async () => {
    if (!confirm("This will replace all existing data with initial data from the website. Continue?")) {
      return
    }

    setPopulating(true)
    try {
      const response = await fetch("/api/populate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert("Data populated successfully!")
        // Refresh stats
        fetchStats()
      } else {
        const error = await response.json()
        alert(`Failed to populate data: ${error.error}`)
      }
    } catch (error) {
      console.error("Error populating data:", error)
      alert("Failed to populate data. Please check console for details.")
    } finally {
      setPopulating(false)
    }
  }

  const teamMembers = [
    { name: "Alice Johnson", email: "alice@company.com" },
    { name: "Bob Smith", email: "bob@company.com" },
    { name: "Carol Lee", email: "carol@company.com" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            The main landing page after a successful login. It can display a summary of website content, quick statistics,
            or navigation links to other management sections.
          </p>
        </div>
        <Button 
          onClick={handlePopulateData} 
          disabled={populating}
          variant="outline"
          className="ml-4"
        >
          {populating ? "Populating..." : "Populate Initial Data"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Services Card */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">Services</CardTitle>
                <CardDescription className="text-green-600 text-sm font-medium">+12.5%</CardDescription>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-2">{stats.services}</div>
            <p className="text-sm text-slate-600">Total services available</p>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Projects Card */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">Projects</CardTitle>
                <CardDescription className="text-green-600 text-sm font-medium">+8.2%</CardDescription>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-2">{stats.projects}</div>
            <p className="text-sm text-slate-600">Active projects</p>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">Team Members</CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Invite your team members to collaborate.
                </CardDescription>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500 truncate">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Management Section */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⚙️</span>
            </div>
            <div>
              <CardTitle className="text-slate-900">Admin Management</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Account:</label>
              <input
                type="text"
                placeholder="Please enter account"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Email:</label>
              <input
                type="email"
                placeholder="Please enter email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
