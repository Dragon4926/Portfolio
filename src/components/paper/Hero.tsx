'use client'

import { motion } from 'framer-motion'
import FitFigure from '@/components/figures/FitFigure'
import { site } from '@/lib/data'
import { ease } from '@/lib/utils'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: ease.expo, delay },
})

export default function Hero() {
  return (
    <section id="top" className="wrap pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,10vw,8rem)]">
      <motion.div {...fade(0)} className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="meta">Portfolio · Data science · Rev. {new Date().getFullYear()}</span>
        <span className="meta hidden sm:inline">Open to new opportunities</span>
      </motion.div>

      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FitFigure text={site.name} />
      </motion.div>

      <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 md:grid-cols-12 md:gap-x-6">
        <motion.p
          {...fade(0.25)}
          className="text-[clamp(1.9rem,3.9vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em] md:col-span-8"
        >
          <span className="italic">Data scientist</span> — I turn noisy data into models people can trust, and
          decisions they can <span className="text-blue">act on</span>.
        </motion.p>

        <motion.div {...fade(0.4)} className="flex flex-col justify-end gap-6 md:col-span-4">
          <div className="border-l border-ink pl-4 text-[15px] leading-snug">
            <p>
              {site.name}
              <sup className="ml-0.5 font-mono text-[10px] text-blue">1,2</sup>
            </p>
            <p className="mt-2 text-ink-2">
              <sup className="mr-1 font-mono text-[10px] text-blue">1</sup>Self-taught, 4+ years in industry &amp; open source
            </p>
            <p className="text-ink-2">
              <sup className="mr-1 font-mono text-[10px] text-blue">2</sup>M.S. Computer Science, in progress
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
            <a href="#experiments" className="link">
              ↓ Read the experiments
            </a>
            <a href={`mailto:${site.email}`} className="link">
              ✉ Correspondence
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
