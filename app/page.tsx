"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion"
import Image from "next/image"
import { navItems, projects, moreProjects, contactInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, Menu, X, User, Code, Briefcase, Mail, ChevronDown } from "lucide-react"
import { AwardWinningLoading } from "@/components/award-winning-loading"
import { TechnologiesSection } from "@/components/technologies-section"
import { CreativeAboutSection } from "@/components/creative-about-section"
import {  EnhancedHeroWithImage} from "@/components/enhanced-hero-with-image"
import { SocialProfilesSection } from "@/components/social-profiles-section"
import { ContactSection } from "@/components/contact-section"

// Technology icon mapping
const techIconMap: Record<string, string> = {
  "/python.svg": "🐍",
  "/django.svg": "🎸",
  "/ai.svg": "🤖",
  "/react.svg": "⚛️",
  "/aws.svg": "☁️",
  "/next.svg": "▲",
  "/typescript.svg": "🔷",
  "/redis.svg": "🔴",
  "/neon.svg": "⚡",
  "/drizzle.svg": "💧",
  "/nodejs.svg": "🟢",
  "/socketio.svg": "🔌",
  "/tailwind.svg": "🎨",
  "/express.svg": "🚂",
  "/github.svg": "🐙",
  "/javascript.svg": "🟨",
  "/optimization.svg": "⚡",
}

// Navigation icons
const navIcons = {
  About: User,
  Technologies: Code,
  Projects: Briefcase,
  Experience: Briefcase,
  Contact: Mail,
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("about")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
    const [scrollHeight, setScrollHeight] = useState(0);
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12])

  const scrollProgress = useTransform(
    scrollY, 
    [0, scrollHeight > 0 ? scrollHeight : 1000], 
    [0, 1]
  )

  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const technologiesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


   useEffect(() => {
    const updateScrollHeight = () => {
      // Calculate the total scrollable height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollHeight(totalHeight)
    }

    // Update on mount
    updateScrollHeight()

    // Update on window resize
    window.addEventListener('resize', updateScrollHeight)
    
    // Optional: Update when content changes (useful for dynamic content)
    const resizeObserver = new ResizeObserver(() => {
      updateScrollHeight()
    })
    
    // Observe the document body for size changes
    if (document.body) {
      resizeObserver.observe(document.body)
    }

    return () => {
      window.removeEventListener('resize', updateScrollHeight)
      resizeObserver.disconnect()
    }
  }, [])
  
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150 // Increased offset for better detection

    const sections = [
      { id: "about", ref: aboutRef },
      { id: "technologies", ref: technologiesRef },
      { id: "projects", ref: projectsRef },
      { id: "experience", ref: experienceRef },
      {id:"contact", ref:contactRef},
    ]

    // Find the section currently in view
    let currentSection = "about" // default

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height

        // Check if the section is in the viewport
        if (scrollPosition >= elementTop - 100 && scrollPosition < elementBottom + 100) {
          currentSection = section.id
          break
        }
      }
    }

    setActiveSection(currentSection)
  }

  // Throttle scroll events for better performance
  let ticking = false
  const throttledHandleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", throttledHandleScroll)
  handleScroll() // Call once on mount

  return () => window.removeEventListener("scroll", throttledHandleScroll)
}, [])

  // Cursor follower effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 })

  if (isLoading) {
    return <AwardWinningLoading />
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom cursor */}
      

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />

      {/* Enhanced Animated Header */}
