import { HealthcareChatbot } from "@/components/healthcare-chatbot"
import { Header } from "@/components/header"
import { DrugDataDisplay } from "@/components/drug-data-display"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              AI-Powered Healthcare Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get real-time health information, drug data, and connect with healthcare providers
            </p>
          </div>

          {/* Drug Data Display */}
          <DrugDataDisplay />

          {/* Healthcare Chatbot */}
          <HealthcareChatbot />
        </div>
      </main>
    </div>
  )
}
