# Templates

## Overview

Templates define the layout and structure of a page by arranging multiple Organisms together.

A Template should describe **how a page is organized**, not **what data it displays**.

## Responsibilities

- Define page layout.
- Arrange Organisms.
- Pass data down to child components.

## Examples

```text
templates/
├── HomeTemplate/
├── ProductTemplate/
├── DashboardTemplate/
└── AuthTemplate/
```

## Rules

✅ Can use Organisms.

✅ Can receive page data via props.

❌ Should not fetch data.

❌ Should not contain business logic.

## Best Practices

- Focus on layout.
- Keep Templates reusable.
- Avoid page-specific API calls.
