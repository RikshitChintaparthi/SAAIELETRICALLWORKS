import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import type { Service } from "@/lib/types"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const db = await getDatabase()
    const services = await db.collection("services").find({ published: true }).sort({ order: 1 }).toArray()

    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
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
    const service: Service = await req.json()

    service.id = service.id || `service-${Date.now()}`
    service.createdAt = new Date()
    service.updatedAt = new Date()

    const result = await db.collection("services").insertOne(service)

    return NextResponse.json({ ...service, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
