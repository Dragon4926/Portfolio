'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Rule } from '@/components/ui/Reveal'
import { services, site } from '@/lib/data'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const c = animate(value, to, { duration: 2, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, to, value])

  return <motion.span ref={ref}>{text}</motion.span>
}

export default function About({ projectCount }: { projectCount: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = site.about.split(' ')

  const technologies = new Set(services.flatMap((s) => s.stack)).size
  const stats = [
    { value: 4, suffix: '+', label: 'Years shipping software' },
    { value: technologies, suffix: '', label: 'Tools & technologies in rotation' },
    ...(projectCount > 0 ? [{ value: projectCount, suffix: '', label: 'Featured open-source projects' }] : []),
  ]

  return (
    <section id="about" className="gutter relative py-[clamp(6rem,16vw,14rem)]">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="label sticky top-28">(01) — About</p>
        </div>

        <div className="md:col-span-9">
          <p
            ref={ref}
            className="text-[clamp(1.75rem,3.6vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.025em]"
            aria-label={site.about}
          >
            <span aria-hidden>
              {words.map((w, i) => {
                const start = i / words.length
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                    {w}
                  </Word>
                )
              })}
            </span>
          </p>

          <div className="mt-[clamp(4rem,9vw,8rem)]">
            <Rule />
            <dl className="grid gap-y-10 pt-10 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="sm:pr-8">
                  <dt className="label mb-3">{s.label}</dt>
                  <dd className="text-[clamp(3.5rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
