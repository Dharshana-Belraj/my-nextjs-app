"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for student performance
const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    grade: "8th",
    subjects: {
      Mathematics: { attendance: 95, score: 87 },
      Science: { attendance: 90, score: 92 },
      English: { attendance: 85, score: 78 },
      History: { attendance: 88, score: 85 },
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    grade: "8th",
    subjects: {
      Mathematics: { attendance: 80, score: 75 },
      Science: { attendance: 85, score: 88 },
      English: { attendance: 90, score: 82 },
      History: { attendance: 92, score: 90 },
    },
  },
  {
    id: 3,
    name: "Charlie Brown",
    grade: "8th",
    subjects: {
      Mathematics: { attendance: 75, score: 68 },
      Science: { attendance: 80, score: 72 },
      English: { attendance: 85, score: 90 },
      History: { attendance: 78, score: 75 },
    },
  },
  {
    id: 4,
    name: "Diana Miller",
    grade: "8th",
    subjects: {
      Mathematics: { attendance: 98, score: 95 },
      Science: { attendance: 95, score: 90 },
      English: { attendance: 92, score: 88 },
      History: { attendance: 90, score: 85 },
    },
  },
]

export default function StudentPerformance() {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const chartData = mockStudents.map((student) => ({
    name: student.name,
    score: student.subjects[selectedSubject as keyof typeof student.subjects]?.score || 0,
    attendance: student.subjects[selectedSubject as keyof typeof student.subjects]?.attendance || 0,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <Input placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full md:w-48">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="History">History</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview - {selectedSubject}</CardTitle>
          <CardDescription>View student scores and attendance for {selectedSubject}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Score" fill="#8884d8" />
                <Bar dataKey="attendance" name="Attendance %" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
          <CardDescription>Detailed performance data for each student</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    {student.subjects[selectedSubject as keyof typeof student.subjects]?.score || 0}%
                  </TableCell>
                  <TableCell>
                    {student.subjects[selectedSubject as keyof typeof student.subjects]?.attendance || 0}%
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

