# Styles

## Overview

Global stylesheet for the app, loaded once in `src/pages/_app.tsx`. Styling is otherwise intended to be handled per-component with Tailwind CSS 4 utility classes.

## Responsibilities

- Import Tailwind's base layer.
- Define global CSS resets/variables (e.g. font, color-scheme) that apply app-wide.

## Current contents

```text
styles/
└── globals.css   # Tailwind import + minimal global reset, loaded in _app.tsx
```

## Rules

✅ May contain `@import`/Tailwind directives, `:root`/`@theme` CSS variables, global resets.

❌ Should not contain component-scoped styles — prefer Tailwind utility classes on the component itself.

❌ Should not be imported anywhere other than `_app.tsx`.

## Best Practices

- Keep this file small; one-off component styling belongs inline via Tailwind classes, not here.
- Only add global variables/resets that genuinely need to apply everywhere (fonts, color-scheme, CSS resets, brand color tokens).
