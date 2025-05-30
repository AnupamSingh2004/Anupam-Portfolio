"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AwardWinningLoading() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 }) // Default fallback values

  const phases = [
    { text: "Initializing", duration: 500 },
    { text: "Loading Assets", duration: 600 },
    { text: "Preparing Experience", duration: 700 },
    { text: "Almost Ready", duration: 400 },
  ]

  // Handle window resize and initial size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    updateWindowSize()

    // Add resize listener
    window.addEventListener('resize', updateWindowSize)
    
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  useEffect(() => {
    let progress = 0
    let phaseIndex = 0
    const totalDuration = 2200

    const interval = setInterval(() => {
      progress += 100 / (totalDuration / 50)
      setLoadingProgress(Math.min(progress, 100))

      // Update phase based on progress
      const phaseProgress = (progress / 100) * phases.length
      const newPhaseIndex = Math.floor(phaseProgress)
      if (newPhaseIndex !== phaseIndex && newPhaseIndex < phases.length) {
        setCurrentPhase(newPhaseIndex)
        phaseIndex = newPhaseIndex
      }

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setIsComplete(true), 500)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: 0,
            }}
            animate={{
              y: [
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
              ],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 border border-purple-500/30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-cyan-500/30 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Name with morphing effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #8b5cf6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"ANUPAM".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 },
                }}
                className="inline-block cursor-default"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Loading progress */}
        <div className="w-80 mx-auto mb-8">
          {/* Progress bar container */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-80px", "320px"],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="text-2xl font-bold text-white mb-2"
            key={Math.floor(loadingProgress)}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(loadingProgress)}%
          </motion.div>

          {/* Phase text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 text-lg"
            >
              {phases[currentPhase]?.text}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ...
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-purple-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-emerald-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-500/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      />
    </motion.div>
  )
}