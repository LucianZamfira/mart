import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preparePaintingImages } from './scripts/painting-images.mjs';

const paintingsDirectory = fileURLToPath(new URL('./public/paintings/', import.meta.url));
const paintingImages = await preparePaintingImages();

export default defineConfig({
  site: 'https://mart-gallery.netlify.app',
  output: 'static',
  adapter: netlify({ devFeatures: { images: true, environmentVariables: false, edgeFunctions: false } }),
  vite: {
    plugins: [{
      name: 'reload-painting-gallery',
      apply: 'serve',
      configureServer(server) {
        let pending = Promise.resolve();
        const reload = (file) => {
          if (resolve(dirname(file)) === resolve(paintingsDirectory)
            && /\.(jpe?g|png|webp|avif)$/i.test(file)) {
            pending = pending.then(async () => {
              await preparePaintingImages();
              server.ws.send({ type: 'full-reload', path: '*' });
            }).catch(error => server.config.logger.error(String(error)));
          }
        };
        server.watcher.add(paintingsDirectory);
        server.watcher.on('add', reload).on('unlink', reload).on('change', reload);
        server.httpServer?.once('close', () => {
          server.watcher.off('add', reload).off('unlink', reload).off('change', reload);
        });
      },
    }],
    define: {
      __PAINTING_FILES__: JSON.stringify(readdirSync(new URL('./public/paintings/', import.meta.url))),
      __PAINTING_IMAGES__: JSON.stringify(paintingImages),
    },
  },
});
