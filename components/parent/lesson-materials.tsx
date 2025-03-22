"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { FileText, Video, Download, Search, BookOpen, Calendar } from "lucide-react"

// Mock data for lesson materials
const mockMaterials = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    type: "document",
    fileUrl: "#",
    uploadedAt: new Date(2025, 2, 20),
    description: "Introduction to algebraic expressions and equations",
  },
  {
    id: 2,
    title: "Physics Experiment: Forces",
    subject: "Science",
    type: "video",
    fileUrl: "#",
    uploadedAt: new Date(2025, 2, 22),
    description: "Video demonstration of Newton's laws of motion",
  },
  {
    id: 3,
    title: "Essay Writing Guidelines",
    subject: "English",
    type: "document",
    fileUrl: "#",
    uploadedAt: new Date(2025, 2, 23),
    description: "Step-by-step guide to writing effective essays",
  },
  {
    id: 4,
    title: "World War II Overview",
    subject: "History",
    type: "document",
    fileUrl: "#",
    uploadedAt: new Date(2025, 2, 24),
    description: "Summary of key events and figures in World War II",
  },
  {
    id: 5,
    title: "Geometry Lesson Recording",
    subject: "Mathematics",
    type: "video",
    fileUrl: "#",
    uploadedAt: new Date(2025, 2, 25),
    description: "Recorded lesson on geometric shapes and properties",
  },
]

export default function LessonMaterials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = subjectFilter === "all" || material.subject === subjectFilter
    const matchesType = typeFilter === "all" || material.type === typeFilter

    return matchesSearch && matchesSubject && matchesType
  })

  const subjects = ["Mathematics", "Science", "English", "History"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search materials..."
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
        <div className="w-full md:w-48">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No matching materials found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center">
                      {material.type === "document" ? (
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      ) : (
                        <Video className="h-5 w-5 mr-2 text-red-500" />
                      )}
                      {material.title}
                    </CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{material.subject}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(material.uploadedAt, "MMMM d, yyyy")}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

