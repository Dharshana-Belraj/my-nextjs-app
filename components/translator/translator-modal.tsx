"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Copy, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface TranslatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TranslatorModal({ isOpen, onClose }: TranslatorModalProps) {
  const [isListening, setIsListening] = useState(false)
  const [tamilText, setTamilText] = useState("")
  const [englishText, setEnglishText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.lang = "ta-IN" // Tamil language

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        setTamilText(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch (error) {
        console.error("Failed to start speech recognition:", error)
      }
    }
  }

  const translateText = async () => {
    if (!tamilText.trim()) return

    setIsTranslating(true)

    try {
      // In a real application, this would call an API for translation
      // For demo purposes, we'll simulate a translation with a timeout
      setTimeout(() => {
        // This is a mock translation - in a real app, you'd use a translation API
        setEnglishText(
          "This is a simulated translation of the Tamil text to English. In a production environment, this would use a proper translation API.",
        )
        setIsTranslating(false)
      }, 1500)
    } catch (error) {
      console.error("Translation error:", error)
      setIsTranslating(false)
      toast({
        title: "Translation failed",
        description: "There was an error translating the text. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(englishText)
    toast({
      title: "Copied to clipboard",
      description: "The translated text has been copied to your clipboard.",
    })
  }

  const shareTranslation = () => {
    // In a real app, this would open a sharing dialog or integrate with the app's messaging system
    toast({
      title: "Share translation",
      description: "This would open a sharing dialog in a production environment.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tamil to English Translator</DialogTitle>
          <DialogDescription>Speak in Tamil or type Tamil text to translate it to English.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative">
            <Textarea
              placeholder="Speak or type in Tamil..."
              value={tamilText}
              onChange={(e) => setTamilText(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              size="icon"
              variant={isListening ? "destructive" : "outline"}
              className="absolute bottom-2 right-2"
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>

          <Button onClick={translateText} disabled={!tamilText.trim() || isTranslating}>
            {isTranslating ? "Translating..." : "Translate to English"}
          </Button>

          {englishText && (
            <div className="relative mt-4">
              <Textarea value={englishText} readOnly className="min-h-[100px]" />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={shareTranslation}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

