"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BookOpen, MessageSquare, Search } from "lucide-react"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import VolunteerAvailability from "@/components/volunteer/volunteer-availability"
import VolunteerClasses from "@/components/volunteer/volunteer-classes"
import TeacherRequests from "@/components/volunteer/teacher-requests"
import VolunteerChat from "@/components/volunteer/volunteer-chat"

export default function VolunteerDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("availability")

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
        <Button>
          <Search className="mr-2 h-4 w-4" /> Browse Open Requests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Upcoming Classes"
          value="3"
          description="Classes you're volunteering for"
          icon={<Calendar className="h-5 w-5" />}
        />
        <DashboardCard
          title="Open Requests"
          value="8"
          description="Matching your expertise"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <DashboardCard
          title="Messages"
          value="5"
          description="Unread messages"
          icon={<MessageSquare className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="availability" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="availability">My Availability</TabsTrigger>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="requests">Teacher Requests</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="availability">
          <VolunteerAvailability />
        </TabsContent>

        <TabsContent value="classes">
          <VolunteerClasses />
        </TabsContent>

        <TabsContent value="requests">
          <TeacherRequests />
        </TabsContent>

        <TabsContent value="messages">
          <VolunteerChat />
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

