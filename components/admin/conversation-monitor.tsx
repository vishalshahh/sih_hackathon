"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Bot,
  Send,
  Download,
  RefreshCw
} from "lucide-react"
import { MockDataService } from "@/lib/mock-data-service"

export function ConversationMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const mockConversations = MockDataService.getConversationData()

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.intent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter
    const matchesChannel = channelFilter === "all" || conv.channel === channelFilter
    return matchesSearch && matchesStatus && matchesChannel
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-3 w-3" />
      case "resolved":
        return <CheckCircle className="h-3 w-3" />
      case "pending":
        return <AlertCircle className="h-3 w-3" />
      case "escalated":
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Mobile-optimized filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Download className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Mobile filter chips */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="text-xs"
          >
            All Status
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
            className="text-xs"
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "resolved" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("resolved")}
            className="text-xs"
          >
            Resolved
          </Button>
          <Button
            variant={channelFilter === "whatsapp" ? "default" : "outline"}
            size="sm"
            onClick={() => setChannelFilter("whatsapp")}
            className="text-xs"
          >
            WhatsApp
          </Button>
          <Button
            variant={channelFilter === "sms" ? "default" : "outline"}
            size="sm"
            onClick={() => setChannelFilter("sms")}
            className="text-xs"
          >
            SMS
          </Button>
        </div>
      </div>

      {/* Conversations List - Mobile optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-96 sm:h-[500px] lg:h-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80 sm:h-[420px] lg:h-[520px]">
                <div className="space-y-2 p-3">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? "bg-primary/10 border-primary"
                          : "bg-card hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                              {conversation.userId}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.intent}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs ${getStatusColor(conversation.status)}`}
                        >
                          {getStatusIcon(conversation.status)}
                          <span className="ml-1 hidden sm:inline">{conversation.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {conversation.messageCount} messages
                        </span>
                        <span>{conversation.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Conversation Details - Mobile full width on small screens */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <Card className="h-96 sm:h-[500px] lg:h-[600px]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base">Conversation Details</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-80 sm:h-[420px] lg:h-[520px]">
                  <div className="space-y-3 p-3">
                    {mockConversations
                      .find(c => c.id === selectedConversation)
                      ?.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex gap-2 ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-2 sm:p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-xs sm:text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a conversation to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
