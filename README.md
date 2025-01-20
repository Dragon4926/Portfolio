# Terminal Portfolio

An interactive web-based terminal portfolio with cursor trails, snow effects, and theme switching.

## Features

- 🖥️ Interactive terminal interface with command history
- ✨ Custom cursor trail animation
- ❄️ 3D snow effect using Three.js
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design
- 🔄 Real-time GitHub projects integration
- 🔒 Rate limiting and security features

## Available Commands

- `help` - Display available commands
- `whoami` - About me
- `social` - Show social media links
- `projects` - View pinned GitHub projects
- `email` - Open email composer
- `history` - View command history
- `clear` - Clear terminal
- `banner` - Show welcome banner

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- 3D Graphics: Three.js
- Backend: Express.js, Node.js
- APIs: GitHub GraphQL API
- Security: express-rate-limit, helmet

## Installation

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with your GitHub token:
```
GITHUB_TOKEN=your_github_token
```

4. Start the server:
```sh
npm start
```

For development:
```sh
npm run dev
```

## Performance Optimizations

Cursor trail animation is optimized using `requestAnimationFrame`:

```javascript
const optimizedAnimateTrail = () => {
  let frame;
  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(animateTrail);
  };
};
```

## License

MIT License

## Author

[@Dragon4926](https://github.com/Dragon4926)
