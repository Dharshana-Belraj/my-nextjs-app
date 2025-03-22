"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, Clock, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Mock data for teacher requests
const mockRequests = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra fundamentals",
    teacher: "Ms. Johnson",
    date: new Date(2025, 2, 25),
    startTime: "09:00",
    endTime: "10:30",
    status: "open",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Physics experiments",
    teacher: "Mr. Williams",
    date: new Date(2025, 2, 27),
    startTime: "11:00",
    endTime: "12:30",
    status: "open",
  },
  {
    id: 3,
    subject: "English",
    topic: "Essay writing",
    teacher: "Mrs. Davis",
    date: new Date(2025, 3, 2),
    startTime: "14:00",
    endTime: "15:30",
    status: "applied",
  },
  {
    id: 4,
    subject: "History",
    topic: "World War II",
    teacher: "Mr. Brown",
    date: new Date(2025, 3, 5),
    startTime: "10:00",
    endTime: "11:30",
    status: "accepted",
  },
]

export default function TeacherRequests() {
  const [requests, setRequests] = useState(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")

  const handleApply = (id: number) => {
    setRequests(
      requests.map((req) => {
        if (req.id === id) {
          return { ...req, status: "applied" }
        }
        return req
      }),
    )

    toast({
      title: "Application submitted",
      description: "Your application has been submitted successfully.",
    })
  }

  const handleCancel = (id: number) => {
    setRequests(
      requests.map((req) => {
        if (req.id === id) {
          return { ...req, status: "open" }
        }
        return req
      }),
    )

    toast({
      title: "Application cancelled",
      description: "Your application has been cancelled.",
    })
  }

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.topic.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = subjectFilter === "all" || req.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  const subjects = ["Mathematics", "Science", "English", "History"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No matching requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <Card key={req.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{req.subject}</CardTitle>
                    <CardDescription>{req.topic}</CardDescription>
                  </div>
                  <Badge
                    variant={req.status === "open" ? "outline" : req.status === "applied" ? "secondary" : "default"}
                  >
                    {req.status === "open" ? "Open" : req.status === "applied" ? "Applied" : "Accepted"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2" />
                    <span>Teacher: {req.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(req.date, "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {req.startTime} - {req.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {req.status === "open" && <Button onClick={() => handleApply(req.id)}>Apply</Button>}
                {req.status === "applied" && (
                  <Button variant="outline" onClick={() => handleCancel(req.id)}>
                    Cancel Application
                  </Button>
                )}
                {req.status === "accepted" && <Button variant="outline">View Details</Button>}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

