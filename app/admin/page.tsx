import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
