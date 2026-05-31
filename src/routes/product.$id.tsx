import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { ShoppingBag, Minus, Plus, Check, Truck, Award, Leaf } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "ship">("desc");

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/shop" className="text-sm text-muted-foreground hover:text-accent">← Back to shop</Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mt-6">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-beige luxury-card">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-beige border border-border">
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-accent">{product.category}</div>
          <h1 className="mt-2 text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-3xl font-semibold text-primary">₹{product.price}</span>
            {product.oldPrice && <span className="text-lg text-muted-foreground line-through">₹{product.oldPrice}</span>}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            {product.stock ? (
              <span className="inline-flex items-center gap-1 text-green-700"><Check className="w-4 h-4" /> In Stock</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Weight</div>
            <div className="inline-flex gap-2">
              {[product.weight, "1kg"].map(w => (
                <button key={w} className={`px-4 py-2 rounded-full border text-sm ${w === product.weight ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{w}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-full">
              <button className="w-10 h-10 grid place-items-center" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center">{qty}</span>
              <button className="w-10 h-10 grid place-items-center" onClick={() => setQty(q => q + 1)}><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={() => { addToCart(product.id, qty); toast.success("Added to cart"); }}
              disabled={!product.stock}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:bg-primary/90 disabled:opacity-50">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary"><Leaf className="w-5 h-5 text-accent" />100% Natural</div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary"><Award className="w-5 h-5 text-accent" />Premium Grade</div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary"><Truck className="w-5 h-5 text-accent" />Fast Delivery</div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex gap-6 text-sm font-medium">
              <button onClick={() => setTab("desc")} className={tab === "desc" ? "text-accent border-b-2 border-accent pb-2" : "text-muted-foreground"}>Description</button>
              <button onClick={() => setTab("ship")} className={tab === "ship" ? "text-accent border-b-2 border-accent pb-2" : "text-muted-foreground"}>Shipping</button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {tab === "desc"
                ? product.description + " Sealed for freshness, packed in a premium luxury box. Refrigerate after opening for best results."
                : "Delivered across Kerala in 1–3 days. Free delivery on orders above ₹999. Cash on delivery & WhatsApp ordering supported."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
