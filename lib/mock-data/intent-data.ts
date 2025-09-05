// Mock data for intent management
import { IntentData } from './types'

export const mockIntents: IntentData[] = [
  {
    id: "intent_001",
    name: "symptoms_fever",
    description: "User reports fever symptoms",
    examples: [
      "I have a fever",
      "My temperature is high",
      "I feel hot and sweaty",
      "I have a temperature",
      "I'm running a fever",
      "My body feels hot"
    ],
    responses: [
      "I understand you're experiencing fever. How long have you had this fever?",
      "Fever can be a sign of various conditions. Let me help you assess this.",
      "What's your current temperature reading?",
      "Fever is your body's way of fighting infection. Let's monitor your symptoms."
    ],
    confidence: 0.95,
    language: "en",
    category: "symptoms",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_002",
    name: "drug_info",
    description: "User asks about medication information",
    examples: [
      "Tell me about aspirin",
      "What are the side effects of ibuprofen?",
      "Can I take this medication?",
      "Drug interaction information",
      "What does this medicine do?",
      "Is this medication safe?"
    ],
    responses: [
      "I can help you with medication information. What specific drug would you like to know about?",
      "Let me provide you with detailed information about this medication.",
      "I'll check the drug database for you.",
      "I can help you understand how this medication works and its potential side effects."
    ],
    confidence: 0.92,
    language: "en",
    category: "medication",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_003",
    name: "vaccination",
    description: "User asks about vaccinations",
    examples: [
      "When should I get vaccinated?",
      "What vaccines do I need?",
      "Vaccination schedule",
      "Side effects of vaccines",
      "Is the flu shot safe?",
      "When is the best time to get vaccinated?"
    ],
    responses: [
      "I can help you with vaccination information. What specific vaccine are you asking about?",
      "Let me check the vaccination schedule for you.",
      "I'll provide you with current vaccination recommendations.",
      "Vaccinations are an important part of preventive healthcare. Let me help you understand your options."
    ],
    confidence: 0.88,
    language: "en",
    category: "prevention",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_004",
    name: "emergency",
    description: "User reports emergency medical situation",
    examples: [
      "I have chest pain",
      "I can't breathe",
      "This is an emergency",
      "I need help now",
      "I'm having a heart attack",
      "Call 911"
    ],
    responses: [
      "This sounds like a medical emergency. Please call 911 immediately.",
      "Do not drive yourself. Call emergency services right away.",
      "Stay calm and try to sit upright. Help is on the way.",
      "This is a medical emergency. Your safety is the priority."
    ],
    confidence: 0.99,
    language: "en",
    category: "emergency",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_005",
    name: "appointment",
    description: "User wants to schedule or ask about appointments",
    examples: [
      "I need to see a doctor",
      "Schedule an appointment",
      "When can I see a doctor?",
      "Book a visit",
      "I need a checkup",
      "Make an appointment"
    ],
    responses: [
      "I can help you find healthcare providers in your area.",
      "Let me search for available appointments near you.",
      "I'll help you connect with a healthcare provider.",
      "What type of healthcare provider are you looking for?"
    ],
    confidence: 0.85,
    language: "en",
    category: "appointment",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_006",
    name: "symptoms_headache",
    description: "User reports headache symptoms",
    examples: [
      "I have a headache",
      "My head hurts",
      "I have a migraine",
      "Head pain",
      "My head is pounding",
      "Severe headache"
    ],
    responses: [
      "I understand you're experiencing a headache. How long have you had this pain?",
      "Headaches can have various causes. Let me help you assess this.",
      "What type of headache are you experiencing?",
      "Headaches can be managed with rest and proper care."
    ],
    confidence: 0.93,
    language: "en",
    category: "symptoms",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_007",
    name: "drug_interactions",
    description: "User asks about drug interactions",
    examples: [
      "Can I take these medicines together?",
      "Drug interaction check",
      "Will these medications interact?",
      "Is it safe to mix these drugs?",
      "Medication compatibility",
      "Drug interaction warning"
    ],
    responses: [
      "I can help you check for potential drug interactions.",
      "Let me analyze the medications you're taking.",
      "I'll check for any potential interactions between your medications.",
      "It's important to check for drug interactions before taking multiple medications."
    ],
    confidence: 0.90,
    language: "en",
    category: "medication",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_008",
    name: "provider_search",
    description: "User wants to find healthcare providers",
    examples: [
      "Find a doctor near me",
      "Where is the nearest pharmacy?",
      "I need a hospital",
      "Find healthcare providers",
      "Locate medical services",
      "Where can I get medical help?"
    ],
    responses: [
      "I can help you find healthcare providers in your area.",
      "Let me search for medical services near you.",
      "What type of healthcare provider are you looking for?",
      "I'll help you locate the nearest medical facilities."
    ],
    confidence: 0.87,
    language: "en",
    category: "provider",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_009",
    name: "symptoms_cough",
    description: "User reports cough symptoms",
    examples: [
      "I have a cough",
      "I can't stop coughing",
      "Persistent cough",
      "Dry cough",
      "Coughing fits",
      "Bad cough"
    ],
    responses: [
      "I understand you're experiencing a cough. How long have you had this cough?",
      "Coughs can have various causes. Let me help you assess this.",
      "What type of cough are you experiencing?",
      "Coughs can be managed with proper care and sometimes medication."
    ],
    confidence: 0.91,
    language: "en",
    category: "symptoms",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "intent_010",
    name: "vaccination_schedule",
    description: "User asks about vaccination schedules",
    examples: [
      "When should my child get vaccinated?",
      "Vaccination schedule for adults",
      "What vaccines do I need at my age?",
      "Immunization schedule",
      "When is the next vaccination due?",
      "Vaccination timeline"
    ],
    responses: [
      "I can help you with vaccination schedules. What age group are you asking about?",
      "Let me check the recommended vaccination schedule for you.",
      "I'll provide you with the current vaccination recommendations.",
      "Vaccination schedules vary by age and health status. Let me help you understand what's needed."
    ],
    confidence: 0.89,
    language: "en",
    category: "prevention",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
] 