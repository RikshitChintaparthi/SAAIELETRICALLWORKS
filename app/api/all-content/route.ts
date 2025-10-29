import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET() {
  try {
    const db = await getDatabase()

    const [services, projects, companies, contact] = await Promise.all([
      db.collection("services").find({ published: true }).sort({ order: 1 }).toArray(),
      db.collection("projects").find({ published: true }).sort({ order: 1 }).toArray(),
      db.collection("companies").find({}).sort({ order: 1 }).toArray(),
      db.collection("contact").findOne({}),
    ])

    return NextResponse.json({
      services,
      projects,
      companies,
      contact,
    })
  } catch (error) {
    console.error("Error fetching all content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
