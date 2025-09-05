// Core interfaces for mock data
export interface HealthAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  source?: string
}

export interface DrugInfo {
  name: string
  genericName: string
  description: string
  dosage: string
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  manufacturer: string
  activeIngredient: string
  pregnancyCategory: string
  ndcNumber: string
  fdaApprovalDate: string
  breastfeedingInfo: string
}

export interface SymptomInfo {
  name: string
  description: string
  severity: "mild" | "moderate" | "severe"
  category: string
  relatedSymptoms: string[]
  recommendations: string[]
  emergency: boolean
}

export interface ProviderInfo {
  id: string
  name: string
  type: "hospital" | "clinic" | "pharmacy" | "emergency"
  specialty: string
  address: string
  phone: string
  email: string
  rating: number
  distance: number
  availability: string
  services: string[]
}

export interface VaccinationInfo {
  name: string
  description: string
  ageGroups: string[]
  schedule: string
  sideEffects: string[]
  contraindications: string[]
  effectiveness: string
  manufacturer: string
}

export interface OutbreakInfo {
  disease: string
  location: string
  cases: number
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "contained" | "resolved"
  preventionMeasures: string[]
  lastUpdated: string
}

export interface ConversationData {
  id: string
  userId: string
  channel: "whatsapp" | "sms" | "web"
  language: string
  messages: MessageData[]
  intent: string
  status: "active" | "resolved" | "cancelled" | "escalated" | "pending"
  createdAt: string
  updatedAt: string
  duration: number
  satisfaction: number
  // Additional properties for mobile admin
  messageCount?: number
  lastActivity?: string
}

export interface MessageData {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: string
  status: "sent" | "delivered" | "failed" | "pending"
  language: string
  intent?: string
  confidence?: number
}

export interface AnalyticsData {
  totalUsers: number
  totalConversations: number
  totalMessages: number
  averageResponseTime: number
  satisfactionScore: number
  topIntents: Array<{ intent: string; count: number }>
  channelDistribution: Array<{ channel: string; count: number }>
  languageDistribution: Array<{ language: string; count: number; percentage?: number; value?: number; color?: string }>
  dailyStats: Array<{ date: string; conversations: number; messages: number }>
  // Additional properties for the admin dashboard
  emergencyAlerts?: number
  intentAccuracy?: number
  dailyUsage?: Array<{ date: string; conversations: number; users: number }>
  intentDistribution?: Array<{ intent: string; count: number; color: string }>
  // New properties for mobile responsive admin
  activeAlerts?: number
  successRate?: number
  conversationTrends?: Array<{ date: string; conversations: number }>
  recentActivity?: Array<{ description: string; timestamp: string; type: string }>
}

export interface EmergencyAlert {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  timestamp: string
  status: "active" | "resolved" | "cancelled"
  affectedAreas: string[]
  recommendations: string[]
}

export interface IntentData {
  id: string
  name: string
  description: string
  examples: string[]
  responses: string[]
  confidence: number
  language: string
  category: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface APIMonitorData {
  endpoint: string
  status: "healthy" | "degraded" | "down"
  responseTime: number
  uptime: number
  lastCheck: string
  errorRate: number
  requestCount: number
  successRate: number
}

export interface ContentData {
  id: string
  type: "faq" | "response" | "translation" | "intent"
  language: string
  content: string
  category: string
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  author: string
  version: number
}

export interface MessagingData {
  channel: "whatsapp" | "sms" | "email"
  status: "active" | "inactive" | "error"
  configuration: any
  statistics: {
    totalSent: number
    totalDelivered: number
    totalFailed: number
    successRate: number
  }
  lastActivity: string
} 