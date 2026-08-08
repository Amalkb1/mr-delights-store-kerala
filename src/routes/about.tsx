import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { Award, Leaf, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MR Delights" },
      { name: "description", content: "MR Delights is Kerala's premium destination for dates, nuts, figs and seeds — sourced with care, packed with love." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative">
        <img src={heroImg} alt="" className="w-full h-[40vh] sm:h-[55vh] object-cover" />
        <div className="absolute inset-0 bg-primary/70 grid place-items-center text-center text-primary-foreground px-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Our Story</span>
            <h1 className="mt-3 text-4xl sm:text-6xl">A Tradition of Purity</h1>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-lg leading-relaxed text-foreground/90 space-y-6">
        <p>
          MR Delights began with a simple love — the love for honest, premium food. Rooted in Kerala and inspired by the finest origins of the world, we curate dates, nuts, figs and seeds that meet our family's own standards before they ever reach yours.
        </p>
        <p>
          Every jar is a quiet promise: nothing artificial, nothing rushed. From the lush palm groves of Madinah to the orchards of California, we travel for taste — and bring it home, sealed at peak freshness.
        </p>
        <p>
          We believe luxury isn't loud. It's the soft give of a Medjool date, the gentle crunch of a perfectly roasted pistachio, the sweetness of a sun-dried fig. That's MR Delights.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Leaf, t: "Natural", d: "Zero preservatives, zero shortcuts." },
          { icon: Award, t: "Premium", d: "Top-grade selection only." },
          { icon: Sparkles, t: "Fresh", d: "Sealed at peak freshness." },
          { icon: ShieldCheck, t: "Trusted", d: "Loved across Kerala." },
        ].map(v => (
          <div key={v.t} className="luxury-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-grad grid place-items-center mx-auto"><v.icon className="w-6 h-6 text-accent-foreground" /></div>
            <div className="mt-4 font-display text-xl">{v.t}</div>
            <div className="text-sm text-muted-foreground mt-1">{v.d}</div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl">Experience the difference</h2>
        <Link to="/shop" className="mt-6 inline-block px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">Shop the Collection</Link>
      </section>
    </>
  );
}
