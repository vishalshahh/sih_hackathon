import { type NextRequest, NextResponse } from "next/server"
import { HealthcareIntentProcessor } from "@/lib/healthcare-intents"
import { WhatsAppService } from "@/lib/whatsapp-integration"

const whatsappConfig = {
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
  webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "",
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "",
}

const whatsappService = new WhatsAppService(whatsappConfig)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === whatsappConfig.webhookVerifyToken) {
    return new NextResponse(challenge)
  }

  return new NextResponse("Forbidden", { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "messages") {
            const messages = change.value.messages
            if (messages) {
              for (const message of messages) {
                if (message.type === "text") {
                  await handleTextMessage(message, change.value.contacts[0])
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleTextMessage(message: any, contact: any) {
  const userMessage = message.text.body
  const userPhone = message.from
  const userName = contact.profile?.name || "User"

  // Detect language from message or use default
  const language = detectLanguage(userMessage)

  // Process healthcare intent
  const { intent, entities } = HealthcareIntentProcessor.detectIntent(userMessage, language)
  const response = await HealthcareIntentProcessor.generateResponse(intent, entities, userMessage, language)

  // Format response for WhatsApp
  let whatsappMessage = `Hello ${userName}! 👋\n\n${response.response}`

  if (response.urgencyLevel === "emergency") {
    whatsappMessage = `🚨 *EMERGENCY* 🚨\n\n${response.response}\n\n*Please seek immediate medical attention!*`
  }

  if (response.followUpQuestions && response.followUpQuestions.length > 0) {
    whatsappMessage += "\n\n*Follow-up questions:*\n"
    response.followUpQuestions.forEach((question, index) => {
      whatsappMessage += `${index + 1}. ${question}\n`
    })
  }

  if (response.disclaimers && response.disclaimers.length > 0) {
    whatsappMessage += "\n\n*Important:* " + response.disclaimers.join(" ")
  }

  // Send response back to user
  await whatsappService.sendMessage(userPhone, whatsappMessage)

  // Log conversation for analytics
  console.log(`WhatsApp conversation: ${userPhone} - Intent: ${intent} - Urgency: ${response.urgencyLevel}`)
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
