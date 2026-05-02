import { useEffect, useRef } from 'react'

interface RibbonConfig {
  yFrac: number
  amps: number[]
  freqs: number[]
  phases: number[]
  color1: string
  color2: string
  coreWidth: number
  alpha: number
  speed: number
}

const RIBBONS: RibbonConfig[] = [
  {
    yFrac: 0.10,
    amps:   [0, 22, 52, 72, 52, 22, 0],
    freqs:  [0.40, 0.38, 0.42, 0.40, 0.38, 0.42, 0.40],
    phases: [0.0, 0.8, 1.6, 2.4, 3.2, 4.0, 4.8],
    color1: '#f472b6', color2: '#e879f9',
    coreWidth: 2.0, alpha: 0.65, speed: 0.7,
  },
  {
    yFrac: 0.24,
    amps:   [0, 30, 65, 85, 65, 30, 0],
    freqs:  [0.28, 0.26, 0.30, 0.28, 0.26, 0.30, 0.28],
    phases: [1.0, 1.9, 2.8, 3.7, 4.6, 5.5, 6.4],
    color1: '#e879f9', color2: '#a78bfa',
    coreWidth: 2.5, alpha: 0.55, speed: 0.5,
  },
  {
    yFrac: 0.39,
    amps:   [0, 18, 46, 64, 46, 18, 0],
    freqs:  [0.50, 0.48, 0.52, 0.50, 0.48, 0.52, 0.50],
    phases: [2.0, 2.7, 3.4, 4.1, 4.8, 5.5, 6.2],
    color1: '#a78bfa', color2: '#67e8f9',
    coreWidth: 1.5, alpha: 0.50, speed: 0.9,
  },
  {
    yFrac: 0.51,
    amps:   [0, 14, 38, 54, 38, 14, 0],
    freqs:  [0.34, 0.32, 0.36, 0.34, 0.32, 0.36, 0.34],
    phases: [3.0, 3.6, 4.2, 4.8, 5.4, 6.0, 6.6],
    color1: '#f472b6', color2: '#67e8f9',
    coreWidth: 1.0, alpha: 0.32, speed: 0.6,
  },
  {
    yFrac: 0.63,
    amps:   [0, 26, 58, 78, 58, 26, 0],
    freqs:  [0.44, 0.42, 0.46, 0.44, 0.42, 0.46, 0.44],
    phases: [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0],
    color1: '#67e8f9', color2: '#a78bfa',
    coreWidth: 2.0, alpha: 0.45, speed: 0.75,
  },
  {
    yFrac: 0.76,
    amps:   [0, 20, 50, 70, 50, 20, 0],
    freqs:  [0.31, 0.29, 0.33, 0.31, 0.29, 0.33, 0.31],
    phases: [5.0, 5.4, 5.8, 6.2, 6.6, 7.0, 7.4],
    color1: '#c084fc', color2: '#f472b6',
    coreWidth: 1.5, alpha: 0.50, speed: 0.55,
  },
  {
    yFrac: 0.89,
    amps:   [0, 28, 58, 76, 58, 28, 0],
    freqs:  [0.41, 0.39, 0.43, 0.41, 0.39, 0.43, 0.41],
    phases: [6.0, 6.3, 6.6, 6.9, 7.2, 7.5, 7.8],
    color1: '#e879f9', color2: '#67e8f9',
    coreWidth: 2.5, alpha: 0.58, speed: 0.85,
  },
]

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  color1: string,
  color2: string,
  lineWidth: number,
  alpha: number
) {
  if (pts.length < 2) return
  const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y)
  grad.addColorStop(0, color1)
  grad.addColorStop(1, color2)

  ctx.save()
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length - 2; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2
    const my = (pts[i].y + pts[i + 1].y) / 2
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
  }
  ctx.quadraticCurveTo(
    pts[pts.length - 2].x,
    pts[pts.length - 2].y,
    pts[pts.length - 1].x,
    pts[pts.length - 1].y
  )
  ctx.strokeStyle = grad
  ctx.lineWidth = lineWidth
  ctx.globalAlpha = alpha
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
  ctx.restore()
}

export default function FlowingRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId: number
    let t = 0

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const r of RIBBONS) {
        const n = r.amps.length
        const pts = Array.from({ length: n }, (_, i) => ({
          x: (-0.05 + (i / (n - 1)) * 1.1) * W,
          y: r.yFrac * H + Math.sin(t * r.speed * r.freqs[i] + r.phases[i]) * r.amps[i],
        }))

        // Soft glow pass
        drawRibbon(ctx, pts, r.color1, r.color2, r.coreWidth * 8, r.alpha * 0.12)
        // Medium glow
        drawRibbon(ctx, pts, r.color1, r.color2, r.coreWidth * 3, r.alpha * 0.22)
        // Core line
        drawRibbon(ctx, pts, r.color1, r.color2, r.coreWidth, r.alpha)
      }

      t += 0.016
      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
