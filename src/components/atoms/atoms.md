# Atoms

## Overview

Atoms are the smallest and most fundamental UI components in the application. They represent individual HTML elements or simple React components that cannot be broken down into smaller functional pieces.

Atoms should be highly reusable, independent, and free of business logic.

## Responsibilities

- Provide basic UI elements.
- Be reusable across the entire application.
- Contain no business logic.
- Be easy to test and maintain.

## Examples

```text
atoms/
├── Button/
├── Input/
├── Label/
├── Badge/
├── Avatar/
├── Icon/
├── Spinner/
└── Typography/
```

## Rules

✅ Can receive props.

✅ Can manage simple UI state (hover, focus, disabled).

❌ Cannot use Molecules, Organisms, or Templates.

❌ Should not fetch data.

❌ Should not know anything about pages.

## Best Practices

- Keep components as generic as possible.
- Avoid application-specific naming.
- Support accessibility (ARIA).
- Prefer composition over configuration.
