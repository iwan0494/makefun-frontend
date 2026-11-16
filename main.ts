import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { buildDossier } from './vendor/makefun-frontend.ts';
const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(out, { recursive: true });
cpSync('app', `${out}/app`, { recursive: true });
cpSync('screenshots', `${out}/screenshots`, { recursive: true });
writeFileSync(`${out}/dossier.json`, buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 3, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }));
