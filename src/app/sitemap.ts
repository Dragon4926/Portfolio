import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: process.env.NEXT_PUBLIC_SITE_URL || site.url, changeFrequency: 'monthly', priority: 1 }]
}
