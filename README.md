# CC Design Demo

React-based design demo gallery for fast preview on Vercel.

## Structure

- `src/`: React app source, route definitions, page wrappers, and shared styles.
- `artifacts/reference/`: screenshots and motion references kept out of deploy payloads.
- `public/`: optional place for future static assets if routes need shared media.
- `vercel.json`: SPA rewrite config for Vercel.
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

The app now ships as one React bundle with client-side routing. All public routes are native React pages.

If you add a new demo:

1. Add a new page component under `src/pages/`.
2. Register the route in `src/data/routeConfigs.js`.
3. Link the route from the homepage component in `src/pages/HomePage.jsx`.
