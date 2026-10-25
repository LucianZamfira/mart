# Audit SEO — MART Gallery

Data: 25 octombrie 2026. Domeniu verificat: https://mart-gallery.netlify.app/.

## Rezultatele verificării publice

Au fost verificate prin cereri HTTP toate cele 20 de URL-uri din sitemap: 2 homepage-uri și 9 lucrări în două limbi. Toate răspund cu 200, fără directive `noindex` în HTML sau în antetul `X-Robots-Tag`. `robots.txt` permite accesul și indică sitemap-ul; XML-ul este accesibil. Un slug inexistent verificat răspunde cu 404. Rutele lucrărilor livrează conținut HTML de pe server.

Aceste verificări arată că paginile sunt accesibile tehnic. Nu confirmă dacă Google le-a indexat: pentru motivul exact al neindexării trebuie consultată proprietatea site-ului în Google Search Console. Un scor Lighthouse de 92 verifică doar o parte dintre condițiile tehnice; nu reprezintă o măsurare a poziției sau a indexării.

## Probleme și remedieri locale

| Prioritate | Constatare pe versiunea publică | Remediere pregătită |
| --- | --- | --- |
| Ridicată | Hreflang relativ pe homepage și paginile lucrărilor | URL-uri absolute, reciproce RO/EN, inclusiv x-default |
| Ridicată | Zero linkuri `<a href="/lucrari/…">` în HTML-ul inițial al galeriei; acestea erau construite de Lit | Toate cele 9 linkuri sunt acum livrate în HTML, înainte de JavaScript |
| Medie | Lipsesc canonical-urile | Canonical propriu pe fiecare pagină indexabilă și limbă; fără parametrii formularului |
| Medie | 5 lucrări au descrieri „...” | Placeholder-ul nu mai este afișat; meta description primește un rezumat factual. Textul editorial rămâne de completat de proprietar |
| Medie | Descrierea homepage-ului nu identifica complet artistul | Descriere bilingvă cu numele complet și subiectele colecției |
| Suplimentară | Lipsesc metadatele de distribuire și datele structurate | Open Graph/Twitter; CollectionPage cu ItemList, respectiv VisualArtwork, fără prețuri, recenzii sau date inventate |

Modificările locale nu schimbă site-ul public până la deploy. Nu a fost publicat un nou scor Lighthouse și nu a fost efectuată o solicitare de indexare în contul Google.

## Validare după remedieri

- `npm run check`: fără erori sau avertismente.
- `npm run build`: finalizat cu adaptorul Netlify.
- Toate cele 20 de URL-uri locale: HTTP 200, canonical corect, trei hreflang-uri absolute, descriere nenulă și JSON-LD valid ca JSON.
- HTML homepage: 9 linkuri reale către lucrări.
- Slug inexistent RO și EN: HTTP 404.
- Browser: încărcare de la 6 la 9 lucrări, filtrare la 2 păsări și precompletarea mesajului funcționează.

## Pași pentru proprietar, după deploy

1. În Google Search Console adaugă o proprietate de tip **URL prefix**: `https://mart-gallery.netlify.app/`. Pentru subdomeniul Netlify, verificarea se poate face prin fișierul HTML oferit de Google sau prin meta tag. Proprietatea Domain ar necesita control DNS pe domeniul părinte.
2. Adaugă fișierul/tokenul de verificare oferit pentru această proprietate și finalizează verificarea. Tokenul nu trebuie inventat sau reutilizat de la alt site.
3. În **Sitemaps**, trimite `https://mart-gallery.netlify.app/sitemap.xml`.
4. În **URL Inspection**, testează live homepage-ul și o lucrare, verifică accesul și canonical-ul detectat, apoi folosește **Request indexing** dacă este disponibil.
5. Urmărește **Page indexing**. „Discovered – currently not indexed” și „Crawled – currently not indexed” cer acțiuni diferite; folosește motivul efectiv afișat de Google.
6. Completează cele cinci descrieri lipsă cu informații originale și corecte. Adaugă o prezentare a artistului bazată pe date confirmate și un link spre galerie în profilul său Instagram. Nu inventa dimensiuni, ani, premii sau disponibilitate.

Indexabilitatea nu garantează indexarea sau apariția pentru cuvinte cheie competitive. Nu este necesar un hosting Node.js diferit pentru a permite indexarea. Verificarea Search Console și calitatea conținutului rămân importante după corecțiile tehnice. Performanța/Core Web Vitals nu a fost măsurată în acest audit; imaginile au încă atribute de dimensiune generice, de verificat separat pentru stabilitatea vizuală.

## Referințe

- [Google: versiuni localizate și hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: linkuri accesibile crawlerelor](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: trimiterea sitemap-ului](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
