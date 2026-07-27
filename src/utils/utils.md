# Utils

## Overview

The `utils` directory contains reusable utility functions that perform generic, stateless operations. Utility functions should be independent of business logic and can be shared across the entire application.

Utilities are designed to simplify common tasks, improve code reuse, and reduce duplication.

## Responsibilities

- Provide reusable helper functions.
- Perform generic data transformations.
- Handle formatting and parsing.
- Encapsulate common calculations and validations.

## Examples

```text
utils/
├── date.ts
├── currency.ts
├── formatter.ts
├── validator.ts
├── string.ts
├── number.ts
├── object.ts
├── api/          # see api/api.md
└── index.ts
```

## Rules

✅ May contain pure, reusable functions.

✅ Should be stateless and deterministic whenever possible.

✅ Can be imported by any layer of the application.

❌ Must not contain business logic.

❌ Must not perform API requests.

❌ Must not depend on React components or application state.

## Best Practices

- Keep utility functions small and focused.
- Prefer pure functions with predictable outputs.
- Group related utilities into dedicated files.
- Write reusable helpers instead of duplicating logic.
- Export utilities through a central `index.ts` when appropriate.
