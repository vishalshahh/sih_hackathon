// Mock data for disease outbreaks
import { OutbreakInfo } from './types'

export const mockOutbreaks: OutbreakInfo[] = [
  {
    disease: "Seasonal Influenza",
    location: "New York, NY",
    cases: 1250,
    severity: "medium",
    status: "active",
    preventionMeasures: [
      "Get vaccinated annually",
      "Wash hands frequently",
      "Avoid close contact with sick people",
      "Stay home when sick"
    ],
    lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    disease: "Dengue Fever",
    location: "Miami, FL",
    cases: 89,
    severity: "high",
    status: "active",
    preventionMeasures: [
      "Eliminate standing water",
      "Use mosquito repellent",
      "Wear long sleeves and pants",
      "Use mosquito nets"
    ],
    lastUpdated: "2024-01-14T15:45:00Z"
  },
  {
    disease: "COVID-19",
    location: "Los Angeles, CA",
    cases: 567,
    severity: "low",
    status: "contained",
    preventionMeasures: [
      "Get vaccinated and boosted",
      "Wear masks in crowded areas",
      "Maintain social distancing",
      "Practice good hygiene"
    ],
    lastUpdated: "2024-01-13T09:20:00Z"
  }
]

export const mockPreventionMeasures = [
  "Get vaccinated",
  "Wash hands frequently",
  "Avoid close contact with sick people",
  "Eliminate standing water",
  "Use mosquito repellent",
  "Wear long sleeves",
  "Maintain social distancing",
  "Wear masks in crowded areas",
  "Practice good hygiene",
  "Stay home when sick",
  "Cover coughs and sneezes",
  "Clean and disinfect surfaces"
] 