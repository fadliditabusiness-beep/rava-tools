# Pages / API

## Overview

Next.js API Routes — server-side endpoints bundled with the app, reachable at `/api/*`. Separate from `src/services/*`, which call *external* backends; this folder is for endpoints the Next.js server itself handles.

## Responsibilities

- Handle a request/response pair on the Next.js server for a given `/api/<name>` path.

## Current contents

```text
pages/api/
└── hello.ts   # GET /api/hello -> { name: "John Doe" } (default Next.js starter route)
```

```ts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
```

## Rules

✅ Each file exports a default `(req, res) => void` handler.

✅ Runs server-side only — safe to use secrets not exposed via `NEXT_PUBLIC_*`.

❌ Must not be confused with `src/services/*` (client calls to external APIs).

❌ `hello.ts` is unused starter boilerplate — remove once a real route exists, or keep as a health-check reference.

## Best Practices

- Only add a route here when the app needs its own backend-for-frontend endpoint (e.g. proxying a request, hiding a secret). Calls to a real backend go through `services/` + `hooks/api/`, not here.
