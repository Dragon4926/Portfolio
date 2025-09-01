export interface GitHubRepo {
  name: string
  description?: string
  url: string
  topics?: string[]
  stargazerCount?: number
  forkCount?: number
  primaryLanguage?: {
    name: string
    color: string
  }
}

export interface TerminalCommand {
  command: string
  description: string
  action: (args: string[]) => Promise<string[]> | string[]
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number
  icon?: string
}

export interface Experience {
  title: string
  company: string
  duration: string
  description: string[]
  technologies: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  username?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export type Theme = 'dark' | 'light'