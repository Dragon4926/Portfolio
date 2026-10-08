'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Magnetic from '@/components/ui/Magnetic'
import { useIntro } from '@/components/providers/Providers'
import { navLinks, site, socials } from '@/lib/data'
import { cn, ease } from '@/lib/utils'

export default function Nav() {
  const { ready } = useIntro()
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 160))

  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
  }, [open, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 mix-blend-difference"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease: ease.expo, delay: 0.6 }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            go('#top')
          }}
          className="group flex items-center gap-2 text-sm font-medium text-paper"
          aria-label="Back to top"
        >
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
              © Code by {site.name}
            </span>
            <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0">
              © {site.handle}
            </span>
          </span>
        </a>

        <nav
          className={cn(
            'hidden items-center gap-8 transition-opacity duration-500 md:flex',
            scrolled && 'pointer-events-none opacity-0',
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                go(link.href)
              }}
              className="group relative text-sm text-paper"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className={cn('text-sm text-paper transition-opacity md:hidden', scrolled && 'pointer-events-none opacity-0')}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          Menu
        </button>
      </motion.header>

      {/* Floating menu button once the header links are out of view */}
      <AnimatePresence>
        {(scrolled || open) && (
          <motion.div
            className="fixed right-[var(--gutter)] top-5 z-[70]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.45, ease: ease.expo }}
          >
            <Magnetic strength={0.4}>
              <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  'flex size-16 items-center justify-center rounded-full border border-line transition-colors duration-500',
                  open ? 'bg-accent' : 'bg-ink-3 hover:bg-accent',
                )}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="site-menu"
              >
                <span className="relative block h-3 w-6">
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-500',
                      open && 'translate-y-1.5 rotate-45',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-px w-full bg-paper transition-transform duration-500',
                      open && '-translate-y-1.5 -rotate-45',
                    )}
                  />
                </span>
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-xl flex-col justify-between bg-ink-3 px-[clamp(1.5rem,6vw,5rem)] pb-10 pt-28"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: ease.curtain }}
            >
              <div>
                <p className="label mb-8 border-b border-line pb-6">Navigation</p>
                <ul className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 80, opacity: 0 }}
                      transition={{ duration: 0.8, ease: ease.expo, delay: 0.1 + i * 0.06 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          go(link.href)
                        }}
                        className="group flex items-center gap-4 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.1] tracking-tight"
                      >
                        <span className="size-3 scale-0 rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-100" />
                        <span className="-ml-7 transition-[margin] duration-500 ease-[var(--ease-expo)] group-hover:ml-0">
                          {link.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label mb-4">Socials</p>
                <div className="flex flex-wrap gap-6">
                  {socials.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="text-sm hover:text-accent">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
