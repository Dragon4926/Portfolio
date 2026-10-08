'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '@/components/paper/Section'
import type { Project } from '@/lib/github'
import { pipeline, site, socials, stages, toolkit } from '@/lib/data'
import { ease } from '@/lib/utils'

interface Cell {
  n: number
  input: string
  output: ReactNode
}

const COMPLETIONS = [
  'help()',
  'me.summary()',
  'me.skills',
  'me.projects.head()',
  'me.pipeline',
  'me.contact()',
  'me.socials',
  'import this',
  'clear()',
]

function DataFrame({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-ink">
            <th className="px-3 py-1.5 text-left font-normal text-ink-3" />
            {columns.map((c) => (
              <th key={c} className="px-3 py-1.5 text-right font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-paper-2/70">
              <th className="px-3 py-1 text-left font-semibold">{i}</th>
              {r.map((v, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-1 text-right">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1 font-mono text-[11px] text-ink-3">
        {rows.length} rows × {columns.length} columns
      </p>
    </div>
  )
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="link text-blue">
    {children}
  </a>
)

function evaluate(raw: string, projects: Project[]): ReactNode | 'clear' {
  const src = raw.trim().replace(/\s+/g, ' ')
  const cmd = src.replace(/;$/, '')

  switch (cmd) {
    case 'help()':
    case 'help':
    case '?':
      return (
        <pre className="whitespace-pre-wrap">
          {'Available:\n'}
          {COMPLETIONS.filter((c) => c !== 'help()').map((c) => `  ${c}\n`)}
          {'  …and plain arithmetic, e.g. 2**10 / 4'}
        </pre>
      )
    case 'me.summary()':
    case 'me':
      return (
        <DataFrame
          columns={['field', 'value']}
          rows={[
            ['name', site.name],
            ['role', site.role],
            ['experience_yrs', '4+'],
            ['education', 'M.S. CS (in progress)'],
            ['focus', 'applied ML, modelling, data products'],
            ['status', 'open to opportunities'],
          ]}
        />
      )
    case 'me.skills':
    case 'me.toolkit':
      return (
        <DataFrame
          columns={['stage', 'primary_tools']}
          rows={stages.map((s, i) => [s.toLowerCase(), toolkit.filter((t) => t.use[i] === 2).map((t) => t.tool).join(', ')])}
        />
      )
    case 'me.projects.head()':
    case 'me.projects':
      if (!projects.length) return <span className="text-ink-2">Empty DataFrame — see {socials[0].handle}</span>
      return (
        <DataFrame
          columns={['name', 'language', 'stars']}
          rows={projects.slice(0, 5).map((p) => [
            <A key={p.url} href={p.url}>
              {p.name}
            </A>,
            p.language ?? 'NaN',
            p.stars,
          ])}
        />
      )
    case 'me.pipeline':
      return <span>[{pipeline.map((p) => `'${p.label.toLowerCase()}'`).join(', ')}]</span>
    case 'me.contact()':
      return (
        <span>
          {"'"}
          <A href={`mailto:${site.email}`}>{site.email}</A>
          {"'"}
        </span>
      )
    case 'me.socials':
      return (
        <span>
          {'{'}
          {socials.map((s, i) => (
            <span key={s.href}>
              &apos;{s.label.toLowerCase()}&apos;: &apos;<A href={s.href}>{s.handle}</A>&apos;{i < socials.length - 1 && ', '}
            </span>
          ))}
          {'}'}
        </span>
      )
    case 'import this':
      return (
        <pre className="whitespace-pre-wrap italic">
          {`The Zen of Data, by ${site.name}\n\nPlot it before you model it.\nA baseline beats a guess.\nSimple features beat clever ones.\nLeakage is worse than low accuracy.\nIf you can't explain the error, you don't understand the model.`}
        </pre>
      )
    case 'clear()':
    case '%clear':
      return 'clear'
    case '':
      return null
  }

  if (/^[\d\s+\-*/().%]+$/.test(cmd)) {
    try {
      const value = Function(`"use strict"; return (${cmd})`)() as number
      if (typeof value === 'number' && Number.isFinite(value)) return <span>{Number.isInteger(value) ? value : +value.toFixed(10)}</span>
      if (typeof value === 'number') return <span className="text-red">ZeroDivisionError: division by zero</span>
    } catch {
      return <span className="text-red">SyntaxError: invalid syntax</span>
    }
  }

  const name = cmd.match(/^[A-Za-z_][\w.]*/)?.[0] ?? cmd
  return (
    <pre className="whitespace-pre-wrap text-red">
      {`---------------------------------------------------------------------------\nNameError                                 Traceback (most recent call last)\n----> 1 ${cmd}\n\nNameError: name '${name}' is not defined. Try help()`}
    </pre>
  )
}

export default function Notebook({ projects }: { projects: Project[] }) {
  const [cells, setCells] = useState<Cell[]>([
    { n: 1, input: 'from portfolio import Debopriyo\nme = Debopriyo()\nme.summary()', output: evaluate('me.summary()', projects) },
  ])
  const [count, setCount] = useState(2)
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el && cells.length > 1) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [cells, running])

  const run = () => {
    if (running) return
    const src = input
    if (src.trim()) setHistory((h) => [...h, src.trim()])
    setCursor(-1)
    setInput('')
    const result = evaluate(src, projects)
    if (result === 'clear') {
      setCells([])
      return
    }
    setRunning(true)
    window.setTimeout(() => {
      setCells((c) => [...c, { n: count, input: src, output: result }])
      setCount((n) => n + 1)
      setRunning(false)
      inputRef.current?.focus()
    }, 280)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      run()
    } else if (e.key === 'Tab') {
      const m = COMPLETIONS.find((c) => input && c.startsWith(input.trim()))
      if (m) {
        e.preventDefault()
        setInput(m)
      }
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown' && cursor !== -1) {
      e.preventDefault()
      const next = cursor + 1
      setCursor(next >= history.length ? -1 : next)
      setInput(next >= history.length ? '' : history[next])
    }
  }

  return (
    <Section
      id="notebook"
      n={5}
      title="Notebook"
      aside={<>A live cell. Type an expression and press Enter — try <code className="font-mono text-sm text-blue">me.skills</code> or <code className="font-mono text-sm text-blue">help()</code>.</>}
    >
      <div className="md:ml-[16.66%]">
        <div className="border border-ink bg-paper">
          <div className="flex items-center justify-between border-b border-ink px-4 py-2 font-mono text-[11px]">
            <span>portfolio.ipynb</span>
            <span className="flex items-center gap-2 text-ink-2">
              Python 3
              <motion.span
                className="inline-block size-2.5 rounded-full border border-ink"
                animate={{ backgroundColor: running ? '#141413' : 'rgba(0,0,0,0)' }}
                transition={{ duration: 0.15 }}
              />
            </span>
          </div>

          <div
            ref={scrollRef}
            data-lenis-prevent
            className="max-h-[min(62svh,560px)] overflow-y-auto overscroll-contain py-3"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence initial={false}>
              {cells.map((cell) => (
                <motion.div
                  key={cell.n}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: ease.expo }}
                  className="mb-3 px-3"
                >
                  <div className="grid grid-cols-[4.5rem_1fr] items-start font-mono text-[13px]">
                    <span className="pt-2 text-right text-blue">In [{cell.n}]:</span>
                    <pre className="ml-2 overflow-x-auto whitespace-pre-wrap border border-rule bg-paper-2/70 px-3 py-2">
                      {cell.input}
                    </pre>
                  </div>
                  {cell.output !== null && (
                    <div className="mt-1 grid grid-cols-[4.5rem_1fr] items-start font-mono text-[13px]">
                      <span className="pt-1 text-right text-red">Out[{cell.n}]:</span>
                      <div className="ml-2 min-w-0 px-3 py-1">{cell.output}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <label className="grid grid-cols-[4.5rem_1fr] items-center px-3 font-mono text-[13px]">
              <span className="text-right text-blue">In [{running ? '*' : count}]:</span>
              <span className="sr-only">Notebook cell input</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="me.projects.head()"
                className="ml-2 border border-blue/60 bg-paper px-3 py-2 caret-blue outline-none placeholder:text-ink-3/60 focus:border-blue focus:shadow-[0_0_0_3px_rgb(31_58_214/0.12)]"
              />
            </label>
          </div>
        </div>
        <p className="mt-3 font-mono text-[11px] text-ink-3">Enter to run · Tab to complete · ↑/↓ for history</p>
      </div>
    </Section>
  )
}
