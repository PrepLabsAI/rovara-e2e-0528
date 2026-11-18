# e2e-notes-service

A tiny, generic notes service used only as a test fixture. It contains fake, non-sensitive code and no real data.

## What is in it

- `src/dates.ts`: `formatDate` formats a date as `Jan 5, 2026` (UTC).
- `src/notes.ts`: `slugify`, `wordCount` and `summarize` for notes.
- `src/store.ts`: `NoteStore`, a small Postgres-backed store (`init`, `add`, `get`).

## Develop

Node 22.

```sh
npm install
npm run lint
npm test
```

The Postgres test in `tests/store.test.ts` reads `DATABASE_URL` and skips cleanly when it is unset. To run it locally:

```sh
docker run --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=test postgres:16
DATABASE_URL=postgres://postgres:test@localhost:5432/postgres npm test
```

## CI

`.github/workflows/ci.yml` runs lint and the tests on every push to `main` and on pull requests, with a Postgres 16 service and `DATABASE_URL` set.
