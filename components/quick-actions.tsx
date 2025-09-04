"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Stethoscope, 
  Pill, 
  Activity, 
  Shield, 
  Heart, 
  Brain, 
  Baby, 
  Calendar,
  AlertTriangle,
  Search
} from "lucide-react"
import { getTranslation } from "@/lib/translations"

interface QuickActionsProps {
  onActionSelect: (action: string) => void
  language: string
}

export function QuickActions({ onActionSelect, language }: QuickActionsProps) {
  const quickActions = [
    {
      category: "Drug Information",
      icon: <Pill className="h-4 w-4" />,
      actions: [
        "Tell me about aspirin",
        "What is ibuprofen?",
        "Drug information for paracetamol",
        "Check drug interactions for aspirin",
        "Drug safety alerts",
        "Side effects of ibuprofen"
      ]
    },
    {
      category: "Symptoms",
      icon: <Stethoscope className="h-4 w-4" />,
      actions: [
        "I have a fever",
        "Chest pain symptoms",
        "Headache and nausea",
        "Shortness of breath",
        "Stomach pain",
        "Feeling dizzy"
      ]
    },
    {
      category: "Emergency",
      icon: <AlertTriangle className="h-4 w-4" />,
      actions: [
        "Emergency help",
        "Chest pain emergency",
        "Difficulty breathing",
        "Severe bleeding",
        "Unconscious person"
      ]
    },
    {
      category: "Health Services",
      icon: <Calendar className="h-4 w-4" />,
      actions: [
        "Find doctors near me",
        "Book appointment",
        "Vaccination schedule",
        "Health checkup",
        "Mental health support"
      ]
    }
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickActions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <div className="flex items-center gap-2">
                {category.icon}
                <h3 className="font-semibold text-sm">{category.category}</h3>
              </div>
              <div className="space-y-1">
                {category.actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs h-auto py-2 px-3 text-left"
                    onClick={() => onActionSelect(action)}
                  >
                    <span className="truncate">{action}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Drug Search Examples */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Popular Drug Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              "Aspirin information",
              "Ibuprofen side effects", 
              "Paracetamol dosage",
              "Drug interactions check",
              "Medicine safety alerts",
              "Prescription drug info"
            ].map((search, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-auto py-1 px-2 text-left"
                onClick={() => onActionSelect(search)}
              >
                <span className="truncate">{search}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
