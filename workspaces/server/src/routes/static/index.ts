import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { CLIENT_STATIC_PATH } from '../../constants/paths';
import { compressAllMiddleware } from '../../middlewares/compressMiddleware';

const app = new Hono();

app.use(compressAllMiddleware);

app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };
