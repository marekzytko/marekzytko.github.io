# Finanse Polski 2026

Interaktywna strona z wykresem Sankey finansów publicznych Polski.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Build pod GitHub Pages

1. W `next.config.js` ustaw `basePath` jeśli repo nie jest w root domeny (np. `/nazwa-repo`).

2. Build:
```bash
npm run build
```

3. Pliki statyczne są w `out/`.

4. Wypchnij `out/` do brancha `gh-pages` albo ustaw GitHub Pages na folder `out` z brancha `main`.

### Przykład z basePath

Jeśli strona ma być pod `https://user.github.io/finanse-polski/`:

```bash
NEXT_PUBLIC_BASE_PATH=/finanse-polski npm run build
```

I w `next.config.js` `basePath` zostanie ustawiony automatycznie.
