import { Heart, Globe, MessageSquare, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-200">
                HealthBot
              </h1>
              <p className="text-xs text-muted-foreground">
                AI Healthcare Assistant
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
              <span>Live AI Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>Real-time Data</span>
            </div>
            <Link href="/admin">
              <Button variant="outline" size="sm" className="btn-professional">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="btn-professional">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
