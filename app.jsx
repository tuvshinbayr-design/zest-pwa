import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#1a2236",
  border: "#1e2d45",
  accent: "#00c2ff",
  accentDim: "#0077aa",
  success: "#00e096",
  warning: "#ffb800",
  danger: "#ff4d6d",
  text: "#e8f0fe",
  muted: "#6b7fa3",
};

const initialProducts = [
  { id: 1, code: "P001", name: "Кофе Латте", category: "Ундаа", price: 8500, stock: 50, unit: "ш", minStock: 10 },
  { id: 2, code: "P002", name: "Капучино", category: "Ундаа", price: 9000, stock: 8, unit: "ш", minStock: 10 },
  { id: 3, code: "P003", name: "Американо", category: "Ундаа", price: 7000, stock: 60, unit: "ш", minStock: 10 },
  { id: 4, code: "P004", name: "Шоколадтай бялуу", category: "Хоол", price: 12000, stock: 20, unit: "ш", minStock: 5 },
  { id: 5, code: "P005", name: "Сэндвич", category: "Хоол", price: 9500, stock: 3, unit: "ш", minStock: 5 },
  { id: 6, code: "P006", name: "Зайдас ус", category: "Ундаа", price: 3000, stock: 100, unit: "ш", minStock: 20 },
];

const initialCustomers = [
  { id: 1, code: "C001", name: "Болд Баатар", phone: "99112233", email: "bold@mail.mn", address: "БЗД, 1-р хороо", totalSpent: 0, orders: 0 },
  { id: 2, code: "C002", name: "Сарнай Ганбат", phone: "88224455", email: "sarnai@mail.mn", address: "СБД, 3-р хороо", totalSpent: 0, orders: 0 },
  { id: 3, code: "C003", name: "Тэмүүлэн Дорж", phone: "77336677", email: "temuulen@mail.mn", address: "ХУД, 5-р хороо", totalSpent: 0, orders: 0 },
];

const initialSales = [
  { id: 1, date: "2025-05-01", customerId: 1, customerName: "Болд Баатар", items: [{ productId: 1, name: "Кофе Латте", qty: 2, price: 8500 }], total: 17000, status: "Дууссан", payMethod: "Бэлэн" },
  { id: 2, date: "2025-05-01", customerId: 2, customerName: "Сарнай Ганбат", items: [{ productId: 4, name: "Шоколадтай бялуу", qty: 1, price: 12000 }, { productId: 3, name: "Американо", qty: 1, price: 7000 }], total: 19000, status: "Дууссан", payMethod: "Карт" },
  { id: 3, date: "2025-05-02", customerId: 3, customerName: "Тэмүүлэн Дорж", items: [{ productId: 2, name: "Капучино", qty: 3, price: 9000 }], total: 27000, status: "Хүлээгдэж байна", payMethod: "Карт" },
];

const initialDeliveries = [
  { id: 1, orderId: 3, customerName: "Тэмүүлэн Дорж", address: "ХУД, 5-р хороо", driver: "Оюунбаатар", status: "Замд яваа", date: "2025-05-02", total: 27000 },
];

// ---- ICONS ----
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    dashboard: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    product: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    sale: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    customer: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    delivery: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>,
    report: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>,
    trash: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
    edit: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>,
    search: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    close: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>,
    cart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    alert: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg>,
    trend: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>,
  };
  return icons[name] || null;
};

// ---- MODAL ----
const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: COLORS.text }}>{title}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted, padding: 4 }}><Icon name="close" /></button>
      </div>
      <div style={{ padding: "1.5rem" }}>{children}</div>
    </div>
  </div>
);

// ---- INPUT ----
const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && <label style={{ display: "block", fontSize: 12, color: COLORS.muted, marginBottom: 6, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>}
    <input {...props} style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "0.6rem 0.875rem", color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", ...props.style }} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && <label style={{ display: "block", fontSize: 12, color: COLORS.muted, marginBottom: 6, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>}
    <select {...props} style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "0.6rem 0.875rem", color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}>{children}</select>
  </div>
);

