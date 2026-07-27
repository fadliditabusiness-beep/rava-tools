# Stores

## Overview

The `stores` directory is reserved for client-side state stores (e.g. Zustand) — state that's global to the app but doesn't belong in a React Context, and doesn't come from the server (that's what `hooks/api` + a query cache is for).

No state library is installed yet in this boilerplate — add one when the project needs client-side global state (multi-step form state, UI toggles, etc.).

## Responsibilities

- Hold client-only global state (not server data).
- Expose actions to read/update that state.
- Optionally persist state (localStorage) or wire devtools.

## Example Structure

```text
stores/
├── uiStore.ts
└── wizardForm.store.ts
```

Suggested pattern (Zustand):

```ts
import { create } from "zustand";

interface WizardFormState {
  step: number;
  setStep: (step: number) => void;
}

export const useWizardFormStore = create<WizardFormState>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
}));
```

## Rules

✅ May hold and mutate client-only state.

✅ May be consumed directly by components via the store's hook.

❌ Must not duplicate server state already owned by `hooks/api/*` — read it from there instead.

❌ Should not contain API calls.

## Best Practices

- One store per concern (don't grow a single global store for everything).
- Name store files `<name>.store.ts` / `<name>Store.ts` consistently.
- Reset store state explicitly when a flow completes, rather than relying on remount.
