import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../public/paintings/', import.meta.url));
const output = fileURLToPath(new URL('../public/generated/paintings/', import.meta.url));

/** Create responsive previews without changing original artworks or gallery discovery. */
export async function preparePaintingImages() {
  await mkdir(output, { recursive: true });
  const files = (await readdir(source)).filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file));
  const manifest = {};
  for (const file of files) {
    const bytes = await readFile(join(source, file));
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const metadata = await sharp(bytes).metadata();
    const rotated = metadata.orientation && metadata.orientation >= 5;
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    if (!width || !height) throw new Error(`Cannot read image dimensions: ${file}`);
    const widths = [...new Set([320, 640, 960].map(size => Math.min(size, width)))];
    const variants = [];
    for (const size of widths) {
      const filename = `${hash}-${size}-q78.webp`;
      const destination = join(output, filename);
      try { await access(destination); }
      catch { await sharp(bytes).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 78 }).toFile(destination); }
      variants.push({ url: `/generated/paintings/${filename}`, width: size });
    }
    manifest[file] = { width, height, src: variants[Math.min(1, variants.length - 1)].url, srcset: variants.map(item => `${item.url} ${item.width}w`).join(', ') };
  }
  const manifestPath = join(output, 'manifest.json');
  const json = JSON.stringify(manifest);
  let previous;
  try { previous = await readFile(manifestPath, 'utf8'); } catch {}
  if (previous !== json) await writeFile(manifestPath, json);
  return manifest;
}
