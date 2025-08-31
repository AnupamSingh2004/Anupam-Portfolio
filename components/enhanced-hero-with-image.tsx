"use client"

import { useRef, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface EnhancedHeroWithImageProps {
  setCursorVariant: (variant: string) => void
}

export function EnhancedHeroWithImage({ setCursorVariant }: EnhancedHeroWithImageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Optimized transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x * 30)
      mouseY.set(y * 20)
    }
  }, [mouseX, mouseY])

  // Memoized grid configuration
  const gridConfig = useMemo(() => ({
    mainGrid: Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 60 + (i % 3) * 20,
      delay: i * 0.2,
      intensity: 0.3 + (i % 4) * 0.1
    })),
    orbitalDots: Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i * 15) % 360,
      radius: 150 + (i % 3) * 50,
      speed: 0.5 + (i % 2) * 0.3
    })),
    floatingElements: [
      { icon: "⚛️", x: 15, y: 25, scale: 1.2 },
      { icon: "🔮", x: 85, y: 20, scale: 1.0 },
      { icon: "⚡", x: 10, y: 70, scale: 1.1 },
      { icon: "🚀", x: 90, y: 75, scale: 1.3 },
      { icon: "✨", x: 25, y: 85, scale: 0.9 },
      { icon: "💫", x: 75, y: 15, scale: 1.1 }
    ]
  }), [])

  // Handle navigation
  const handleViewProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Anupam_Singh_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Beautiful Grid Background System */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Primary Interactive Grid */}
        <motion.div 
          className="absolute inset-0"
          style={{
            x: useTransform(springX, [-30, 30], [-15, 15]),
            y: useTransform(springY, [-20, 20], [-10, 10])
          }}
        >
          {/* Geometric grid pattern */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <pattern id="hexGrid" width="100" height="87" patternUnits="userSpaceOnUse">
                <motion.path
                  d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.15)"
                  strokeWidth="0.5"
                  animate={{
                    strokeWidth: [0.5, 1, 0.5],
                    stroke: [
                      "rgba(139, 92, 246, 0.15)",
                      "rgba(6, 182, 212, 0.25)",
                      "rgba(139, 92, 246, 0.15)"
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="43.5"
                  r="2"
                  fill="rgba(139, 92, 246, 0.3)"
                  animate={{
                    r: [1, 3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                />
              </pattern>

              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.05)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
              </linearGradient>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#hexGrid)" opacity="0.6" />
            <rect width="100%" height="100%" fill="url(#gridGradient)" />
          </svg>


          {/* Floating geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            {gridConfig.mainGrid.map((item) => (
              <motion.div
                key={`geo-${item.id}`}
                className="absolute"
                style={{
                  left: `${10 + (item.id % 5) * 20}%`,
                  top: `${15 + Math.floor(item.id / 5) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 8 + item.delay,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-2 h-2 border border-purple-400/30 rotate-45"
                  style={{
                    background: `linear-gradient(45deg, 
                      rgba(139, 92, 246, ${item.intensity}), 
                      rgba(6, 182, 212, ${item.intensity * 0.7}))`
                  }}
                  whileHover={{
                    scale: 3,
                    rotate: 180,
                    borderColor: "rgba(6, 182, 212, 0.8)"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Elegant floating elements */}
          {gridConfig.floatingElements.map((element, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute text-2xl cursor-pointer select-none filter drop-shadow-lg"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                scale: element.scale
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: element.scale * 1.5,
                rotate: 360,
                filter: "brightness(1.5) drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))",
                transition: { duration: 0.4 }
              }}
            >
              {element.icon}
            </motion.div>
          ))}

          {/* Flowing connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.4)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
              </linearGradient>
            </defs>
            
            {Array.from({ length: 6 }, (_, i) => (
              <motion.path
                key={`path-${i}`}
                d={`M ${10 + i * 15}% 10% Q ${50 + i * 5}% ${30 + i * 10}% ${90 - i * 10}% 90%`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="5,5"
                animate={{
                  strokeDashoffset: [0, -20],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Ambient glow layers */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ y: y1 }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 z-20 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center"
            style={{ y: y1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative"
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
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Hi, I'm Anupam Singh
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Full-Stack Developer specializing in Next.js, API development, Backend Architecture and DevOps
              <motion.span
                className="inline-block w-0.5 h-6 bg-purple-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={handleViewProjects}
                  className="bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden group px-8 py-4 text-lg"
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="relative z-10 flex items-center">
                    View Projects
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleDownloadResume}
                  className="border-purple-400 text-purple-400 hover:bg-purple-600/10 relative overflow-hidden px-8 py-4 text-lg"
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="relative z-10">Download Resume</span>
                  <motion.span
                    className="absolute inset-0 bg-purple-600/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Profile Image */}
          {/* Right Profile Image - Creative Design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex justify-center lg:justify-end relative z-20"
            style={{ y: y1 }}
          >
            <div className="relative w-96 h-96 md:w-[480px] md:h-[480px]">
              {/* Holographic Frame */}
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-pink-500/20 rounded-3xl blur-xl" />
                <div className="absolute inset-2 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 rounded-2xl border border-white/10" />
              </motion.div>

              {/* Dynamic Energy Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute inset-0"
                  animate={{ 
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                  }}
                  style={{ 
                    transform: `scale(${1 + i * 0.15})`,
                  }}
                >
                  <div className={`absolute inset-0 rounded-full border ${
                    i === 0 ? 'border-purple-400/30' : 
                    i === 1 ? 'border-cyan-400/25' : 'border-pink-400/20'
                  }`} style={{ borderStyle: 'dashed', borderWidth: '2px' }} />
                </motion.div>
              ))}

              {/* Main Image Container with Morphing Shape */}
              <motion.div
                className="absolute inset-8 relative overflow-hidden"
                style={{
                  borderRadius: "30% 70% 70% 30% / 50% 40% 60% 50%",
                }}
                animate={{
                  borderRadius: [
                    "30% 70% 70% 30% / 50% 40% 60% 50%",
                    "70% 30% 30% 70% / 40% 60% 40% 60%",
                    "50% 50% 50% 50% / 50% 50% 50% 50%",
                    "30% 70% 70% 30% / 50% 40% 60% 50%"
                  ],
                  boxShadow: [
                    "0 0 50px rgba(139, 92, 246, 0.4)",
                    "0 0 80px rgba(6, 182, 212, 0.5)",
                    "0 0 60px rgba(236, 72, 153, 0.4)",
                    "0 0 50px rgba(139, 92, 246, 0.4)"
                  ]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 100px rgba(139, 92, 246, 0.6)",
                  transition: { duration: 0.6 }
                }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {/* Clean border frame */}
                <div 
                  className="absolute inset-0 border-2 border-white/20" 
                  style={{ borderRadius: "inherit" }} 
                />
                
                {/* Profile Image - High Quality */}
                <Image
                  src="./profile.png"
                  alt="Anupam Singh"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                  style={{ 
                    borderRadius: "inherit",
                    imageRendering: "crisp-edges"
                  }}
                  priority
                  quality={100}
                />

                {/* Subtle animated glow - positioned behind image */}
                <motion.div
                  className="absolute -inset-2 -z-10"
                  style={{ 
                    borderRadius: "inherit",
                    background: "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(236, 72, 153, 0.3))",
                    filter: "blur(20px)"
                  }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              {/* Floating Tech Symbols with Enhanced Animation */}
              {[
                { symbol: "React", icon: "⚛️", x: -20, y: 20, delay: 0 },
                { symbol: "Next.js", icon: "▲", x: 105, y: 15, delay: 0.5 },
                { symbol: "Node.js", icon: "⬢", x: -15, y: 70, delay: 1 },
                { symbol: "TypeScript", icon: "TS", x: 110, y: 75, delay: 1.5 },
                { symbol: "API", icon: "{ }", x: 15, y: -10, delay: 2 },
                { symbol: "Database", icon: "🗄️", x: 85, y: -5, delay: 2.5 },
                { symbol: "Cloud", icon: "☁️", x: 50, y: 105, delay: 3 }
              ].map((item, i) => (
                <motion.div
                  key={`tech-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0.8],
                    y: [0, -20, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 2,
                    rotate: 720,
                    transition: { duration: 0.5 }
                  }}
                >
                  <motion.div
                    className="relative flex items-center justify-center w-12 h-12 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(139, 92, 246, 0.3)",
                        "0 0 30px rgba(6, 182, 212, 0.4)",
                        "0 0 20px rgba(139, 92, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
                  >
                    <span className="text-lg font-bold text-white/90">
                      {item.icon}
                    </span>
                  </motion.div>
                  
                  {/* Tech label */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 font-medium whitespace-nowrap"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: item.delay }}
                  >
                    {item.symbol}
                  </motion.div>
                </motion.div>
              ))}

              {/* Subtle Particle System */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 10 - 5, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ y: y2 }}
        >
          <motion.p
            className="text-sm text-gray-400 mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -inset-3 rounded-full bg-purple-500/20 blur-md"
            />
            <ChevronDown className="h-6 w-6 text-purple-400 relative z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}