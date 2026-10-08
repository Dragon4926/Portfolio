import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Newsreader } from 'next/font/google'
import Providers from '@/components/providers/Providers'
import Nav from '@/components/Nav'
import { site } from '@/lib/data'
import './globals.css'

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
})
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' })

const title = `${site.name} — ${site.role}`
const description =
  'Portfolio of Debopriyo (Dragon4926) — data scientist turning noisy data into models people can trust. Experiments, method, toolkit and an interactive notebook.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  keywords: ['data scientist', 'machine learning', 'statistics', 'deep learning', 'NLP', 'Python', 'portfolio'],
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
  themeColor: '#f3f0e8',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
