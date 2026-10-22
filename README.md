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

## Future TideCloak integration

Authentication is deliberately dormant. The original app's active TideCloak provider and SDK dependency have been removed so this prototype works independently.

When adding TideCloak, introduce the identity provider at `src/main.jsx`. Keep identity and authorization outside the visual components, and replace the current anonymous browser progress with account-scoped persistence. Existing local progress is not an authorization boundary and is not shared across devices. The retained `public/silent-check-sso.html` is an unused scaffold asset from the original repository.

## Verification

The production build was checked. Desktop and mobile browser checks covered image loading, search and filters, quiz feedback, native dialog focus, completion persistence and undo, orbit controls, mobile menu navigation, malformed stored progress, blocked storage, and layout at 320 px. Review captures and local verification scripts are under the ignored `.impeccable/review/` and `.impeccable/*.cjs` paths.
"# ASL" 
"# ASL" 
