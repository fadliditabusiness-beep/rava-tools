# Hooks

## Overview

The `hooks` directory contains reusable custom React Hooks that encapsulate stateful logic and side effects. Hooks help keep components clean, reusable, and focused on rendering.

Each hook should solve a single concern and be independent whenever possible.

## Responsibilities

- Encapsulate reusable stateful logic.
- Share behavior across multiple components.
- Abstract side effects.
- Improve component readability and maintainability.

## Examples

```text
hooks/
├── useAuth.ts
├── useDebounce.ts
├── useLocalStorage.ts
├── useMediaQuery.ts
├── usePagination.ts
├── useTheme.ts
├── useWindowSize.ts
├── api/          # see api/api.md
└── index.ts
```

## Rules

✅ May use React Hooks (`useState`, `useEffect`, `useMemo`, etc.).

✅ May call APIs or services when appropriate.

✅ Should return reusable state and functions.

❌ Must not render UI.

❌ Should not contain page-specific logic.

❌ Should avoid depending directly on UI components.

## Best Practices

- Follow the `useXxx` naming convention.
- Keep each hook focused on a single responsibility.
- Make hooks composable.
- Return only the data and actions consumers need.
- Keep side effects predictable and properly cleaned up.
