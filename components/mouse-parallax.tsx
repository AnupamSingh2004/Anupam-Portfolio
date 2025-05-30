"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, useSpring } from "framer-motion"

interface MouseParallaxProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MouseParallax({ children, className, strength = 20 }: MouseParallaxProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const springConfig = { damping: 50, stiffness: 100 }
  const x = useSpring(mousePosition.x * strength, springConfig)
  const y = useSpring(mousePosition.y * strength, springConfig)

  return (
    <motion.div className={className} style={{ x, y }} transition={{ type: "spring", damping: 15, stiffness: 150 }}>
      {children}
    </motion.div>
  )
}
