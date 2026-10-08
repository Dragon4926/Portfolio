'use client'

import { motion } from 'framer-motion'
import Section from '@/components/paper/Section'
import { site } from '@/lib/data'
import { ease } from '@/lib/utils'

const notes = [
  'Self-taught: learned by building real projects, many of them open source on GitHub.',
  'Formal coursework in computer science alongside ongoing hands-on work.',
]

export default function Abstract({ repoCount }: { repoCount: number }) {
  return (
    <Section id="abstract" n={1} title="Abstract">
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-12">
        <div className="space-y-6 md:col-span-7 md:col-start-3">
          {site.abstract.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.9, ease: ease.expo, delay: i * 0.08 }}
              className={
                i === 0
                  ? 'text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.35] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:text-blue'
                  : 'text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5] text-ink-2'
              }
            >
              {para}
              {i < notes.length && <sup className="ml-0.5 font-mono text-[0.55em] text-blue">{i + 1}</sup>}
            </motion.p>
          ))}

          <p className="pt-2 text-[15px] leading-relaxed">
            <span className="mr-2 font-semibold italic">Keywords —</span>
            <span className="text-ink-2">{site.keywords.join(' · ')}</span>
          </p>
        </div>

        <aside className="space-y-5 border-t border-rule pt-5 md:col-span-3 md:border-l md:border-t-0 md:pl-5 md:pt-1">
          {notes.map((n, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: ease.expo, delay: 0.3 + i * 0.1 }}
              className="text-sm leading-snug text-ink-2"
            >
              <sup className="mr-1 font-mono text-blue">{i + 1}</sup>
              {n}
            </motion.p>
          ))}

          <dl className="grid grid-cols-2 gap-px overflow-hidden border border-rule bg-rule font-mono text-[11px]">
            {[
              ['Experience', '4+ yrs'],
              ['Degree', 'M.S. CS'],
              ['Focus', 'Applied ML'],
              ['Featured repos', repoCount > 0 ? String(repoCount) : '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-3">
                <dt className="text-ink-3">{k}</dt>
                <dd className="mt-1 text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
