import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { LogOut, Package } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Account — MR Delights" }] }),
  component: Profile,
});

function Profile() {
  const { user, updateUser, logout, orders } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (!user) { nav({ to: "/login" }); return; }
    setF({ name: user.name, email: user.email, phone: user.phone, address: user.address });
  }, [user]);

  if (!user) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(f);
    toast.success("Profile updated");
  };

  const myOrders = orders.filter(o => o.customer.phone === user.phone || o.customer.name === user.name);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent">My Account</span>
          <h1 className="mt-2 text-4xl">Hello, {user.name.split(" ")[0]}</h1>
        </div>
        <button onClick={() => { logout(); nav({ to: "/" }); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-destructive hover:text-destructive">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={save} className="luxury-card p-6 space-y-3">
          <h2 className="font-display text-2xl mb-2">Profile details</h2>
          {(["name", "email", "phone", "address"] as const).map(k => (
            <div key={k}>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">{k}</label>
              <input value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })}
                className="w-full px-4 py-3 mt-1 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
            </div>
          ))}
          <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium mt-2">Save changes</button>
        </form>

        <div className="luxury-card p-6">
          <h2 className="font-display text-2xl mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-accent" /> My orders</h2>
          {myOrders.length === 0 ? (
            <div className="text-sm text-muted-foreground">No orders yet. <Link to="/shop" className="text-accent">Start shopping →</Link></div>
          ) : (
            <ul className="space-y-3">
              {myOrders.map(o => (
                <li key={o.id} className="p-4 rounded-xl bg-secondary">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Order #{o.id.slice(-6).toUpperCase()}</span>
                    <span className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{o.items.length} items · ₹{o.total}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
