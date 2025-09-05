import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const drugName = searchParams.get("drug")

    const recalls = drugName 
      ? MockDataService.getDrugRecalls().filter(recall => 
          recall.drugName.toLowerCase().includes(drugName.toLowerCase())
        )
      : MockDataService.getDrugRecalls()

    return NextResponse.json({
      success: true,
      data: recalls,
      source: "Mock Drug Recalls Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}