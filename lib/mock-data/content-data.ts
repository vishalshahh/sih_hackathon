// Mock data for content management
import { ContentData } from './types'

export const mockContent: ContentData[] = [
  {
    id: "content_001",
    title: "COVID-19 Symptoms and Prevention",
    content: "COVID-19 symptoms include fever, cough, shortness of breath, fatigue, body aches, headache, loss of taste or smell, sore throat, congestion, nausea, and diarrhea. To prevent COVID-19, get vaccinated, wear masks in public, maintain social distance, wash hands frequently, and avoid large gatherings.",
    category: "FAQ",
    language: "en",
    status: "active",
    createdAt: "2024-01-01",
    lastUpdated: "2024-01-15",
    tags: ["covid", "symptoms", "prevention", "health"]
  },
  {
    id: "content_002",
    title: "Emergency Contact Information",
    content: "In case of medical emergency, call 911 immediately. For non-emergency medical questions, contact your healthcare provider or use our chatbot for initial assessment. Keep emergency contacts handy and know your medical history.",
    category: "Emergency",
    language: "en",
    status: "active",
    createdAt: "2024-01-01",
    lastUpdated: "2024-01-10",
    tags: ["emergency", "contacts", "urgent"]
  },
  {
    id: "content_003",
    title: "Vaccination Schedule for Children",
    content: "Children should receive vaccinations according to the CDC schedule: Birth (Hepatitis B), 2 months (DTaP, Hib, PCV, Polio, Rotavirus), 4 months (DTaP, Hib, PCV, Polio, Rotavirus), 6 months (DTaP, Hib, PCV, Polio, Rotavirus, Influenza), 12 months (MMR, Varicella, Hepatitis A), 15 months (DTaP, Hib, PCV), 18 months (DTaP, Hib, PCV, Polio, Hepatitis A), 4-6 years (DTaP, IPV, MMR, Varicella), 11-12 years (Tdap, HPV, Meningococcal), 16 years (Meningococcal B).",
    category: "General",
    language: "en",
    status: "active",
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-12",
    tags: ["vaccination", "children", "schedule", "immunization"]
  },
  {
    id: "content_004",
    title: "Mental Health Resources",
    content: "If you're experiencing mental health concerns, reach out to: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741), or your local mental health provider. Remember that seeking help is a sign of strength, not weakness.",
    category: "General",
    language: "en",
    status: "active",
    createdAt: "2024-01-08",
    lastUpdated: "2024-01-14",
    tags: ["mental health", "resources", "support", "crisis"]
  },
  {
    id: "content_005",
    title: "Medication Safety Tips",
    content: "Always take medications as prescribed by your doctor. Store medications in a cool, dry place away from children. Check expiration dates regularly. Don't share medications with others. Keep a list of all medications you're taking. Report any side effects to your healthcare provider immediately.",
    category: "FAQ",
    language: "en",
    status: "active",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-16",
    tags: ["medication", "safety", "prescription", "side effects"]
  },
  {
    id: "content_006",
    title: "Síntomas de COVID-19 y Prevención",
    content: "Los síntomas de COVID-19 incluyen fiebre, tos, dificultad para respirar, fatiga, dolores corporales, dolor de cabeza, pérdida del gusto o el olfato, dolor de garganta, congestión, náuseas y diarrea. Para prevenir COVID-19, vacúnese, use mascarillas en público, mantenga distancia social, lávese las manos frecuentemente y evite reuniones grandes.",
    category: "FAQ",
    language: "es",
    status: "active",
    createdAt: "2024-01-01",
    lastUpdated: "2024-01-15",
    tags: ["covid", "síntomas", "prevención", "salud"]
  },
  {
    id: "content_007",
    title: "Información de Contacto de Emergencia",
    content: "En caso de emergencia médica, llame al 911 inmediatamente. Para preguntas médicas no urgentes, contacte a su proveedor de atención médica o use nuestro chatbot para evaluación inicial. Mantenga los contactos de emergencia a mano y conozca su historial médico.",
    category: "Emergency",
    language: "es",
    status: "active",
    createdAt: "2024-01-01",
    lastUpdated: "2024-01-10",
    tags: ["emergencia", "contactos", "urgente"]
  },
  {
    id: "content_008",
    title: "Draft: New Health Guidelines",
    content: "This is a draft of new health guidelines that are being reviewed before publication. Content will be finalized after review by medical professionals.",
    category: "General",
    language: "en",
    status: "draft",
    createdAt: "2024-01-20",
    lastUpdated: "2024-01-20",
    tags: ["draft", "guidelines", "review"]
  }
]

export const mockContentCategories = [
  "FAQ",
  "Emergency", 
  "General",
  "Vaccination",
  "Medication",
  "Mental Health"
]

export const mockLanguages = [
  "en",
  "es", 
  "fr",
  "de",
  "it",
  "pt",
  "hi",
  "zh",
  "ja",
  "ko"
] 