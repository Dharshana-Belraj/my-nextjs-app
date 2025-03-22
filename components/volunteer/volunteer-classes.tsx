"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Clock, User } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for volunteer classes
const mockClasses = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra fundamentals",
    teacher: "Ms. Johnson",
    date: new Date(2025, 2, 25),
    startTime: "09:00",
    endTime: "10:30",
    status: "confirmed",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Physics experiments",
    teacher: "Mr. Williams",
    date: new Date(2025, 2, 27),
    startTime: "11:00",
    endTime: "12:30",
    status: "confirmed",
  },
  {
    id: 3,
    subject: "English",
    topic: "Essay writing",
    teacher: "Mrs. Davis",
    date: new Date(2025, 3, 2),
    startTime: "14:00",
    endTime: "15:30",
    status: "confirmed",
  },
]

export default function VolunteerClasses() {
  const [classes, setClasses] = useState(mockClasses)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleCancel = (id: number) => {
    setClasses(
      classes.map((cls) => {
        if (cls.id === id) {
          return { ...cls, status: "cancelled" }
        }
        return cls
      }),
    )

    toast({
      title: "Class cancelled",
      description: "You have cancelled your participation in this class.",
      variant: "destructive",
    })
  }

  const filteredClasses = date
    ? classes.filter((c) => format(c.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
    : classes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">
          {date ? `Classes for ${format(date, "MMMM d, yyyy")}` : "All Classes"}
        </h3>

        {filteredClasses.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No classes scheduled for this date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className={cls.status === "cancelled" ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.subject}</CardTitle>
                      <CardDescription>{cls.topic}</CardDescription>
                    </div>
                    <Badge variant={cls.status === "cancelled" ? "destructive" : "default"}>
                      {cls.status === "cancelled" ? "Cancelled" : "Confirmed"}
                    </Badge>
                  </div>
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
                <CardFooter className="flex justify-end space-x-2">
                  {cls.status !== "cancelled" && (
                    <>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleCancel(cls.id)}>
                        Cancel
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

