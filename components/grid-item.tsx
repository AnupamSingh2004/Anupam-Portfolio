"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GridItemProps {
  item: {
    id: number
    title: string
    description: string
    className: string
    imgClassName: string
    titleClassName: string
    img: string
    spareImg: string
  }
  index: number
  setCursorVariant: (variant: string) => void
}

export function GridItem({ item, index, setCursorVariant }: GridItemProps) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 flex flex-col",
        item.className,
        index % 2 === 0
          ? "bg-gradient-to-br from-purple-900/30 to-black"
          : "bg-gradient-to-br from-gray-900/30 to-black",
        "border border-gray-800 hover:border-purple-600/50 transition-all duration-300 group",
      )}
      onMouseEnter={() => setCursorVariant("text")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <div className="flex flex-col h-full z-10">
        <motion.h3
          className={cn("text-xl md:text-2xl font-bold mb-2 flex", item.titleClassName)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {item.title}
        </motion.h3>
        <p className="text-gray-400">{item.description}</p>
      </div>

      {item.img && (
        <motion.div
          className={cn("relative", item.imgClassName)}
          initial={{ opacity: 0.8 }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={item.img || "/placeholder.svg"}
            alt={item.title}
            width={400}
            height={400}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
