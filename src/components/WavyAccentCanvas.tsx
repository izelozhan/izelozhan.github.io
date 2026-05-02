import { useEffect, useRef } from 'react'

export default function WavyAccentCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = 280
    const H = 32
    canvas.width = W
    canvas.height = H

    let t = 0
    let rafId: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, '#f472b6')
      grad.addColorStop(0.45, '#a78bfa')
      grad.addColorStop(1, '#22d3ee')

      const buildPath = () => {
        ctx.beginPath()
        ctx.moveTo(4, H / 2)
        for (let x = 4; x <= W - 4; x += 2) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * 5 + t) * 7
          ctx.lineTo(x, y)
        }
      }

      // Glow
      buildPath()
      ctx.strokeStyle = grad
      ctx.lineWidth = 8
      ctx.globalAlpha = 0.18
      ctx.lineCap = 'round'
      ctx.stroke()

      // Mid glow
      buildPath()
      ctx.lineWidth = 4
      ctx.globalAlpha = 0.28
      ctx.stroke()

      // Core
      buildPath()
      ctx.lineWidth = 2.5
      ctx.globalAlpha = 0.9
      ctx.stroke()

      ctx.globalAlpha = 1
      t += 0.03
      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '280px', height: '32px', display: 'block' }}
    />
  )
}
