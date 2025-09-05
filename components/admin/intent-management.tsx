"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Target, TrendingUp, AlertCircle } from "lucide-react"

const mockIntentData = [
  {
    name: "symptoms_fever",
    accuracy: 96.5,
    confidence: 0.92,
    totalQueries: 3200,
    successfulMatches: 3088,
    keywords: ["fever", "temperature", "hot", "chills", "sweating"],
    responses: 3,
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    name: "emergency",
    accuracy: 99.2,
    confidence: 0.98,
    totalQueries: 450,
    successfulMatches: 446,
    keywords: ["emergency", "urgent", "help", "chest pain", "heart attack"],
    responses: 1,
    lastUpdated: "2024-01-14",
    status: "active",
  },
  {
    name: "medication",
    accuracy: 89.3,
    confidence: 0.85,
    totalQueries: 2100,
    successfulMatches: 1875,
    keywords: ["medicine", "drug", "prescription", "dosage", "side effects"],
    responses: 5,
    lastUpdated: "2024-01-13",
    status: "needs_review",
  },
  {
    name: "vaccination",
    accuracy: 94.1,
    confidence: 0.91,
    totalQueries: 1800,
    successfulMatches: 1694,
    keywords: ["vaccine", "vaccination", "immunization", "shot", "covid"],
    responses: 4,
    lastUpdated: "2024-01-12",
    status: "active",
  },
]

export function IntentManagement() {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const selectedIntentData = mockIntentData.find((intent) => intent.name === selectedIntent)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "needs_review":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Intent Management</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and optimize chatbot intent recognition</p>
        </div>
        <Button className="text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Intent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Intent List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Intent Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockIntentData.map((intent) => (
                <div
                  key={intent.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIntent === intent.name
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedIntent(intent.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm sm:text-base">{intent.name}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(intent.status)}`}
                    >
                      {intent.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium">{intent.accuracy}%</span>
                    </div>
                    
                    <Progress value={intent.accuracy} className="h-2" />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{intent.totalQueries} queries</span>
                      <span>{intent.successfulMatches} matches</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Intent Details */}
        <div className="lg:col-span-2">
          {selectedIntentData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">{selectedIntentData.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(selectedIntentData.status)}`}
                    >
                      {selectedIntentData.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{selectedIntentData.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {(selectedIntentData.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedIntentData.totalQueries.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Queries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedIntentData.responses}
                    </div>
                    <div className="text-xs text-muted-foreground">Responses</div>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-3">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntentData.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Performance Chart */}
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-3">Performance Trend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium">
                        {((selectedIntentData.successfulMatches / selectedIntentData.totalQueries) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(selectedIntentData.successfulMatches / selectedIntentData.totalQueries) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground">
                  Last updated: {selectedIntentData.lastUpdated}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select an intent to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
