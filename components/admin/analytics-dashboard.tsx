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

const mockAnalytics = {
  totalUsers: 15420,
  totalConversations: 8934,
  emergencyAlerts: 23,
  avgResponseTime: 1.2,
  intentAccuracy: 94.5,
  languageDistribution: [
    { language: "English", users: 8500, percentage: 55 },
    { language: "Hindi", users: 4200, percentage: 27 },
    { language: "Spanish", users: 1800, percentage: 12 },
    { language: "Arabic", users: 920, percentage: 6 },
  ],
  dailyUsage: [
    { date: "Mon", conversations: 1200, users: 800 },
    { date: "Tue", conversations: 1400, users: 950 },
    { date: "Wed", conversations: 1100, users: 750 },
    { date: "Thu", conversations: 1600, users: 1100 },
    { date: "Fri", conversations: 1800, users: 1200 },
    { date: "Sat", conversations: 900, users: 600 },
    { date: "Sun", conversations: 800, users: 550 },
  ],
  intentDistribution: [
    { intent: "Symptoms", count: 3200, color: "#059669" },
    { intent: "Medication", count: 2100, color: "#10b981" },
    { intent: "Vaccination", count: 1800, color: "#34d399" },
    { intent: "Emergency", count: 450, color: "#ef4444" },
    { intent: "Appointment", count: 1200, color: "#3b82f6" },
    { intent: "General", count: 184, color: "#6b7280" },
  ],
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.emergencyAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> in last 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intent Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.intentAccuracy}%</div>
            <Progress value={mockAnalytics.intentAccuracy} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Daily Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.dailyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Intent Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Intent Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.intentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockAnalytics.intentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Language Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.languageDistribution.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{lang.language}</Badge>
                  <span className="text-sm text-muted-foreground">{lang.users.toLocaleString()} users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={lang.percentage} className="w-20" />
                  <span className="text-sm font-medium">{lang.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.avgResponseTime}s</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Target: &lt;2s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Based on 2,341 ratings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <Progress value={87.3} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Issues resolved without escalation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
