// Mock data for drugs and medications
import { DrugInfo } from './types'

export const mockDrugs: DrugInfo[] = [
  {
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    description: "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation.",
    dosage: "325-650mg every 4 hours, max 4000mg/day",
    sideEffects: ["Stomach upset", "Nausea", "Heartburn", "Drowsiness", "Ringing in ears", "Easy bruising"],
    interactions: ["Warfarin - May increase bleeding risk significantly", "Alcohol - May increase stomach bleeding and liver damage"],
    warnings: ["Do not use in children with viral infections", "May increase bleeding risk", "Avoid if allergic to NSAIDs"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Acetylsalicylic Acid",
    pregnancyCategory: "C",
    ndcNumber: "12345-678-90",
    fdaApprovalDate: "1950-01-01",
    breastfeedingInfo: "Consult healthcare provider"
  },
  {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    description: "Pain reliever and fever reducer. Safe for most people when used as directed.",
    dosage: "200-400mg every 4-6 hours, max 1200mg/day",
    sideEffects: ["Stomach upset", "Nausea", "Heartburn", "Drowsiness", "Ringing in ears", "Easy bruising"],
    interactions: ["Blood thinners - May increase bleeding risk", "ACE inhibitors - May reduce blood pressure control"],
    warnings: ["Take with food to reduce stomach upset", "Do not exceed recommended dose", "Avoid alcohol"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Ibuprofen",
    pregnancyCategory: "B",
    ndcNumber: "23456-789-01",
    fdaApprovalDate: "1974-01-01",
    breastfeedingInfo: "Safe for breastfeeding"
  },
  {
    name: "Acetaminophen",
    genericName: "Acetaminophen",
    description: "Pain reliever and fever reducer. Safe for most people when used as directed.",
    dosage: "500-1000mg every 4-6 hours, max 4000mg/day",
    sideEffects: ["Rare: Allergic reactions", "Very rare: Liver damage with overdose"],
    interactions: ["Warfarin - May increase bleeding risk", "Alcohol - May increase liver damage risk"],
    warnings: ["Do not exceed recommended dose", "Avoid alcohol", "May cause liver damage in overdose"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Acetaminophen",
    pregnancyCategory: "B",
    ndcNumber: "34567-890-12",
    fdaApprovalDate: "1955-01-01",
    breastfeedingInfo: "Safe for breastfeeding"
  },
  {
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    description: "Antibiotic used to treat bacterial infections. Belongs to the penicillin class of antibiotics.",
    dosage: "250-500mg every 8 hours, or as directed by doctor",
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Rash", "Allergic reactions", "Yeast infections"],
    interactions: ["Methotrexate - May increase methotrexate toxicity", "Warfarin - May increase bleeding risk"],
    warnings: ["Inform doctor of penicillin allergies", "Complete full course as prescribed", "May cause allergic reactions"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Amoxicillin",
    pregnancyCategory: "B",
    ndcNumber: "45678-901-23",
    fdaApprovalDate: "1972-01-01",
    breastfeedingInfo: "May pass into breast milk"
  },
  {
    name: "Metformin",
    genericName: "Metformin",
    description: "Antidiabetic medication used to treat type 2 diabetes. Helps control blood sugar levels.",
    dosage: "500-1000mg twice daily with meals",
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Stomach upset", "Metallic taste", "Weight loss"],
    interactions: ["Cimetidine - May increase metformin levels", "Furosemide - May increase risk of lactic acidosis"],
    warnings: ["May cause lactic acidosis (rare)", "Inform doctor of kidney problems", "Avoid excessive alcohol"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Metformin",
    pregnancyCategory: "B",
    ndcNumber: "56789-012-34",
    fdaApprovalDate: "1995-01-01",
    breastfeedingInfo: "Use with caution"
  },
  {
    name: "Lisinopril",
    genericName: "Lisinopril",
    description: "ACE inhibitor used to treat high blood pressure and heart failure.",
    dosage: "10-40mg once daily",
    sideEffects: ["Dry cough", "Dizziness", "Fatigue", "Headache", "Nausea", "Rash"],
    interactions: ["Potassium supplements - May increase potassium levels", "NSAIDs - May reduce effectiveness"],
    warnings: ["May cause angioedema (rare)", "Monitor blood pressure regularly", "Avoid potassium supplements"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Lisinopril",
    pregnancyCategory: "D",
    ndcNumber: "67890-123-45",
    fdaApprovalDate: "1987-01-01",
    breastfeedingInfo: "Not recommended"
  },
  {
    name: "Atorvastatin",
    genericName: "Atorvastatin",
    description: "Statin medication used to lower cholesterol and reduce cardiovascular risk.",
    dosage: "10-80mg once daily",
    sideEffects: ["Muscle pain", "Nausea", "Diarrhea", "Constipation", "Headache", "Rash"],
    interactions: ["Grapefruit juice - May increase side effects", "Warfarin - May increase bleeding risk"],
    warnings: ["May cause muscle problems", "Monitor liver function", "Avoid grapefruit juice"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Atorvastatin",
    pregnancyCategory: "X",
    ndcNumber: "78901-234-56",
    fdaApprovalDate: "1996-01-01",
    breastfeedingInfo: "Not recommended"
  },
  {
    name: "Omeprazole",
    genericName: "Omeprazole",
    description: "Proton pump inhibitor used to treat acid reflux and stomach ulcers.",
    dosage: "20-40mg once daily before breakfast",
    sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Gas", "Dizziness"],
    interactions: ["Warfarin - May increase bleeding risk", "Clopidogrel - May reduce effectiveness"],
    warnings: ["Take before breakfast", "May increase risk of bone fractures", "Long-term use may cause vitamin B12 deficiency"],
    manufacturer: "Various manufacturers",
    activeIngredient: "Omeprazole",
    pregnancyCategory: "C",
    ndcNumber: "89012-345-67",
    fdaApprovalDate: "1989-01-01",
    breastfeedingInfo: "Use with caution"
  }
]

export const mockDrugInteractions = [
  {
    drug1: "Aspirin",
    drug2: "Warfarin",
    severity: "high",
    description: "May increase bleeding risk significantly",
    recommendation: "Monitor bleeding time and INR closely"
  },
  {
    drug1: "Ibuprofen",
    drug2: "Blood thinners",
    severity: "medium",
    description: "May increase bleeding risk",
    recommendation: "Use with caution and monitor for bleeding"
  },
  {
    drug1: "Acetaminophen",
    drug2: "Alcohol",
    severity: "high",
    description: "May increase liver damage risk",
    recommendation: "Avoid alcohol while taking acetaminophen"
  },
  {
    drug1: "Lisinopril",
    drug2: "Potassium supplements",
    severity: "high",
    description: "May cause dangerously high potassium levels",
    recommendation: "Avoid potassium supplements and salt substitutes"
  },
  {
    drug1: "Atorvastatin",
    drug2: "Grapefruit juice",
    severity: "medium",
    description: "May increase risk of muscle problems",
    recommendation: "Avoid grapefruit and grapefruit juice"
  },
  {
    drug1: "Omeprazole",
    drug2: "Clopidogrel",
    severity: "medium",
    description: "May reduce effectiveness of clopidogrel",
    recommendation: "Consider alternative acid reducer"
  }
]

export const mockDrugRecalls = [
  {
    id: "1",
    drugName: "Sample Drug A",
    manufacturer: "Sample Pharma",
    reason: "Contamination detected",
    severity: "high",
    date: "2024-01-15",
    lotNumbers: ["LOT001", "LOT002"],
    description: "Potential contamination with foreign particles detected in specific lots"
  },
  {
    id: "2",
    drugName: "Sample Drug B",
    manufacturer: "Another Pharma",
    reason: "Labeling error",
    severity: "medium",
    date: "2024-01-10",
    lotNumbers: ["LOT003"],
    description: "Incorrect dosage information on product labels"
  },
  {
    id: "3",
    drugName: "Generic Metformin",
    manufacturer: "Generic Pharma",
    reason: "NDMA contamination",
    severity: "high",
    date: "2024-01-20",
    lotNumbers: ["LOT004", "LOT005", "LOT006"],
    description: "NDMA levels above acceptable limits detected in certain lots"
  }
] 