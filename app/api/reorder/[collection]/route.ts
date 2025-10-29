import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest, { params }: { params: { collection: string } }) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const { items } = await req.json()

    // Update order for each item
    for (let i = 0; i < items.length; i++) {
      await db.collection(params.collection).updateOne({ _id: new ObjectId(items[i]._id) }, { $set: { order: i } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering:", error)
    return NextResponse.json({ error: "Failed to reorder items" }, { status: 500 })
  }
}
