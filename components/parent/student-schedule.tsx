"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Clock, User } from "lucide-react"

// Mock data for student schedule
const mockSchedule = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra fundamentals",
    teacher: "Ms. Johnson",
    date: new Date(2025, 2, 25),
    startTime: "09:00",
    endTime: "10:30",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Physics experiments",
    teacher: "Mr. Williams",
    date: new Date(2025, 2, 25),
    startTime: "11:00",
    endTime: "12:30",
  },
  {
    id: 3,
    subject: "English",
    topic: "Essay writing",
    teacher: "Mrs. Davis",
    date: new Date(2025, 2, 26),
    startTime: "14:00",
    endTime: "15:30",
  },
  {
    id: 4,
    subject: "History",
    topic: "World War II",
    teacher: "Mr. Brown",
    date: new Date(2025, 2, 27),
    startTime: "10:00",
    endTime: "11:30",
  },
]

export default function StudentSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const filteredSchedule = date
    ? mockSchedule.filter((c) => format(c.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
    : mockSchedule

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view your child's schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">
          {date ? `Classes for ${format(date, "MMMM d, yyyy")}` : "All Classes"}
        </h3>

        {filteredSchedule.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No classes scheduled for this date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchedule.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{cls.subject}</CardTitle>
                  <CardDescription>{cls.topic}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2" />
                      <span>Teacher: {cls.teacher}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{format(cls.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {cls.startTime} - {cls.endTime}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

