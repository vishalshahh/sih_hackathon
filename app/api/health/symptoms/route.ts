import { type NextRequest, NextResponse } from "next/server"
import { MockDataService } from "@/lib/mock-data-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symptomName = searchParams.get("name")
    const symptoms = searchParams.get("symptoms")

    if (symptoms) {
      // Handle symptom assessment
      const symptomList = symptoms.split(',').map(s => s.trim())
      const assessment = MockDataService.getSymptomAssessmentBySymptoms(symptomList)
      
      if (!assessment) {
        return NextResponse.json({ 
          success: false, 
          error: "Symptom assessment not found" 
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: assessment,
        source: "Mock Symptom Assessment Data"
      })
    }

    if (symptomName) {
      const symptom = MockDataService.getSymptomByName(symptomName)
      
      if (!symptom) {
        return NextResponse.json({ 
          success: false, 
          error: "Symptom information not found" 
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: symptom,
        source: "Mock Symptom Data"
      })
    }

    // Return all symptoms
    const allSymptoms = MockDataService.getSymptomData()
    return NextResponse.json({
      success: true,
      data: allSymptoms,
      source: "Mock Symptom Data"
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}