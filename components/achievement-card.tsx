"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AchievementCardProps {
  achievement: {
    id: number
    title: string
    description: string
    icon: string
  }
  index: number
  setCursorVariant: (variant: string) => void
}

export function AchievementCard({ achievement, index, setCursorVariant }: AchievementCardProps) {
  return (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-purple-900/20 to-black border border-gray-800 rounded-xl p-6 hover:border-purple-600/50 transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setCursorVariant("text")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <motion.div
        className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-4 relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-600/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <Image
          src={achievement.icon || "/placeholder.svg"}
          alt={achievement.title}
          width={24}
          height={24}
          className="object-contain relative z-10"
        />
      </motion.div>
      <h4 className="text-lg font-bold mb-2">{achievement.title}</h4>
      <p className="text-gray-400 text-sm">{achievement.description}</p>

      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0) 50%, rgba(168, 85, 247, 0.4) 100%)",
          backgroundSize: "200% 100%",
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
    </motion.div>
  )
}
