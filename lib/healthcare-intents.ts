export interface HealthcareIntent {
  name: string
  keywords: string[]
  entities?: string[]
  priority: number
  requiresUrgency?: boolean
}

export interface MedicalEntity {
  type: "symptom" | "body_part" | "medication" | "condition" | "age_group" | "severity" | "drug_name"
  value: string
  confidence: number
}

export interface HealthcareResponse {
  intent: string
  response: string
  followUpQuestions?: string[]
  urgencyLevel: "low" | "medium" | "high" | "emergency"
  recommendedActions?: string[]
  disclaimers?: string[]
  drugInfo?: any
  drugRecalls?: any[]
  drugInteractions?: any[]
}

export const healthcareIntents: HealthcareIntent[] = [
  {
    name: "emergency",
    keywords: [
      "emergency",
      "urgent",
      "help",
      "ambulance",
      "911",
      "108",
      "chest pain",
      "heart attack",
      "stroke",
      "bleeding",
      "unconscious",
      "difficulty breathing",
      "severe pain",
      "poisoning",
    ],
    priority: 1,
    requiresUrgency: true,
  },
  {
    name: "drug_info",
    keywords: [
      "drug information",
      "medicine info",
      "drug details",
      "medication details",
      "drug facts",
      "medicine facts",
      "drug data",
      "medication data",
      "drug database",
      "medicine database",
      "drug lookup",
      "medicine lookup",
      "what is",
      "tell me about",
      "drug name",
      "medicine name",
    ],
    entities: ["drug_name", "medication"],
    priority: 2,
  },
  {
    name: "drug_interactions",
    keywords: [
      "drug interactions",
      "medicine interactions",
      "medication interactions",
      "drug conflicts",
      "medicine conflicts",
      "drug combinations",
      "medicine combinations",
      "can I take",
      "mixing drugs",
      "drug safety",
      "medicine safety",
    ],
    entities: ["drug_name", "medication"],
    priority: 2,
  },
  {
    name: "drug_recalls",
    keywords: [
      "drug recalls",
      "medicine recalls",
      "medication recalls",
      "drug safety alerts",
      "medicine safety alerts",
      "drug warnings",
      "medicine warnings",
      "drug problems",
      "medicine problems",
      "adverse events",
      "side effects",
    ],
    entities: ["drug_name", "medication"],
    priority: 2,
  },
  {
    name: "drug_side_effects",
    keywords: [
      "side effects",
      "adverse effects",
      "drug reactions",
      "medicine reactions",
      "allergic reaction",
      "drug allergy",
      "medicine allergy",
      "what happens if",
      "will it cause",
    ],
    entities: ["drug_name", "medication"],
    priority: 2,
  },
  {
    name: "drug_dosage",
    keywords: [
      "dosage",
      "dose",
      "how much",
      "how often",
      "when to take",
      "how to take",
      "drug instructions",
      "medicine instructions",
      "prescription",
      "medication schedule",
    ],
    entities: ["drug_name", "medication"],
    priority: 2,
  },
  {
    name: "symptoms_fever",
    keywords: ["fever", "temperature", "hot", "chills", "sweating", "feverish", "high temperature"],
    entities: ["body_part", "severity", "duration"],
    priority: 2,
  },
  {
    name: "symptoms_pain",
    keywords: ["pain", "ache", "hurt", "sore", "aching", "painful", "discomfort"],
    entities: ["body_part", "severity", "duration"],
    priority: 2,
  },
  {
    name: "symptoms_respiratory",
    keywords: ["cough", "breathing", "shortness of breath", "wheezing", "congestion", "runny nose", "sore throat"],
    entities: ["severity", "duration"],
    priority: 2,
  },
  {
    name: "symptoms_digestive",
    keywords: ["nausea", "vomiting", "diarrhea", "constipation", "stomach pain", "abdominal pain", "indigestion"],
    entities: ["severity", "duration"],
    priority: 2,
  },
  {
    name: "vaccination",
    keywords: ["vaccine", "vaccination", "immunization", "shot", "covid", "flu shot", "booster"],
    entities: ["age_group"],
    priority: 3,
  },
  {
    name: "medication",
    keywords: ["medicine", "drug", "prescription", "dosage", "side effects", "interaction", "pill", "tablet"],
    entities: ["medication"],
    priority: 3,
  },
  {
    name: "appointment",
    keywords: ["appointment", "doctor", "clinic", "hospital", "visit", "consultation", "checkup"],
    entities: ["body_part", "condition"],
    priority: 4,
  },
  {
    name: "mental_health",
    keywords: ["depression", "anxiety", "stress", "mental health", "counseling", "therapy", "mood", "panic"],
    priority: 2,
  },
  {
    name: "pregnancy",
    keywords: ["pregnancy", "pregnant", "prenatal", "maternity", "expecting", "baby"],
    priority: 3,
  },
  {
    name: "child_health",
    keywords: ["child", "baby", "infant", "toddler", "pediatric", "kids"],
    entities: ["age_group"],
    priority: 3,
  },
]

