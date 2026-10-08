export interface Project {
  name: string
  description: string | null
  url: string
  homepage: string | null
  stars: number
  forks: number
  language: string | null
  languageColor: string | null
  topics: string[]
}

const USER = 'Dragon4926'
const REVALIDATE = 86400 // 24h

// Subset of GitHub linguist colours, used when the REST fallback is hit.
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

interface PinnedNode {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string | null } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
}

interface RestRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
}

async function fetchPinned(token: string): Promise<Project[]> {
  const query = `
    query {
      user(login: "${USER}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              primaryLanguage { name color }
              repositoryTopics(first: 6) { nodes { topic { name } } }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: REVALIDATE },
  })
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`)

  const json = (await res.json()) as {
    data?: { user: { pinnedItems: { nodes: PinnedNode[] } } }
    errors?: unknown[]
  }
  if (json.errors || !json.data) throw new Error('GitHub GraphQL returned errors')

  return json.data.user.pinnedItems.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepage: repo.homepageUrl || null,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage?.name ?? null,
    languageColor: repo.primaryLanguage?.color ?? null,
    topics: repo.repositoryTopics.nodes.map((n) => n.topic.name),
  }))
}

async function fetchPublic(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
    {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE },
    },
  )
  if (!res.ok) throw new Error(`GitHub REST ${res.status}`)

  const repos = (await res.json()) as RestRepo[]
  return repos
    .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== USER.toLowerCase())
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      languageColor: r.language ? (LANGUAGE_COLORS[r.language] ?? null) : null,
      topics: r.topics?.slice(0, 6) ?? [],
    }))
}

/**
 * Pinned repositories when a GITHUB_TOKEN is configured, otherwise the most
 * notable public repositories. Never throws — returns [] on failure.
 */
export async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN
  if (token) {
    try {
      const pinned = await fetchPinned(token)
      if (pinned.length) return pinned
    } catch (err) {
      console.error('[github] pinned fetch failed, falling back to REST:', err)
    }
  }

  try {
    return await fetchPublic()
  } catch (err) {
    console.error('[github] public repo fetch failed:', err)
    return []
  }
}
