"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Stethoscope, 
  Pill, 
  Calendar,
  AlertTriangle,
  Search,
  ArrowRight
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
      color: "text-blue-600",
      bgColor: "bg-blue-50",
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
      color: "text-green-600",
      bgColor: "bg-green-50",
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
      color: "text-red-600",
      bgColor: "bg-red-50",
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
      color: "text-purple-600",
      bgColor: "bg-purple-50",
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
    <div className="space-y-6 h-full">
      <Card className="card-hover h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-muted-foreground" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {quickActions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm text-foreground">
                  {category.category}
                </h3>
              </div>
              <div className="grid gap-1">
                {category.actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-auto py-2 px-3 text-left hover-subtle group text-left"
                    onClick={() => onActionSelect(action)}
                  >
                    <span className="truncate flex-1 text-left">{action}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Drug Search Examples */}
      <Card className="card-hover h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground">
            <Pill className="h-5 w-5 text-muted-foreground" />
            Popular Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
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
                className="w-full justify-start text-xs h-auto py-2 px-3 text-left hover-subtle group text-left"
                onClick={() => onActionSelect(search)}
              >
                <span className="truncate flex-1 text-left">{search}</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
