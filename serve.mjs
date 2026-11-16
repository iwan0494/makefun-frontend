import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve('app');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    if (!file.startsWith(root + sep) && file !== resolve(root, 'index.html')) throw new Error('Not found');
    const raw = await readFile(file);
    const body = /\bgzip\b/.test(req.headers['accept-encoding'] || '') ? gzipSync(raw, { level:9 }) : raw;
    res.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Content-Encoding':body===raw?'identity':'gzip', 'Content-Length':body.length, 'Cache-Control':'no-cache' });
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(8080, () => console.log('Serving app/ at http://localhost:8080'));
