"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Save, X, Languages, FileText, BookOpen, CheckCircle } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

const mockTranslations = {
  en: {
    "responses.greeting": "Hello! I'm your AI healthcare assistant. How can I help you today?",
    "responses.symptoms": "I understand you're experiencing symptoms. Can you tell me more details?",
    "responses.emergency": "This sounds like an emergency. Please contact emergency services immediately.",
    "responses.medication": "I can help you with medication information. What would you like to know?",
  },
  hi: {
    "responses.greeting": "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    "responses.symptoms": "मैं समझता हूं कि आप लक्षणों का अनुभव कर रहे हैं। क्या आप मुझे और विवरण बता सकते हैं?",
    "responses.emergency": "यह एक आपातकालीन स्थिति की तरह लगता है। कृपया तुरंत आपातकालीन सेवाओं से संपर्क करें।",
    "responses.medication": "मैं आपकी दवा की जानकारी के साथ मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
  },
  es: {
    "responses.greeting": "¡Hola! Soy tu asistente de salud con IA. ¿Cómo puedo ayudarte hoy?",
    "responses.symptoms": "Entiendo que estás experimentando síntomas. ¿Puedes contarme más detalles?",
    "responses.emergency": "Esto suena como una emergencia. Por favor contacta los servicios de emergencia inmediatamente.",
    "responses.medication": "Puedo ayudarte con información sobre medicamentos. ¿Qué te gustaría saber?",
  },
  ar: {
    "responses.greeting": "مرحباً! أنا مساعدك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟",
    "responses.symptoms": "أفهم أنك تعاني من أعراض. هل يمكنك إخباري بمزيد من التفاصيل؟",
    "responses.emergency": "يبدو هذا كحالة طوارئ. يرجى الاتصال بخدمات الطوارئ فوراً.",
    "responses.medication": "يمكنني مساعدتك بمعلومات الأدوية. ماذا تريد أن تعرف؟",
  },
}

export function ContentManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEdit = (key: string) => {
    setEditingKey(key)
    setEditValue(mockTranslations[selectedLanguage as keyof typeof mockTranslations][key] || "")
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving translation:", editingKey, editValue)
    setEditingKey(null)
    setEditValue("")
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditValue("")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Content Management</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage multilingual content and response templates</p>
        </div>
        <Button className="text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Translation Key
        </Button>
      </div>

      <Tabs defaultValue="translations" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="translations" className="text-xs sm:text-sm">Translations</TabsTrigger>
          <TabsTrigger value="templates" className="text-xs sm:text-sm">Response Templates</TabsTrigger>
          <TabsTrigger value="medical-terms" className="text-xs sm:text-sm">Medical Terms</TabsTrigger>
          <TabsTrigger value="validation" className="text-xs sm:text-sm">Content Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-4 sm:space-y-6">
          {/* Language Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Language Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    className="justify-start text-xs sm:text-sm"
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
              <CardTitle className="text-base sm:text-lg">Translation Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockTranslations[selectedLanguage as keyof typeof mockTranslations]).map(([key, value]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm sm:text-base">{key}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(key)}
                        className="text-xs"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    
                    {editingKey === key ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="min-h-20 text-sm"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave} className="text-xs">
                            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs">
                            <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Response Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">Greeting Template</h4>
                    <Textarea
                      placeholder="Enter greeting template..."
                      className="min-h-20 text-sm"
                      defaultValue="Hello! I'm your AI healthcare assistant. How can I help you today?"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">Emergency Template</h4>
                    <Textarea
                      placeholder="Enter emergency template..."
                      className="min-h-20 text-sm"
                      defaultValue="This sounds like an emergency. Please contact emergency services immediately."
                    />
                  </div>
                </div>
                <Button className="text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-terms" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Medical Terms Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Add New Term</label>
                    <Input placeholder="Enter medical term..." className="text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select className="w-full p-2 border border-input rounded-md text-sm">
                      <option>Symptoms</option>
                      <option>Medications</option>
                      <option>Conditions</option>
                      <option>Procedures</option>
                    </select>
                  </div>
                </div>
                <Button className="text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Term
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Content Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-muted-foreground">Translation Coverage</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-muted-foreground">Missing Translations</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-muted-foreground">Validation Errors</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm sm:text-base">Validation Issues</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Missing translation for "responses.emergency" in Arabic</span>
                      <Badge variant="outline" className="text-xs">Fix</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Inconsistent terminology in Hindi responses</span>
                      <Badge variant="outline" className="text-xs">Review</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}