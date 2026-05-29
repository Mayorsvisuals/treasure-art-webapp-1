const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const unsplashRegex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?(?:[a-zA-Z0-9=&]+)?w=(\d+)(?:[a-zA-Z0-9=&]+)?/g;
  
  if (unsplashRegex.test(content) || content.includes('images.unsplash.com')) {
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)([^'"`\s]*)/g, (match, id, params) => {
      // id is the photo id
      // fallback width if not found in params
      let width = 800;
      let height = 800;
      const wMatch = params.match(/w=(\d+)/);
      if (wMatch) {
        width = parseInt(wMatch[1]);
        height = Math.round(width * 1.25); // Just a nice aspect ratio
      }
      return `https://picsum.photos/seed/${id.slice(0, 6)}/${width}/${height}`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced Unsplash URLs in ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(process.cwd());
