// Mock data for conversations and messaging
import { ConversationData, MessageData } from './types'

export const mockConversations: ConversationData[] = [
  {
    id: "conv_001",
    userId: "user_123",
    channel: "whatsapp",
    language: "en",
    messages: [
      {
        id: "msg_001",
        content: "I have a fever and headache",
        sender: "user",
        timestamp: "2024-01-15T10:00:00Z",
        status: "delivered",
        language: "en",
        intent: "symptoms_fever"
      },
      {
        id: "msg_002",
        content: "I understand you're experiencing fever and headache. How long have you had these symptoms?",
        sender: "bot",
        timestamp: "2024-01-15T10:00:30Z",
        status: "delivered",
        language: "en",
        intent: "symptoms_fever",
        confidence: 0.95
      },
      {
        id: "msg_003",
        content: "Since yesterday morning",
        sender: "user",
        timestamp: "2024-01-15T10:01:00Z",
        status: "delivered",
        language: "en",
        intent: "symptoms_fever"
      },
      {
        id: "msg_004",
        content: "Thank you. What's your current temperature reading?",
        sender: "bot",
        timestamp: "2024-01-15T10:01:15Z",
        status: "delivered",
        language: "en",
        intent: "symptoms_fever",
        confidence: 0.92
      }
    ],
    intent: "symptoms_fever",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:01:15Z",
    duration: 75,
    satisfaction: 4.5,
    messageCount: 4,
    lastActivity: "2 minutes ago"
  },
  {
    id: "conv_002",
    userId: "user_456",
    channel: "sms",
    language: "hi",
    messages: [
      {
        id: "msg_005",
        content: "मुझे दवा की जानकारी चाहिए",
        sender: "user",
        timestamp: "2024-01-15T09:30:00Z",
        status: "delivered",
        language: "hi",
        intent: "drug_info"
      },
      {
        id: "msg_006",
        content: "मैं आपकी दवा की जानकारी में मदद कर सकता हूं। कृपया दवा का नाम बताएं।",
        sender: "bot",
        timestamp: "2024-01-15T09:30:15Z",
        status: "delivered",
        language: "hi",
        intent: "drug_info",
        confidence: 0.92
      }
    ],
    intent: "drug_info",
    status: "resolved",
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T09:35:00Z",
    duration: 300,
    satisfaction: 4.8,
    messageCount: 2,
    lastActivity: "1 hour ago"
  },
  {
    id: "conv_003",
    userId: "user_789",
    channel: "web",
    language: "en",
    messages: [
      {
        id: "msg_007",
        content: "I need to find a doctor near me",
        sender: "user",
        timestamp: "2024-01-15T08:45:00Z",
        status: "delivered",
        language: "en",
        intent: "provider_search"
      },
      {
        id: "msg_008",
        content: "I can help you find healthcare providers in your area. What's your location?",
        sender: "bot",
        timestamp: "2024-01-15T08:45:10Z",
        status: "delivered",
        language: "en",
        intent: "provider_search",
        confidence: 0.88
      }
    ],
    intent: "provider_search",
    status: "pending",
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-01-15T08:45:10Z",
    duration: 10,
    satisfaction: 0,
    messageCount: 2,
    lastActivity: "3 hours ago"
  },
  {
    id: "conv_004",
    userId: "user_101",
    channel: "whatsapp",
    language: "es",
    messages: [
      {
        id: "msg_009",
        content: "Tengo una emergencia médica",
        sender: "user",
        timestamp: "2024-01-15T07:20:00Z",
        status: "delivered",
        language: "es",
        intent: "emergency"
      },
      {
        id: "msg_010",
        content: "Entiendo que tienes una emergencia médica. ¿Puedes describir los síntomas?",
        sender: "bot",
        timestamp: "2024-01-15T07:20:05Z",
        status: "delivered",
        language: "es",
        intent: "emergency",
        confidence: 0.99
      }
    ],
    intent: "emergency",
    status: "escalated",
    createdAt: "2024-01-15T07:20:00Z",
    updatedAt: "2024-01-15T07:25:00Z",
    duration: 300,
    satisfaction: 5.0,
    messageCount: 2,
    lastActivity: "5 hours ago"
  }
]

export const mockMessages: MessageData[] = [
  // This can be populated with individual messages if needed
] 