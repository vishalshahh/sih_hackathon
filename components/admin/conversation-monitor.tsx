"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react"

const mockConversations = [
  {
    id: "conv_001",
    userId: "user_12345",
    startTime: "2024-01-15T10:30:00Z",
    endTime: "2024-01-15T10:35:00Z",
    language: "en",
    intent: "symptoms_fever",
    urgencyLevel: "medium",
    resolved: true,
    satisfaction: 4,
    messages: [
      { type: "user", content: "I have a fever and headache", timestamp: "10:30:15" },
      { type: "bot", content: "I understand you're experiencing fever and headache...", timestamp: "10:30:18" },
      { type: "user", content: "It's been 2 days now", timestamp: "10:31:22" },
      { type: "bot", content: "For fever lasting 2 days, I recommend...", timestamp: "10:31:25" },
    ],
  },
  {
    id: "conv_002",
    userId: "user_67890",
    startTime: "2024-01-15T11:15:00Z",
    endTime: "2024-01-15T11:18:00Z",
    language: "hi",
    intent: "emergency",
    urgencyLevel: "emergency",
    resolved: true,
    satisfaction: 5,
    messages: [
      { type: "user", content: "मुझे सांस लेने में तकलीफ हो रही है", timestamp: "11:15:10" },
      { type: "bot", content: "🚨 MEDICAL EMERGENCY DETECTED 🚨", timestamp: "11:15:12" },
      { type: "user", content: "क्या करूं?", timestamp: "11:15:45" },
      { type: "bot", content: "तुरंत 108 पर कॉल करें या निकटतम अस्पताल जाएं", timestamp: "11:15:47" },
    ],
  },
  {
    id: "conv_003",
    userId: "user_11111",
    startTime: "2024-01-15T14:20:00Z",
    endTime: null,
    language: "es",
    intent: "medication",
    urgencyLevel: "low",
    resolved: false,
    satisfaction: null,
    messages: [
      { type: "user", content: "¿Puedo tomar ibuprofeno con paracetamol?", timestamp: "14:20:05" },
      { type: "bot", content: "Puedo ayudarte con información sobre medicamentos...", timestamp: "14:20:08" },
      { type: "user", content: "Tengo dolor de espalda", timestamp: "14:21:15" },
    ],
  },
]

export function ConversationMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch =
      conv.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.intent.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && !conv.resolved) ||
      (filterStatus === "resolved" && conv.resolved) ||
      (filterStatus === "emergency" && conv.urgencyLevel === "emergency")

    return matchesSearch && matchesFilter
  })

  const selectedConv = mockConversations.find((conv) => conv.id === selectedConversation)

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conversation Monitor</h2>
          <p className="text-muted-foreground">Monitor and analyze user conversations in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={filterStatus} onValueChange={setFilterStatus}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{conversation.userId}</span>
                        <div className="flex items-center gap-1">
                          {conversation.resolved ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-600" />
                          )}
                          {conversation.urgencyLevel === "emergency" && (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {conversation.language}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getUrgencyColor(conversation.urgencyLevel)}`}>
                          {conversation.urgencyLevel}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground">Intent: {conversation.intent.replace("_", " ")}</p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(conversation.startTime).toLocaleString()}
                      </p>

                      {conversation.satisfaction && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Rating:</span>
                          <span className="text-xs font-medium">{conversation.satisfaction}/5</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConv ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Conversation Details</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedConv.language}</Badge>
                    <Badge className={getUrgencyColor(selectedConv.urgencyLevel)}>{selectedConv.urgencyLevel}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">User ID:</span> {selectedConv.userId}
                  </div>
                  <div>
                    <span className="font-medium">Intent:</span> {selectedConv.intent}
                  </div>
                  <div>
                    <span className="font-medium">Start Time:</span> {new Date(selectedConv.startTime).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {selectedConv.resolved ? "Resolved" : "Active"}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Messages</h4>
                  <ScrollArea className="h-[400px] border rounded-lg p-4">
                    <div className="space-y-4">
                      {selectedConv.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {selectedConv.satisfaction && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">User Satisfaction:</span>
                    <Badge variant="secondary">{selectedConv.satisfaction}/5 stars</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[600px]">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
