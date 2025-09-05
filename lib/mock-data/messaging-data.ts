// Mock data for messaging integration
import { MessagingData } from './types'

export const mockMessagingData: MessagingData[] = [
  {
    channel: "whatsapp",
    status: "active",
    configuration: {
      apiUrl: "https://api.whatsapp.com",
      webhookUrl: "https://your-domain.com/webhook/whatsapp",
      accessToken: "encrypted_token_here",
      phoneNumberId: "1234567890",
      businessAccountId: "9876543210"
    },
    statistics: {
      totalSent: 25680,
      totalDelivered: 25420,
      totalFailed: 260,
      successRate: 99.0
    },
    lastActivity: "2024-01-15T10:00:00Z"
  },
  {
    channel: "sms",
    status: "active",
    configuration: {
      provider: "Twilio",
      accountSid: "encrypted_sid_here",
      authToken: "encrypted_token_here",
      fromNumber: "+1234567890",
      webhookUrl: "https://your-domain.com/webhook/sms"
    },
    statistics: {
      totalSent: 12000,
      totalDelivered: 11800,
      totalFailed: 200,
      successRate: 98.3
    },
    lastActivity: "2024-01-15T09:45:00Z"
  },
  {
    channel: "email",
    status: "inactive",
    configuration: {
      provider: "SendGrid",
      apiKey: "encrypted_key_here",
      fromEmail: "noreply@healthcare.com",
      fromName: "Healthcare Bot",
      webhookUrl: "https://your-domain.com/webhook/email"
    },
    statistics: {
      totalSent: 0,
      totalDelivered: 0,
      totalFailed: 0,
      successRate: 0
    },
    lastActivity: "2024-01-01T00:00:00Z"
  },
  {
    channel: "telegram",
    status: "active",
    configuration: {
      botToken: "encrypted_bot_token_here",
      webhookUrl: "https://your-domain.com/webhook/telegram",
      botUsername: "healthcare_bot",
      chatId: "123456789"
    },
    statistics: {
      totalSent: 8500,
      totalDelivered: 8400,
      totalFailed: 100,
      successRate: 98.8
    },
    lastActivity: "2024-01-15T09:30:00Z"
  },
  {
    channel: "facebook",
    status: "degraded",
    configuration: {
      pageAccessToken: "encrypted_token_here",
      webhookUrl: "https://your-domain.com/webhook/facebook",
      pageId: "123456789012345",
      appSecret: "encrypted_secret_here"
    },
    statistics: {
      totalSent: 3200,
      totalDelivered: 3100,
      totalFailed: 100,
      successRate: 96.9
    },
    lastActivity: "2024-01-15T08:15:00Z"
  }
] 