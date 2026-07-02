---
name: shadcn-ui-only-enforcement
description: Enforce exclusive use of shadcn/ui for all UI elements and prohibit custom component creation.
argument-hint: Use when building or modifying any visual UI, page layout, form, dialog, table, navigation, or interactive interface element.
target: repository
model: GPT-5.3-Codex
tools:
  - read_file
  - grep_search
  - apply_patch
  - get_errors
handoffs:
  - none
---

# Shadcn UI Only Rules

Apply this policy to every UI change in this app.

## Non-Negotiable Constraints

- All UI elements must use shadcn/ui components.
- Do not create custom UI components.
- Do not introduce parallel design systems or custom component libraries.
- Reuse existing components from `components/ui` and compose screens from those primitives.

## Scope

This applies to all user-facing UI, including:

- Buttons, inputs, selects, textareas, labels, and form structures.
- Dialogs, drawers, popovers, tooltips, dropdowns, and menus.
- Cards, tables, tabs, badges, alerts, toasts, and pagination.
- Headers, sidebars, navigation bars, filters, and settings panels.
- Empty states, loading states, and error states.

## Implementation Details

### 1) Build UI by composing existing shadcn primitives

- First check `components/ui` for an existing component before writing JSX structure.
- Compose screens with existing primitives such as `Button`, `Input`, `Card`, `Table`, `Dialog`, and `Form`.
- Keep feature code in route-level or feature-level files; keep reusable UI primitives in `components/ui` only.

Preferred import pattern:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

### 2) Add missing UI through shadcn generation flow

- If a needed component does not exist, add the official shadcn component files using the project's shadcn setup.
- Do not hand-roll a replacement with custom markup and ad-hoc styles.
- After adding a shadcn component, use it through `components/ui/*` imports.

### 3) Styling and theming boundaries

- Use Tailwind utility classes for page-level layout and spacing.
- Keep variant and state behavior inside shadcn component APIs (`variant`, `size`, `asChild`, etc.) instead of creating alternate custom versions.
- Do not duplicate component behavior that already exists in shadcn primitives.

### 4) Composition wrappers are allowed only for feature assembly

- Feature wrappers can combine existing shadcn primitives for a specific screen or flow.
- Feature wrappers must not become generic reusable UI libraries.
- If a wrapper is generic enough to be reused, convert it into an approved shadcn-aligned component in `components/ui` using project standards.

### 5) Review-time enforcement checks

- Verify new UI imports come from `@/components/ui/*` for primitives.
- Reject PRs that introduce custom primitives that overlap with shadcn capabilities.
- Confirm visual consistency with existing spacing, typography, and interaction patterns already present in the app.

## Disallowed Patterns

- New reusable UI primitives outside `components/ui`.
- Hand-rolled replacements for existing shadcn components.
- Mixed usage of shadcn and alternate UI libraries for overlapping component types.

## Validation Checklist

- Every new UI element is built from shadcn components.
- No new custom UI component files were added outside approved shadcn patterns.
- Imports for UI elements resolve through `components/ui/*` where applicable.
- Visual and interaction behavior remain consistent with existing shadcn usage across the app.
