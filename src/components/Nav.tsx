'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { sections, site, socials } from '@/lib/data'
import { cn, ease } from '@/lib/utils'

export default function Nav() {
  const lenis = useLenis()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  // Scroll-spy: the section crossing the upper third of the viewport is active.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 200 && setActive(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -56, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            if (lenis) lenis.scrollTo(0, { duration: 1.4 })
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-baseline gap-2 whitespace-nowrap"
        >
          <span className="text-lg italic">{site.name}</span>
          <span className="meta hidden sm:inline">— {site.role}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(s.id)
              }}
              className={cn(
                'relative px-2.5 py-1 font-mono text-[11px] transition-colors',
                active === s.id ? 'text-paper' : 'text-ink-2 hover:text-ink',
              )}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 bg-blue"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              §{s.n} {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={socials[0].href} target="_blank" rel="noreferrer" className="link hidden font-mono text-[11px] sm:inline">
            GitHub ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="border border-ink px-2.5 py-1 font-mono text-[11px] lg:hidden"
            aria-expanded={open}
            aria-controls="toc"
          >
            {open ? 'Close' : 'Contents'}
          </button>
        </div>
      </div>

      <motion.div aria-hidden className="h-[2px] origin-left bg-blue" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="toc"
            aria-label="Contents"
            className="overflow-hidden border-t border-rule bg-paper lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: ease.expo }}
          >
            <ol className="wrap py-4">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(s.id)
                    }}
                    className="flex items-baseline gap-4 border-b border-rule py-3 last:border-0"
                  >
                    <span className="w-8 font-mono text-xs text-blue">§{s.n}</span>
                    <span className="text-2xl">{s.label}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
