import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function typewriterEffect(text: string, speed: number = 50): Promise<string[]> {
  return new Promise((resolve) => {
    const result: string[] = []
    let i = 0
    
    const type = () => {
      if (i < text.length) {
        result.push(text.slice(0, i + 1))
        i++
        setTimeout(type, speed)
      } else {
        resolve(result)
      }
    }
    
    type()
  })
}