'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

interface IntroState {
  /** True once the preloader has finished and the page may play its entrance. */
  ready: boolean
  setReady: (v: boolean) => void
}

const IntroContext = createContext<IntroState>({ ready: true, setReady: () => {} })

export const useIntro = () => useContext(IntroContext)

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reducedMotion, anchors: true }}>
      <IntroContext.Provider value={{ ready, setReady }}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </IntroContext.Provider>
    </ReactLenis>
  )
}
