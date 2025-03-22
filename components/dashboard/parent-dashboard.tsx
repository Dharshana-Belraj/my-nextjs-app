"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BookOpen, MessageSquare, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import StudentSchedule from "@/components/parent/student-schedule"
import StudentProgress from "@/components/parent/student-progress"
import LessonMaterials from "@/components/parent/lesson-materials"
import ParentChat from "@/components/parent/parent-chat"

export default function ParentDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("schedule")

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-muted-foreground">Monitor your child's progress and communicate with teachers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Upcoming Classes"
          value="4"
          description="Classes this week"
          icon={<Calendar className="h-5 w-5" />}
        />
        <DashboardCard
          title="Subjects"
          value="6"
          description="Currently enrolled"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <DashboardCard
          title="Messages"
          value="3"
          description="Unread messages"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <DashboardCard
          title="Performance"
          value="85%"
          description="Average score"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress Reports</TabsTrigger>
          <TabsTrigger value="materials">Lesson Materials</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <StudentSchedule />
        </TabsContent>

        <TabsContent value="progress">
          <StudentProgress />
        </TabsContent>

        <TabsContent value="materials">
          <LessonMaterials />
        </TabsContent>

        <TabsContent value="messages">
          <ParentChat />
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

