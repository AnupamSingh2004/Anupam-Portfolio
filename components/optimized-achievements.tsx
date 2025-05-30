"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Star, Target } from "lucide-react"

interface OptimizedAchievementsProps {
  setCursorVariant: (variant: string) => void
}

const achievements = [
  {
    id: 1,
    title: "CodeChef Rating: 1422",
    description: "Achieved in just 2 months of competitive programming",
    icon: Trophy,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    title: "Codeforces Rating: 986",
    description: "Accomplished in 5 contests with consistent performance",
    icon: Target,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    title: "JEE Mains OBC-NCL-PWD Rank: 400",
    description: "Excellence in national-level engineering entrance exam",
    icon: Award,
    color: "#8b5cf6",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: 4,
    title: "Hackathon Participant",
    description: "CanuHackIt and HACKJMI competitions",
    icon: Star,
    color: "#10b981",
    gradient: "from-emerald-500 to-green-500",
  },
]

export function OptimizedAchievements({ setCursorVariant }: OptimizedAchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <h3
        className="text-3xl font-bold text-center mb-12 text-white"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        Achievements & Recognition
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-6 relative overflow-hidden group-hover:border-opacity-50 transition-all duration-500 h-full">
              {/* Animated background */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${achievement.gradient}`}
              />

              {/* Icon container */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative mx-auto"
                style={{
                  background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
                  border: `2px solid ${achievement.color}40`,
                }}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: achievement.color }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <achievement.icon className="h-8 w-8 relative z-10" style={{ color: achievement.color }} />
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold mb-3 text-white break-words leading-tight">{achievement.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
              </div>

              {/* Hover border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${achievement.color}60 0%, transparent 50%, ${achievement.color}60 100%)`,
                  backgroundSize: "200% 100%",
                  padding: "2px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-12 h-12 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${achievement.color}, transparent)`,
                  clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
