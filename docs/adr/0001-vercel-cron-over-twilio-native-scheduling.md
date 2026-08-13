# Vercel Cron over Twilio Native Scheduling for daily SMS

We chose Vercel Cron Jobs (a serverless function triggered on a UTC cron schedule) over Twilio's built-in Message Scheduling API (`send_at` parameter) to deliver the daily focused prompt via SMS.

Twilio native scheduling eliminates the need for hosted compute — you pass a `send_at` timestamp and Twilio holds the message. But it still requires *something* to make the API call (a local script, a cron on your machine, or a serverless function), so it doesn't actually remove the scheduler — it just splits it across two systems. It also mandates a Messaging Service SID (not a plain `From` number), adding a setup step.

Vercel Cron keeps the scheduling and sending in one place: the cron triggers the function, the function calls Twilio to send immediately. One system, one deploy, and the same Vercel project already hosts the static web app.

## Considered Options

- **Twilio Native Scheduling** — no hosted compute for the send, but still needs a trigger to schedule each message. Requires Messaging Service SID setup. Splits the "when" (Twilio) from the "what" (your code).
- **Cloudflare Workers Cron** — comparable simplicity, slightly more flexible scheduling, but adds a second platform when Vercel already hosts the web app.
- **Azure Functions Timer Trigger** — viable in JS or .NET, but 4–5 CLI commands to deploy vs. Vercel's one. Requires Azure account with credit card.
