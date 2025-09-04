export interface HealthAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  source?: string
}

export interface VaccinationInfo {
  vaccine: string
  ageGroup: string
  schedule: string[]
  description: string
  sideEffects: string[]
  contraindications: string[]
}

export interface DrugInfo {
  name: string
  genericName: string
  description: string
  dosage: string
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  manufacturer?: string
  activeIngredients?: string[]
  drugInteractions?: string[]
  adverseReactions?: string[]
  pregnancyCategory?: string
  breastfeeding?: string
  fdaApprovalDate?: string
  ndcNumber?: string
}

export interface SymptomAssessment {
  symptoms: string[]
  possibleConditions: {
    condition: string
    probability: number
    urgency: "low" | "medium" | "high" | "emergency"
    description: string
  }[]
  recommendations: string[]
  whenToSeekCare: string
}

export interface HealthcareProvider {
  name: string
  type: "hospital" | "clinic" | "pharmacy" | "emergency"
  address: string
  phone: string
  distance: number
  rating: number
  specialties: string[]
  emergencyServices: boolean
}

export interface OutbreakAlert {
  disease: string
  location: string
  severity: "low" | "medium" | "high"
  description: string
  preventionMeasures: string[]
  lastUpdated: string
}

export class HealthAPIService {
  private static readonly BASE_URLS = {
    // Government health APIs (India)
    cowin: "https://cdn-api.co-vin.in/api",
    mohfw: "https://www.mohfw.gov.in/data",
    // International health APIs
    who: "https://covid19.who.int/api",
    cdc: "https://data.cdc.gov/api",
    // Medical databases
    fda: "https://api.fda.gov",
    openfda: "https://api.open.fda.gov",
    rxnorm: "https://rxnav.nlm.nih.gov/REST",
  }

  // Check if we're in development mode and should skip external API calls
  private static isDevelopmentMode(): boolean {
    return process.env.NODE_ENV === 'development'
  }

