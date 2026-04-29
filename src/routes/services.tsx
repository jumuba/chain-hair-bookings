import { createFileRoute, Link } from "@tanstack/react-router";
import { SalonNav } from "@/components/SalonNav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Maison Lumière" },
      { name: "description", content: "Cut, color, balayage and care services at Maison Lumière hair salon." },
    ],
  }),
});

const services = [
  { name: "Signature Cut", duration: "45 min", price: "0.02 ETH", desc: "A consultation and a precise cut tailored to your face and lifestyle." },
  { name: "Color & Gloss", duration: "90 min", price: "0.05 ETH", desc: "Single-process color with a finishing gloss for shine and depth." },
  { name: "Balayage", duration: "2h 30", price: "0.09 ETH", desc: "Hand-painted highlights for a soft, sun-kissed effect." },
  { name: "Blow-out", duration: "30 min", price: "0.015 ETH", desc: "A polished finish — perfect before an event or evening out." },
  { name: "Deep Care Treatment", duration: "40 min", price: "0.025 ETH", desc: "Restorative mask and scalp ritual for tired, dry hair." },
  { name: "Bridal Styling", duration: "1h 30", price: "0.08 ETH", desc: "An on-site or in-salon bridal hair styling, trial included." },
];

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <SalonNav />
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our menu</p>
          <h1 className="mt-3 text-5xl tracking-tight md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
            Services & <span className="italic text-accent">prices</span>
          </h1>
        </div>

        <div className="divide-y divide-border/70 rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)]">
          {services.map((s) => (
            <div key={s.name} className="flex flex-col gap-2 p-7 md:flex-row md:items-center md:justify-between">
              <div className="md:max-w-md">
                <h3 className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">{s.duration}</span>
                <span className="text-lg text-accent">{s.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/book">Book your seat</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
