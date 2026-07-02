import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Link2, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Shorten any URL",
    description:
      "Turn long, unwieldy links into clean, memorable short URLs in one click.",
  },
  {
    icon: BarChart3,
    title: "Track every click",
    description:
      "See real-time analytics for each link — visits, referrers, and geographic data.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & private",
    description:
      "Your links are protected behind your account. Manage and delete them any time.",
  },
  {
    icon: Zap,
    title: "Instant redirects",
    description:
      "Ultra-fast redirects powered by edge infrastructure keep your audience moving.",
  },
];

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            LinkShortener
          </span>
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get started</Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Short links that work as hard as you do
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Create short, shareable URLs in seconds. Track every click, manage
            all your links, and stay in control — all from one simple dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <SignUpButton mode="modal">
              <Button size="lg">Start for free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </SignInButton>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/40 border-y">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader className="pb-2">
                  <Icon className="mb-2 size-6 text-primary" />
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Create your free account and start managing links from your personal
            dashboard today.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg">Create your account</Button>
          </SignUpButton>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} LinkShortener</span>
          <div className="flex gap-2">
            <SignInButton mode="modal">
              <Button variant="link" size="sm" className="text-muted-foreground">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="link" size="sm" className="text-muted-foreground">
                Sign up
              </Button>
            </SignUpButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
