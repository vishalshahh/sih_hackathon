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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Healthcare Chatbot Administration</h1>
        <p className="text-muted-foreground">
          Monitor performance, manage content, and ensure quality healthcare assistance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="intents">Intent Management</TabsTrigger>
          <TabsTrigger value="apis">API Monitor</TabsTrigger>
          <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
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
