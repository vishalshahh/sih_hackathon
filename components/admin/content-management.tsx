"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Edit, Save, Plus, Languages, FileText } from "lucide-react"

const mockTranslations = {
  en: {
    "responses.greeting": "Hello! I'm your healthcare assistant...",
    "responses.emergency": "🚨 MEDICAL EMERGENCY DETECTED 🚨...",
    "responses.fever": "I understand you're experiencing fever...",
    "ui.title": "Healthcare Assistant Chatbot",
    "ui.placeholder": "Ask about symptoms, medications, appointments...",
  },
  hi: {
    "responses.greeting": "नमस्ते! मैं आपका स्वास्थ्य सहायक हूं...",
    "responses.emergency": "🚨 चिकित्सा आपातकाल का पता चला 🚨...",
    "responses.fever": "मैं समझता हूं कि आपको बुखार है...",
    "ui.title": "स्वास्थ्य सहायक चैटबॉट",
    "ui.placeholder": "लक्षण, दवाइयां, अपॉइंटमेंट के बारे में पूछें...",
  },
  es: {
    "responses.greeting": "¡Hola! Soy tu asistente de salud...",
    "responses.emergency": "🚨 EMERGENCIA MÉDICA DETECTADA 🚨...",
    "responses.fever": "Entiendo que tienes fiebre...",
    "ui.title": "Chatbot Asistente de Salud",
    "ui.placeholder": "Pregunte sobre síntomas, medicamentos, citas...",
  },
  ar: {
    "responses.greeting": "مرحباً! أنا مساعدك الصحي...",
    "responses.emergency": "🚨 تم اكتشاف حالة طوارئ طبية 🚨...",
    "responses.fever": "أفهم أنك تعاني من الحمى...",
    "ui.title": "روبوت المساعد الصحي",
    "ui.placeholder": "اسأل عن الأعراض والأدوية والمواعيد...",
  },
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

export function ContentManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key)
    setEditValue(value)
  }

  const handleSave = (key: string) => {
    // Handle save logic here
    console.log(`Saving ${key} for ${selectedLanguage}:`, editValue)
    setEditingKey(null)
    setEditValue("")
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditValue("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">Manage multilingual content and response templates</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Translation Key
        </Button>
      </div>

      <Tabs defaultValue="translations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="medical-terms">Medical Terms</TabsTrigger>
          <TabsTrigger value="validation">Content Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-6">
          {/* Language Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Language Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Translation Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Translations for {languages.find((l) => l.code === selectedLanguage)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(mockTranslations[selectedLanguage as keyof typeof mockTranslations] || {}).map(
                ([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {key}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {key.startsWith("responses.") ? "Response" : "UI Element"}
                        </span>
                      </div>
                      {editingKey !== key && (
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(key, value)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    {editingKey === key ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSave(key)}>
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{value}</p>
                      </div>
                    )}
                  </div>
                ),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Response Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Emergency Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Template for emergency medical situations</p>
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Symptom Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Template for symptom-related queries</p>
                    <Badge variant="secondary" className="text-xs">
                      Medium Priority
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Medication Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Template for drug-related information</p>
                    <Badge variant="outline" className="text-xs">
                      Low Priority
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">General Health Advice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Template for general health queries</p>
                    <Badge variant="outline" className="text-xs">
                      Low Priority
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Terminology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Symptoms</h4>
                    <div className="space-y-1">
                      {["fever", "headache", "cough", "nausea"].map((term) => (
                        <Badge key={term} variant="outline" className="mr-1 mb-1">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Body Parts</h4>
                    <div className="space-y-1">
                      {["head", "chest", "abdomen", "back"].map((term) => (
                        <Badge key={term} variant="outline" className="mr-1 mb-1">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Medications</h4>
                    <div className="space-y-1">
                      {["paracetamol", "ibuprofen", "aspirin", "antibiotics"].map((term) => (
                        <Badge key={term} variant="outline" className="mr-1 mb-1">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medical Term
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Translation Coverage</h4>
                  <p className="text-sm text-green-700">All languages: 98% complete</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Medical Accuracy</h4>
                  <p className="text-sm text-yellow-700">3 responses need medical review</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Content Freshness</h4>
                  <p className="text-sm text-blue-700">Last updated: 2 days ago</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">Compliance Check</h4>
                  <p className="text-sm text-purple-700">All content compliant with guidelines</p>
                </div>
              </div>

              <Button className="w-full">Run Full Content Validation</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
