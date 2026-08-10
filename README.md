# Fleet Manager (front end)

Vue 3 + Vite SPA for the Regira Fleet Manager demo — manage vehicles, interventions, suppliers, and statistics on top of the [RegiraFleet-Backend](https://github.com/Regira/RegiraFleet-Backend) API, built with the [Regira packages](https://github.com/Regira/Regira-Packages).

**Live demo:** [fleet-demo.regira.com/manager/](https://fleet-demo.regira.com/manager/) — demo logins are offered on the sign-in dialog.

## Stack

- Vue 3, Vite, TypeScript
- `regira_modules` (npm dependency) — Regira's front-end utility modules and Vue components
- Runtime i18n (EN/FR/NL) via `public/data/translations.json`
- Deployed under `/manager/` (see `vite.config.ts` `base`); `public/Web.Config` provides the IIS history-mode rewrite

## Development

```sh
npm install
npm run dev        # dev server
npm run build      # type-check + production build to dist/
npm run test:unit  # Vitest
npm run lint       # ESLint
```

The API base URL per environment is configured in `public/config.json`.

## Deployment

Manual: `npm run build`, then copy `dist/` to the IIS `manager` application folder. The static landing page for the site root lives in [`landing/`](landing/) and is copied to the site root separately.
