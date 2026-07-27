# Pages (Next.js Pages Router)

## Overview

Next.js file-based routing entry points. **Do not confuse with `src/components/pages/`** — that folder holds the actual screen UI (atomic-design "pages" layer); this folder wires a URL to that screen component.

## Responsibilities

- Map one route to one screen component from `components/pages/`.
- Host `_app.tsx` (global providers, global CSS) and `_document.tsx` (HTML document shell).

## Current contents

```text
pages/
├── _app.tsx      # wraps every page: global CSS (add providers here as needed)
├── _document.tsx # custom <Html>/<Head>/<body>
├── index.tsx     # default starter page
└── api/          # Next.js API routes (see api/api.md)
```

Suggested pattern for a new route:

```tsx
import HomePage from "@/components/pages/HomePage";

export default function Home() {
  return <HomePage />;
}
```

## Rules

✅ May import exactly one `components/pages/*Page` component (plus any layout/template wrapper).

❌ Must not contain UI markup or business logic beyond the route wrapper — put that in `components/pages/*`.

## Best Practices

- Adding a new screen: build it in `components/pages/`, then add a one-file route here.
- Keep route filenames aligned with the screen name.
