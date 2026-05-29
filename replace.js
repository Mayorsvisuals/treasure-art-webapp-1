const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('import Image from "next/image"')) {
    content = content.replace('import Image from "next/image"', 'import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback"');
    changed = true;
  }

  // Also replace fill without sizes
  // This regex finds `<Image ... fill ...>` that doesn't have sizes. 
  // It's a bit complicated, so we'll just let sizes be missing if it's small, or we can just add `sizes="(max-width: 768px) 100vw, 33vw"` inside `ImageWithFallback` by default if fill is true and sizes is not provided! This is brilliant!

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(process.cwd());
