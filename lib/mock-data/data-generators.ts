// Data generators for dynamic content
import { 
  DrugInfo, 
  SymptomInfo, 
  VaccinationInfo, 
  ProviderInfo, 
  ConversationData, 
  EmergencyAlert, 
  IntentData 
} from './types'

export class DataGenerators {
  // Generate random drug information
  static generateRandomDrug(): DrugInfo {
    const drugNames = [
      "Acetaminophen", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
      "Lisinopril", "Atorvastatin", "Omeprazole", "Lorazepam", "Tramadol"
    ]
    
    const genericNames = [
      "Acetaminophen", "Ibuprofen", "Acetylsalicylic Acid", "Amoxicillin", "Metformin",
      "Lisinopril", "Atorvastatin", "Omeprazole", "Lorazepam", "Tramadol"
    ]
    
    const descriptions = [
      "Pain reliever and fever reducer",
      "Anti-inflammatory medication",
      "Antibiotic for bacterial infections",
      "Antidiabetic medication",
      "ACE inhibitor for blood pressure",
      "Statin for cholesterol management",
      "Proton pump inhibitor for acid reflux",
      "Anxiolytic medication",
      "Opioid pain medication"
    ]
    
    const sideEffects = [
      "Nausea", "Headache", "Dizziness", "Fatigue", "Stomach upset",
      "Diarrhea", "Constipation", "Rash", "Drowsiness", "Dry mouth"
    ]
    
    const warnings = [
      "Take with food", "Avoid alcohol", "May cause drowsiness", "Monitor blood pressure",
      "Complete full course", "May cause allergic reactions", "Use with caution in elderly"
    ]
    
    const randomName = drugNames[Math.floor(Math.random() * drugNames.length)]
    const randomGeneric = genericNames[Math.floor(Math.random() * genericNames.length)]
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)]
    const randomSideEffects = sideEffects.slice(0, Math.floor(Math.random() * 5) + 3)
    const randomWarnings = warnings.slice(0, Math.floor(Math.random() * 3) + 2)
    
    return {
      name: randomName,
      genericName: randomGeneric,
      description: randomDescription,
      dosage: `${Math.floor(Math.random() * 500) + 100}mg every ${Math.floor(Math.random() * 8) + 4} hours`,
      sideEffects: randomSideEffects,
      interactions: [`${randomName} may interact with other medications`],
      warnings: randomWarnings,
      manufacturer: "Various manufacturers",
      activeIngredient: randomGeneric,
      pregnancyCategory: ["A", "B", "C", "D", "X"][Math.floor(Math.random() * 5)],
      ndcNumber: `${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}`,
      fdaApprovalDate: `${Math.floor(Math.random() * 30) + 1970}-01-01`,
      breastfeedingInfo: "Consult healthcare provider"
    }
  }
  
  // Generate random symptom information
  static generateRandomSymptom(): SymptomInfo {
    const symptoms = [
      "Fever", "Headache", "Nausea", "Dizziness", "Fatigue", "Cough",
      "Shortness of breath", "Chest pain", "Abdominal pain", "Rash"
    ]
    
    const severities = ["mild", "moderate", "severe"] as const
    const categories = ["General", "Cardiovascular", "Respiratory", "Digestive", "Neurological", "Dermatological"]
    
    const relatedSymptoms = [
      "Chills", "Sweating", "Body aches", "Weakness", "Loss of appetite",
      "Vomiting", "Diarrhea", "Constipation", "Bloating", "Gas"
    ]
    
    const recommendations = [
      "Rest and stay hydrated", "Apply cold compress", "Take over-the-counter medication",
      "Seek medical attention if severe", "Monitor symptoms", "Avoid triggers"
    ]
    
    const randomSymptom = symptoms[Math.floor(Math.random() * symptoms.length)]
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomRelated = relatedSymptoms.slice(0, Math.floor(Math.random() * 4) + 2)
    const randomRecommendations = recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
    
    return {
      name: randomSymptom,
      description: `Description of ${randomSymptom.toLowerCase()} symptoms`,
      severity: randomSeverity,
      category: randomCategory,
      relatedSymptoms: randomRelated,
      recommendations: randomRecommendations,
      emergency: randomSeverity === "severe"
    }
  }
  
  // Generate random vaccination information
  static generateRandomVaccination(): VaccinationInfo {
    const vaccines = [
      "COVID-19", "Influenza", "Hepatitis B", "MMR", "DTaP", "HPV",
      "Pneumococcal", "Meningococcal", "Varicella", "Hepatitis A"
    ]
    
    const ageGroups = [
      "6 months+ years", "12+ years", "All ages", "2 months-6 years",
      "11-12 years", "Adults 65+", "Pregnant women"
    ]
    
    const schedules = [
      "Single dose", "2 doses, 4 weeks apart", "3 doses: 0, 1, and 6 months",
      "Annual vaccination", "2 doses: 0 and 6 months", "3 doses: 0, 1-2, and 6 months"
    ]
    
    const sideEffects = [
      "Pain at injection site", "Mild fever", "Fatigue", "Headache", "Muscle aches",
      "Redness", "Swelling", "Chills", "Nausea", "Dizziness"
    ]
    
    const contraindications = [
      "Severe allergic reaction to previous dose", "Known allergy to vaccine components",
      "Pregnancy", "Severe immunodeficiency", "Active infection"
    ]
    
    const randomVaccine = vaccines[Math.floor(Math.random() * vaccines.length)]
    const randomAgeGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)]
    const randomSchedule = schedules[Math.floor(Math.random() * schedules.length)]
    const randomSideEffects = sideEffects.slice(0, Math.floor(Math.random() * 5) + 3)
    const randomContraindications = contraindications.slice(0, Math.floor(Math.random() * 3) + 2)
    
    return {
      name: randomVaccine,
      description: `Protects against ${randomVaccine.toLowerCase()} infection`,
      ageGroups: [randomAgeGroup],
      schedule: randomSchedule,
      sideEffects: randomSideEffects,
      contraindications: randomContraindications,
      effectiveness: `${Math.floor(Math.random() * 40) + 60}% effective`,
      manufacturer: "Various manufacturers"
    }
  }
  
  // Generate random healthcare provider
  static generateRandomProvider(): ProviderInfo {
    const names = [
      "City General Hospital", "Metro Medical Center", "Community Health Clinic",
      "Downtown Pharmacy", "Emergency Care Center", "Family Medical Group",
      "Specialty Care Center", "Urgent Care Plus", "Regional Medical Center"
    ]
    
    const types = ["hospital", "clinic", "pharmacy", "emergency"] as const
    const specialties = [
      "Emergency Medicine", "Family Medicine", "Internal Medicine", "Pediatrics",
      "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Prescription Filling"
    ]
    
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"]
    const states = ["NY", "CA", "IL", "TX", "AZ", "PA"]
    
    const services = [
      "Emergency Care", "General Practice", "Prescription Filling", "Vaccinations",
      "Health Screenings", "Surgery", "Specialty Care", "Urgent Care"
    ]
    
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)]
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const randomState = states[Math.floor(Math.random() * states.length)]
    const randomServices = services.slice(0, Math.floor(Math.random() * 4) + 3)
    
    return {
      id: `provider_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: randomName,
      type: randomType,
      specialty: randomSpecialty,
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, ${randomCity}, ${randomState} ${Math.floor(Math.random() * 90000) + 10000}`,
      phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `info@${randomName.toLowerCase().replace(/\s+/g, '')}.com`,
      rating: Math.random() * 2 + 3, // 3-5 rating
      distance: Math.random() * 10, // 0-10 miles
      availability: randomType === "hospital" || randomType === "emergency" ? "24/7" : "Mon-Fri 8AM-6PM",
      services: randomServices
    }
  }
  
  // Generate random conversation
  static generateRandomConversation(): ConversationData {
    const channels = ["whatsapp", "sms", "web"] as const
    const languages = ["en", "hi", "es", "ar", "fr", "de"]
    const intents = [
      "symptoms_fever", "drug_info", "vaccination", "emergency", "appointment",
      "symptoms_headache", "drug_interactions", "provider_search", "symptoms_cough"
    ]
    const statuses = ["active", "resolved", "cancelled", "escalated"] as const
    
    const userMessages = [
      "I have a fever", "Tell me about aspirin", "I need a doctor", "I have chest pain",
      "What vaccines do I need?", "I can't breathe", "I have a headache", "Find a pharmacy near me"
    ]
    
    const botMessages = [
      "I understand you're experiencing symptoms. Let me help you.",
      "I can help you with that information.",
      "I'll search for healthcare providers in your area.",
      "This sounds like a medical emergency. Please call 911."
    ]
    
    const randomChannel = channels[Math.floor(Math.random() * channels.length)]
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)]
    const randomIntent = intents[Math.floor(Math.random() * intents.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const randomUserMessage = userMessages[Math.floor(Math.random() * userMessages.length)]
    const randomBotMessage = botMessages[Math.floor(Math.random() * botMessages.length)]
    
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`
    const messageCount = Math.floor(Math.random() * 6) + 2 // 2-8 messages
    
    const messages = []
    for (let i = 0; i < messageCount; i++) {
      const isUser = i % 2 === 0
      messages.push({
        id: `msg_${conversationId}_${i}`,
        content: isUser ? randomUserMessage : randomBotMessage,
        sender: isUser ? "user" : "bot",
        timestamp: new Date(Date.now() - (messageCount - i) * 30000).toISOString(),
        status: "delivered" as const,
        language: randomLanguage,
        intent: isUser ? randomIntent : undefined,
        confidence: isUser ? undefined : Math.random() * 0.3 + 0.7 // 0.7-1.0
      })
    }
    
    return {
      id: conversationId,
      userId: userId,
      channel: randomChannel,
      language: randomLanguage,
      messages: messages,
      intent: randomIntent,
      status: randomStatus,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      updatedAt: new Date().toISOString(),
      duration: Math.floor(Math.random() * 1800), // 0-30 minutes
      satisfaction: Math.random() * 2 + 3 // 3-5 rating
    }
  }
  
  // Generate random emergency alert
  static generateRandomEmergencyAlert(): EmergencyAlert {
    const severities = ["low", "medium", "high", "critical"] as const
    const statuses = ["active", "resolved", "cancelled"] as const
    const locations = [
      "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
      "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA"
    ]
    
    const alertTypes = [
      "Severe Weather Warning", "Air Quality Alert", "Flash Flood Watch",
      "Heat Advisory", "Winter Storm Warning", "Tornado Watch", "Earthquake Alert"
    ]
    
    const recommendations = [
      "Stay indoors", "Avoid outdoor activities", "Have emergency supplies ready",
      "Monitor local weather updates", "Follow local authorities", "Stay informed"
    ]
    
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    const randomAlertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    const randomRecommendations = recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
    
    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: randomAlertType,
      message: `A ${randomSeverity} priority ${randomAlertType.toLowerCase()} has been issued for ${randomLocation}. Please take appropriate action.`,
      severity: randomSeverity,
      location: randomLocation,
      timestamp: new Date().toISOString(),
      status: randomStatus,
      affectedAreas: [randomLocation.split(',')[0]], // Just the city
      recommendations: randomRecommendations
    }
  }
  
  // Generate random intent
  static generateRandomIntent(): IntentData {
    const intentNames = [
      "symptoms_fever", "drug_info", "vaccination", "emergency", "appointment",
      "symptoms_headache", "drug_interactions", "provider_search", "symptoms_cough",
      "vaccination_schedule", "symptoms_nausea", "medication_reminder"
    ]
    
    const categories = ["symptoms", "medication", "prevention", "emergency", "appointment", "provider"]
    const languages = ["en", "hi", "es", "ar", "fr", "de"]
    
    const examples = [
      "I have a fever", "Tell me about aspirin", "I need a doctor", "I have chest pain",
      "What vaccines do I need?", "I can't breathe", "I have a headache", "Find a pharmacy"
    ]
    
    const responses = [
      "I understand you're experiencing symptoms. Let me help you.",
      "I can help you with that information.",
      "I'll search for healthcare providers in your area.",
      "This sounds like a medical emergency. Please call 911."
    ]
    
    const randomIntentName = intentNames[Math.floor(Math.random() * intentNames.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)]
    const randomExamples = examples.slice(0, Math.floor(Math.random() * 4) + 2)
    const randomResponses = responses.slice(0, Math.floor(Math.random() * 3) + 2)
    
    return {
      id: `intent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: randomIntentName,
      description: `User intent for ${randomIntentName.replace('_', ' ')}`,
      examples: randomExamples,
      responses: randomResponses,
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
      language: randomLanguage,
      category: randomCategory,
      active: Math.random() > 0.1, // 90% active
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
      updatedAt: new Date().toISOString()
    }
  }
  
  // Generate multiple random items
  static generateMultipleDrugs(count: number): DrugInfo[] {
    return Array.from({ length: count }, () => this.generateRandomDrug())
  }
  
  static generateMultipleSymptoms(count: number): SymptomInfo[] {
    return Array.from({ length: count }, () => this.generateRandomSymptom())
  }
  
  static generateMultipleVaccinations(count: number): VaccinationInfo[] {
    return Array.from({ length: count }, () => this.generateRandomVaccination())
  }
  
  static generateMultipleProviders(count: number): ProviderInfo[] {
    return Array.from({ length: count }, () => this.generateRandomProvider())
  }
  
  static generateMultipleConversations(count: number): ConversationData[] {
    return Array.from({ length: count }, () => this.generateRandomConversation())
  }
  
  static generateMultipleEmergencyAlerts(count: number): EmergencyAlert[] {
    return Array.from({ length: count }, () => this.generateRandomEmergencyAlert())
  }
  
  static generateMultipleIntents(count: number): IntentData[] {
    return Array.from({ length: count }, () => this.generateRandomIntent())
  }
  
  // Generate realistic conversation flow
  static generateConversationFlow(intent: string, language: string = "en"): ConversationData {
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`
    
    const conversationTemplates = {
      symptoms_fever: {
        user: ["I have a fever", "Since yesterday", "101.5°F", "Yes, I have a headache too"],
        bot: [
          "I understand you're experiencing fever. How long have you had this fever?",
          "What's your current temperature reading?",
          "Do you have any other symptoms?",
          "Based on your symptoms, I recommend rest and monitoring. If your fever persists or worsens, please see a doctor."
        ]
      },
      drug_info: {
        user: ["Tell me about aspirin", "What are the side effects?", "Can I take it with other medications?"],
        bot: [
          "I can help you with aspirin information. What would you like to know?",
          "Common side effects include stomach upset, nausea, and heartburn.",
          "Aspirin may interact with blood thinners and other medications. Please consult your doctor."
        ]
      },
      emergency: {
        user: ["I have chest pain", "I can't breathe", "I'm calling 911"],
        bot: [
          "This is a medical emergency. Please call 911 immediately.",
          "Stay calm and try to sit upright. Help is on the way.",
          "Good. Stay on the line with 911. I'm here if you need additional information."
        ]
      }
    }
    
    const template = conversationTemplates[intent as keyof typeof conversationTemplates] || conversationTemplates.symptoms_fever
    const messages = []
    
    for (let i = 0; i < template.user.length; i++) {
      messages.push({
        id: `msg_${conversationId}_${i * 2}`,
        content: template.user[i],
        sender: "user" as const,
        timestamp: new Date(Date.now() - (template.user.length - i) * 30000).toISOString(),
        status: "delivered" as const,
        language: language,
        intent: intent
      })
      
      if (i < template.bot.length) {
        messages.push({
          id: `msg_${conversationId}_${i * 2 + 1}`,
          content: template.bot[i],
          sender: "bot" as const,
          timestamp: new Date(Date.now() - (template.user.length - i) * 30000 + 15000).toISOString(),
          status: "delivered" as const,
          language: language,
          intent: intent,
          confidence: Math.random() * 0.3 + 0.7
        })
      }
    }
    
    return {
      id: conversationId,
      userId: userId,
      channel: "web" as const,
      language: language,
      messages: messages,
      intent: intent,
      status: "resolved" as const,
      createdAt: new Date(Date.now() - messages.length * 30000).toISOString(),
      updatedAt: new Date().toISOString(),
      duration: messages.length * 30,
      satisfaction: Math.random() * 2 + 3
    }
  }
} 