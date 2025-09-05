// Mock data for symptoms and health conditions
import { SymptomInfo } from './types'

export const mockSymptoms: SymptomInfo[] = [
  {
    name: "Fever",
    description: "Elevated body temperature above normal range (98.6°F/37°C)",
    severity: "moderate",
    category: "General",
    relatedSymptoms: ["Chills", "Sweating", "Headache", "Fatigue", "Body aches"],
    recommendations: ["Get plenty of rest", "Stay hydrated with fluids", "Use over-the-counter pain relievers if needed", "Monitor temperature regularly"],
    emergency: false
  },
  {
    name: "Chest Pain",
    description: "Pain or discomfort in the chest area, can be sharp, dull, or pressure-like",
    severity: "severe",
    category: "Cardiovascular",
    relatedSymptoms: ["Shortness of breath", "Nausea", "Sweating", "Dizziness", "Arm pain"],
    recommendations: ["Seek immediate medical attention", "Do not ignore chest pain", "Call emergency services if severe"],
    emergency: true
  },
  {
    name: "Headache",
    description: "Pain or discomfort in the head or neck area",
    severity: "mild",
    category: "Neurological",
    relatedSymptoms: ["Nausea", "Sensitivity to light", "Fatigue", "Neck stiffness"],
    recommendations: ["Rest in a quiet, dark room", "Apply cold compress", "Stay hydrated", "Avoid triggers"],
    emergency: false
  },
  {
    name: "Nausea",
    description: "Feeling of sickness with an inclination to vomit",
    severity: "mild",
    category: "Digestive",
    relatedSymptoms: ["Vomiting", "Loss of appetite", "Stomach upset", "Dizziness"],
    recommendations: ["Eat small, frequent meals", "Avoid strong odors", "Stay hydrated with clear fluids", "Try ginger tea"],
    emergency: false
  },
  {
    name: "Shortness of Breath",
    description: "Difficulty breathing or feeling breathless",
    severity: "severe",
    category: "Respiratory",
    relatedSymptoms: ["Chest tightness", "Wheezing", "Cough", "Fatigue", "Rapid heartbeat"],
    recommendations: ["Seek immediate medical attention", "Sit upright", "Try to stay calm", "Use rescue inhaler if available"],
    emergency: true
  },
  {
    name: "Abdominal Pain",
    description: "Pain or discomfort in the stomach or belly area",
    severity: "moderate",
    category: "Digestive",
    relatedSymptoms: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Bloating"],
    recommendations: ["Rest", "Apply heat or cold pack", "Avoid solid foods initially", "Seek medical attention if severe"],
    emergency: false
  },
  {
    name: "Dizziness",
    description: "Feeling lightheaded, unsteady, or like you might faint",
    severity: "moderate",
    category: "Neurological",
    relatedSymptoms: ["Nausea", "Sweating", "Weakness", "Blurred vision"],
    recommendations: ["Sit or lie down", "Stay hydrated", "Avoid sudden movements", "Seek medical attention if frequent"],
    emergency: false
  },
  {
    name: "Rash",
    description: "Change in skin color, texture, or appearance",
    severity: "mild",
    category: "Dermatological",
    relatedSymptoms: ["Itching", "Redness", "Swelling", "Blisters"],
    recommendations: ["Keep area clean and dry", "Avoid scratching", "Use mild soap", "Apply cool compress"],
    emergency: false
  },
  {
    name: "Fatigue",
    description: "Extreme tiredness or lack of energy",
    severity: "mild",
    category: "General",
    relatedSymptoms: ["Weakness", "Sleepiness", "Difficulty concentrating", "Muscle aches"],
    recommendations: ["Get adequate sleep", "Eat balanced meals", "Stay hydrated", "Exercise regularly"],
    emergency: false
  },
  {
    name: "Cough",
    description: "Reflex action to clear airways of mucus or irritants",
    severity: "mild",
    category: "Respiratory",
    relatedSymptoms: ["Sore throat", "Chest congestion", "Wheezing", "Shortness of breath"],
    recommendations: ["Stay hydrated", "Use cough drops", "Avoid irritants", "Seek medical attention if persistent"],
    emergency: false
  }
]

export const mockSymptomAssessments = [
  {
    id: "1",
    symptoms: ["Fever", "Headache", "Fatigue"],
    severity: "moderate",
    possibleConditions: ["Viral infection", "Flu", "Common cold", "Sinusitis"],
    recommendations: ["Rest", "Stay hydrated", "Monitor symptoms", "See doctor if symptoms worsen"],
    emergency: false
  },
  {
    id: "2",
    symptoms: ["Chest pain", "Shortness of breath", "Nausea"],
    severity: "severe",
    possibleConditions: ["Heart attack", "Angina", "Pulmonary embolism", "Aortic dissection"],
    recommendations: ["Call emergency services immediately", "Do not drive yourself", "Stay calm", "Chew aspirin if available"],
    emergency: true
  },
  {
    id: "3",
    symptoms: ["Abdominal pain", "Nausea", "Vomiting"],
    severity: "moderate",
    possibleConditions: ["Gastritis", "Food poisoning", "Appendicitis", "Gallstones"],
    recommendations: ["Rest", "Avoid solid foods", "Stay hydrated", "Seek medical attention if severe"],
    emergency: false
  },
  {
    id: "4",
    symptoms: ["Dizziness", "Nausea", "Sweating"],
    severity: "moderate",
    possibleConditions: ["Low blood pressure", "Dehydration", "Inner ear problem", "Anxiety"],
    recommendations: ["Sit or lie down", "Stay hydrated", "Avoid sudden movements", "Seek medical attention if frequent"],
    emergency: false
  },
  {
    id: "5",
    symptoms: ["Rash", "Itching", "Swelling"],
    severity: "mild",
    possibleConditions: ["Allergic reaction", "Contact dermatitis", "Eczema", "Hives"],
    recommendations: ["Avoid triggers", "Use mild soap", "Apply cool compress", "Take antihistamines if appropriate"],
    emergency: false
  }
] 