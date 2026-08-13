# DTR SMS Daily Prompt — Design Document

**Date:** August 12, 2026
**Session Type:** `/grill-with-docs` design alignment
**Status:** Design Complete — Ready for `/plan`

---

## Summary

Add a daily SMS feature to the existing DTR Template Generator. Each morning, a Vercel Cron job sends today's focused DTR prompt to hardcoded phone numbers via the Twilio API. The SMS function and the static web app are hosted together on Vercel in a single deployment.

---

## Design Decisions

| # | Decision | Answer |
|---|---|---|
| Q1 | SMS content | Focused prompt only — short, one SMS segment |
| Q2 | Recipients | Hardcoded phone numbers in env vars |
| Q3 | Send cadence | Fixed time, once daily |
| Q4 | Platform | Vercel Cron (JavaScript) |
| Q5 | Repo structure | Same repo — `api/cron.js` alongside the web app |
| Q6 | Prompt logic | Duplicated in the SMS function |
| Q7 | Send time | 12:30 UTC (8:30 AM EDT / 7:30 AM EST) |
| Q8 | Message format | Minimal: `✨ Today's DTR: [Section] — [prompt]` |
| Q9 | Vercel scope | Hosts both the static web app AND the cron job |
| Q10 | Compliance | No opt-out footer (personal use, 2 recipients) |
| Q11 | DST handling | Pinned to 12:30 UTC — seasonal drift accepted |

---

## Architecture

```
daily-temp-readings/
├── index.html          ← static web app (DTR template generator)
├── style.css
├── app.js
├── api/
│   └── cron.js         ← Vercel cron function (sends SMS via Twilio)
├── vercel.json         ← cron schedule: "30 12 * * *"
├── package.json        ← twilio dependency
├── docs/               ← project documentation
└── README.md
```

### How it works

1. **Vercel Cron** triggers `api/cron.js` every day at 12:30 UTC.
2. `cron.js` computes today's focused DTR section using `dayOfYear % 5`.
3. `cron.js` formats the SMS: `✨ Today's DTR: [Section] — [prompt text]`
4. `cron.js` calls the Twilio API to send the SMS to each phone number in the `TO_PHONE_NUMBERS` env var.
5. Vercel also serves the static web app (`index.html`, `style.css`, `app.js`) at the project's root URL.

### Prompt rotation

The same `dayOfYear % 5` formula used in the web app's `app.js` is duplicated in `api/cron.js`. Both rotate through the 5 DTR sections in the same order:

1. Appreciations
2. New Information
3. Puzzles
4. Complaints with Recommendations
5. Wishes, Hopes & Dreams

---

## Prerequisites

| Requirement | Status |
|---|---|
| Twilio account | ✅ User has one |
| Twilio phone number | Needs to be provisioned (or confirmed existing) |
| Vercel account | Needs signup (free, no credit card) |
| Vercel CLI | `npm i -g vercel` |

### Environment Variables (set in Vercel dashboard or CLI)

| Variable | Description | Example |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | Twilio Account SID | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number (E.164) | `+1234567890` |
| `TO_PHONE_NUMBERS` | Comma-separated recipient numbers | `+1234567890,+0987654321` |

---

## Cost Estimate

| Item | Rate | Monthly (30–60 SMS) |
|---|---|---|
| Twilio US local phone number | $1.15/mo | $1.15 |
| Outbound SMS (per segment) | $0.0083 | $0.25–$0.50 |
| Carrier pass-through fees | ~$0.003–$0.005 | $0.09–$0.30 |
| Vercel hosting + cron | Free | $0.00 |
| **Total** | | **~$1.50–$1.95/mo** |

---

## Deferred to Future Iterations

- Self-service opt-in/out via SMS keywords (text JOIN / STOP)
- Per-recipient configurable send times
- Compliance footer (`Reply STOP to unsubscribe`)
- Shared prompt module between web app and SMS function
- Subscriber management (database, admin UI)
- Reply handling / two-way SMS conversations

---

## Next Steps

1. Run `/plan` to generate a step-by-step implementation blueprint
2. Build and deploy to Vercel
