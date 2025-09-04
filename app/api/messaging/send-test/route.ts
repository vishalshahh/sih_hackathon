import { type NextRequest, NextResponse } from "next/server"
import { MessagingService } from "@/lib/whatsapp-integration"

export async function POST(request: NextRequest) {
  try {
    const { channel, to, message } = await request.json()

    const whatsappConfig = {
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
      webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "",
      businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "",
    }

    const smsConfig = {
      accountSid: process.env.TWILIO_ACCOUNT_SID || "",
      authToken: process.env.TWILIO_AUTH_TOKEN || "",
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
    }

    const messagingService = new MessagingService(whatsappConfig, smsConfig)

    const result = await messagingService.sendHealthcareMessage(to, message, channel)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to send test message" })
  }
}
