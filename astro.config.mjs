// @ts-check
import { defineConfig } from 'astro/config';
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

  integrations: [icon({
    include: {
      heroicons: ["*"], // Include all heroicons
      mdi: ["github", "linkedin"], // Include specific MDI icons
      "simple-icons": ["x"] // Include X icon from simple-icons
    }
  })]
});