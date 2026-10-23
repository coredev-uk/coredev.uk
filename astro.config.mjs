// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { remarkReadingTime } from './scripts/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },

    imageService: "cloudflare"
  }),

  env: {
    schema: {
      WORKERS_CI_COMMIT_SHA: envField.string({ context: "client", access: "public", default: "unset" })
    }
  },

  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
