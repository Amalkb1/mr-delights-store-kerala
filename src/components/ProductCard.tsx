import { Link } from "@tanstack/react-router";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { useStore, type Product } from "@/lib/store";
import { toast } from "sonner";
import QuickView from "./QuickView";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = isWishlisted(product.id);
  const off = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : 0;

  return (
    <>
      <div className="luxury-card group overflow-hidden flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-beige">
          <Link to="/product/$id" params={{ id: product.id }}>
            <img src={product.image} alt={product.name} loading="lazy" width={800} height={800}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </Link>
          {off > 0 && (
            <span className="absolute top-3 left-3 bg-[var(--gradient-gold)] text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow">
              -{off}%
            </span>
          )}
          {!product.stock && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full">Out</span>
          )}
          <button onClick={() => setQuick(true)}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
            aria-label="Quick view">
            <Eye className="w-4 h-4 text-primary" />
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">{product.category}</div>
          <Link to="/product/$id" params={{ id: product.id }} className="mt-1 font-display text-lg leading-tight hover:text-accent transition">
            {product.name}
          </Link>
          <div className="text-xs text-muted-foreground mt-1">{product.weight}</div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-xl font-semibold text-primary">₹{product.price}</span>
            {product.oldPrice && <span className="text-sm text-muted-foreground line-through">₹{product.oldPrice}</span>}
          </div>
          <button
            onClick={() => { addToCart(product.id); toast.success("Added to cart"); }}
            disabled={!product.stock}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50">
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </>
  );
}
