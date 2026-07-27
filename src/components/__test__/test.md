# Components / __test__

## Overview

Unit tests for `components/atoms`, `components/molecules`, and `components/organisms`. Mirrors the atomic-design folder structure of the components being tested.

No test tooling (Jest/RTL) is installed yet in this boilerplate — add it when the project needs it, then populate these folders.

## Responsibilities

- One `<Component>.test.tsx` per tested component, in the matching atoms/molecules/organisms subfolder.
- Render the component and assert on rendered output/behavior.

## Current structure

```text
components/__test__/
├── atoms/
├── molecules/
└── organisms/
```

## Rules

✅ Mirror the source component's folder (atoms/molecules/organisms) and filename.

✅ Prefer role/text queries over snapshot-only tests where practical.

❌ Must not hit real network/API calls — mock services/hooks instead.

❌ Should not test `pages`/`templates` here — full-flow coverage for those belongs in `e2e/`.

## Best Practices

- Name test files `<Component>.test.tsx`, colocated by atomic layer, not next to the source file.
- Keep unit tests focused on the component's own rendering/behavior; leave multi-screen flow assertions to `e2e/`.
