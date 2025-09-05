"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Plus, Send, Clock, MapPin, Users } from "lucide-react"

const mockEmergencyAlerts = [
  {
    id: "alert_001",
    title: "Dengue Outbreak Alert",
    description: "Increased dengue cases reported in urban areas. Take preventive measures.",
    severity: "high",
    location: "Mumbai, Maharashtra",
    affectedUsers: 15000,
    createdAt: "2024-01-15T08:00:00Z",
    status: "active",
    responses: 1250,
  },
  {
    id: "alert_002",
    title: "Seasonal Flu Advisory",
    description: "Flu season is active. Get vaccinated and follow hygiene protocols.",
    severity: "medium",
    location: "National",
    affectedUsers: 50000,
    createdAt: "2024-01-14T12:00:00Z",
    status: "active",
    responses: 3200,
  },
  {
    id: "alert_003",
    title: "Air Quality Warning",
    description: "Poor air quality levels detected. Limit outdoor activities.",
    severity: "medium",
    location: "Delhi NCR",
    affectedUsers: 8500,
    createdAt: "2024-01-13T18:00:00Z",
    status: "resolved",
    responses: 890,
  },
]

export function EmergencyAlerts() {
  const [isCreatingAlert, setIsCreatingAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    severity: "medium",
    location: "",
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "resolved":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateAlert = () => {
    // Handle alert creation logic here
    console.log("Creating alert:", newAlert)
    setIsCreatingAlert(false)
    setNewAlert({ title: "", description: "", severity: "medium", location: "" })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Emergency Alerts</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and broadcast emergency health alerts to users</p>
        </div>
        <Button onClick={() => setIsCreatingAlert(true)} className="text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Create Alert Form */}
      {isCreatingAlert && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Create New Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Alert Title</label>
                <Input
                  placeholder="Enter alert title"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Severity</label>
                <select
                  className="w-full p-2 border border-input rounded-md text-sm"
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Enter affected location"
                value={newAlert.location}
                onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Enter alert description"
                value={newAlert.description}
                onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateAlert} className="text-sm">
                <Send className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingAlert(false)}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockEmergencyAlerts
            .filter((alert) => alert.status === "active")
            .map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg">{alert.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getSeverityColor(alert.severity)}`}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      <span>{alert.affectedUsers.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span>{alert.responses} responses</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <div className="space-y-3">
          {mockEmergencyAlerts
            .filter((alert) => alert.status !== "active")
            .map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm sm:text-base">{alert.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {alert.location} • {alert.affectedUsers.toLocaleString()} users
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getSeverityColor(alert.severity)}`}
                      >
                        {alert.severity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(alert.status)}`}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
