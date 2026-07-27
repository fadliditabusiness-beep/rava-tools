# Contexts

## Overview

The `contexts` directory contains React Contexts used to share global state and functionality across the application without prop drilling.

Contexts should provide application-wide state only. Feature-specific or local state should remain within components or custom hooks whenever possible.

## Responsibilities

- Define shared React Contexts.
- Manage application-wide state.
- Expose context providers and custom context hooks.
- Centralize global state that is consumed across multiple features.

## Examples

```text
contexts/
├── AuthContext.tsx
├── ThemeContext.tsx
├── AppContext.tsx
├── UserContext.tsx
├── NotificationContext.tsx
└── index.ts
```

## Rules

✅ May create and export React Contexts.

✅ May expose Provider components and custom hooks.

✅ Should only manage shared application state.

❌ Must not contain UI components.

❌ Should avoid feature-specific or page-specific state.

❌ Must not perform unrelated business logic.

## Best Practices

- Keep each context focused on a single responsibility.
- Expose custom hooks (e.g. `useAuth`, `useTheme`) for consuming context.
- Memoize context values when appropriate to reduce unnecessary re-renders.
- Split large contexts into smaller ones instead of creating a single global context.
- Export contexts through a central `index.ts` when appropriate.
