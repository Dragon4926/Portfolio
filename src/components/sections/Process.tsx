'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { SplitReveal } from '@/components/ui/Reveal'
import { process } from '@/lib/data'

const tones = ['bg-ink-2', 'bg-ink-3', 'bg-[#232327]', 'bg-accent text-ink']

function Card({
  i,
  total,
  step,
  body,
  progress,
}: {
  i: number
  total: number
  step: string
  body: string
  progress: MotionValue<number>
}) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04])
  const dim = useTransform(progress, [i / total, 1], [0, (total - i - 1) * 0.12])
  const last = i === total - 1

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(${i * 64}px - ${(total - 1) * 32}px)` }}
        className={`relative flex h-[min(64svh,580px)] w-full origin-top flex-col overflow-hidden rounded-[clamp(1.25rem,2vw,2rem)] border border-line ${tones[i % tones.length]}`}
      >
        <header
          className={`flex h-16 shrink-0 items-center justify-between border-b px-[clamp(1.5rem,3.5vw,3.5rem)] ${last ? 'border-ink/15' : 'border-line'}`}
        >
          <span className={`font-mono text-xs ${last ? 'text-ink/70' : 'text-mute'}`}>
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3 className="text-lg font-medium tracking-tight md:text-xl">{step}</h3>
        </header>
        <div className="flex flex-1 flex-col justify-between gap-6 p-[clamp(1.5rem,3.5vw,3.5rem)] md:flex-row md:items-end">
          <span
            className={`font-serif text-[clamp(7rem,20vw,18rem)] italic leading-[0.75] ${last ? 'text-ink' : 'text-paper/15'}`}
          >
            {i + 1}
          </span>
          <p
            className={`max-w-[30ch] text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] ${last ? 'text-ink' : 'text-paper/85'}`}
          >
            {body}
          </p>
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />
      </motion.article>
    </div>
  )
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="process" className="gutter relative pt-[clamp(4rem,10vw,8rem)]">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <p className="label md:col-span-3">(04) — Process</p>
        <h2 className="text-[clamp(2.75rem,6.5vw,7rem)] font-medium leading-[0.92] tracking-[-0.045em] md:col-span-9">
          <SplitReveal text="From first call" className="block" />
          <SplitReveal text="to production" className="block font-serif font-normal italic text-accent" delay={0.15} />
        </h2>
      </div>

      <div ref={ref} className="relative">
        {process.map((p, i) => (
          <Card key={p.step} i={i} total={process.length} step={p.step} body={p.body} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
