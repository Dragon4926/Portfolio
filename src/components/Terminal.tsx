'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TerminalOutput {
  id: string
  command: string
  output: string[]
  timestamp: Date
}

interface TerminalProps {
  className?: string
}

interface GitHubProject {
  name: string
  description?: string
  stars: number
  forks: number
  url: string
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [history, setHistory] = useState<TerminalOutput[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  whoami    - About me',
      '  social    - Social media links',
      '  projects  - View my projects',
      '  skills    - Technical skills',
      '  experience - Work experience',
      '  contact   - Contact information',
      '  clear     - Clear terminal',
      '  history   - Command history',
      '  theme     - Toggle theme',
      ''
    ],
    whoami: () => [
      'Hey, I\'m Debopriyo! 👋',
      '',
      'Self-taught software developer with 4+ years of hands-on experience,',
      'pursuing a Master\'s in Computer Science.',
      'Skilled in AI, Full-stack development, and modern web technologies.',
      ''
    ],
    social: () => [
      'Find me on:',
      '  🐦 Twitter:  https://x.com/Dragon4926',
      '  💼 LinkedIn: https://www.linkedin.com/in/dragon4926/',
      '  🐱 GitHub:   https://github.com/Dragon4926',
      ''
    ],
    projects: async () => {
      try {
        const response = await fetch('/api/pinned-repos')
        if (!response.ok) throw new Error('Failed to fetch projects')
        
        const repos = await response.json()
        if (!repos || repos.length === 0) {
          return ['No pinned projects found.', '']
        }

        return [
          'Featured Projects:',
          '',
          ...repos.map((repo: GitHubProject) => [
            `📌 ${repo.name}`,
            `   ${repo.description || 'No description'}`,
            `   🌟 ${repo.stars || 0} stars | 🍴 ${repo.forks || 0} forks`,
            `   🔗 ${repo.url}`,
            ''
          ]).flat()
        ]
      } catch {
        return [
          'Failed to fetch projects from GitHub API',
          'Check out my GitHub: https://github.com/Dragon4926',
          ''
        ]
      }
    },
    skills: () => [
      'Technical Skills:',
      '  Languages:   JavaScript, TypeScript, Python, Java',
      '  Frontend:    React, Next.js, Vue.js, Tailwind CSS',
      '  Backend:     Node.js, Express, Django, FastAPI',
      '  Database:    PostgreSQL, MongoDB, Redis',
      '  Cloud:       AWS, Vercel, Docker',
      '  AI/ML:       TensorFlow, PyTorch, OpenAI APIs',
      ''
    ],
    experience: () => [
      'Work Experience:',
      '  • 4+ years in software development',
      '  • Full-stack web development',
      '  • AI/ML integration and implementation',
      '  • Team collaboration and project management',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '  📧 Email: deadeye.040104+portfolio@gmail.com',
      '  📱 Let&apos;s connect and build something amazing!',
      ''
    ],
    clear: () => {
      setHistory([])
      return []
    },
    history: () => [
      'Command History:',
      ...commandHistory.map((cmd, idx) => `  ${idx + 1}. ${cmd}`),
      ''
    ],
    theme: () => [
      'Theme toggle functionality would be implemented here',
      'Currently using system preference',
      ''
    ]
  }

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim().toLowerCase()
    
    if (!trimmedCommand) return

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    setIsTyping(true)

    let output: string[]
    
    // Handle async commands
    if (trimmedCommand === 'projects') {
      output = await commands.projects()
    } else {
      const commandFn = commands[trimmedCommand as keyof typeof commands]
      if (typeof commandFn === 'function') {
        const result = commandFn()
        output = Array.isArray(result) ? result : []
      } else {
        output = [
          `Command not found: ${trimmedCommand}`,
          'Type "help" for available commands.',
          ''
        ]
      }
    }

    const newEntry: TerminalOutput = {
      id: Date.now().toString(),
      command: trimmedCommand,
      output,
      timestamp: new Date()
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 100))

    setHistory(prev => [...prev, newEntry])
    setIsTyping(false)
    setCurrentInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Show welcome message on mount
    const welcomeOutput: TerminalOutput = {
      id: 'welcome',
      command: 'welcome',
      output: [
        '╭─────────────────────────────────────────────────╮',
        '│              Welcome to Dragon4926              │',
        '│           Interactive Terminal Portfolio        │',
        '╰─────────────────────────────────────────────────╯',
        '',
        'Type "help" to see available commands.',
        ''
      ],
      timestamp: new Date()
    }
    setHistory([welcomeOutput])
  }, [])

  return (
    <div 
      className={cn(
        "bg-[var(--terminal-bg)] border border-[var(--terminal-border)] rounded-lg p-6 terminal-font text-[var(--terminal-text)] h-96 flex flex-col",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--terminal-border)]">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-sm opacity-70">dragon4926@portfolio:~$</span>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-[var(--terminal-cursor)] scrollbar-track-transparent"
      >
        <AnimatePresence>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              {entry.command !== 'welcome' && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--terminal-highlight)]">$</span>
                  <span className="text-[var(--terminal-cursor)]">{entry.command}</span>
                </div>
              )}
              {entry.output.map((line, idx) => (
                <div key={idx} className="ml-4 whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--terminal-highlight)]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[var(--terminal-cursor)] caret-[var(--terminal-cursor)]"
            placeholder={isTyping ? "Processing..." : "Type a command..."}
            disabled={isTyping}
            autoFocus
          />
          <span className="terminal-cursor w-2 h-5 inline-block"></span>
        </div>
      </div>
    </div>
  )
}

export default Terminal