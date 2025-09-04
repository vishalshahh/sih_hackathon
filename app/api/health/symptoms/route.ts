import { type NextRequest, NextResponse } from "next/server"
import { HealthAPIService } from "@/lib/health-apis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symptoms } = body

    if (!symptoms || !Array.isArray(symptoms)) {
      return NextResponse.json({ error: "Symptoms array is required" }, { status: 400 })
    }

    const result = await HealthAPIService.assessSymptoms(symptoms)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
