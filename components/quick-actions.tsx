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
  ArrowRight,
  Phone,
  Heart,
  Shield
} from "lucide-react"
import { quickActionsData, popularSearches, emergencyContacts, healthTips } from "@/lib/mock-data/quick-actions-data"

interface QuickActionsProps {
  onActionSelect: (action: string) => void
  language: string
}

export function QuickActions({ onActionSelect, language }: QuickActionsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Pill": return <Pill className="h-3 w-3" />
      case "Stethoscope": return <Stethoscope className="h-3 w-3" />
      case "AlertTriangle": return <AlertTriangle className="h-3 w-3" />
      case "Calendar": return <Calendar className="h-3 w-3" />
      default: return <Search className="h-3 w-3" />
    }
  }

  const getQuestions = (questions: any) => {
    return questions[language] || questions.en
  }

  const getPopularSearches = () => {
    return popularSearches[language as keyof typeof popularSearches] || popularSearches.en
  }

  const getEmergencyContacts = () => {
    return emergencyContacts[language as keyof typeof emergencyContacts] || emergencyContacts.en
  }

  const getHealthTips = () => {
    return healthTips[language as keyof typeof healthTips] || healthTips.en
  }

  return (
    <div className="space-y-3 h-full max-h-[500px] overflow-hidden">
      {/* Quick Actions */}
      <Card className="card-hover h-fit">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm flex items-center gap-2 text-foreground">
            <Search className="h-3 w-3 text-muted-foreground" />
            {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4 max-h-[200px] overflow-y-auto">
          {quickActionsData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${category.bgColor} ${category.color}`}>
                  {getIcon(category.icon)}
                </div>
                <h3 className="font-medium text-xs text-foreground">
                  {category.category}
                </h3>
              </div>
              <div className="grid gap-1">
                {getQuestions(category.questions).slice(0, 2).map((question: string, questionIndex: number) => (
                  <Button
                    key={questionIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-auto py-1.5 px-2 text-left hover-subtle group text-left"
                    onClick={() => onActionSelect(question)}
                  >
                    <span className="truncate flex-1 text-left">{question}</span>
                    <ArrowRight className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Searches */}
      <Card className="card-hover h-fit">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm flex items-center gap-2 text-foreground">
            <Pill className="h-3 w-3 text-muted-foreground" />
            {language === 'hi' ? 'लोकप्रिय खोजें' : 'Popular Searches'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 max-h-[190px] overflow-y-auto">
          <div className="grid gap-1">
            {getPopularSearches().slice(0, 6).map((search: string, index: number) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-auto py-1.5 px-2 text-left hover-subtle group text-left"
                onClick={() => onActionSelect(search)}
              >
                <span className="truncate flex-1 text-left">{search}</span>
                <ArrowRight className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
