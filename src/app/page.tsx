import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Playground from '@/components/sections/Playground'
import Contact from '@/components/sections/Contact'
import VelocityMarquee from '@/components/ui/VelocityMarquee'
import { getProjects } from '@/lib/github'
import { marqueeWords } from '@/lib/data'

export const revalidate = 3600

export default async function Home() {
  const projects = await getProjects()

  return (
    <>
      <main>
        <Hero />

        <div className="border-y border-line py-6 md:py-8" aria-hidden>
          <VelocityMarquee baseVelocity={2.5}>
            {marqueeWords.map((w, i) => (
              <span key={w} className="flex items-center text-[clamp(2.5rem,6vw,6rem)] font-medium tracking-[-0.04em]">
                <span className={i % 2 ? 'font-serif font-normal italic text-paper/40' : ''}>{w}</span>
                <span className="mx-[0.5em] text-[0.5em] text-accent">✦</span>
              </span>
            ))}
          </VelocityMarquee>
        </div>

        <About projectCount={projects.length} />
        <Work projects={projects} />
        <Services />
        <Process />
        <Playground projects={projects} />
      </main>
      <Contact />
    </>
  )
}
