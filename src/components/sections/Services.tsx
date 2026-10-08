'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplitReveal, Rule } from '@/components/ui/Reveal'
import { services } from '@/lib/data'
import { cn, ease } from '@/lib/utils'

export default function Services() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section id="services" className="gutter relative py-[clamp(6rem,14vw,12rem)]">
      <div className="mb-[clamp(3rem,7vw,6rem)] grid gap-8 md:grid-cols-12 md:items-end">
        <p className="label md:col-span-3">(03) — Services</p>
        <h2 className="text-[clamp(2.75rem,6.5vw,7rem)] font-medium leading-[0.92] tracking-[-0.045em] md:col-span-9">
          <SplitReveal text="What I can do" className="block" />
          <SplitReveal text="for you" className="block font-serif font-normal italic text-accent" delay={0.15} />
        </h2>
      </div>

      <ul onMouseLeave={() => setActive(null)}>
        {services.map((s, i) => {
          const open = active === i
          return (
            <li key={s.title} className="relative" onMouseEnter={() => setActive(i)}>
              <Rule delay={i * 0.08} />
              <button
                type="button"
                onClick={() => setActive(open ? null : i)}
                aria-expanded={open}
                className="relative grid w-full grid-cols-12 items-baseline gap-4 overflow-hidden py-[clamp(1.5rem,3vw,2.75rem)] text-left"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-bottom bg-ink-2"
                  initial={false}
                  animate={{ scaleY: open ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: ease.expo }}
                />
                <span className="relative col-span-2 font-mono text-xs text-mute md:col-span-3">
                  0{i + 1}
                </span>
                <motion.span
                  className={cn(
                    'relative col-span-10 text-[clamp(1.9rem,4.6vw,4.75rem)] font-medium leading-none tracking-[-0.035em] transition-colors duration-500 md:col-span-8',
                    active !== null && !open && 'text-paper/30',
                  )}
                  animate={{ x: open ? 24 : 0 }}
                  transition={{ duration: 0.7, ease: ease.expo }}
                >
                  {s.title}
                </motion.span>
                <motion.span
                  aria-hidden
                  className="relative col-span-1 hidden justify-self-end text-2xl md:block"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.6, ease: ease.expo }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: ease.expo }}
                    className="overflow-hidden bg-ink-2"
                  >
                    <div className="grid grid-cols-12 gap-4 pb-10">
                      <div className="col-span-12 flex flex-col gap-6 px-0 md:col-span-8 md:col-start-4 md:px-6">
                        <p className="max-w-[52ch] text-[15px] leading-relaxed text-paper/70 md:text-base">{s.body}</p>
                        <ul className="flex flex-wrap gap-2">
                          {s.stack.map((t, j) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, ease: ease.expo, delay: 0.1 + j * 0.035 }}
                              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/80"
                            >
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
        <li aria-hidden>
          <Rule />
        </li>
      </ul>
    </section>
  )
}
