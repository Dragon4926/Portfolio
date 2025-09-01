import Hero from '@/components/Hero'
import Terminal from '@/components/Terminal'
import ProjectsSection from '@/components/ProjectsSection'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Terminal Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Interactive Terminal
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore my portfolio through this terminal interface. Type 'help' to get started.
            </p>
          </div>
          
          <Terminal className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Technical Skills
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies I work with
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
              { category: 'Backend', skills: ['Node.js', 'Express', 'Python', 'Django'] },
              { category: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'] },
              { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Vercel'] },
            ].map((category, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">{category.category}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIdx) => (
                    <li key={skillIdx} className="text-muted-foreground">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:deadeye.040104+portfolio@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </a>
            <a 
              href="/resume.pdf"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Dragon4926. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  )
}