// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { remarkReadingTime } from './scripts/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  // Astro 7's default ('jsx') drops whitespace between inline elements, which runs words and links together here.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      WORKERS_CI_COMMIT_SHA: envField.string({ context: "client", access: "public", default: "unset" })
    }
  },

  markdown: {
    // The reading-time plugin is a remark plugin, so posts stay on the remark/rehype pipeline.
    processor: unified({ remarkPlugins: [remarkReadingTime] }),
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
