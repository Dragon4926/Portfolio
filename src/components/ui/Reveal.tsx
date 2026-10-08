'use client'

import { type ElementType } from 'react'
import { motion } from 'framer-motion'
import { cn, ease } from '@/lib/utils'

interface SplitRevealProps {
  text: string
  as?: ElementType
  className?: string
  /** Delay before the first word, in seconds */
  delay?: number
  stagger?: number
  /** Play when `true` instead of on scroll into view */
  play?: boolean
}

/** Words slide up out of a clipping mask, one after another. */
export function SplitReveal({ text, as: Tag = 'span', className, delay = 0, stagger = 0.06, play }: SplitRevealProps) {
  const words = text.split(' ')
  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span className="inline" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {words.map((word, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className="inline-block will-change-transform"
              variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
              transition={{ duration: 0.8, ease: ease.expo }}
            >
              {word}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** A hairline that draws itself from left to right. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={cn('h-px w-full origin-left bg-ink', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: ease.expo, delay }}
    />
  )
}
