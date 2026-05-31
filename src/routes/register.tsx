import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — MR Delights" }] }),
  component: Register,
});

function Register() {
  const { register } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", address: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(f)) { toast.success("Account created!"); nav({ to: "/profile" }); }
    else toast.error("An account with this email already exists");
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-12">
      <div className="luxury-card w-full max-w-md p-8">
        <div className="text-center mb-6">
          <span className="text-xs tracking-[0.3em] uppercase text-accent">Join MR Delights</span>
          <h1 className="mt-2 text-3xl">Create Account</h1>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {[
            { k: "name", p: "Full name", t: "text" },
            { k: "email", p: "Email", t: "email" },
            { k: "phone", p: "Phone number", t: "tel" },
            { k: "password", p: "Password", t: "password" },
            { k: "address", p: "Delivery address", t: "text" },
          ].map(x => (
            <input key={x.k} required type={x.t} placeholder={x.p}
              value={(f as any)[x.k]} onChange={e => setF({ ...f, [x.k]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          ))}
          <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium">Create Account</button>
        </form>
        <p className="mt-5 text-sm text-center text-muted-foreground">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
