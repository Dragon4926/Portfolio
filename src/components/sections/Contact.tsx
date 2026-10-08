'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Magnetic from '@/components/ui/Magnetic'
import { SplitReveal } from '@/components/ui/Reveal'
import { site, socials } from '@/lib/data'
import { ease } from '@/lib/utils'

function LocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })
    setTime(fmt())
    const id = window.setInterval(() => setTime(fmt()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time ?? '—'}</span>
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const [copied, setCopied] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])
  const arrowRotate = useTransform(scrollYProgress, [0, 1], [120, 90])
  const handleY = useTransform(scrollYProgress, [0.4, 1], ['60%', '0%'])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-ink-2">
      <motion.div style={{ y }} className="gutter pt-[clamp(7rem,16vw,14rem)]">
        <div className="flex items-start justify-between gap-6">
          <p className="label">(06) — Contact</p>
          <motion.svg
            style={{ rotate: arrowRotate }}
            width="28"
            height="28"
            viewBox="0 0 14 14"
            fill="none"
            className="text-mute"
            aria-hidden
          >
            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1" />
          </motion.svg>
        </div>

        <h2 className="mt-8 text-[clamp(3.25rem,10vw,11rem)] font-medium leading-[0.88] tracking-[-0.055em]">
          <SplitReveal text="Let's build" className="block" />
          <SplitReveal text="something great." className="block font-serif font-normal italic text-accent" delay={0.12} />
        </h2>

        <div className="relative mt-[clamp(3rem,7vw,6rem)] border-t border-line">
          <div className="mt-8 flex justify-end md:absolute md:right-[6%] md:top-0 md:mt-0 md:-translate-y-1/2">
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${site.email}`}
                data-cursor="Write"
                className="group relative flex size-[clamp(8.5rem,14vw,13rem)] items-center justify-center overflow-hidden rounded-full bg-accent text-base font-medium text-ink md:text-lg"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
                <span className="relative">Get in touch</span>
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-wrap gap-3 pt-8 md:pt-12">
            <button
              type="button"
              onClick={copy}
              className="relative overflow-hidden rounded-full border border-line px-6 py-4 text-sm transition-colors duration-500 hover:border-paper md:text-base"
              aria-label={`Copy email address ${site.email}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'copied' : 'email'}
                  className="block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: ease.expo }}
                >
                  {copied ? 'Copied to clipboard ✓' : site.email}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href={socials[1].href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-4 text-sm transition-colors duration-500 hover:border-paper md:text-base"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-[clamp(5rem,10vw,9rem)] grid gap-8 border-t border-line py-8 sm:grid-cols-3">
          <div>
            <p className="label mb-3">Version</p>
            <p className="text-sm">{new Date().getFullYear()} © Edition</p>
          </div>
          <div>
            <p className="label mb-3">Your local time</p>
            <p className="text-sm">
              <LocalTime />
            </p>
          </div>
          <div className="sm:text-right">
            <p className="label mb-3">Socials</p>
            <div className="flex flex-wrap gap-5 sm:justify-end">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="group relative text-sm">
                  {s.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative overflow-hidden">
        <motion.button
          type="button"
          style={{ y: handleY }}
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          data-cursor="Top ↑"
          aria-label="Back to top"
          className="block w-full select-none whitespace-nowrap text-center text-[clamp(3rem,15.8vw,19rem)] font-semibold leading-[0.78] tracking-[-0.065em] text-paper/[0.06] transition-colors duration-700 hover:text-accent"
        >
          {site.handle}
        </motion.button>
      </div>
    </footer>
  )
}
