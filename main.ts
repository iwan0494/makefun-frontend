// Build the static frontend handoff and its deterministic dossier from files authored in this repository.
import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repository = fileURLToPath(new URL('.', import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const shotDirectory = join(repository, 'screenshots');
mkdirSync(output, { recursive: true });
cpSync(join(repository, 'app'), join(output, 'app'), { recursive: true });
mkdirSync(join(output, 'screenshots'), { recursive: true });
if (existsSync(shotDirectory)) cpSync(shotDirectory, join(output, 'screenshots'), { recursive: true });

const screenshotFiles = readdirSync(join(output, 'screenshots')).filter(name => !name.startsWith('.'));
for (const name of screenshotFiles) {
  const size = statSync(join(output, 'screenshots', name)).size;
  if (size > 262144) throw new Error(`Screenshot ${name} is ${size} bytes; the maximum is 262144 bytes.`);
}
const dossier = buildDossier(output, {
  text_max_bytes: 163840,
  screenshots: { max: 3, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(output, 'dossier.json'), dossier);
function listFiles(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = join(prefix, entry.name);
    return entry.isDirectory() ? listFiles(join(directory, entry.name), relative) : [relative];
  });
}
console.log(`make.fun frontend written to ${output}`);
for (const path of listFiles(output).sort()) console.log(`  ${path}`);
