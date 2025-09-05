"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, MessageSquare, AlertTriangle, TrendingUp, Globe, Activity } from "lucide-react"
import { MockDataService } from "@/lib/mock-data-service"

export function AnalyticsDashboard() {
  const mockAnalytics = MockDataService.getAnalyticsData()

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Key Metrics - Mobile responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="text-lg sm:text-2xl font-bold">{mockAnalytics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Conversations</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="text-lg sm:text-2xl font-bold">{mockAnalytics.totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="text-lg sm:text-2xl font-bold">{mockAnalytics.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+2</span> new today
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="text-lg sm:text-2xl font-bold">{mockAnalytics.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Conversation Trends Chart */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <CardHeader className="px-0 pb-3">
            <CardTitle className="text-sm sm:text-base font-medium">Conversation Trends</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics.conversationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '12px',
                      padding: '8px',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Language Distribution Chart */}
        <Card className="p-3 sm:p-4 lg:p-6">
          <CardHeader className="px-0 pb-3">
            <CardTitle className="text-sm sm:text-base font-medium">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalytics.languageDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockAnalytics.languageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '12px',
                      padding: '8px',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Mobile optimized */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <CardHeader className="px-0 pb-3">
          <CardTitle className="text-sm sm:text-base font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-2 sm:space-y-3">
            {mockAnalytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs px-2 py-1"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
