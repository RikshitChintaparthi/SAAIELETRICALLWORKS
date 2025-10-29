import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import type { ContactDetails } from "@/lib/types"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const db = await getDatabase()
    const contact = await db.collection("contact").findOne({})

    if (!contact) {
      return NextResponse.json({ error: "Contact details not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const updates: ContactDetails = await req.json()
    updates.updatedAt = new Date()

    const result = await db
      .collection("contact")
      .findOneAndUpdate({}, { $set: updates }, { returnDocument: "after", upsert: true })

    return NextResponse.json(result.value)
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}
