export interface WhatsAppConfig {
  phoneNumberId: string
  accessToken: string
  webhookVerifyToken: string
  businessAccountId: string
}

export interface SMSConfig {
  accountSid: string
  authToken: string
  phoneNumber: string
}

export class WhatsAppService {
  private config: WhatsAppConfig

  constructor(config: WhatsAppConfig) {
    this.config = config
  }

  async sendMessage(to: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${this.config.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "text",
          text: {
            body: message,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("WhatsApp message send error:", error)
      return false
    }
  }

  async sendTemplateMessage(to: string, templateName: string, parameters: string[]): Promise<boolean> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${this.config.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: parameters.map((param) => ({
                  type: "text",
                  text: param,
                })),
              },
            ],
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("WhatsApp template message send error:", error)
      return false
    }
  }
}

export class SMSService {
  private config: SMSConfig

  constructor(config: SMSConfig) {
    this.config = config
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      const auth = Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${this.config.accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: this.config.phoneNumber,
            To: to,
            Body: message,
          }),
        },
      )

      return response.ok
    } catch (error) {
      console.error("SMS send error:", error)
      return false
    }
  }
}

export class MessagingService {
  private whatsappService?: WhatsAppService
  private smsService?: SMSService

  constructor(whatsappConfig?: WhatsAppConfig, smsConfig?: SMSConfig) {
    if (whatsappConfig) {
      this.whatsappService = new WhatsAppService(whatsappConfig)
    }
    if (smsConfig) {
      this.smsService = new SMSService(smsConfig)
    }
  }

  async sendHealthcareMessage(
    to: string,
    message: string,
    preferredChannel: "whatsapp" | "sms" = "whatsapp",
  ): Promise<{ success: boolean; channel: string; error?: string }> {
    if (preferredChannel === "whatsapp" && this.whatsappService) {
      const success = await this.whatsappService.sendMessage(to, message)
      if (success) {
        return { success: true, channel: "whatsapp" }
      }
      // Fallback to SMS if WhatsApp fails
      if (this.smsService) {
        const smsSuccess = await this.smsService.sendSMS(to, message)
        return {
          success: smsSuccess,
          channel: smsSuccess ? "sms" : "failed",
          error: smsSuccess ? undefined : "Both WhatsApp and SMS failed",
        }
      }
      return { success: false, channel: "failed", error: "WhatsApp failed and no SMS fallback" }
    }

    if (preferredChannel === "sms" && this.smsService) {
      const success = await this.smsService.sendSMS(to, message)
      return {
        success,
        channel: success ? "sms" : "failed",
        error: success ? undefined : "SMS send failed",
      }
    }

    return { success: false, channel: "failed", error: "No messaging service configured" }
  }

  async sendEmergencyAlert(to: string[], message: string): Promise<void> {
    const promises = to.map(async (phoneNumber) => {
      // Try WhatsApp first for emergency alerts
      if (this.whatsappService) {
        const success = await this.whatsappService.sendMessage(phoneNumber, `🚨 EMERGENCY ALERT 🚨\n\n${message}`)
        if (success) return
      }

      // Fallback to SMS
      if (this.smsService) {
        await this.smsService.sendSMS(phoneNumber, `EMERGENCY ALERT: ${message}`)
      }
    })

    await Promise.all(promises)
  }
}
