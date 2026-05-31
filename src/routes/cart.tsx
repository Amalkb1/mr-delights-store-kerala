import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore, WHATSAPP_NUMBER, DELIVERY_CHARGE, FREE_DELIVERY_ABOVE } from "@/lib/store";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — MR Delights" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, products, setQty, removeFromCart, clearCart, addOrder, user } = useStore();
  const nav = useNavigate();
  const items = useMemo(() =>
    cart.map(c => ({ product: products.find(p => p.id === c.productId)!, quantity: c.quantity })).filter(i => i.product),
    [cart, products]
  );

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const total = subtotal + delivery;

  const [f, setF] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    notes: "",
  });

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const lines = items.map((i, idx) =>
      `${idx + 1}. ${i.product.name} (${i.product.weight}) × ${i.quantity} — ₹${i.product.price * i.quantity}`
    ).join("%0A");
    const msg =
      `*New Order — MR Delights*%0A%0A` +
      `*Customer:* ${f.name}%0A` +
      `*Phone:* ${f.phone}%0A` +
      `*Address:* ${f.address}%0A` +
      (f.notes ? `*Notes:* ${f.notes}%0A` : "") +
      `%0A*Items:*%0A${lines}%0A%0A` +
      `Subtotal: ₹${subtotal}%0ADelivery: ₹${delivery}%0A*Total: ₹${total}*`;

    addOrder({
      id: "o" + Date.now(),
      items,
      total,
      customer: f,
      createdAt: Date.now(),
    });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    toast.success("Order placed! Opening WhatsApp…");
    clearCart();
    setTimeout(() => nav({ to: "/profile" }), 1200);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-accent" />
        <h1 className="mt-4 font-display text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover our premium collection.</p>
        <Link to="/shop" className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-8">
      <div>
        <h1 className="font-display text-4xl mb-6">Your Cart</h1>
        <ul className="space-y-3">
          {items.map(i => (
            <li key={i.product.id} className="luxury-card p-4 flex gap-4">
              <Link to="/product/$id" params={{ id: i.product.id }} className="shrink-0">
                <img src={i.product.image} alt={i.product.name} className="w-24 h-24 rounded-xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to="/product/$id" params={{ id: i.product.id }} className="font-display text-lg hover:text-accent block truncate">{i.product.name}</Link>
                <div className="text-xs text-muted-foreground">{i.product.weight}</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button className="w-8 h-8 grid place-items-center" onClick={() => setQty(i.product.id, i.quantity - 1)}><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button className="w-8 h-8 grid place-items-center" onClick={() => setQty(i.product.id, i.quantity + 1)}><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="font-semibold text-primary">₹{i.product.price * i.quantity}</div>
                  <button onClick={() => removeFromCart(i.product.id)} className="p-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={place} className="luxury-card p-6 h-fit lg:sticky lg:top-24 space-y-4">
        <h2 className="font-display text-2xl">Order Summary</h2>
        <div className="text-sm space-y-2 border-y border-border py-3">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
          {subtotal < FREE_DELIVERY_ABOVE && (
            <div className="text-xs text-accent">Add ₹{FREE_DELIVERY_ABOVE - subtotal} more for free delivery.</div>
          )}
        </div>
        <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₹{total}</span></div>

        <div className="space-y-3 pt-2 border-t border-border">
          <input required placeholder="Full name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <input required placeholder="Phone number" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <textarea required rows={3} placeholder="Delivery address" value={f.address} onChange={e => setF({ ...f, address: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <textarea rows={2} placeholder="Order notes (optional)" value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
        </div>

        <button className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90">
          <MessageCircle className="w-4 h-4" /> Place Order on WhatsApp
        </button>
        <p className="text-xs text-muted-foreground text-center">No online payment — confirm via WhatsApp.</p>
      </form>
    </div>
  );
}
