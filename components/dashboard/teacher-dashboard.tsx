"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, BookOpen, MessageSquare, Plus } from "lucide-react"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ClassScheduler from "@/components/teacher/class-scheduler"
import VolunteerRequests from "@/components/teacher/volunteer-requests"
import StudentPerformance from "@/components/teacher/student-performance"
import TeacherChat from "@/components/teacher/teacher-chat"

export default function TeacherDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("classes")

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Upcoming Classes"
          value="5"
          description="Classes this week"
          icon={<Calendar className="h-5 w-5" />}
        />
        <DashboardCard
          title="Volunteer Requests"
          value="3"
          description="Pending applications"
          icon={<Users className="h-5 w-5" />}
        />
        <DashboardCard
          title="Students"
          value="28"
          description="Active students"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <DashboardCard
          title="Messages"
          value="12"
          description="Unread messages"
          icon={<MessageSquare className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="classes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="classes">Class Schedule</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteer Requests</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <ClassScheduler />
        </TabsContent>

        <TabsContent value="volunteers">
          <VolunteerRequests />
        </TabsContent>

        <TabsContent value="students">
          <StudentPerformance />
        </TabsContent>

        <TabsContent value="messages">
          <TeacherChat />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function DashboardCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

