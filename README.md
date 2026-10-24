# MART Gallery

Astro website for Marian's paintings, with static homepages and on-demand artwork detail pages on Netlify. Romanian is available at `/` and English at `/en/`. The hero displays artwork photographs in a decorative circular composition. Artist copy is provisional.

## Logo

The logo has a Didone serif style, similar to **Didot** or **Bodoni**, with strong contrast between thick and thin strokes. These are stylistic references, not an identification of the exact font used in the generated concept.

The production logo, `public/images/mart-monogram.svg`, was traced from the approved image. Its lettering consists of vector outlines and does not depend on an installed or web-loaded font.

## Development

Use Node.js 24. Run `npm ci`, then `npm start` (or `npm run dev`). Open `http://localhost:4321`. Changes reload automatically; press Ctrl+C to stop the server. Run `npm run check` and `npm run build` before publishing. Use `npm start` for local development, including SSR routes. Netlify packages the production SSR handler through the official adapter.

## Add paintings

Put JPG, PNG, WebP or AVIF files directly in `public/paintings/`, then commit and push. They are discovered automatically at build time. Use reasonably sized, web-optimized images; files in public are served unchanged. Without metadata, the filename becomes the title, the technique is unspecified and the collection is Studio.

Copy entries from `src/data/artworks.example.json` into `src/data/artworks.json` to supply bilingual titles, techniques and collections. The `file` field can contain the filename with or without its image extension. Metadata also matches by filename stem when an image changes from PNG/JPG to WebP/AVIF; keep the stem unchanged. The example is a fixture only and is never displayed. Both filters are combined. Missing photographs produce an intentional empty state.

## Components

`src/components/flex/ArtworkCard.astro` accepts a typed `Artwork` object from `src/lib/artworks.ts` and maps it to the Lit UI card. `src/components/ui/ArtworkCard/index.js` is independent of the content schema and Astro. Its slots are `image` (an image with alt text), `title` (plain text) and `details` (plain text). Its optional `href` property makes the card a keyboard-accessible link. It has no custom events. Its styling hooks are `--paper` and `--muted`. Light DOM slot content remains available before JavaScript loads.

## Netlify

Connect GitHub repository `LucianZamfira/mart` and choose production branch `main`. Keep base directory empty. `netlify.toml` configures `npm run build`, output `dist` and Node.js 24. Each push to main triggers a production deploy when continuous deployment is enabled.

Enable form detection in Netlify Forms, then redeploy if necessary. Both languages submit the same `contact` form with a language field, a honeypot and a localized success page. In Netlify's form notification settings, add an email notification to `zbarcea2003@yahoo.com`. The public email link does not configure notifications automatically. Test a submission on the deployed site; plain Astro development does not process Netlify Forms. No email delivery has been verified locally.

The public contact email is in `src/components/Home.astro`. Phone and Instagram are omitted until provided. No analytics or external fonts are loaded.

## Artwork detail pages

One `[slug].astro` route per language renders artwork pages on demand: `/lucrari/[slug]/` and `/en/artworks/[slug]/`. Both export `prerender = false`; the remaining pages stay static. The official `@astrojs/netlify` adapter builds a serverless handler. Unknown slugs return HTTP 404.

Each metadata entry may include a stable `slug` and bilingual `description`. Keep slugs lowercase with hyphens and unique across works. Without an explicit slug, the image filename supplies it. Descriptions are editorial copy, not biographical claims. No dimensions, price, year or availability are assumed.

The build embeds a filename manifest from `public/paintings` into the server bundle; production requests do not read the deployment filesystem. New images or JSON edits still require a deploy. Restart local development after adding image files to refresh the manifest.

The detail page includes an image dialog (Escape closes it), localized previous/next navigation and a contact link. The latter prefills the homepage message with the artwork title, leaving the visitor to submit it manually.
