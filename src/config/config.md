# Config

## Overview

The `config` directory contains all application configuration files, constants, environment mappings, and shared settings used across the project.

Configuration should be centralized, predictable, and independent from UI components.

## Responsibilities

- Store application configuration.
- Define environment-specific values.
- Provide reusable constants.
- Centralize feature flags and application settings.
- Keep configuration separate from business logic.

## Examples

```text
config/
├── api.ts
├── env.ts
├── routes.ts
├── constants.ts
├── storage.ts
├── navigation.ts
├── theme.ts
└── index.ts
```

## Rules

✅ May export constants, enums, helper configuration, and environment variables.

✅ Should be framework-agnostic whenever possible.

✅ Should be imported throughout the application.

❌ Must not contain UI components.

❌ Must not contain business logic.

❌ Must not perform API requests.

## Best Practices

- Keep configuration immutable.
- Group related configuration into separate files.
- Use descriptive naming.
- Read environment variables from a single source.
- Avoid hardcoded values throughout the application.
