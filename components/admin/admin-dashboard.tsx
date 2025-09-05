"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { ConversationMonitor } from "./conversation-monitor"
import { IntentManagement } from "./intent-management"
import { HealthAPIMonitor } from "./health-api-monitor"
import { EmergencyAlerts } from "./emergency-alerts"
import ContentManagement from "./content-management"
import { MessagingIntegration } from "./messaging-integration"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="px-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
          Healthcare Chatbot Administration
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          Manage and monitor your healthcare chatbot system
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-optimized tabs with horizontal scroll */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid w-full min-w-max grid-cols-7 gap-1 p-1 h-auto">
            <TabsTrigger 
              value="analytics" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-wrap"
            >
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">📊</span>
            </TabsTrigger>
            <TabsTrigger 
              value="conversations" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Conversations</span>
              <span className="sm:hidden">💬</span>
            </TabsTrigger>
            <TabsTrigger 
              value="intents" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2"
            >
              <span className="hidden sm:inline">Intents</span>
              <span className="sm:hidden">🎯</span>
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">API Monitor</span>
              <span className="sm:hidden">🔌</span>
            </TabsTrigger>
            <TabsTrigger 
              value="alerts" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Alerts</span>
              <span className="sm:hidden">⚠️</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Content</span>
              <span className="sm:hidden">📝</span>
            </TabsTrigger>
            <TabsTrigger 
              value="messaging" 
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Messaging</span>
              <span className="sm:hidden">✉️</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analytics" className="mt-3 sm:mt-4 lg:mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="conversations" className="mt-3 sm:mt-4 lg:mt-6">
          <ConversationMonitor />
        </TabsContent>

        <TabsContent value="intents" className="mt-3 sm:mt-4 lg:mt-6">
          <IntentManagement />
        </TabsContent>

        <TabsContent value="api" className="mt-3 sm:mt-4 lg:mt-6">
          <HealthAPIMonitor />
        </TabsContent>

        <TabsContent value="alerts" className="mt-3 sm:mt-4 lg:mt-6">
          <EmergencyAlerts />
        </TabsContent>

        <TabsContent value="content" className="mt-3 sm:mt-4 lg:mt-6">
          <ContentManagement />
        </TabsContent>

        <TabsContent value="messaging" className="mt-3 sm:mt-4 lg:mt-6">
          <MessagingIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
