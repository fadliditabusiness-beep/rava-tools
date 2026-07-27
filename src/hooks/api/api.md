# Hooks / API

## Overview

The `hooks/api` directory is reserved for data-fetching hooks (e.g. TanStack Query) that wrap `services/*` calls, so components never call services directly.

No data-fetching library is installed yet in this boilerplate — add one (e.g. `@tanstack/react-query`) when the project needs it.

## Responsibilities

- Wrap a single service call in a query/mutation hook.
- Define and export the query key used for caching/invalidation.
- Derive convenience option lists (e.g. dropdown options) from raw query data.
- Configure per-query cache behavior.

## Example Structure

```text
hooks/api/
├── useUsers.ts
├── useUserOptions.ts
└── index.ts
```

Suggested pattern:

```ts
export const USERS_QUERY_KEY = ["users"] as const;

export const useUsers = () =>
  useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
  });
```

## Rules

✅ May import from `services/*` only.

✅ Should export a stable, named query key per hook.

❌ Must not call an HTTP client directly — go through a service.

❌ Must not contain JSX.

## Best Practices

- One hook per service call; compose `*Options` hooks on top instead of duplicating the query.
- Name query keys as `[domain, resource]` tuples so invalidation can target a whole domain.
- Keep cache/stale-time settings deliberate per resource.