export const medicalEntities = {
  symptoms: [
    "fever",
    "headache",
    "cough",
    "nausea",
    "vomiting",
    "diarrhea",
    "fatigue",
    "dizziness",
    "chest pain",
    "abdominal pain",
    "back pain",
    "joint pain",
    "muscle pain",
    "sore throat",
    "runny nose",
    "congestion",
    "shortness of breath",
    "rash",
    "swelling",
  ],
  bodyParts: [
    "head",
    "neck",
    "chest",
    "back",
    "abdomen",
    "stomach",
    "arm",
    "leg",
    "hand",
    "foot",
    "eye",
    "ear",
    "nose",
    "throat",
    "heart",
    "lungs",
    "kidney",
    "liver",
  ],
  medications: [
    "paracetamol",
    "ibuprofen",
    "aspirin",
    "acetaminophen",
    "tylenol",
    "advil",
    "motrin",
    "aleve",
    "naproxen",
    "antibiotics",
    "amoxicillin",
    "penicillin",
    "insulin",
    "metformin",
    "blood pressure medication",
    "antacid",
    "cough syrup",
    "vitamins",
    "supplements",
    "vitamin d",
    "vitamin c",
    "calcium",
    "iron",
  ],
  drugNames: [
    "aspirin",
    "ibuprofen",
    "paracetamol",
    "acetaminophen",
    "tylenol",
    "advil",
    "motrin",
    "aleve",
    "naproxen",
    "amoxicillin",
    "penicillin",
    "metformin",
    "insulin",
    "warfarin",
    "lisinopril",
    "metoprolol",
    "simvastatin",
    "omeprazole",
    "prednisone",
    "hydrocodone",
    "tramadol",
    "gabapentin",
    "sertraline",
    "fluoxetine",
    "lorazepam",
    "alprazolam",
  ],
  severityLevels: ["mild", "moderate", "severe", "extreme"],
  ageGroups: ["infant", "child", "teenager", "adult", "elderly", "senior"],
}

export class HealthcareIntentProcessor {
  static detectIntent(
    message: string,
    language = "en",
  ): { intent: string; entities: MedicalEntity[]; confidence: number } {
    const lowerMessage = message.toLowerCase()
    let bestMatch = { intent: "general", confidence: 0 }
    const detectedEntities: MedicalEntity[] = []

    // Get language-specific keywords
    const localizedIntents = this.getLocalizedIntents(language)

    // Check for intents
    for (const intent of localizedIntents) {
      const matchCount = intent.keywords.filter((keyword) => lowerMessage.includes(keyword.toLowerCase())).length

      if (matchCount > 0) {
        const confidence = (matchCount / intent.keywords.length) * (1 / intent.priority)
        if (confidence > bestMatch.confidence) {
          bestMatch = { intent: intent.name, confidence }
        }
      }
    }

    // Extract entities
    this.extractEntities(lowerMessage, detectedEntities, language)

    return {
      intent: bestMatch.intent,
      entities: detectedEntities,
      confidence: bestMatch.confidence,
    }
  }

  private static getLocalizedIntents(language: string): HealthcareIntent[] {
    const baseIntents = healthcareIntents

    // Add language-specific keywords
    const localizedKeywords: Record<string, Record<string, string[]>> = {
      hi: {
        emergency: ["आपातकाल", "तुरंत", "मदद", "एम्बुलेंस", "दिल का दौरा", "सांस लेने में कठिनाई"],
        symptoms_fever: ["बुखार", "तापमान", "गर्म", "ठंड लगना", "पसीना"],
        symptoms_pain: ["दर्द", "पीड़ा", "चोट", "दुखना"],
        drug_info: ["दवा की जानकारी", "दवाई की जानकारी", "दवा के बारे में", "दवाई के बारे में"],
        drug_interactions: ["दवा की प्रतिक्रिया", "दवाई की प्रतिक्रिया", "दवा मिलाना", "दवाई मिलाना"],
        vaccination: ["टीका", "टीकाकरण", "वैक्सीन", "कोविड"],
        medication: ["दवा", "दवाई", "गोली", "खुराक"],
      },
      es: {
        emergency: ["emergencia", "urgente", "ayuda", "ambulancia", "ataque cardíaco", "dificultad para respirar"],
        symptoms_fever: ["fiebre", "temperatura", "caliente", "escalofríos", "sudoración"],
        symptoms_pain: ["dolor", "duele", "lastimado", "adolorido"],
        drug_info: ["información del medicamento", "datos del medicamento", "sobre el medicamento"],
        drug_interactions: ["interacciones del medicamento", "reacciones del medicamento"],
        vaccination: ["vacuna", "vacunación", "inmunización", "covid"],
        medication: ["medicina", "medicamento", "pastilla", "dosis"],
      },
      ar: {
        emergency: ["طوارئ", "عاجل", "مساعدة", "إسعاف", "نوبة قلبية", "صعوبة في التنفس"],
        symptoms_fever: ["حمى", "درجة حرارة", "ساخن", "قشعريرة", "تعرق"],
        symptoms_pain: ["ألم", "وجع", "مؤلم", "يؤلم"],
        drug_info: ["معلومات الدواء", "بيانات الدواء", "حول الدواء"],
        drug_interactions: ["تفاعلات الدواء", "تفاعلات الدواء"],
        vaccination: ["لقاح", "تطعيم", "تحصين", "كوفيد"],
        medication: ["دواء", "علاج", "حبة", "جرعة"],
      },
    }

    return baseIntents.map((intent) => ({
      ...intent,
      keywords: [...intent.keywords, ...(localizedKeywords[language]?.[intent.name] || [])],
    }))
  }

  private static extractEntities(message: string, entities: MedicalEntity[], language: string): void {
    // Extract symptoms
    medicalEntities.symptoms.forEach((symptom) => {
      if (message.includes(symptom.toLowerCase())) {
        entities.push({
          type: "symptom",
          value: symptom,
          confidence: 0.8,
        })
      }
    })

    // Extract body parts
    medicalEntities.bodyParts.forEach((bodyPart) => {
      if (message.includes(bodyPart.toLowerCase())) {
        entities.push({
          type: "body_part",
          value: bodyPart,
          confidence: 0.8,
        })
      }
    })

    // Extract medications
    medicalEntities.medications.forEach((medication) => {
      if (message.includes(medication.toLowerCase())) {
        entities.push({
          type: "medication",
          value: medication,
          confidence: 0.8,
        })
      }
    })

    // Extract drug names
    medicalEntities.drugNames.forEach((drugName) => {
      if (message.includes(drugName.toLowerCase())) {
        entities.push({
          type: "drug_name",
          value: drugName,
          confidence: 0.9,
        })
      }
    })

    // Extract severity
    medicalEntities.severityLevels.forEach((severity) => {
      if (message.includes(severity.toLowerCase())) {
        entities.push({
          type: "severity",
          value: severity,
          confidence: 0.7,
        })
      }
    })

    // Extract age groups
    medicalEntities.ageGroups.forEach((ageGroup) => {
      if (message.includes(ageGroup.toLowerCase())) {
        entities.push({
          type: "age_group",
          value: ageGroup,
          confidence: 0.7,
        })
      }
    })

    // Add language-specific entity extraction
    const localizedEntities = this.getLocalizedEntities(language)

    // Extract localized symptoms
    localizedEntities.symptoms.forEach((symptom) => {
      if (message.includes(symptom.toLowerCase())) {
        entities.push({
          type: "symptom",
          value: symptom,
          confidence: 0.8,
        })
      }
    })

    // Extract localized body parts
    localizedEntities.bodyParts.forEach((bodyPart) => {
      if (message.includes(bodyPart.toLowerCase())) {
        entities.push({
          type: "body_part",
          value: bodyPart,
          confidence: 0.8,
        })
      }
    })
  }

  private static getLocalizedEntities(language: string) {
    const localizedTerms: Record<string, any> = {
      hi: {
        symptoms: ["बुखार", "सिरदर्द", "खांसी", "मतली", "उल्टी", "दस्त", "थकान"],
        bodyParts: ["सिर", "गर्दन", "छाती", "पीठ", "पेट", "हाथ", "पैर"],
      },
      es: {
        symptoms: ["fiebre", "dolor de cabeza", "tos", "náuseas", "vómito", "diarrea", "fatiga"],
        bodyParts: ["cabeza", "cuello", "pecho", "espalda", "abdomen", "brazo", "pierna"],
      },
      ar: {
        symptoms: ["حمى", "صداع", "سعال", "غثيان", "قيء", "إسهال", "تعب"],
        bodyParts: ["رأس", "رقبة", "صدر", "ظهر", "بطن", "ذراع", "ساق"],
      },
    }

    return {
      symptoms: [...medicalEntities.symptoms, ...(localizedTerms[language]?.symptoms || [])],
      bodyParts: [...medicalEntities.bodyParts, ...(localizedTerms[language]?.bodyParts || [])],
    }
  }

  static async generateResponse(
    intent: string,
    entities: MedicalEntity[],
    userMessage: string,
    language = "en",
  ): Promise<HealthcareResponse> {
    const responses = this.getResponseTemplates(language)
    const template = responses[intent] || responses["general"]

    try {
      // Handle drug-related intents with OpenFDA integration
      if (intent === "drug_info" || intent === "drug_dosage" || intent === "drug_side_effects") {
        const drugEntity = entities.find((e) => e.type === "drug_name" || e.type === "medication")
        if (drugEntity) {
          const drugName = drugEntity.value
          const apiResponse = await fetch(`/api/health/drugs?name=${encodeURIComponent(drugName)}`)
          
          if (apiResponse.ok) {
            const drugData = await apiResponse.json()
            if (drugData.success) {
              const drug = drugData.data
              template.drugInfo = drug
              
              // Customize response based on intent
              if (intent === "drug_info") {
                template.response = `Here's detailed information about ${drug.name}:\n\n` +
                  `**Generic Name:** ${drug.genericName}\n` +
                  `**Description:** ${drug.description}\n` +
                  `**Manufacturer:** ${drug.manufacturer || 'Various'}\n` +
                  `**Dosage:** ${drug.dosage}\n` +
                  `**Active Ingredients:** ${drug.activeIngredients?.join(', ') || 'Not specified'}\n` +
                  `**FDA Approval:** ${drug.fdaApprovalDate || 'Unknown'}\n` +
                  `**NDC Number:** ${drug.ndcNumber || 'Various'}`
              } else if (intent === "drug_dosage") {
                template.response = `Dosage information for ${drug.name}:\n\n` +
                  `**Recommended Dosage:** ${drug.dosage}\n` +
                  `**Important Notes:**\n` +
                  `• Always follow your doctor's instructions\n` +
                  `• Do not exceed recommended dose\n` +
                  `• Take with food if stomach upset occurs\n` +
                  `• Consult your doctor if you miss a dose`
              } else if (intent === "drug_side_effects") {
                template.response = `Side effects information for ${drug.name}:\n\n` +
                  `**Common Side Effects:**\n${drug.sideEffects.map(effect => `• ${effect}`).join('\n')}\n\n` +
                  `**Warnings:**\n${drug.warnings.map(warning => `• ${warning}`).join('\n')}\n\n` +
                  `**Pregnancy Category:** ${drug.pregnancyCategory || 'Not specified'}\n` +
                  `**Breastfeeding:** ${drug.breastfeeding || 'Consult healthcare provider'}`
              }
              
              template.followUpQuestions = [
                `Are you experiencing any side effects from ${drug.name}?`,
                `Do you have questions about the dosage of ${drug.name}?`,
                `Are you taking any other medications with ${drug.name}?`,
                `Do you have any allergies to medications?`
              ]
            } else {
              template.response = `I couldn't find detailed information about ${drugName} in our database. Please consult your healthcare provider or pharmacist for specific information about this medication.`
            }
          }
        } else {
          template.response = "Please specify which drug or medication you'd like information about. For example, 'Tell me about aspirin' or 'What is ibuprofen?'"
          template.followUpQuestions = [
            "What specific drug are you asking about?",
            "Are you looking for information about a prescription medication?",
            "Do you need information about over-the-counter drugs?"
          ]
        }
      }

      // Handle drug interactions
      if (intent === "drug_interactions") {
        const drugEntity = entities.find((e) => e.type === "drug_name" || e.type === "medication")
        if (drugEntity) {
          const drugName = drugEntity.value
          const apiResponse = await fetch(`/api/health/drug-interactions?drug=${encodeURIComponent(drugName)}`)
          
          if (apiResponse.ok) {
            const interactionData = await apiResponse.json()
            if (interactionData.success) {
              const interactions = interactionData.data
              template.drugInteractions = interactions
              
              template.response = `Drug interactions for ${drugName}:\n\n` +
                `**Known Interactions:**\n${interactions[0]?.interactions.map((interaction: string) => `• ${interaction}`).join('\n') || 'No specific interaction data available'}\n\n` +
                `**Important:** Always inform your doctor about all medications you're taking, including over-the-counter drugs, vitamins, and supplements.`
              
              template.followUpQuestions = [
                `Are you currently taking any other medications with ${drugName}?`,
                `Do you have concerns about specific drug combinations?`,
                `Would you like me to check interactions with another medication?`
              ]
            } else {
              template.response = `I couldn't find interaction information for ${drugName}. Please consult your pharmacist or healthcare provider about potential drug interactions.`
            }
          }
        } else {
          template.response = "Please specify which drug you'd like to check for interactions. For example, 'Check interactions for aspirin' or 'Can I take ibuprofen with other medications?'"
        }
      }

      // Handle drug recalls and safety alerts
      if (intent === "drug_recalls") {
        const drugEntity = entities.find((e) => e.type === "drug_name" || e.type === "medication")
        const drugName = drugEntity?.value
        
        const apiResponse = await fetch(`/api/health/drug-recalls${drugName ? `?drug=${encodeURIComponent(drugName)}` : ''}`)
        
        if (apiResponse.ok) {
          const recallData = await apiResponse.json()
          if (recallData.success) {
            const recalls = recallData.data
            template.drugRecalls = recalls
            
            if (recalls.length > 0) {
              template.response = `Recent safety information${drugName ? ` for ${drugName}` : ''}:\n\n` +
                recalls.slice(0, 3).map((recall: any, index: number) => 
                  `**${index + 1}. ${recall.event_type}** (${new Date(recall.report_date).toLocaleDateString()})\n` +
                  `• Patient: ${recall.patient.age} years, ${recall.patient.sex === 1 ? 'Male' : 'Female'}\n` +
                  `• Reactions: ${recall.reaction.join(', ')}\n` +
                  `• Dosage: ${recall.drug[0]?.drugdosagetext?.join(', ') || 'Not specified'}\n`
                ).join('\n') +
                `\n**Note:** This information is for educational purposes. Always consult your healthcare provider about any concerns.`
            } else {
              template.response = `No recent safety alerts found${drugName ? ` for ${drugName}` : ''}. This is good news, but always stay informed about your medications and report any unusual side effects to your healthcare provider.`
            }
            
            template.followUpQuestions = [
              "Are you experiencing any unusual side effects?",
              "Do you have concerns about medication safety?",
              "Would you like to check safety information for another drug?"
            ]
          }
        }
      }

      // Enhance existing responses with real-time data
      if (intent === "vaccination") {
        const vaccineEntity = entities.find((e) => e.type === "medication" || e.value.includes("vaccine"))
        if (vaccineEntity) {
          const apiResponse = await fetch(`/api/health/vaccination?vaccine=${vaccineEntity.value}`)
          if (apiResponse.ok) {
            const vaccinationData = await apiResponse.json()
            if (vaccinationData.success && vaccinationData.data.length > 0) {
              const vaccine = vaccinationData.data[0]
              template.response += `\n\nLatest information for ${vaccine.vaccine}:\n• Schedule: ${vaccine.schedule.join(", ")}\n• Side effects: ${vaccine.sideEffects.join(", ")}`
            }
          }
        }
      }

      if (intent.startsWith("symptoms_")) {
        const symptomEntities = entities.filter((e) => e.type === "symptom")
        if (symptomEntities.length > 0) {
          const symptoms = symptomEntities.map((e) => e.value)
          const apiResponse = await fetch("/api/health/symptoms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symptoms }),
          })
          if (apiResponse.ok) {
            const assessmentData = await apiResponse.json()
            if (assessmentData.success) {
              const assessment = assessmentData.data
              template.response += `\n\nSymptom Assessment:\n• Possible conditions: ${assessment.possibleConditions.map((c: any) => `${c.condition} (${Math.round(c.probability * 100)}%)`).join(", ")}\n• When to seek care: ${assessment.whenToSeekCare}`
              template.urgencyLevel = assessment.possibleConditions[0]?.urgency || "medium"
            }
          }
        }
      }

      if (intent === "appointment") {
        // Add nearby healthcare providers
        const locationKeywords = ["near", "in", "at", "around"]
        const words = userMessage.split(" ")
        let location = ""

        for (let i = 0; i < words.length; i++) {
          if (locationKeywords.includes(words[i].toLowerCase()) && i + 1 < words.length) {
            location = words.slice(i + 1).join(" ")
            break
          }
        }

        if (location) {
          const apiResponse = await fetch(`/api/health/providers?location=${encodeURIComponent(location)}`)
          if (apiResponse.ok) {
            const providersData = await apiResponse.json()
            if (providersData.success && providersData.data.length > 0) {
              const providers = providersData.data.slice(0, 3) // Top 3 providers
              template.response += `\n\nNearby healthcare providers in ${location}:\n${providers.map((p: any) => `• ${p.name} - ${p.type} (${p.distance}km away, Rating: ${p.rating}/5)`).join("\n")}`
            }
          }
        }
      }
    } catch (error) {
      console.error("Error enhancing response with API data:", error)
      // Continue with basic response if API calls fail
    }

