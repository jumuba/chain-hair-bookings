import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function SalonNav() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const eth = (window as any).ethereum;
    if (!eth) {
      alert("Please install MetaMask to book an appointment.");
      return;
    }
    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
            Maison <span className="italic text-accent">Lumière</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Services
          </Link>
          <Link to="/book" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Book
          </Link>
        </nav>
        <Button onClick={connectWallet} variant="outline" className="rounded-full border-foreground/20">
          <Wallet className="mr-2 h-4 w-4" />
          {account ? `${account.slice(0, 6)}…${account.slice(-4)}` : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
}
