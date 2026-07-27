# Providers

## Overview

The `providers` directory contains application-level providers responsible for supplying global context, state, configuration, and third-party integrations to the application.

Providers should be initialized once near the root of the application and expose shared functionality through React Context or external provider libraries.

No providers are wired up yet in this boilerplate — `src/pages/_app.tsx` currently renders `<Component />` directly. Add a provider here and mount it in `_app.tsx` once the project needs one (query client, auth, theme, ...).

## Responsibilities

- Register global React Context providers.
- Configure application-wide services.
- Initialize third-party providers.
- Wrap the application with shared dependencies.

## Examples

```text
providers/
├── AppProvider.tsx
├── ThemeProvider.tsx
├── QueryProvider.tsx
├── AuthProvider.tsx
├── ToastProvider.tsx
├── ProviderComposer.tsx
└── index.ts
```

## Rules

✅ May compose multiple providers into a single root provider.

✅ May initialize global libraries and contexts.

✅ Should only contain application-level providers.

❌ Must not contain page-specific logic.

❌ Must not render feature-specific UI.

❌ Should avoid business logic unrelated to provider initialization.

## Best Practices

- Keep each provider focused on a single responsibility.
- Compose providers using a single root provider when practical.
- Initialize third-party libraries in one place.
- Avoid unnecessary provider nesting.
- Export providers through a central `index.ts` when appropriate.
