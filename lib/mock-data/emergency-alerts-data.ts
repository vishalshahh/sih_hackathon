// Mock data for emergency alerts
import { EmergencyAlert } from './types'

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: "alert-1",
    title: "Severe Thunderstorm Warning",
    message: "A severe thunderstorm warning is in effect for your area until 8 PM EST. Seek shelter immediately.",
    severity: "high",
    location: "New York, NY",
    timestamp: "2024-03-08T18:00:00Z",
    status: "active",
    affectedAreas: ["Manhattan", "Bronx", "Queens"],
    recommendations: ["Seek sturdy shelter", "Stay away from windows", "Unplug electronics"]
  },
  {
    id: "alert-2",
    title: "Air Quality Alert",
    message: "An air quality alert has been issued due to elevated ozone levels. Sensitive groups should limit outdoor activities.",
    severity: "medium",
    location: "Los Angeles, CA",
    timestamp: "2024-03-08T09:00:00Z",
    status: "active",
    affectedAreas: ["Los Angeles County"],
    recommendations: ["Limit outdoor activities", "Keep windows closed", "Use air purifiers"]
  },
  {
    id: "alert-3",
    title: "Flash Flood Watch",
    message: "A flash flood watch is in effect until tomorrow morning. Be prepared for potential flooding.",
    severity: "low",
    location: "Houston, TX",
    timestamp: "2024-03-07T22:00:00Z",
    status: "active",
    affectedAreas: ["Harris County", "Galveston County"],
    recommendations: ["Do not drive through flooded roads", "Monitor local weather updates", "Have an emergency kit ready"]
  },
  {
    id: "alert_001",
    title: "High Fever Alert",
    message: "Multiple cases of high fever reported in downtown area. Seek medical attention if symptoms persist.",
    severity: "high",
    location: "Downtown Area",
    timestamp: "2024-01-15T14:30:00Z",
    status: "active",
    affectedAreas: ["Downtown", "Central District"],
    recommendations: ["Monitor temperature", "Seek medical attention if fever > 102°F", "Stay hydrated"]
  },
  {
    id: "alert_002",
    title: "Drug Recall Notice",
    message: "Recall of Sample Drug A due to contamination. Check your medications and contact pharmacy.",
    severity: "critical",
    location: "Nationwide",
    timestamp: "2024-01-15T10:00:00Z",
    status: "active",
    affectedAreas: ["All areas"],
    recommendations: ["Check medication labels", "Contact pharmacy", "Do not use affected lots"]
  }
]