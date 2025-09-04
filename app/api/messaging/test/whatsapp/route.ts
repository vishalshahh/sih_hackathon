import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const config = await request.json()

    // Test WhatsApp API connection
    const response = await fetch(`https://graph.facebook.com/v18.0/${config.phoneNumberId}`, {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ success: true, message: "WhatsApp connection successful" })
    } else {
      return NextResponse.json({ success: false, error: "Invalid WhatsApp credentials" })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Connection test failed" })
  }
}
