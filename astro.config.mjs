// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { readingTimePlugin } from './scripts/reading-time.mjs';
import { imageSizePlugin } from './scripts/image-size.mjs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      WORKERS_CI_COMMIT_SHA: envField.string({ context: "client", access: "public", default: "unset" })
    }
  },

  markdown: {
    processor: satteri({ mdastPlugins: [readingTimePlugin, imageSizePlugin] }),
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
