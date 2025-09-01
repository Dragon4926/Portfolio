import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface GitHubRepo {
  name: string
  description: string
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage?: {
    name: string
    color: string
  }
  topics: {
    nodes: {
      topic: {
        name: string
      }
    }[]
  }
}

interface GitHubResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: GitHubRepo[]
      }
    }
  }
  errors?: unknown[]
}

export async function GET() {
  try {
    const query = `
      query {
        user(login: "Dragon4926") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                topics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json() as GitHubResponse

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    const repos = data.data.user.pinnedItems.nodes.map((repo: GitHubRepo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name,
      languageColor: repo.primaryLanguage?.color,
      topics: repo.topics.nodes.map((topic) => topic.topic.name),
    }))

    return NextResponse.json(repos)
  } catch (err) {
    console.error('GitHub API Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch pinned repos' },
      { status: 500 }
    )
  }
}