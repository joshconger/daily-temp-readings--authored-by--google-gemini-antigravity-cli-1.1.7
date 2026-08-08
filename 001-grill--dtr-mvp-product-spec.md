# DTR Template Generator — MVP Summary

**Date:** August 8, 2026
**Status:** Design Complete — Ready for `/plan`

---

## Product Vision

A **Daily Temperature Reading (DTR) template generator** — a single-page web app that displays a ready-to-copy, formatted journaling template based on Virginia Satir's 5-component DTR framework. Designed to be immediately accessible and fun for anyone to use with a partner, friend, or group.

---

## Design Decisions

| Decision | Choice |
|---|---|
| **Audience** | Anyone — friends, couples, groups (social connection tool) |
| **Tone** | Playful & social — bright colors, emoji, casual language |
| **MVP Format** | Template generator — single page, no backend |
| **Template structure** | All 5 DTR sections every day, with today's featured section auto-highlighted based on the date |
| **Sharing** | Copy button (copies formatted template to clipboard) |
| **Visual theme** | Auto dark/light mode (follows OS system preference) |

---

## The 5 DTR Sections

1. **Appreciations** — Express genuine gratitude for something your partner/friend has done or a quality you admire
2. **New Information** — Share updates about your life, thoughts, or daily experiences to stay in the loop
3. **Puzzles** — Ask questions or clarify things that seem confusing or unclear
4. **Complaints with Recommendations** — Voice concerns paired with a constructive suggestion for change
5. **Wishes, Hopes & Dreams** — Share personal or shared aspirations, desires, or future goals

---

## How It Works

1. User opens the page
2. All 5 DTR sections are displayed with placeholder prompts/examples
3. One section is **auto-highlighted as today's focus** (rotates daily based on the date)
4. User taps the **Copy** button to copy the entire formatted template to their clipboard
5. User pastes the template into iMessage, WhatsApp, or any messaging app

---

## Deferred to Future Iterations

- User accounts, authentication, and groups
- Live real-time response sharing
- Emoji reactions and reply threads
- Streaks and nudges
- Weekly recap summaries
- Native Web Share API integration

---

## Next Steps

1. Run `/plan` to generate a step-by-step implementation blueprint
2. Run `/goal` to build the MVP
