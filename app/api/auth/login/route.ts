import { type NextRequest, NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = generateToken("admin")

    return NextResponse.json({
      success: true,
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