const Btn = ({ children, variant = "primary", onClick, style = {}, disabled }) => {
  const bg = variant === "primary" ? COLORS.accent : variant === "danger" ? COLORS.danger : variant === "success" ? COLORS.success : COLORS.border;
  const tc = variant === "primary" || variant === "danger" || variant === "success" ? "#000" : COLORS.text;
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: bg, color: tc, border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>{children}</button>
  );
};

const Badge = ({ children, color = COLORS.accent }) => (
  <span style={{ background: color + "22", color, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>{children}</span>
);

// ---- STAT CARD ----
const StatCard = ({ label, value, icon, color = COLORS.accent, sub }) => (
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem 1.5rem", flex: 1, minWidth: 160 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.text, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
      </div>
      <div style={{ background: color + "18", borderRadius: 10, padding: 10, color }}><Icon name={icon} size={20} color={color} /></div>
    </div>
  </div>
);

// ---- MINI BAR CHART ----
const MiniBar = ({ data, color = COLORS.accent }) => {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", background: color + "33", borderRadius: 4, overflow: "hidden", height: 48 }}>
            <div style={{ width: "100%", height: `${(d.val / max) * 100}%`, background: color, borderRadius: 4, marginTop: "auto", transition: "height 0.3s" }} />
          </div>
          <span style={{ fontSize: 9, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ==== PAGES ====

// DASHBOARD
const Dashboard = ({ products, customers, sales, deliveries }) => {
  const todaySales = sales.filter(s => s.date === new Date().toISOString().slice(0, 10));
  const totalRevenue = sales.reduce((a, s) => a + s.total, 0);
  const lowStock = products.filter(p => p.stock <= p.minStock);
  const pending = deliveries.filter(d => d.status !== "Хүргэгдсэн");
  const weekData = [
    { label: "Да", val: 45000 }, { label: "Мя", val: 72000 }, { label: "Лх", val: 38000 },
    { label: "Пү", val: 91000 }, { label: "Ба", val: 55000 }, { label: "Бя", val: 120000 }, { label: "Ня", val: totalRevenue > 0 ? totalRevenue : 85000 },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>Хяналтын самбар</h2>
        <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 4 }}>Өнөөдрийн мэдээлэл — {new Date().toLocaleDateString("mn-MN")}</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <StatCard label="Нийт орлого" value={`₮${(totalRevenue).toLocaleString()}`} icon="trend" color={COLORS.success} sub={`${sales.length} борлуулалт`} />
        <StatCard label="Бараа төрөл" value={products.length} icon="product" color={COLORS.accent} sub={`${lowStock.length} бага нөөц`} />
        <StatCard label="Харилцагч" value={customers.length} icon="customer" color="#a78bfa" sub="Нийт бүртгэлтэй" />
        <StatCard label="Хүргэлт" value={pending.length} icon="delivery" color={COLORS.warning} sub="Хүлээгдэж байна" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, marginBottom: "1rem", fontSize: 14 }}>7 хоногийн борлуулалт</div>
          <MiniBar data={weekData} color={COLORS.accent} />
        </div>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, marginBottom: "1rem", fontSize: 14 }}>Анхааруулга</div>
          {lowStock.length === 0 ? (
            <div style={{ color: COLORS.success, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>✓ Бүх нөөц хангалттай</div>
          ) : lowStock.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 13, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
              <Badge color={COLORS.danger}>{p.stock} {p.unit}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, marginBottom: "1rem", fontSize: 14 }}>Сүүлийн борлуулалтууд</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Огноо", "Харилцагч", "Дүн", "Төлөв", "Төлбөр"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontSize: 11, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {sales.slice(-5).reverse().map(s => (
              <tr key={s.id} style={{ borderBottom: `1px solid ${COLORS.border}10` }}>
                <td style={{ padding: "0.6rem 0.75rem", fontSize: 13, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{s.date}</td>
                <td style={{ padding: "0.6rem 0.75rem", fontSize: 13, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{s.customerName}</td>
                <td style={{ padding: "0.6rem 0.75rem", fontSize: 13, color: COLORS.success, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>₮{s.total.toLocaleString()}</td>
                <td style={{ padding: "0.6rem 0.75rem" }}><Badge color={s.status === "Дууссан" ? COLORS.success : COLORS.warning}>{s.status}</Badge></td>
                <td style={{ padding: "0.6rem 0.75rem", fontSize: 13, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{s.payMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PRODUCTS PAGE
const ProductsPage = ({ products, setProducts }) => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ code: "", name: "", category: "Ундаа", price: "", stock: "", unit: "ш", minStock: "10" });

  const filtered = products.filter(p => p.name.includes(search) || p.code.includes(search));

  const openAdd = () => { setForm({ code: `P00${products.length + 1}`, name: "", category: "Ундаа", price: "", stock: "", unit: "ш", minStock: "10" }); setModal("add"); };
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), stock: String(p.stock), minStock: String(p.minStock) }); setModal("edit"); };

  const save = () => {
    if (!form.name || !form.price) return;
    if (modal === "add") {
      setProducts(ps => [...ps, { ...form, id: Date.now(), price: +form.price, stock: +form.stock, minStock: +form.minStock }]);
    } else {
      setProducts(ps => ps.map(p => p.id === form.id ? { ...form, price: +form.price, stock: +form.stock, minStock: +form.minStock } : p));
    }
    setModal(null);
  };

  const del = (id) => setProducts(ps => ps.filter(p => p.id !== id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>Бараа бүтээгдэхүүн</h2>
          <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 4 }}>Нийт {products.length} бараа</p>
        </div>
        <Btn onClick={openAdd}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="plus" size={15} color="#000" />Нэмэх</span></Btn>
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="search" size={16} color={COLORS.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Бараа хайх..." style={{ background: "none", border: "none", color: COLORS.text, fontSize: 14, outline: "none", flex: 1, fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Код", "Нэр", "Ангилал", "Үнэ", "Нөөц", "Статус", ""].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: 11, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}30` }}>
                <td style={{ padding: "0.7rem 1rem", fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{p.code}</td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: "0.7rem 1rem" }}><Badge color={COLORS.accent}>{p.category}</Badge></td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 14, color: COLORS.success, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>₮{p.price.toLocaleString()}</td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{p.stock} {p.unit}</td>
                <td style={{ padding: "0.7rem 1rem" }}><Badge color={p.stock <= p.minStock ? COLORS.danger : COLORS.success}>{p.stock <= p.minStock ? "Бага" : "Хэвийн"}</Badge></td>
                <td style={{ padding: "0.7rem 1rem" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openEdit(p)} style={{ background: COLORS.accent + "20", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: COLORS.accent }}><Icon name="edit" size={14} color={COLORS.accent} /></button>
                    <button onClick={() => del(p.id)} style={{ background: COLORS.danger + "20", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><Icon name="trash" size={14} color={COLORS.danger} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Бараа нэмэх" : "Бараа засах"} onClose={() => setModal(null)}>
          <Input label="Код" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
          <Input label="Нэр" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Select label="Ангилал" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            <option>Ундаа</option><option>Хоол</option><option>Бусад</option>
          </Select>
          <Input label="Үнэ (₮)" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Input label="Нөөц" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
            <Input label="Доод нөөц" type="number" value={form.minStock} onChange={e => setForm(f => ({ ...f, minStock: e.target.value }))} />
            <Input label="Нэгж" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(null)}>Болих</Btn>
            <Btn onClick={save}>Хадгалах</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// SALES PAGE (POS)
const SalesPage = ({ products, setProducts, customers, sales, setSales }) => {
  const [cart, setCart] = useState([]);
  const [custId, setCustId] = useState("");
  const [payMethod, setPayMethod] = useState("Бэлэн");
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(false);

  const addToCart = (p) => {
    setCart(c => {
      const ex = c.find(i => i.productId === p.id);
      if (ex) return c.map(i => i.productId === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { productId: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };
  const removeCart = (pid) => setCart(c => c.filter(i => i.productId !== pid));
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const cust = customers.find(c => c.id === +custId);

  const checkout = () => {
    if (!cart.length) return;
    const newSale = {
      id: Date.now(), date: new Date().toISOString().slice(0, 10),
      customerId: +custId, customerName: cust?.name || "Зочин",
      items: cart, total, status: "Дууссан", payMethod
    };
    setSales(s => [...s, newSale]);
    setProducts(ps => ps.map(p => {
      const ci = cart.find(c => c.productId === p.id);
      return ci ? { ...p, stock: p.stock - ci.qty } : p;
    }));
    setCart([]); setCustId(""); setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  const filtered = products.filter(p => p.name.includes(search) || p.code.includes(search));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", height: "calc(100vh - 140px)" }}>
      {/* Left: products */}
      <div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 1rem" }}>Борлуулалт</h2>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <Icon name="search" size={16} color={COLORS.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Бараа хайх..." style={{ background: "none", border: "none", color: COLORS.text, fontSize: 14, outline: "none", flex: 1, fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.75rem", overflowY: "auto", maxHeight: "calc(100vh - 260px)" }}>
          {filtered.map(p => (
            <button key={p.id} onClick={() => addToCart(p)} disabled={p.stock === 0} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "1rem", cursor: p.stock === 0 ? "not-allowed" : "pointer", textAlign: "left", opacity: p.stock === 0 ? 0.4 : 1, transition: "border-color 0.2s" }}
              onMouseEnter={e => { if (p.stock > 0) e.currentTarget.style.borderColor = COLORS.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📦</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.accent }}>₮{p.price.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: p.stock <= p.minStock ? COLORS.danger : COLORS.muted, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Нөөц: {p.stock}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: cart */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="cart" size={18} color={COLORS.accent} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, fontSize: 15 }}>Сагс ({cart.length})</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginTop: "2rem" }}>Сагс хоосон байна</div>
          ) : cart.map(item => (
            <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>₮{item.price.toLocaleString()} × {item.qty}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: COLORS.success, fontSize: 13 }}>₮{(item.price * item.qty).toLocaleString()}</span>
                <button onClick={() => removeCart(item.productId)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted }}><Icon name="close" size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "1rem 1.25rem", borderTop: `1px solid ${COLORS.border}` }}>
          <Select label="Харилцагч" value={custId} onChange={e => setCustId(e.target.value)}>
            <option value="">Зочин</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select label="Төлбөрийн хэлбэр" value={payMethod} onChange={e => setPayMethod(e.target.value)}>
            <option>Бэлэн</option><option>Карт</option><option>QR</option><option>Дансаар</option>
          </Select>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.muted, fontSize: 13 }}>Нийт дүн</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: COLORS.text, fontSize: 20 }}>₮{total.toLocaleString()}</span>
          </div>
          <Btn onClick={checkout} disabled={!cart.length} style={{ width: "100%", padding: "0.8rem", fontSize: 14, background: done ? COLORS.success : COLORS.accent }}>
            {done ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Icon name="check" size={16} color="#000" />Амжилттай!</span> : "💳 Төлбөр хийх"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

// CUSTOMERS PAGE
const CustomersPage = ({ customers, setCustomers, sales }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ code: "", name: "", phone: "", email: "", address: "" });
  const [search, setSearch] = useState("");

  const custWithStats = customers.map(c => ({
    ...c,
    totalSpent: sales.filter(s => s.customerId === c.id).reduce((a, s) => a + s.total, 0),
    orders: sales.filter(s => s.customerId === c.id).length,
  }));

  const filtered = custWithStats.filter(c => c.name.includes(search) || c.phone.includes(search));

  const save = () => {
    if (!form.name) return;
    setCustomers(cs => [...cs, { ...form, id: Date.now(), totalSpent: 0, orders: 0 }]);
    setModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>Харилцагч</h2>
          <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 4 }}>Нийт {customers.length} харилцагч</p>
        </div>
        <Btn onClick={() => { setForm({ code: `C00${customers.length + 1}`, name: "", phone: "", email: "", address: "" }); setModal(true); }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="plus" size={15} color="#000" />Нэмэх</span>
        </Btn>
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="search" size={16} color={COLORS.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Харилцагч хайх..." style={{ background: "none", border: "none", color: COLORS.text, fontSize: 14, outline: "none", flex: 1, fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Код", "Нэр", "Утас", "Хаяг", "Захиалга", "Нийт зарцуулсан"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: 11, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${COLORS.border}30` }}>
                <td style={{ padding: "0.7rem 1rem", fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{c.code}</td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 13, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{c.phone}</td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 13, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{c.address}</td>
                <td style={{ padding: "0.7rem 1rem" }}><Badge color={COLORS.accent}>{c.orders}</Badge></td>
                <td style={{ padding: "0.7rem 1rem", fontSize: 14, color: COLORS.success, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>₮{c.totalSpent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title="Харилцагч нэмэх" onClose={() => setModal(false)}>
          <Input label="Код" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
          <Input label="Нэр" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input label="Утас" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <Input label="И-мэйл" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <Input label="Хаяг" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Болих</Btn>
            <Btn onClick={save}>Хадгалах</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// DELIVERY PAGE
const DeliveryPage = ({ deliveries, setDeliveries, sales, customers }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ orderId: "", customerName: "", address: "", driver: "", status: "Хүлээгдэж байна", date: new Date().toISOString().slice(0, 10), total: 0 });

  const statusColor = { "Хүлээгдэж байна": COLORS.warning, "Замд яваа": COLORS.accent, "Хүргэгдсэн": COLORS.success };

  const updateStatus = (id, status) => setDeliveries(ds => ds.map(d => d.id === id ? { ...d, status } : d));

  const save = () => {
    if (!form.customerName) return;
    setDeliveries(ds => [...ds, { ...form, id: Date.now() }]);
    setModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>Хүргэлт</h2>
          <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 4 }}>Нийт {deliveries.length} хүргэлт</p>
        </div>
        <Btn onClick={() => setModal(true)}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="plus" size={15} color="#000" />Нэмэх</span></Btn>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {deliveries.map(d => (
          <div key={d.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, fontSize: 15 }}>{d.customerName}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>📍 {d.address}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>🚗 {d.driver} · {d.date}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.success, fontSize: 16 }}>₮{d.total.toLocaleString()}</span>
              <Badge color={statusColor[d.status] || COLORS.muted}>{d.status}</Badge>
              {d.status !== "Хүргэгдсэн" && (
                <select value={d.status} onChange={e => updateStatus(d.id, e.target.value)}
                  style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "0.4rem 0.6rem", color: COLORS.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                  <option>Хүлээгдэж байна</option>
                  <option>Замд яваа</option>
                  <option>Хүргэгдсэн</option>
                </select>
              )}
            </div>
          </div>
        ))}
        {deliveries.length === 0 && <div style={{ textAlign: "center", color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", padding: "3rem" }}>Хүргэлт байхгүй байна</div>}
      </div>

      {modal && (
        <Modal title="Хүргэлт нэмэх" onClose={() => setModal(false)}>
          <Input label="Харилцагчийн нэр" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
          <Input label="Хаяг" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          <Input label="Жолооч" value={form.driver} onChange={e => setForm(f => ({ ...f, driver: e.target.value }))} />
          <Input label="Дүн (₮)" type="number" value={form.total} onChange={e => setForm(f => ({ ...f, total: +e.target.value }))} />
          <Input label="Огноо" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Болих</Btn>
            <Btn onClick={save}>Хадгалах</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// REPORT PAGE
const ReportPage = ({ sales, products, customers }) => {
  const totalRevenue = sales.reduce((a, s) => a + s.total, 0);
  const avgOrder = sales.length ? Math.round(totalRevenue / sales.length) : 0;
  const topProducts = products.map(p => ({
    ...p,
    sold: sales.flatMap(s => s.items).filter(i => i.productId === p.id).reduce((a, i) => a + i.qty, 0),
    revenue: sales.flatMap(s => s.items).filter(i => i.productId === p.id).reduce((a, i) => a + i.qty * i.price, 0),
  })).sort((a, b) => b.revenue - a.revenue);

  const byMethod = ["Бэлэн", "Карт", "QR", "Дансаар"].map(m => ({
    method: m, count: sales.filter(s => s.payMethod === m).length,
    total: sales.filter(s => s.payMethod === m).reduce((a, s) => a + s.total, 0),
  }));

  return (
    <div>
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 1.5rem" }}>Тайлан</h2>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <StatCard label="Нийт орлого" value={`₮${totalRevenue.toLocaleString()}`} icon="trend" color={COLORS.success} />
        <StatCard label="Борлуулалтын тоо" value={sales.length} icon="sale" color={COLORS.accent} />
        <StatCard label="Дундаж захиалга" value={`₮${avgOrder.toLocaleString()}`} icon="cart" color="#a78bfa" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, marginBottom: "1rem", fontSize: 14 }}>Топ бараанууд</div>
          {topProducts.slice(0, 5).map((p, i) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: i === 0 ? COLORS.warning : COLORS.muted, fontSize: 13, width: 20 }}>#{i + 1}</span>
                <span style={{ fontSize: 13, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: COLORS.success, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>₮{p.revenue.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>{p.sold} ширхэг</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: COLORS.text, marginBottom: "1rem", fontSize: 14 }}>Төлбөрийн хэлбэр</div>
          {byMethod.filter(m => m.count > 0).map(m => (
            <div key={m.method} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: `1px solid ${COLORS.border}20` }}>
              <span style={{ fontSize: 13, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{m.method}</span>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Badge color={COLORS.accent}>{m.count} удаа</Badge>
                <span style={{ fontSize: 13, color: COLORS.success, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>₮{m.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
          {byMethod.every(m => m.count === 0) && <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Мэдээлэл байхгүй</div>}
        </div>
      </div>
    </div>
  );
};

// ==== APP ====
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [sales, setSales] = useState(initialSales);
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const nav = [
    { id: "dashboard", label: "Самбар", icon: "dashboard" },
    { id: "products", label: "Бараа", icon: "product" },
    { id: "sales", label: "Борлуулалт", icon: "sale" },
    { id: "customers", label: "Харилцагч", icon: "customer" },
    { id: "delivery", label: "Хүргэлт", icon: "delivery" },
    { id: "report", label: "Тайлан", icon: "report" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${COLORS.surface}; } ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        input::placeholder { color: ${COLORS.muted}; } select option { background: ${COLORS.surface}; }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", padding: "1.5rem 0" }}>
          <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="zg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00c2ff"/>
                    <stop offset="100%" stopColor="#00e096"/>
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#zg)"/>
                <polygon points="7,9 29,9 29,14 16,27 29,27 29,32 7,32 7,27 20,14 7,14" fill="#ffffff"/>
              </svg>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #00c2ff, #00e096)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>ZEST</div>
                <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: -2 }}>Борлуулалтын систем</div>
              </div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
            {nav.map(n => {
              const active = page === n.id;
              return (
                <button key={n.id} onClick={() => setPage(n.id)} style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "0.65rem 0.875rem", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2,
                  background: active ? COLORS.accent + "18" : "transparent", color: active ? COLORS.accent : COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: active ? 600 : 400, fontSize: 14, transition: "all 0.15s",
                }}>
                  <Icon name={n.icon} size={17} color={active ? COLORS.accent : COLORS.muted} />
                  {n.label}
                  {active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: COLORS.accent }} />}
                </button>
              );
            })}
          </nav>
          <div style={{ padding: "1rem 1.25rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>
            ZEST © 2025
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          {page === "dashboard" && <Dashboard products={products} customers={customers} sales={sales} deliveries={deliveries} />}
          {page === "products" && <ProductsPage products={products} setProducts={setProducts} />}
          {page === "sales" && <SalesPage products={products} setProducts={setProducts} customers={customers} sales={sales} setSales={setSales} />}
          {page === "customers" && <CustomersPage customers={customers} setCustomers={setCustomers} sales={sales} />}
          {page === "delivery" && <DeliveryPage deliveries={deliveries} setDeliveries={setDeliveries} sales={sales} customers={customers} />}
          {page === "report" && <ReportPage sales={sales} products={products} customers={customers} />}
        </div>
      </div>
    </>
  );
}
