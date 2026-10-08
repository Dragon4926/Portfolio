import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import Providers from '@/components/providers/Providers'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import { site } from '@/lib/data'
import './globals.css'

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' })

const title = `${site.name} — ${site.role}`
const description =
  'Portfolio of Debopriyo (Dragon4926) — self-taught software developer with 4+ years of experience building full-stack products and AI-powered systems.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  keywords: ['developer', 'full-stack', 'AI', 'machine learning', 'React', 'Next.js', 'TypeScript', 'portfolio'],
  authors: [{ name: site.name, url: 'https://github.com/Dragon4926' }],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: `${site.name} — Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description, creator: '@Dragon4926' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Providers>
          <Preloader />
          <Nav />
          {children}
          <Cursor />
        </Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  )
}
