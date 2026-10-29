import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineMdastPlugin } from 'satteri';

const publicDir = new URL('../public/', import.meta.url);

/** Width and height from a WebP file's header (lossy, lossless or extended), or null. */
function webpSize(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  switch (buf.toString('ascii', 12, 16)) {
    case 'VP8 ':
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    case 'VP8L': {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    case 'VP8X':
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    default:
      return null;
  }
}

/**
 * Gives Markdown images that live in `public/` their intrinsic width and height, so the page doesn't
 * shift as they load, and lets them load lazily since they sit in the body of a post.
 */
export function imageSizePlugin() {
  return defineMdastPlugin({
    name: 'image-size',
    image(node, ctx) {
      if (!node.url.startsWith('/') || !node.url.endsWith('.webp')) return;
      let size;
      try {
        size = webpSize(readFileSync(fileURLToPath(new URL(`.${node.url}`, publicDir))));
      } catch {
        return;
      }
      if (!size) return;
      ctx.setProperty(node, 'data', {
        ...node.data,
        hProperties: { ...size, loading: 'lazy', decoding: 'async' },
      });
    },
  });
}
