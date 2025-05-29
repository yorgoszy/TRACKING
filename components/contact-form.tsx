"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function ContactForm() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Input placeholder={t("contact.name")} required />
      </div>
      <div className="space-y-2">
        <Input type="email" placeholder={t("contact.email")} required />
      </div>
      <div className="space-y-2">
        <Textarea placeholder={t("contact.message")} rows={4} required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("contact.sending") : t("contact.send")}
      </Button>
    </form>
  )
}
