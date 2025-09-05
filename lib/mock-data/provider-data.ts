 // Mock data for healthcare providers
import { ProviderInfo } from './types'

export const mockProviders: ProviderInfo[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "hospital",
    specialty: "Emergency Medicine",
    address: "123 Main St, New York, NY 10001",
    phone: "+1-555-0123",
    email: "info@citygeneral.com",
    rating: 4.5,
    distance: 2.3,
    availability: "24/7",
    services: ["Emergency Care", "Surgery", "Cardiology", "Neurology", "Pediatrics", "Trauma Care"]
  },
  {
    id: "2",
    name: "Downtown Medical Clinic",
    type: "clinic",
    specialty: "Family Medicine",
    address: "456 Oak Ave, New York, NY 10002",
    phone: "+1-555-0456",
    email: "appointments@downtownclinic.com",
    rating: 4.2,
    distance: 1.8,
    availability: "Mon-Fri 8AM-6PM",
    services: ["General Practice", "Preventive Care", "Vaccinations", "Health Screenings", "Chronic Disease Management"]
  },
  {
    id: "3",
    name: "Central Pharmacy",
    type: "pharmacy",
    specialty: "Prescription Filling",
    address: "789 Pine St, New York, NY 10003",
    phone: "+1-555-0789",
    email: "pharmacy@centralpharm.com",
    rating: 4.7,
    distance: 0.9,
    availability: "Mon-Sun 7AM-10PM",
    services: ["Prescription Filling", "Over-the-counter medications", "Health consultations", "Vaccinations", "Medication counseling"]
  },
  {
    id: "4",
    name: "Emergency Care Center",
    type: "emergency",
    specialty: "Trauma Care",
    address: "321 Elm Dr, New York, NY 10004",
    phone: "+1-555-0321",
    email: "emergency@carecenter.com",
    rating: 4.8,
    distance: 3.1,
    availability: "24/7",
    services: ["Emergency Care", "Trauma Surgery", "Critical Care", "Ambulance Services", "Urgent Care"]
  },
  {
    id: "5",
    name: "Metro Health Center",
    type: "clinic",
    specialty: "Internal Medicine",
    address: "654 Broadway, New York, NY 10005",
    phone: "+1-555-0654",
    email: "info@metrohealth.com",
    rating: 4.3,
    distance: 2.1,
    availability: "Mon-Fri 7AM-7PM, Sat 8AM-2PM",
    services: ["Internal Medicine", "Diabetes Care", "Hypertension Management", "Preventive Care", "Lab Services"]
  },
  {
    id: "6",
    name: "Children's Medical Center",
    type: "hospital",
    specialty: "Pediatrics",
    address: "987 Park Ave, New York, NY 10006",
    phone: "+1-555-0987",
    email: "info@childrensmedical.com",
    rating: 4.6,
    distance: 2.8,
    availability: "24/7",
    services: ["Pediatric Care", "Emergency Pediatrics", "Vaccinations", "Well-child Visits", "Specialty Care"]
  },
  {
    id: "7",
    name: "Community Health Pharmacy",
    type: "pharmacy",
    specialty: "Community Pharmacy",
    address: "147 5th Ave, New York, NY 10007",
    phone: "+1-555-0147",
    email: "info@communitypharm.com",
    rating: 4.4,
    distance: 1.5,
    availability: "Mon-Sat 8AM-9PM, Sun 9AM-6PM",
    services: ["Prescription Services", "Health Screenings", "Vaccinations", "Medication Therapy Management", "Home Delivery"]
  },
  {
    id: "8",
    name: "Urgent Care Plus",
    type: "emergency",
    specialty: "Urgent Care",
    address: "258 3rd St, New York, NY 10008",
    phone: "+1-555-0258",
    email: "info@urgentcareplus.com",
    rating: 4.1,
    distance: 1.2,
    availability: "Mon-Sun 7AM-11PM",
    services: ["Urgent Care", "Minor Injuries", "Illness Treatment", "X-rays", "Lab Tests", "Vaccinations"]
  }
]

export const mockSpecialties = [
  "Emergency Medicine", "Internal Medicine", "Surgery", "Family Medicine", "Pediatrics",
  "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Ophthalmology",
  "Prescription Filling", "Vaccinations", "Trauma Care", "Critical Care", "Urgent Care",
  "Community Pharmacy", "Medication Therapy Management", "Health Screenings"
]