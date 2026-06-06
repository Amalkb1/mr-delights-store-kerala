import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import datesImg from "@/assets/dates.jpg";
import nutsImg from "@/assets/nuts.jpg";
import figsImg from "@/assets/figs.jpg";
import seedsImg from "@/assets/seeds.jpg";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Leaf, Award, Sparkles, Truck, Star, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MR Delights — Premium Dates & Nuts Delivered Across Kerala" },
      { name: "description", content: "Experience purity, freshness, and luxury in every bite. Shop premium dates, nuts, figs & seeds." },
    ],
  }),
  component: HomePage,
});

const trust = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Award, label: "Premium Quality" },
  { icon: Sparkles, label: "No Preservatives" },
  { icon: Truck, label: "Fast Delivery" },
];

const categories = [
  { name: "Dates", image: datesImg },
  { name: "Nuts", image: nutsImg },
  { name: "Figs", image: figsImg },
  { name: "Seeds", image: seedsImg },
];

const reviews = [
  { name: "Aisha R.", city: "Kochi", text: "The Medjool dates are absolutely divine — soft, fresh, and beautifully packed. Feels like a luxury gift every time.", rating: 5 },
  { name: "Rahul M.", city: "Trivandrum", text: "Best pistachios I've had in years. MR Delights has become our family's monthly ritual.", rating: 5 },
  { name: "Fathima S.", city: "Calicut", text: "Premium quality, gorgeous packaging, and lightning fast delivery across Kerala. Highly recommend.", rating: 5 },
];

function HomePage() {
  const { products } = useStore();
  const featured = products.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium dates and nuts" className="w-full h-full object-cover" width={1600} height={1200} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-primary-foreground">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-accent border border-accent/40 rounded-full px-4 py-1.5">Luxury · Kerala</span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              Premium Dates & Nuts <br /><span className="gold-text">Delivered Across Kerala</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-primary-foreground/85 max-w-xl">
              Experience purity, freshness, and luxury in every bite — hand-picked from the world's finest origins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="px-7 py-3.5 rounded-full bg-[var(--gradient-gold)] text-accent-foreground font-medium shadow-[var(--shadow-gold)] hover:scale-105 transition text-amber-200 bg-emerald-950">
                Shop Now
              </Link>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
                 className="px-7 py-3.5 rounded-full glass-dark text-primary-foreground font-medium inline-flex items-center gap-2 hover:bg-primary/60 transition text-amber-300">
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map(t => (
            <div key={t.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--gradient-gold)] grid place-items-center shadow">
                <t.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-accent">Curated Collections</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map(c => (
            <Link key={c.name} to="/shop" search={{ category: c.name } as any}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden luxury-card">
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                <div className="font-display text-2xl">{c.name}</div>
                <div className="text-xs mt-1 text-accent">Shop now →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent">Bestsellers</span>
              <h2 className="mt-2 text-3xl sm:text-4xl">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline text-sm text-primary hover:text-accent">View all →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <img src={heroImg} alt="Our story" loading="lazy" className="rounded-2xl shadow-[var(--shadow-luxury)] aspect-[4/3] object-cover w-full" />
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent">Our Story</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Crafted for Connoisseurs</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            MR Delights was born in Kerala from a love for the world's finest natural foods. We source directly from trusted farms across the Middle East, Iran, Turkey, and California — bringing you only the top grade, sealed at peak freshness.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Every box is a promise: zero preservatives, zero compromises — only pure, luxurious nourishment.
          </p>
          <Link to="/about" className="mt-6 inline-block px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition">
            More about us
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Loved Across Kerala</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(r => (
              <div key={r.name} className="glass-dark rounded-2xl p-6">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/90">"{r.text}"</p>
                <div className="mt-4 font-display text-lg text-accent">{r.name}</div>
                <div className="text-xs text-primary-foreground/60">{r.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="luxury-card p-8 sm:p-12 grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Get in touch</span>
            <h2 className="mt-3 text-3xl">Order direct or say hello</h2>
            <p className="mt-3 text-muted-foreground">Have a question or a bulk order? We'd love to hear from you.</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
               className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent" /> +91 82898 42739</li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent" /> hello@mrdelights.in</li>
            <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-accent" /> Kerala, India</li>
          </ul>
        </div>
      </section>
    </>
  );
}
