import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import logoAsset from "@/assets/mr-delights-logo.png.asset.json";
import { WHATSAPP_NUMBER } from "@/lib/store";

const PARTICLES = [
  { l: 8, t: 22, d: 0.2, s: 6 }, { l: 18, t: 68, d: 1.1, s: 4 },
  { l: 27, t: 12, d: 0.6, s: 5 }, { l: 38, t: 82, d: 1.6, s: 3 },
  { l: 46, t: 34, d: 0.9, s: 4 }, { l: 57, t: 74, d: 0.35, s: 6 },
  { l: 66, t: 18, d: 1.4, s: 5 }, { l: 74, t: 58, d: 0.75, s: 3 },
  { l: 83, t: 28, d: 1.9, s: 5 }, { l: 91, t: 66, d: 0.5, s: 4 },
  { l: 12, t: 46, d: 1.75, s: 3 }, { l: 62, t: 44, d: 2.2, s: 4 },
];

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/contact", label: "Contact" },
];

export default function AnimatedLogoHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* golden particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold-grad"
            style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 0.9, 0.15, 0.8], y: [-6, -22, -6] }}
            transition={{ duration: 6 + p.s, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25"
             style={{ backgroundImage: "var(--gradient-gold)" }} />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
        {/* animated ring + logo */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 200 200"
            className="absolute h-[min(72vw,18rem)] w-[min(72vw,18rem)] -rotate-90"
            aria-hidden="true"
          >
            <motion.circle
              cx="100" cy="100" r="96" fill="none"
              stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="100" cy="100" r="88" fill="none"
              stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="3 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
            />
          </svg>
          <motion.img
            src={logoAsset.url}
            alt="MR Delights — premium dry fruits and seeds emblem"
            width={512}
            height={512}
            className="h-[min(58vw,14rem)] w-[min(58vw,14rem)] rounded-full object-contain shadow-[var(--shadow-gold)]"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <motion.h1
          className="mt-8 text-3xl leading-tight sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          Premium Dates & Nuts <br />
          <span className="gold-text">Delivered Across Kerala</span>
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.5 }}
        >
          <Link
            to="/shop"
            style={{ backgroundImage: "var(--gradient-gold)" }}
            className="rounded-full px-7 py-3.5 font-semibold text-accent-foreground shadow-[var(--shadow-gold)] transition hover:scale-105"
          >
            Explore Collection
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="glass-dark inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-accent transition hover:bg-primary/60"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        </motion.div>

        <motion.nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em] text-primary-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.9 }}
        >
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="transition hover:text-accent">
              {l.label}
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
