"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, AlertTriangle, Pill, Activity } from "lucide-react"

interface DrugInfo {
  name: string
  genericName: string
  description: string
  dosage: string
  sideEffects: string[]
  interactions: string[]
  warnings: string[]
  manufacturer?: string
  activeIngredients?: string[]
  adverseReactions?: string[]
  pregnancyCategory?: string
  fdaApprovalDate?: string
  ndcNumber?: string
}

interface DrugRecall {
  report_date: string
  event_type: string
  patient: {
    age: number
    sex: number
  }
  reaction: string[]
  drug: {
    medicinalproduct: string[]
    drugdosagetext: string[]
  }[]
}

export function DrugDataDisplay() {
  const [drugName, setDrugName] = useState("")
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null)
  const [recalls, setRecalls] = useState<DrugRecall[]>([])
  const [interactions, setInteractions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchDrug = async () => {
    if (!drugName.trim()) return

    setLoading(true)
    setError("")

    try {
      // Search for drug information
      const drugResponse = await fetch(`/api/health/drugs?name=${encodeURIComponent(drugName)}`)
      const drugData = await drugResponse.json()

      if (drugData.success) {
        setDrugInfo(drugData.data)
      } else {
        setError(drugData.error)
      }

      // Search for recalls
      const recallsResponse = await fetch(`/api/health/drug-recalls?drug=${encodeURIComponent(drugName)}`)
      const recallsData = await recallsResponse.json()

      if (recallsData.success) {
        setRecalls(recallsData.data)
      }

      // Search for interactions
      const interactionsResponse = await fetch(`/api/health/drug-interactions?drug=${encodeURIComponent(drugName)}`)
      const interactionsData = await interactionsResponse.json()

      if (interactionsData.success) {
        setInteractions(interactionsData.data)
      }
    } catch (err) {
      setError("Failed to fetch drug data")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchDrug()
    }
  }

  return (
    <div className="space-y-6 w-full">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Pill className="h-5 w-5 text-primary" />
            Real-time Drug Information
          </CardTitle>
          <CardDescription className="text-base">
            Search for drug information, recalls, and interactions using OpenFDA database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter drug name (e.g., Aspirin, Ibuprofen)"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={searchDrug} 
              disabled={loading || !drugName.trim()}
              className="btn-professional"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {drugInfo && (
        <Tabs defaultValue="info" className="space-y-4 w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Drug Information</TabsTrigger>
            <TabsTrigger value="recalls">Safety Recalls</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{drugInfo.name}</span>
                  <Badge variant="secondary" className="text-sm">{drugInfo.genericName}</Badge>
                </CardTitle>
                <CardDescription className="text-base">Manufacturer: {drugInfo.manufacturer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-base">Description</h4>
                  <p className="text-sm text-muted-foreground">{drugInfo.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-base">Dosage</h4>
                  <p className="text-sm text-muted-foreground">{drugInfo.dosage}</p>
                </div>

                {drugInfo.activeIngredients && drugInfo.activeIngredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-base">Active Ingredients</h4>
                    <div className="flex flex-wrap gap-1">
                      {drugInfo.activeIngredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{ingredient}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {drugInfo.sideEffects && drugInfo.sideEffects.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-base">Side Effects</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                      {drugInfo.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {drugInfo.warnings && drugInfo.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-base text-amber-600">Warnings</h4>
                    <ul className="text-sm text-amber-700 list-disc list-inside">
                      {drugInfo.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">FDA Approval:</span> {drugInfo.fdaApprovalDate}
                  </div>
                  <div>
                    <span className="font-semibold">NDC Number:</span> {drugInfo.ndcNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Pregnancy Category:</span> {drugInfo.pregnancyCategory}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recalls" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Safety Recalls & Events
                </CardTitle>
                <CardDescription className="text-base">
                  Recent safety events and recalls for {drugInfo.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recalls.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent safety events found</p>
                ) : (
                  <div className="space-y-3">
                    {recalls.slice(0, 5).map((recall, index) => (
                      <div key={index} className="border rounded-lg p-3 hover-subtle">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="destructive">{recall.event_type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(recall.report_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p><strong>Patient:</strong> {recall.patient.age} years, {recall.patient.sex === 1 ? 'Male' : 'Female'}</p>
                          <p><strong>Reactions:</strong> {recall.reaction.join(', ')}</p>
                          {recall.drug[0]?.drugdosagetext && (
                            <p><strong>Dosage:</strong> {recall.drug[0].drugdosagetext.join(', ')}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="h-5 w-5 text-orange-500" />
                  Drug Interactions
                </CardTitle>
                <CardDescription className="text-base">
                  Known interactions for {drugInfo.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {interactions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No interaction data available</p>
                ) : (
                  <div className="space-y-3">
                    {interactions.map((interaction, index) => (
                      <div key={index} className="border rounded-lg p-3 hover-subtle">
                        <h4 className="font-semibold mb-2">Drug: {interaction.drug}</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {interaction.interactions.map((int: string, idx: number) => (
                            <li key={idx}>{int}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
} 