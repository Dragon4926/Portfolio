'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { Project } from '@/lib/github'
import { SplitReveal, FadeUp } from '@/components/ui/Reveal'
import Magnetic from '@/components/ui/Magnetic'
import { cn, ease } from '@/lib/utils'

const GITHUB = 'https://github.com/Dragon4926'

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function prettyName(name: string) {
  return name.replace(/[-_]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
}

function Artwork({ project }: { project: Project }) {
  const h = hash(project.name)
  const color = project.languageColor ?? '#ff5b22'
  const a = { x: 20 + (h % 60), y: 15 + ((h >> 3) % 50) }
  const b = { x: 30 + ((h >> 5) % 60), y: 50 + ((h >> 7) % 40) }
  const rings = 5 + (h % 4)

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-2">
      <motion.div
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 1.2, ease: ease.expo }}
        style={{
          background: `radial-gradient(circle at ${a.x}% ${a.y}%, ${color}cc, transparent 45%), radial-gradient(circle at ${b.x}% ${b.y}%, #ff5b2299, transparent 50%), radial-gradient(circle at 50% 120%, #ffffff14, transparent 60%)`,
        }}
      />
      <svg className="absolute inset-0 size-full opacity-30 mix-blend-overlay" aria-hidden>
        {Array.from({ length: rings }).map((_, i) => (
          <circle
            key={i}
            cx={`${a.x}%`}
            cy={`${a.y}%`}
            r={`${(i + 1) * 12}%`}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>
      <motion.span
        aria-hidden
        className="absolute -bottom-[0.18em] right-[0.04em] font-serif text-[clamp(10rem,24vw,26rem)] italic leading-none text-paper/90 mix-blend-overlay"
        variants={{ rest: { y: 0 }, hover: { y: '-6%' } }}
        transition={{ duration: 1.2, ease: ease.expo }}
      >
        {project.name.charAt(0).toUpperCase()}
      </motion.span>
    </div>
  )
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <motion.a
      href={project.homepage || project.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="View"
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative flex h-[min(78svh,760px)] w-full shrink-0 flex-col overflow-hidden rounded-[clamp(1rem,1.6vw,1.75rem)] border border-line bg-ink-2 md:w-[min(62vw,1040px)]"
    >
      <div className="relative min-h-0 flex-1">
        <Artwork project={project} />
        <div className="relative flex items-start justify-between p-[clamp(1.25rem,2.4vw,2.25rem)]">
          <span className="font-mono text-xs text-paper/80">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-4 font-mono text-xs text-paper/80">
            {project.language && (
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: project.languageColor ?? '#ff5b22' }} />
                {project.language}
              </span>
            )}
            <span>★ {project.stars}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-[clamp(1.25rem,2.4vw,2.25rem)] md:grid-cols-[1.2fr_1fr] md:items-end">
        <h3 className="text-[clamp(2rem,4.2vw,4.25rem)] font-medium capitalize leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]">
          {prettyName(project.name)}
        </h3>
        <div className="flex flex-col gap-4">
          <p className="line-clamp-3 text-[15px] leading-relaxed text-paper/65">
            {project.description || 'Source, notes and experiments — open on GitHub.'}
          </p>
          <div className="flex items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2">
              {project.topics.slice(0, 3).map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-paper/70">
                  {t}
                </li>
              ))}
            </ul>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
                transition={{ duration: 0.6, ease: ease.expo }}
              >
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.4" />
              </motion.svg>
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

function OutroCard() {
  return (
    <div className="flex h-[min(78svh,760px)] w-full shrink-0 flex-col items-center justify-center gap-8 text-center md:w-[min(42vw,640px)]">
      <p className="label">There&apos;s more where that came from</p>
      <Magnetic>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="flex size-[clamp(10rem,16vw,15rem)] items-center justify-center rounded-full bg-accent text-lg font-medium text-ink transition-transform duration-500 hover:scale-105"
        >
          All on GitHub ↗
        </a>
      </Magnetic>
    </div>
  )
}

function EmptyCard() {
  return (
    <div className="flex h-[min(60svh,560px)] w-full shrink-0 flex-col justify-between rounded-[1.5rem] border border-line bg-ink-2 p-10 md:w-[min(62vw,1040px)]">
      <span className="label">Selected work</span>
      <p className="max-w-[22ch] text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
        Most of my work lives on GitHub — or under <span className="font-serif italic text-accent">NDA.</span>
      </p>
    </div>
  )
}

export default function Work({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [desktop, setDesktop] = useState(false)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!desktop || !trackRef.current) return
    const track = trackRef.current
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop, projects.length])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.3 })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative"
      style={desktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn(desktop && 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden')}>
        <motion.div
          ref={trackRef}
          style={desktop ? { x: smoothX } : undefined}
          className={cn(
            'gutter flex gap-[clamp(1rem,2vw,2rem)]',
            desktop ? 'w-max flex-row items-center' : 'flex-col py-24',
          )}
        >
          <div className="flex w-full shrink-0 flex-col justify-between gap-10 md:h-[min(78svh,760px)] md:w-[min(34vw,560px)] md:pr-8">
            <p className="label">(02) — Selected work</p>
            <div>
              <h2 className="text-[clamp(3.5rem,8vw,9rem)] font-medium leading-[0.88] tracking-[-0.05em]">
                <SplitReveal text="Selected" className="block" />
                <SplitReveal text="work" className="block font-serif font-normal italic text-accent" delay={0.1} />
              </h2>
              <FadeUp delay={0.2}>
                <p className="mt-8 max-w-[34ch] text-[15px] leading-relaxed text-paper/65">
                  A handful of things I&apos;ve built in the open — pulled live from GitHub. Scroll to explore.
                </p>
              </FadeUp>
            </div>
            <span className="font-mono text-xs text-mute">
              ({String(projects.length).padStart(2, '0')}) projects
            </span>
          </div>

          {projects.length === 0 ? (
            <EmptyCard />
          ) : (
            projects.map((p, i) =>
              desktop ? (
                <ProjectCard key={p.url} project={p} index={i} total={projects.length} />
              ) : (
                <FadeUp key={p.url}>
                  <ProjectCard project={p} index={i} total={projects.length} />
                </FadeUp>
              ),
            )
          )}

          <OutroCard />
        </motion.div>

        {desktop && (
          <div className="gutter absolute inset-x-0 bottom-8">
            <div className="h-px w-full bg-line">
              <motion.div className="h-px origin-left bg-paper" style={{ scaleX: progress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
