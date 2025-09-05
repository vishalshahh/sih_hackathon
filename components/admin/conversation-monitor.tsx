"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, MessageSquare, Clock, User, AlertTriangle } from "lucide-react"

const mockConversations = [
  {
    id: "conv_001",
    userId: "user_123",
    userName: "John Doe",
    language: "English",
    startTime: "2024-01-15T10:30:00Z",
    lastMessage: "2024-01-15T10:45:00Z",
    messageCount: 12,
    intent: "symptoms_fever",
    urgencyLevel: "medium",
    status: "active",
    preview: "I've been having a high fever for the past 2 days...",
  },
  {
    id: "conv_002",
    userId: "user_456",
    userName: "Sarah Wilson",
    language: "Hindi",
    startTime: "2024-01-15T09:15:00Z",
    lastMessage: "2024-01-15T09:30:00Z",
    messageCount: 8,
    intent: "medication",
    urgencyLevel: "low",
    status: "resolved",
    preview: "Can you tell me about the side effects of...",
  },
  {
    id: "conv_003",
    userId: "user_789",
    userName: "Ahmed Hassan",
    language: "Arabic",
    startTime: "2024-01-15T08:45:00Z",
    lastMessage: "2024-01-15T09:00:00Z",
    messageCount: 15,
    intent: "emergency",
    urgencyLevel: "emergency",
    status: "active",
    preview: "I'm experiencing severe chest pain and shortness of breath...",
  },
  {
    id: "conv_004",
    userId: "user_321",
    userName: "Maria Garcia",
    language: "Spanish",
    startTime: "2024-01-15T07:20:00Z",
    lastMessage: "2024-01-15T07:35:00Z",
    messageCount: 6,
    intent: "vaccination",
    urgencyLevel: "low",
    status: "resolved",
    preview: "When should I get my flu vaccination?",
  },
  {
    id: "conv_005",
    userId: "user_555",
    userName: "Robert Smith",
    language: "English",
    startTime: "2024-01-15T11:00:00Z",
    lastMessage: "2024-01-15T11:15:00Z",
    messageCount: 8,
    intent: "emergency",
    urgencyLevel: "emergency",
    status: "active",
    preview: "I think I'm having a heart attack, severe chest pain...",
  },
  {
    id: "conv_006",
    userId: "user_666",
    userName: "Lisa Johnson",
    language: "English",
    startTime: "2024-01-15T09:30:00Z",
    lastMessage: "2024-01-15T09:45:00Z",
    messageCount: 10,
    intent: "emergency",
    urgencyLevel: "high",
    status: "active",
    preview: "My child is unconscious and not breathing properly...",
  },
]

export function ConversationMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (filterStatus === "all") {
      matchesStatus = true
    } else if (filterStatus === "active") {
      matchesStatus = conv.status === "active"
    } else if (filterStatus === "resolved") {
      matchesStatus = conv.status === "resolved"
    } else if (filterStatus === "emergency") {
      matchesStatus = conv.urgencyLevel === "emergency" || conv.urgencyLevel === "high"
    }
    
    return matchesSearch && matchesStatus
  })

  const selectedConv = mockConversations.find((conv) => conv.id === selectedConversation)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Conversation Monitor</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor and analyze user conversations in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-sm"
              />
            </div>
          </div>

          <Tabs value={filterStatus} onValueChange={setFilterStatus}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
              <TabsTrigger value="resolved" className="text-xs">Resolved</TabsTrigger>
              <TabsTrigger value="emergency" className="text-xs">Emergency</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-96 sm:h-[600px]">
            <div className="space-y-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className={`cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? "ring-2 ring-primary"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{conversation.userName}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getUrgencyColor(conversation.urgencyLevel)}`}
                          >
                            {conversation.urgencyLevel}
                          </Badge>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {conversation.preview}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(conversation.lastMessage).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{conversation.messageCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {conversation.intent}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(conversation.status)}`}
                          >
                            {conversation.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {filterStatus === "emergency" 
                      ? "No emergency conversations found"
                      : `No ${filterStatus} conversations found`
                    }
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConv ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base sm:text-lg">{selectedConv.userName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Conversation ID: {selectedConv.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getUrgencyColor(selectedConv.urgencyLevel)}`}
                    >
                      {selectedConv.urgencyLevel}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(selectedConv.status)}`}
                    >
                      {selectedConv.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Language</p>
                    <p className="font-medium">{selectedConv.language}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Messages</p>
                    <p className="font-medium">{selectedConv.messageCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">
                      {new Date(selectedConv.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Activity</p>
                    <p className="font-medium">
                      {new Date(selectedConv.lastMessage).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Intent Classification</p>
                  <Badge variant="secondary" className="text-sm">
                    {selectedConv.intent}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Conversation Preview</p>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{selectedConv.preview}</p>
                  </div>
                </div>
                
                {selectedConv.urgencyLevel === "emergency" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-800">
                      Emergency conversation - consider immediate escalation
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a conversation to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
