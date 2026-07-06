# Agent Instructions Index

This repository uses a multi-file instruction system for coding agents.
For detailed guidelines on specific topics, refer to the modular documentations in the `/doc` directory.
CRITICAL REQUIREMENT: It is mandatory to read the relevant individual instruction file(s) in `/docs` BEFORE generating ANY code.
Do not generate, suggest, or modify code until the applicable `/docs/*.md` instruction file(s) have been read.
Read this file first, then read every listed document before making code changes.

## Instruction Documents (Read In Order)
1. `docs/auth-clerk-routing.md`
2. `docs/ui-shadcn-only.md`

## Instruction Routing Guide

Read both instruction documents before any code change. Then apply them as follows:

- `docs/auth-clerk-routing.md`: Use for any change that touches authentication state, Clerk usage, route protection, homepage redirect behavior, or sign-in/sign-up entry UX.
- `docs/ui-shadcn-only.md`: Use for any user-facing UI change, including page layout, forms, dialogs, navigation, buttons, tables, empty/loading/error states, and component styling/composition.

When both apply (for example, adding auth buttons to a page), enforce both documents together.
If a change is backend-only and does not touch auth flow or user-facing UI, keep both docs read for compliance but do not force unrelated rewrites.



## Project Snapshot
- Stack: Next.js 16 App Router, React 19, TypeScript strict mode.
- Auth: Clerk with `ClerkProvider` in the root layout and route protection in `proxy.ts`.
- Data: Drizzle ORM with Neon HTTP.
- UI: Tailwind CSS v4, shadcn/ui, Radix primitives, Clerk shadcn theme.

## Critical Next.js Rule
This project uses Next.js 16, not legacy Next.js behavior.
Never use `middleware.ts` in this repository. It is deprecated for the Next.js version used here.
Always implement request interception and route protection in `proxy.ts`.
Before writing framework-specific code, review local framework docs in `node_modules/next/dist/docs/` when behavior is uncertain.

## Instruction Precedence
1. Direct user request.
2. This `AGENTS.md` file.
3. Files in `docs/` in the order listed above.
4. Existing repository patterns in the touched area.

## Required Agent Behavior
- Make the smallest change that cleanly solves the requested problem.
- Preserve auth, routing, and environment handling unless the task explicitly changes them.
- Prefer server components and server-side data access by default.
- Keep TypeScript strict and avoid introducing `any`, unsafe casts, or silent fallbacks.
- Reuse existing utilities, aliases, and UI primitives before adding new ones.
- Validate with the narrowest relevant command, usually `npm run lint`, and use broader checks only when the change warrants them.
- Summarize what changed, what was validated, and any remaining risks.

## Out Of Bounds By Default
- Do not rewrite broad app structure when a local change is sufficient.
- Do not weaken Clerk protection or make protected routes public without explicit instruction.
- Do not add new dependencies when the existing stack already covers the need.
- Do not reformat unrelated files or normalize mixed style outside the edited lines.
