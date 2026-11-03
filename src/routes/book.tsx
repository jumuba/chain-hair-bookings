import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ethers } from "ethers";
import { SalonNav } from "@/components/SalonNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarCheck, Check } from "lucide-react";
import BookingContract from "../../build/contracts/BookingContract.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const Route = createFileRoute("/book")({
  component: Book,
  head: () => ({
    meta: [
      { title: "Book — Maison Lumière" },
      { name: "description", content: "Reserve your hair appointment in a few clicks. Confirmed on-chain via MetaMask." },
    ],
  }),
});

const SERVICES = ["Signature Cut", "Color & Gloss", "Balayage", "Blow-out", "Deep Care", "Bridal Styling"];
const TIMES = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function Book() {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(TIMES[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0x39e440B2a7f24a0FC2BA3F9951e9399C563eA6C2";

      const contract = new ethers.Contract(
        contractAddress,
        BookingContract.abi,
        signer
      );

      const day = Number(date.replaceAll("-", ""));
      const fromTime = Number(time.replace(":", ""));
      const toTime = fromTime + 100;

      // 1st MetaMask popup: create/open slot on blockchain
      const openTx = await contract.openSlots(
        day,
        day,
        fromTime,
        toTime
      );

      await openTx.wait();

      // 2nd MetaMask popup: book slot on blockchain
      const tx = await contract.bookSlot(
        name.trim(),
        day,
        fromTime,
        toTime
      );

      await tx.wait();

      const booking = {
        id: tx.hash,
        name: name.trim(),
        service,
        date,
        time,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("maison-lumiere-bookings") ?? "[]");
      localStorage.setItem("maison-lumiere-bookings", JSON.stringify([...existing, booking]));

      setBookingRef(tx.hash);
      setConfirmed(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.shortMessage || err?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <SalonNav />
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/30">
            <Check className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
            See you soon, <span className="italic text-accent">{name || "friend"}</span>.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Your <strong>{service}</strong> is reserved on <strong>{date}</strong> at <strong>{time}</strong>.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">A blockchain transaction has confirmed this booking.</p>
          {bookingRef && (
            <p className="mt-2 break-all text-xs text-muted-foreground">
              Tx Hash: <span className="font-mono">{bookingRef}</span>
            </p>
          )}
          <Button onClick={() => setConfirmed(false)} variant="outline" className="mt-8 rounded-full">
            Book another
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SalonNav />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reserve your seat</p>
          <h1 className="mt-3 text-5xl tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
            Book an <span className="italic text-accent">appointment</span>
          </h1>
        </div>

        <form
          onSubmit={submit}
          className="space-y-7 rounded-2xl border border-border/70 bg-card p-8 shadow-[var(--shadow-card)] md:p-10"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="h-12 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label>Service</Label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setService(s)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    service === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" min={today} required value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <div className="grid grid-cols-4 gap-2">
                {TIMES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-lg border py-2 text-sm transition-all ${
                      time === t
                        ? "border-accent bg-accent/20 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full">
            <CalendarCheck className="mr-2 h-4 w-4" />
            {loading ? "Confirming on-chain…" : "Confirm booking"}
          </Button>

          {error && <p className="text-center text-sm text-destructive">{error}</p>}

          <p className="text-center text-xs text-muted-foreground">
            Your booking will be confirmed on-chain through MetaMask.
          </p>
        </form>
      </section>
    </div>
  );
}