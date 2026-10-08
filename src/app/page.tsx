import Hero from '@/components/paper/Hero'
import Abstract from '@/components/paper/Abstract'
import Experiments from '@/components/paper/Experiments'
import Method from '@/components/paper/Method'
import Toolkit from '@/components/paper/Toolkit'
import Notebook from '@/components/paper/Notebook'
import Correspondence from '@/components/paper/Correspondence'
import { getProjects } from '@/lib/github'

export const revalidate = 86400 // 24h

export default async function Home() {
  const projects = await getProjects()

  return (
    <>
      <main>
        <Hero />
        <Abstract repoCount={projects.length} />
        <Experiments projects={projects} />
        <Method />
        <Toolkit />
        <Notebook projects={projects} />
      </main>
      <Correspondence />
    </>
  )
}
