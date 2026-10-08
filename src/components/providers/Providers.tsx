'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

export default function Providers({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: !reducedMotion, anchors: true }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  )
}
