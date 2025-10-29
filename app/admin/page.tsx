"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/admin/login-form"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  const handleLogin = (newToken: string) => {
    localStorage.setItem("adminToken", newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setToken(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />
}
