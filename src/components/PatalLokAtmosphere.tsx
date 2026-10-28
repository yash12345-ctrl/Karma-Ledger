import { useEffect, useRef } from 'react'
import patalLokBg from '../assets/patal_lok.jpg'
import './PatalLokAtmosphere.css'

interface Ember {
  x: number
  y: number
  radius: number
  color: string
  glowColor: string
  speedY: number
  speedX: number
  swayFreq: number
  swayAmp: number
  phase: number
  alpha: number
  maxLife: number
  life: number
}

interface SoulWisp {
  x: number
  y: number
  radius: number
  speedY: number
  swayFreq: number
  phase: number
  hue: number
  alpha: number
}

interface AshParticle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  alpha: number
}

export default function PatalLokAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth
      mouseRef.current.targetY = e.clientY / window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Palette of embers from intense core to cooling rim
    const emberPalette = [
      { core: '#fffdf0', glow: 'rgba(255, 230, 110, 0.9)' },
      { core: '#ffd166', glow: 'rgba(255, 160, 40, 0.85)' },
      { core: '#ff8427', glow: 'rgba(240, 90, 20, 0.8)' },
      { core: '#ef476f', glow: 'rgba(230, 40, 60, 0.75)' },
      { core: '#ff4800', glow: 'rgba(255, 100, 30, 0.8)' },
    ]

    // Create Embers
    const emberCount = Math.min(85, Math.floor(width / 20))
    const embers: Ember[] = Array.from({ length: emberCount }, () => {
      const palette = emberPalette[Math.floor(Math.random() * emberPalette.length)]
      return {
        x: Math.random() * width,
        y: height + Math.random() * 200,
        radius: Math.random() * 2.2 + 0.8,
        color: palette.core,
        glowColor: palette.glow,
        speedY: Math.random() * 1.6 + 0.7,
        speedX: (Math.random() - 0.5) * 0.6,
        swayFreq: Math.random() * 0.025 + 0.01,
        swayAmp: Math.random() * 2.5 + 1.2,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.8 + 0.2,
        maxLife: Math.random() * 400 + 200,
        life: Math.random() * 300,
      }
    })

    // Create Soul Wisps (ethereal blue/violet spirits rising from Patal Lok)
    const wispCount = 14
    const wisps: SoulWisp[] = Array.from({ length: wispCount }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 400,
      radius: Math.random() * 5 + 3,
      speedY: Math.random() * 0.7 + 0.3,
      swayFreq: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.6 ? 260 : 190, // mystic purple or cyan
      alpha: Math.random() * 0.5 + 0.2,
    }))

    // Create Soft Ash / Smoke Specks
    const ashCount = 35
    const ashes: AshParticle[] = Array.from({ length: ashCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.35 + 0.1,
    }))

    let time = 0

    const render = () => {
      time += 0.016

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Subterranean Heat Gradient Pulse
      const lavaPulse = 0.5 + 0.5 * Math.sin(time * 1.5)
      const heatGrad = ctx.createRadialGradient(
        width * 0.5 + (mouseRef.current.x - 0.5) * 80,
        height * 0.95,
        10,
        width * 0.5,
        height * 0.85,
        height * 0.7,
      )
      heatGrad.addColorStop(0, `rgba(255, 90, 20, ${0.22 + lavaPulse * 0.08})`)
      heatGrad.addColorStop(0.35, `rgba(180, 40, 10, ${0.14 + lavaPulse * 0.05})`)
      heatGrad.addColorStop(0.7, `rgba(60, 10, 30, ${0.08 + lavaPulse * 0.03})`)
      heatGrad.addColorStop(1, 'rgba(5, 4, 15, 0)')

      ctx.fillStyle = heatGrad
      ctx.fillRect(0, 0, width, height)

      // 2. Render Soul Wisps
      wisps.forEach((w) => {
        w.y -= w.speedY
        w.x += Math.sin(time * w.swayFreq * 60 + w.phase) * 0.8

        if (w.y < -50) {
          w.y = height + 40
          w.x = Math.random() * width
        }

        const pulse = 0.7 + 0.3 * Math.sin(time * 2 + w.phase)
        const wispGrad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.radius * 3.5)
        wispGrad.addColorStop(0, `hsla(${w.hue}, 90%, 75%, ${w.alpha * pulse})`)
        wispGrad.addColorStop(0.4, `hsla(${w.hue}, 85%, 60%, ${w.alpha * 0.5 * pulse})`)
        wispGrad.addColorStop(1, `hsla(${w.hue}, 80%, 40%, 0)`)

        ctx.fillStyle = wispGrad
        ctx.beginPath()
        ctx.arc(w.x, w.y, w.radius * 3.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // 3. Render Ash / Dust
      ctx.fillStyle = 'rgba(255, 180, 120, 0.25)'
      ashes.forEach((a) => {
        a.y -= a.speedY
        a.x += a.speedX + Math.sin(time * 0.5 + a.y * 0.01) * 0.2
        if (a.y < -10) {
          a.y = height + 10
          a.x = Math.random() * width
        }
        ctx.globalAlpha = a.alpha
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      // 4. Render Living Embers with dynamic glow
      embers.forEach((e) => {
        e.life++
        e.y -= e.speedY
        // Horizontal aerodynamic curl
        const curl = Math.sin(time * 2 + e.phase) * e.swayAmp
        e.x += e.speedX + curl

        // Mouse turbulence deflection
        const dx = e.x - mouseRef.current.x * width
        const dy = e.y - mouseRef.current.y * height
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          const force = (1 - dist / 180) * 1.5
          e.x += (dx / dist) * force * 2.5
          e.y += (dy / dist) * force * 1.5
        }

        // Fade out near the top or end of life
        const lifeRatio = 1 - e.life / e.maxLife
        const topFade = Math.min(1, e.y / 250)
        const currentAlpha = Math.max(0, e.alpha * lifeRatio * topFade)

        if (e.y < -20 || e.life >= e.maxLife || currentAlpha <= 0.01) {
          e.y = height + Math.random() * 40
          e.x = Math.random() * width
          e.life = 0
          e.alpha = Math.random() * 0.85 + 0.2
          e.speedY = Math.random() * 1.8 + 0.8
        }

        // Draw Ember Glow
        const glowRad = e.radius * 3.2
        const radGrad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRad)
        radGrad.addColorStop(0, e.glowColor)
        radGrad.addColorStop(1, 'rgba(255, 60, 0, 0)')

        ctx.fillStyle = radGrad
        ctx.beginPath()
        ctx.arc(e.x, e.y, glowRad, 0, Math.PI * 2)
        ctx.fill()

        // Draw Bright Core
        ctx.fillStyle = e.color
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="patal-lok-env" ref={containerRef} aria-hidden="true">
      {/* 1. Base High-Res Artwork with Slow Cinematic Parallax Camera Breathing */}
      <div
        className="patal-lok-art"
        style={{ backgroundImage: `url(${patalLokBg})` }}
      />

      {/* 2. Deep Subterranean Shadow Vignette */}
      <div className="patal-lok-vignette" />

      {/* 3. Volumetric Drifting Smoke & Heat Layers */}
      <div className="patal-lok-smoke smoke--layer1" />
      <div className="patal-lok-smoke smoke--layer2" />

      {/* 4. Molten Magma Reservoir Glowing Horizon */}
      <div className="patal-lok-magma-glow" />

      {/* 5. 60 FPS HTML5 Canvas Particle Engine (Embers + Soul Wisps + Ash) */}
      <canvas ref={canvasRef} className="patal-lok-canvas" />

      {/* 6. Living Rune Glow Shimmer Overlay */}
      <div className="patal-lok-runes-sheen" />
    </div>
  )
}
