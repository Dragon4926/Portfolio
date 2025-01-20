var twitter = "https://x.com/Dragon4926";
var password = "1234";
var linkedin = "https://www.linkedin.com/in/dragon4926/";
var github =  "https://github.com/Dragon4926";
var email = 'deadeye.040104+portfolio@gmail.com'; // Your contact email

let whoami = [
  "<br>",
  "Hey, I'm Debopriyo!👋",
  "Self-taught software developer with 4+ years of hands-on experience, pursuing a Master's in Computer Science. Skilled in AI, Full-stack development.",
  "<br>"
];

let social = [
  "<br>",
  'twitter        <a href="' + twitter + '" target="_blank">twitter/Dragon4926' + '</a>',
  'linkedin       <a href="' + linkedin + '" target="_blank">linkedin/dragon4926' + "</a>",
  'github         <a href="' + github + '" target="_blank">github/Dragon4926' + "</a>",
  "<br>"
];

let secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re me ',
  "<br>"
];

let projects = [
  "<br>",
  "Most projects are on GitHub, or confidential.",
  "<br>"
];

let help = [
  "<br>",
  '<span class="command">whoami</span>         Who am I? ya that is what it does',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">secret</span>         Find the password',
  '<span class="command">projects</span>       View coding projects',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           You obviously already know what this does',
  '<span class="command">email</span>          Do not email me',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">banner</span>         Display the header',
  "<br>",
];

let cachedProjects = null;
let cacheTime = null;

async function fetchGitHubPinnedRepos() {
  if (cachedProjects && cacheTime && Date.now() - cacheTime < 3600000) {
    return cachedProjects;
  }
  try {
    const response = await fetch('/api/pinned-repos');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const repos = await response.json();
    if (!repos || repos.length === 0) {
      return ["<br>", '<span class="error">No pinned projects found.</span>', "<br>"];
    }

    cachedProjects = [
      "<br>",
      "My Pinned Projects:",
      "<br>",
      ...repos.map(repo => [
        `<div class="project-item">`,
        `<span class="command">📌 ${repo.name}</span>`,
        `<span class="color2">${repo.description || 'No description'}</span>`,
        `<a href="${repo.url}" target="_blank" class="project-link">View on GitHub ↗</a>`,
        `</div>`
      ]).flat()
    ];
    cacheTime = Date.now();
    return cachedProjects;
  } catch (error) {
    console.error('Fetch error:', error);
    return ["<br>", `<span class="error">Failed to fetch projects: ${error.message}</span>`, "<br>"];
  }
}

// In your commands object, update the projects handler:
commands.projects = async function(args) {
  const projectsOutput = await fetchGitHubPinnedRepos();
  loopLines(projectsOutput, "color2 margin", 80);
};