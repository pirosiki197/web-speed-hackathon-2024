import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { compress } from 'hono/compress'

import { CLIENT_STATIC_PATH } from '../../constants/paths';

const app = new Hono();

app.use(
  'client.global.js',
  compress(),
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }));
app.use(
  'assets/cyber-toon.svg',
  compress(),
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }));
app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };
