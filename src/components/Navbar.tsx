import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { cartCount, user } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "glass shadow-[0_4px_30px_-12px_oklch(0.295_0.06_158/0.2)]" : "bg-background/60 backdrop-blur"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[var(--gradient-luxury)] grid place-items-center shadow-[var(--shadow-gold)]">
            <span className="font-display text-gold text-lg">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl text-primary">MR Delights</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Premium · Kerala</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:w-0 hover:after:w-full after:transition-all"
              activeProps={{ className: "text-primary after:w-full" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to={user ? "/profile" : "/login"} className="p-2 rounded-full hover:bg-secondary transition" aria-label="Account">
            <User className="w-5 h-5 text-primary" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 grid place-items-center rounded-full shadow">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 rounded-full hover:bg-secondary" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <nav className="flex flex-col px-4 py-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="py-3 text-base font-medium text-foreground/90"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
