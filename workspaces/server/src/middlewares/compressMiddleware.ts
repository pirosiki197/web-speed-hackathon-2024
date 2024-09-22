import { encoding } from '@hapi/accept';
import { ZstdInit } from '@oneidentity/zstd-js/asm/index.cjs.js';
import { createMiddleware } from 'hono/factory';

const compressibleTypes = ['text/html', 'text/plain', 'text/css', 'application/json', 'application/javascript', 'image/svg+xml'];

const zstdInit = ZstdInit();

export const compressMiddleware = createMiddleware(async (c, next) => {
  await next();

  const contentType = c.res.headers.get('Content-Type');
  if (!contentType || !compressibleTypes.some((type) => contentType.startsWith(type))) {
    return;
  }

  const { ZstdStream } = await zstdInit;

  const accept = encoding(c.req.header('X-Accept-Encoding'), ['zstd']);
  if (accept === 'zstd') {
    const originalBody = c.res.body;

    if (originalBody) {
      const transformStream = new TransformStream<Uint8Array, Uint8Array>({
        async transform(chunk, controller) {
          const compressedChunk = ZstdStream.compress(chunk, 12, false);
          controller.enqueue(compressedChunk);
        },
      });

      const compressedStream = originalBody.pipeThrough(transformStream);
      c.res = new Response(compressedStream, c.res);

      c.res.headers.delete('Content-Length');
      c.res.headers.set('X-Content-Encoding', 'zstd');
      c.res.headers.append('Cache-Control', 'no-transform');
    }
  }
});
