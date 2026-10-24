# MART Gallery

Static Astro website for Marian's paintings. Romanian is available at `/` and English at `/en/`. The hero uses a decorative CSS composition, not an artwork attributed to the artist. Artist copy is provisional.

## Development

Use Node.js 24. Run `npm ci`, then `npm start` (or `npm run dev`). Open `http://localhost:4321`. Changes reload automatically; press Ctrl+C to stop the server. Run `npm run check` and `npm run build` before publishing. `npm run preview` serves the production build.

## Add paintings

Put JPG, PNG, WebP or AVIF files directly in `public/paintings/`, then commit and push. They are discovered automatically at build time. Use reasonably sized, web-optimized images; files in public are served unchanged. Without metadata, the filename becomes the title, the technique is unspecified and the collection is Studio.

Copy entries from `src/data/artworks.example.json` into `src/data/artworks.json` to supply bilingual titles, techniques and collections. The `file` field must exactly match the image filename, including its extension. The example is a fixture only and is never displayed. Both filters are combined. Missing photographs produce an intentional empty state.

## Components

`src/components/flex/ArtworkCard.astro` accepts a typed `Artwork` object from `src/lib/artworks.ts` and maps it to the Lit UI card. `src/components/ui/ArtworkCard/index.js` is independent of the content schema and Astro. Its slots are `image` (an image with alt text), `title` (plain text) and `details` (plain text). It has no custom properties or events. Its styling hooks are `--paper` and `--muted`. Light DOM slot content remains available before JavaScript loads.

## Netlify

Connect GitHub repository `LucianZamfira/mart` and choose production branch `main`. Keep base directory empty. `netlify.toml` configures `npm run build`, output `dist` and Node.js 24. Each push to main triggers a production deploy when continuous deployment is enabled.

Enable form detection in Netlify Forms, then redeploy if necessary. Both languages submit the same `contact` form with a language field, a honeypot and a localized success page. In Netlify's form notification settings, add an email notification to `zbarcea2003@yahoo.com`. The public email link does not configure notifications automatically. Test a submission on the deployed site; plain Astro development does not process Netlify Forms. No email delivery has been verified locally.

The public contact email is in `src/components/Home.astro`. Phone and Instagram are omitted until provided. No analytics or external fonts are loaded.
