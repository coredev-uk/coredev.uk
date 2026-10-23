import { defineMdastPlugin } from 'satteri';
import readingTime from 'reading-time';

/**
 * Adds `minutesRead` ("17 min read") to each Markdown entry's frontmatter.
 * `textContent` leaves out code blocks, so their source is collected separately and counted too.
 * A factory, so the collected code starts empty for every document.
 */
export function readingTimePlugin() {
  const code = [];
  return defineMdastPlugin({
    name: 'reading-time',
    code(node) {
      code.push(node.value);
    },
    after(root, ctx) {
      if (ctx.data.astro === undefined) return;
      ctx.data.astro.frontmatter.minutesRead = readingTime([ctx.textContent(root), ...code].join(' ')).text;
    },
  });
}
