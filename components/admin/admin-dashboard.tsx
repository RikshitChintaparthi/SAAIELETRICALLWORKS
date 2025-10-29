"use client"

import { useState } from "react"
import { LogOut, BarChart3, Briefcase, Building2, Mail, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import ServicesTab from "./tabs/services-tab"
import ProjectsTab from "./tabs/projects-tab"
import CompaniesTab from "./tabs/companies-tab"
import ContactTab from "./tabs/contact-tab"
import DashboardOverview from "./dashboard-overview"

interface AdminDashboardProps {
  token: string
  onLogout: () => void
}

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "projects", label: "Projects", icon: BarChart3 },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 space-y-4">
          <div className="text-xs text-slate-500 text-center">
            <p>Admin Dashboard</p>
            <p>© 2025</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-slate-200 text-slate-900 font-semibold">AD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-900">admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-600 hover:text-slate-900">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === "dashboard" && <DashboardOverview token={token} />}
            {activeTab === "services" && <ServicesTab token={token} />}
            {activeTab === "projects" && <ProjectsTab token={token} />}
            {activeTab === "companies" && <CompaniesTab token={token} />}
            {activeTab === "contact" && <ContactTab token={token} />}
          </div>
        </main>
      </div>
    </div>
  )
}
