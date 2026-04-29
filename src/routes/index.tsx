import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/salon-hero.jpg";
import { SalonNav } from "@/components/SalonNav";
import { Button } from "@/components/ui/button";
import { Scissors, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maison Lumière — Elegant Hair Salon" },
      { name: "description", content: "An intimate hair salon experience. Reserve your seat in seconds, secured on-chain." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SalonNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" /> On-chain bookings
            </span>
            <h1 className="text-5xl leading-[1.05] tracking-tight md:text-7xl" style={{ fontFamily: "var(--font-serif)" }}>
              Beautiful hair, <br />
              <span className="italic text-accent">effortlessly booked.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Maison Lumière is a quiet, light-filled salon. Pick a time, confirm with your wallet, and we'll take care of the rest.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/book">Book an appointment</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <Link to="/services">View services →</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-2xl"
              style={{ background: "var(--gradient-warm)" }}
            />
            <img
              src={heroImg}
              alt="Maison Lumière salon interior"
              width={1536}
              height={1024}
              className="rounded-[1.5rem] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Scissors, title: "Master stylists", text: "A small team, trained in cut and color craftsmanship." },
            { icon: ShieldCheck, title: "Secured on-chain", text: "Your booking is recorded on Ethereum via MetaMask." },
            { icon: Sparkles, title: "Calm & intimate", text: "Two chairs, soft music, and your favourite drink." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border/70 bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl" style={{ fontFamily: "var(--font-serif)" }}>{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison Lumière · Booked on Ethereum
      </footer>
    </div>
  );
}
