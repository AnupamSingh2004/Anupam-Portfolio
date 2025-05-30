"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TechIconProps {
  company: {
    id: number
    name: string
    img: string
    nameImg: string
  }
  index: number
  setCursorVariant: (variant: string) => void
}

export function TechIcon({ company, index, setCursorVariant }: TechIconProps) {
  return (
    <motion.div
      key={company.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center"
      onMouseEnter={() => setCursorVariant("text")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-purple-900/20 to-black border border-gray-800 rounded-full p-4 mb-4 flex items-center justify-center relative overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <Image
          src={company.img || "/placeholder.svg"}
          alt={company.name}
          width={48}
          height={48}
          className="object-contain relative z-10"
        />
      </motion.div>
      <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <Image
          src={company.nameImg || "/placeholder.svg"}
          alt={company.name}
          width={120}
          height={30}
          className="object-contain h-8"
        />
      </motion.div>
    </motion.div>
  )
}
