require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const rateLimit = require('express-rate-limit');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Add static file serving middleware
app.use(express.static(path.join(__dirname, '../')));

// Update specific routes
app.use('/js', express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get('/api/pinned-repos', async (req, res) => {
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
              }
            }
          }
        }
      }
    `;

    const response = await axios.post('https://api.github.com/graphql', 
      { query },
      { 
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );
    
    res.json(response.data.data.user.pinnedItems.nodes);
  } catch (error) {
    console.error('GitHub API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
