// Data validation utilities
import { 
  DrugInfo, 
  SymptomInfo, 
  VaccinationInfo, 
  ProviderInfo, 
  ConversationData, 
  EmergencyAlert, 
  IntentData 
} from './types'

export class DataValidators {
  // Validate drug information
  static validateDrug(drug: Partial<DrugInfo>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!drug.name || drug.name.trim().length === 0) {
      errors.push("Drug name is required")
    }
    
    if (!drug.genericName || drug.genericName.trim().length === 0) {
      errors.push("Generic name is required")
    }
    
    if (!drug.description || drug.description.trim().length === 0) {
      errors.push("Description is required")
    }
    
    if (!drug.dosage || drug.dosage.trim().length === 0) {
      errors.push("Dosage information is required")
    }
    
    if (!drug.sideEffects || !Array.isArray(drug.sideEffects) || drug.sideEffects.length === 0) {
      errors.push("Side effects list is required")
    }
    
    if (!drug.warnings || !Array.isArray(drug.warnings) || drug.warnings.length === 0) {
      errors.push("Warnings list is required")
    }
    
    if (drug.pregnancyCategory && !["A", "B", "C", "D", "X"].includes(drug.pregnancyCategory)) {
      errors.push("Pregnancy category must be A, B, C, D, or X")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate symptom information
  static validateSymptom(symptom: Partial<SymptomInfo>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!symptom.name || symptom.name.trim().length === 0) {
      errors.push("Symptom name is required")
    }
    
    if (!symptom.description || symptom.description.trim().length === 0) {
      errors.push("Description is required")
    }
    
    if (!symptom.severity || !["mild", "moderate", "severe"].includes(symptom.severity)) {
      errors.push("Severity must be mild, moderate, or severe")
    }
    
    if (!symptom.category || symptom.category.trim().length === 0) {
      errors.push("Category is required")
    }
    
    if (!symptom.relatedSymptoms || !Array.isArray(symptom.relatedSymptoms)) {
      errors.push("Related symptoms must be an array")
    }
    
    if (!symptom.recommendations || !Array.isArray(symptom.recommendations) || symptom.recommendations.length === 0) {
      errors.push("Recommendations list is required")
    }
    
    if (typeof symptom.emergency !== "boolean") {
      errors.push("Emergency flag must be a boolean")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate vaccination information
  static validateVaccination(vaccination: Partial<VaccinationInfo>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!vaccination.name || vaccination.name.trim().length === 0) {
      errors.push("Vaccination name is required")
    }
    
    if (!vaccination.description || vaccination.description.trim().length === 0) {
      errors.push("Description is required")
    }
    
    if (!vaccination.ageGroups || !Array.isArray(vaccination.ageGroups) || vaccination.ageGroups.length === 0) {
      errors.push("Age groups list is required")
    }
    
    if (!vaccination.schedule || vaccination.schedule.trim().length === 0) {
      errors.push("Schedule information is required")
    }
    
    if (!vaccination.sideEffects || !Array.isArray(vaccination.sideEffects)) {
      errors.push("Side effects must be an array")
    }
    
    if (!vaccination.contraindications || !Array.isArray(vaccination.contraindications)) {
      errors.push("Contraindications must be an array")
    }
    
    if (!vaccination.effectiveness || vaccination.effectiveness.trim().length === 0) {
      errors.push("Effectiveness information is required")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate healthcare provider
  static validateProvider(provider: Partial<ProviderInfo>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!provider.id || provider.id.trim().length === 0) {
      errors.push("Provider ID is required")
    }
    
    if (!provider.name || provider.name.trim().length === 0) {
      errors.push("Provider name is required")
    }
    
    if (!provider.type || !["hospital", "clinic", "pharmacy", "emergency"].includes(provider.type)) {
      errors.push("Type must be hospital, clinic, pharmacy, or emergency")
    }
    
    if (!provider.specialty || provider.specialty.trim().length === 0) {
      errors.push("Specialty is required")
    }
    
    if (!provider.address || provider.address.trim().length === 0) {
      errors.push("Address is required")
    }
    
    if (!provider.phone || provider.phone.trim().length === 0) {
      errors.push("Phone number is required")
    }
    
    if (!provider.email || provider.email.trim().length === 0) {
      errors.push("Email is required")
    }
    
    if (typeof provider.rating !== "number" || provider.rating < 0 || provider.rating > 5) {
      errors.push("Rating must be a number between 0 and 5")
    }
    
    if (typeof provider.distance !== "number" || provider.distance < 0) {
      errors.push("Distance must be a positive number")
    }
    
    if (!provider.availability || provider.availability.trim().length === 0) {
      errors.push("Availability information is required")
    }
    
    if (!provider.services || !Array.isArray(provider.services) || provider.services.length === 0) {
      errors.push("Services list is required")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate conversation data
  static validateConversation(conversation: Partial<ConversationData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!conversation.id || conversation.id.trim().length === 0) {
      errors.push("Conversation ID is required")
    }
    
    if (!conversation.userId || conversation.userId.trim().length === 0) {
      errors.push("User ID is required")
    }
    
    if (!conversation.channel || !["whatsapp", "sms", "web"].includes(conversation.channel)) {
      errors.push("Channel must be whatsapp, sms, or web")
    }
    
    if (!conversation.language || conversation.language.trim().length === 0) {
      errors.push("Language is required")
    }
    
    if (!conversation.messages || !Array.isArray(conversation.messages)) {
      errors.push("Messages must be an array")
    }
    
    if (!conversation.intent || conversation.intent.trim().length === 0) {
      errors.push("Intent is required")
    }
    
    if (!conversation.status || !["active", "resolved", "cancelled", "escalated"].includes(conversation.status)) {
      errors.push("Status must be active, resolved, cancelled, or escalated")
    }
    
    if (!conversation.createdAt || isNaN(Date.parse(conversation.createdAt))) {
      errors.push("Valid creation date is required")
    }
    
    if (!conversation.updatedAt || isNaN(Date.parse(conversation.updatedAt))) {
      errors.push("Valid update date is required")
    }
    
    if (typeof conversation.duration !== "number" || conversation.duration < 0) {
      errors.push("Duration must be a positive number")
    }
    
    if (typeof conversation.satisfaction !== "number" || conversation.satisfaction < 0 || conversation.satisfaction > 5) {
      errors.push("Satisfaction must be a number between 0 and 5")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate emergency alert
  static validateEmergencyAlert(alert: Partial<EmergencyAlert>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!alert.id || alert.id.trim().length === 0) {
      errors.push("Alert ID is required")
    }
    
    if (!alert.title || alert.title.trim().length === 0) {
      errors.push("Title is required")
    }
    
    if (!alert.message || alert.message.trim().length === 0) {
      errors.push("Message is required")
    }
    
    if (!alert.severity || !["low", "medium", "high", "critical"].includes(alert.severity)) {
      errors.push("Severity must be low, medium, high, or critical")
    }
    
    if (!alert.location || alert.location.trim().length === 0) {
      errors.push("Location is required")
    }
    
    if (!alert.timestamp || isNaN(Date.parse(alert.timestamp))) {
      errors.push("Valid timestamp is required")
    }
    
    if (!alert.status || !["active", "resolved", "cancelled"].includes(alert.status)) {
      errors.push("Status must be active, resolved, or cancelled")
    }
    
    if (!alert.affectedAreas || !Array.isArray(alert.affectedAreas)) {
      errors.push("Affected areas must be an array")
    }
    
    if (!alert.recommendations || !Array.isArray(alert.recommendations)) {
      errors.push("Recommendations must be an array")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate intent data
  static validateIntent(intent: Partial<IntentData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!intent.id || intent.id.trim().length === 0) {
      errors.push("Intent ID is required")
    }
    
    if (!intent.name || intent.name.trim().length === 0) {
      errors.push("Intent name is required")
    }
    
    if (!intent.description || intent.description.trim().length === 0) {
      errors.push("Description is required")
    }
    
    if (!intent.examples || !Array.isArray(intent.examples) || intent.examples.length === 0) {
      errors.push("Examples list is required")
    }
    
    if (!intent.responses || !Array.isArray(intent.responses) || intent.responses.length === 0) {
      errors.push("Responses list is required")
    }
    
    if (typeof intent.confidence !== "number" || intent.confidence < 0 || intent.confidence > 1) {
      errors.push("Confidence must be a number between 0 and 1")
    }
    
    if (!intent.language || intent.language.trim().length === 0) {
      errors.push("Language is required")
    }
    
    if (!intent.category || intent.category.trim().length === 0) {
      errors.push("Category is required")
    }
    
    if (typeof intent.active !== "boolean") {
      errors.push("Active flag must be a boolean")
    }
    
    if (!intent.createdAt || isNaN(Date.parse(intent.createdAt))) {
      errors.push("Valid creation date is required")
    }
    
    if (!intent.updatedAt || isNaN(Date.parse(intent.updatedAt))) {
      errors.push("Valid update date is required")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Validate multiple items
  static validateMultipleDrugs(drugs: Partial<DrugInfo>[]): { valid: DrugInfo[]; invalid: { item: Partial<DrugInfo>; errors: string[] }[] } {
    const valid: DrugInfo[] = []
    const invalid: { item: Partial<DrugInfo>; errors: string[] }[] = []
    
    drugs.forEach(drug => {
      const validation = this.validateDrug(drug)
      if (validation.isValid) {
        valid.push(drug as DrugInfo)
      } else {
        invalid.push({ item: drug, errors: validation.errors })
      }
    })
    
    return { valid, invalid }
  }
  
  static validateMultipleSymptoms(symptoms: Partial<SymptomInfo>[]): { valid: SymptomInfo[]; invalid: { item: Partial<SymptomInfo>; errors: string[] }[] } {
    const valid: SymptomInfo[] = []
    const invalid: { item: Partial<SymptomInfo>; errors: string[] }[] = []
    
    symptoms.forEach(symptom => {
      const validation = this.validateSymptom(symptom)
      if (validation.isValid) {
        valid.push(symptom as SymptomInfo)
      } else {
        invalid.push({ item: symptom, errors: validation.errors })
      }
    })
    
    return { valid, invalid }
  }
  
  // Sanitize data
  static sanitizeDrug(drug: Partial<DrugInfo>): Partial<DrugInfo> {
    return {
      ...drug,
      name: drug.name?.trim(),
      genericName: drug.genericName?.trim(),
      description: drug.description?.trim(),
      dosage: drug.dosage?.trim(),
      manufacturer: drug.manufacturer?.trim(),
      activeIngredient: drug.activeIngredient?.trim(),
      ndcNumber: drug.ndcNumber?.trim(),
      fdaApprovalDate: drug.fdaApprovalDate?.trim(),
      breastfeedingInfo: drug.breastfeedingInfo?.trim()
    }
  }
  
  static sanitizeSymptom(symptom: Partial<SymptomInfo>): Partial<SymptomInfo> {
    return {
      ...symptom,
      name: symptom.name?.trim(),
      description: symptom.description?.trim(),
      category: symptom.category?.trim()
    }
  }
  
  static sanitizeProvider(provider: Partial<ProviderInfo>): Partial<ProviderInfo> {
    return {
      ...provider,
      id: provider.id?.trim(),
      name: provider.name?.trim(),
      specialty: provider.specialty?.trim(),
      address: provider.address?.trim(),
      phone: provider.phone?.trim(),
      email: provider.email?.trim(),
      availability: provider.availability?.trim()
    }
  }
} 