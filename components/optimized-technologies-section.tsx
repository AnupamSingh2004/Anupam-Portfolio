"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import Image from "next/image"

interface OptimizedTechnologiesSectionProps {
  setCursorVariant: (variant: string) => void
}

interface TechItem {
  name: string
  category: string
  x: number
  y: number
  color: string
  logo: string
}

const categoryColors = {
  languages: "#8b5cf6", // Purple
  frameworks: "#06b6d4", // Cyan
  tools: "#10b981", // Emerald
  platforms: "#f59e0b", // Amber
  devops: "#ef4444", // Red
}

const allTechnologies: TechItem[] = [
  // Languages
  { name: "Python", category: "languages", x: 0, y: 0, color: categoryColors.languages, logo: "/tech/python.png" },
  {
    name: "JavaScript",
    category: "languages",
    x: 0,
    y: 0,
    color: categoryColors.languages,
    logo: "/tech/javascript.png",
  },
  {
    name: "TypeScript",
    category: "languages",
    x: 0,
    y: 0,
    color: categoryColors.languages,
    logo: "/tech/typescript.png",
  },
  { name: "C++", category: "languages", x: 0, y: 0, color: categoryColors.languages, logo: "/tech/cpp.png" },
  { name: "Java", category: "languages", x: 0, y: 0, color: categoryColors.languages, logo: "/tech/java.png" },
  { name: "PHP", category: "languages", x: 0, y: 0, color: categoryColors.languages, logo: "/tech/php.png" },
  { name: "SQL", category: "languages", x: 0, y: 0, color: categoryColors.languages, logo: "/tech/sql.png" },

  // Frameworks
  { name: "React.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, logo: "/tech/react.png" },
  { name: "Next.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, logo: "/tech/nextjs.png" },
  { name: "Django", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, logo: "/tech/django.png" },
  { name: "Node.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, logo: "/tech/nodejs.png" },
  {
    name: "Express.js",
    category: "frameworks",
    x: 0,
    y: 0,
    color: categoryColors.frameworks,
    logo: "/tech/express.png",
  },
  { name: "Redux", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, logo: "/tech/redux.png" },

  // Tools
  { name: "Docker", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/docker.png" },
  { name: "Git", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/git.png" },
  { name: "JWT", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/jwt.png" },
  { name: "Web3.js", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/web3.png" },
  { name: "MySQL", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/mysql.png" },
  { name: "MongoDB", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/mongodb.png" },
  { name: "Supabase", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/supabase.png" },
  { name: "Redis", category: "tools", x: 0, y: 0, color: categoryColors.tools, logo: "/tech/redis.png" },

  // Platforms
  { name: "AWS", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, logo: "/tech/aws.png" },
  { name: "GCP", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, logo: "/tech/gcp.png" },
  { name: "Linux", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, logo: "/tech/linux.png" },
  { name: "Windows", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, logo: "/tech/windows.png" },

  // DevOps
  { name: "Terraform", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/terraform.png" },
  { name: "Jenkins", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/jenkins.png" },
  { name: "Kubernetes", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/kubernetes.png" },
  { name: "Grafana", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/grafana.png" },
  { name: "SonarQube", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/sonarqube.png" },
  { name: "Prometheus", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/prometheus.png" },
  { name: "Ansible", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/ansible.png" },
  { name: "GitLab CI/CD", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/gitlab.png" },
  { name: "Nginx", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/nginx.png" },
  { name: "Apache", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/apache.png" },
  { name: "Helm", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/helm.png" },
  { name: "ArgoCD", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/argocd.png" },
  { name: "Vault", category: "devops", x: 0, y: 0, color: categoryColors.devops, logo: "/tech/vault.png" },
]

export function OptimizedTechnologiesSection({ setCursorVariant }: OptimizedTechnologiesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [technologies, setTechnologies] = useState<TechItem[]>([])
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Initialize positions
  useEffect(() => {
    if (typeof window === "undefined") return

    const initializePositions = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const positionedTechs = allTechnologies.map((tech, index) => {
        // Create a spiral pattern with some randomness
        const angle = index * 137.5 * (Math.PI / 180) // Golden angle for natural distribution
        const radius = 80 + index * 12 + Math.random() * 40

        const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 60
        const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60

        return {
          ...tech,
          x: Math.max(80, Math.min(rect.width - 80, x)),
          y: Math.max(80, Math.min(rect.height - 80, y)),
        }
      })

      setTechnologies(positionedTechs)
    }

    initializePositions()
    window.addEventListener("resize", initializePositions)
    return () => window.removeEventListener("resize", initializePositions)
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

  // Simplified magnetic effect
  const getMagneticOffset = (techX: number, techY: number) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - techX, 2) + Math.pow(mousePosition.y - techY, 2))

    if (distance > 120) return { x: 0, y: 0 }

    const force = Math.max(0, 1 - distance / 120)
    const angle = Math.atan2(mousePosition.y - techY, mousePosition.x - techX)

    return {
      x: Math.cos(angle) * force * 20,
      y: Math.sin(angle) * force * 20,
    }
  }

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
        Technologies & Tools
      </h3>
      <p
        className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        An interactive showcase of technologies I work with. Hover to explore and see the magnetic effects.
      </p>

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
          onClick={() => setSelectedCategory(null)}
          onMouseEnter={() => setCursorVariant("button")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Technologies
        </motion.button>
        {Object.entries(categoryColors).map(([category, color]) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category ? "text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
            style={{
              backgroundColor: selectedCategory === category ? color : "rgba(31, 41, 55, 1)",
              border: `2px solid ${color}`,
            }}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Technologies Grid */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-br from-gray-900/20 to-black rounded-3xl overflow-hidden border border-gray-800"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        {/* Simplified background particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * 600,
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                ],
                y: [Math.random() * 600, Math.random() * 600],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Technology nodes */}
        {technologies.map((tech, index) => {
          const magneticOffset = getMagneticOffset(tech.x, tech.y)
          const isHighlighted = hoveredTech === tech.name || (selectedCategory && tech.category === selectedCategory)
          const isFiltered = selectedCategory && tech.category !== selectedCategory

          return (
            <motion.div
              key={tech.name}
              className="absolute cursor-pointer group"
              initial={{
                x: tech.x,
                y: tech.y,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: tech.x + magneticOffset.x,
                y: tech.y + magneticOffset.y,
                opacity: isFiltered ? 0.3 : 1,
                scale: isHighlighted ? 1.1 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.3 },
                scale: { duration: 0.2 },
              }}
              style={{ translateX: "-50%", translateY: "-50%" }}
              onMouseEnter={() => {
                setHoveredTech(tech.name)
                setCursorVariant("button")
              }}
              onMouseLeave={() => {
                setHoveredTech(null)
                setCursorVariant("text")
              }}
              whileHover={{ scale: 1.2 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{ backgroundColor: tech.color }}
                animate={{
                  opacity: isHighlighted ? 0.4 : 0.1,
                  scale: isHighlighted ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Main node */}
              <motion.div
                className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl border-2 bg-gradient-to-br from-gray-800 to-gray-900"
                style={{
                  borderColor: tech.color,
                  boxShadow: `0 0 20px ${tech.color}40`,
                }}
                animate={{
                  boxShadow: isHighlighted ? `0 0 30px ${tech.color}80` : `0 0 20px ${tech.color}40`,
                }}
              >
                {/* Logo */}
                <div className="w-8 h-8 mb-1 relative">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                    }}
                  />
                </div>

                {/* Technology name */}
                <span className="text-xs font-medium text-center leading-tight px-1">{tech.name}</span>

                {/* Ripple effect */}
                {isHighlighted && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: tech.color }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Detailed tooltip */}
              {isHighlighted && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-black/90 backdrop-blur-sm rounded-xl text-xs font-medium text-white border z-50"
                  style={{ borderColor: tech.color }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <div className="font-bold">{tech.name}</div>
                    <div className="text-gray-400 capitalize">{tech.category}</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: hoveredTech ? 1.5 : 1,
            opacity: hoveredTech ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category info panel */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border max-w-xs"
            style={{ borderColor: categoryColors[selectedCategory as keyof typeof categoryColors] }}
          >
            <h4 className="text-lg font-bold text-white mb-2 capitalize">{selectedCategory}</h4>
            <div className="space-y-2">
              {technologies
                .filter((tech) => tech.category === selectedCategory)
                .map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 relative">
                      <Image
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        width={16}
                        height={16}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                        }}
                      />
                    </div>
                    <span className="text-gray-300">{tech.name}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {Object.entries(categoryColors).map(([category, color]) => {
          const count = technologies.filter((tech) => tech.category === category).length
          return (
            <motion.div
              key={category}
              className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800"
              whileHover={{ scale: 1.05, borderColor: color }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-sm text-gray-400 capitalize">{category}</div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
