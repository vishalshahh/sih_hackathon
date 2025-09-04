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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Intent Management</h2>
          <p className="text-muted-foreground">Manage and optimize chatbot intent recognition</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Intent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intent List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Intent Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockIntentData.map((intent) => (
                <div
                  key={intent.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIntent === intent.name ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedIntent(intent.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{intent.name.replace("_", " ")}</span>
                    <Badge className={getStatusColor(intent.status)}>{intent.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Accuracy</span>
                      <span className="font-medium">{intent.accuracy}%</span>
                    </div>
                    <Progress value={intent.accuracy} className="h-1" />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{intent.totalQueries} queries</span>
                      <span>{intent.responses} responses</span>
                    </div>
                  </div>

                  {intent.accuracy < 90 && (
                    <div className="flex items-center gap-1 mt-2">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span className="text-xs text-yellow-600">Needs optimization</span>
                    </div>
                  )}
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
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedIntentData.name.replace("_", " ")}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedIntentData.status)}>{selectedIntentData.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="performance" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                    <TabsTrigger value="training">Training Data</TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Accuracy
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedIntentData.accuracy}%</div>
                          <Progress value={selectedIntentData.accuracy} className="mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Confidence
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedIntentData.confidence}</div>
                          <Progress value={selectedIntentData.confidence * 100} className="mt-2" />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{selectedIntentData.totalQueries}</div>
                        <div className="text-xs text-muted-foreground">Total Queries</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{selectedIntentData.successfulMatches}</div>
                        <div className="text-xs text-muted-foreground">Successful Matches</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">
                          {selectedIntentData.totalQueries - selectedIntentData.successfulMatches}
                        </div>
                        <div className="text-xs text-muted-foreground">Missed Queries</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="keywords" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Keywords & Phrases</h4>
                      {isEditing ? (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Enter keywords separated by commas"
                            defaultValue={selectedIntentData.keywords.join(", ")}
                            className="min-h-[100px]"
                          />
                          <div className="flex gap-2">
                            <Button size="sm">Save Keywords</Button>
                            <Button variant="outline" size="sm">
                              Test Keywords
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {selectedIntentData.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="responses" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Response Templates</h4>
                      <div className="space-y-3">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">Primary Response</Badge>
                              {isEditing && (
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              I understand you're experiencing{" "}
                              {selectedIntentData.name.includes("fever") ? "fever" : "symptoms"}. Here's what you should
                              know...
                            </p>
                          </CardContent>
                        </Card>

                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Response Template
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="training" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Training Examples</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">"I have a high fever and feel very hot"</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Confidence: 0.95
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Positive
                            </Badge>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">"My temperature is 102°F"</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Confidence: 0.89
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Positive
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 mt-4">
                          <Input placeholder="Add new training example..." />
                          <Button size="sm">Add Training Example</Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[600px]">
                <div className="text-center text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an intent to view details and manage settings</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
