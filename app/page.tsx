import { HealthcareChatbot } from "@/components/healthcare-chatbot"
import { Header } from "@/components/header"
import { DrugDataDisplay } from "@/components/drug-data-display"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Globe, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <div className="flex justify-center gap-2 mb-6">
              <Badge variant="secondary" className="text-xs px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Real-time Data
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">
                <Globe className="w-3 h-3 mr-1" />
                Multi-language
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              AI-Powered Healthcare
              <span className="block text-muted-foreground font-normal">
                Assistant
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional healthcare assistance powered by advanced AI. 
              Get real-time health information, drug data, and connect with 
              healthcare providers seamlessly.
            </p>

            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8">
            {/* Drug Data Display */}
            <div className="w-full">
              <DrugDataDisplay />
            </div>

            {/* Healthcare Chatbot */}
            <div className="w-full">
              <HealthcareChatbot />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
