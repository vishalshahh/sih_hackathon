// Mock data for vaccinations
import { VaccinationInfo } from './types'

export const mockVaccinations: VaccinationInfo[] = [
  {
    name: "COVID-19",
    description: "Protects against COVID-19 infection and severe disease",
    ageGroups: ["12+ years", "5-11 years", "6 months-4 years"],
    schedule: "Primary series: 2 doses, 3-4 weeks apart. Booster: 5 months after primary series",
    sideEffects: ["Pain at injection site", "Fatigue", "Headache", "Muscle pain", "Fever", "Chills"],
    contraindications: ["Severe allergic reaction to previous dose", "Known allergy to vaccine components"],
    effectiveness: "95% effective against severe disease",
    manufacturer: "Various manufacturers"
  },
  {
    name: "Influenza",
    description: "Annual flu vaccine to protect against seasonal influenza",
    ageGroups: ["6 months+ years"],
    schedule: "Annual vaccination recommended before flu season",
    sideEffects: ["Soreness at injection site", "Mild fever", "Fatigue", "Muscle aches", "Headache"],
    contraindications: ["Severe allergic reaction to eggs", "Previous severe reaction to flu vaccine"],
    effectiveness: "40-60% effective depending on flu strain match",
    manufacturer: "Various manufacturers"
  },
  {
    name: "Hepatitis B",
    description: "Protects against hepatitis B virus infection",
    ageGroups: ["All ages"],
    schedule: "3 doses: 0, 1, and 6 months",
    sideEffects: ["Soreness at injection site", "Mild fever", "Fatigue", "Headache"],
    contraindications: ["Severe allergic reaction to previous dose", "Known allergy to vaccine components"],
    effectiveness: "95% effective with complete series",
    manufacturer: "Various manufacturers"
  },
  {
    name: "MMR",
    description: "Protects against measles, mumps, and rubella",
    ageGroups: ["12-15 months", "4-6 years"],
    schedule: "2 doses: first at 12-15 months, second at 4-6 years",
    sideEffects: ["Mild fever", "Rash", "Swollen glands", "Joint pain"],
    contraindications: ["Severe allergic reaction to previous dose", "Pregnancy", "Severe immunodeficiency"],
    effectiveness: "97% effective against measles, 88% against mumps, 97% against rubella",
    manufacturer: "Various manufacturers"
  },
  {
    name: "DTaP",
    description: "Protects against diphtheria, tetanus, and pertussis (whooping cough)",
    ageGroups: ["2 months-6 years"],
    schedule: "5 doses: 2, 4, 6, 15-18 months, and 4-6 years",
    sideEffects: ["Soreness at injection site", "Mild fever", "Fussiness", "Fatigue"],
    contraindications: ["Severe allergic reaction to previous dose", "Encephalopathy within 7 days of previous dose"],
    effectiveness: "95% effective against diphtheria, 100% against tetanus, 84% against pertussis",
    manufacturer: "Various manufacturers"
  },
  {
    name: "HPV",
    description: "Protects against human papillomavirus and related cancers",
    ageGroups: ["11-12 years", "13-26 years (catch-up)"],
    schedule: "2 doses (ages 11-14) or 3 doses (ages 15-26): 0, 1-2, and 6 months",
    sideEffects: ["Pain at injection site", "Redness", "Swelling", "Mild fever", "Headache"],
    contraindications: ["Severe allergic reaction to previous dose", "Known allergy to vaccine components"],
    effectiveness: "99% effective against HPV types 16 and 18",
    manufacturer: "Various manufacturers"
  }
]

export const mockVaccinationSchedules = [
  {
    age: "Birth-2 months",
    vaccines: ["Hepatitis B (1st dose)"],
    notes: "Given at birth or before hospital discharge"
  },
  {
    age: "2 months",
    vaccines: ["DTaP (1st dose)", "Hib (1st dose)", "IPV (1st dose)", "PCV13 (1st dose)", "RV (1st dose)"],
    notes: "First comprehensive vaccination visit"
  },
  {
    age: "4 months",
    vaccines: ["DTaP (2nd dose)", "Hib (2nd dose)", "IPV (2nd dose)", "PCV13 (2nd dose)", "RV (2nd dose)"],
    notes: "Second dose of primary series"
  },
  {
    age: "6 months",
    vaccines: ["DTaP (3rd dose)", "Hib (3rd dose)", "IPV (3rd dose)", "PCV13 (3rd dose)", "RV (3rd dose)", "Influenza (annual)"],
    notes: "Third dose of primary series, flu vaccine can start"
  },
  {
    age: "12-15 months",
    vaccines: ["MMR (1st dose)", "Varicella (1st dose)", "Hib (4th dose)", "PCV13 (4th dose)"],
    notes: "Important milestone vaccinations"
  },
  {
    age: "4-6 years",
    vaccines: ["DTaP (5th dose)", "IPV (4th dose)", "MMR (2nd dose)", "Varicella (2nd dose)"],
    notes: "School entry vaccinations"
  },
  {
    age: "11-12 years",
    vaccines: ["HPV (1st dose)", "Tdap", "Meningococcal (1st dose)"],
    notes: "Adolescent vaccinations"
  },
  {
    age: "16-18 years",
    vaccines: ["Meningococcal (2nd dose)"],
    notes: "Booster for meningococcal protection"
  }
] 