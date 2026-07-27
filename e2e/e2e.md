# e2e

## Overview

Reserved for end-to-end tests (e.g. Playwright) that drive the app through a browser across full screen flows.

No E2E tooling is installed yet in this boilerplate — add it (e.g. `@playwright/test`) when the project needs full-flow coverage, alongside a `playwright.config.ts` at the repo root.

## Responsibilities

- Cover full user flows spanning multiple screens (e.g. signup → otp → dashboard).
- Exercise the app the way a real user/browser would, not internal implementation details.

## Rules

✅ Test observable behavior (visible text, roles, navigation) rather than internals.

❌ Should not duplicate component-level unit tests already covered in `components/__test__/*`.

## Best Practices

- Keep specs named after the flow they cover (e.g. `signup.spec.ts`).
- Reserve E2E for flows that genuinely need a real browser; push isolated component behavior down to unit tests.
