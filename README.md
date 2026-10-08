# Pani Thiru Mozhi – Cinematic Interactive Birthday Experience 🦋✨

A world-class, emotionally engaging, magical interactive birthday website built with React 19, TypeScript, Three.js, React Three Fiber, GSAP, Framer Motion, and Tailwind CSS.

---

## 🌟 Highlights & Features

1. **Cocoon Loading Hatching Animation**: A swaying branch holding a glowing cocoon that gently opens to release a golden 3D butterfly flying towards the camera.
2. **Interactive Story Chapters**:
   - **Page 1 - Intro**: Soft pink fantasy sky with moving clouds, glowing particles, and "Begin the Journey" button that triggers a landing butterfly and petal burst transition.
   - **Page 2 - 3D Butterfly Tree & Hero Name**: Huge display typography for "HAPPY BIRTHDAY MY DEAR PANI THIRU MOZHI" alongside a 3D fantasy tree where every leaf is replaced by animated, wing-flapping butterflies that react to clicks.
   - **Page 5 - Royal Unfolding Envelope**: Elegant floating envelope with a gold wax seal that breaks to unfold a handwritten parchment message.
   - **Page 6 - Interactive Celebration Cake**: Multi-tiered cake with flame controls, confetti cannons, fireworks, and sound effects.
   - **Page 7 - Celestial Night Sky Swarm**: Thousands of butterflies aligning in the night sky to spell out "Happy Birthday" and "Pani Thiru Mozhi" before dispersing into stardust.
3. **Surprising Extra Features**:
   - Web Audio API music-box piano synthesizer & magical sound effects (chimes, sparkles, fireworks, breezes).
   - Butterfly cursor follower & floating interactive petals.
   - Chapter progress bar with moving butterfly timeline indicator and quick chapter jump menu.
   - Central configuration file at `src/config/birthdayConfig.ts`.

---

## ⚙️ Central Configuration (`src/config/birthdayConfig.ts`)

Easily customize the recipient name, photos, birthday message, wishes, colors, and audio without touching application logic:

```typescript
export const BIRTHDAY_CONFIG = {
  recipient: {
    name: "Pani Thiru Mozhi",
    shortName: "Mozhi",
  },
  letter: {
    title: "Happy Birthday 🎉",
    subtitle: "My Dear Pani Thiru Mozhi 🌸",
    paragraphs: [...],
  },
  photos: [...],
  wishes: [...],
  butterflyColors: [...],
};
```

---

## 🚀 Deployment Instructions

### Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/your-repo-name/'`.
2. Run `npm run build`.
3. Push the contents of the `dist` folder to your `gh-pages` branch.
