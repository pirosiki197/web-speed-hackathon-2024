import { Hono } from 'hono';

import { constantsCacheMiddleware } from '../../middlewares/constantsCache';

import { COMPANY } from './Company';
import { CONTACT } from './Contact';
import { OVERVIEW } from './Overview';
import { QUESTION } from './Question';
import { TERM } from './Term';

const app = new Hono();

app.use(constantsCacheMiddleware);

app.get('/constants/company', async (c) => {
  return c.text(COMPANY);
});

app.get('/constants/contact', async (c) => {
  return c.text(CONTACT);
});

app.get('/constants/overview', async (c) => {
  return c.text(OVERVIEW);
});

app.get('/constants/question', async (c) => {
  return c.text(QUESTION);
});

app.get('/constants/term', async (c) => {
  return c.text(TERM);
});

export { app as constantsApp };
