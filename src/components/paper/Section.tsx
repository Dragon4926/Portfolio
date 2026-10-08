import type { ReactNode } from 'react'
import { Rule, SplitReveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  n: number
  title: string
  aside?: ReactNode
  children: ReactNode
  className?: string
}

/** A numbered paper section: §n in the margin, title, then a 12-column body. */
export default function Section({ id, n, title, aside, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('wrap scroll-mt-16 py-[clamp(4.5rem,9vw,8rem)]', className)}>
      <Rule />
      <header className="grid gap-y-3 pt-4 md:grid-cols-12 md:gap-x-6">
        <span className="meta md:col-span-2 !text-blue">§{n}</span>
        <h2 className="text-[clamp(2.4rem,5.2vw,4.75rem)] font-light leading-[0.95] tracking-[-0.025em] md:col-span-7">
          <SplitReveal text={title} />
        </h2>
        {aside && <div className="text-[15px] leading-snug text-ink-2 md:col-span-3 md:pt-2">{aside}</div>}
      </header>
      <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">{children}</div>
    </section>
  )
}
