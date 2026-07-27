# Constants

## Overview

The `constants` directory contains shared constant values used throughout the application. These values should never change during runtime and help eliminate hardcoded strings and magic numbers.

Constants should be reusable, centralized, and easy to maintain.

## Responsibilities

- Store reusable constant values.
- Eliminate magic numbers and hardcoded strings.
- Define application-wide enums and static values.
- Improve code readability and consistency.

## Examples

```text
constants/
├── api.ts
├── routes.ts
├── colors.ts
├── storage.ts
├── regex.ts
├── messages.ts
├── status.ts
└── index.ts
```

## Rules

✅ May export strings, numbers, arrays, objects, and enums.

✅ Should be immutable.

✅ Can be imported by any layer of the application.

❌ Must not contain business logic.

❌ Must not perform API requests.

❌ Must not depend on UI components.

## Best Practices

- Group related constants into dedicated files.
- Use descriptive and consistent naming.
- Prefer `as const` or enums when appropriate.
- Export through a central `index.ts` when practical.
- Replace duplicated literal values with shared constants.
