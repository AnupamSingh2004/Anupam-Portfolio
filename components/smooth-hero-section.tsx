"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SmoothHeroSectionProps {
  setCursorVariant: (variant: string) => void
}

export function SmoothHeroSection({ setCursorVariant }: SmoothHeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      setMousePosition({ x: x * 30, y: y * 30 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const mouseX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 })
  const mouseY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 })

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-10"
          style={{ opacity }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-purple-900/20 to-transparent z-0"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black to-transparent z-0"
          style={{ y: y2 }}
        />

        {/* Optimized floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Reduced large floating orbs */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                background: `radial-gradient(circle, ${i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}15 0%, transparent 70%)`,
                width: `${200 + Math.random() * 150}px`,
                height: `${200 + Math.random() * 150}px`,
              }}
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                scale: 0.8 + Math.random() * 0.4,
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                ],
                y: [
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                ],
                scale: [0.8 + Math.random() * 0.4, 1.2 + Math.random() * 0.3, 0.8 + Math.random() * 0.4],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Optimized particle system */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/30 rounded-full will-change-transform"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                opacity: Math.random() * 0.6 + 0.2,
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                ],
                y: [
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                ],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Optimized geometric shapes */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-purple-500/15 will-change-transform"
              style={{
                width: `${100 + Math.random() * 80}px`,
                height: `${100 + Math.random() * 80}px`,
                borderRadius: i % 2 === 0 ? "50%" : "8px",
              }}
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                rotate: Math.random() * 360,
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
                ],
                y: [
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                  Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                ],
                rotate: [0, 360],
              }}
              transition={{
                duration: 30 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Smooth mouse-following elements */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-5 will-change-transform"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            x: mouseX,
            y: mouseY,
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-10 will-change-transform"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            x: mouseX.get() * -0.3,
            y: mouseY.get() * -0.3,
            left: "30%",
            top: "30%",
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-20 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-8"
          style={{ y: y1 }}
        >
          {/* Enhanced title with smoother animations */}
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative will-change-transform"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Anupam Singh
            </motion.span>

            {/* Subtle floating letters effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {"Anupam Singh".split("").map(
                (letter, i) =>
                  letter !== " " && (
                    <motion.span
                      key={i}
                      className="absolute text-purple-400/10 text-6xl md:text-8xl font-bold will-change-transform"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60,
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        duration: 6,
                        delay: i * 0.1 + 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 12,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${(i / 12) * 100}%`,
                        top: "50%",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ),
              )}
            </motion.div>
          </motion.h1>

          {/* Smoother subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed relative"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <motion.span
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Full-Stack Developer specializing in React, Next.js, and AI Integration
            </motion.span>

            {/* Smoother typing cursor */}
            <motion.span
              className="inline-block w-0.5 h-6 bg-purple-400 ml-1"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.p>

          {/* Enhanced buttons with smoother animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden group px-8 py-4 text-lg"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <span className="relative z-10 flex items-center">
                  View Projects
                  <motion.div
                    animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-600/10 relative overflow-hidden group px-8 py-4 text-lg"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <span className="relative z-10">Download Resume</span>
                <motion.span
                  className="absolute inset-0 bg-purple-600/20"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Smoother scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ y: y2 }}
        >
          <motion.p
            className="text-sm text-gray-400 mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="absolute -inset-3 rounded-full bg-purple-500/20 blur-md"
            />
            <ChevronDown className="h-6 w-6 text-purple-400 relative z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
