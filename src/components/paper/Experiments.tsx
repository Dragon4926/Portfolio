'use client'

import { useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Section from '@/components/paper/Section'
import type { Project } from '@/lib/github'
import { socials } from '@/lib/data'
import { cn, ease } from '@/lib/utils'

type Key = 'id' | 'name' | 'language' | 'stars'

const prettyName = (name: string) => name.replace(/[-_]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')

const cols = 'grid-cols-[3.25rem_1fr_4.5rem] md:grid-cols-[4.5rem_minmax(0,1fr)_9rem_minmax(0,14rem)_8rem_2rem]'

function SortButton({
  k,
  label,
  sort,
  onSort,
  className,
}: {
  k: Key
  label: string
  sort: { key: Key; dir: 1 | -1 }
  onSort: (k: Key) => void
  className?: string
}) {
  const active = sort.key === k
  return (
    <div
      role="columnheader"
      aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
      className={className}
    >
      <button
        type="button"
        onClick={() => onSort(k)}
        className={cn('meta inline-flex items-center gap-1 hover:!text-blue', active && '!text-ink')}
      >
        {label}
        <motion.span
          aria-hidden
          animate={{ rotate: active && sort.dir === -1 ? 180 : 0, opacity: active ? 1 : 0.35 }}
          transition={{ duration: 0.4, ease: ease.expo }}
          className="inline-block"
        >
          ↑
        </motion.span>
      </button>
    </div>
  )
}

export default function Experiments({ projects }: { projects: Project[] }) {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: 'id', dir: 1 })
  const maxStars = Math.max(1, ...projects.map((p) => p.stars))

  const rows = useMemo(() => {
    const indexed = projects.map((p, i) => ({ ...p, id: i + 1 }))
    const val = (r: (typeof indexed)[number]) =>
      sort.key === 'id' ? r.id : sort.key === 'stars' ? r.stars : (sort.key === 'name' ? r.name : (r.language ?? '~')).toLowerCase()
    return indexed.sort((a, b) => {
      const va = val(a)
      const vb = val(b)
      return (va < vb ? -1 : va > vb ? 1 : 0) * sort.dir
    })
  }, [projects, sort])

  const onSort = (key: Key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === 'stars' ? -1 : 1 }))

  return (
    <Section
      id="experiments"
      n={2}
      title="Experiments"
      aside={<>Selected work, pulled live from GitHub. Each row is a repository — open it for code, data and notes.</>}
    >
      <p className="mb-4 text-[15px] text-ink-2">
        <span className="meta mr-2 !text-ink">Table 1</span>
        Selected experiments. <span className="italic">Click a column header to sort.</span>
      </p>

      {projects.length === 0 ? (
        <div className="border-y-2 border-ink py-10 text-center text-ink-2">
          <p className="text-xl italic">Results temporarily unavailable.</p>
          <p className="mt-2 text-sm">
            The full record lives at{' '}
            <a className="link" href={socials[0].href} target="_blank" rel="noreferrer">
              {socials[0].handle}
            </a>
            .
          </p>
        </div>
      ) : (
        <div role="table" aria-label="Selected experiments" className="border-y-2 border-ink">
          <div role="rowgroup">
            <div role="row" className={cn('grid items-center gap-x-4 border-b border-ink py-3', cols)}>
              <SortButton k="id" label="ID" sort={sort} onSort={onSort} />
              <SortButton k="name" label="Experiment" sort={sort} onSort={onSort} />
              <SortButton k="language" label="Language" sort={sort} onSort={onSort} className="hidden md:block" />
              <div role="columnheader" className="meta hidden md:block">
                Topics
              </div>
              <SortButton k="stars" label="Stars" sort={sort} onSort={onSort} className="justify-self-end md:justify-self-start" />
              <span className="hidden md:block" />
            </div>
          </div>

          <LayoutGroup>
            <div role="rowgroup">
              {rows.map((p, i) => (
                <motion.div
                  key={p.url}
                  layout
                  role="row"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    layout: { duration: 0.7, ease: ease.expo },
                    default: { duration: 0.7, ease: ease.expo, delay: i * 0.06 },
                  }}
                  className={cn(
                    'group relative grid items-start gap-x-4 border-b border-rule py-5 transition-colors duration-300 last:border-b-0 hover:bg-paper-2',
                    cols,
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-blue transition-transform duration-500 group-hover:scale-y-100"
                  />
                  <span role="cell" className="pl-3 pt-1 font-mono text-xs tabular-nums text-ink-3">
                    E-{String(p.id).padStart(2, '0')}
                  </span>

                  <div role="cell" className="min-w-0">
                    <a
                      href={p.homepage || p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[clamp(1.35rem,2.2vw,1.9rem)] capitalize leading-tight tracking-[-0.01em] transition-colors after:absolute after:inset-0 group-hover:text-blue"
                    >
                      {prettyName(p.name)}
                    </a>
                    <p className="mt-1 line-clamp-2 max-w-[60ch] text-[15px] leading-snug text-ink-2">
                      {p.description || 'Notes and code on GitHub.'}
                    </p>
                    {p.language && <p className="mt-2 font-mono text-[11px] text-ink-3 md:hidden">{p.language}</p>}
                  </div>

                  <span role="cell" className="hidden items-center gap-2 pt-1.5 font-mono text-xs md:flex">
                    <span
                      className="size-2 rounded-full border border-ink/20"
                      style={{ background: p.languageColor ?? 'transparent' }}
                    />
                    {p.language ?? '—'}
                  </span>

                  <span role="cell" className="hidden flex-wrap gap-1.5 pt-1 md:flex">
                    {p.topics.length ? (
                      p.topics.slice(0, 3).map((t) => (
                        <span key={t} className="border border-rule px-1.5 py-0.5 font-mono text-[10px] text-ink-2">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-ink-3">—</span>
                    )}
                  </span>

                  <span role="cell" className="flex flex-col items-end gap-1.5 pt-1.5 md:items-start">
                    <span className="font-mono text-xs tabular-nums">{p.stars}</span>
                    <span className="block h-1.5 w-full max-w-24 bg-paper-3">
                      <motion.span
                        className="block h-full origin-left bg-blue"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: p.stars / maxStars }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: ease.expo, delay: 0.2 + i * 0.06 }}
                      />
                    </span>
                  </span>

                  <span
                    role="cell"
                    aria-hidden
                    className="hidden pt-1 text-right text-lg text-ink-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue md:block"
                  >
                    ↗
                  </span>
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        </div>
      )}

      <p className="mt-4 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-ink-3">
        <span>Source: GitHub API, refreshed hourly.</span>
        <a href={socials[0].href} target="_blank" rel="noreferrer" className="link">
          Full record → {socials[0].handle}
        </a>
      </p>
    </Section>
  )
}
