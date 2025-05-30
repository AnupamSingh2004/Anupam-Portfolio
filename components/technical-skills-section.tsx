"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { skills } from "@/lib/data"

interface TechnicalSkillsSectionProps {
  setCursorVariant: (variant: string) => void
}

interface SkillBubble {
  name: string
  category: string
  x: number
  y: number
  z: number
  size: number
  color: string
  icon: string
  level: number
}

const categoryConfig = {
  languages: {
    color: "#8b5cf6",
    gradient: "from-purple-500 to-purple-700",
    icon: "💻",
    centerX: 0.2,
    centerY: 0.3,
  },
  frameworks: {
    color: "#06b6d4",
    gradient: "from-cyan-500 to-cyan-700",
    icon: "⚛️",
    centerX: 0.8,
    centerY: 0.3,
  },
  tools: {
    color: "#10b981",
    gradient: "from-emerald-500 to-emerald-700",
    icon: "🛠️",
    centerX: 0.2,
    centerY: 0.7,
  },
  platforms: {
    color: "#f59e0b",
    gradient: "from-amber-500 to-amber-700",
    icon: "☁️",
    centerX: 0.8,
    centerY: 0.7,
  },
  devops: {
    color: "#ef4444",
    gradient: "from-red-500 to-red-700",
    icon: "🚀",
    centerX: 0.5,
    centerY: 0.5,
  },
}

const skillIcons: Record<string, string> = {
  Python: "🐍",
  JavaScript: "🟨",
  TypeScript: "🔷",
  "C++": "⚡",
  Java: "☕",
  PHP: "🐘",
  SQL: "🗃️",
  "React.js": "⚛️",
  "Next.js": "▲",
  Django: "🎸",
  "Node.js": "🟢",
  "Express.js": "🚂",
  Redux: "🔄",
  Docker: "🐳",
  Git: "🌿",
  JWT: "🔐",
  "Web3.js": "🌐",
  MySQL: "🐬",
  MongoDB: "🍃",
  Supabase: "⚡",
  Redis: "🔴",
  AWS: "☁️",
  GCP: "🌤️",
  Linux: "🐧",
  Windows: "🪟",
  Terraform: "🏗️",
  Jenkins: "🔧",
  Kubernetes: "⚙️",
}

