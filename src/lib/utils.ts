import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Shared easing curves, mirrored in globals.css */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
}
