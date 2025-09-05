import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const disease = searchParams.get("disease")

    let outbreaks = MockDataService.getOutbreakData()

    if (location) {
      outbreaks = MockDataService.getOutbreaksByLocation(location)
    }

    if (disease) {
      outbreaks = outbreaks.filter(outbreak => 
        outbreak.disease.toLowerCase().includes(disease.toLowerCase())
      )
    }

    return NextResponse.json({
      success: true,
      data: outbreaks,
      source: "Mock Outbreak Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
