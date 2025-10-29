import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import type { Company } from "@/lib/types"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const db = await getDatabase()
    const companies = await db.collection("companies").find({}).sort({ order: 1 }).toArray()

    return NextResponse.json(companies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const company: Company = await req.json()

    company.id = company.id || `company-${Date.now()}`
    company.createdAt = new Date()
    company.updatedAt = new Date()

    const result = await db.collection("companies").insertOne(company)

    return NextResponse.json({ ...company, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating company:", error)
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
  }
}
