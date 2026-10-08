'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Section from '@/components/paper/Section'
import { site, socials } from '@/lib/data'
import { ease } from '@/lib/utils'

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
          window.setTimeout(() => setDone(false), 1600)
        } catch {}
      }}
      className="relative inline-flex h-7 min-w-20 items-center justify-center overflow-hidden border border-ink px-2.5 font-mono text-[11px] transition-colors hover:bg-ink hover:text-paper"
      aria-label={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? 'done' : 'copy'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {done ? 'copied ✓' : 'copy'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Correspondence() {
  const lenis = useLenis()
  const year = new Date().getFullYear()
  const bibtex = `@misc{${site.handle.toLowerCase()}${year},
  author = {${site.name}},
  title  = {Collected Work in Data Science},
  year   = {${year}},
  url    = {${site.url}}
}`

  return (
    <>
      <Section id="correspondence" n={6} title="Correspondence">
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-3">
            <p className="text-[clamp(1.2rem,1.8vw,1.5rem)] italic text-ink-2">
              Questions, collaborations and offers should be addressed to
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <motion.a
                href={`mailto:${site.email}`}
                className="group relative text-[clamp(1.6rem,4.2vw,3.6rem)] font-light leading-none tracking-[-0.02em] [overflow-wrap:anywhere]"
                whileHover="hover"
              >
                {site.email.replace('+portfolio', '')}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-blue"
                  initial={{ scaleX: 0.15 }}
                  variants={{ hover: { scaleX: 1 } }}
                  transition={{ duration: 0.6, ease: ease.expo }}
                />
              </motion.a>
              <CopyButton text={site.email} label="Copy email address" />
            </div>

            <div className="mt-16">
              <div className="mb-2 flex items-center justify-between">
                <span className="meta !text-ink">Cite this work</span>
                <CopyButton text={bibtex} label="Copy BibTeX citation" />
              </div>
              <pre className="overflow-x-auto border border-rule bg-paper-2/70 p-4 font-mono text-[12px] leading-relaxed text-ink-2">
                {bibtex}
              </pre>
            </div>
          </div>

          <aside className="md:col-span-3">
            <p className="meta mb-4 !text-ink">References</p>
            <ol className="space-y-3 text-[15px]">
              {socials.map((s, i) => (
                <li key={s.href} className="grid grid-cols-[2rem_1fr]">
                  <span className="font-mono text-xs leading-6 text-blue">[{i + 1}]</span>
                  <span>
                    {s.label}.{' '}
                    <a href={s.href} target="_blank" rel="noreferrer" className="link break-all text-ink-2">
                      {s.handle}
                    </a>
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[2rem_1fr]">
                <span className="font-mono text-xs leading-6 text-blue">[{socials.length + 1}]</span>
                <span>
                  Email.{' '}
                  <a href={`mailto:${site.email}`} className="link break-all text-ink-2">
                    {site.email}
                  </a>
                </span>
              </li>
            </ol>
          </aside>
        </div>
      </Section>

      <footer className="wrap pb-10">
        <div className="flex flex-col gap-3 border-t-2 border-ink pt-4 font-mono text-[11px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. Set in Newsreader &amp; IBM Plex Mono.
          </span>
          <button
            type="button"
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="link self-start sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </>
  )
}
