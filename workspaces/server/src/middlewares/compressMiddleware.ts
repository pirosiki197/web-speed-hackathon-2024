import { createGzip } from 'node:zlib'; // Node.js gzip

import { encoding } from '@hapi/accept';
import { ZstdInit } from '@oneidentity/zstd-js/asm/index.cjs.js';
import type { Context } from 'hono';
import { createMiddleware } from 'hono/factory';

const compressibleTypes = [
  'text/html',
  'text/plain',
  'text/css',
  'text/javascript',
  'application/json',
  'application/javascript',
  'image/svg+xml',
];

const zstdInit = ZstdInit();

// Utility function for compression
async function compressResponse(c: Context) {
  if (c.res.headers.has('X-Content-Encoding')) {
    return;
  }

  const { ZstdStream } = await zstdInit;
  const accept = encoding(c.req.header('Accept-Encoding'), ['zstd', 'gzip']);

  const originalBody = c.res.body;
  if (!originalBody) {
    return;
  }

  let compressedStream;

  if (accept === 'zstd') {
    // Create a TransformStream for Zstd compression
    const transformStream = new TransformStream<Uint8Array, Uint8Array>({
      async transform(chunk, controller) {
        const compressedChunk = ZstdStream.compress(chunk, 3, false);
        controller.enqueue(compressedChunk);
      },
    });

    compressedStream = originalBody.pipeThrough(transformStream);
    c.res.headers.set('X-Content-Encoding', 'zstd');
  } else if (accept === 'gzip') {
    // Create a Gzip stream for compression
    const gzipTransformStream = new TransformStream<Uint8Array, Uint8Array>({
      async transform(chunk, controller) {
        const gzip = createGzip(); // Create a Gzip instance
        const compressedChunk = await new Promise<Uint8Array>((resolve, reject) => {
          const chunks: Buffer[] = [];
          gzip.on('data', (data) => chunks.push(data));
          gzip.on('end', () => resolve(Buffer.concat(chunks)));
          gzip.on('error', reject);
          gzip.write(chunk);
          gzip.end();
        });
        controller.enqueue(compressedChunk);
      },
    });
    compressedStream = originalBody.pipeThrough(gzipTransformStream);
    c.res.headers.set('X-Content-Encoding', 'gzip');
  } else {
    return; // No supported encoding found
  }

  c.res = new Response(compressedStream, c.res);
  c.res.headers.delete('Content-Length');
  c.res.headers.append('Cache-Control', 'no-transform');
}

// compressAllMiddleware compresses all responses regardless of content type
export const compressAllMiddleware = createMiddleware(async (c, next) => {
  await next();
  await compressResponse(c);
});

// compressMiddleware only compresses if the content type is compressible
export const compressMiddleware = createMiddleware(async (c, next) => {
  await next();

  let contentType = c.res.headers.get('Content-Type');

  // Fallback to MIME type detection based on file extension if Content-Type is not present
  if (!contentType) {
    const url = new URL(c.req.url);
    const extension = url.pathname.split('.').pop() || '';
    const mime = await import('mime');
    contentType = mime.default.getType(extension);
  }

  // Only compress if the content type is compressible
  if (!contentType || !compressibleTypes.some((type) => contentType.startsWith(type))) {
    return;
  }

  await compressResponse(c);
});