<motion.header
  style={{
    opacity: headerOpacity,
    backdropFilter: `blur(${headerBlur.get()}px)`,
  }}
  className="fixed top-0 left-0 right-0 z-40 py-2 px-6 border-b border-gray-800/50 bg-black/85"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  <div className="flex justify-between items-center">
    {/* Optimized Animated Logo */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setCursorVariant("text")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <motion.div
        className="text-2xl font-bold relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-purple-400">A</span>
        nupam
      </motion.div>

      {/* Simplified logo background effect */}
      <motion.div
        className="absolute inset-0 bg-purple-500/10 rounded-lg -z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.div>

    {/* Desktop Navigation - OPTIMIZED */}
    <nav className="hidden md:flex items-center">
      {/* Navigation Background */}
      <motion.div
        className="flex items-center bg-gray-900/50 backdrop-blur-sm rounded-full p-2 mr-6 border border-gray-800/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {navItems.map((item, index) => {
          const IconComponent = navIcons[item.name as keyof typeof navIcons]
          const isActive = activeSection === item.name.toLowerCase()

          return (
            <motion.button
              key={item.name} // Use stable key
              onClick={() => {
                const element = document.getElementById(item.link.substring(1))
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={cn(
                "relative px-4 py-2 mx-1 text-sm font-medium transition-all duration-200 rounded-full flex items-center gap-2",
                isActive
                  ? "text-white bg-purple-600 shadow-lg shadow-purple-600/25"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50",
              )}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              // transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <IconComponent className="h-4 w-4" />
              </motion.div>
              <span className="hidden lg:block">{item.name}</span>

              {/* Active indicator - OPTIMIZED */}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-purple-600 rounded-full -z-10"
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    duration: 0.3
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </motion.div>

      {/* CTA Button - OPTIMIZED */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 overflow-hidden group"
        onClick={() => {
          const contactSection = document.getElementById("contact")
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
        onMouseEnter={() => setCursorVariant("button")}
        onMouseLeave={() => setCursorVariant("default")}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Let's Talk
        </span>

        {/* Simplified button background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.button>
    </nav>

    {/* Enhanced Mobile Menu Button - OPTIMIZED */}
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden relative w-10 h-10 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        animate={{ rotate: isMenuOpen ? 90 : 0 }} 
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.div>
    </motion.button>
  </div>
</motion.header>
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-lg z-40 rounded-2xl border border-gray-800/50 md:hidden overflow-hidden"
          >
            <div className="p-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const IconComponent = navIcons[item.name as keyof typeof navIcons]
                  const isActive = activeSection === item.name.toLowerCase()

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => {
                        setIsMenuOpen(false)
                        const element = document.getElementById(item.link.substring(1))
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className={cn(
                        "flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300",
                        isActive
                          ? "text-white bg-purple-600 shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50",
                      )}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{
                          rotate: isActive ? 360 : 0,
                          scale: isActive ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.div>
                      {item.name}
                    </motion.button>
                  )
                })}

                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  onClick={() => {
                    setIsMenuOpen(false)
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5" />
                  Let's Talk
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section with Image */}
      <EnhancedHeroWithImage setCursorVariant={setCursorVariant} />

      {/* Creative About Section */}
    <div id="about" ref={aboutRef}>
  <CreativeAboutSection setCursorVariant={setCursorVariant} />
</div>

{/* Technologies Section - SEPARATE */}
<section id="technologies" ref={technologiesRef} className="py-20 bg-black">
  <div className="container mx-auto px-4">
    <TechnologiesSection setCursorVariant={setCursorVariant} />
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-8"></div>
            <p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              A showcase of my recent work, featuring full-stack applications, AI integrations, and open-source
              contributions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.img || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Project overlay content with emoji technology icons */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{project.title}</h3>
                    <div className="flex gap-2 mb-4">
                      {project.iconLists.slice(0, 5).map((iconPath, i) => (
                        <motion.div
                          key={i}
                          className="w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-purple-500/30"
                          whileHover={{ y: -5, scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <span className="text-2xl">{techIconMap[iconPath] || "⚡"}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/80 z-30 flex flex-col justify-center items-center p-6 text-center"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-6 max-w-md text-sm leading-relaxed">
                      {moreProjects[index]?.quote || project.des}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-sm font-medium transition-colors flex items-center text-white"
                      >
                        View Code <Github className="ml-2 h-4 w-4" />
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium transition-colors flex items-center text-white"
                        >
                          Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Project description */}
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">{project.des}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium"
                    >
                      View Code <Github className="ml-2 h-4 w-4" />
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors font-medium"
                      >
                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
{/* Enhanced Experience Section */}
<section id="experience" ref={experienceRef} className="py-20 bg-black relative overflow-hidden">

  <div className="container mx-auto px-4 relative z-10">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block mb-4"
      >
        <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Experience & Education
      </motion.h2>

      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto mb-8 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.p
        className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        My journey in technology and continuous learning, building foundations for innovation.
      </motion.p>
    </motion.div>

    {/* Education Card */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto"
    >
      <div className="relative group">
        {/* Subtle background effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-xl blur-sm opacity-30"
        />

        {/* Main card */}
        <motion.div
          className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/30"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >

          {/* Header with icon */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Education
            </motion.h3>

            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <motion.h4
                  className="text-lg md:text-xl font-semibold text-purple-400 mb-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {contactInfo.education}
                </motion.h4>
                
                <motion.div
                  className="flex items-center justify-center gap-2 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{contactInfo.location}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Simple timeline */}
            <motion.div
              className="flex justify-center items-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="text-sm text-gray-400 font-medium">2023</div>
              </div>
              
              <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
              />
              
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400 font-medium">2027</div>
                <div className="w-2 h-2 bg-pink-500 rounded-full" />
              </div>
            </motion.div>

            {/* Skill badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {['Computer Science', 'Full Stack Development', 'AI & ML'].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-200 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.2 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Simple decorative corners */}
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-purple-500/20"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-pink-500/20"></div>
        </motion.div>
      </div>
    </motion.div>

    {/* Simple decorative element */}
    <motion.div
      className="mt-12 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-1 h-1 bg-purple-500 rounded-full" />
        <motion.div
          className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <div className="w-1 h-1 bg-pink-500 rounded-full" />
      </div>
    </motion.div>
  </div>
</section>
      {/* Social Profiles Section */}
      <SocialProfilesSection setCursorVariant={setCursorVariant} />

      {/* Contact Section */}
       <section id="contact" ref={contactRef} className="">
          <ContactSection setCursorVariant={setCursorVariant} />  
       </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-gray-400 mb-4 md:mb-0"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              © {new Date().getFullYear()} Anupam Singh
            </p>

            <div className="flex gap-6">
              {navItems.slice(0, 3).map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.getElementById(item.link.substring(1))
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* Creative Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group overflow-hidden"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative z-10 flex items-center justify-center h-full"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 rotate-180" />
            </motion.div>

            {/* Sparkle effects */}
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${20 + i * 15}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}
