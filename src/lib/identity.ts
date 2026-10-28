import type { Language } from './artworks';

export function artistIdentity(site: URL, lang: Language) {
  return {
    '@type': 'Person',
    '@id': new URL('/#artist', site).href,
    name: 'Marian Preoteșescu',
    url: new URL('/despre-artist/', site).href,
    image: new URL('/images/marian-preotesescu-avatar.png', site).href,
    jobTitle: lang === 'ro' ? 'Pictor' : 'Painter',
    description: lang === 'ro' ? 'Pictor român din Ilfov, autorul lucrărilor din MART Gallery.' : 'Romanian painter from Ilfov, creator of the works at MART Gallery.',
    sameAs: ['https://www.instagram.com/marianpreo'],
  };
}
