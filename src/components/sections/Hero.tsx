'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useIntro } from '@/components/providers/Providers'
import { site } from '@/lib/data'
import { ease } from '@/lib/utils'

export default function Hero() {
  const { ready } = useIntro()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const metaY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])

  // Orb drifts toward the pointer
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const orbX = useSpring(mx, { stiffness: 40, damping: 20 })
  const orbY = useSpring(my, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 240)
      my.set((e.clientY / window.innerHeight - 0.5) * 160)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  const letters = site.name.split('')
  const show = ready ? 'show' : 'hidden'

  return (
    <section
      id="top"
      ref={ref}
      className="gutter relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-6 pt-28"
    >
      {/* Ambient light */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ scale: orbScale }}>
        <motion.div
          className="absolute left-1/2 top-[38%] size-[min(70vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(255_91_34/0.55),rgb(255_91_34/0.12)_45%,transparent_70%)] blur-3xl"
          style={{ x: orbX, y: orbY }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 2.4, ease: 'easeOut', delay: 0.3 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,var(--color-ink))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-[size:calc(100%/6)_100%] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </motion.div>

      <motion.div style={{ y: metaY }} className="mb-[2vw] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.p
          className="max-w-[26ch] text-[clamp(1.75rem,4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em]"
          initial="hidden"
          animate={show}
          transition={{ staggerChildren: 0.08, delayChildren: 0.55 }}
        >
          {['Full-stack', 'developer'].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block pr-[0.25em]"
                variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
                transition={{ duration: 1.1, ease: ease.expo }}
              >
                {w}
              </motion.span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block font-serif font-normal italic text-accent"
              variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
              transition={{ duration: 1.1, ease: ease.expo }}
            >
              &amp; AI engineer
            </motion.span>
          </span>
        </motion.p>

        <motion.div
          className="flex max-w-sm flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: ease.expo, delay: 0.9 }}
        >
          <p className="text-[15px] leading-relaxed text-paper/70">{site.intro}</p>
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="label !text-paper/80">Open to new opportunities</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.h1
        style={{ y: nameY, opacity: nameOpacity }}
        className="relative flex select-none text-[calc((100vw-2*var(--gutter))/4.25)] font-semibold leading-[0.8] tracking-[-0.06em]"
        aria-label={site.name}
        initial="hidden"
        animate={show}
        transition={{ staggerChildren: 0.045, delayChildren: 0.15 }}
      >
        {letters.map((l, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.22em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '105%', rotate: 8 },
                show: { y: '0%', rotate: 0 },
              }}
              transition={{ duration: 1.3, ease: ease.expo }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.div
        className="flex items-center justify-between border-t border-line pt-4"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="label">({site.handle})</span>
        <span className="label hidden sm:inline">Portfolio — ©{new Date().getFullYear()}</span>
        <span className="label flex items-center gap-3">
          Scroll
          <span className="relative block h-px w-10 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-0 bg-paper"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  )
}
