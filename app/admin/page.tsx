import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
