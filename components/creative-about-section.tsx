"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { gridItems } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Calendar, Code, Trophy, Zap } from "lucide-react"
import { ThreeJSIllustration } from "@/components/threejs-illustrations"
import { EnhancedTimeline } from "@/components/enhanced-timeline"

interface CreativeAboutSectionProps {
  setCursorVariant: (variant: string) => void
}

const personalStats = [
  { label: "Projects Completed", value: 15, icon: Code, suffix: "+" },
  { label: "Technologies Mastered", value: 25, icon: Zap, suffix: "+" },
  { label: "Hackathons Participated", value: 3, icon: Trophy, suffix: "" },
  { label: "Years of Experience", value: 3, icon: Calendar, suffix: "+" },
]

export function CreativeAboutSection({ setCursorVariant }: CreativeAboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      {/* Subtly Creative Geometric Background */}
      <div className="absolute inset-0">
        {/* Subtly Animated Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="aboutGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <motion.path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="1"
                  animate={{
                    stroke: ["rgba(139, 92, 246, 0.2)", "rgba(6, 182, 212, 0.3)", "rgba(139, 92, 246, 0.2)"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutGrid)" />
          </svg>
        </div>

        {/* Subtly Floating Code Snippets */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute font-mono text-purple-400/10 text-xs"
            style={{
              left: `${15 + (i % 2) * 40}%`,
              top: `${25 + Math.floor(i / 2) * 50}%`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1,
            }}
          >
            {i % 4 === 0 && "const skills = ['React', 'Next.js'];"}
            {i % 4 === 1 && "function createAwesome() { ... }"}
            {i % 4 === 2 && "// Building the future"}
            {i % 4 === 3 && "export default Innovation;"}
          </motion.div>
        ))}

        {/* Subtly Geometric Shapes */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${25 + i * 25}%`,
              top: `${35 + Math.sin(i) * 15}%`,
              width: `${30 + i * 8}px`,
              height: `${30 + i * 8}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div
              className={`w-full h-full border border-purple-500/20 ${i % 2 === 0 ? "rounded-full" : "rounded-lg"}`}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 text-center"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 relative"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              animate={{
                backgroundPosition: isInView ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
              }}
              transition={{
                duration: 8,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              About Me
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Crafting scalable solutions with modern technology. I specialize in building robust applications with a
            focus on performance, user experience, and cutting-edge technologies.
          </motion.p>
        </motion.div>

        {/* Enhanced Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {personalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative group"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-6 text-center relative overflow-hidden group-hover:border-purple-500/50 transition-all duration-500">
                <motion.div
                  className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </motion.div>

                <motion.div
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>

                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Creative Journey Timeline */}
        <EnhancedTimeline setCursorVariant={setCursorVariant} />

        {/* Enhanced Grid Items */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="mb-20 px-6 lg:px-12 xl:px-16"
>
  <h3
    className="text-3xl font-bold text-center mb-16 text-white"
    onMouseEnter={() => setCursorVariant("text")}
    onMouseLeave={() => setCursorVariant("default")}
  >
    What I Do
  </h3>

  <div className="container mx-auto max-w-9xl">
    {/* Updated layout with better spacing */}
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Featured large card on the left */}
      <div className="xl:w-1/2">
        {gridItems
          .filter((item) => !item.title.includes("Interactive Healthcare AI Dashboard"))
          .slice(0, 1)
          .map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50, rotateY: 45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, scale: 1.01, rotateY: 3 }}
              transition={{
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={cn(
                "relative overflow-hidden rounded-3xl p-8 flex flex-col group cursor-pointer h-full min-h-[500px]",
                item.className,
                "bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-black border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500",
              )}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="flex flex-col h-full z-10 relative">
                <motion.h3
                  className={cn(
                    "text-2xl lg:text-3xl font-bold mb-4 flex text-white",
                    item.titleClassName
                  )}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.title}
                </motion.h3>
                
                {/* Enhanced subtitle/tagline */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                    Featured Service
                  </span>
                </motion.div>

                <motion.p
                  className="text-gray-300 leading-relaxed text-base mb-8"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.description}
                </motion.p>

                {/* Key features list */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {["Scalable Architecture", "Modern Frameworks", "AI Integration", "Performance Optimized"].map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-70"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Larger illustration filling available space */}
              <div className="relative flex-1 overflow-hidden rounded-2xl min-h-[200px] mt-[-300px] m-[-50px] ">
                <motion.div
                  className={cn("relative z-10 w-full h-full", item.imgClassName)}
                  initial={{ opacity: 0.7, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/10 to-gray-900/20">
                    <ThreeJSIllustration
                      type={item.id === 1 ? "code" : item.id === 3 ? "mobile" : "cloud"}
                      className="w-full h-full"
                    />
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 -z-10 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-2xl" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements for visual interest */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500/20 rounded-full"
                  animate={{ y: [-3, 3, -3], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-4 h-4 bg-cyan-500/20 rounded-full"
                  animate={{ y: [3, -3, 3], rotate: [360, 180, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Enhanced featured card effects */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(6, 182, 212, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)",
                  backgroundSize: "200% 200%",
                  padding: "2px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}
      </div>

      {/* Grid of smaller cards on the right - Fixed layout */}
      <div className="xl:w-1/2">
        <div className="grid grid-cols-1 gap-6 h-full">
          {gridItems
            .filter((item) => !item.title.includes("Interactive Healthcare AI Dashboard"))
            .slice(1)
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: (index + 1) * 0.15,
                }}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-6 flex group cursor-pointer h-full min-h-[220px]",
                  item.className,
                  "bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 hover:border-cyan-500/50 transition-all duration-500",
                )}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Content section - takes up 60% of width */}
                <div className="flex flex-col justify-between w-3/5 z-10 relative pr-4">
                  <div>
                    <motion.h3
                      className={cn(
                        "text-lg font-bold mb-3 text-white",
                        item.titleClassName
                      )}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Tech tags or status indicator */}
                    <motion.div 
                      className="mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className={cn(
                        "inline-block px-2 py-1 rounded-full text-xs font-medium",
                        index === 0 ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" :
                        index === 1 ? "bg-green-500/20 text-green-300 border border-green-500/30" :
                        "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      )}>
                        {index === 0 ? "Tech Stack" : index === 1 ? "In Progress" : "Collaboration"}
                      </span>
                    </motion.div>

                    <motion.p
                      className="text-gray-300 leading-relaxed text-sm mb-4"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Mini feature list */}
                  <motion.div 
                    className="mt-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="space-y-2">
                      {index === 0 && ["Python | JavaScript | Next.js", "AWS | Docker | TypeScript"].map((tech, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 opacity-60"></div>
                          {tech}
                        </div>
                      ))}
                      {index === 1 && ["Next.js & Django", "Video Conferencing"].map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-60"></div>
                          {feature}
                        </div>
                      ))}
                      {index === 2 && ["Let's Connect", "Build Together"].map((cta, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-60"></div>
                          {cta}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Illustration section - takes up 40% of width */}
                <div className="w-2/5 relative flex items-center justify-center">
                  {item.img && (
                    <motion.div
                      className={cn("relative z-10 w-full h-24", item.imgClassName)}
                      initial={{ opacity: 0.7, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-full h-full relative">
                        <ThreeJSIllustration
                          type={item.id === 1 ? "code" : item.id === 3 ? "mobile" : "cloud"}
                          className="w-full h-full"
                        />
                        {/* Icon background */}
                        <div className="absolute inset-0 -z-10 opacity-20">
                          <div className={cn(
                            "w-full h-full rounded-xl",
                            index === 0 ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10" :
                            index === 1 ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10" :
                            "bg-gradient-to-br from-orange-500/10 to-red-500/10"
                          )} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Corner accent */}
                  <motion.div
                    className={cn(
                      "absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-60",
                      index === 0 ? "bg-cyan-400/30" :
                      index === 1 ? "bg-green-400/30" :
                      "bg-orange-400/30"
                    )}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Border animation for smaller cards */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(6, 182, 212, 0.6) 0%, rgba(168, 85, 247, 0.6) 100%)",
                    backgroundSize: "200% 100%",
                    padding: "2px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  )
}
