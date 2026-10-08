'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/github'
import { SplitReveal, FadeUp } from '@/components/ui/Reveal'
import { services, site, socials } from '@/lib/data'

interface Entry {
  id: number
  command: string | null
  output: ReactNode
}

const COMMANDS = ['help', 'whoami', 'skills', 'projects', 'social', 'contact', 'history', 'date', 'sudo', 'clear'] as const

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith('mailto:') ? undefined : '_blank'}
    rel="noreferrer"
    className="text-sky-300 underline decoration-sky-300/30 underline-offset-4 hover:decoration-sky-300"
  >
    {children}
  </a>
)

const Cmd = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>

const banner = (
  <div className="space-y-1">
    <p className="text-paper">
      {site.name} <span className="text-mute">— {site.role}</span>
    </p>
    <p className="text-mute">
      Type <Cmd>help</Cmd> to see available commands. <span className="hidden sm:inline">Tab completes, ↑/↓ walks history.</span>
    </p>
  </div>
)

export default function Playground({ projects }: { projects: Project[] }) {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, command: null, output: banner }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries])

  const run = (raw: string): ReactNode | 'clear' => {
    const [cmd] = raw.trim().toLowerCase().split(/\s+/)
    switch (cmd) {
      case 'help':
        return (
          <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1">
            {[
              ['whoami', 'Who is this person?'],
              ['skills', 'Tools of the trade'],
              ['projects', 'Selected open-source work'],
              ['social', 'Where to find me'],
              ['contact', 'Say hello'],
              ['history', 'Commands you have run'],
              ['date', 'Current date & time'],
              ['clear', 'Wipe the screen'],
            ].map(([c, d]) => (
              <div key={c} className="contents">
                <Cmd>{c}</Cmd>
                <span className="text-mute">{d}</span>
              </div>
            ))}
          </div>
        )
      case 'whoami':
        return (
          <div className="space-y-2">
            <p className="text-paper">Hey, I&apos;m {site.name}! 👋</p>
            <p className="text-mute">{site.intro} Skilled in AI and full-stack development.</p>
          </div>
        )
      case 'skills':
        return (
          <div className="space-y-1">
            {services.map((s) => (
              <p key={s.title}>
                <span className="inline-block w-48 text-paper">{s.title}</span>
                <span className="text-mute">{s.stack.join(', ')}</span>
              </p>
            ))}
          </div>
        )
      case 'projects':
        if (!projects.length)
          return (
            <p className="text-mute">
              Most projects are on GitHub, or confidential → <Link href={socials[0].href}>github/Dragon4926</Link>
            </p>
          )
        return (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.url}>
                <p>
                  <Cmd>📌 {p.name}</Cmd> <span className="text-mute">★ {p.stars}</span>
                </p>
                <p className="text-mute">{p.description || 'No description'}</p>
                <Link href={p.url}>View on GitHub ↗</Link>
              </div>
            ))}
          </div>
        )
      case 'social':
        return (
          <div className="space-y-1">
            {socials.map((s) => (
              <p key={s.href}>
                <span className="inline-block w-28 text-paper">{s.label}</span>
                <Link href={s.href}>{s.href.replace(/^https?:\/\/(www\.)?/, '')}</Link>
              </p>
            ))}
          </div>
        )
      case 'contact':
      case 'email':
        return (
          <p className="text-mute">
            Drop a line at <Link href={`mailto:${site.email}`}>{site.email}</Link>
          </p>
        )
      case 'history':
        return history.length ? (
          <div>
            {history.map((h, i) => (
              <p key={i} className="text-mute">
                {String(i + 1).padStart(3, ' ')} {h}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-mute">No history yet.</p>
        )
      case 'date':
        return <p className="text-mute">{new Date().toString()}</p>
      case 'sudo':
        return <p className="text-red-400">Nice try. This incident will be reported. 🔒</p>
      case 'clear':
        return 'clear'
      case 'banner':
        return banner
      case undefined:
      case '':
        return null
      default:
        return (
          <p className="text-red-400">
            command not found: {cmd}. Try <Cmd>help</Cmd>.
          </p>
        )
    }
  }

  const submit = () => {
    const value = input
    setInput('')
    setCursor(-1)
    if (value.trim()) setHistory((h) => [...h, value.trim()])
    const result = run(value)
    if (result === 'clear') {
      setEntries([])
      return
    }
    setEntries((e) => [...e, { id: nextId.current++, command: value, output: result }])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === -1) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'Tab') {
      const match = COMMANDS.find((c) => input && c.startsWith(input.trim().toLowerCase()))
      if (match) {
        e.preventDefault()
        setInput(match)
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    }
  }

  return (
    <section id="playground" className="gutter relative py-[clamp(6rem,14vw,12rem)]">
      <div className="mb-[clamp(3rem,6vw,5rem)] grid gap-8 md:grid-cols-12 md:items-end">
        <p className="label md:col-span-3">(05) — Playground</p>
        <div className="md:col-span-9">
          <h2 className="text-[clamp(2.75rem,6.5vw,7rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <SplitReveal text="Prefer the" className="block" />
            <SplitReveal text="command line?" className="block font-serif font-normal italic text-accent" delay={0.15} />
          </h2>
        </div>
      </div>

      <FadeUp className="md:ml-[25%]">
        <motion.div
          className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgb(255_91_34/0.35)]"
          onClick={() => inputRef.current?.focus()}
          data-cursor=""
        >
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-mute">guest@{site.handle.toLowerCase()} — zsh</span>
          </div>

          <div
            ref={scrollRef}
            data-lenis-prevent
            className="h-[min(56svh,460px)] overflow-y-auto overscroll-contain p-5 font-mono text-[13px] leading-relaxed md:p-7"
            aria-live="polite"
          >
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                className="mb-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {entry.command !== null && (
                  <p className="mb-1">
                    <span className="text-emerald-400">➜</span> <span className="text-sky-300">~</span>{' '}
                    <span className="text-paper">{entry.command}</span>
                  </p>
                )}
                {entry.output}
              </motion.div>
            ))}

            <label className="flex items-center gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-300">~</span>
              <span className="sr-only">Terminal command</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="type a command…"
                className="flex-1 bg-transparent text-paper caret-accent outline-none placeholder:text-paper/25"
              />
            </label>
          </div>
        </motion.div>
      </FadeUp>
    </section>
  )
}
