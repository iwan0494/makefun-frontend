import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Keep the submitted static app and its three captures together for the scorer.
const output = '/output';
mkdirSync(output, { recursive: true });
cpSync('app', `${output}/app`, { recursive: true });
cpSync('screenshots', `${output}/screenshots`, { recursive: true });
writeFileSync(`${output}/dossier.json`, buildDossier(output, { text_max_bytes: 163840, screenshots: { max: 3, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }));
