import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const drugName = searchParams.get("name")

    if (!drugName) {
      return NextResponse.json({ error: "Drug name is required" }, { status: 400 })
    }

    const drug = MockDataService.getDrugByName(drugName)

    if (!drug) {
      return NextResponse.json({ 
        success: false, 
        error: "Drug information not found" 
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: drug,
      source: "Mock Drug Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
