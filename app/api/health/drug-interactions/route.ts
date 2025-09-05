import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const drugName = searchParams.get("drug")

    if (!drugName) {
      return NextResponse.json({ error: "Drug name is required" }, { status: 400 })
    }

    const interactions = MockDataService.getDrugInteractionsForDrug(drugName)

    return NextResponse.json({
      success: true,
      data: interactions,
      source: "Mock Drug Interactions Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 