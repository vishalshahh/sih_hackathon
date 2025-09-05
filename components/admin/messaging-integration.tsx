"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Settings, TestTube, Users, Clock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"

const mockMessageStats = {
  totalMessages: 15420,
  whatsappMessages: 8934,
  smsMessages: 6486,
  deliveryRate: 98.5,
  responseRate: 85.2,
}

const mockRecentMessages = [
  {
    id: "msg_001",
    channel: "whatsapp",
    recipient: "+1234567890",
    message: "Your appointment is confirmed for tomorrow at 2 PM",
    status: "delivered",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "msg_002",
    channel: "sms",
    recipient: "+0987654321",
    message: "Emergency alert: High fever symptoms detected",
    status: "sent",
    timestamp: "2024-01-15T10:25:00Z",
  },
  {
    id: "msg_003",
    channel: "whatsapp",
    recipient: "+1122334455",
    message: "Thank you for using our health service",
    status: "delivered",
    timestamp: "2024-01-15T10:20:00Z",
  },
]

export function MessagingIntegration() {
  const [testMessage, setTestMessage] = useState({
    channel: "whatsapp",
    recipient: "",
    message: "",
  })
  
  // State for API key visibility
  const [showWhatsAppAPI, setShowWhatsAppAPI] = useState(false)
  const [showSMSAPI, setShowSMSAPI] = useState(false)
  const [showEmailAPI, setShowEmailAPI] = useState(false)

  const handleSendTest = () => {
    console.log("Sending test message:", testMessage)
    // In a real app, this would send the test message
  }

  const toggleAPIVisibility = (type: 'whatsapp' | 'sms' | 'email') => {
    switch (type) {
      case 'whatsapp':
        setShowWhatsAppAPI(!showWhatsAppAPI)
        break
      case 'sms':
        setShowSMSAPI(!showSMSAPI)
        break
      case 'email':
        setShowEmailAPI(!showEmailAPI)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messaging Integration</h2>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          All Systems Active
        </Badge>
      </div>

      {/* Message Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{mockMessageStats.totalMessages.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="text-2xl font-bold">{mockMessageStats.whatsappMessages.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SMS</p>
                <p className="text-2xl font-bold">{mockMessageStats.smsMessages.toLocaleString()}</p>
              </div>
              <Send className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">{mockMessageStats.deliveryRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="test">Test Messages</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          {/* WhatsApp Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">WhatsApp Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <div className="relative">
                  <Input
                    type={showWhatsAppAPI ? "text" : "password"}
                    placeholder="Enter WhatsApp API key"
                    className="text-sm pr-10"
                    defaultValue={showWhatsAppAPI ? "sk-1234567890abcdef" : "••••••••••••••••"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => toggleAPIVisibility('whatsapp')}
                  >
                    {showWhatsAppAPI ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number ID</label>
                <Input
                  placeholder="Enter phone number ID"
                  className="text-sm"
                  defaultValue="1234567890"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Webhook URL</label>
                <Input
                  placeholder="Enter webhook URL"
                  className="text-sm"
                  defaultValue="https://api.healthbot.com/webhook/whatsapp"
                />
              </div>
              <Button size="sm" className="text-xs">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* SMS Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">SMS Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <div className="relative">
                  <Input
                    type={showSMSAPI ? "text" : "password"}
                    placeholder="Enter SMS API key"
                    className="text-sm pr-10"
                    defaultValue={showSMSAPI ? "sms_1234567890abcdef" : "••••••••••••••••"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => toggleAPIVisibility('sms')}
                  >
                    {showSMSAPI ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sender ID</label>
                <Input
                  placeholder="Enter sender ID"
                  className="text-sm"
                  defaultValue="HEALTHBOT"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Provider</label>
                <Input
                  placeholder="Enter SMS provider"
                  className="text-sm"
                  defaultValue="Twilio"
                />
              </div>
              <Button size="sm" className="text-xs">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <div className="relative">
                  <Input
                    type={showEmailAPI ? "text" : "password"}
                    placeholder="Enter Email API key"
                    className="text-sm pr-10"
                    defaultValue={showEmailAPI ? "email_1234567890abcdef" : "••••••••••••••••"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => toggleAPIVisibility('email')}
                  >
                    {showEmailAPI ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">SMTP Server</label>
                <Input
                  placeholder="Enter SMTP server"
                  className="text-sm"
                  defaultValue="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Port</label>
                <Input
                  placeholder="Enter port"
                  className="text-sm"
                  defaultValue="587"
                />
              </div>
              <Button size="sm" className="text-xs">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Test Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Send Test Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Channel</label>
                <select
                  value={testMessage.channel}
                  onChange={(e) => setTestMessage({...testMessage, channel: e.target.value})}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Recipient</label>
                <Input
                  placeholder="Enter recipient number/email"
                  value={testMessage.recipient}
                  onChange={(e) => setTestMessage({...testMessage, recipient: e.target.value})}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Enter test message"
                  value={testMessage.message}
                  onChange={(e) => setTestMessage({...testMessage, message: e.target.value})}
                  className="text-sm"
                  rows={3}
                />
              </div>
              <Button onClick={handleSendTest} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Test Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        message.channel === 'whatsapp' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <MessageSquare className={`h-4 w-4 ${
                          message.channel === 'whatsapp' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{message.recipient}</p>
                        <p className="text-xs text-muted-foreground">{message.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={message.status === 'delivered' ? 'default' : 'secondary'}>
                        {message.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
   