'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  hue: 0 | 1 | 2
}

const HISTORY = 220
const INK = '#141413'
const BLUE = '#1f3ad6'
const RED = '#d63a24'

function gaussian() {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Rasterise `text` and return points on its glyphs, sampled every `step` px. */
function sampleText(text: string, w: number, h: number, family: string) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  let size = h * 0.92
  ctx.font = `italic 500 ${size}px ${family}`
  const measured = ctx.measureText(text).width
  if (measured > w * 0.94) size *= (w * 0.94) / measured
  ctx.font = `italic 500 ${size}px ${family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#000'
  ctx.fillText(text, w / 2, h * 0.5 + size * 0.3)

  const data = ctx.getImageData(0, 0, w, h).data
  const area = w * h
  const step = Math.max(2, Math.round(Math.sqrt(area / 26000)))
  const pts: [number, number][] = []
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 140) pts.push([x + (Math.random() - 0.5) * step * 0.6, y + (Math.random() - 0.5) * step * 0.6])
    }
  }
  return pts
}

/**
 * Figure 1 — particles start as Gaussian noise and are "fitted" to the glyphs
 * of a word with a warm-up learning rate and annealed noise. The pointer adds
 * perturbations; the loss curve shows the model recovering.
 */
export default function FitFigure({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lossPathRef = useRef<SVGPathElement>(null)
  const lossAreaRef = useRef<SVGPathElement>(null)
  const epochRef = useRef<HTMLSpanElement>(null)
  const lossRef = useRef<HTMLSpanElement>(null)
  const pointer = useRef({ x: -9999, y: -9999, active: false })
  const resetRef = useRef<() => void>(() => {})
  const [hover, setHover] = useState(false)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const label = useTransform(() => `x=${px.get().toFixed(2)}  y=${py.get().toFixed(2)}`)
  const crossX = useMotionValue(0)
  const crossY = useMotionValue(0)

  useEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles: Particle[] = []
    let W = 0
    let H = 0
    let dpr = 1
    let frame = 0
    let temperature = 1
    let raf = 0
    let visible = true
    let disposed = false
    const losses: number[] = []

    const family = getComputedStyle(document.body).fontFamily

    const init = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.round(rect.width)
      H = Math.round(rect.height)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targets = sampleText(text, W, H, family)
      // Shuffle so particles don't map spatially to targets — makes the fit visible.
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[targets[i], targets[j]] = [targets[j], targets[i]]
      }
      particles = targets.map(([tx, ty], i) => {
        const x = reduced ? tx : W / 2 + gaussian() * W * 0.2
        const y = reduced ? ty : H / 2 + gaussian() * H * 0.22
        return { x, y, vx: 0, vy: 0, tx, ty, hue: i % 23 === 0 ? 2 : i % 7 === 0 ? 1 : 0 }
      })
      frame = 0
      temperature = reduced ? 0 : 1
      losses.length = 0
    }

    const drawLoss = () => {
      if (!lossPathRef.current || losses.length < 2) return
      const max = Math.log10(losses[0] + 1e-6)
      const min = -4.2
      let d = ''
      for (let i = 0; i < losses.length; i++) {
        const x = (i / (HISTORY - 1)) * 100
        const v = (Math.log10(losses[i] + 1e-6) - min) / (max - min)
        const y = 40 - Math.max(0, Math.min(1, v)) * 38 - 1
        d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`
      }
      lossPathRef.current.setAttribute('d', d)
      lossAreaRef.current?.setAttribute('d', `${d}L${(((losses.length - 1) / (HISTORY - 1)) * 100).toFixed(2)} 40L0 40Z`)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      frame++

      // warm-up then constant learning rate; annealed exploration noise
      const lr = Math.min(0.022, 0.0015 + frame * 0.00018)
      temperature *= 0.988
      const noise = temperature * 2.4
      const { x: mx, y: my, active } = pointer.current
      const R = Math.max(60, W * 0.06)

      let sq = 0
      ctx.clearRect(0, 0, W, H)
      const batches: [string, Path2D][] = [
        [INK, new Path2D()],
        [BLUE, new Path2D()],
        [RED, new Path2D()],
      ]

      for (const p of particles) {
        p.vx = p.vx * 0.82 + (p.tx - p.x) * lr + gaussian() * noise
        p.vy = p.vy * 0.82 + (p.ty - p.y) * lr + gaussian() * noise
        if (active) {
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1
            const f = ((R - d) / R) * 2.2
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
        p.x += p.vx
        p.y += p.vy
        const ex = (p.tx - p.x) / W
        const ey = (p.ty - p.y) / W
        sq += ex * ex + ey * ey

        const r = p.hue === 0 ? 1.15 : 1.5
        const path = batches[p.hue][1]
        path.moveTo(p.x + r, p.y)
        path.arc(p.x, p.y, r, 0, Math.PI * 2)
      }
      for (const [color, path] of batches) {
        ctx.fillStyle = color
        ctx.fill(path)
      }

      const loss = sq / Math.max(1, particles.length)
      if (frame % 2 === 0) {
        losses.push(loss)
        if (losses.length > HISTORY) losses.splice(1, 1) // keep the initial loss as the reference point
        drawLoss()
        if (epochRef.current) epochRef.current.textContent = String(Math.floor(frame / 2)).padStart(4, '0')
        if (lossRef.current) lossRef.current.textContent = loss.toExponential(2)
      }
    }

    let started = false
    let fontReady = false
    const start = () => {
      if (started || disposed || !fontReady || !visible) return
      started = true
      init()
      tick()
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(wrap)

    let lastW = 0
    const ro = new ResizeObserver(() => {
      const w = Math.round(wrap.getBoundingClientRect().width)
      if (started && Math.abs(w - lastW) > 40) init()
      lastW = w
    })
    ro.observe(wrap)

    resetRef.current = () => init()
    const ready = () => {
      fontReady = true
      start()
    }
    if (document.fonts) document.fonts.load(`italic 400 64px ${family}`).then(ready, ready)
    else ready()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [text])

  const onMove = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    pointer.current = { x, y, active: true }
    crossX.set(x)
    crossY.set(y)
    px.set(x / r.width)
    py.set(1 - y / r.height)
  }

  return (
    <figure className="relative">
      <div className="relative border-y border-ink">
        {/* axis ticks */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[7px] flex justify-between px-0">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="h-[6px] w-px bg-ink" />
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[7px] flex justify-between">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="h-[6px] w-px bg-ink" />
          ))}
        </div>

        <div
          ref={wrapRef}
          className="graph-paper relative h-[clamp(11rem,26vw,22rem)] cursor-crosshair touch-pan-y overflow-hidden"
          onPointerMove={onMove}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => {
            pointer.current.active = false
            setHover(false)
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />

          {hover && (
            <>
              <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-blue/40" style={{ x: crossX }} />
              <motion.span aria-hidden className="pointer-events-none absolute inset-x-0 h-px bg-blue/40" style={{ y: crossY }} />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-2 top-2 whitespace-pre bg-paper/90 px-1.5 py-0.5 font-mono text-[10px] text-blue"
              >
                {label}
              </motion.span>
            </>
          )}
        </div>
      </div>

      <figcaption className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
        <p className="max-w-[62ch] text-[15px] leading-snug text-ink-2">
          <span className="meta mr-2 !text-ink">Fig. 1</span>
          Particles initialised as Gaussian noise and fitted to the target glyphs by gradient descent with learning-rate
          warm-up and annealed noise. <span className="italic text-ink">Move your cursor through the figure</span> to perturb
          the data — or{' '}
          <button type="button" onClick={() => resetRef.current()} className="link italic text-ink">
            re-initialise
          </button>
          .
        </p>
        <div className="flex items-end gap-4">
          <div className="w-40">
            <div className="mb-1 flex justify-between font-mono text-[10px] text-ink-3">
              <span>log loss</span>
              <span>epoch</span>
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full overflow-visible border-b border-l border-ink/40">
              <path ref={lossAreaRef} className="fill-blue/10" />
              <path ref={lossPathRef} className="fill-none stroke-blue" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <dl className="font-mono text-[11px] leading-5 tabular-nums">
            <div className="flex gap-2">
              <dt className="text-ink-3">epoch</dt>
              <dd ref={epochRef}>0000</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-3">loss</dt>
              <dd ref={lossRef} className="text-blue">—</dd>
            </div>
          </dl>
        </div>
      </figcaption>
    </figure>
  )
}