    return {
      intent,
      response: this.personalizeResponse(template.response, entities),
      followUpQuestions: template.followUpQuestions,
      urgencyLevel: template.urgencyLevel,
      recommendedActions: template.recommendedActions,
      disclaimers: template.disclaimers,
      drugInfo: template.drugInfo,
      drugRecalls: template.drugRecalls,
      drugInteractions: template.drugInteractions,
    }
  }

  private static personalizeResponse(template: string, entities: MedicalEntity[]): string {
    let response = template

    // Replace placeholders with detected entities
    entities.forEach((entity) => {
      const placeholder = `{${entity.type}}`
      if (response.includes(placeholder)) {
        response = response.replace(placeholder, entity.value)
      }
    })

    return response
  }

  private static getResponseTemplates(language = "en"): Record<string, HealthcareResponse> {
    // Import translations
    const getTranslation = require("./translations").getTranslation

    return {
      emergency: {
        intent: "emergency",
        response: getTranslation(language, "responses.emergency"),
        urgencyLevel: "emergency",
        recommendedActions: [
          "Call emergency services immediately",
          "Go to nearest emergency room",
          "Do not drive yourself if experiencing severe symptoms",
        ],
        disclaimers: ["This is not a substitute for emergency medical care"],
      },
      drug_info: {
        intent: "drug_info",
        response: "I'll help you find detailed information about the drug you're asking about.",
        urgencyLevel: "low",
        recommendedActions: [
          "Always consult your healthcare provider before taking any medication",
          "Read medication labels carefully",
          "Keep a list of all medications you're taking",
        ],
        disclaimers: [
          "This information is for educational purposes only",
          "Always consult healthcare professionals for medical advice",
        ],
      },
      drug_interactions: {
        intent: "drug_interactions",
        response: "I'll check for potential drug interactions for you.",
        urgencyLevel: "medium",
        recommendedActions: [
          "Always inform your doctor about all medications you're taking",
          "Keep a current list of all your medications",
          "Ask your pharmacist about potential interactions",
        ],
        disclaimers: [
          "This information does not replace professional medical advice",
          "Always consult your healthcare provider about drug interactions",
        ],
      },
      drug_recalls: {
        intent: "drug_recalls",
        response: "I'll check for recent safety alerts and recalls for you.",
        urgencyLevel: "medium",
        recommendedActions: [
          "Stay informed about medication safety",
          "Report any unusual side effects to your healthcare provider",
          "Keep track of medication recalls and updates",
        ],
        disclaimers: [
          "Safety information is updated regularly",
          "Always consult your healthcare provider about any concerns",
        ],
      },
      drug_side_effects: {
        intent: "drug_side_effects",
        response: "I'll provide information about potential side effects for you.",
        urgencyLevel: "medium",
        recommendedActions: [
          "Monitor for any unusual symptoms",
          "Report severe side effects to your doctor immediately",
          "Keep track of when side effects occur",
        ],
        disclaimers: [
          "Not everyone experiences side effects",
          "Seek immediate medical attention for severe reactions",
        ],
      },
      drug_dosage: {
        intent: "drug_dosage",
        response: "I'll provide dosage information for the medication you're asking about.",
        urgencyLevel: "medium",
        recommendedActions: [
          "Always follow your doctor's prescribed dosage",
          "Do not exceed recommended amounts",
          "Take medications at the same time each day",
        ],
        disclaimers: [
          "Dosage may vary based on individual factors",
          "Always follow your healthcare provider's instructions",
        ],
      },
      symptoms_fever: {
        intent: "symptoms_fever",
        response: getTranslation(language, "responses.fever"),
        followUpQuestions: [
          "How long have you had the fever?",
          "What is your current temperature?",
          "Are you experiencing any other symptoms?",
          "Have you taken any medication for the fever?",
        ],
        urgencyLevel: "medium",
        recommendedActions: [
          "Monitor temperature regularly",
          "Stay hydrated with fluids",
          "Get plenty of rest",
          "Consult a doctor if fever persists over 3 days",
        ],
        disclaimers: ["Seek immediate medical attention if fever exceeds 103°F (39.4°C)"],
      },
      symptoms_pain: {
        intent: "symptoms_pain",
        response: getTranslation(language, "responses.pain"),
        followUpQuestions: [
          "On a scale of 1-10, how would you rate your pain?",
          "When did the pain start?",
          "What makes the pain better or worse?",
          "Have you injured this area recently?",
        ],
        urgencyLevel: "medium",
        recommendedActions: [
          "Apply ice for acute injuries (first 24-48 hours)",
          "Use heat for muscle tension and chronic pain",
          "Consider over-the-counter pain relievers as directed",
          "Avoid activities that worsen the pain",
        ],
        disclaimers: ["Severe or persistent pain requires medical evaluation"],
      },
      vaccination: {
        intent: "vaccination",
        response: getTranslation(language, "responses.vaccination"),
        followUpQuestions: [
          "Which specific vaccine are you asking about?",
          "Are you looking for a vaccination schedule?",
          "Do you have any concerns about vaccine side effects?",
          "Are you up to date with your routine vaccinations?",
        ],
        urgencyLevel: "low",
        recommendedActions: [
          "Consult your healthcare provider for personalized vaccine recommendations",
          "Keep vaccination records up to date",
          "Follow recommended vaccination schedules",
        ],
        disclaimers: ["Vaccination schedules may vary based on individual health conditions"],
      },
      medication: {
        intent: "medication",
        response: getTranslation(language, "responses.medication"),
        followUpQuestions: [
          "What specific medication are you asking about?",
          "Are you experiencing any side effects?",
          "Are you taking any other medications?",
          "Do you have any allergies to medications?",
        ],
        urgencyLevel: "medium",
        recommendedActions: [
          "Always follow prescribed dosages",
          "Read medication labels carefully",
          "Inform your doctor about all medications you're taking",
          "Store medications properly",
        ],
        disclaimers: [
          "Never stop prescribed medications without consulting your doctor",
          "This information does not replace professional medical advice",
        ],
      },
      mental_health: {
        intent: "mental_health",
        response: getTranslation(language, "responses.mentalHealth"),
        followUpQuestions: [
          "How long have you been feeling this way?",
          "Are these feelings affecting your daily activities?",
          "Do you have a support system of family or friends?",
          "Have you considered speaking with a mental health professional?",
        ],
        urgencyLevel: "medium",
        recommendedActions: [
          "Consider speaking with a mental health professional",
          "Maintain regular sleep and exercise routines",
          "Stay connected with supportive friends and family",
          "Practice stress-reduction techniques",
        ],
        disclaimers: [
          "If you're having thoughts of self-harm, please seek immediate help",
          "Crisis hotlines are available 24/7 for support",
        ],
      },
      general: {
        intent: "general",
        response: getTranslation(language, "responses.general"),
        followUpQuestions: [
          "Are you experiencing any specific symptoms?",
          "Do you need information about medications?",
          "Are you looking for healthcare providers in your area?",
          "Do you have questions about preventive care?",
        ],
        urgencyLevel: "low",
        recommendedActions: [
          "Be specific about your health concerns",
          "Provide relevant details about symptoms",
          "Ask about preventive care measures",
        ],
        disclaimers: [
          "This chatbot provides general health information only",
          "Always consult healthcare professionals for medical advice",
        ],
      },
    }
  }
}