export function TechnicalSkillsSection({ setCursorVariant }: TechnicalSkillsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [skillBubbles, setSkillBubbles] = useState<SkillBubble[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Initialize skill bubbles
  useEffect(() => {
    if (typeof window === "undefined") return

    const initializeBubbles = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const bubbles: SkillBubble[] = []

      Object.entries(skills).forEach(([category, skillList]) => {
        const config = categoryConfig[category as keyof typeof categoryConfig]
        const centerX = rect.width * config.centerX
        const centerY = rect.height * config.centerY

        skillList.forEach((skill, index) => {
          const angle = (index / skillList.length) * Math.PI * 2
          const radius = 80 + Math.random() * 60
          const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100
          const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100

          bubbles.push({
            name: skill,
            category,
            x: Math.max(50, Math.min(rect.width - 50, x)),
            y: Math.max(50, Math.min(rect.height - 50, y)),
            z: Math.random() * 100,
            size: 60 + Math.random() * 40,
            color: config.color,
            icon: skillIcons[skill] || config.icon,
            level: Math.floor(Math.random() * 5) + 1,
          })
        })
      })

      setSkillBubbles(bubbles)
    }

    initializeBubbles()
    window.addEventListener("resize", initializeBubbles)
    return () => window.removeEventListener("resize", initializeBubbles)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Magnetic effect calculation
  const getMagneticOffset = (bubbleX: number, bubbleY: number, bubbleZ: number) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - bubbleX, 2) + Math.pow(mousePosition.y - bubbleY, 2))

    if (distance > 200) return { x: 0, y: 0, scale: 1 }

    const force = Math.max(0, 1 - distance / 200)
    const angle = Math.atan2(mousePosition.y - bubbleY, mousePosition.x - bubbleX)
    const zFactor = (bubbleZ / 100) * 0.5 + 0.5

    return {
      x: Math.cos(angle) * force * 40 * zFactor,
      y: Math.sin(angle) * force * 40 * zFactor,
      scale: 1 + force * 0.3,
    }
  }

  // Get skill connections
  const getSkillConnections = () => {
    const connections: Array<{ from: SkillBubble; to: SkillBubble; strength: number }> = []

    skillBubbles.forEach((bubble1, i) => {
      skillBubbles.forEach((bubble2, j) => {
        if (i >= j) return

        const distance = Math.sqrt(Math.pow(bubble1.x - bubble2.x, 2) + Math.pow(bubble1.y - bubble2.y, 2))
        const sameCategory = bubble1.category === bubble2.category
        const closeDistance = distance < 150

        if (sameCategory || closeDistance) {
          const strength = sameCategory ? 0.8 : Math.max(0, 1 - distance / 150) * 0.4
          if (strength > 0.2) {
            connections.push({ from: bubble1, to: bubble2, strength })
          }
        }
      })
    })

    return connections
  }

  const connections = getSkillConnections()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mt-20"
    >
      <h3
        className="text-3xl md:text-4xl font-bold mb-4 text-center text-white"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        Technical Skills Universe
      </h3>
      <p
        className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        Explore my technical expertise through an interactive skill galaxy. Hover to discover connections and expertise
        levels.
      </p>

      {/* Category Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <motion.button
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:text-white"
          }`}
          onClick={() => setSelectedCategory(null)}
          onMouseEnter={() => setCursorVariant("button")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Skills
        </motion.button>
        {Object.entries(categoryConfig).map(([category, config]) => (
          <motion.button
            key={category}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category ? "text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: selectedCategory === category ? config.color : undefined,
              border: `2px solid ${config.color}`,
            }}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{config.icon}</span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Skills Universe */}
      <div
        ref={containerRef}
        className="relative w-full h-[700px] md:h-[800px] bg-gradient-to-br from-gray-900/20 via-black to-purple-900/20 rounded-3xl overflow-hidden border border-gray-800"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * 800,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                ],
                y: [Math.random() * 800, Math.random() * 800],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          {/* Category centers */}
          {Object.entries(categoryConfig).map(([category, config]) => (
            <motion.div
              key={category}
              className="absolute w-32 h-32 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${config.color}40 0%, transparent 70%)`,
                left: `${config.centerX * 100}%`,
                top: `${config.centerY * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => {
            const fromOffset = getMagneticOffset(connection.from.x, connection.from.y, connection.from.z)
            const toOffset = getMagneticOffset(connection.to.x, connection.to.y, connection.to.z)

            const isHighlighted =
              hoveredSkill === connection.from.name ||
              hoveredSkill === connection.to.name ||
              (selectedCategory &&
                (connection.from.category === selectedCategory || connection.to.category === selectedCategory))

            return (
              <motion.line
                key={index}
                x1={connection.from.x + fromOffset.x}
                y1={connection.from.y + fromOffset.y}
                x2={connection.to.x + toOffset.x}
                y2={connection.to.y + toOffset.y}
                stroke={isHighlighted ? connection.from.color : "rgba(255,255,255,0.1)"}
                strokeWidth={isHighlighted ? 3 : 1}
                opacity={connection.strength * (isHighlighted ? 1 : 0.6)}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: connection.strength * (isHighlighted ? 1 : 0.6) }}
                transition={{ duration: 2, delay: index * 0.05 }}
              />
            )
          })}
        </svg>

        {/* Skill bubbles */}
        {skillBubbles.map((bubble, index) => {
          const magneticOffset = getMagneticOffset(bubble.x, bubble.y, bubble.z)
          const isHighlighted =
            hoveredSkill === bubble.name || (selectedCategory && bubble.category === selectedCategory)
          const isFiltered = selectedCategory && bubble.category !== selectedCategory
          const config = categoryConfig[bubble.category as keyof typeof categoryConfig]

          return (
            <motion.div
              key={bubble.name}
              className="absolute cursor-pointer group"
              initial={{
                x: bubble.x,
                y: bubble.y,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: bubble.x + magneticOffset.x,
                y: bubble.y + magneticOffset.y,
                opacity: isFiltered ? 0.2 : 1,
                scale: magneticOffset.scale * (isHighlighted ? 1.2 : 1),
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                opacity: { duration: 0.3 },
              }}
              style={{
                translateX: "-50%",
                translateY: "-50%",
                zIndex: Math.floor(bubble.z),
              }}
              onMouseEnter={() => {
                setHoveredSkill(bubble.name)
                setCursorVariant("button")
              }}
              onMouseLeave={() => {
                setHoveredSkill(null)
                setCursorVariant("text")
              }}
              whileHover={{ scale: magneticOffset.scale * 1.3 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  backgroundColor: bubble.color,
                  width: bubble.size + 20,
                  height: bubble.size + 20,
                  left: -10,
                  top: -10,
                }}
                animate={{
                  opacity: isHighlighted ? 0.8 : 0.3,
                  scale: isHighlighted ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Main bubble */}
              <motion.div
                className={`relative rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-2 backdrop-blur-sm bg-gradient-to-br ${config.gradient}`}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  borderColor: bubble.color,
                  boxShadow: `0 0 30px ${bubble.color}60`,
                }}
                animate={{
                  boxShadow: isHighlighted ? `0 0 50px ${bubble.color}80` : `0 0 30px ${bubble.color}60`,
                  rotateY: isHighlighted ? 360 : 0,
                }}
                transition={{
                  boxShadow: { duration: 0.3 },
                  rotateY: { duration: 2, ease: "easeInOut" },
                }}
              >
                {/* Icon */}
                <span className="text-2xl mb-1">{bubble.icon}</span>

                {/* Skill name */}
                <span className="text-xs font-bold text-center px-2 leading-tight">{bubble.name}</span>

                {/* Skill level indicator */}
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: i < bubble.level ? "#ffffff" : "#ffffff40",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>

                {/* Orbital rings */}
                {isHighlighted && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{ scale: 1.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{ scale: 1.6 }}
                    />
                  </>
                )}

                {/* Floating particles around bubble */}
                {isHighlighted &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: bubble.color }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: Math.cos((i / 8) * Math.PI * 2) * (bubble.size / 2 + 20),
                        y: Math.sin((i / 8) * Math.PI * 2) * (bubble.size / 2 + 20),
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
              </motion.div>

              {/* Detailed info panel */}
              {isHighlighted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 border min-w-48 z-50"
                  style={{ borderColor: bubble.color }}
                >
                  <h4 className="font-bold text-white mb-2">{bubble.name}</h4>
                  <p className="text-xs text-gray-300 mb-2 capitalize">{bubble.category}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Proficiency:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: i < bubble.level ? bubble.color : "#374151",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Mouse attraction field */}
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
            x: smoothMouseX,
            y: smoothMouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: hoveredSkill ? 1.5 : 1,
            opacity: hoveredSkill ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category legend */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border max-w-xs"
            style={{ borderColor: categoryConfig[selectedCategory as keyof typeof categoryConfig].color }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{categoryConfig[selectedCategory as keyof typeof categoryConfig].icon}</span>
              <h4 className="text-lg font-bold text-white capitalize">{selectedCategory}</h4>
            </div>
            <div className="space-y-2">
              {skillBubbles
                .filter((bubble) => bubble.category === selectedCategory)
                .map((bubble) => (
                  <div key={bubble.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 flex items-center gap-2">
                      <span>{bubble.icon}</span>
                      {bubble.name}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: i < bubble.level ? bubble.color : "#374151",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Skills summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {Object.entries(categoryConfig).map(([category, config]) => {
          const count = skillBubbles.filter((bubble) => bubble.category === category).length
          const avgLevel =
            skillBubbles
              .filter((bubble) => bubble.category === category)
              .reduce((sum, bubble) => sum + bubble.level, 0) / count || 0

          return (
            <motion.div
              key={category}
              className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800 hover:border-opacity-50 transition-all duration-300"
              style={{ borderColor: config.color }}
              whileHover={{
                scale: 1.05,
                borderColor: config.color,
                boxShadow: `0 0 20px ${config.color}40`,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl mb-2">{config.icon}</div>
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-sm text-gray-400 capitalize mb-2">{category}</div>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: i < Math.round(avgLevel) ? config.color : "#374151",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
