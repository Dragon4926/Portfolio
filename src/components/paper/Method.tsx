'use client'

import { motion } from 'framer-motion'
import Section from '@/components/paper/Section'
import { pipeline } from '@/lib/data'
import { ease } from '@/lib/utils'

const N = pipeline.length

/** Dashed connector whose dashes travel in the direction of data flow. */
function Flow({ vertical = false, delay = 0 }: { vertical?: boolean; delay?: number }) {
  return (
    <motion.svg
      aria-hidden
      className={vertical ? 'h-8 w-3' : 'h-3 w-full'}
      viewBox={vertical ? '0 0 12 32' : '0 0 100 12'}
      preserveAspectRatio="none"
      initial={{ opacity: 0, [vertical ? 'scaleY' : 'scaleX']: 0 }}
      whileInView={{ opacity: 1, [vertical ? 'scaleY' : 'scaleX']: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: ease.expo, delay }}
      style={{ originX: 0, originY: 0 }}
    >
      <motion.line
        x1={vertical ? 6 : 0}
        y1={vertical ? 0 : 6}
        x2={vertical ? 6 : 92}
        y2={vertical ? 26 : 6}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      {vertical ? <path d="M2 25 L6 32 L10 25" fill="currentColor" /> : <path d="M91 2 L100 6 L91 10Z" fill="currentColor" />}
    </motion.svg>
  )
}

export default function Method() {
  return (
    <Section
      id="method"
      n={3}
      title="Method"
      aside={<>The same loop underpins every project, whether it ends in a paper, a dashboard or a production API.</>}
    >
      {/* Desktop: horizontal DAG with a feedback edge */}
      <div className="relative hidden pt-24 lg:block">
        <svg aria-hidden className="absolute inset-x-0 top-0 h-24 w-full overflow-visible" viewBox={`0 0 ${N * 100} 96`} preserveAspectRatio="none">
          <motion.path
            d={`M${(N - 1) * 100 + 32} 96 C ${(N - 1) * 100 + 32} 4, 132 4, 132 96`}
            fill="none"
            stroke="var(--color-red)"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: ease.expo, delay: 1 }}
          />
        </svg>
        <motion.span
          className="absolute left-1/2 top-5 -translate-x-1/2 bg-paper px-2 font-mono text-[11px] italic text-red"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          ↺ retrain on drift
        </motion.span>
        <span aria-hidden className="absolute top-[5.4rem] text-red" style={{ left: `calc(${(1.32 / N) * 100}% - 5px)` }}>
          ▾
        </span>

        <ol className="grid" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
          {pipeline.map((step, i) => (
            <motion.li
              key={step.id}
              className="group relative pr-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: ease.expo, delay: i * 0.1 }}
            >
              <div className="flex items-center">
                <div className="relative z-10 shrink-0 border border-ink bg-paper px-3 py-2 transition-colors duration-300 group-hover:bg-blue group-hover:text-paper">
                  <span className="mr-2 font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg">{step.label}</span>
                </div>
                {i < N - 1 && (
                  <div className="-mr-5 flex-1 text-ink">
                    <Flow delay={0.3 + i * 0.1} />
                  </div>
                )}
              </div>
              <p className="mt-4 pr-2 text-sm leading-snug text-ink-2 transition-colors group-hover:text-ink">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical flow */}
      <ol className="lg:hidden">
        {pipeline.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: ease.expo }}
          >
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              <div className="border border-ink bg-paper px-3 py-1.5">
                <span className="mr-2 font-mono text-[10px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span>{step.label}</span>
              </div>
              <p className="pt-1 text-sm leading-snug text-ink-2">{step.body}</p>
            </div>
            {i < N - 1 && (
              <div className="ml-6 py-1 text-ink">
                <Flow vertical />
              </div>
            )}
          </motion.li>
        ))}
        <li className="mt-4 font-mono text-xs italic text-red">↺ Monitor feeds back into Data when the world drifts.</li>
      </ol>

      <p className="mt-10 text-[15px] text-ink-2">
        <span className="meta mr-2 !text-ink">Fig. 2</span>
        Working method as a directed graph. Dashes indicate the direction of data flow; the red edge is the retraining loop.
      </p>
    </Section>
  )
}
