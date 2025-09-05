import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vaccineName = searchParams.get("name")
    const ageGroup = searchParams.get("age")

    if (vaccineName) {
      const vaccination = MockDataService.getVaccinationByName(vaccineName)
      
      if (!vaccination) {
        return NextResponse.json({ 
          success: false, 
          error: "Vaccination information not found" 
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: vaccination,
        source: "Mock Vaccination Data"
      })
    }

    if (ageGroup) {
      const schedule = MockDataService.getVaccinationScheduleByAge(ageGroup)
      
      if (!schedule) {
        return NextResponse.json({ 
          success: false, 
          error: "Vaccination schedule not found for this age group" 
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: schedule,
        source: "Mock Vaccination Schedule Data"
      })
    }

    // Return all vaccinations
    const allVaccinations = MockDataService.getVaccinationData()
    return NextResponse.json({
      success: true,
      data: allVaccinations,
      source: "Mock Vaccination Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
