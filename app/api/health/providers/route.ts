import { type NextRequest, NextResponse } from "next/server"
import { HealthAPIService } from "@/lib/health-apis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const type = searchParams.get("type") || undefined

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const result = await HealthAPIService.findHealthcareProviders(location, type)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
