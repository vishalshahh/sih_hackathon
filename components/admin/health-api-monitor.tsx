"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Activity, Database, Globe, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const mockAPIStatus = [
  {
    name: "CoWIN Vaccination API",
    endpoint: "https://cdn-api.co-vin.in/api",
    status: "operational",
    responseTime: 245,
    uptime: 99.8,
    lastCheck: "2 minutes ago",
    dailyRequests: 1250,
    errorRate: 0.2,
  },
  {
    name: "WHO Health Data API",
    endpoint: "https://covid19.who.int/api",
    status: "operational",
    responseTime: 180,
    uptime: 99.9,
    lastCheck: "1 minute ago",
    dailyRequests: 890,
    errorRate: 0.1,
  },
  {
    name: "RxNorm Drug Database",
    endpoint: "https://rxnav.nlm.nih.gov/REST",
    status: "degraded",
    responseTime: 1200,
    uptime: 97.5,
    lastCheck: "3 minutes ago",
    dailyRequests: 2100,
    errorRate: 2.5,
  },
  {
    name: "FDA Drug Information",
    endpoint: "https://api.fda.gov",
    status: "operational",
    responseTime: 320,
    uptime: 99.5,
    lastCheck: "1 minute ago",
    dailyRequests: 650,
    errorRate: 0.5,
  },
  {
    name: "Healthcare Provider Directory",
    endpoint: "https://api.healthcare.gov",
    status: "maintenance",
    responseTime: 0,
    uptime: 95.2,
    lastCheck: "15 minutes ago",
    dailyRequests: 420,
    errorRate: 0,
  },
]

export function HealthAPIMonitor() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "maintenance":
        return <Clock className="w-4 h-4 text-blue-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const getResponseTimeColor = (time: number) => {
    if (time < 300) return "text-green-600"
    if (time < 800) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Health API Monitor</h2>
          <p className="text-muted-foreground">Monitor external health API integrations and performance</p>
        </div>
        <Button variant="outline">
          <Activity className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">APIs Operational</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/5</div>
            <p className="text-xs text-muted-foreground">60% operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">389ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">+15%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Requests</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,310</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.66%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.1%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Status List */}
      <div className="space-y-4">
        {mockAPIStatus.map((api, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(api.status)}
                  <div>
                    <h3 className="font-semibold">{api.name}</h3>
                    <p className="text-sm text-muted-foreground">{api.endpoint}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(api.status)}>{api.status}</Badge>
                  <Button variant="outline" size="sm">
                    Test API
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Response Time</p>
                  <p className={`text-lg font-bold ${getResponseTimeColor(api.responseTime)}`}>
                    {api.responseTime > 0 ? `${api.responseTime}ms` : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Uptime</p>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">{api.uptime}%</p>
                    <Progress value={api.uptime} className="h-1" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Daily Requests</p>
                  <p className="text-lg font-bold">{api.dailyRequests.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Error Rate</p>
                  <p className={`text-lg font-bold ${api.errorRate > 1 ? "text-red-600" : "text-green-600"}`}>
                    {api.errorRate}%
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Last Check</p>
                  <p className="text-sm text-muted-foreground">{api.lastCheck}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            API Usage Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Most Used API</h4>
              <p className="text-sm text-muted-foreground">RxNorm Drug Database</p>
              <p className="text-lg font-bold">2,100 requests/day</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Fastest API</h4>
              <p className="text-sm text-muted-foreground">WHO Health Data API</p>
              <p className="text-lg font-bold">180ms avg</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Most Reliable</h4>
              <p className="text-sm text-muted-foreground">WHO Health Data API</p>
              <p className="text-lg font-bold">99.9% uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
