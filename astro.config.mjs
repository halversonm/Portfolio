// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and OG tags. Update at launch.
  site: 'https://northlight.studio',

  vite: {
    plugins: [tailwindcss()]
  }
});