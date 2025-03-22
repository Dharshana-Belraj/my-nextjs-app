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
    name: "Ms. Johnson",
    role: "Mathematics Teacher",
    avatar: "/placeholder.svg",
    lastMessage: "Alice is doing very well in class",
    lastMessageTime: "10:30 AM",
    unread: 0,
  },
  {
    id: 2,
    name: "Mr. Williams",
    role: "Science Teacher",
    avatar: "/placeholder.svg",
    lastMessage: "Please remind Charlie to complete his homework",
    lastMessageTime: "Yesterday",
    unread: 1,
  },
  {
    id: 3,
    name: "Mrs. Davis",
    role: "English Teacher",
    avatar: "/placeholder.svg",
    lastMessage: "The next essay is due on Friday",
    lastMessageTime: "Monday",
    unread: 0,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: "me",
    receiverId: 1,
    content: "Hello Ms. Johnson, how is Alice doing in Mathematics class?",
    timestamp: "10:15 AM",
  },
  {
    id: 2,
    senderId: 1,
    receiverId: "me",
    content:
      "Hi there! Alice is doing very well. She scored 90% in the last test and has been actively participating in class discussions.",
    timestamp: "10:20 AM",
  },
  {
    id: 3,
    senderId: "me",
    receiverId: 1,
    content: "That's great to hear! Are there any areas where she could improve?",
    timestamp: "10:25 AM",
  },
  {
    id: 4,
    senderId: 1,
    receiverId: "me",
    content:
      "She's strong in most areas, but could use a bit more practice with word problems. I've assigned some extra exercises that might help.",
    timestamp: "10:30 AM",
  },
]

export default function ParentChat() {
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
          <Input placeholder="Search teachers..." />
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
            Select a teacher to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

