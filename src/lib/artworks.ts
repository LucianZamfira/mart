import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import metadata from '../data/artworks.json';

export type Language = 'ro' | 'en';
export interface Translation { ro: string; en: string }
export interface ArtworkMetadata {
  file: string;
  title?: Translation;
  technique?: Translation;
  collection?: Translation;
}
export interface Artwork {
  image: string;
  title: string;
  technique: string;
  collection: string;
}
const entries: ArtworkMetadata[] = metadata;
export function getArtworks(lang: Language): Artwork[] {
  return readdirSync(resolve(process.cwd(), 'public/paintings'))
    .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map(file => {
      const item = entries.find(entry => entry.file === file);
      return {
        image: `/paintings/${encodeURIComponent(file)}`,
        title: item?.title?.[lang] || file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        technique: item?.technique?.[lang] || (lang === 'ro' ? 'Tehnică nespecificată' : 'Unspecified technique'),
        collection: item?.collection?.[lang] || (lang === 'ro' ? 'Atelier' : 'Studio'),
      };
    });
}
