import { type NextRequest, NextResponse } from "next/server"
import { HealthcareIntentProcessor } from "@/lib/healthcare-intents"
import { SMSService } from "@/lib/whatsapp-integration"

const smsConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || "",
  authToken: process.env.TWILIO_AUTH_TOKEN || "",
  phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
}

const smsService = new SMSService(smsConfig)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const from = formData.get("From") as string
    const body = formData.get("Body") as string

    if (!from || !body) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Detect language from message
    const language = detectLanguage(body)

    // Process healthcare intent
    const { intent, entities } = HealthcareIntentProcessor.detectIntent(body, language)
    const response = await HealthcareIntentProcessor.generateResponse(intent, entities, body, language)

    // Format response for SMS (160 character limit consideration)
    let smsResponse = response.response

    if (response.urgencyLevel === "emergency") {
      smsResponse = `EMERGENCY: ${response.response.substring(0, 140)}...`
    } else if (smsResponse.length > 160) {
      smsResponse = smsResponse.substring(0, 157) + "..."
    }

    // Send response back to user
    await smsService.sendSMS(from, smsResponse)

    // Log conversation for analytics
    console.log(`SMS conversation: ${from} - Intent: ${intent} - Urgency: ${response.urgencyLevel}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("SMS webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function detectLanguage(message: string): string {
  // Simple language detection based on common words
  const hindiWords = ["है", "का", "की", "में", "से", "को", "और", "यह", "वह"]
  const spanishWords = ["es", "de", "la", "el", "en", "y", "que", "con", "por"]
  const arabicWords = ["في", "من", "إلى", "على", "هذا", "هذه", "التي", "الذي"]

  const lowerMessage = message.toLowerCase()

  if (hindiWords.some((word) => lowerMessage.includes(word))) return "hi"
  if (spanishWords.some((word) => lowerMessage.includes(word))) return "es"
  if (arabicWords.some((word) => lowerMessage.includes(word))) return "ar"

  return "en" // Default to English
}
