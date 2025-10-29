import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    return handler(req, decoded)
  }
}
