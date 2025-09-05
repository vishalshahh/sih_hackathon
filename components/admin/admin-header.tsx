"use client"

import { Shield, Settings, BarChart3, MessageSquare, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-lg">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">HealthBot Admin</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Healthcare Chatbot Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>Conversations</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                <MessageSquare className="w-4 h-4" />
                <span>Conversations</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs justify-start">
                <Settings className="w-3 h-3 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
