"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Linkedin, Code, Sparkles, ArrowUpRight } from "lucide-react"
import { socialProfiles } from "@/lib/data"

interface SocialProfilesSectionProps {
  setCursorVariant: (variant: string) => void
}

export function SocialProfilesSection({ setCursorVariant }: SocialProfilesSectionProps) {
  const iconMap = {
    LinkedIn: Linkedin,
    GitHub: Github,
    LeetCode: Code,
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0">
        {/* Animated Geometric Grid */}
        <svg className="w-full h-full opacity-30">
          <defs>
            <pattern id="modernGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <motion.rect
                width="80"
                height="80"
                fill="none"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="0.5"
                animate={{
                  stroke: [
                    "rgba(139, 92, 246, 0.3)",
                    "rgba(6, 182, 212, 0.4)",
                    "rgba(236, 72, 153, 0.3)",
                    "rgba(139, 92, 246, 0.3)"
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="40"
                cy="40"
                r="1.5"
                fill="rgba(139, 92, 246, 0.6)"
                animate={{
                  fill: [
                    "rgba(139, 92, 246, 0.6)",
                    "rgba(6, 182, 212, 0.8)",
                    "rgba(236, 72, 153, 0.6)",
                    "rgba(139, 92, 246, 0.6)"
                  ],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </pattern>
            
            {/* Flowing Lines Pattern */}
            <pattern id="flowingLines" width="120" height="120" patternUnits="userSpaceOnUse">
              <motion.path
                d="M0,60 Q30,20 60,60 T120,60"
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
                animate={{
                  d: [
                    "M0,60 Q30,20 60,60 T120,60",
                    "M0,60 Q30,100 60,60 T120,60",
                    "M0,60 Q30,20 60,60 T120,60"
                  ],
                  stroke: [
                    "rgba(6, 182, 212, 0.2)",
                    "rgba(139, 92, 246, 0.3)",
                    "rgba(6, 182, 212, 0.2)"
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#modernGrid)" />
          <rect width="100%" height="100%" fill="url(#flowingLines)" />
        </svg>

        {/* Floating Orbs with Trail Effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#ec4899'
              }80 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 80, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Connecting Lines Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${20 + i * 30}%`}
              y1="30%"
              x2={`${50 + i * 20}%`}
              y2="70%"
              stroke={`${i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}`}
              strokeWidth="1"
              strokeDasharray="4,4"
              animate={{
                strokeDashoffset: [0, 8],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Social Presence</span>
          </motion.div>

          <h3
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            My Corners of the Web
          </h3>

          <motion.div
            className="relative w-32 h-2 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 rounded-full blur-sm"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Let's connect and explore opportunities together in the digital realm
          </p>
        </motion.div>

        {/* Creative Grid Layout for Social Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {socialProfiles.map((profile, index) => {
            const IconComponent = iconMap[profile.name as keyof typeof iconMap]
            const isCenter = index === 1

            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className={`${isCenter ? 'md:transform md:scale-110 md:-translate-y-4' : ''}`}
              >
                <motion.a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    y: -20,
                    rotateY: 5,
                    transition: {
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
                  className="group relative block perspective-1000"
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black border border-gray-700 p-8 text-center group-hover:border-purple-500/50 transition-all duration-700 backdrop-blur-sm">
                    
                    {/* Dynamic Background Effects */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${profile.color}15 0%, transparent 70%)`,
                      }}
                      animate={{
                        background: [
                          `radial-gradient(circle at 30% 30%, ${profile.color}10 0%, transparent 70%)`,
                          `radial-gradient(circle at 70% 70%, ${profile.color}20 0%, transparent 70%)`,
                          `radial-gradient(circle at 30% 30%, ${profile.color}10 0%, transparent 70%)`,
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Mesh Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                      <div 
                        className="w-full h-full"
                        style={{
                          background: `
                            radial-gradient(circle at 20% 20%, ${profile.color}40 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${profile.color}20 0%, transparent 50%),
                            radial-gradient(circle at 40% 70%, ${profile.color}30 0%, transparent 50%)
                          `
                        }}
                      />
                    </div>

                    {/* Enhanced Icon Container */}
                    <motion.div
                      className="relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: `${profile.color}20` }}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.15,
                        transition: {
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <IconComponent className="h-10 w-10 relative z-10" style={{ color: profile.color }} />

                      {/* Multiple Pulsing Rings */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100"
                          style={{ borderColor: profile.color }}
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                      ))}

                      {/* Rotating Border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `conic-gradient(from 0deg, ${profile.color}80, transparent, ${profile.color}80)`,
                          padding: '2px',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Profile Name */}
                    <motion.h4
                      className="text-2xl font-bold text-white mb-3 relative z-10"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {profile.name}
                    </motion.h4>

                    {/* Animated Subtitle */}
                    <motion.p
                      className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {profile.name === 'LinkedIn' && 'Professional Network'}
                      {profile.name === 'GitHub' && 'Code Repository'}
                      {profile.name === 'LeetCode' && 'Problem Solving'}
                    </motion.p>

                    {/* Enhanced CTA Button */}
                    <motion.div
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl text-gray-300 group-hover:text-white transition-all duration-300 border border-gray-600 group-hover:border-purple-500/50"
                      whileHover={{
                        background: `linear-gradient(135deg, ${profile.color}20, ${profile.color}10)`,
                        scale: 1.05,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                    >
                      <span className="text-sm font-medium">Visit Profile</span>
                      <motion.div
                        whileHover={{
                          x: 4,
                          rotate: 45,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.div>
                    </motion.div>

                    {/* Flowing Border Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, ${profile.color}60 0%, transparent 50%, ${profile.color}60 100%)`,
                        backgroundSize: '200% 100%',
                        padding: '1px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.a>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Decorative Elements */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}