import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const specialty = searchParams.get("specialty")

    let providers = MockDataService.getProviderData()

    if (location) {
      providers = MockDataService.getProvidersByLocation(location)
    }

    if (type) {
      providers = providers.filter(provider => provider.type === type)
    }

    if (specialty) {
      providers = providers.filter(provider => 
        provider.specialty.toLowerCase().includes(specialty.toLowerCase())
      )
    }

    return NextResponse.json({
      success: true,
      data: providers,
      source: "Mock Healthcare Providers Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
