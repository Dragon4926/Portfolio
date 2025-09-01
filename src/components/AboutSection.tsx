'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, Calendar, MapPin, Code, Heart } from 'lucide-react'

const AboutSection: React.FC = () => {
  const aboutData = [
    {
      icon: User,
      title: "Who am I?",
      content: "Hey, I&apos;m Debopriyo! 👋 Self-taught software developer with 4+ years of hands-on experience, pursuing a Master&apos;s in Computer Science. Skilled in AI, Full-stack development, and modern web technologies."
    },
    {
      icon: Briefcase,
      title: "Experience",
      content: "4+ years in software development, specializing in full-stack web development, AI/ML integration and implementation, team collaboration and project management."
    },
    {
      icon: Code,
      title: "What I do",
      content: "I build modern, scalable web applications with clean code. My expertise spans from frontend frameworks like React and Next.js to backend technologies and AI integration."
    },
    {
      icon: Heart,
      title: "Passion",
      content: "I&apos;m passionate about building amazing things that solve real problems. Currently learning advanced AI techniques and always excited about new technologies."
    }
  ]

  const quickFacts = [
    { label: "Location", value: "India", icon: MapPin },
    { label: "Experience", value: "4+ years", icon: Calendar },
    { label: "Current Focus", value: "AI & Full-Stack", icon: Code },
    { label: "Open to Work", value: "Yes", icon: Briefcase }
  ]

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get to know me better - my journey, skills, and what drives me
          </motion.p>
        </div>

        {/* Quick Facts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              className="glass rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <fact.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">{fact.label}</h3>
              <p className="font-bold text-lg">{fact.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {aboutData.map((item, index) => (
            <motion.div
              key={item.title}
              className="glass rounded-lg p-8 hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Want to know more? Let&apos;s connect and discuss how we can work together!
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection