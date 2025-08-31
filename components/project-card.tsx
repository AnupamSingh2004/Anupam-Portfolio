"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    des: string
    img: string
    iconLists: string[]
    link: string
  }
  details: {
    quote: string
    name: string
    title: string
  }
  index: number
  setCursorVariant: (variant: string) => void
}

export function ProjectCard({ project, details, index, setCursorVariant }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => {
        setIsHovered(true)
        setCursorVariant("text")
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setCursorVariant("default")
      }}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.5 }} className="w-full h-full">
          <Image
            src={project.img || "/placeholder.svg?height=600&width=800"}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
          <div className="flex gap-2 mb-4">
            {project.iconLists.map((icon, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full p-1.5 border-2 border-white"
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Image
                  src={icon || "/placeholder.svg"}
                  alt="Technology"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* View details button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 z-20 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
          onClick={() => setShowDetails(true)}
        >
          View Details
        </motion.button>
      </div>
      <p className="text-gray-300 mb-4">{project.des}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
      >
        View Project <ExternalLink className="ml-2 h-4 w-4" />
      </a>

      {/* Project details modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-purple-900/50 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{details.name}</h3>
                  <p className="text-purple-400">{details.title}</p>
                </div>
                <button
                  className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
                  onClick={() => setShowDetails(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <Image
                  src={project.img || "/placeholder.svg?height=600&width=800"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.iconLists.map((icon, i) => (
                    <div key={i} className="flex items-center bg-gray-800 px-3 py-1 rounded-full border-2 border-white">
                      <Image
                        src={icon || "/placeholder.svg"}
                        alt="Technology"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <span className="text-sm">{icon.split("/").pop()?.split(".")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                <p className="text-gray-300 italic">"{details.quote}"</p>
              </div>

              <div className="flex justify-end">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
