import metadata from '../data/artworks.json';

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
  title: string;
  technique: string;
  collection: string;
}
const entries: ArtworkMetadata[] = metadata;
export function getArtworks(lang: Language): Artwork[] {
  return [...__PAINTING_FILES__]
    .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map(file => {
      const item = entries.find(entry => entry.file === file);
      const slug = item?.slug || file.replace(/\.[^.]+$/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return {
        slug,
        url: artworkUrl(slug, lang),
        description: item?.description?.[lang],
        image: `/paintings/${encodeURIComponent(file)}`,
        title: item?.title?.[lang] || file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        technique: item?.technique?.[lang] || (lang === 'ro' ? 'Tehnică nespecificată' : 'Unspecified technique'),
        collection: item?.collection?.[lang] || (lang === 'ro' ? 'Atelier' : 'Studio'),
      };
    });
}

export function artworkUrl(slug: string, lang: Language): string {
  return lang === 'ro' ? `/lucrari/${slug}/` : `/en/artworks/${slug}/`;
}
