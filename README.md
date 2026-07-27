This is a [Next.js](https://nextjs.org) project (Pages Router), bootstrapped as a bare structural boilerplate — no integrations wired up yet.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## What this is

Folder structure + conventions only. Every directory under `src/` (and `e2e/`) has its own `*.md` explaining what belongs there, its rules, and best practices — read the folder's `.md` before adding files to it.

No integrations are set up yet:

- No HTTP client / API layer (`utils/api/`, `services/`, `repositories/`, `hooks/api/` are structural placeholders).
- No global state (`stores/`, `contexts/`, `providers/` are empty).
- No test tooling installed (`components/__test__/`, `e2e/` are empty folders waiting for Jest/RTL and Playwright).

Add each piece when the project actually needs it, following the contract documented in that folder's `.md`.

## Layout

```text
src/
├── components/
│   ├── atoms/          # smallest UI building blocks
│   ├── molecules/       # atoms composed together
│   ├── organisms/       # complex UI sections
│   ├── templates/       # page layout only
│   ├── pages/            # full-screen UI (atomic-design "pages")
│   └── __test__/         # unit tests, mirrors atoms/molecules/organisms
├── pages/                 # Next.js routing (Pages Router)
│   └── api/               # Next.js API routes
├── contexts/              # React Context (global state)
├── providers/             # app-level providers, mounted in _app.tsx
├── stores/                # client-only global state (e.g. Zustand)
├── hooks/
│   └── api/                # data-fetching hooks wrapping services/
├── services/               # calls to external APIs
├── repositories/           # generic CRUD factories used by services/
├── utils/
│   └── api/                 # HTTP client setup
├── interfaces/             # shared TypeScript types
├── config/                 # app configuration
├── constants/              # shared constant values
└── styles/                 # global CSS (Tailwind)
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn-pages-router)
