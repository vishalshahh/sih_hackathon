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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Emergency Alerts</h2>
          <p className="text-muted-foreground">Manage and broadcast emergency health alerts to users</p>
        </div>
        <Button onClick={() => setIsCreatingAlert(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently broadcasting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65,000</div>
            <p className="text-xs text-muted-foreground">Users notified today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">Users engaged with alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2min</div>
            <p className="text-xs text-muted-foreground">Time to user engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Alert Form */}
      {isCreatingAlert && (
        <Card>
          <CardHeader>
            <CardTitle>Create Emergency Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Alert Title</label>
              <Input
                placeholder="Enter alert title..."
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Enter detailed alert description..."
                value={newAlert.description}
                onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Severity Level</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="e.g., Mumbai, National"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateAlert}>
                <Send className="w-4 h-4 mr-2" />
                Broadcast Alert
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingAlert(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Alerts</h3>
        {mockEmergencyAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{alert.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{alert.affectedUsers.toLocaleString()} users</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {alert.status === "active" && (
                    <>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold">{alert.responses}</div>
                  <div className="text-xs text-muted-foreground">User Responses</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{Math.round((alert.responses / alert.affectedUsers) * 100)}%</div>
                  <div className="text-xs text-muted-foreground">Engagement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">
                    {Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / (1000 * 60 * 60))}h
                  </div>
                  <div className="text-xs text-muted-foreground">Time Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Guidelines */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Alert Guidelines:</strong> Emergency alerts should be used for urgent health situations that require
          immediate user attention. Ensure accuracy and provide clear, actionable guidance. High-severity alerts will be
          sent via push notifications and SMS.
        </AlertDescription>
      </Alert>
    </div>
  )
}
