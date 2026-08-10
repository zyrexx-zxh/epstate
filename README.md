# Epstate

Dark, cinematic single-page portfolio for Epstate — built with Next.js, React
Three Fiber, GSAP ScrollTrigger, Lenis, and Motion (the current name for
Framer Motion).

## What's inside

- **Preloader** — animated 0→100% counter, slides away to reveal the hero
- **Hero** — WebGL particle field (React Three Fiber) behind a massive wordmark
- **Manifesto** — word-by-word scroll-scrubbed text reveal (GSAP ScrollTrigger)
- **Services** — asymmetric 4-card grid with scroll parallax and hover-revealed
  tech tags
- **Marquee** — infinite outlined-text ticker
- **Footer** — glass CTA button + magnetic contact links

Everything is TypeScript, styled with Tailwind CSS v4, and respects
`prefers-reduced-motion` throughout — the smooth scroll, particle drift,
marquee, and magnetic links all fall back to stillness/native scroll if that's
set on the visitor's device.

## One important note

This sandbox has no network access, so I was never able to run
`npm install` or `next build` against the real packages — I checked every
file with the TypeScript compiler using stub type declarations, which catches
syntax mistakes but isn't the same as a real build. **The first thing to do
is run a build and see what happens.** If Render's build log throws an
error, paste it back to me and I'll fix it right away.

## Getting this deployed from your phone

You don't need Node.js on your device for this — Render builds the project
on its own servers from a GitHub repo. You just need to get these files
into a repo.

**Fastest path:**
1. Unzip this on your phone (most Android file managers can extract a zip
   directly).
2. Open github.com in your browser, create a new repository.
3. Use "Add file → Upload files" and select all the extracted files/folders
   (your file manager's picker should allow multi-select). Commit.
4. In Render, create a new **Web Service** and connect that repo.
5. Build command: `npm install && npm run build`. Start command: `npm start`.
6. Deploy.

**More control:** installing Termux (from F-Droid) gives you a real terminal
with `git` and `node` on-device — `pkg install nodejs git`, then `git init`,
`git add`, `git commit`, `git push` straight from the phone. That also lets
you run `npm install && npm run build` locally first, so build errors show up
before Render ever sees them.

## Before you ship it

A couple of placeholders worth confirming:
- The CTA and Telegram link point to `https://t.me/epstate` — update it if
  that's not the exact handle you want linked.
- The email link (`hello@epstate.dev`) is a placeholder — point it at
  whichever inbox should actually receive quote requests.

## Local development (optional, if you ever have a machine or use Termux)

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
