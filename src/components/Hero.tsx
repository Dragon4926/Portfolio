'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = "Full-Stack Developer & AI Enthusiast"
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Dragon4926', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/dragon4926/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/Dragon4926', label: 'Twitter' },
    { icon: Mail, href: 'mailto:deadeye.040104+portfolio@gmail.com', label: 'Email' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hey, I'm{' '}
              <span className="gradient-text">
                Debopriyo
              </span>
            </motion.h1>
            
            <motion.div 
              className="text-xl lg:text-2xl text-muted-foreground h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </motion.div>
          </div>

          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Self-taught software developer with 4+ years of hands-on experience, 
            pursuing a Master's in Computer Science. I specialize in building 
            modern web applications with AI integration and clean, scalable code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button size="lg" className="group">
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <link.icon className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Animated Code Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="glass rounded-lg p-6 terminal-font text-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground ml-2">~/portfolio</span>
            </div>
            
            <motion.div className="space-y-2">
              {[
                "const developer = {",
                "  name: 'Debopriyo',",
                "  title: 'Full-Stack Developer',",
                "  location: 'India',",
                "  experience: '4+ years',",
                "  skills: [",
                "    'React', 'Next.js', 'TypeScript',",
                "    'Node.js', 'Python', 'AI/ML'",
                "  ],",
                "  passion: 'Building amazing things',",
                "  currentlyLearning: 'Advanced AI',",
                "  openToWork: true",
                "};"
              ].map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                  className="text-[var(--terminal-text)]"
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/30 rounded-full blur-lg"
            animate={{
              y: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero