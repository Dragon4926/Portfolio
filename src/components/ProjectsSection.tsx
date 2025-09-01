'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork } from 'lucide-react'
import { GitHubRepo } from '@/types'

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/pinned-repos')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
        // Fallback to mock data
        setProjects([
          {
            name: 'Portfolio',
            description: 'Modern Next.js portfolio with interactive terminal interface',
            url: 'https://github.com/Dragon4926/Portfolio',
            topics: ['nextjs', 'typescript', 'portfolio'],
            stargazerCount: 12,
            forkCount: 3,
            primaryLanguage: { name: 'TypeScript', color: '#3178c6' }
          },
          {
            name: 'AI-Chat-App',
            description: 'Real-time chat application with AI integration',
            url: 'https://github.com/Dragon4926/AI-Chat-App',
            topics: ['react', 'ai', 'websocket'],
            stargazerCount: 25,
            forkCount: 8,
            primaryLanguage: { name: 'JavaScript', color: '#f1e05a' }
          },
          {
            name: 'E-Commerce-Platform',
            description: 'Full-stack e-commerce platform with payment integration',
            url: 'https://github.com/Dragon4926/E-Commerce-Platform',
            topics: ['nodejs', 'mongodb', 'stripe'],
            stargazerCount: 18,
            forkCount: 5,
            primaryLanguage: { name: 'Node.js', color: '#339933' }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Loading amazing projects...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-20 bg-muted rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded"></div>
                  <div className="h-6 w-16 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Some of my recent work and contributions
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="glass rounded-lg p-6 hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Github className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Project Description */}
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description || 'No description available'}
              </p>

              {/* Project Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                {project.stargazerCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stargazerCount}</span>
                  </div>
                )}
                {project.forkCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forkCount}</span>
                  </div>
                )}
                {project.primaryLanguage && (
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.primaryLanguage.color }}
                    ></div>
                    <span>{project.primaryLanguage.name}</span>
                  </div>
                )}
              </div>

              {/* Project Topics */}
              {project.topics && project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.topics.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{project.topics.length - 3}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {error && (
          <motion.div 
            className="text-center mt-8 p-4 bg-destructive/20 text-destructive rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>⚠️ {error}</p>
            <p className="text-sm mt-2">Showing fallback projects</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection