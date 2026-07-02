import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_36%),linear-gradient(135deg,_#0f172a_0%,_#111827_45%,_#030712_100%)] text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              LinkShortener
            </p>
            <p className="text-sm text-white/70">Clerk authentication is live</p>
          </div>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                <span className="text-sm text-white/75">Account</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </Show>
          </div>
        </header>

        <section className="flex flex-1 items-center py-14 sm:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
                Secure auth for your short-link app
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Sign in, sign up, and manage your account from the homepage.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Clerk is wired into the app router, the auth proxy is configured,
                and the landing page now surfaces the controls a first-time user
                needs to create an account.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200/90">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Next.js App Router
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  ClerkProvider in layout
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Proxy matcher verified
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">
                  Auth panel
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Get started in one click
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Sign in or create a new account to unlock protected routes.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-medium text-white transition hover:bg-white/10">
                        Open sign in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                        Create account
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      Signed in and ready to use
                    </div>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
