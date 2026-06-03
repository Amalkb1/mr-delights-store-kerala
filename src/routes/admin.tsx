import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore, type Product } from "@/lib/store";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — MR Delights" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

const empty = { name: "", category: "Dates", price: 0, oldPrice: undefined as number | undefined, description: "", weight: "500g", image: "", stock: true, popularity: 50 };

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function Admin() {
  const { isAdmin, adminLogin, adminLogout, products, addProduct, updateProduct, deleteProduct } = useStore();
  const mounted = useMounted();
  const [creds, setCreds] = useState({ u: "", p: "" });
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);

  if (!mounted) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] grid place-items-center px-4 py-12">
        <form onSubmit={e => {
          e.preventDefault();
          if (adminLogin(creds.u, creds.p)) toast.success("Admin signed in");
          else toast.error("Invalid credentials");
        }} className="luxury-card w-full max-w-md p-8 space-y-4">
          <h1 className="font-display text-3xl text-center">Admin Login</h1>
          <p className="text-xs text-muted-foreground text-center">Demo credentials: admin / admin123</p>
          <input required placeholder="Username" value={creds.u} onChange={e => setCreds({ ...creds, u: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <input required type="password" placeholder="Password" value={creds.p} onChange={e => setCreds({ ...creds, p: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium">Sign In</button>
        </form>
      </div>
    );
  }

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, price: p.price, oldPrice: p.oldPrice, description: p.description, weight: p.weight, image: p.image, stock: p.stock, popularity: p.popularity ?? 50 });
    setCreating(true);
  };
  const close = () => { setCreating(false); setEditing(null); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { updateProduct(editing.id, form); toast.success("Product updated"); }
    else { addProduct(form); toast.success("Product added"); }
    close();
  };

  const onFile = (file: File) => {
    const r = new FileReader();
    r.onload = () => setForm(f => ({ ...f, image: r.result as string }));
    r.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent">Admin Dashboard</span>
          <h1 className="mt-2 text-4xl">Product Management</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4" /> Add Product</button>
          <button onClick={adminLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </div>

      <div className="luxury-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr className="text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3"><img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="" /></td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.stock ? <span className="text-green-700">In stock</span> : <span className="text-destructive">Out</span>}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => { if (confirm("Delete this product?")) { deleteProduct(p.id); toast.success("Deleted"); } }}
                    className="p-2 rounded-full bg-secondary hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm grid place-items-center p-4" onClick={close}>
          <form onSubmit={save} className="bg-card rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl">{editing ? "Edit" : "New"} Product</h2>
              <button type="button" onClick={close} className="p-2"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary" />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary">
                {["Dates", "Nuts", "Figs", "Seeds"].map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="px-4 py-3 rounded-xl bg-secondary" />
                <input type="number" placeholder="Old price (optional)" value={form.oldPrice ?? ""} onChange={e => setForm({ ...form, oldPrice: e.target.value ? Number(e.target.value) : undefined })} className="px-4 py-3 rounded-xl bg-secondary" />
              </div>
              <input placeholder="Weight (e.g. 500g)" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary" />
              <textarea required rows={3} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary" />
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Image</label>
                <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} className="block mt-1 text-sm" />
                {form.image && <img src={form.image} alt="" className="mt-2 w-24 h-24 rounded-lg object-cover" />}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} /> In stock
              </label>
            </div>
            <button className="w-full mt-5 py-3 rounded-full bg-primary text-primary-foreground font-medium">{editing ? "Save changes" : "Add product"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
