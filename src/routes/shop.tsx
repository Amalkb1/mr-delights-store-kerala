import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

type SearchParams = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — MR Delights" },
      { name: "description", content: "Browse premium dates, nuts, figs and seeds. Hand-picked, freshly packed, delivered across Kerala." },
    ],
  }),
  component: ShopPage,
});

const CATS = ["All", "Dates", "Nuts", "Figs", "Seeds"];
const SORTS = [
  { v: "popular", l: "Popularity" },
  { v: "newest", l: "Newest" },
  { v: "price-asc", l: "Price: Low → High" },
  { v: "price-desc", l: "Price: High → Low" },
] as const;

function ShopPage() {
  const search = Route.useSearch();
  const { products } = useStore();
  const [cat, setCat] = useState<string>(search.category || "All");
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState<typeof SORTS[number]["v"]>("popular");

  const filtered = useMemo(() => {
    let r = products.slice();
    if (cat !== "All") r = r.filter(p => p.category === cat);
    if (q) r = r.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    r = r.filter(p => p.price <= maxPrice);
    switch (sort) {
      case "newest": r.sort((a, b) => b.createdAt - a.createdAt); break;
      case "price-asc": r.sort((a, b) => a.price - b.price); break;
      case "price-desc": r.sort((a, b) => b.price - a.price); break;
      default: r.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    }
    return r;
  }, [products, cat, q, maxPrice, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-center mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-accent">The Collection</span>
        <h1 className="mt-2 text-4xl sm:text-5xl">Shop Premium</h1>
        <p className="mt-3 text-muted-foreground">Pure, fresh, luxurious — curated for you.</p>
      </div>

      {/* Filters */}
      <div className="luxury-card p-4 sm:p-6 mb-8 grid gap-4 md:grid-cols-[1fr_auto_auto] items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…"
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-secondary text-sm outline-none focus:ring-2 ring-accent" />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value as any)}
          className="px-4 py-2.5 rounded-full bg-secondary text-sm outline-none">
          {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
        <div className="flex items-center gap-3 text-sm">
          <span className="whitespace-nowrap">Up to ₹{maxPrice}</span>
          <input type="range" min={200} max={2000} step={50} value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))} className="accent-[oklch(0.78_0.13_85)]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent"}`}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
