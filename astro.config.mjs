import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import { readdirSync } from 'node:fs';

export default defineConfig({
  output: 'static',
  adapter: netlify({ devFeatures: { images: true, environmentVariables: false, edgeFunctions: false } }),
  vite: {
    define: {
      __PAINTING_FILES__: JSON.stringify(readdirSync(new URL('./public/paintings/', import.meta.url))),
    },
  },
});
