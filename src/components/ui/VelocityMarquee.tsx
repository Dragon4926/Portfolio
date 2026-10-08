'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface VelocityMarqueeProps {
  children: ReactNode
  /** Base speed in % of one copy per second; negative scrolls right */
  baseVelocity?: number
  className?: string
}

/** Infinite marquee that speeds up, reverses and skews with scroll velocity. */
export default function VelocityMarquee({ children, baseVelocity = 3, className }: VelocityMarqueeProps) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [8, 0, -8], { clamp: true })

  // Four copies; wrap across one copy's width (25%).
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const f = velocityFactor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    const moveBy = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(f))
    baseX.set(baseX.get() - moveBy)
  })

  return (
    <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex shrink-0 flex-nowrap will-change-transform" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
