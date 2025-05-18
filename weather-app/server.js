import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveStatic from 'serve-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Serve static files from the dist directory
app.use(serveStatic(join(__dirname, 'dist'), {
  index: false,
  setHeaders: (res, path) => {
    // Set cache control headers for static assets
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 