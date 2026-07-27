# Pages (atomic-design layer)

## Overview

The `components/pages` directory holds the actual screen UI — the atomic-design "pages" layer. **Do not confuse with `src/pages/`**, which is Next.js's file-based routing layer.

A page here composes Templates/Organisms into one full screen and is rendered by a matching route in `src/pages/`.

## Responsibilities

- Compose Templates and Organisms into a complete screen.
- Fetch or prepare screen-level data (via hooks).
- Wire local screen state.

## Example Structure

```text
components/pages/
├── HomePage/
├── ProductPage/
├── DashboardPage/
└── AuthPage/
```

## Rules

✅ Can use Templates, Organisms, Molecules, and Atoms.

✅ Can call hooks (including `hooks/api/*`) for data.

❌ Must not be imported by more than one route.

❌ Should not contain Next.js routing APIs directly — keep that in `src/pages/`.

## Best Practices

- One folder per screen, named `<Name>Page`.
- Keep a route file in `src/pages/` thin: it should just render this component.
- Delegate reusable UI to Templates/Organisms rather than inlining markup here.
