---
name: clerk-auth-routing-guardrails
description: Enforce Clerk-only authentication and required route behavior for homepage, dashboard, and auth entry flows.
argument-hint: Use when implementing or modifying auth, route protection, homepage redirects, and sign-in/sign-up UX.
target: repository
model: GPT-5.3-Codex
tools:
  - read_file
  - grep_search
  - apply_patch
  - get_errors
handoffs:
  - clerk-setup
  - clerk-nextjs-patterns
---

# Clerk Auth And Routing Rules

Apply these rules to every auth or routing change in this app.

## Non-Negotiable Constraints

- Use Clerk as the only authentication system.
- Do not add or use any alternative auth method (custom JWT auth, NextAuth, Auth.js, session-only gatekeeping, or provider-specific OAuth wrappers outside Clerk).
- Keep `/dashboard` protected. Unauthenticated users must not access it.
- If a user is authenticated and visits `/`, redirect them to `/dashboard`.
- Clerk sign-in and sign-up flows must open as modals, not as standalone full-page forms.

## Implementation Guidance

- Keep `ClerkProvider` in the root layout and preserve Clerk middleware protection in `proxy.ts`.
- Enforce dashboard protection through Clerk middleware or equivalent Clerk-first guards in App Router boundaries.
- Implement homepage redirect server-side whenever possible to avoid client-side flicker.
- Use Clerk modal launch patterns consistently for both sign-in and sign-up entry points.

## Required Implementation Details

### 1) Protect `/dashboard` in middleware

- Use Clerk middleware in `proxy.ts`.
- Ensure `/dashboard(.*)` is always protected.
- Do not implement separate custom session checks for this route.

Example pattern:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
};
```

### 2) Redirect authenticated users from `/` to `/dashboard`

- Implement this in the server component for `app/page.tsx`.
- Use Clerk server auth state and Next.js `redirect`.
- Avoid client-side redirect hooks for this specific behavior.

Example pattern:

```ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return <main>{/* public homepage content */}</main>;
}
```

### 3) Always launch sign-in and sign-up as modals

- Use Clerk buttons with `mode="modal"`.
- Apply this rule to all auth entry points in headers, navs, and CTAs.
- Do not route users to standalone custom sign-in/sign-up form pages.

Example pattern:

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function AuthActions() {
  return (
    <div>
      <SignInButton mode="modal">
        <button type="button">Sign in</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button type="button">Sign up</button>
      </SignUpButton>
    </div>
  );
}
```

### 4) Keep auth implementation Clerk-only

- Allowed: Clerk middleware, Clerk server APIs, Clerk UI primitives.
- Not allowed: NextAuth/Auth.js, custom JWT/session auth stacks, or duplicative identity stores used as primary auth.
- If a feature needs auth context, source it from Clerk and propagate from there.

## Validation Checklist

- Unauthenticated request to `/dashboard` is blocked and redirected according to Clerk config.
- Authenticated request to `/` is redirected to `/dashboard`.
- Sign-in and sign-up are triggered as modals in all app entry points.
- No new dependency or code path introduces non-Clerk auth logic.
- `proxy.ts`, `app/page.tsx`, and auth entry UI all reflect the above rules without conflicting fallback logic.
