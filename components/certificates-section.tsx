"use client"

import { motion } from "framer-motion"
import { ExternalLink, Download, Award, Calendar, CheckCircle } from "lucide-react"
import Image from "next/image"
import { certificates } from "@/lib/data"

interface CertificatesSectionProps {
  setCursorVariant: (variant: string) => void
}

export function CertificatesSection({ setCursorVariant }: CertificatesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Award className="w-8 h-8 text-yellow-400" />
            <span className="text-6xl">🏆</span>
          </motion.div>
          
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8"></div>
          <p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Professional certifications and continuous learning achievements that demonstrate my commitment to excellence
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100 
              }}
              className="group relative"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {/* Certificate Card */}
              <motion.div
                whileHover={{ 
                  y: -8, 
                  rotateX: 2,
                  rotateY: 2,
                  scale: 1.015 
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1],
                  type: "tween"
                }}
                className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Animated border gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm" 
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {/* Certificate Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={cert.certificateImage || "/placeholder.svg"}
                      alt={`${cert.title} Certificate`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  {/* <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium border border-green-400/50 shadow-lg backdrop-blur-sm"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </motion.div> */}

                  {/* Certificate Icon
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3 
                    }}
                    className="absolute bottom-4 left-4 text-4xl drop-shadow-lg"
                  >
                    {cert.icon}
                  </motion.div> */}
                </div>

                {/* Content */}
                <div className="relative p-6 z-10">
                  {/* Certificate Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  {/* Provider */}
                  <p className="text-sm text-gray-400 mb-3">{cert.provider}</p>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + skillIndex * 0.1 }}
                        className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md text-xs border border-purple-500/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Footer with date and actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {cert.issueDate}
                    </div>
                    
                    <div className="flex gap-2">
                      {/* Verify Certificate */}
                      <motion.a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.05,
                          y: -1
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                          duration: 0.2, 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-600/30 hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </motion.a>
                      
                      {/* Download Certificate */}
                      {/* <motion.a
                        href={cert.certificateFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 bg-gray-600/20 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-600/30 hover:bg-gray-600/30 transition-all duration-200"
                      >
                        <Download className="w-3 h-3" />
                        PDF
                      </motion.a> */}
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-500/5 pointer-events-none"
                />

                {/* Credential ID watermark */}
                <motion.div 
                  className="absolute bottom-2 right-2 text-xs text-gray-600 font-mono"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  ID: {cert.credentialId}
                </motion.div>
              </motion.div>

              {/* 3D shadow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-800/20 blur-xl transform translate-y-2 translate-x-2 -z-10 rounded-2xl"
                initial={{ 
                  translateY: 8, 
                  translateX: 8,
                  opacity: 0.3
                }}
                whileHover={{ 
                  translateY: 16, 
                  translateX: 16,
                  opacity: 0.6
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional achievements section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 px-6 py-3 rounded-full border border-yellow-400/20">
            <span className="text-yellow-400 text-sm font-medium">
              🎯 Committed to continuous learning and professional development
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
