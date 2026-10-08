import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/github'

export const revalidate = 3600

export async function GET() {
  const projects = await getProjects()
  return NextResponse.json(projects)
}
