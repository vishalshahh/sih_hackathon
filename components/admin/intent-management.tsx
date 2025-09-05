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
import { MockDataService } from "@/lib/mock-data-service"

export function IntentManagement() {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    examples: "",
    responses: ""
  })

  const mockIntentData = MockDataService.getIntentData()

  const handleEdit = (intent: any) => {
    setSelectedIntent(intent.id)
    setEditData({
      name: intent.name,
      description: intent.description,
      examples: intent.examples.join('\n'),
      responses: intent.responses.join('\n')
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    console.log("Saving intent:", editData)
    setIsEditing(false)
    setSelectedIntent(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSelectedIntent(null)
  }

  const getStatusColor = (active: boolean) => {
    return active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600"
    if (confidence >= 0.7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Intent Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage and configure chatbot intents and responses
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Intent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Intents</p>
                <p className="text-2xl font-bold">{mockIntentData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Intents</p>
                <p className="text-2xl font-bold">
                  {mockIntentData.filter(intent => intent.active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold">
                  {(mockIntentData.reduce((acc, intent) => acc + intent.confidence, 0) / mockIntentData.length * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Intents List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Intents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockIntentData.map((intent) => (
                  <div
                    key={intent.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedIntent === intent.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedIntent(intent.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{intent.name}</h3>
                      <Badge className={getStatusColor(intent.active)}>
                        {intent.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {intent.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {intent.examples.length} examples
                      </span>
                      <span className={getConfidenceColor(intent.confidence)}>
                        {(intent.confidence * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intent Details */}
        <div>
          {selectedIntent ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Intent Details</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(mockIntentData.find(i => i.id === selectedIntent))}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const intent = mockIntentData.find(i => i.id === selectedIntent)
                  if (!intent) return null

                  return (
                    <div className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                              value={editData.name}
                              onChange={(e) => setEditData({...editData, name: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                              value={editData.description}
                              onChange={(e) => setEditData({...editData, description: e.target.value})}
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Examples (one per line)</label>
                            <Textarea
                              value={editData.examples}
                              onChange={(e) => setEditData({...editData, examples: e.target.value})}
                              className="mt-1"
                              rows={4}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Responses (one per line)</label>
                            <Textarea
                              value={editData.responses}
                              onChange={(e) => setEditData({...editData, responses: e.target.value})}
                              className="mt-1"
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Name</label>
                            <p className="text-sm">{intent.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Description</label>
                            <p className="text-sm">{intent.description}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Category</label>
                            <p className="text-sm capitalize">{intent.category}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Language</label>
                            <p className="text-sm uppercase">{intent.language}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Confidence</label>
                            <div className="flex items-center gap-2">
                              <Progress value={intent.confidence * 100} className="flex-1" />
                              <span className="text-sm">{(intent.confidence * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Examples</label>
                            <ul className="text-sm space-y-1">
                              {intent.examples.map((example, index) => (
                                <li key={index} className="text-muted-foreground">• {example}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Responses</label>
                            <ul className="text-sm space-y-1">
                              {intent.responses.map((response, index) => (
                                <li key={index} className="text-muted-foreground">• {response}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an intent to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
