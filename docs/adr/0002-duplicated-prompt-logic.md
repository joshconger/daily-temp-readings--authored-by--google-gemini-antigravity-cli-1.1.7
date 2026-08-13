# Duplicated prompt logic over shared module

The SMS cron function (`api/cron.js`) duplicates the 5 DTR prompt strings and the `dayOfYear % 5` rotation formula rather than importing them from a shared module with the web app's `app.js`.

At this scale (5 strings and one line of math), extracting a shared module would add a build/bundling step to a project that currently has none. Vercel's serverless functions and the static web app have different execution environments — sharing code between them means either a build tool or a symlink hack. The duplication is ~10 lines and changes almost never (the DTR framework is fixed at 5 sections). If the prompt bank grows or rotation logic gets complex, extract then.

## Consequences

- Two places to update if prompt text changes. Acceptable because the 5 DTR sections are a stable, well-known framework unlikely to change.
