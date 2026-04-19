# CC Design Demo

Static multi-page design demos for fast preview on Vercel.

## Structure

- `index.html`: landing page that links to every public demo route.
- Root `*.html` files: deployable route entrypoints resolved via Vercel `cleanUrls`.
- `pages/`: organized working copies of the same page sources.
- `deck_stage.js`: shared script used by the sketch deck page.
- `artifacts/legacy/`: original reference snapshots kept out of deploy payloads.
- `artifacts/reference/`: screenshots and motion references kept out of deploy payloads.
- `vercel.json`: static hosting config.
- `.vercelignore`: excludes local tooling and artifacts from deployment uploads.

## Public Routes

- `/`
- `/llm-sketch-ppt`
- `/enterprise-hero`
- `/sci-fi-website`
- `/tesla-3d-website`
- `/aether`
- `/mech-ops`

## Working Conventions

The root-level files are the public routes. The `pages/` directory mirrors those files so the project stays easier to scan and edit.

If you add a new demo, keep both copies in sync:

1. Add or update the source file in `pages/`.
2. Mirror the same content to the matching root-level route file.
3. Link the new route from `index.html`.
