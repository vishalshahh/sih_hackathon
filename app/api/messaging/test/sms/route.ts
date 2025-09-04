import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const config = await request.json()

    // Test Twilio API connection
    const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64")

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}.json`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ success: true, message: "SMS connection successful" })
    } else {
      return NextResponse.json({ success: false, error: "Invalid Twilio credentials" })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Connection test failed" })
  }
}
