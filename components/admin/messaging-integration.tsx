"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Settings, TestTube, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

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

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "bg-green-100 text-green-800"
      case "sms":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendTest = () => {
    console.log("Sending test message:", testMessage)
    // Handle test message sending logic here
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Messaging Integration</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage WhatsApp and SMS messaging services</p>
        </div>
        <Button className="text-sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Message Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{mockMessageStats.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">WhatsApp</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{mockMessageStats.whatsappMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">58% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">SMS</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{mockMessageStats.smsMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">42% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{mockMessageStats.deliveryRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="test" className="text-xs sm:text-sm">Test Messages</TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">Message History</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">WhatsApp</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{mockMessageStats.whatsappMessages.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">messages</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">SMS</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{mockMessageStats.smsMessages.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">messages</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Delivery Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivery Rate</span>
                    <span className="text-sm font-medium">{mockMessageStats.deliveryRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Rate</span>
                    <span className="text-sm font-medium">{mockMessageStats.responseRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TestTube className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Send Test Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Channel</label>
                  <select
                    className="w-full p-2 border border-input rounded-md text-sm"
                    value={testMessage.channel}
                    onChange={(e) => setTestMessage({ ...testMessage, channel: e.target.value })}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient</label>
                  <Input
                    placeholder="Enter phone number"
                    value={testMessage.recipient}
                    onChange={(e) => setTestMessage({ ...testMessage, recipient: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Enter test message..."
                  value={testMessage.message}
                  onChange={(e) => setTestMessage({ ...testMessage, message: e.target.value })}
                  rows={3}
                  className="text-sm"
                />
              </div>
              
              <Button onClick={handleSendTest} className="text-sm">
                <Send className="w-4 h-4 mr-2" />
                Send Test Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getChannelColor(message.channel)}`}
                        >
                          {message.channel}
                        </Badge>
                        <span className="text-sm font-medium">{message.recipient}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(message.status)}`}
                        >
                          {message.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">{message.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">WhatsApp Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">API Token</label>
                  <Input
                    placeholder="Enter WhatsApp API token"
                    className="text-sm"
                    defaultValue="••••••••••••••••"
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

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">SMS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">API Key</label>
                  <Input
                    placeholder="Enter SMS API key"
                    className="text-sm"
                    defaultValue="••••••••••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sender ID</label>
                  <Input
                    placeholder="Enter sender ID"
                    className="text-sm"
                    defaultValue="HEALTHBOT"
                  />
                </div>
                <Button size="sm" className="text-xs">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
   