"use client"

import { HealthcareChatbot } from "@/components/healthcare-chatbot"
import { Header } from "@/components/header"
import { DrugDataDisplay } from "@/components/drug-data-display"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Heart, 
  Stethoscope, 
  Pill, 
  Calendar,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Phone,
  Search,
  AlertTriangle
} from "lucide-react"

export default function Home() {
  const scrollToChatbot = () => {
    const chatbotElement = document.getElementById('healthcare-chatbot');
    if (chatbotElement) {
      chatbotElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToEmergency = () => {
    const emergencySection = document.getElementById('emergency-section');
    if (emergencySection) {
      emergencySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Trust Badges */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-green-50 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1.5" />
                HIPAA Compliant
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-200">
                <Zap className="w-3 h-3 mr-1.5" />
                Real-time Data
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 border-purple-200">
                <Globe className="w-3 h-3 mr-1.5" />
                Multi-language
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 border-orange-200">
                <Users className="w-3 h-3 mr-1.5" />
                10,000+ Users
              </Badge>
            </div>
            
            {/* Main Heading */}
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                AI-Powered
                <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
                  Healthcare Assistant
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get instant medical guidance, drug information, and connect with healthcare providers. 
                Powered by advanced AI for accurate, reliable health assistance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium"
                  onClick={scrollToChatbot}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3 text-base font-medium"
                  onClick={scrollToEmergency}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Help
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Conversations</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-8 sm:py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Comprehensive Healthcare Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for better health management in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Symptom Analysis</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Get instant analysis of your symptoms with AI-powered assessment and recommendations.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Real-time assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Emergency detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Follow-up guidance
                  </li>
                </ul>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Drug Information</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Comprehensive drug database with interactions, side effects, and dosage information.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Drug interactions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Safety alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Dosage guidance
                  </li>
                </ul>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Health Services</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Connect with healthcare providers and manage your health appointments seamlessly.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Provider search
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Appointment booking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Vaccination schedules
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Application Section */}
        <section className="w-full py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Try Our AI Assistant
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the power of AI-driven healthcare assistance
              </p>
            </div>

            {/* Drug Information at Top */}
            <div className="mb-8">
              <DrugDataDisplay />
            </div>
              {/* Healthcare Chatbot - Right Column (Larger) */}
              <div className="xl:col-span-3 h-full" id="healthcare-chatbot">
                <div className="h-full">
                  <HealthcareChatbot />
                </div>
              </div>
            </div>
        </section>

        {/* Emergency Section */}
        <section id="emergency-section" className="w-full py-8 sm:py-12 bg-red-50 border-t border-red-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 rounded-full">
                  <Phone className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">
                Emergency Contacts
              </h2>
              <p className="text-lg text-red-700 mb-8 max-w-2xl mx-auto">
                In case of medical emergency, contact these numbers immediately
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-6 bg-white border-red-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">108</div>
                    <div className="text-base font-semibold text-red-800 mb-1">Medical Emergency</div>
                    <div className="text-sm text-red-600">Ambulance & Emergency</div>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-white border-red-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">100</div>
                    <div className="text-base font-semibold text-red-800 mb-1">Police</div>
                    <div className="text-sm text-red-600">Police Emergency</div>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-white border-red-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">101</div>
                    <div className="text-base font-semibold text-red-800 mb-1">Fire</div>
                    <div className="text-sm text-red-600">Fire Emergency</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Ready to Transform Your Healthcare Experience?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of users who trust HealthBot for their healthcare needs. 
                    Get started today with our AI-powered assistant.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium"
                      onClick={scrollToChatbot}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Start Free Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="px-8 py-3 text-base font-medium"
                      onClick={scrollToFeatures}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/50 bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-foreground">HealthBot</div>
                <div className="text-xs text-muted-foreground">AI Healthcare Assistant</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2025 HealthBot. All rights reserved.</p>
              <p className="mt-1">Built with ❤️ for better healthcare</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
