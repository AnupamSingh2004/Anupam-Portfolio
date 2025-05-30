"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeJSIllustrationProps {
  type: "code" | "mobile" | "cloud"
  className?: string
}

export function ThreeJSIllustration({ type, className }: ThreeJSIllustrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with proper bounds and mobile considerations
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(rect.width, 150)
      const height = Math.max(rect.height, 150)

      // Use lower resolution on mobile for better performance
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
      
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      
      ctx.scale(pixelRatio, pixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      opacity: number
    }> = []

    // Initialize particles based on type with mobile optimization
    const initParticles = () => {
      particles.length = 0
      const colors = {
        "code": ["#8b5cf6", "#06b6d4", "#10b981"],
        "mobile": ["#ef4444", "#f59e0b", "#06b6d4"],
        "cloud": ["#f59e0b", "#10b981", "#8b5cf6"],
      }

      const canvasWidth = Math.max(canvas.width / (isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio), 150)
      const canvasHeight = Math.max(canvas.height / (isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio), 150)
      
      // Reduce particle count on mobile
      const particleCount = isMobile ? 10 : 20

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          z: Math.random() * 100,
          vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
          vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
          vz: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
          size: Math.max(Math.random() * (isMobile ? 1.5 : 2) + 0.5, 0.5),
          color: colors[type][Math.floor(Math.random() * colors[type].length)],
          opacity: Math.random() * 0.6 + 0.3,
        })
      }
    }

    const drawCode = () => {
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
      const canvasWidth = canvas.width / pixelRatio
      const canvasHeight = canvas.height / pixelRatio
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2

      // Scale elements based on canvas size and mobile
      const scale = Math.min(canvasWidth / 300, canvasHeight / 200)
      const mobileScale = isMobile ? Math.max(scale * 0.8, 0.5) : scale

      // Draw code editor window
      const windowWidth = Math.min(canvasWidth * 0.7, 220) * mobileScale
      const windowHeight = Math.min(canvasHeight * 0.6, 140) * mobileScale
      
      // Window frame
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = Math.max(2 * mobileScale, 1)
      ctx.globalAlpha = 0.8
      
      const windowPulse = Math.sin(time * (isMobile ? 0.015 : 0.02)) * 0.03 + 0.97
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.scale(windowPulse, windowPulse)
      
      ctx.beginPath()
      ctx.roundRect(-windowWidth/2, -windowHeight/2, windowWidth, windowHeight, 8 * mobileScale)
      ctx.stroke()
      
      // Window header
      ctx.fillStyle = "#8b5cf6"
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      ctx.roundRect(-windowWidth/2, -windowHeight/2, windowWidth, 20 * mobileScale, [8 * mobileScale, 8 * mobileScale, 0, 0])
      ctx.fill()
      
      // Window controls
      const controlColors = ["#ef4444", "#f59e0b", "#10b981"]
      controlColors.forEach((color, index) => {
        ctx.fillStyle = color
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(-windowWidth/2 + 15 * mobileScale + index * 20 * mobileScale, -windowHeight/2 + 10 * mobileScale, 4 * mobileScale, 0, Math.PI * 2)
        ctx.fill()
      })
      
      ctx.restore()

      // Draw code lines with typing animation (simplified for mobile)
      const fontSize = Math.max(10 * mobileScale, 8)
      const lines = [
        { text: "const app =", y: centerY - 25 * mobileScale, color: "#06b6d4" },
        { text: "  React.useState()", y: centerY - 5 * mobileScale, color: "#10b981" },
        { text: "return <div>", y: centerY + 15 * mobileScale, color: "#8b5cf6" },
        { text: "  {content}", y: centerY + 35 * mobileScale, color: "#f59e0b" },
      ]

      lines.forEach((line, index) => {
        const typeProgress = Math.max(0, (time * (isMobile ? 0.015 : 0.02) - index * 0.5) % 3)
        const visibleChars = Math.floor(typeProgress * line.text.length)
        const displayText = line.text.substring(0, visibleChars)
        
        if (displayText.length > 0) {
          ctx.fillStyle = line.color
          ctx.globalAlpha = 0.8
          ctx.font = `${fontSize}px 'Courier New', monospace`
          ctx.fillText(displayText, centerX - windowWidth/2 + 10 * mobileScale, line.y)
          
          // Cursor blink (less frequent on mobile)
          if (visibleChars === line.text.length && Math.sin(time * (isMobile ? 0.08 : 0.1)) > 0) {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(centerX - windowWidth/2 + 10 * mobileScale + ctx.measureText(displayText).width, line.y - 10 * mobileScale, 1, 12 * mobileScale)
          }
        }
      })

      // Floating code symbols (reduced for mobile)
      const symbols = isMobile ? ["{ }", "< />", "=>"] : ["{ }", "< />", "( )", "[ ]", "=>", "&&"]
      symbols.forEach((symbol, index) => {
        const angle = time * (isMobile ? 0.008 : 0.01) + index * Math.PI / 3
        const radius = (50 + Math.sin(time * 0.02 + index) * 8) * mobileScale
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        const symbolPulse = Math.sin(time * 0.03 + index * 0.8) * 0.2 + 0.8
        ctx.fillStyle = "#8b5cf6"
        ctx.globalAlpha = symbolPulse * 0.6
        ctx.font = `${Math.max(12 * mobileScale, 8)}px 'Courier New', monospace`
        ctx.fillText(symbol, x - 8 * mobileScale, y)
      })

      // Binary rain effect (simplified for mobile)
      const rainColumns = isMobile ? 4 : 8
      for (let i = 0; i < rainColumns; i++) {
        const x = (canvasWidth / rainColumns) * i + Math.sin(time * 0.008 + i) * 15
        const binary = Math.random() > 0.5 ? "1" : "0"
        const y = (time * (isMobile ? 1 : 2) + i * 50) % (canvasHeight + 50)
        
        ctx.fillStyle = "#10b981"
        ctx.globalAlpha = 0.4
        ctx.font = `${Math.max(8 * mobileScale, 6)}px 'Courier New', monospace`
        ctx.fillText(binary, x, y)
      }
    }

    const drawMobile = () => {
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
      const canvasWidth = canvas.width / pixelRatio
      const canvasHeight = canvas.height / pixelRatio
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2

      // Scale elements based on canvas size
      const scale = Math.min(canvasWidth / 300, canvasHeight / 200)
      const mobileScale = isMobile ? Math.max(scale * 0.9, 0.6) : scale

      // Draw main phone frame
      const phoneWidth = Math.min(canvasWidth * 0.5, 90) * mobileScale
      const phoneHeight = Math.min(canvasHeight * 0.7, 160) * mobileScale
      
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = Math.max(3 * mobileScale, 1)
      ctx.globalAlpha = 0.8
      
      const phonePulse = Math.sin(time * (isMobile ? 0.02 : 0.025)) * 0.03 + 0.97
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.scale(phonePulse, phonePulse)
      
      // Phone outline
      ctx.beginPath()
      ctx.roundRect(-phoneWidth/2, -phoneHeight/2, phoneWidth, phoneHeight, 12 * mobileScale)
      ctx.stroke()
      
      // Screen
      ctx.fillStyle = "#1a1a1a"
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.roundRect(-phoneWidth/2 + 4 * mobileScale, -phoneHeight/2 + 8 * mobileScale, phoneWidth - 8 * mobileScale, phoneHeight - 16 * mobileScale, 8 * mobileScale)
      ctx.fill()
      
      // Notch
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.roundRect(-15 * mobileScale, -phoneHeight/2 + 2 * mobileScale, 30 * mobileScale, 6 * mobileScale, 3 * mobileScale)
      ctx.fill()
      
      ctx.restore()

      // App icons on screen (reduced for mobile)
      const iconSize = 12 * mobileScale
      const spacing = 25 * mobileScale
      const apps = [
        { x: centerX - spacing, y: centerY - spacing, color: "#ef4444", name: "📱" },
        { x: centerX + spacing, y: centerY - spacing, color: "#10b981", name: "💬" },
        { x: centerX - spacing, y: centerY, color: "#f59e0b", name: "📷" },
        { x: centerX + spacing, y: centerY, color: "#8b5cf6", name: "🎵" },
        { x: centerX - spacing, y: centerY + spacing, color: "#06b6d4", name: "🌐" },
        { x: centerX + spacing, y: centerY + spacing, color: "#ef4444", name: "✈️" },
      ]

      apps.forEach((app, index) => {
        const appPulse = Math.sin(time * 0.04 + index * 0.5) * 0.05 + 0.95
        const hoverOffset = Math.sin(time * 0.025 + index) * (isMobile ? 1 : 2)
        
        // App background
        ctx.fillStyle = app.color
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.roundRect(app.x - iconSize/2, app.y - iconSize/2 + hoverOffset, iconSize, iconSize, 4 * mobileScale)
        ctx.fill()
        
        // App border
        ctx.strokeStyle = app.color
        ctx.globalAlpha = 0.8 * appPulse
        ctx.lineWidth = 1
        ctx.stroke()
        
        // App icon
        ctx.fillStyle = "#ffffff"
        ctx.globalAlpha = 0.9
        ctx.font = `${Math.max(10 * mobileScale, 8)}px Arial`
        ctx.fillText(app.name, app.x - 5 * mobileScale, app.y + 3 * mobileScale + hoverOffset)
      })

      // Signal waves (simplified for mobile)
      const waveCount = isMobile ? 3 : 4
      for (let i = 0; i < waveCount; i++) {
        const waveRadius = (25 + i * 12) * mobileScale
        const waveOpacity = Math.sin(time * 0.025 - i * 0.3) * 0.2 + 0.3
        
        if (waveOpacity > 0) {
          ctx.strokeStyle = "#06b6d4"
          ctx.lineWidth = Math.max(2 * mobileScale, 1)
          ctx.globalAlpha = waveOpacity
          
          ctx.beginPath()
          ctx.arc(centerX + 40 * mobileScale, centerY - 50 * mobileScale, waveRadius, 0, Math.PI * 0.5)
          ctx.stroke()
        }
      }

      // Data transfer animation (simplified for mobile)
      const dataPoints = isMobile ? 4 : 6
      for (let i = 0; i < dataPoints; i++) {
        const progress = (time * (isMobile ? 0.015 : 0.02) + i * 0.4) % 1
        const startX = centerX - 50 * mobileScale
        const endX = centerX + 50 * mobileScale
        const currentX = startX + (endX - startX) * progress
        const y = centerY + 50 * mobileScale + Math.sin(progress * Math.PI * 2) * 8 * mobileScale
        
        ctx.fillStyle = "#10b981"
        ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.8
        ctx.beginPath()
        ctx.arc(currentX, y, 3 * mobileScale, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawCloud = () => {
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
      const canvasWidth = canvas.width / pixelRatio
      const canvasHeight = canvas.height / pixelRatio
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2

      // Scale elements based on canvas size
      const scale = Math.min(canvasWidth / 300, canvasHeight / 200)
      const mobileScale = isMobile ? Math.max(scale * 0.8, 0.6) : scale

      // Draw main cloud shape
      const cloudScale = Math.sin(time * (isMobile ? 0.015 : 0.02)) * 0.05 + 0.95
      
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.scale(cloudScale * mobileScale, cloudScale * mobileScale)
      
      // Cloud body
      ctx.fillStyle = "#f59e0b"
      ctx.globalAlpha = 0.3
      
      ctx.beginPath()
      ctx.arc(-25, 0, 25, 0, Math.PI * 2)
      ctx.arc(0, -15, 30, 0, Math.PI * 2)
      ctx.arc(25, 0, 25, 0, Math.PI * 2)
      ctx.arc(15, 15, 20, 0, Math.PI * 2)
      ctx.arc(-15, 15, 20, 0, Math.PI * 2)
      ctx.fill()
      
      // Cloud outline
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = Math.max(2 * mobileScale, 1)
      ctx.globalAlpha = 0.8
      ctx.stroke()
      
      ctx.restore()

      // Server icons in cloud
      const serverSize = 12 * mobileScale
      const servers = [
        { x: centerX - 12 * mobileScale, y: centerY - 4 * mobileScale, active: true },
        { x: centerX + 12 * mobileScale, y: centerY - 4 * mobileScale, active: false },
        { x: centerX, y: centerY + 8 * mobileScale, active: true },
      ]

      servers.forEach((server, index) => {
        const serverPulse = server.active ? 
          Math.sin(time * 0.03 + index) * 0.1 + 0.9 : 0.6
        
        ctx.fillStyle = server.active ? "#10b981" : "#6b7280"
        ctx.globalAlpha = serverPulse
        
        // Server box
        ctx.beginPath()
        ctx.roundRect(server.x - serverSize/2, server.y - serverSize/3, serverSize, serverSize * 2/3, 2 * mobileScale)
        ctx.fill()
        
        // Server lights
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = server.active ? "#00ff00" : "#333333"
          ctx.globalAlpha = server.active ? 
            Math.sin(time * 0.05 + index + i * 0.5) * 0.3 + 0.7 : 0.3
          ctx.beginPath()
          ctx.arc(server.x - 4 * mobileScale + i * 3 * mobileScale, server.y, 1 * mobileScale, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Data sync connections (simplified for mobile)
      const connections = [
        { from: servers[0], to: servers[1] },
        { from: servers[1], to: servers[2] },
        { from: servers[2], to: servers[0] },
      ]

      connections.forEach((conn, index) => {
        const syncProgress = (time * (isMobile ? 0.02 : 0.03) + index) % 1
        
        // Connection line
        ctx.strokeStyle = "#8b5cf6"
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.4
        
        ctx.beginPath()
        ctx.moveTo(conn.from.x, conn.from.y)
        ctx.lineTo(conn.to.x, conn.to.y)
        ctx.stroke()
        
        // Moving data packet
        const packetX = conn.from.x + (conn.to.x - conn.from.x) * syncProgress
        const packetY = conn.from.y + (conn.to.y - conn.from.y) * syncProgress
        
        ctx.fillStyle = "#8b5cf6"
        ctx.globalAlpha = Math.sin(syncProgress * Math.PI) * 0.8
        ctx.beginPath()
        ctx.arc(packetX, packetY, 2 * mobileScale, 0, Math.PI * 2)
        ctx.fill()
      })

      // Floating indicators (reduced for mobile)
      const indicatorDistance = isMobile ? 60 : 80
      const indicators = [
        { x: centerX - indicatorDistance * mobileScale, y: centerY - 25 * mobileScale, type: "upload", symbol: "↑" },
        { x: centerX + indicatorDistance * mobileScale, y: centerY - 25 * mobileScale, type: "download", symbol: "↓" },
        { x: centerX - indicatorDistance * mobileScale, y: centerY + 40 * mobileScale, type: "sync", symbol: "⟲" },
        { x: centerX + indicatorDistance * mobileScale, y: centerY + 40 * mobileScale, type: "backup", symbol: "💾" }
      ]

      indicators.forEach((indicator, index) => {
        const float = Math.sin(time * 0.025 + index * 1.2) * 6 * mobileScale
        const y = indicator.y + float
        const pulse = Math.sin(time * 0.04 + index * 0.8) * 0.2 + 0.8
        
        // Indicator background
        ctx.fillStyle = indicator.type === "upload" ? "#10b981" :
                        indicator.type === "download" ? "#06b6d4" :
                        indicator.type === "sync" ? "#8b5cf6" : "#f59e0b"
        ctx.globalAlpha = 0.2 * pulse
        ctx.beginPath()
        ctx.arc(indicator.x, y, 12 * mobileScale, 0, Math.PI * 2)
        ctx.fill()
        
        // Indicator border
        ctx.strokeStyle = ctx.fillStyle
        ctx.globalAlpha = 0.6 * pulse
        ctx.lineWidth = Math.max(2 * mobileScale, 1)
        ctx.stroke()
        
        // Indicator symbol
        ctx.fillStyle = "#ffffff"
        ctx.globalAlpha = 0.9 * pulse
        ctx.font = `${Math.max(12 * mobileScale, 8)}px Arial`
        const textWidth = ctx.measureText(indicator.symbol).width
        ctx.fillText(indicator.symbol, indicator.x - textWidth/2, y + 4 * mobileScale)
        
        // Connection line to cloud (simplified on mobile)
        if (!isMobile) {
          ctx.strokeStyle = ctx.strokeStyle
          ctx.globalAlpha = 0.2
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          
          ctx.beginPath()
          ctx.moveTo(indicator.x, y)
          ctx.lineTo(centerX, centerY)
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      // Cloud storage meter
      const meterWidth = 50 * mobileScale
      const meterHeight = 6 * mobileScale
      const meterX = centerX - meterWidth / 2
      const meterY = centerY + 35 * mobileScale
      const usage = (Math.sin(time * 0.008) + 1) / 2 * 0.7 + 0.1
      
      // Meter background
      ctx.fillStyle = "#333333"
      ctx.globalAlpha = 0.5
      ctx.beginPath()
      ctx.roundRect(meterX, meterY, meterWidth, meterHeight, 3 * mobileScale)
      ctx.fill()
      
      // Meter fill
      const gradient = ctx.createLinearGradient(meterX, 0, meterX + meterWidth, 0)
      gradient.addColorStop(0, "#10b981")
      gradient.addColorStop(0.7, "#f59e0b")
      gradient.addColorStop(1, "#ef4444")
      
      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.roundRect(meterX, meterY, meterWidth * usage, meterHeight, 3 * mobileScale)
      ctx.fill()
    }

    const animate = () => {
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
      const canvasWidth = canvas.width / pixelRatio
      const canvasHeight = canvas.height / pixelRatio

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      time++

      // Update and draw particles (with mobile optimization)
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (particle.x < 0) particle.x = canvasWidth
        if (particle.x > canvasWidth) particle.x = 0
        if (particle.y < 0) particle.y = canvasHeight
        if (particle.y > canvasHeight) particle.y = 0

        const scale = Math.max((particle.z + 50) / 150, 0.1)
        const radius = Math.max(particle.size * scale, 0.3)

        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity * scale * (isMobile ? 0.4 : 0.6)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw main illustration
      try {
        switch (type) {
          case "code":
            drawCode()
            break
          case "mobile":
            drawMobile()
            break
          case "cloud":
            drawCloud()
            break
        }
      } catch (error) {
        console.warn("ThreeJS illustration error:", error)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Delay initialization slightly to ensure proper sizing
    const timeoutId = setTimeout(() => {
      initParticles()
      animate()
    }, 150)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(timeoutId)
    }
  }, [type, isMobile])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        minHeight: isMobile ? '200px' : '300px',
        maxHeight: isMobile ? '300px' : '500px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}