"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Sparkles, MessageCircle, Globe } from "lucide-react"
import { contactInfo } from "@/lib/data"

interface ContactSectionProps {
  setCursorVariant: (variant: string) => void
}

export function ContactSection({ setCursorVariant }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 pb-32 bg-gradient-to-br from-black via-purple-950/20 to-black relative overflow-hidden min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">        
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-600/15 to-purple-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Get In Touch</span>
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Let's Create Magic
          </motion.h2>
          
          <motion.div
            className="flex justify-center mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-cyan-500 to-transparent rounded-full w-32" />
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Ready to bring your vision to life? Let's collaborate and build something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form - Takes 3 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative group h-full">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 lg:p-10 overflow-hidden h-full">
                {/* Dynamic background patterns */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="flex items-center gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Send Me a Message</h3>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-6 py-4 bg-gray-900/70 backdrop-blur-sm border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-500 text-white placeholder-gray-400"
                          placeholder="Enter your full name"
                          onMouseEnter={() => setCursorVariant("text")}
                          onMouseLeave={() => setCursorVariant("default")}
                        />
                        {focusedField === "name" && (
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-20 -z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                        Your Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-6 py-4 bg-gray-900/70 backdrop-blur-sm border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-500 text-white placeholder-gray-400"
                          placeholder="your.email@example.com"
                          onMouseEnter={() => setCursorVariant("text")}
                          onMouseLeave={() => setCursorVariant("default")}
                        />
                        {focusedField === "email" && (
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-20 -z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={6}
                          className="w-full px-6 py-4 bg-gray-900/70 backdrop-blur-sm border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-500 text-white placeholder-gray-400 resize-none"
                          placeholder="Tell me about your project, ideas, or just say hello!"
                          onMouseEnter={() => setCursorVariant("text")}
                          onMouseLeave={() => setCursorVariant("default")}
                        />
                        {focusedField === "message" && (
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-20 -z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setCursorVariant("button")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        <div className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Sending Magic...
                            </>
                          ) : isSubmitted ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 mr-3"
                              >
                                ✨
                              </motion.div>
                              Message Sent!
                            </>
                          ) : (
                            <>
                              Send Message
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Send className="ml-3 h-5 w-5" />
                              </motion.div>
                            </>
                          )}
                        </div>
                      </motion.button>

                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="text-green-400 text-center mt-4 flex items-center justify-center gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          Thank you! Your message has been sent successfully.
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                      )}
                    </motion.div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info - Takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6 h-full flex flex-col">
              {/* Quick Contact Cards */}
              <motion.div
                className="relative group flex-1"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <p className="text-sm text-gray-400">Quick Response</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-purple-400 hover:text-purple-300 transition-colors font-medium break-all"
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group flex-1"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Location</h4>
                      <p className="text-sm text-gray-400">Based in</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p
                      className="text-cyan-400 font-medium"
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="relative group flex-1"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 h-full flex flex-col">
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    Connect With Me
                  </h4>
                  
                  <div className="space-y-4 flex-1">
                    <motion.a
                      href="#"
                      className="flex items-center gap-4 p-3 rounded-xl bg-blue-900/20 hover:bg-blue-900/30 transition-all duration-300 group/social"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 bg-blue-600 rounded-lg group-hover/social:scale-110 transition-transform">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">LinkedIn</p>
                        <p className="text-gray-400 text-sm truncate">{contactInfo.social.linkedin}</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="#"
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/20 hover:bg-gray-800/30 transition-all duration-300 group/social"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 bg-gray-700 rounded-lg group-hover/social:scale-110 transition-transform">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">GitHub</p>
                        <p className="text-gray-400 text-sm truncate">{contactInfo.social.github}</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}