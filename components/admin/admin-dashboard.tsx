"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { ConversationMonitor } from "./conversation-monitor"
import { IntentManagement } from "./intent-management"
import { HealthAPIMonitor } from "./health-api-monitor"
import { EmergencyAlerts } from "./emergency-alerts"
import { ContentManagement } from "./content-management"
import { MessagingIntegration } from "./messaging-integration"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Healthcare Chatbot Administration</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor performance, manage content, and ensure quality healthcare assistance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto">
          <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="conversations" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Conversations</span>
            <span className="sm:hidden">Chats</span>
          </TabsTrigger>
          <TabsTrigger value="intents" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Intent Management</span>
            <span className="sm:hidden">Intents</span>
          </TabsTrigger>
          <TabsTrigger value="apis" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">API Monitor</span>
            <span className="sm:hidden">APIs</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Emergency Alerts</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Content</span>
            <span className="sm:hidden">Content</span>
          </TabsTrigger>
          <TabsTrigger value="messaging" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Messaging</span>
            <span className="sm:hidden">Messages</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="conversations">
          <ConversationMonitor />
        </TabsContent>

        <TabsContent value="intents">
          <IntentManagement />
        </TabsContent>

        <TabsContent value="apis">
          <HealthAPIMonitor />
        </TabsContent>

        <TabsContent value="alerts">
          <EmergencyAlerts />
        </TabsContent>

        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>

        <TabsContent value="messaging">
          <MessagingIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
