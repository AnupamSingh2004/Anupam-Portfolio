"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useInView, useSpring } from "framer-motion"

interface EnhancedTimelineProps {
  setCursorVariant: (variant: string) => void
}

const journeySteps = [
  {
    year: "2019",
    title: "Discovered Programming",
    description:
      "Started my coding journey in Class 10th, creating basic programs and simple games that sparked my passion for technology",
    icon: "💡",
    color: "#8b5cf6",
    details: "Built my first calculator and tic-tac-toe game in Python",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    year: "2020-2022",
    title: "Learned Web Development",
    description:
      "Before getting into college, I dove deep into web development, mastering HTML, CSS, JavaScript, and building my first responsive websites",
    icon: "🌐",
    color: "#06b6d4",
    details: "Created portfolio websites and learned React fundamentals",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    year: "2023",
    title: "Got into IIIT Jabalpur",
    description:
      "Started B.Tech CSE at IIIT Jabalpur, diving deep into computer science fundamentals, algorithms, and data structures",
    icon: "🎓",
    color: "#10b981",
    details: "Focused on competitive programming and advanced web development",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    year: "2024",
    title: "Participated in Hackathons",
    description:
      "Actively participated in hackathons like HACKJMI and HackByte, building innovative projects and gaining experience in rapid prototyping",
    icon: "🏆",
    color: "#f59e0b",
    details: "Participated in BigDocs hackathon and gained experience in team collaboration",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    year: "2024-2025",
    title: "Full Stack Developer & Open Source",
    description:
      "Mastered React, Next.js, and became an active open source contributor to projects like TimeWarp and Busify",
    icon: "🚀",
    color: "#ef4444",
    details: "Built scalable applications serving 500+ users",
    gradient: "from-red-500 to-pink-600",
  },
  {
    year: "2025",
    title: "Currently Exploring DevOps",
    description:
      "Expanding my skillset into DevOps, learning Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure automation",
    icon: "⚙️",
    color: "#8b5cf6",
    details: "Focusing on containerization and deployment automation",
    gradient: "from-purple-500 to-indigo-600",
  },
]

