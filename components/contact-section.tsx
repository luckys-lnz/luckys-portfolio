"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Check } from "lucide-react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Simple validation
  function validate() {
    if (!formData.name.trim()) {
      setError("Please enter your name.")
      return false
    }
    if (!formData.email.trim()) {
      setError("Please enter your email.")
      return false
    }
    // Basic email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (!formData.subject.trim()) {
      setError("Please enter a subject.")
      return false
    }
    if (!formData.message.trim()) {
      setError("Please enter a message.")
      return false
    }
    setError("")
    return true
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Construct mailto link
    const mailto = `mailto:luckyslnz@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`

    // Open mail client
    window.location.href = mailto

    // Simulate submission success after short delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-slate-400/20 dark:bg-slate-300/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-3xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
            <span className="text-primary font-mono text-xl">04.</span> Get In Touch
          </motion.h2>

          <motion.p variants={itemVariants} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my
            best to get back to you!
          </motion.p>

          <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-lg">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-left block">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Senor Peroz"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-left block">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="perez@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-left block">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can I help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-left block">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-left">{error}</p>
              )}

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || isSubmitted}>
                {isSubmitting ? (
                  <>
                    <Send className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
