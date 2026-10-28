import metadata from '../data/artworks.json';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type Language = 'ro' | 'en';
export interface Translation { ro: string; en: string }
export interface ArtworkMetadata {
  file: string;
  slug?: string;
  description?: Translation;
  title?: Translation;
  technique?: Translation;
  collection?: Translation;
}
export interface Artwork {
  slug: string;
  url: string;
  description?: string;
  image: string;
  preview: { width: number; height: number; src: string; srcset: string };
  title: string;
  technique: string;
  collection: string;
}
const entries: ArtworkMetadata[] = metadata;
const imageStem = (file: string): string => file.replace(/\.(jpe?g|png|webp|avif)$/i, '');

export function paintingPreview(file: string) {
  const images: typeof __PAINTING_IMAGES__ = import.meta.env.DEV
    ? JSON.parse(readFileSync(resolve(process.cwd(), 'public/generated/paintings/manifest.json'), 'utf8'))
    : __PAINTING_IMAGES__;
  return images[file];
}

function paintingFiles(): string[] {
  return import.meta.env.DEV
    ? readdirSync(resolve(process.cwd(), 'public/paintings'))
    : __PAINTING_FILES__;
}

/** Resolve a painting by its filename, with or without an image extension. */
export function paintingImage(name: string): string | undefined {
  const files = paintingFiles();
  const file = files.find(file => file === name)
    || files.find(file => /\.(jpe?g|png|webp|avif)$/i.test(file) && imageStem(file) === imageStem(name));
  return file ? `/paintings/${encodeURIComponent(file)}` : undefined;
}

export function getArtworks(lang: Language): Artwork[] {
  return [...paintingFiles()]
    .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .filter(file => !/^animated-paint\./i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map(file => {
      const item = entries.find(entry => entry.file === file)
        || entries.find(entry => imageStem(entry.file) === imageStem(file));
      const slug = item?.slug || file.replace(/\.[^.]+$/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return {
        slug,
        url: artworkUrl(slug, lang),
        description: item?.description?.[lang]?.trim().replace(/^[.\s…]+$/, '') || undefined,
        image: `/paintings/${encodeURIComponent(file)}`,
        preview: paintingPreview(file),
        title: item?.title?.[lang] || file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        technique: item?.technique?.[lang] || (lang === 'ro' ? 'Tehnică nespecificată' : 'Unspecified technique'),
        collection: item?.collection?.[lang] || (lang === 'ro' ? 'Atelier' : 'Studio'),
      };
    });
}

export function artworkUrl(slug: string, lang: Language): string {
  return lang === 'ro' ? `/lucrari/${slug}/` : `/en/artworks/${slug}/`;
}
