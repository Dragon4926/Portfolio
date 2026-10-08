'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useIntro } from '@/components/providers/Providers'
import { ease } from '@/lib/utils'

const SEEN_KEY = 'd4926:intro-seen'
const words = ['Design', 'Engineer', 'Ship', 'Repeat']

export default function Preloader() {
  const { setReady } = useIntro()
  const lenis = useLenis()
  const [visible, setVisible] = useState(true)
  const [quick, setQuick] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight })

    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {}

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setQuick(true)
      setVisible(false)
      setReady(true)
      return
    }

    window.scrollTo(0, 0)
    const wordTimer = window.setInterval(
      () => setWordIndex((i) => Math.min(i + 1, words.length - 1)),
      520,
    )
    const controls = animate(count, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        window.clearInterval(wordTimer)
        window.setTimeout(() => setVisible(false), 250)
      },
    })
    return () => {
      controls.stop()
      window.clearInterval(wordTimer)
    }
  }, [count, setReady])

  // Keep the page locked while the curtain is down.
  useEffect(() => {
    if (!lenis) return
    if (visible) lenis.stop()
    else lenis.start()
  }, [lenis, visible])

  const { w, h } = size
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 260} 0 ${h} L0 0`

  return (
    <AnimatePresence onExitComplete={() => setReady(true)}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-2"
          initial={false}
          exit={quick ? { opacity: 0 } : { y: '-100vh' }}
          transition={{ duration: quick ? 0.3 : 1.1, ease: ease.curtain, delay: quick ? 0 : 0.1 }}
          onAnimationStart={() => {
            if (!quick) setReady(true)
          }}
          aria-hidden
        >
          <div className="gutter absolute inset-x-0 top-0 flex justify-between pt-6">
            <span className="label">Debopriyo — Portfolio</span>
            <span className="label">©{new Date().getFullYear()}</span>
          </div>

          <div className="relative h-[1.1em] overflow-hidden text-[clamp(2.5rem,7vw,6rem)] font-medium leading-none tracking-tight">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={words[wordIndex]}
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.5, ease: ease.expo }}
              >
                {words[wordIndex]}
                <span className="font-serif italic text-accent">.</span>
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="gutter absolute inset-x-0 bottom-0 flex items-end justify-between pb-6">
            <span className="label">Loading experience</span>
            <motion.span className="font-mono text-[clamp(3rem,10vw,9rem)] leading-none tabular-nums text-paper">
              {rounded}
            </motion.span>
          </div>

          {w > 0 && (
            <svg className="pointer-events-none absolute left-0 top-0 -z-10 h-[calc(100%+260px)] w-full fill-ink-2">
              <motion.path
                initial={{ d: curved }}
                exit={{ d: flat }}
                transition={{ duration: 1.1, ease: ease.curtain, delay: 0.1 }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
