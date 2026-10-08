'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/paper/Section'
import { stages, toolkit } from '@/lib/data'
import { cn, ease } from '@/lib/utils'

export default function Toolkit() {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null)

  return (
    <Section
      id="toolkit"
      n={4}
      title="Toolkit"
      aside={<>Not a list of logos — where each tool actually sits in the workflow. Hover a cell to trace its row and column.</>}
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-8 md:col-start-3">
          <div
            role="table"
            aria-label="Tools by pipeline stage"
            className="grid gap-px text-sm"
            style={{ gridTemplateColumns: `minmax(6.5rem, 9rem) repeat(${stages.length}, minmax(0, 1fr))` }}
            onMouseLeave={() => setHover(null)}
          >
            <span />
            {stages.map((s, c) => (
              <span
                key={s}
                role="columnheader"
                className={cn(
                  'meta pb-2 text-center transition-colors',
                  hover?.c === c && '!text-blue',
                )}
              >
                <span className="sm:hidden">{['Col', 'Cln', 'Mod', 'Eval', 'Dep'][c]}</span>
                <span className="hidden sm:inline">{s}</span>
              </span>
            ))}

            {toolkit.map((row, r) => (
              <div key={row.tool} role="row" className="contents">
                <span
                  role="rowheader"
                  className={cn('flex items-center pr-3 transition-colors', hover?.r === r ? 'text-blue' : 'text-ink')}
                >
                  {row.tool}
                </span>
                {row.use.map((v, c) => {
                  const lit = hover && (hover.r === r || hover.c === c)
                  return (
                    <span
                      key={c}
                      role="cell"
                      aria-label={`${row.tool} — ${stages[c]}: ${v === 2 ? 'primary' : v === 1 ? 'occasional' : 'not used'}`}
                      className={cn(
                        'relative h-7 border border-rule transition-colors duration-200',
                        lit ? 'bg-paper-3' : 'bg-paper-2/60',
                      )}
                      onMouseEnter={() => setHover({ r, c })}
                    >
                      {v > 0 && (
                        <motion.span
                          className={cn('absolute inset-[3px] origin-bottom-left', v === 2 ? 'bg-blue' : 'bg-blue/30')}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                          transition={{ duration: 0.6, ease: ease.expo, delay: (r + c) * 0.035 }}
                        />
                      )}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-ink-2">
            <span className="meta !text-ink">Fig. 3</span>
            <span>Tools by pipeline stage.</span>
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="inline-block h-3 w-5 bg-blue" /> primary
            </span>
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="inline-block h-3 w-5 bg-blue/30" /> occasional
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
