import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dragon4926 - Full-Stack Developer & AI Enthusiast',
  description: 'Portfolio of Debopriyo - Self-taught software developer with 4+ years of experience in full-stack development and AI integration.',
  keywords: 'developer, full-stack, AI, machine learning, React, Next.js, TypeScript, portfolio',
  authors: [{ name: 'Debopriyo', url: 'https://github.com/Dragon4926' }],
  openGraph: {
    title: 'Dragon4926 - Full-Stack Developer & AI Enthusiast',
    description: 'Portfolio of Debopriyo - Full-stack developer specializing in modern web technologies and AI integration.',
    url: 'https://your-portfolio-url.com',
    siteName: 'Dragon4926 Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dragon4926 Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dragon4926 - Full-Stack Developer & AI Enthusiast',
    description: 'Portfolio of Debopriyo - Full-stack developer specializing in modern web technologies and AI integration.',
    creator: '@Dragon4926',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}