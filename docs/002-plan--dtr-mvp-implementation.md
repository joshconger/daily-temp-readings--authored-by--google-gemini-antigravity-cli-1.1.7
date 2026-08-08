# Implementation Plan: DTR Template Generator MVP

## Goal
Build a single-page web app that generates a daily, copy-ready DTR (Daily Temperature Reading) template based on Virginia Satir's 5-component framework. The page auto-highlights one section per day on a rotating basis, follows the user's OS dark/light mode preference, and has a playful, social visual tone.

**Source spec:** [02-dtr-mvp-product-spec.md](file:///Users/joshconger/repos/daily-temp-readings--authored-by--google-gemini-antigravity-cli-1.1.7/02-dtr-mvp-product-spec.md)

---

## User Review Required

> [!IMPORTANT]
> **No framework — plain HTML/CSS/JS.** Since this is a zero-backend, single-page template generator, I recommend building it with vanilla HTML, CSS, and JavaScript. No React, no Vite, no build step. You can open `index.html` directly in a browser or serve it with any static host. Does this approach work for you?

> [!NOTE]
> **Google Fonts dependency.** The plan uses the **Inter** font loaded from Google Fonts for a modern, clean feel. This requires an internet connection on first load (it will be cached after that).

---

## Open Questions

None — all design decisions were resolved during the `/grill-me` session.

---

## Proposed Changes

### File Structure

```
daily-temp-readings--authored-by--google-gemini-antigravity-cli-1.1.7/
├── index.html                 [NEW] — Main HTML page
├── style.css                  [NEW] — All styles (design system + components)
└── app.js                     [NEW] — All logic (date rotation, copy, interactions)
```

---

### Design System — `style.css`

#### Color Palette & Theming

Two themes using CSS custom properties on `:root` and `@media (prefers-color-scheme: dark)`:

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--bg-primary` | `#FAFAF9` (warm white) | `#1A1A2E` (deep navy) |
| `--bg-card` | `#FFFFFF` | `#16213E` |
| `--text-primary` | `#1A1A2E` | `#F0F0F0` |
| `--text-secondary` | `#6B7280` | `#9CA3AF` |
| `--border` | `#E5E7EB` | `#2D3748` |
| `--shadow` | soft warm shadow | subtle glow |

#### Section Accent Colors (one per DTR category)

Each of the 5 DTR sections gets its own vibrant accent color, used for the card border, icon, and highlight state:

| Section | Color | Emoji |
|---|---|---|
| Appreciations | `#F59E0B` (amber) | 🙏 |
| New Information | `#3B82F6` (blue) | 💬 |
| Puzzles | `#8B5CF6` (purple) | 🧩 |
| Complaints w/ Recs | `#EF4444` (coral red) | 🔧 |
| Wishes & Dreams | `#10B981` (emerald) | ✨ |

#### Typography
- **Font:** Inter (Google Fonts), fallback to system sans-serif
- **Heading:** 2rem bold, letter-spacing -0.02em
- **Body:** 1rem, line-height 1.6

#### Key CSS Features
- `prefers-color-scheme` media query for auto dark/light mode
- CSS transitions on card hover/focus for micro-animations
- A subtle scale + glow effect on the "featured" card
- Responsive layout: single column on mobile, centered max-width ~640px container

---

### HTML Structure — `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Daily Temperature Reading — a playful journaling template for couples, friends, and groups based on Virginia Satir's 5-component framework.">
  <title>Daily Temperature Reading ✨</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main id="app">
    <header>
      <h1>Daily Temperature Reading</h1>
      <p id="date-display"><!-- Today's date, e.g. "Friday, August 8" --></p>
      <p id="focus-label"><!-- e.g. "Today's focus: 🙏 Appreciations" --></p>
    </header>

    <section id="dtr-cards">
      <!-- 5 DTR cards rendered by JS -->
    </section>

    <div id="copy-section">
      <button id="copy-btn">📋 Copy Template</button>
      <span id="copy-feedback" aria-live="polite"></span>
    </div>

    <footer>
      <p>Based on Virginia Satir's Daily Temperature Reading</p>
    </footer>
  </main>
  <script src="app.js"></script>
</body>
</html>
```

Each DTR card will have this structure (rendered by JS):

```html
<article class="dtr-card" data-section="appreciations" id="card-appreciations">
  <div class="card-header">
    <span class="card-emoji">🙏</span>
    <h2 class="card-title">Appreciations</h2>
    <span class="featured-badge">Today's Focus</span> <!-- only on featured card -->
  </div>
  <p class="card-description">Express genuine gratitude...</p>
  <p class="card-prompt">"What's something your person did recently that made you smile?"</p>
</article>
```

---

### Application Logic — `app.js`

#### Data Model

```javascript
const DTR_SECTIONS = [
  {
    id: "appreciations",
    emoji: "🙏",
    title: "Appreciations",
    description: "Express genuine gratitude for something your partner or friend has done, or a quality you admire in them.",
    prompts: [
      "What's something your person did recently that made you smile?",
      "What quality in them are you most grateful for today?",
      "When did they show up for you in a way that mattered?"
    ]
  },
  {
    id: "new-information",
    emoji: "💬",
    title: "New Information",
    description: "Share updates about your life, thoughts, or daily experiences to keep each other in the loop.",
    prompts: [
      "What's something new going on in your life right now?",
      "What's been on your mind lately?",
      "Is there anything you've been meaning to share?"
    ]
  },
  {
    id: "puzzles",
    emoji: "🧩",
    title: "Puzzles",
    description: "Ask questions or clarify things that seem confusing, unclear, or mysterious.",
    prompts: [
      "Is there anything you've been curious or confused about?",
      "What's something you'd like to understand better?",
      "Any assumptions you'd like to check?"
    ]
  },
  {
    id: "complaints-with-recs",
    emoji: "🔧",
    title: "Complaints with Recommendations",
    description: "Voice a concern paired with a constructive suggestion for change.",
    prompts: [
      "What's one thing that's been bugging you — and what would help?",
      "Is there a pattern you'd like to change? What would you suggest instead?",
      "What's one small adjustment that would make a big difference?"
    ]
  },
  {
    id: "wishes-hopes-dreams",
    emoji: "✨",
    title: "Wishes, Hopes & Dreams",
    description: "Share personal or shared aspirations, desires, or future goals.",
    prompts: [
      "What's something you're looking forward to?",
      "If you could wish for one thing right now, what would it be?",
      "What's a dream you'd love to explore together?"
    ]
  }
];
```

#### Date-Based Rotation Logic

```javascript
function getTodaysFocusIndex() {
  const today = new Date();
  // Day of year modulo 5 gives a rotating index
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return dayOfYear % DTR_SECTIONS.length;
}
```

This ensures a deterministic, daily rotation through all 5 sections. Both partners will see the same featured section on the same day.

#### Copy-to-Clipboard Logic

Generates a plain-text formatted template and copies it:

```javascript
function generateTemplate() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
  const focusIdx = getTodaysFocusIndex();

  let template = `📋 Daily Temperature Reading — ${dateStr}\n`;
  template += `Today's Focus: ${DTR_SECTIONS[focusIdx].emoji} ${DTR_SECTIONS[focusIdx].title}\n`;
  template += `${'─'.repeat(40)}\n\n`;

  DTR_SECTIONS.forEach((section, i) => {
    const star = i === focusIdx ? ' ⭐' : '';
    template += `${section.emoji} ${section.title}${star}\n`;
    template += `${section.prompts[0]}\n`;
    template += `Your response: \n\n`;
  });

  return template;
}

