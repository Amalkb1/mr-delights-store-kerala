import { X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useStore, type Product } from "@/lib/store";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export default function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  return (
    <div className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-sm grid place-items-center p-4 animate-fade-up" onClick={onClose}>
      <div className="bg-card max-w-3xl w-full rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-[var(--shadow-luxury)]" onClick={e => e.stopPropagation()}>
        <div className="aspect-square bg-beige">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 sm:p-8 relative flex flex-col">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-secondary"><X className="w-4 h-4" /></button>
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent">{product.category}</div>
          <h3 className="font-display text-2xl mt-1">{product.name}</h3>
          <div className="mt-2 text-sm text-muted-foreground">{product.weight}</div>
          <p className="mt-4 text-sm leading-relaxed">{product.description}</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-2xl font-semibold text-primary">₹{product.price}</span>
            {product.oldPrice && <span className="text-muted-foreground line-through">₹{product.oldPrice}</span>}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-full">
              <button className="w-9 h-9" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="w-9 h-9" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button onClick={() => { addToCart(product.id, qty); toast.success("Added to cart"); onClose(); }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          <Link to="/product/$id" params={{ id: product.id }} onClick={onClose}
            className="mt-3 text-sm text-accent hover:underline text-center">View full details →</Link>
        </div>
      </div>
    </div>
  );
}
