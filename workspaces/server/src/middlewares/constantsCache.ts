import { createMiddleware } from 'hono/factory';

export const constantsCacheMiddleware = createMiddleware(async (c, next) => {
  await next();

  c.header('Cache-Control', 'public, max-age=3600'); // 1時間キャッシュ
});
