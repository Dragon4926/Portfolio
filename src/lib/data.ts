export const site = {
  name: 'Debopriyo',
  handle: 'Dragon4926',
  role: 'Data scientist',
  url: 'https://dragon4926.vercel.app',
  email: 'deadeye.040104+portfolio@gmail.com',
  tagline: 'I turn noisy data into models people can trust — and decisions they can act on.',
  abstract: [
    'I’m a data scientist who learned the craft by building: four-plus years of hands-on work, now formalised through a Master’s in Computer Science.',
    'I work across the whole arc of a data problem — framing the right question, wrangling messy sources, engineering features, training and evaluating models, and shipping the result as something people actually use. I care as much about the error bars as the headline number.',
  ],
  keywords: ['Machine learning', 'Statistical modelling', 'Deep learning', 'NLP', 'Data engineering', 'MLOps', 'Visualisation'],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Dragon4926', handle: 'github.com/Dragon4926' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dragon4926/', handle: 'linkedin.com/in/dragon4926' },
  { label: 'X', href: 'https://x.com/Dragon4926', handle: 'x.com/Dragon4926' },
]

export const sections = [
  { id: 'abstract', n: 1, label: 'Abstract' },
  { id: 'experiments', n: 2, label: 'Experiments' },
  { id: 'method', n: 3, label: 'Method' },
  { id: 'toolkit', n: 4, label: 'Toolkit' },
  { id: 'notebook', n: 5, label: 'Notebook' },
  { id: 'correspondence', n: 6, label: 'Correspondence' },
]

export const pipeline = [
  { id: 'question', label: 'Question', body: 'Pin down the decision the analysis has to inform — and the metric that proves it.' },
  { id: 'data', label: 'Data', body: 'Source, join and audit. Most of the signal (and most of the bugs) live here.' },
  { id: 'features', label: 'Features', body: 'Encode domain knowledge. Simple, well-understood features beat clever ones.' },
  { id: 'model', label: 'Model', body: 'Start with a baseline, earn every bit of added complexity.' },
  { id: 'evaluate', label: 'Evaluate', body: 'Honest validation, error analysis, uncertainty — not just a single score.' },
  { id: 'deploy', label: 'Deploy', body: 'Package as an API, a pipeline or a dashboard that people actually open.' },
  { id: 'monitor', label: 'Monitor', body: 'Watch for drift, close the loop, retrain when the world moves.' },
]

export const stages = ['Collect', 'Clean', 'Model', 'Evaluate', 'Deploy'] as const

/** 2 = primary tool for this stage, 1 = used occasionally, 0 = not used */
export const toolkit: { tool: string; use: [number, number, number, number, number] }[] = [
  { tool: 'Python', use: [2, 2, 2, 2, 2] },
  { tool: 'SQL', use: [2, 2, 0, 1, 0] },
  { tool: 'pandas', use: [1, 2, 1, 2, 0] },
  { tool: 'NumPy', use: [0, 1, 2, 2, 0] },
  { tool: 'scikit-learn', use: [0, 1, 2, 2, 1] },
  { tool: 'PyTorch', use: [0, 0, 2, 2, 1] },
  { tool: 'TensorFlow', use: [0, 0, 1, 1, 1] },
  { tool: 'Matplotlib', use: [0, 1, 1, 2, 0] },
  { tool: 'PostgreSQL', use: [2, 1, 0, 0, 1] },
  { tool: 'FastAPI', use: [1, 0, 0, 0, 2] },
  { tool: 'Docker', use: [0, 0, 0, 0, 2] },
  { tool: 'AWS', use: [1, 0, 1, 0, 2] },
]
