import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
// import { compress } from 'hono/compress'

import { CLIENT_STATIC_PATH } from '../../constants/paths';

const app = new Hono();

app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };
