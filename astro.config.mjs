// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

import icon from 'astro-icon';

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

  integrations: [icon({
    include: {
      heroicons: ["*"], // Include all heroicons
      mdi: ["github", "linkedin", "source-commit"], // Include specific MDI icons
      "simple-icons": ["x"] // Include X icon from simple-icons
    }
  })]
});
