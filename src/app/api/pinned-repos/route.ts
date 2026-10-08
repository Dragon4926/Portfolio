import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/github'

export const revalidate = 86400 // 24h

export async function GET() {
  const projects = await getProjects()
  return NextResponse.json(projects)
}
