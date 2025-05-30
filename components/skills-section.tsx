"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { skills } from "@/lib/data"
import { cn } from "@/lib/utils"

interface SkillsSectionProps {
  setCursorVariant: (variant: string) => void
}

export function SkillsSection({ setCursorVariant }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState("languages")
  const categories = Object.keys(skills)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mt-20"
    >
      <h3
        className="text-2xl font-bold mb-8 text-center"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        Technical Skills
      </h3>

      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide mb-8 justify-center">
          <div className="flex bg-gray-900/50 backdrop-blur-sm rounded-full p-1">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  activeTab === category ? "text-white" : "text-gray-400 hover:text-gray-300",
                )}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {activeTab === category && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-purple-600 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {skills[activeTab as keyof typeof skills].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="px-5 py-3 text-sm bg-purple-900/40 hover:bg-purple-800 transition-colors rounded-full relative overflow-hidden">
                    <span className="relative z-10">{skill}</span>
                    <motion.div
                      className="absolute inset-0 bg-purple-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
