"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, MapPin, Pill, Shield, Stethoscope } from "lucide-react"

interface HealthDataDisplayProps {
  type: "vaccination" | "medication" | "symptoms" | "providers" | "outbreaks"
  data: any
  language?: string
}

export function HealthDataDisplay({ type, data, language = "en" }: HealthDataDisplayProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!data) return null

  const renderVaccinationData = () => (
    <div className="space-y-4">
      {data.map((vaccine: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {vaccine.vaccine}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium mb-2">Schedule:</h4>
              <ul className="list-disc list-inside space-y-1">
                {vaccine.schedule.map((dose: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {dose}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Common Side Effects:</h4>
              <div className="flex flex-wrap gap-1">
                {vaccine.sideEffects.map((effect: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
            {vaccine.contraindications.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Contraindications:</strong> {vaccine.contraindications.join(", ")}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderMedicationData = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary" />
          {data.name} ({data.genericName})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dosage">Dosage</TabsTrigger>
            <TabsTrigger value="effects">Side Effects</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-3">
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </TabsContent>
          <TabsContent value="dosage" className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{data.dosage}</p>
            </div>
          </TabsContent>
          <TabsContent value="effects" className="space-y-3">
            <div className="flex flex-wrap gap-1">
              {data.sideEffects.map((effect: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {effect}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="interactions" className="space-y-3">
            {data.interactions.length > 0 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Drug Interactions:</strong> {data.interactions.join(", ")}
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-sm text-muted-foreground">No known major interactions</p>
            )}
            {data.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Important Warnings:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.warnings.map((warning: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )

  const renderSymptomAssessment = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            Symptom Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Possible Conditions:</h4>
            <div className="space-y-2">
              {data.possibleConditions.map((condition: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{condition.condition}</p>
                    <p className="text-xs text-muted-foreground">{condition.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={condition.urgency === "emergency" ? "destructive" : "secondary"}>
                      {Math.round(condition.probability * 100)}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{condition.urgency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.recommendations.map((rec: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Alert>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              <strong>When to seek care:</strong> {data.whenToSeekCare}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )

  const renderProvidersData = () => (
    <div className="space-y-4">
      {data.map((provider: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {provider.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={provider.type === "hospital" ? "default" : "secondary"}>{provider.type}</Badge>
              <div className="text-right">
                <p className="text-sm font-medium">{provider.distance}km away</p>
                <p className="text-xs text-muted-foreground">Rating: {provider.rating}/5</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{provider.address}</p>
              <p className="text-sm font-medium">{provider.phone}</p>
            </div>
            {provider.specialties.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Specialties:</h4>
                <div className="flex flex-wrap gap-1">
                  {provider.specialties.map((specialty: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {provider.emergencyServices && (
              <Badge variant="destructive" className="text-xs">
                24/7 Emergency Services
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderOutbreakData = () => (
    <div className="space-y-4">
      {data.map((outbreak: any, index: number) => (
        <Alert key={index} variant={outbreak.severity === "high" ? "destructive" : "default"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{outbreak.disease}</h4>
                <Badge variant={outbreak.severity === "high" ? "destructive" : "secondary"}>
                  {outbreak.severity} severity
                </Badge>
              </div>
              <p className="text-sm">{outbreak.description}</p>
              <p className="text-xs text-muted-foreground">Location: {outbreak.location}</p>
              <div>
                <h5 className="font-medium text-sm mb-1">Prevention Measures:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {outbreak.preventionMeasures.map((measure: string, i: number) => (
                    <li key={i} className="text-xs">
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case "vaccination":
        return renderVaccinationData()
      case "medication":
        return renderMedicationData()
      case "symptoms":
        return renderSymptomAssessment()
      case "providers":
        return renderProvidersData()
      case "outbreaks":
        return renderOutbreakData()
      default:
        return <p>No data available</p>
    }
  }

  return <div className="space-y-4">{renderContent()}</div>
}
