# Organisms

## Overview

Organisms are relatively complex UI sections composed of multiple Molecules and Atoms.

They represent meaningful parts of a page such as headers, navigation bars, product lists, or footers.

## Responsibilities

- Build complete UI sections.
- Coordinate child components.
- Display application data.

## Examples

```text
organisms/
├── Navbar/
├── Hero/
├── ProductGrid/
├── Footer/
├── ContactSection/
└── Testimonials/
```

## Rules

✅ Can use Molecules and Atoms.

✅ May contain local UI state.

✅ Receive data via props.

❌ Should not define routing.

❌ Avoid direct API calls whenever possible.

## Best Practices

- Keep Organisms reusable.
- Split large Organisms into smaller ones when necessary.
- Delegate complex business logic to hooks or services.
