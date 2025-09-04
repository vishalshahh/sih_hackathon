"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone, Settings, Send, CheckCircle, XCircle } from "lucide-react"

export function MessagingIntegration() {
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumberId: "",
    accessToken: "",
    webhookVerifyToken: "",
    businessAccountId: "",
  })

  const [smsConfig, setSmsConfig] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
  })

  const [testMessage, setTestMessage] = useState("")
  const [testPhone, setTestPhone] = useState("")
  const [connectionStatus, setConnectionStatus] = useState({
    whatsapp: false,
    sms: false,
  })

  const testWhatsAppConnection = async () => {
    try {
      // Test WhatsApp API connection
      const response = await fetch("/api/messaging/test/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(whatsappConfig),
      })

      const result = await response.json()
      setConnectionStatus((prev) => ({ ...prev, whatsapp: result.success }))
    } catch (error) {
      setConnectionStatus((prev) => ({ ...prev, whatsapp: false }))
    }
  }

  const testSMSConnection = async () => {
    try {
      // Test SMS API connection
      const response = await fetch("/api/messaging/test/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smsConfig),
      })

      const result = await response.json()
      setConnectionStatus((prev) => ({ ...prev, sms: result.success }))
    } catch (error) {
      setConnectionStatus((prev) => ({ ...prev, sms: false }))
    }
  }

  const sendTestMessage = async (channel: "whatsapp" | "sms") => {
    try {
      const response = await fetch("/api/messaging/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          to: testPhone,
          message: testMessage,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert(`Test message sent successfully via ${channel}!`)
      } else {
        alert(`Failed to send test message: ${result.error}`)
      }
    } catch (error) {
      alert("Error sending test message")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-emerald-600" />
        <h2 className="text-2xl font-bold">Messaging Integration</h2>
      </div>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            WhatsApp
            {connectionStatus.whatsapp ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            SMS
            {connectionStatus.sms ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                WhatsApp Business API Configuration
              </CardTitle>
              <CardDescription>
                Configure your WhatsApp Business API credentials for healthcare messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                  <Input
                    id="phoneNumberId"
                    value={whatsappConfig.phoneNumberId}
                    onChange={(e) => setWhatsappConfig((prev) => ({ ...prev, phoneNumberId: e.target.value }))}
                    placeholder="Enter WhatsApp Phone Number ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    value={whatsappConfig.accessToken}
                    onChange={(e) => setWhatsappConfig((prev) => ({ ...prev, accessToken: e.target.value }))}
                    placeholder="Enter WhatsApp Access Token"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookToken">Webhook Verify Token</Label>
                  <Input
                    id="webhookToken"
                    value={whatsappConfig.webhookVerifyToken}
                    onChange={(e) => setWhatsappConfig((prev) => ({ ...prev, webhookVerifyToken: e.target.value }))}
                    placeholder="Enter Webhook Verify Token"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAccountId">Business Account ID</Label>
                  <Input
                    id="businessAccountId"
                    value={whatsappConfig.businessAccountId}
                    onChange={(e) => setWhatsappConfig((prev) => ({ ...prev, businessAccountId: e.target.value }))}
                    placeholder="Enter Business Account ID"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={testWhatsAppConnection} variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Badge variant={connectionStatus.whatsapp ? "default" : "destructive"}>
                  {connectionStatus.whatsapp ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Create a WhatsApp Business Account</li>
                  <li>2. Set up a WhatsApp Business API application</li>
                  <li>
                    3. Configure webhook URL: <code>/api/messaging/whatsapp</code>
                  </li>
                  <li>4. Add the credentials above and test the connection</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                SMS Configuration (Twilio)
              </CardTitle>
              <CardDescription>Configure your Twilio credentials for SMS healthcare messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountSid">Account SID</Label>
                  <Input
                    id="accountSid"
                    value={smsConfig.accountSid}
                    onChange={(e) => setSmsConfig((prev) => ({ ...prev, accountSid: e.target.value }))}
                    placeholder="Enter Twilio Account SID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authToken">Auth Token</Label>
                  <Input
                    id="authToken"
                    type="password"
                    value={smsConfig.authToken}
                    onChange={(e) => setSmsConfig((prev) => ({ ...prev, authToken: e.target.value }))}
                    placeholder="Enter Twilio Auth Token"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={smsConfig.phoneNumber}
                    onChange={(e) => setSmsConfig((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="Enter Twilio Phone Number (e.g., +1234567890)"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={testSMSConnection} variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Badge variant={connectionStatus.sms ? "default" : "destructive"}>
                  {connectionStatus.sms ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Create a Twilio account</li>
                  <li>2. Purchase a phone number for SMS</li>
                  <li>
                    3. Configure webhook URL: <code>/api/messaging/sms</code>
                  </li>
                  <li>4. Add the credentials above and test the connection</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test Messaging
              </CardTitle>
              <CardDescription>Send test messages to verify your integrations are working</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testPhone">Test Phone Number</Label>
                <Input
                  id="testPhone"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="Enter phone number (e.g., +1234567890)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testMessage">Test Message</Label>
                <Input
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Enter test message"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => sendTestMessage("whatsapp")}
                  disabled={!connectionStatus.whatsapp || !testPhone || !testMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send via WhatsApp
                </Button>
                <Button
                  onClick={() => sendTestMessage("sms")}
                  disabled={!connectionStatus.sms || !testPhone || !testMessage}
                  variant="outline"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Send via SMS
                </Button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Healthcare Message Examples:</h4>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p>• "I have a fever and headache"</p>
                  <p>• "What vaccines do I need?"</p>
                  <p>• "Emergency - chest pain"</p>
                  <p>• "Side effects of paracetamol"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
