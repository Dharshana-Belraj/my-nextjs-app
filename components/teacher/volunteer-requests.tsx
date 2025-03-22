"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Plus, Calendar, Clock, User, BookOpen, Check, X } from "lucide-react"

// Mock data for volunteer requests
const mockRequests = [
  {
    id: 1,
    subject: "Mathematics",
    date: new Date(2025, 2, 25),
    startTime: "09:00",
    endTime: "10:30",
    description: "Need a volunteer to assist with algebra lesson",
    applicants: [
      {
        id: 101,
        name: "John Doe",
        expertise: "Mathematics, Physics",
        qualifications: "B.Sc. Mathematics",
        status: "pending",
      },
      {
        id: 102,
        name: "Jane Smith",
        expertise: "Mathematics, Computer Science",
        qualifications: "M.Sc. Mathematics",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    subject: "Science",
    date: new Date(2025, 2, 27),
    startTime: "11:00",
    endTime: "12:30",
    description: "Looking for a volunteer to help with physics experiments",
    applicants: [
      {
        id: 103,
        name: "Robert Johnson",
        expertise: "Physics, Chemistry",
        qualifications: "Ph.D. Physics",
        status: "pending",
      },
    ],
  },
]

export default function VolunteerRequests() {
  const [requests, setRequests] = useState(mockRequests)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAccept = (requestId: number, applicantId: number) => {
    setRequests(
      requests.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            applicants: request.applicants.map((applicant) => {
              if (applicant.id === applicantId) {
                return { ...applicant, status: "accepted" }
              }
              return applicant
            }),
          }
        }
        return request
      }),
    )

    toast({
      title: "Volunteer accepted",
      description: "The volunteer has been accepted for this class.",
    })
  }

  const handleDecline = (requestId: number, applicantId: number) => {
    setRequests(
      requests.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            applicants: request.applicants.map((applicant) => {
              if (applicant.id === applicantId) {
                return { ...applicant, status: "declined" }
              }
              return applicant
            }),
          }
        }
        return request
      }),
    )

    toast({
      title: "Volunteer declined",
      description: "The volunteer has been declined for this class.",
    })
  }

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(false)

    toast({
      title: "Volunteer request created",
      description: "Your request for volunteers has been posted.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Volunteer Requests</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Volunteer Request</DialogTitle>
              <DialogDescription>Post a request for volunteers to help with your class.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Mathematics" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="flex space-x-2">
                    <Input id="startTime" type="time" />
                    <span className="flex items-center">to</span>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what you need help with..." />
              </div>

              <DialogFooter>
                <Button type="submit">Create Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {requests.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No volunteer requests found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <CardTitle>{request.subject}</CardTitle>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(request.date, "MMMM d, yyyy")}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {request.startTime} - {request.endTime}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{request.description}</p>

                <h4 className="font-semibold mb-2">Applicants ({request.applicants.length})</h4>
                {request.applicants.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No applicants yet.</p>
                ) : (
                  <div className="space-y-4">
                    {request.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className={`p-4 border rounded-lg ${
                          applicant.status === "accepted"
                            ? "border-green-200 bg-green-50"
                            : applicant.status === "declined"
                              ? "border-red-200 bg-red-50"
                              : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              {applicant.name}
                              {applicant.status === "accepted" && (
                                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                  Accepted
                                </span>
                              )}
                              {applicant.status === "declined" && (
                                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                                  Declined
                                </span>
                              )}
                            </h5>
                            <p className="text-sm flex items-center mt-1">
                              <BookOpen className="h-4 w-4 mr-2" />
                              {applicant.expertise}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{applicant.qualifications}</p>
                          </div>

                          {applicant.status === "pending" && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleAccept(request.id, applicant.id)}
                              >
                                <Check className="h-4 w-4 mr-1" /> Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDecline(request.id, applicant.id)}
                              >
                                <X className="h-4 w-4 mr-1" /> Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

