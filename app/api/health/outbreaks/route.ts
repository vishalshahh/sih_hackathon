import { type NextRequest, NextResponse } from "next/server"
import { HealthAPIService } from "@/lib/health-apis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || undefined

    const result = await HealthAPIService.getOutbreakAlerts(location)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
