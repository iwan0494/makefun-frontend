import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { buildDossier } from './vendor/makefun-frontend.ts';
const destination = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(destination, { recursive: true });
cpSync('app', `${destination}/app`, { recursive: true });
cpSync('screenshots', `${destination}/screenshots`, { recursive: true });
writeFileSync(`${destination}/dossier.json`, buildDossier(destination, { text_max_bytes: 163840, screenshots: { max: 3, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }));
