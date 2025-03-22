"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for student progress
const mockProgress = {
  Mathematics: [
    { month: "January", score: 75, attendance: 90 },
    { month: "February", score: 80, attendance: 85 },
    { month: "March", score: 85, attendance: 95 },
  ],
  Science: [
    { month: "January", score: 82, attendance: 88 },
    { month: "February", score: 85, attendance: 90 },
    { month: "March", score: 90, attendance: 92 },
  ],
  English: [
    { month: "January", score: 78, attendance: 85 },
    { month: "February", score: 80, attendance: 88 },
    { month: "March", score: 85, attendance: 90 },
  ],
  History: [
    { month: "January", score: 70, attendance: 80 },
    { month: "February", score: 75, attendance: 85 },
    { month: "March", score: 80, attendance: 88 },
  ],
}

const mockAttendance = [
  { date: "2025-03-01", status: "present" },
  { date: "2025-03-02", status: "present" },
  { date: "2025-03-03", status: "absent" },
  { date: "2025-03-04", status: "present" },
  { date: "2025-03-05", status: "late" },
  { date: "2025-03-06", status: "present" },
  { date: "2025-03-07", status: "present" },
]

export default function StudentProgress() {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")

  const progressData = mockProgress[selectedSubject as keyof typeof mockProgress]

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="w-48">
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
          <CardTitle>Performance Trend - {selectedSubject}</CardTitle>
          <CardDescription>View your child's progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={progressData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" name="Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <CardDescription>Recent test scores and evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progressData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.score}%</TableCell>
                  <TableCell>{item.attendance}%</TableCell>
                  <TableCell>
                    {item.score >= 90
                      ? "A"
                      : item.score >= 80
                        ? "B"
                        : item.score >= 70
                          ? "C"
                          : item.score >= 60
                            ? "D"
                            : "F"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription>Recent attendance history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === "present"
                          ? "bg-green-100 text-green-800"
                          : item.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
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

