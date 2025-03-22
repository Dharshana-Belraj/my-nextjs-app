"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().optional(),
  needsVolunteer: z.boolean().default(false),
})

const mockClasses = [
  {
    id: 1,
    subject: "Mathematics",
    date: new Date(2025, 2, 22),
    startTime: "09:00",
    endTime: "10:30",
    description: "Algebra fundamentals and equations",
    needsVolunteer: true,
  },
  {
    id: 2,
    subject: "Science",
    date: new Date(2025, 2, 23),
    startTime: "11:00",
    endTime: "12:30",
    description: "Introduction to physics concepts",
    needsVolunteer: false,
  },
  {
    id: 3,
    subject: "English",
    date: new Date(2025, 2, 24),
    startTime: "14:00",
    endTime: "15:30",
    description: "Essay writing and grammar",
    needsVolunteer: true,
  },
]

export default function ClassScheduler() {
  const [classes, setClasses] = useState(mockClasses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      startTime: "",
      endTime: "",
      description: "",
      needsVolunteer: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newClass = {
      id: classes.length + 1,
      ...values,
    }

    setClasses([...classes, newClass])
    setIsDialogOpen(false)
    form.reset()

    toast({
      title: "Class scheduled",
      description: `${values.subject} class scheduled for ${format(values.date, "PPP")}`,
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
          <CardDescription>Select a date to view scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Schedule New Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule a New Class</DialogTitle>
                <DialogDescription>Fill in the details to schedule a new class.</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mathematics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter class details..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="needsVolunteer"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Request Volunteer</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Check this if you need a volunteer for this class
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Schedule Class</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">
          {date ? `Classes for ${format(date, "MMMM d, yyyy")}` : "All Scheduled Classes"}
        </h3>

        {filteredClasses.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No classes scheduled for this date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClasses.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{cls.subject}</CardTitle>
                    {cls.needsVolunteer && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Needs Volunteer
                      </span>
                    )}
                  </div>
                  <CardDescription className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {format(cls.date, "MMMM d, yyyy")}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {cls.startTime} - {cls.endTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{cls.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

