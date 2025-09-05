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

import { mockDrugs, mockDrugRecalls, mockDrugInteractions } from './mock-data/drug-data';
import { mockSymptoms, mockSymptomAssessments } from './mock-data/symptom-data';
import { mockVaccinations } from './mock-data/vaccination-data';
import { mockProviders } from './mock-data/provider-data';
import { mockOutbreaks } from './mock-data/outbreak-data';
import { mockEmergencyAlerts } from './mock-data/emergency-alerts-data';

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
  static async getVaccinationInfo(vaccineName: string, ageGroup?: string): Promise<HealthAPIResponse<VaccinationInfo[]>> {
    try {
      const filteredVaccinations = mockVaccinations.filter(
        (v) =>
          v.name.toLowerCase().includes(vaccineName.toLowerCase()) &&
          (!ageGroup || v.ageGroups.some((ag) => ag.toLowerCase().includes(ageGroup.toLowerCase())))
      );

      if (filteredVaccinations.length > 0) {
        // The interface `VaccinationInfo` in `lib/health-apis.ts` is slightly different from `mockVaccinations`
        // I'll map the mock data to fit the `HealthAPIService`'s `VaccinationInfo` interface.
        const formattedVaccinations = filteredVaccinations.map(v => ({
          vaccine: v.name,
          ageGroup: v.ageGroups.join(', '), // Combine age groups into a single string
          schedule: v.schedule.split('. '), // Split schedule into an array of strings
          description: v.description,
          sideEffects: v.sideEffects,
          contraindications: v.contraindications,
        }));
        return { success: true, data: formattedVaccinations, source: "Mock Vaccination Data" };
      } else {
        return { success: false, error: "Vaccination information not found in mock data." };
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
        // Use imported mockDrugs directly
        const drug = mockDrugs.find(d => d.name.toLowerCase() === drugName.toLowerCase() || d.genericName.toLowerCase() === drugName.toLowerCase());
        if (drug) {
          return { success: true, data: drug, source: "Mock Drug Data" };
        } else {
          return { success: false, error: "Drug information not found in mock data." };
        }
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data if OpenFDA fails
      console.log(`OpenFDA API failed, using fallback data for: ${drugName}`)
      // Use imported mockDrugs directly as fallback
      const drug = mockDrugs.find(d => d.name.toLowerCase() === drugName.toLowerCase() || d.genericName.toLowerCase() === drugName.toLowerCase());
      if (drug) {
        return { success: true, data: drug, source: "Mock Drug Data Fallback" };
      } else {
        return { success: false, error: "Drug information not found in mock data." };
      }
    } catch (error) {
      console.error("Drug info error:", error)
      // Use imported mockDrugs directly as error fallback
      const drug = mockDrugs.find(d => d.name.toLowerCase() === drugName.toLowerCase() || d.genericName.toLowerCase() === drugName.toLowerCase());
      if (drug) {
        return { success: true, data: drug, source: "Mock Drug Data Error Fallback" };
      } else {
        return { success: false, error: "Drug information not found in mock data." };
      }
    }
  }

  // Fetch from OpenFDA API (only called when external connectivity is available)
  private static async fetchFromOpenFDA(drugName: string): Promise<HealthAPIResponse<DrugInfo>> {
    try {
      // Search for drug in OpenFDA database using brand name first
      const searchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.brand_name:\"${drugName}\"&limit=1`
      
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
        const genericSearchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.generic_name:\"${drugName}\"&limit=1`
        
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
        // Use imported mockDrugRecalls directly
        if (drugName) {
          const filteredRecalls = mockDrugRecalls.filter(recall => recall.drugName.toLowerCase().includes(drugName.toLowerCase()));
          return { success: true, data: filteredRecalls, source: "Mock Drug Recalls Data" };
        } else {
          return { success: true, data: mockDrugRecalls, source: "Mock Drug Recalls Data" };
        }
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchDrugRecallsFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data
      console.log(`OpenFDA API failed, using fallback data for recalls`)
      // Use imported mockDrugRecalls directly as fallback
      if (drugName) {
        const filteredRecalls = mockDrugRecalls.filter(recall => recall.drugName.toLowerCase().includes(drugName.toLowerCase()));
        return { success: true, data: filteredRecalls, source: "Mock Drug Recalls Data Fallback" };
      } else {
        return { success: true, data: mockDrugRecalls, source: "Mock Drug Recalls Data Fallback" };
      }
    } catch (error) {
      console.error("Drug recalls error:", error)
      // Use imported mockDrugRecalls directly as error fallback
      if (drugName) {
        const filteredRecalls = mockDrugRecalls.filter(recall => recall.drugName.toLowerCase().includes(drugName.toLowerCase()));
        return { success: true, data: filteredRecalls, source: "Mock Drug Recalls Data Error Fallback" };
      } else {
        return { success: true, data: mockDrugRecalls, source: "Mock Drug Recalls Data Error Fallback" };
      }
    }
  }

  // Fetch drug recalls from OpenFDA (only called when external connectivity is available)
  private static async fetchDrugRecallsFromOpenFDA(drugName?: string): Promise<HealthAPIResponse<any[]>> {
    try {
      let searchUrl = `${this.BASE_URLS.openfda}/drug/event.json?limit=10`
      
      if (drugName) {
        searchUrl += `&search=patient.drug.medicinalproduct:\"${drugName}\"`
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

  // Get drug interactions with smart fallback
  static async getDrugInteractions(drugName: string): Promise<HealthAPIResponse<any[]>> {
    try {
      // In development mode or if external APIs are not available, use mock data directly
      if (this.isDevelopmentMode() || !(await this.isExternalAPIAvailable())) {
        console.log(`Using mock data for interactions (development mode or no external API access)`)
        // Use imported mockDrugInteractions directly
        const interactions = mockDrugInteractions.filter(i => i.drug1.toLowerCase() === drugName.toLowerCase() || i.drug2.toLowerCase() === drugName.toLowerCase());
        if (interactions.length > 0) {
          return { success: true, data: interactions, source: "Mock Drug Interactions Data" };
        } else {
          return { success: false, error: "Drug interactions not found in mock data." };
        }
      }

      // Try OpenFDA API only if we have external connectivity
      const openfdaResult = await this.fetchDrugInteractionsFromOpenFDA(drugName)
      if (openfdaResult.success) {
        return openfdaResult
      }

      // Fallback to mock data
      console.log(`OpenFDA API failed, using fallback data for interactions`)
      // Use imported mockDrugInteractions directly as fallback
      const interactions = mockDrugInteractions.filter(i => i.drug1.toLowerCase() === drugName.toLowerCase() || i.drug2.toLowerCase() === drugName.toLowerCase());
      if (interactions.length > 0) {
        return { success: true, data: interactions, source: "Mock Drug Interactions Data Fallback" };
      } else {
        return { success: false, error: "Drug interactions not found in mock data." };
      }
    } catch (error) {
      console.error("Drug interactions error:", error)
      // Use imported mockDrugInteractions directly as error fallback
      const interactions = mockDrugInteractions.filter(i => i.drug1.toLowerCase() === drugName.toLowerCase() || i.drug2.toLowerCase() === drugName.toLowerCase());
      if (interactions.length > 0) {
        return { success: true, data: interactions, source: "Mock Drug Interactions Data Error Fallback" };
      } else {
        return { success: false, error: "Drug interactions not found in mock data." };
      }
    }
  }

  // Fetch drug interactions from OpenFDA (only called when external connectivity is available)
  private static async fetchDrugInteractionsFromOpenFDA(drugName: string): Promise<HealthAPIResponse<any[]>> {
    try {
      const searchUrl = `${this.BASE_URLS.openfda}/drug/label.json?search=openfda.brand_name:\"${drugName}\"&limit=1`
      
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

  // Symptom Assessment
  static async assessSymptoms(symptoms: string[]): Promise<HealthAPIResponse<SymptomAssessment>> {
    try {
      const filteredSymptoms = mockSymptoms.filter(s => symptoms.some(sym => sym.toLowerCase().includes(s.name.toLowerCase())));
      const filteredAssessments = mockSymptomAssessments.filter(a => a.symptoms.some(sym => sym.toLowerCase().includes(symptoms[0].toLowerCase())));

      if (filteredSymptoms.length > 0 && filteredAssessments.length > 0) {
        const assessment = filteredAssessments[0];
        return { success: true, data: assessment, source: "Mock Symptom Assessment Data" };
      } else {
        return { success: false, error: "Symptom assessment not found in mock data." };
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
      const filteredProviders = mockProviders.filter(p => p.address.toLowerCase().includes(location.toLowerCase()));
      if (type) {
        filteredProviders = filteredProviders.filter(p => p.type.toLowerCase().includes(type.toLowerCase()));
      }

      if (filteredProviders.length > 0) {
        return { success: true, data: filteredProviders, source: "Mock Healthcare Providers Data" };
      } else {
        return { success: false, error: "Healthcare providers not found in mock data." };
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
      const filteredOutbreaks = mockOutbreaks.filter(o => !location || o.location.toLowerCase().includes(location.toLowerCase()));
      if (filteredOutbreaks.length > 0) {
        return { success: true, data: filteredOutbreaks, source: "Mock Outbreak Alerts Data" };
      } else {
        return { success: false, error: "Outbreak alerts not found in mock data." };
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
      const filteredAlerts = mockEmergencyAlerts.filter(a => a.location.toLowerCase().includes(location.toLowerCase()));
      if (filteredAlerts.length > 0) {
        return { success: true, data: filteredAlerts, source: "Mock Emergency Alerts Data" };
      } else {
        return { success: false, error: "Emergency contacts not found in mock data." };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch emergency contacts",
      }
    }
  }
}
