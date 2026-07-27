# Interfaces

## Overview

The `interfaces` directory contains shared TypeScript interfaces that define the shape of data used throughout the application. Keeping interfaces centralized improves consistency, readability, and type safety.

Interfaces should describe data contracts only and remain independent of business logic.

## Responsibilities

- Define reusable TypeScript interfaces.
- Describe API request and response models.
- Define component props when shared across multiple modules.
- Standardize data structures used throughout the application.

## Examples

```text
interfaces/
├── api.ts
├── auth.ts
├── common.ts
├── product.ts
├── user.ts
├── pagination.ts
└── index.ts
```

## Rules

✅ May contain interface declarations and shared type contracts.

✅ Can be imported by any layer of the application.

✅ Should remain framework-agnostic whenever possible.

❌ Must not contain business logic.

❌ Must not perform data transformation.

❌ Must not depend on UI components.

## Best Practices

- Group related interfaces into dedicated files.
- Use clear and descriptive names.
- Prefer extending existing interfaces over duplication.
- Export shared interfaces through a central `index.ts` when appropriate.
- Keep interfaces focused on describing data structures only.
