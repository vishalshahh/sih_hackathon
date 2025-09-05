"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Clock, RefreshCw, Server, Zap } from "lucide-react"
import { MockDataService } from "@/lib/mock-data-service"

export function HealthAPIMonitor() {
  const [refreshing, setRefreshing] = useState(false)
  const mockAPIData = MockDataService.getAPIMonitorData()

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "down":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const healthyAPIs = mockAPIData.filter(api => api.status === 'healthy').length
  const degradedAPIs = mockAPIData.filter(api => api.status === 'degraded').length
  const downAPIs = mockAPIData.filter(api => api.status === 'down').length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">API Health Monitor</h2>
          <p className="text-sm text-muted-foreground">
            Monitor the health and performance of all healthcare APIs
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-green-600">{healthyAPIs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Degraded</p>
                <p className="text-2xl font-bold text-yellow-600">{degradedAPIs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Down</p>
                <p className="text-2xl font-bold text-red-600">{downAPIs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total APIs</p>
                <p className="text-2xl font-bold">{mockAPIData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Status List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">API Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAPIData.map((api) => (
              <div key={api.endpoint} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(api.status)}
                    <div>
                      <h3 className="font-medium">{api.endpoint}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last checked: {formatTimestamp(api.lastCheck)}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(api.status)}>
                    {api.status}
                  </Badge>
                </div>
                
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
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium">{api.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Error Rate</p>
                    <p className="font-medium text-red-600">{api.errorRate}%</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{api.uptime}%</span>
                  </div>
                  <Progress value={api.uptime} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
