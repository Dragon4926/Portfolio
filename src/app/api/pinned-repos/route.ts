import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function GET(request: NextRequest) {
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

    const data = await response.json()

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    const repos = data.data.user.pinnedItems.nodes.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name,
      languageColor: repo.primaryLanguage?.color,
      topics: repo.topics.nodes.map((topic: any) => topic.topic.name),
    }))

    return NextResponse.json(repos)
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pinned repos' },
      { status: 500 }
    )
  }
}