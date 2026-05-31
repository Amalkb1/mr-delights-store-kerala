import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import datesImg from "@/assets/dates.jpg";
import nutsImg from "@/assets/nuts.jpg";
import figsImg from "@/assets/figs.jpg";
import seedsImg from "@/assets/seeds.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  weight: string;
  image: string;
  stock: boolean;
  popularity?: number;
  createdAt: number;
};

export type CartItem = { productId: string; quantity: number };

export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};

export type Order = {
  id: string;
  items: { product: Product; quantity: number }[];
  total: number;
  customer: { name: string; phone: string; address: string; notes?: string };
  createdAt: number;
};

const SEED: Product[] = [
  { id: "p1", name: "Premium Medjool Dates", category: "Dates", price: 749, oldPrice: 899, description: "Soft, jumbo Medjool dates — naturally sweet, sun-ripened, and rich in flavor.", weight: "500g", image: datesImg, stock: true, popularity: 95, createdAt: Date.now() - 5000 },
  { id: "p2", name: "Royal Ajwa Dates", category: "Dates", price: 1299, description: "Sacred Ajwa dates from Madinah — soft texture, deep caramel notes.", weight: "500g", image: datesImg, stock: true, popularity: 90, createdAt: Date.now() - 4000 },
  { id: "p3", name: "California Almonds", category: "Nuts", price: 599, oldPrice: 699, description: "Premium whole almonds — crunchy, nutritious, hand-selected.", weight: "500g", image: nutsImg, stock: true, popularity: 92, createdAt: Date.now() - 3000 },
  { id: "p4", name: "Iranian Pistachios", category: "Nuts", price: 1199, description: "Lightly roasted and salted, naturally opened premium pistachios.", weight: "500g", image: nutsImg, stock: true, popularity: 88, createdAt: Date.now() - 2500 },
  { id: "p5", name: "W320 Cashews", category: "Nuts", price: 849, description: "Whole white cashews — buttery, premium grade.", weight: "500g", image: nutsImg, stock: true, popularity: 85, createdAt: Date.now() - 2000 },
  { id: "p6", name: "Turkish Dried Figs", category: "Figs", price: 699, oldPrice: 799, description: "Sun-dried Turkish anjeer — tender, naturally sweet, packed with fiber.", weight: "400g", image: figsImg, stock: true, popularity: 80, createdAt: Date.now() - 1500 },
  { id: "p7", name: "Afghan Anjeer", category: "Figs", price: 1499, description: "Premium Afghan figs — large, golden, and luxuriously soft.", weight: "500g", image: figsImg, stock: true, popularity: 78, createdAt: Date.now() - 1200 },
  { id: "p8", name: "Mixed Premium Seeds", category: "Seeds", price: 449, description: "Pumpkin, sunflower, flax & chia — a nutrient-dense daily blend.", weight: "500g", image: seedsImg, stock: true, popularity: 70, createdAt: Date.now() - 1000 },
  { id: "p9", name: "Roasted Pumpkin Seeds", category: "Seeds", price: 399, description: "Lightly roasted pepitas — crunchy, savory, protein-rich.", weight: "400g", image: seedsImg, stock: true, popularity: 65, createdAt: Date.now() - 500 },
];

function useLocal<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => {
    if (typeof window === "undefined") return init;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV] as const;
}

type Ctx = {
  products: Product[];
  setProducts: (p: Product[]) => void;
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;

  user: User | null;
  users: User[];
  register: (u: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;

  orders: Order[];
  addOrder: (o: Order) => void;

  isAdmin: boolean;
  adminLogin: (u: string, p: string) => boolean;
  adminLogout: () => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocal<Product[]>("mr_products", SEED);
  const [cart, setCart] = useLocal<CartItem[]>("mr_cart", []);
  const [user, setUser] = useLocal<User | null>("mr_user", null);
  const [users, setUsers] = useLocal<User[]>("mr_users", []);
  const [orders, setOrders] = useLocal<Order[]>("mr_orders", []);
  const [isAdmin, setIsAdmin] = useLocal<boolean>("mr_admin", false);

  const addProduct: Ctx["addProduct"] = (p) => {
    setProducts([...products, { ...p, id: "p" + Date.now(), createdAt: Date.now() }]);
  };
  const updateProduct: Ctx["updateProduct"] = (id, p) => {
    setProducts(products.map(x => x.id === id ? { ...x, ...p } : x));
  };
  const deleteProduct: Ctx["deleteProduct"] = (id) => {
    setProducts(products.filter(x => x.id !== id));
  };

  const addToCart: Ctx["addToCart"] = (id, qty = 1) => {
    const ex = cart.find(c => c.productId === id);
    if (ex) setCart(cart.map(c => c.productId === id ? { ...c, quantity: c.quantity + qty } : c));
    else setCart([...cart, { productId: id, quantity: qty }]);
  };
  const removeFromCart: Ctx["removeFromCart"] = (id) => setCart(cart.filter(c => c.productId !== id));
  const setQty: Ctx["setQty"] = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(cart.map(c => c.productId === id ? { ...c, quantity: qty } : c));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const register: Ctx["register"] = (u) => {
    if (users.some(x => x.email === u.email)) return false;
    setUsers([...users, u]);
    setUser(u);
    return true;
  };
  const login: Ctx["login"] = (email, password) => {
    const u = users.find(x => x.email === email && x.password === password);
    if (u) { setUser(u); return true; }
    return false;
  };
  const logout = () => setUser(null);
  const updateUser: Ctx["updateUser"] = (u) => {
    if (!user) return;
    const next = { ...user, ...u };
    setUser(next);
    setUsers(users.map(x => x.email === user.email ? next : x));
  };

  const addOrder: Ctx["addOrder"] = (o) => setOrders([o, ...orders]);

  const adminLogin: Ctx["adminLogin"] = (u, p) => {
    if (u === "admin" && p === "admin123") { setIsAdmin(true); return true; }
    return false;
  };
  const adminLogout = () => setIsAdmin(false);

  return (
    <StoreContext.Provider value={{
      products, setProducts, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, setQty, clearCart, cartCount,
      user, users, register, login, logout, updateUser,
      orders, addOrder,
      isAdmin, adminLogin, adminLogout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreContext);
  if (!c) throw new Error("useStore must be inside StoreProvider");
  return c;
}

export const WHATSAPP_NUMBER = "918289842739";
export const DELIVERY_CHARGE = 60;
export const FREE_DELIVERY_ABOVE = 999;
