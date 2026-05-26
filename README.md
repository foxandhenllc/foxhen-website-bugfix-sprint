# Website Bugfix Sprint Board

## Purpose

24-hour website bugfix sprint board with reproduction steps, responsive checks, fix logs, and acceptance criteria.

A portfolio-grade React + TypeScript mini product for a fictional 24-hour website bugfix and polish sprint. The app turns a small service offer into an interactive sprint board with local sample data only.

## Demo Narrative

This public sample shows how a focused website repair pass can be packaged for a buyer: reproduce defects, rank severity, inspect affected viewports, record fix notes, run acceptance checks, and produce a clean handoff package. Every bug, metric, note, and check is fictional.

## Key Interactions To Test

- Filter the defect list by blocker, high, medium, or low severity.
- Select different bugs to view repro steps, root cause notes, before/after metrics, and the fix timeline.
- Toggle the responsive preview between mobile, tablet, and desktop widths.
- Run the acceptance-check runner or manually tick individual QA checks.
- Review the simulated handoff package for fix log, responsive QA sheet, and memo contents.

## Service Mapping

- Offer: 24-hour website bugfix and polish pass.
- Product shape: static sprint command center with fictional defects and QA workflow.
- Proof points: local state, typed sample data, responsive layout, premium first viewport, and clear handoff framing.
- Live demo: https://foxhen-website-bugfix-sprint.vercel.app
- Repository: https://github.com/foxandhenllc/foxhen-website-bugfix-sprint

| Service moment | Demo artifact | Buyer takeaway |
| --- | --- | --- |
| Reproduce | Defect filters, repro steps, root-cause notes, and responsive preview | Shows the sprint starts with evidence, not vague polish requests. |
| Patch | Fix timeline, before/after metrics, and severity labels | Demonstrates how small fixes are prioritized and explained. |
| QA | Device selector, acceptance runner, manual checks, and progress meter | Makes verification visible before handoff. |
| Handoff | Fix log, responsive QA sheet, and memo cards | Packages the result in a buyer-friendly format. |

## SEO / AIO Discoverability

**Plain-language answer:** Use this repo to run or demonstrate a short website bugfix sprint with reproduction steps, responsive checks, fix logs, and acceptance criteria.

**Who it helps:** freelancers, agencies, and site owners who need a short website repair sprint.

**Search intents covered:**

- website bugfix sprint template
- responsive QA fix log
- 24 hour website polish board
- bug reproduction acceptance checklist

**Why this repo is useful:** It turns scattered bug reports into prioritized defects, viewport evidence, QA checks, and a handoff package that a client can understand.

## Local Run

```bash
npm install --package-lock=false
npm run dev
```

## Build

```bash
npm run build
```

## Scope Note

This repository is a public sample app. It uses React, TypeScript, Vite, Tailwind, and local static data only. It does not require environment variables, accounts, payments, databases, or third-party services.

## Forking Notes

- Start with `src/data/sample.ts`; replace the fictional defects, metrics, repro steps, and handoff assets.
- Keep all screenshots, IDs, client names, analytics, tickets, and proprietary implementation notes out of public forks.
- Update `repo`, `liveUrl`, service framing, and screenshot assets before publishing a derived template.
- Do not add external monitors, issue trackers, form submissions, analytics, auth, or credentials to this public sample.
