# Nihar Portfolio

A Next.js portfolio showcasing interactive UI, including a physics-based 3D lanyard card built with React Three Fiber.

## Requirements

- Node.js 18+
- npm (recommended)

## Install & Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — run production build
- `npm run lint` — run Next.js ESLint

## Lanyard 3D Card

The interactive lanyard card is rendered by `src/components/sections/Interactive3DCard.tsx`. It uses `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, and `three`.

### Assets

Place assets under `public/assets/lanyard/`:

- `card.glb` — GLB model for the badge and clip
- `lanyard.png` — strap texture (optional). If missing, a generated band texture is used.

### Usage

The component is mounted in `src/app/page.tsx` left column. You can adjust camera and physics by editing props in `Interactive3DCard`:

- `position` — camera position, tuple `[x, y, z]`
- `gravity` — world gravity, tuple `[x, y, z]`
- `fov` — camera field of view
- `transparent` — canvas background transparency

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Radix UI
- React Three Fiber / Drei / Rapier

## Notes

- Static files are served from `public/`. Reference them with absolute paths like `/assets/lanyard/card.glb`.
- If assets are not present, the lanyard falls back to a rounded card, hook, and non-textured strap so the page remains functional.