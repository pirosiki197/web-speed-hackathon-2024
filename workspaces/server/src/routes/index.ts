import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';

import { cacheControlMiddleware } from '../middlewares/cacheControlMiddleware';
import { compressMiddleware } from '../middlewares/compressMiddleware';

import { adminApp } from './admin';
import { apiApp } from './api';
import { COMPANY } from './constants/Company';
import { CONTACT } from './constants/Contact';
import { OVERVIEW } from './constants/Overview';
import { QUESTION } from './constants/Question';
import { TERM } from './constants/Term';
import { imageApp } from './image';
import { ssrApp } from './ssr';
import { staticApp } from './static';

const app = new Hono();

app.use(secureHeaders());
app.use(
  cors({
    allowHeaders: ['Content-Type', 'Accept-Encoding', 'X-Accept-Encoding', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    exposeHeaders: ['Content-Encoding', 'X-Content-Encoding'],
    origin: (origin) => origin,
  }),
);
app.use(compressMiddleware);
app.use(cacheControlMiddleware);

app.get('/healthz', (c) => {
  return c.body('live', 200);
});
app.get('/const/company', (c) => {
  return c.text(COMPANY, 200);
})
app.get('/const/contact', (c) => {
  return c.text(CONTACT, 200);
})
app.get('/const/overview', (c) => {
  return c.text(OVERVIEW, 200);
})
app.get('/const/question', (c) => {
  return c.text(QUESTION, 200);
})
app.get('/const/term', (c) => {
  return c.text(TERM, 200);
})
app.route('/', staticApp);
app.route('/', imageApp);
app.route('/', apiApp);
app.route('/', adminApp);
app.route('/', ssrApp);

app.onError((cause) => {
  console.error(cause);

  if (cause instanceof HTTPException) {
    return cause.getResponse();
  }

  const err = new HTTPException(500, {
    cause: cause,
    message: 'Internal server error.',
  });
  return err.getResponse();
});

export { app };
