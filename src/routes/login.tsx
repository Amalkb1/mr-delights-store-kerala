import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MR Delights" }] }),
  component: Login,
});

function Login() {
  const { login } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(f.email, f.password)) { toast.success("Welcome back!"); nav({ to: "/profile" }); }
    else toast.error("Invalid email or password");
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-12">
      <div className="luxury-card w-full max-w-md p-8">
        <div className="text-center mb-6">
          <span className="text-xs tracking-[0.3em] uppercase text-accent">Welcome back</span>
          <h1 className="mt-2 text-3xl">Sign In</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input required type="email" placeholder="Email" value={f.email}
            onChange={e => setF({ ...f, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <input required type="password" placeholder="Password" value={f.password}
            onChange={e => setF({ ...f, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent" />
          <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium">Sign In</button>
        </form>
        <p className="mt-5 text-sm text-center text-muted-foreground">
          New here? <Link to="/register" className="text-accent hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
