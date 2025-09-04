"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Bot, User, Stethoscope, AlertTriangle, Info, Pill, Activity, Shield } from "lucide-react"
import { LanguageSelector } from "./language-selector"
import { QuickActions } from "./quick-actions"
import { HealthcareIntentProcessor, type MedicalEntity } from "@/lib/healthcare-intents"
import { getTranslation, isRTL } from "@/lib/translations"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  intent?: string
  language?: string
  entities?: MedicalEntity[]
  urgencyLevel?: "low" | "medium" | "high" | "emergency"
  followUpQuestions?: string[]
  recommendedActions?: string[]
  disclaimers?: string[]
  drugInfo?: any
  drugRecalls?: any[]
  drugInteractions?: any[]
}

export function HealthcareChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const greetingMessage: Message = {
      id: "1",
      type: "bot",
      content: getTranslation(selectedLanguage, "responses.greeting"),
      timestamp: new Date(),
      intent: "greeting",
      urgencyLevel: "low",
    }
    setMessages([greetingMessage])
  }, [selectedLanguage])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Scroll to bottom immediately when user sends message
    setTimeout(() => {
      scrollToBottom()
    }, 100)

    // Simulate AI processing delay
    setTimeout(
      async () => {
        const intentResult = HealthcareIntentProcessor.detectIntent(inputValue, selectedLanguage)
        const response = await HealthcareIntentProcessor.generateResponse(
          intentResult.intent,
          intentResult.entities,
          inputValue,
          selectedLanguage,
        )

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response.response,
          timestamp: new Date(),
          intent: response.intent,
          language: selectedLanguage,
          entities: intentResult.entities,
          urgencyLevel: response.urgencyLevel,
          followUpQuestions: response.followUpQuestions,
          recommendedActions: response.recommendedActions,
          disclaimers: response.disclaimers,
          drugInfo: response.drugInfo,
          drugRecalls: response.drugRecalls,
          drugInteractions: response.drugInteractions,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
        
        // Scroll to bottom when bot responds
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleFollowUpQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Improved scroll function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-scroll when typing indicator changes
  useEffect(() => {
    if (isTyping) {
      scrollToBottom()
    }
  }, [isTyping])

  const getUrgencyColor = (urgencyLevel?: string) => {
    switch (urgencyLevel) {
      case "emergency":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  const isRTLLanguage = isRTL(selectedLanguage)

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${isRTLLanguage ? "rtl" : "ltr"}`}>
      {/* Quick Actions Sidebar */}
      <div className="lg:col-span-1 hidden lg:block">
        <QuickActions onActionSelect={(action) => setInputValue(action)} language={selectedLanguage} />
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col pl-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              {getTranslation(selectedLanguage, "ui.title")}
            </CardTitle>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4 min-w-0">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3 min-w-0">
                    <div
                      className={`flex gap-3 min-w-0 ${
                        message.type === "user"
                          ? isRTLLanguage
                            ? "justify-start"
                            : "justify-end"
                          : isRTLLanguage
                            ? "justify-end"
                            : "justify-start"
                      }`}
                    >
                      {message.type === "bot" && !isRTLLanguage && (
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] min-w-0 rounded-lg px-4 py-2 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                        style={{ direction: isRTLLanguage ? "rtl" : "ltr" }}
                      >
                        <p className="text-sm whitespace-pre-line break-words overflow-wrap-anywhere hyphens-auto">{message.content}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          {message.intent && message.type === "bot" && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {message.intent}
                            </Badge>
                          )}
                          {message.urgencyLevel && message.type === "bot" && (
                            <Badge variant="outline" className={`text-xs flex-shrink-0 ${getUrgencyColor(message.urgencyLevel)}`}>
                              {message.urgencyLevel === "emergency" && <AlertTriangle className="w-3 h-3 mr-1" />}
                              {message.urgencyLevel}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {message.type === "user" && !isRTLLanguage && (
                        <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full flex-shrink-0">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}

                      {message.type === "bot" && isRTLLanguage && (
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}

                      {message.type === "user" && isRTLLanguage && (
                        <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full flex-shrink-0">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Detected Entities */}
                    {message.entities && message.entities.length > 0 && (
                      <div className="flex flex-wrap gap-1 max-w-[80%]">
                        {message.entities.map((entity, index) => (
                          <Badge key={index} variant="outline" className="text-xs break-words">
                            {entity.type}: {entity.value}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Drug Information Display */}
                    {message.drugInfo && message.type === "bot" && (
                      <div className="max-w-[80%] min-w-0">
                        <Card className="w-full">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Pill className="h-5 w-5 text-primary" />
                              {message.drugInfo.name}
                              <Badge variant="secondary" className="text-xs">
                                {message.drugInfo.genericName}
                              </Badge>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Manufacturer: {message.drugInfo.manufacturer || 'Various'}
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-1">Description</h4>
                              <p className="text-sm text-muted-foreground">{message.drugInfo.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-sm mb-1">Dosage</h4>
                              <p className="text-sm text-muted-foreground">{message.drugInfo.dosage}</p>
                            </div>

                            {message.drugInfo.activeIngredients && message.drugInfo.activeIngredients.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Active Ingredients</h4>
                                <div className="flex flex-wrap gap-1">
                                  {message.drugInfo.activeIngredients.map((ingredient: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {message.drugInfo.sideEffects && message.drugInfo.sideEffects.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Common Side Effects</h4>
                                <ul className="text-sm text-muted-foreground list-disc list-inside">
                                  {message.drugInfo.sideEffects.slice(0, 5).map((effect: string, index: number) => (
                                    <li key={index}>{effect}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {message.drugInfo.warnings && message.drugInfo.warnings.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-sm mb-1 text-amber-600">Important Warnings</h4>
                                <ul className="text-sm text-amber-700 list-disc list-inside">
                                  {message.drugInfo.warnings.slice(0, 3).map((warning: string, index: number) => (
                                    <li key={index}>{warning}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                              <div>
                                <span className="font-semibold">FDA Approval:</span> {message.drugInfo.fdaApprovalDate || 'Unknown'}
                              </div>
                              <div>
                                <span className="font-semibold">Pregnancy Category:</span> {message.drugInfo.pregnancyCategory || 'Not specified'}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Drug Interactions Display */}
                    {message.drugInteractions && message.drugInteractions.length > 0 && message.type === "bot" && (
                      <div className="max-w-[80%] min-w-0">
                        <Card className="w-full">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Activity className="h-5 w-5 text-orange-500" />
                              Drug Interactions
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {message.drugInteractions.map((interaction: any, index: number) => (
                              <div key={index} className="space-y-2">
                                <h4 className="font-semibold text-sm">Drug: {interaction.drug}</h4>
                                <ul className="text-sm text-muted-foreground list-disc list-inside">
                                  {interaction.interactions.map((int: string, idx: number) => (
                                    <li key={idx}>{int}</li>
                                  ))}
                                </ul>
                                <p className="text-xs text-muted-foreground">
                                  Last updated: {new Date(interaction.lastUpdated).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Drug Recalls Display */}
                    {message.drugRecalls && message.drugRecalls.length > 0 && message.type === "bot" && (
                      <div className="max-w-[80%] min-w-0">
                        <Card className="w-full">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Shield className="h-5 w-5 text-red-500" />
                              Safety Alerts & Recalls
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {message.drugRecalls.slice(0, 3).map((recall: any, index: number) => (
                              <div key={index} className="border rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="destructive" className="text-xs">
                                    {recall.event_type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(recall.report_date).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="text-sm space-y-1">
                                  <p><strong>Patient:</strong> {recall.patient.age} years, {recall.patient.sex === 1 ? 'Male' : 'Female'}</p>
                                  <p><strong>Reactions:</strong> {recall.reaction.join(', ')}</p>
                                  {recall.drug[0]?.drugdosagetext && (
                                    <p><strong>Dosage:</strong> {recall.drug[0].drugdosagetext.join(', ')}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Recommended Actions */}
                    {message.recommendedActions && message.recommendedActions.length > 0 && (
                      <div className="max-w-[80%] min-w-0">
                        <Alert className="w-full">
                          <Info className="h-4 w-4 flex-shrink-0" />
                          <AlertDescription className="break-words overflow-wrap-anywhere hyphens-auto">
                            <strong>Recommended Actions:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              {message.recommendedActions.map((action, index) => (
                                <li key={index} className="text-sm break-words">
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Follow-up Questions */}
                    {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                      <div className="ml-11 space-y-2 max-w-[80%] min-w-0">
                        <p className="text-sm font-medium text-muted-foreground">Follow-up questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.followUpQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-auto py-1 px-2 bg-transparent break-words max-w-full min-w-0"
                              onClick={() => handleFollowUpQuestion(question)}
                            >
                              <span className="break-words overflow-wrap-anywhere">{question}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disclaimers */}
                    {message.disclaimers && message.disclaimers.length > 0 && (
                      <div className="max-w-[80%] min-w-0">
                        <Alert variant="destructive" className="w-full">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                          <AlertDescription className="break-words overflow-wrap-anywhere hyphens-auto">
                            <strong>Important:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              {message.disclaimers.map((disclaimer, index) => (
                                <li key={index} className="text-sm break-words">
                                  {disclaimer}
                                </li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation(selectedLanguage, "ui.placeholder")}
                  className="flex-1 min-w-0"
                  style={{ direction: isRTLLanguage ? "rtl" : "ltr" }}
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="icon" className="flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
