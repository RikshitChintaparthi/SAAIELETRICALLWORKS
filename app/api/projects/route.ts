import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import type { Project } from "@/lib/types"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const db = await getDatabase()
    const projects = await db.collection("projects").find({ published: true }).sort({ order: 1 }).toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
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
    const project: Project = await req.json()

    project.id = project.id || `project-${Date.now()}`
    project.createdAt = new Date()
    project.updatedAt = new Date()

    const result = await db.collection("projects").insertOne(project)

    return NextResponse.json({ ...project, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
