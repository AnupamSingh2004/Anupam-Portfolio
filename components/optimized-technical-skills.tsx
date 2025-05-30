"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { skills } from "@/lib/data"

interface OptimizedTechnicalSkillsProps {
  setCursorVariant: (variant: string) => void
}

interface SkillBubble {
  name: string
  category: string
  x: number
  y: number
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

export function OptimizedTechnicalSkills({ setCursorVariant }: OptimizedTechnicalSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [skillBubbles, setSkillBubbles] = useState<SkillBubble[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Initialize skill bubbles (simplified)
  useEffect(() => {
    if (typeof window === "undefined" || !isInView) return

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
          const radius = 60 + Math.random() * 40
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          bubbles.push({
            name: skill,
            category,
            x: Math.max(40, Math.min(rect.width - 40, x)),
            y: Math.max(40, Math.min(rect.height - 40, y)),
            size: 50 + Math.random() * 20,
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
  }, [isInView])

  // Simplified connections (only show when hovering)
  const getVisibleConnections = () => {
    if (!hoveredSkill && !selectedCategory) return []

    const connections: Array<{ from: SkillBubble; to: SkillBubble }> = []
    const relevantBubbles = skillBubbles.filter(
      (bubble) => bubble.name === hoveredSkill || (selectedCategory && bubble.category === selectedCategory),
    )

    relevantBubbles.forEach((bubble1, i) => {
      relevantBubbles.forEach((bubble2, j) => {
        if (i >= j) return
        const distance = Math.sqrt(Math.pow(bubble1.x - bubble2.x, 2) + Math.pow(bubble1.y - bubble2.y, 2))
        if (distance < 120) {
          connections.push({ from: bubble1, to: bubble2 })
        }
      })
    })

    return connections.slice(0, 10) // Limit connections for performance
  }

  const connections = getVisibleConnections()

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
        Explore my technical expertise through an interactive skill galaxy.
      </p>

      {/* Simplified Category Controls */}
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

      {/* Optimized Skills Universe */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-br from-gray-900/20 via-black to-purple-900/20 rounded-3xl overflow-hidden border border-gray-800"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        {/* Simplified background - only show when in view */}
        {isInView && (
          <div className="absolute inset-0">
            {/* Reduced particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y: Math.random() * 600,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                animate={{
                  x: [
                    Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  ],
                  y: [Math.random() * 600, Math.random() * 600],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        {/* Simplified connection lines - only show relevant ones */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => (
            <motion.line
              key={index}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke={connection.from.color}
              strokeWidth={2}
              opacity={0.6}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Optimized skill bubbles */}
        {skillBubbles.map((bubble, index) => {
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
                x: bubble.x,
                y: bubble.y,
                opacity: isFiltered ? 0.3 : 1,
                scale: isHighlighted ? 1.1 : 1,
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
              }}
              onMouseEnter={() => {
                setHoveredSkill(bubble.name)
                setCursorVariant("button")
              }}
              onMouseLeave={() => {
                setHoveredSkill(null)
                setCursorVariant("text")
              }}
              whileHover={{ scale: 1.2 }}
            >
              {/* Simplified bubble */}
              <motion.div
                className={`relative rounded-full flex flex-col items-center justify-center text-white shadow-lg border-2 bg-gradient-to-br ${config.gradient}`}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  borderColor: bubble.color,
                }}
                animate={{
                  boxShadow: isHighlighted ? `0 0 30px ${bubble.color}60` : `0 0 10px ${bubble.color}30`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <span className="text-lg mb-1">{bubble.icon}</span>

                {/* Skill name */}
                <span className="text-xs font-bold text-center px-1 leading-tight">{bubble.name}</span>

                {/* Simplified level indicator */}
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: i < bubble.level ? "#ffffff" : "#ffffff40",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Simplified info panel */}
              {isHighlighted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/90 backdrop-blur-sm rounded-xl p-3 border min-w-32 z-50"
                  style={{ borderColor: bubble.color }}
                >
                  <h4 className="font-bold text-white text-sm mb-1">{bubble.name}</h4>
                  <p className="text-xs text-gray-300 mb-2 capitalize">{bubble.category}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">Level:</span>
                    <div className="flex gap-0.5">
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
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Simplified stats */}
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
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl mb-2">{config.icon}</div>
              <div className="text-xl font-bold text-white">{count}</div>
              <div className="text-sm text-gray-400 capitalize mb-2">{category}</div>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
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
