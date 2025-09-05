// Mock data for analytics and reporting
import { AnalyticsData } from './types'

export const mockAnalytics: AnalyticsData = {
  totalUsers: 15420,
  totalConversations: 45680,
  totalMessages: 234560,
  averageResponseTime: 850,
  satisfactionScore: 4.6,
  // Add missing properties
  activeAlerts: 12,
  successRate: 94.2,
  conversationTrends: [
    { date: "2024-01-15", conversations: 1250 },
    { date: "2024-01-14", conversations: 1180 },
    { date: "2024-01-13", conversations: 1320 },
    { date: "2024-01-12", conversations: 1100 },
    { date: "2024-01-11", conversations: 1280 },
    { date: "2024-01-10", conversations: 1150 },
    { date: "2024-01-09", conversations: 1200 }
  ],
  recentActivity: [
    {
      description: "New user registered from WhatsApp",
      timestamp: "2 minutes ago",
      type: "user"
    },
    {
      description: "Emergency alert triggered in Mumbai",
      timestamp: "15 minutes ago",
      type: "alert"
    },
    {
      description: "Drug interaction query resolved",
      timestamp: "1 hour ago",
      type: "conversation"
    },
    {
      description: "API health check completed",
      timestamp: "2 hours ago",
      type: "system"
    },
    {
      description: "New conversation started",
      timestamp: "3 hours ago",
      type: "conversation"
    }
  ],
  topIntents: [
    { intent: "symptoms_fever", count: 1250 },
    { intent: "drug_info", count: 980 },
    { intent: "vaccination", count: 750 },
    { intent: "emergency", count: 320 },
    { intent: "appointment", count: 280 },
    { intent: "symptoms_headache", count: 240 },
    { intent: "drug_interactions", count: 180 },
    { intent: "provider_search", count: 160 },
    { intent: "symptoms_cough", count: 140 },
    { intent: "vaccination_schedule", count: 120 }
  ],
  channelDistribution: [
    { channel: "whatsapp", count: 25680 },
    { channel: "sms", count: 12000 },
    { channel: "web", count: 8000 }
  ],
  languageDistribution: [
    { language: "en", count: 28000, percentage: 65.1, value: 28000, color: "#8884d8" },
    { language: "hi", count: 12000, percentage: 27.9, value: 12000, color: "#82ca9d" },
    { language: "es", count: 4000, percentage: 9.3, value: 4000, color: "#ffc658" },
    { language: "ar", count: 1680, percentage: 3.9, value: 1680, color: "#ff7300" }
  ],
  dailyStats: [
    { date: "2024-01-15", conversations: 1250, messages: 6800 },
    { date: "2024-01-14", conversations: 1180, messages: 6200 },
    { date: "2024-01-13", conversations: 1320, messages: 7100 },
    { date: "2024-01-12", conversations: 1100, messages: 5900 },
    { date: "2024-01-11", conversations: 1280, messages: 6500 },
    { date: "2024-01-10", conversations: 1150, messages: 6100 },
    { date: "2024-01-09", conversations: 1200, messages: 6400 }
  ],
  // Additional properties needed by the component
  emergencyAlerts: 12,
  intentAccuracy: 94.2,
  dailyUsage: [
    { date: "2024-01-15", conversations: 1250, users: 850 },
    { date: "2024-01-14", conversations: 1180, users: 820 },
    { date: "2024-01-13", conversations: 1320, users: 920 },
    { date: "2024-01-12", conversations: 1100, users: 780 },
    { date: "2024-01-11", conversations: 1280, users: 890 },
    { date: "2024-01-10", conversations: 1150, users: 810 },
    { date: "2024-01-09", conversations: 1200, users: 850 }
  ],
  intentDistribution: [
    { intent: "symptoms_fever", count: 1250, color: "#8884d8" },
    { intent: "drug_info", count: 980, color: "#82ca9d" },
    { intent: "vaccination", count: 750, color: "#ffc658" },
    { intent: "emergency", count: 320, color: "#ff7300" },
    { intent: "appointment", count: 280, color: "#00ff00" },
    { intent: "symptoms_headache", count: 240, color: "#0088fe" },
    { intent: "drug_interactions", count: 180, color: "#00c49f" },
    { intent: "provider_search", count: 160, color: "#ffbb28" },
    { intent: "symptoms_cough", count: 140, color: "#ff8042" },
    { intent: "vaccination_schedule", count: 120, color: "#8884d8" }
  ]
} 