# Quỹ đạo

A Vietnamese astronomy learning prototype for self-guided students. The 14-lesson curriculum follows the supplied course outline, from observing the sky to the Big Bang.

## Run locally

Requires a current Node.js LTS release and npm.

```sh
npm ci
npm run dev
```

Open **http://localhost:5137**. The Vite server uses that port with `strictPort` enabled.

```sh
npm run build
```

The production output is written to `dist/`. No server, account, API key, or auth configuration is needed for this version.

## Learning experience

- Fourteen illustrated lessons with the original Vietnamese titles and subtopics.
- Introductory explanations and a quick recall quiz in each lesson.
- An interactive Kepler orbit model: adjust eccentricity, play/pause, and scrub time in lesson 9.
- Topic filters and Vietnamese search with or without accents. `Ctrl+K` / `Cmd+K` focuses search.
- Completion progress saved in this browser, with undo and graceful fallback when browser storage is unavailable.
- Responsive desktop and mobile layouts, keyboard navigation, a native lesson dialog, and reduced-motion support.

These are introductory starter lessons, not a full textbook. The readings link to further information from NASA, CERN, and the US Naval Observatory. Speculative ideas such as wormholes and a multiverse are distinguished from observational findings.

## Content and assets

`src/App.jsx` contains the lesson outline and learning interface. `src/lessonContent.js` holds explanations, quiz answers, and source links. `src/OrbitLab.jsx` draws the orbit model using Kepler's equation.

Images and fonts are local assets. Scientific image credits and original source pages are in [public/images/SOURCES.md](public/images/SOURCES.md). Font licenses are included in `public/fonts/`.

Product intent is recorded in [PRODUCT.md](PRODUCT.md), and the surface brief is in [ASTRONOMY-BRIEF.md](ASTRONOMY-BRIEF.md).

## TideCloak

The app currently runs with `VITE_TIDECLOAK_MODE=mock` because the local realm has not finished Tide key provisioning. The sign-in screen supports local registration and login plus learner/instructor demo identities. Registered accounts are learners; passwords are salted and hashed before browser storage. This mode does not mint a JWT and is not a production security boundary.

To switch back after provisioning succeeds, set `VITE_TIDECLOAK_MODE=live`, register `http://localhost:5137/*` as a redirect URI and `http://localhost:5137` as a web origin, then export the adapter to `public/tidecloak.json`. `AuthRoot` reads the OIDC `sub` and realm roles; progress is scoped by `sub`, `learner` may update progress, and `instructor` may read the instructor area.

The adapter file is intentionally ignored by Git. The role checks in this Vite-only prototype are UI simulation: a production API must verify the Tide JWT, DPoP proof and required role server-side before reading or changing protected data. Browser progress remains local; cross-device synchronization needs that protected backend.

## Verification

The production build was checked. Desktop and mobile browser checks covered image loading, search and filters, quiz feedback, native dialog focus, completion persistence and undo, orbit controls, mobile menu navigation, malformed stored progress, blocked storage, and layout at 320 px. Review captures and local verification scripts are under the ignored `.impeccable/review/` and `.impeccable/*.cjs` paths.
"# ASL" 
"# ASL" 
