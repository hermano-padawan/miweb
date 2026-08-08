import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = path.resolve('src/content');
const entries = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full);
    else if (name.isFile() && full.endsWith('.md')) entries.push(full);
  }
}
walk(root);
console.log(`Processing ${entries.length} markdown files...`);
for (const filePath of entries) {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) continue;
  const fm = match[1];
  const titleMatch = fm.match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m);
  const categoryMatch = fm.match(/^category:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3].trim()) : path.basename(filePath, '.md');
  const category = categoryMatch ? (categoryMatch[1] || categoryMatch[2] || categoryMatch[3].trim()) : '';
  const relativePath = path.relative(root, filePath);
  const parts = relativePath.split(path.sep);
  const section = parts[0];
  const slug = path.basename(filePath, '.md');
  const outDir = path.resolve('public/images', section, 'articles');
  fs.mkdirSync(outDir, { recursive: true });
  const filename = `${slug}.svg`;
  const outPath = path.join(outDir, filename);
  const hash = crypto.createHash('sha1').update(slug).digest('hex');
  const hue = parseInt(hash.slice(0, 6), 16) % 360;
  const bg = `hsl(${hue}, 70%, 46%)`;
  const lines = [];
  let line = '';
  for (const word of title.split(' ')) {
    if (line.length + word.length + 1 > 24) {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line += `${word} `;
    }
  }
  if (line.trim()) lines.push(line.trim());
  if (lines.length > 3) lines.length = 3;
  let content = [`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">`, `  <rect width="100%" height="100%" fill="${bg}"/>`, `  <defs>`, `    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`, `      <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>`, `      <stop offset="100%" stop-color="rgba(0,0,0,0.16)"/>`, `    </linearGradient>`, `  </defs>`, `  <rect x="0" y="0" width="100%" height="100%" fill="url(#g)"/>`, `  <text x="60" y="100" font-family="Inter, Arial, sans-serif" font-size="45" fill="rgba(255,255,255,0.8)" font-weight="600">Nexo Bíblico</text>`, `  <rect x="60" y="120" width="1100" height="5" fill="rgba(255,255,255,0.5)" rx="2"/>`];
  let y = 160;
  for (const ln of lines) {
    content.push(`  <text x="60" y="${y}" font-family="Inter, Arial, sans-serif" font-size="70" fill="white" font-weight="700">${ln}</text>`);
    y += 80;
  }
  if (category) {
    content.push(`  <text x="60" y="${y + 20}" font-family="Inter, Arial, sans-serif" font-size="38" fill="rgba(255,255,255,0.82)">${category}</text>`);
  }
  content.push(`  <rect x="60" y="520" width="1080" height="70" fill="rgba(255,255,255,0.08)" rx="18"/>`);
  content.push(`  <text x="80" y="568" font-family="Inter, Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.72)">Contenido Nexo Bíblico</text>`);
  content.push(`</svg>`);
  fs.writeFileSync(outPath, content.join('\n'), 'utf8');
  const newImagePath = `/images/${section}/articles/${filename}`;
  const newFm = fm.replace(/(^image:\s*).*/m, `$1"${newImagePath}"`);
  const updated = text.slice(0, match.index) + '---\n' + newFm + '\n---\n' + text.slice(match.index + match[0].length);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Updated ${filePath}: image -> ${newImagePath}`);
}
