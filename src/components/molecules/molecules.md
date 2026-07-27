# Molecules

## Overview

Molecules are combinations of multiple Atoms that work together to perform a single UI function.

They represent small reusable sections of the interface but are still independent of the page layout.

## Responsibilities

- Combine multiple Atoms.
- Encapsulate small UI behaviors.
- Remain reusable across multiple pages.

## Examples

```text
molecules/
├── SearchBox/
├── ProductCard/
├── LoginForm/
├── QuantitySelector/
├── UserMenu/
└── Breadcrumb/
```

## Rules

✅ May use Atoms.

✅ Can contain simple component logic.

❌ Cannot depend on Templates or Pages.

❌ Should not perform API requests.

## Best Practices

- Keep a single responsibility.
- Accept data through props.
- Avoid page-specific implementations.