  // Check if external APIs are available
  private static async isExternalAPIAvailable(): Promise<boolean> {
    try {
      // Quick test to see if we can reach external APIs
      const testUrl = 'https://httpbin.org/status/200'
      const response = await fetch(testUrl, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(3000) // 3 second timeout
      })
      return response.ok
    } catch {
      return false
    }
  }

  // Vaccination Information
  static async getVaccinationInfo(vaccine: string, ageGroup?: string): Promise<HealthAPIResponse<VaccinationInfo[]>> {
    try {
      // Mock implementation - replace with actual API calls
      const mockVaccinations: VaccinationInfo[] = [
        {
          vaccine: "COVID-19",
          ageGroup: "18+",
          schedule: ["First dose", "Second dose after 28 days", "Booster after 6 months"],
          description: "mRNA vaccine for COVID-19 prevention",
          sideEffects: ["Pain at injection site", "Fatigue", "Headache", "Muscle pain"],
          contraindications: ["Severe allergic reaction to previous dose", "Active COVID-19 infection"],
        },
        {
          vaccine: "Hepatitis B",
          ageGroup: "All ages",
          schedule: ["Birth", "1-2 months", "6-18 months"],
          description: "Vaccine to prevent Hepatitis B infection",
          sideEffects: ["Soreness at injection site", "Low-grade fever"],
          contraindications: ["Severe illness", "Allergy to vaccine components"],
        },
      ]

      const filtered = vaccine
        ? mockVaccinations.filter((v) => v.vaccine.toLowerCase().includes(vaccine.toLowerCase()))
        : mockVaccinations

      return {
        success: true,
        data: filtered,
        source: "CoWIN API / WHO Guidelines",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch vaccination information",
      }
    }
  }

  // OpenFDA Drug Information with smart fallback
  static async getDrugInfo(drugName: string): Promise<HealthAPIResponse<DrugInfo>> {
    try {
      // In development mode or if external APIs are not available, use mock data directly
      if (this.isDevelopmentMode() || !(await this.isExternalAPIAvailable())) {
        console.log(`Using mock data for ${drugName} (development mode or no external API access)`)
        return this.getMockDrugInfo(drugName)
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data if OpenFDA fails
      console.log(`OpenFDA API failed, using fallback data for: ${drugName}`)
      return this.getMockDrugInfo(drugName)
    } catch (error) {
      console.error("Drug info error:", error)
      return this.getMockDrugInfo(drugName)
    }
  }

  // Fetch from OpenFDA API (only called when external connectivity is available)
  private static async fetchFromOpenFDA(drugName: string): Promise<HealthAPIResponse<DrugInfo>> {
    try {
      // Search for drug in OpenFDA database using brand name first
      const searchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.brand_name:"${drugName}"&limit=1`
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Healthcare-Chatbot/1.0'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })
      
      if (!response.ok) {
        throw new Error(`OpenFDA API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.results || data.results.length === 0) {
        // Try searching by generic name if brand name not found
        const genericSearchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.generic_name:"${drugName}"&limit=1`
        
        const genericResponse = await fetch(genericSearchUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Healthcare-Chatbot/1.0'
          },
          signal: AbortSignal.timeout(10000)
        })
        
        if (!genericResponse.ok) {
          throw new Error(`OpenFDA API error: ${genericResponse.status} ${genericResponse.statusText}`)
        }
        
        const genericData = await genericResponse.json()
        
        if (!genericData.results || genericData.results.length === 0) {
          return {
            success: false,
            error: "Drug not found in FDA database",
          }
        }
        
        return this.formatDrugInfo(genericData.results[0])
      }

      return this.formatDrugInfo(data.results[0])
    } catch (error) {
      return {
        success: false,
        error: `OpenFDA API failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  // Enhanced mock drug data
  private static getMockDrugInfo(drugName: string): HealthAPIResponse<DrugInfo> {
    const mockDrugs: Record<string, DrugInfo> = {
      aspirin: {
        name: "Aspirin",
        genericName: "Acetylsalicylic Acid",
        description: "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. Also used for cardiovascular protection.",
        dosage: "325-650mg every 4 hours, max 4000mg/day. For cardiovascular protection: 75-100mg daily",
        sideEffects: ["Stomach upset", "Nausea", "Heartburn", "Drowsiness", "Ringing in ears", "Easy bruising"],
        interactions: ["Warfarin", "Alcohol", "Ibuprofen", "Blood thinners", "ACE inhibitors", "Diuretics"],
        warnings: ["Do not use in children with viral infections", "May increase bleeding risk", "Avoid if allergic to NSAIDs", "Take with food to reduce stomach upset"],
        manufacturer: "Various manufacturers",
        activeIngredients: ["Acetylsalicylic Acid"],
        pregnancyCategory: "D",
        fdaApprovalDate: "1899-12-30",
        ndcNumber: "Various",
      },
      ibuprofen: {
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        description: "Nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation. Available over-the-counter and by prescription.",
        dosage: "200-400mg every 4-6 hours, max 1200mg/day. Take with food or milk",
        sideEffects: ["Stomach upset", "Dizziness", "Headache", "Nausea", "Constipation", "Diarrhea"],
        interactions: ["Aspirin", "Blood thinners", "ACE inhibitors", "Diuretics", "Lithium", "Methotrexate"],
        warnings: ["Take with food", "Avoid if allergic to NSAIDs", "May increase bleeding risk", "May cause kidney problems"],
        manufacturer: "Various manufacturers",
        activeIngredients: ["Ibuprofen"],
        pregnancyCategory: "B",
        fdaApprovalDate: "1974-01-01",
        ndcNumber: "Various",
      },
      paracetamol: {
        name: "Paracetamol",
        genericName: "Acetaminophen",
        description: "Pain reliever and fever reducer. Safe for most people when used as directed. Does not reduce inflammation.",
        dosage: "500-1000mg every 4-6 hours, max 4000mg/day. Do not exceed recommended dose",
        sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Dark urine", "Yellowing of skin/eyes"],
        interactions: ["Warfarin", "Alcohol", "Phenytoin", "Isoniazid", "Rifampin"],
        warnings: ["Do not exceed recommended dose", "Avoid alcohol", "Consult doctor if pregnant", "May cause liver damage in overdose"],
        manufacturer: "Various manufacturers",
        activeIngredients: ["Acetaminophen"],
        pregnancyCategory: "B",
        fdaApprovalDate: "1951-01-01",
        ndcNumber: "Various",
      },
      tylenol: {
        name: "Tylenol",
        genericName: "Acetaminophen",
        description: "Brand name for acetaminophen. Pain reliever and fever reducer. Safe for most people when used as directed.",
        dosage: "500-1000mg every 4-6 hours, max 4000mg/day. Do not exceed recommended dose",
        sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Dark urine", "Yellowing of skin/eyes"],
        interactions: ["Warfarin", "Alcohol", "Phenytoin", "Isoniazid", "Rifampin"],
        warnings: ["Do not exceed recommended dose", "Avoid alcohol", "Consult doctor if pregnant", "May cause liver damage in overdose"],
        manufacturer: "Johnson & Johnson",
        activeIngredients: ["Acetaminophen"],
        pregnancyCategory: "B",
        fdaApprovalDate: "1955-01-01",
        ndcNumber: "Various",
      },
      advil: {
        name: "Advil",
        genericName: "Ibuprofen",
        description: "Brand name for ibuprofen. Nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation.",
        dosage: "200-400mg every 4-6 hours, max 1200mg/day. Take with food or milk",
        sideEffects: ["Stomach upset", "Dizziness", "Headache", "Nausea", "Constipation", "Diarrhea"],
        interactions: ["Aspirin", "Blood thinners", "ACE inhibitors", "Diuretics", "Lithium", "Methotrexate"],
        warnings: ["Take with food", "Avoid if allergic to NSAIDs", "May increase bleeding risk", "May cause kidney problems"],
        manufacturer: "Pfizer",
        activeIngredients: ["Ibuprofen"],
        pregnancyCategory: "B",
        fdaApprovalDate: "1984-01-01",
        ndcNumber: "Various",
      },
    }

    const drug = mockDrugs[drugName.toLowerCase()]
    if (!drug) {
      return {
        success: false,
        error: "Drug information not found",
      }
    }

    return {
      success: true,
      data: drug,
      source: "Comprehensive Drug Database",
    }
  }

  // Format OpenFDA data to our DrugInfo interface
  private static formatDrugInfo(fdaData: any): HealthAPIResponse<DrugInfo> {
    try {
      const openfda = fdaData.openfda || {}
      const drugInfo: DrugInfo = {
        name: openfda.brand_name?.[0] || openfda.generic_name?.[0] || "Unknown",
        genericName: openfda.generic_name?.[0] || "Unknown",
        description: fdaData.description?.[0] || fdaData.indications_and_usage?.[0] || "No description available",
        dosage: fdaData.dosage_and_administration?.[0] || "Consult healthcare provider",
        sideEffects: fdaData.adverse_reactions?.[0]?.split('\n').filter((s: string) => s.trim()) || [],
        interactions: fdaData.drug_interactions?.[0]?.split('\n').filter((s: string) => s.trim()) || [],
        warnings: fdaData.warnings?.[0]?.split('\n').filter((s: string) => s.trim()) || [],
        manufacturer: openfda.manufacturer_name?.[0] || "Unknown",
        activeIngredients: openfda.substance_name || [],
        drugInteractions: fdaData.drug_interactions?.[0]?.split('\n').filter((s: string) => s.trim()) || [],
        adverseReactions: fdaData.adverse_reactions?.[0]?.split('\n').filter((s: string) => s.trim()) || [],
        pregnancyCategory: fdaData.pregnancy_category?.[0] || "Not specified",
        breastfeeding: fdaData.nursing_mothers?.[0] || "Consult healthcare provider",
        fdaApprovalDate: openfda.marketing_start_date?.[0] || "Unknown",
        ndcNumber: openfda.product_ndc?.[0] || "Unknown",
      }

      return {
        success: true,
        data: drugInfo,
        source: "OpenFDA Database",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to format drug information from FDA data",
      }
    }
  }

  // Get drug recalls and safety alerts with smart fallback
  static async getDrugRecalls(drugName?: string): Promise<HealthAPIResponse<any[]>> {
    try {
      // In development mode or if external APIs are not available, use mock data directly
      if (this.isDevelopmentMode() || !(await this.isExternalAPIAvailable())) {
        console.log(`Using mock data for recalls (development mode or no external API access)`)
        return this.getMockDrugRecalls(drugName)
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchDrugRecallsFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data
      console.log(`OpenFDA API failed, using fallback data for recalls`)
      return this.getMockDrugRecalls(drugName)
    } catch (error) {
      console.error("Drug recalls error:", error)
      return this.getMockDrugRecalls(drugName)
    }
  }

  // Fetch drug recalls from OpenFDA (only called when external connectivity is available)
  private static async fetchDrugRecallsFromOpenFDA(drugName?: string): Promise<HealthAPIResponse<any[]>> {
    try {
      let searchUrl = `${this.BASE_URLS.openfda}/drug/event.json?limit=10`
      
      if (drugName) {
        searchUrl += `&search=patient.drug.medicinalproduct:"${drugName}"`
      }

      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Healthcare-Chatbot/1.0'
        },
        signal: AbortSignal.timeout(10000)
      })
      
      if (!response.ok) {
        throw new Error(`OpenFDA API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        success: true,
        data: data.results || [],
        source: "OpenFDA Drug Events Database",
      }
    } catch (error) {
      return {
        success: false,
        error: `OpenFDA API failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  // Enhanced mock drug recalls data
  private static getMockDrugRecalls(drugName?: string): HealthAPIResponse<any[]> {
    const mockRecalls = [
      {
        report_date: "2024-01-15",
        event_type: "Adverse Event",
        patient: {
          age: 45,
          sex: 1
        },
        reaction: ["Nausea", "Headache", "Dizziness"],
        drug: [{
          medicinalproduct: [drugName || "Unknown Drug"],
          drugdosagetext: ["500mg daily"]
        }]
      },
      {
        report_date: "2024-01-10",
        event_type: "Serious Adverse Event",
        patient: {
          age: 67,
          sex: 2
        },
        reaction: ["Allergic Reaction", "Rash", "Swelling"],
        drug: [{
          medicinalproduct: [drugName || "Unknown Drug"],
          drugdosagetext: ["200mg twice daily"]
        }]
      },
      {
        report_date: "2024-01-05",
        event_type: "Drug Interaction",
        patient: {
          age: 52,
          sex: 1
        },
        reaction: ["Increased bleeding", "Bruising"],
        drug: [{
          medicinalproduct: [drugName || "Unknown Drug"],
          drugdosagetext: ["100mg daily"]
        }]
      }
    ]

    return {
      success: true,
      data: mockRecalls,
      source: "Comprehensive Safety Database",
    }
  }

  // Get drug interactions with smart fallback
  static async getDrugInteractions(drugName: string): Promise<HealthAPIResponse<any[]>> {
    try {
      // In development mode or if external APIs are not available, use mock data directly
      if (this.isDevelopmentMode() || !(await this.isExternalAPIAvailable())) {
        console.log(`Using mock data for interactions (development mode or no external API access)`)
        return this.getMockDrugInteractions(drugName)
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchDrugInteractionsFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data
      console.log(`OpenFDA API failed, using fallback data for interactions`)
      return this.getMockDrugInteractions(drugName)
    } catch (error) {
      console.error("Drug interactions error:", error)
      return this.getMockDrugInteractions(drugName)
    }
  }

  // Fetch drug interactions from OpenFDA (only called when external connectivity is available)
  private static async fetchDrugInteractionsFromOpenFDA(drugName: string): Promise<HealthAPIResponse<any[]>> {
    try {
      const searchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.brand_name:"${drugName}"&limit=1`
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Healthcare-Chatbot/1.0'
        },
        signal: AbortSignal.timeout(10000)
      })
      
      if (!response.ok) {
        throw new Error(`OpenFDA API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.results || data.results.length === 0) {
        return {
          success: false,
          error: "Drug not found in FDA database",
        }
      }

      const interactions = data.results[0].drug_interactions?.[0] || "No interaction data available"
      
      return {
        success: true,
        data: [{
          drug: drugName,
          interactions: interactions.split('\n').filter((s: string) => s.trim()),
          lastUpdated: new Date().toISOString(),
        }],
        source: "OpenFDA Drug Interactions Database",
      }
    } catch (error) {
      return {
        success: false,
        error: `OpenFDA API failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  // Enhanced mock drug interactions data
  private static getMockDrugInteractions(drugName: string): HealthAPIResponse<any[]> {
    const mockInteractions: Record<string, string[]> = {
      aspirin: [
        "Warfarin - May increase bleeding risk significantly",
        "Alcohol - May increase stomach bleeding and liver damage",
        "Ibuprofen - May reduce aspirin's heart benefits",
        "Blood thinners - May increase bleeding risk",
        "ACE inhibitors - May reduce blood pressure control",
        "Diuretics - May reduce effectiveness of both drugs"
      ],
      ibuprofen: [
        "Aspirin - May reduce heart benefits of aspirin",
        "Blood thinners - May increase bleeding risk",
        "ACE inhibitors - May reduce blood pressure control",
        "Diuretics - May reduce effectiveness of both drugs",
        "Lithium - May increase lithium levels in blood",
        "Methotrexate - May increase methotrexate toxicity"
      ],
      paracetamol: [
        "Warfarin - May increase bleeding risk with high doses",
        "Alcohol - May cause severe liver damage",
        "Phenytoin - May increase liver toxicity",
        "Isoniazid - May increase liver damage risk",
        "Rifampin - May increase liver toxicity"
      ],
      tylenol: [
        "Warfarin - May increase bleeding risk with high doses",
        "Alcohol - May cause severe liver damage",
        "Phenytoin - May increase liver toxicity",
        "Isoniazid - May increase liver damage risk",
        "Rifampin - May increase liver toxicity"
      ],
      advil: [
        "Aspirin - May reduce heart benefits of aspirin",
        "Blood thinners - May increase bleeding risk",
        "ACE inhibitors - May reduce blood pressure control",
        "Diuretics - May reduce effectiveness of both drugs",
        "Lithium - May increase lithium levels in blood",
        "Methotrexate - May increase methotrexate toxicity"
      ]
    }

    const interactions = mockInteractions[drugName.toLowerCase()] || [
      "No known significant interactions",
      "Always consult your healthcare provider about drug combinations",
      "Inform your doctor about all medications you're taking"
    ]

    return {
      success: true,
      data: [{
        drug: drugName,
        interactions: interactions,
        lastUpdated: new Date().toISOString(),
      }],
      source: "Comprehensive Drug Interactions Database",
    }
  }

  // Symptom Assessment
  static async assessSymptoms(symptoms: string[]): Promise<HealthAPIResponse<SymptomAssessment>> {
    try {
      // Mock implementation - replace with medical AI API
      const assessment: SymptomAssessment = {
        symptoms,
        possibleConditions: [
          {
            condition: "Common Cold",
            probability: 0.7,
            urgency: "low",
            description: "Viral upper respiratory infection",
          },
          {
            condition: "Influenza",
            probability: 0.3,
            urgency: "medium",
            description: "Viral infection affecting respiratory system",
          },
        ],
        recommendations: [
          "Get plenty of rest",
          "Stay hydrated with fluids",
          "Use over-the-counter pain relievers if needed",
          "Monitor symptoms for worsening",
        ],
        whenToSeekCare: "Seek medical care if symptoms worsen, fever exceeds 103°F, or difficulty breathing occurs",
      }

      // Adjust based on symptoms
      if (symptoms.some((s) => s.toLowerCase().includes("chest pain"))) {
        assessment.possibleConditions = [
          {
            condition: "Cardiac Event",
            probability: 0.8,
            urgency: "emergency",
            description: "Potential heart-related emergency",
          },
        ]
        assessment.whenToSeekCare = "SEEK IMMEDIATE EMERGENCY CARE - Call 911/108"
      }

      return {
        success: true,
        data: assessment,
        source: "Medical AI Assessment",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to assess symptoms",
      }
    }
  }

  // Healthcare Provider Locator
  static async findHealthcareProviders(
    location: string,
    type?: string,
  ): Promise<HealthAPIResponse<HealthcareProvider[]>> {
    try {
      // Mock implementation - replace with Google Places/Healthcare.gov API
      const mockProviders: HealthcareProvider[] = [
        {
          name: "City General Hospital",
          type: "hospital",
          address: "123 Main St, " + location,
          phone: "+1-555-0123",
          distance: 2.5,
          rating: 4.2,
          specialties: ["Emergency Medicine", "Internal Medicine", "Surgery"],
          emergencyServices: true,
        },
        {
          name: "Family Health Clinic",
          type: "clinic",
          address: "456 Oak Ave, " + location,
          phone: "+1-555-0456",
          distance: 1.8,
          rating: 4.5,
          specialties: ["Family Medicine", "Pediatrics"],
          emergencyServices: false,
        },
        {
          name: "24/7 Pharmacy",
          type: "pharmacy",
          address: "789 Pine St, " + location,
          phone: "+1-555-0789",
          distance: 0.5,
          rating: 4.0,
          specialties: ["Prescription Filling", "Vaccinations"],
          emergencyServices: false,
        },
      ]

      const filtered = type ? mockProviders.filter((p) => p.type === type) : mockProviders

      return {
        success: true,
        data: filtered.sort((a, b) => a.distance - b.distance),
        source: "Healthcare Provider Directory",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to find healthcare providers",
      }
    }
  }

  // Outbreak Alerts
  static async getOutbreakAlerts(location?: string): Promise<HealthAPIResponse<OutbreakAlert[]>> {
    try {
      // Mock implementation - replace with WHO/CDC API
      const mockAlerts: OutbreakAlert[] = [
        {
          disease: "Seasonal Influenza",
          location: "Global",
          severity: "medium",
          description: "Increased flu activity reported in multiple regions",
          preventionMeasures: ["Get flu vaccination", "Wash hands frequently", "Avoid close contact with sick people"],
          lastUpdated: new Date().toISOString(),
        },
        {
          disease: "Dengue Fever",
          location: "Southeast Asia",
          severity: "high",
          description: "Dengue outbreak reported in urban areas",
          preventionMeasures: ["Eliminate standing water", "Use mosquito repellent", "Wear long sleeves"],
          lastUpdated: new Date().toISOString(),
        },
      ]

      const filtered = location
        ? mockAlerts.filter((alert) => alert.location.toLowerCase().includes(location.toLowerCase()))
        : mockAlerts

      return {
        success: true,
        data: filtered,
        source: "WHO / CDC Outbreak Surveillance",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch outbreak alerts",
      }
    }
  }

  // Emergency Services
  static async getEmergencyContacts(location: string): Promise<HealthAPIResponse<any>> {
    try {
      const emergencyServices = {
        location,
        contacts: [
          { service: "Emergency Medical", number: "108", description: "Medical emergencies" },
          { service: "Fire Department", number: "101", description: "Fire and rescue" },
          { service: "Police", number: "100", description: "Police emergencies" },
          { service: "Disaster Management", number: "108", description: "Natural disasters" },
        ],
        nearestHospitals: await this.findHealthcareProviders(location, "hospital"),
      }

      return {
        success: true,
        data: emergencyServices,
        source: "Emergency Services Directory",
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch emergency contacts",
      }
    }
  }
}