export function EnhancedTimeline({ setCursorVariant }: EnhancedTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const timelineInView = useInView(timelineRef, { once: false, margin: "-200px" })

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Enhanced scroll tracking
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  // Smooth progress tracking - optimized for better performance
  const smoothProgress = useSpring(0, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  })

  // Update progress based on scroll - optimized
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      smoothProgress.set(latest)
      setTimelineProgress(latest)
    })
    return unsubscribe
  }, [scrollYProgress, smoothProgress])

  // Optimized mouse tracking for parallax effects
  useEffect(() => {
    let animationFrame: number
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return
      
      // Throttle mouse updates for better performance
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const rect = timelineRef.current!.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        })
      })
    }

    const timeline = timelineRef.current
    if (timeline) {
      timeline.addEventListener("mousemove", handleMouseMove, { passive: true })
      return () => {
        timeline.removeEventListener("mousemove", handleMouseMove)
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const mouseX = useSpring(mousePosition.x, { stiffness: 120, damping: 25 })
  const mouseY = useSpring(mousePosition.y, { stiffness: 120, damping: 25 })

  // Auto-advance timeline based on scroll
  useEffect(() => {
    if (timelineInView) {
      const newActiveStep = Math.min(Math.floor(timelineProgress * journeySteps.length), journeySteps.length - 1)
      if (newActiveStep !== activeStep) {
        setActiveStep(newActiveStep)
      }
    }
  }, [timelineProgress, timelineInView, activeStep])

  return (
    <motion.div
      ref={timelineRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20 relative px-4 sm:px-6 lg:px-0"
    >
      {/* Enhanced background effects with proper fluid animations - kept original size */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            x: mouseX,
            y: mouseY,
          }}
        />

        {/* Improved floating particles with proper fluid motion - optimized */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              left: `${15 + i * 10}%`,
              top: `${20 + Math.sin(i * 0.5) * 40}%`,
              background: journeySteps[i % journeySteps.length]?.color || "#8b5cf6",
              opacity: 0.3,
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              x: [0, Math.sin(i) * 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Geometric shapes with fluid motion - optimized */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute will-change-transform"
            style={{
              width: `${12 + i * 4}px`,
              height: `${12 + i * 4}px`,
              left: `${20 + i * 12}%`,
              top: `${30 + Math.cos(i * 0.7) * 30}%`,
              background: `linear-gradient(45deg, ${journeySteps[i % journeySteps.length]?.color || "#8b5cf6"}40, transparent)`,
              borderRadius: i % 2 === 0 ? "50%" : "20%",
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.h3
        className="text-4xl md:text-5xl font-bold text-center mb-20 text-white relative z-10"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
          animate={{
            backgroundPosition: timelineInView ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
          }}
          transition={{
            duration: 8,
            repeat: timelineInView ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        >
          My Journey
        </motion.span>
      </motion.h3>

      <div className="relative max-w-7xl mx-auto">
        {/* Ultra-smooth timeline line - made responsive */}
        <div className={`absolute ${isMobile ? 'left-8' : 'left-1/2 transform -translate-x-1/2'} w-1 h-full bg-gray-800/50 rounded-full`}>
          <motion.div
            className="w-full rounded-full relative overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #8b5cf6)",
            }}
            animate={{
              height: timelineInView ? `${Math.min((activeStep + 1) * (100 / journeySteps.length), 100)}%` : "0%",
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ultra-smooth animated glow effect - optimized */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full will-change-transform"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <div className="space-y-24">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex items-center ${
                isMobile 
                  ? "flex-row" 
                  : index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              onMouseEnter={() => {
                setActiveStep(index)
                setCursorVariant("text")
              }}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {/* Enhanced content card - made responsive */}
              <div className={`${
                isMobile ? "w-full pl-20" : "w-5/12"
              } ${
                !isMobile && index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
              }`}>
                <motion.div
                  className={`bg-gradient-to-br ${step.gradient} p-1 rounded-3xl relative overflow-hidden group`}
                  whileHover={{ scale: 1.02, y: -10 }}
                  animate={{
                    boxShadow:
                      activeStep === index
                        ? `0 0 50px ${step.color}60, 0 0 100px ${step.color}30`
                        : `0 0 20px ${step.color}20`,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 relative overflow-hidden">
                    {/* Enhanced animated background - optimized */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${step.color}15 0%, transparent 70%)`,
                      }}
                      animate={{
                        scale: activeStep === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="flex items-center gap-4 mb-6"
                        animate={{
                          x: activeStep === index ? [0, 5, 0] : 0,
                        }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      >
                        <motion.span
                          className="text-3xl md:text-4xl"
                          animate={{
                            rotate: activeStep === index ? [0, 10, -10, 0] : 0,
                            scale: activeStep === index ? [1, 1.1, 1] : 1,
                          }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        >
                          {step.icon}
                        </motion.span>
                        <h4 className="text-xl md:text-2xl font-bold text-white">{step.title}</h4>
                      </motion.div>

                      <motion.p
                        className="text-gray-300 text-sm md:text-base leading-relaxed mb-4"
                        animate={{
                          opacity: activeStep === index ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.description}
                      </motion.p>

                      <motion.p
                        className="text-xs md:text-sm text-gray-400 italic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: activeStep === index ? 1 : 0.6,
                          y: activeStep === index ? 0 : 10,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.details}
                      </motion.p>
                    </div>

                    {/* Enhanced corner decoration with animation - kept original size */}
                    <motion.div
                      className="absolute top-0 right-0 w-24 h-24"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}40, transparent)`,
                        clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
                      }}
                      animate={{
                        scale: activeStep === index ? [1, 1.2, 1] : 1,
                        rotate: activeStep === index ? [0, 180, 360] : 0,
                        opacity: activeStep === index ? [0.4, 0.8, 0.4] : 0.4,
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Enhanced timeline node - made responsive */}
              <div className={`${
                isMobile ? "absolute left-0 w-16 flex justify-center" : "w-2/12 flex justify-center"
              }`}>
                <motion.div
                  className="relative w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 rounded-full border-4 flex items-center justify-center text-2xl md:text-3xl"
                  style={{
                    backgroundColor: step.color,
                    borderColor: activeStep === index ? step.color : "rgba(75, 85, 99, 1)",
                  }}
                  whileHover={{ scale: 1.4 }}
                  animate={{
                    scale: activeStep === index ? 1.3 : 1.1,
                    boxShadow:
                      activeStep === index
                        ? `0 0 60px ${step.color}80, 0 0 120px ${step.color}40`
                        : `0 0 20px ${step.color}40`,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    animate={{
                      rotate: activeStep === index ? [0, 360] : 0,
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    {step.icon}
                  </motion.span>

                  {/* Enhanced pulsing rings - optimized */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 rounded-full border-2 will-change-transform"
                      style={{
                        borderColor: `${step.color}60`,
                        scale: 1 + ring * 0.3,
                      }}
                      animate={{
                        scale: activeStep === index ? [1 + ring * 0.3, 1 + ring * 0.5, 1 + ring * 0.3] : 1 + ring * 0.3,
                        opacity: activeStep === index ? [0.6, 0.2, 0.6] : 0.3,
                      }}
                      transition={{
                        duration: 3,
                        repeat: activeStep === index ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                        delay: ring * 0.2,
                      }}
                    />
                  ))}

                  {/* Orbital particles - optimized */}
                  {activeStep === index && (
                    <>
                      {[0, 120, 240].map((angle, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full will-change-transform"
                          style={{ backgroundColor: step.color }}
                          animate={{
                            rotate: 360,
                            x: Math.cos((angle * Math.PI) / 180) * 40,
                            y: Math.sin((angle * Math.PI) / 180) * 40,
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </div>

              {/* Enhanced year display - responsive */}
              {!isMobile && (
                <div className={`w-5/12 ${index % 2 === 0 ? "pl-12" : "pr-12"}`}>
                  <motion.div
                    className="text-center"
                    animate={{
                      scale: activeStep === index ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-4 relative"
                      style={{ color: step.color }}
                      animate={{
                        textShadow:
                          activeStep === index
                            ? `0 0 30px ${step.color}80, 0 0 60px ${step.color}40`
                            : `0 0 10px ${step.color}40`,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.year}

                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
                        style={{ backgroundColor: step.color }}
                        animate={{
                          width: activeStep === index ? "80%" : "40%",
                          boxShadow: activeStep === index ? `0 0 20px ${step.color}80` : `0 0 5px ${step.color}40`,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Mobile year display */}
              {isMobile && (
                <div className="absolute left-0 top-0 w-16 flex justify-center -mt-6">
                  <motion.span
                    className="text-xs font-bold px-2 py-1 rounded-full border"
                    style={{ 
                      backgroundColor: `${step.color}20`,
                      color: step.color,
                      borderColor: `${step.color}60`
                    }}
                    animate={{
                      scale: activeStep === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.year}
                  </motion.span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}