import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Package the static site and its authentic browser captures for the make.fun scorer.
const here = fileURLToPath(new URL('.', import.meta.url));
const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(destination, { recursive: true });
cpSync(join(here, 'app'), join(destination, 'app'), { recursive: true });
mkdirSync(join(destination, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(destination, 'screenshots'), { recursive: true });
const shotsDir = join(destination, 'screenshots');
const screenshots = readdirSync(shotsDir).filter((name) => !name.startsWith('.')).map((name) => {
  const path = join(shotsDir, name);
  const info = statSync(path);
  if (!info.isFile()) throw new Error(`Screenshot is not a regular file: ${name}`);
  if (info.size > 262144) throw new Error(`Screenshot exceeds 256 KiB: ${name} (${info.size} bytes)`);
  return { name, size: info.size };
});
if (screenshots.length !== 3) throw new Error(`Expected exactly 3 screenshots; found ${screenshots.length}`);
writeFileSync(join(destination, 'dossier.json'), buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 3, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
}));
const listFiles = (dir, prefix = '') => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const relative = join(prefix, entry.name);
  return entry.isDirectory() ? listFiles(join(dir, entry.name), relative) : [relative];
});
console.log(`Packaged ${listFiles(destination).length} files to ${destination}:`);
for (const file of listFiles(destination).sort()) console.log(`  ${file}`);
for (const shot of screenshots) console.log(`  screenshot ${shot.name}: ${shot.size} bytes`);
