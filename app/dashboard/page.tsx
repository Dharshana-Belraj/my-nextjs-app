"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import TeacherDashboard from "@/components/dashboard/teacher-dashboard"
import VolunteerDashboard from "@/components/dashboard/volunteer-dashboard"
import ParentDashboard from "@/components/dashboard/parent-dashboard"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <DashboardSkeleton />
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  const userRole = session?.user?.role

  return (
    <div className="min-h-screen bg-background">
      {userRole === "teacher" && <TeacherDashboard />}
      {userRole === "volunteer" && <VolunteerDashboard />}
      {userRole === "parent" && <ParentDashboard />}
    </div>
  )
}

