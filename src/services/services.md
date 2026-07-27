# Services

## Overview

The `services` directory contains modules responsible for communicating with external systems such as REST APIs, GraphQL endpoints, authentication providers, or other backend services.

Services should focus on data access only and remain independent of UI components.

## Responsibilities

- Handle API requests and responses.
- Encapsulate HTTP client usage.
- Organize endpoints by feature or domain.
- Provide reusable methods for data retrieval and mutation.

## Examples

```text
services/
├── auth.service.ts
├── user.service.ts
├── product.service.ts
├── upload.service.ts
└── index.ts
```

## Rules

✅ May perform HTTP requests.

✅ May use API clients such as Axios or Fetch.

✅ Should return typed data or promises.

❌ Must not render UI.

❌ Must not contain presentation logic.

❌ Should avoid directly managing React state.

## Best Practices

- Keep each service focused on a single domain.
- Reuse a centralized API client configuration (`utils/api/*`).
- Return normalized and strongly typed data whenever possible.
- Handle request configuration consistently.
- Keep business logic outside of service modules.
