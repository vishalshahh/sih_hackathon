"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Clock, RefreshCw, Server, Zap } from "lucide-react"

const mockAPIData = [
  {
    name: "Drug Information API",
    endpoint: "https://api.healthbot.com/drugs",
    status: "operational",
    responseTime: 120,
    uptime: 99.9,
    lastChecked: "2024-01-15T10:30:00Z",
    requests: 15420,
    errors: 12,
  },
  {
    name: "Symptom Checker API",
    endpoint: "https://api.healthbot.com/symptoms",
    status: "degraded",
    responseTime: 850,
    uptime: 98.5,
    lastChecked: "2024-01-15T10:30:00Z",
    requests: 8934,
    errors: 45,
  },
  {
    name: "Vaccination Schedule API",
    endpoint: "https://api.healthbot.com/vaccination",
    status: "operational",
    responseTime: 95,
    uptime: 99.8,
    lastChecked: "2024-01-15T10:30:00Z",
    requests: 3200,
    errors: 3,
  },
  {
    name: "Emergency Alerts API",
    endpoint: "https://api.healthbot.com/alerts",
    status: "operational",
    responseTime: 200,
    uptime: 99.9,
    lastChecked: "2024-01-15T10:30:00Z",
    requests: 450,
    errors: 1,
  },
]

const mockRecentErrors = [
  {
    id: "error_001",
    api: "Symptom Checker API",
    error: "Timeout after 5 seconds",
    timestamp: "2024-01-15T10:25:00Z",
    severity: "medium",
  },
  {
    id: "error_002",
    api: "Drug Information API",
    error: "Rate limit exceeded",
    timestamp: "2024-01-15T09:45:00Z",
    severity: "low",
  },
  {
    id: "error_003",
    api: "Symptom Checker API",
    error: "Database connection failed",
    timestamp: "2024-01-15T08:30:00Z",
    severity: "high",
  },
]

export function HealthAPIMonitor() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "outage":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Health API Monitor</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor API performance and health status</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="text-sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* API Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total APIs</CardTitle>
            <Server className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{mockAPIData.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">3 operational</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">
              {Math.round(mockAPIData.reduce((acc, api) => acc + api.responseTime, 0) / mockAPIData.length)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15ms</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">
              {mockAPIData.reduce((acc, api) => acc + api.requests, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">
              {((mockAPIData.reduce((acc, api) => acc + api.errors, 0) / 
                 mockAPIData.reduce((acc, api) => acc + api.requests, 0)) * 100).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.1%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="apis" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
          <TabsTrigger value="apis" className="text-xs sm:text-sm">API Status</TabsTrigger>
          <TabsTrigger value="errors" className="text-xs sm:text-sm">Recent Errors</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {mockAPIData.map((api) => (
              <Card key={api.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base sm:text-lg">{api.name}</CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground">{api.endpoint}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(api.status)}`}
                    >
                      {api.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium">{api.responseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">{api.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Requests</p>
                      <p className="font-medium">{api.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Errors</p>
                      <p className="font-medium text-red-600">{api.errors}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Uptime</span>
                      <span>{api.uptime}%</span>
                    </div>
                    <Progress value={api.uptime} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Recent Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentErrors.map((error) => (
                  <div key={error.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm sm:text-base">{error.api}</h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getSeverityColor(error.severity)}`}
                        >
                          {error.severity}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{error.error}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(error.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAPIData.map((api) => (
                    <div key={api.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{api.name}</span>
                        <span className="font-medium">{api.responseTime}ms</span>
                      </div>
                      <Progress 
                        value={Math.min((api.responseTime / 1000) * 100, 100)} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Error Rate by API</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAPIData.map((api) => {
                    const errorRate = (api.errors / api.requests) * 100
                    return (
                      <div key={api.name}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{api.name}</span>
                          <span className="font-medium">{errorRate.toFixed(2)}%</span>
                        </div>
                        <Progress value={errorRate} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