async function copyTemplate() {
  const template = generateTemplate();
  await navigator.clipboard.writeText(template);
  // Show "Copied!" feedback with animation
}
```

#### Render Logic

- On page load: determine today's focus, render all 5 cards, highlight the featured one
- Attach click handler to copy button
- Show animated "Copied! ✅" feedback that fades after 2 seconds

---

### Micro-Animations & Polish

| Element | Animation |
|---|---|
| Featured card | Subtle pulse glow + scale(1.02) on load | 
| All cards | `transform: translateY(-2px)` + shadow lift on hover |
| Copy button | Gradient background, scale bounce on click |
| "Copied!" feedback | Fade-in, hold 2s, fade-out |
| Page load | Cards stagger-animate in from below (0.1s delay each) |

---

## Verification Plan

### Automated Tests
No automated tests for this MVP — it's 3 static files with no build step.

### Manual Verification

1. **Open `index.html` in a browser** — verify the page loads with all 5 DTR cards
2. **Check featured section** — confirm one card is highlighted and the focus label at the top matches
3. **Dark mode** — toggle OS appearance settings and verify the theme switches correctly
4. **Copy button** — click "Copy Template", paste into a text editor, verify the formatted template is correct
5. **Mobile responsive** — resize browser to phone width, verify single-column layout looks good
6. **Cross-day rotation** — verify that the featured section changes by checking the `dayOfYear % 5` logic manually
7. **Serve locally** — optionally run `python3 -m http.server 8000` and test at `localhost:8000`

---

## Implementation Order

1. **Create `style.css`** — full design system with both light/dark themes, card styles, animations
2. **Create `index.html`** — semantic HTML shell with proper meta tags and linked assets
3. **Create `app.js`** — data model, date rotation, card rendering, copy logic, animations
4. **Test & polish** — open in browser, verify all features, adjust animations
