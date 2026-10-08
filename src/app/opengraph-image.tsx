import { ImageResponse } from 'next/og'
import { site } from '@/lib/data'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Deterministic pseudo-random scatter for the backdrop
function dots() {
  const out: { x: number; y: number; blue: boolean }[] = []
  let s = 7
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  for (let i = 0; i < 140; i++) {
    const t = rnd()
    out.push({ x: 640 + t * 480, y: 470 - t * 300 + (rnd() - 0.5) * 120, blue: i % 9 === 0 })
  }
  return out
}

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
          backgroundColor: '#f3f0e8',
          color: '#141413',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {dots().map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.x,
              top: d.y,
              width: d.blue ? 10 : 7,
              height: d.blue ? 10 : 7,
              borderRadius: 10,
              backgroundColor: d.blue ? '#1f3ad6' : '#141413',
            }}
          />
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontFamily: 'monospace', borderBottom: '2px solid #141413', paddingBottom: 16 }}>
          <span>PORTFOLIO · DATA SCIENCE</span>
          <span>{site.handle}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 150, fontStyle: 'italic', letterSpacing: -4, lineHeight: 1 }}>{site.name}</span>
          <span style={{ fontSize: 44, color: '#55524b', marginTop: 12 }}>{site.role} — noisy data in, decisions out.</span>
        </div>
      </div>
    ),
    size,
  )
}
