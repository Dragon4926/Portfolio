'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Technical Skills
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Technologies I work with and love
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                category: 'Frontend', 
                skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
                icon: '🎨',
                color: 'from-blue-500 to-purple-600'
              },
              { 
                category: 'Backend', 
                skills: ['Node.js', 'Express', 'Python', 'Django'],
                icon: '⚙️',
                color: 'from-green-500 to-blue-500'
              },
              { 
                category: 'Database', 
                skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
                icon: '🗄️',
                color: 'from-orange-500 to-red-500'
              },
              { 
                category: 'Tools', 
                skills: ['Git', 'Docker', 'AWS', 'Vercel'],
                icon: '🛠️',
                color: 'from-purple-500 to-pink-500'
              },
            ].map((category, idx) => (
              <motion.div 
                key={idx} 
                className="glass rounded-lg p-6 hover:scale-105 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} text-2xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.li 
                      key={skillIdx} 
                      className="text-muted-foreground text-center py-1 px-3 rounded-full bg-secondary/50 hover:bg-primary/20 transition-colors cursor-default"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 + skillIdx * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I&apos;m always open to discussing new opportunities and interesting projects.
            </motion.p>
          </div>
          
          {/* Contact Methods */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Email',
                value: 'deadeye.040104+portfolio@gmail.com',
                icon: '📧',
                href: 'mailto:deadeye.040104+portfolio@gmail.com',
                description: 'Send me an email'
              },
              {
                title: 'LinkedIn',
                value: 'linkedin.com/in/dragon4926',
                icon: '💼',
                href: 'https://www.linkedin.com/in/dragon4926/',
                description: 'Connect professionally'
              },
              {
                title: 'GitHub',
                value: 'github.com/Dragon4926',
                icon: '🐱',
                href: 'https://github.com/Dragon4926',
                description: 'Check out my code'
              }
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-6 text-center hover:scale-105 transition-all duration-300 group block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {contact.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {contact.description}
                </p>
                <p className="text-xs font-mono text-primary break-all">
                  {contact.value}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="mailto:deadeye.040104+portfolio@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a 
              href="/resume.pdf"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Fun Message */}
          <motion.div 
            className="text-center mt-12 p-6 glass rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground italic">
              💡 &quot;Let&apos;s build something amazing together!&quot;
            </p>
          </motion.div>
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