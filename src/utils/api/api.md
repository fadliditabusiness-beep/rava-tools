# Utils / API

## Overview

Reserved for the low-level HTTP client setup used by every `services/*` call (e.g. a configured Axios instance).

Empty for now — this boilerplate has no HTTP client wired up yet, since no backend integration exists.

## Responsibilities

- Create and configure the HTTP client instance(s) used across the app.
- Attach auth headers via request interceptors, if needed.
- Centralize error handling (e.g. 401/403) via response interceptors.

## Example Structure

```text
utils/api/
└── http.ts   # e.g. an authenticated axios instance
```

## Rules

✅ May read from `constants/*` (base URL, headers) and `utils/*` (auth/token helpers).

✅ Should be the only place the HTTP client is instantiated.

❌ Must not be imported by components directly — always go through `services/*` (optionally via `repositories/*`).

❌ Must not contain endpoint-specific logic — that belongs in `services/*`.

## Best Practices

- Add a new client here (not inline in a service) if a different base URL/auth scheme is needed.
- Keep interceptor side effects (toast, redirect, credential clearing) centralized here so every service gets consistent behavior.
