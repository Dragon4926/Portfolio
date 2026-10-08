'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Blend-mode cursor. Any element with `data-cursor="Label"` grows the ring and
 * shows the label; `data-cursor=""` just grows it.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)

      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor], a, button')
      setHovering(!!target)
      setLabel(target?.dataset.cursor || null)
    }
    const leave = () => setHidden(true)

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 96 : hovering ? 56 : 14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-paper mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: hidden ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
