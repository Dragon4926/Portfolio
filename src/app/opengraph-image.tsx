import { ImageResponse } from 'next/og'
import { site } from '@/lib/data'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#0b0b0c',
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,91,34,0.55), rgba(255,91,34,0) 55%)',
          color: '#edebe6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, opacity: 0.7 }}>
          <span>© {site.handle}</span>
          <span>Portfolio</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 56, opacity: 0.8 }}>{site.role}</span>
          <span style={{ fontSize: 220, fontWeight: 700, letterSpacing: -12, lineHeight: 0.9 }}>{site.name}</span>
        </div>
      </div>
    ),
    size,
  )
}
