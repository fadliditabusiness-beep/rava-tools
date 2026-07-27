# Repositories

## Overview

The `repositories` directory is reserved for generic data-access factories — helpers that generate a full CRUD service for a REST resource, so individual `services/*.service.ts` files don't need to hand-write `all/find/create/update/remove` for every entity.

Empty for now: add a factory here once ≥2 services would otherwise duplicate the same CRUD shape.

## Responsibilities

- Provide reusable factory functions that build typed CRUD methods from an endpoint string.
- Sit directly on top of the app's HTTP client (`utils/api/*`).
- Stay generic over entity/create/update payload types.

## Example Structure

```text
repositories/
└── base.ts   # createBaseService<Entity, CreatePayload, UpdatePayload>(endpoint)
```

```ts
export const createBaseService = <Entity, CreatePayload, UpdatePayload>(
  endpoint: string,
) => ({
  all: (config?) => http.get<Entity[]>(endpoint, config),
  find: (id, config?) => http.get<Entity>(`${endpoint}/${id}`, config),
  create: (payload, config?) => http.post<Entity>(endpoint, payload, config),
  update: (id, payload, config?) =>
    http.put<Entity>(`${endpoint}/${id}`, payload, config),
  remove: (id, config?) => http.delete<void>(`${endpoint}/${id}`, config),
});
```

## Rules

✅ May import the HTTP client from `utils/api/*`.

✅ Should stay generic (no domain-specific fields hardcoded).

❌ Must not be imported directly by components — only by `services/*`.

❌ Must not contain domain/business logic — that belongs in the service that consumes it.

## Best Practices

- Prefer a shared factory over duplicating CRUD boilerplate whenever a resource maps cleanly to REST `all/find/create/update/remove`.
- Add new generic factories here only when a pattern repeats across ≥2 services.
