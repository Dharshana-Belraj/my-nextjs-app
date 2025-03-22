"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip } from "lucide-react"

// Mock data for chat
const mockContacts = [
  {
    id: 1,
    name: "John Smith",
    role: "Parent",
    avatar: "/placeholder.svg",
    lastMessage: "How is Alice doing in class?",
    lastMessageTime: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Volunteer",
    avatar: "/placeholder.svg",
    lastMessage: "I'll be available to help with tomorrow's class",
    lastMessageTime: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Parent",
    avatar: "/placeholder.svg",
    lastMessage: "Thank you for the update",
    lastMessageTime: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Volunteer",
    avatar: "/placeholder.svg",
    lastMessage: "Can you share the lesson plan?",
    lastMessageTime: "Monday",
    unread: 0,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: "me",
    content: "Hello, I wanted to ask about Alice's progress in Mathematics.",
    timestamp: "10:15 AM",
  },
  {
    id: 2,
    senderId: "me",
    receiverId: 1,
    content: "Hi John, Alice is doing very well. She scored 90% in the last test.",
    timestamp: "10:20 AM",
  },
  {
    id: 3,
    senderId: 1,
    receiverId: "me",
    content: "That's great to hear! What areas should she focus on improving?",
    timestamp: "10:25 AM",
  },
  {
    id: 4,
    senderId: 1,
    receiverId: "me",
    content: "Also, will there be any additional homework this week?",
    timestamp: "10:30 AM",
  },
]

export default function TeacherChat() {
  const [selectedContact, setSelectedContact] = useState<number | null>(1)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedContact) return

    const newMsg = {
      id: messages.length + 1,
      senderId: "me",
      receiverId: selectedContact,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const selectedContactData = mockContacts.find((contact) => contact.id === selectedContact)

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Contacts sidebar */}
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-4 border-b">
          <Input placeholder="Search contacts..." />
        </div>
        <ScrollArea className="h-[calc(600px-65px)]">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 ${
                selectedContact === contact.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{contact.name}</h4>
                  <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                </div>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
                <p className="text-xs truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat header */}
            <div className="p-3 border-b flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedContactData?.avatar} alt={selectedContactData?.name} />
                <AvatarFallback>
                  {selectedContactData?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedContactData?.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedContactData?.role}</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages
                  .filter(
                    (msg) =>
                      (msg.senderId === selectedContact && msg.receiverId === "me") ||
                      (msg.senderId === "me" && msg.receiverId === selectedContact),
                  )
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
              <Button type="button" size="icon" variant="ghost" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

