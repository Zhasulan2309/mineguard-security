import { useState } from "react";

const PAGES = {
  DASHBOARD: "dashboard",
  VISITORS: "visitors",
  PASSES: "passes",
  INSPECTION: "inspection",
  DOCUMENTS: "documents",
  HR_SYNC: "hr_sync",
  SCHEDULE: "schedule",
  SETTINGS: "settings",
};

/* ─── Mining-inspired Light Palette ─── */
const T = {
  bg: "#F4F1EC",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  cardHover: "#F9F7F4",
  border: "#E2DDD5",
  borderLight: "#EBE7E0",
  text: "#1A1612",
  textSecondary: "#4A4238",
  textMuted: "#8A8078",
  textDim: "#B0A89E",
  accent: "#C4601D",
  accentLight: "#D97B3D",
  accentDim: "rgba(196,96,29,0.08)",
  accentBorder: "rgba(196,96,29,0.2)",
  slate: "#3D4F5F",
  slateDim: "rgba(61,79,95,0.08)",
  warning: "#B8860B",
  warningDim: "rgba(184,134,11,0.08)",
  danger: "#B33A3A",
  dangerDim: "rgba(179,58,58,0.08)",
  success: "#2D7D46",
  successDim: "rgba(45,125,70,0.08)",
  earth: "#6B5B4E",
  earthDim: "rgba(107,91,78,0.08)",
  gold: "#A68B2B",
  goldDim: "rgba(166,139,43,0.10)",
  sidebarBg: "#2C2420",
  sidebarText: "#C8BEB4",
  sidebarActive: "rgba(196,96,29,0.18)",
};

const fontDisplay = "'Outfit', 'DM Sans', sans-serif";
const fontMono = "'IBM Plex Mono', 'SF Mono', monospace";
const fontBody = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── Icons ─── */
const Icon = ({ name, size = 20, color = T.textMuted }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    visitors: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    pass: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h4"/></>,
    car: <><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2"/><circle cx="8" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/></>,
    doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    hr: <><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M2 21h20"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevron: <><polyline points="9 18 15 12 9 6"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    sync: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    mountain: <><path d="M8 21l4.5-9 3.5 5 3-4 3 8H2L5.5 11z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

const Badge = ({ children, color = T.accent, bg }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", padding: "3px 10px",
    borderRadius: 5, fontSize: 11, fontFamily: fontMono, fontWeight: 600,
    color, background: bg || (color + "12"), letterSpacing: "0.02em",
    border: "1px solid " + color + "20",
  }}>{children}</span>
);

const StatusDot = ({ color }) => (
  <span style={{
    width: 8, height: 8, borderRadius: "50%", background: color,
    display: "inline-block", boxShadow: "0 0 0 3px " + color + "20",
  }} />
);

const Btn = ({ children, onClick, variant = "primary", icon, small, style: s }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7, border: "none",
    cursor: "pointer", fontFamily: fontBody, fontWeight: 600, borderRadius: 8,
    transition: "all 0.2s", fontSize: small ? 12 : 13,
    padding: small ? "6px 14px" : "10px 20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  };
  const variants = {
    primary: { background: T.accent, color: "#FFF" },
    secondary: { background: T.bg, color: T.textSecondary, border: "1px solid " + T.border },
    danger: { background: T.dangerDim, color: T.danger, border: "1px solid " + T.danger + "25" },
    ghost: { background: "transparent", color: T.textMuted, border: "1px solid " + T.border, boxShadow: "none" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...s }}>
      {icon && <Icon name={icon} size={small ? 14 : 16} color={variant === "primary" ? "#FFF" : variants[variant].color} />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text", textarea, select, options }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 11, color: T.textMuted, marginBottom: 6, fontFamily: fontMono, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>{label}</label>}
    {select ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", padding: "10px 14px", background: T.bg, border: "1px solid " + T.border,
        borderRadius: 8, color: T.text, fontSize: 14, fontFamily: fontBody, outline: "none", appearance: "none",
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : textarea ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{
        width: "100%", padding: "10px 14px", background: T.bg, border: "1px solid " + T.border,
        borderRadius: 8, color: T.text, fontSize: 14, fontFamily: fontBody, outline: "none", resize: "vertical", boxSizing: "border-box",
      }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: "100%", padding: "10px 14px", background: T.bg, border: "1px solid " + T.border,
        borderRadius: 8, color: T.text, fontSize: 14, fontFamily: fontBody, outline: "none", boxSizing: "border-box",
      }} />
    )}
  </div>
);

const Modal = ({ title, children, onClose, wide }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(30,26,22,0.45)", backdropFilter: "blur(6px)",
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      background: T.surface, border: "1px solid " + T.border, borderRadius: 14,
      padding: 30, width: wide ? 720 : 500, maxWidth: "92vw", maxHeight: "85vh", overflow: "auto",
      boxShadow: "0 24px 80px rgba(30,26,22,0.18)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontFamily: fontDisplay, color: T.text, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: T.bg, border: "1px solid " + T.border, borderRadius: 8, cursor: "pointer", padding: 6, display: "flex" }}>
          <Icon name="x" size={16} color={T.textMuted} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Table = ({ columns, data, onRowClick }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: fontBody, fontSize: 13 }}>
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.key} style={{
              textAlign: "left", padding: "12px 16px", color: T.textDim,
              fontSize: 10, fontFamily: fontMono, letterSpacing: "0.08em", textTransform: "uppercase",
              borderBottom: "2px solid " + T.border, fontWeight: 600, background: T.bg,
            }}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} onClick={() => onRowClick && onRowClick(row)} style={{
            cursor: onRowClick ? "pointer" : "default", transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = T.cardHover}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {columns.map(c => (
              <td key={c.key} style={{
                padding: "13px 16px", borderBottom: "1px solid " + T.borderLight, color: T.text,
              }}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatCard = ({ icon, label, value, change, color = T.accent, trend }) => (
  <div style={{
    background: T.surface, border: "1px solid " + T.border, borderRadius: 12,
    padding: "20px 24px", flex: 1, minWidth: 200, position: "relative", overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 3,
      background: "linear-gradient(90deg, " + color + ", " + color + "40)", borderRadius: "12px 12px 0 0",
    }} />
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: color + "10", border: "1px solid " + color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={18} color={color} />
      </div>
      <span style={{ fontSize: 12, color: T.textMuted, fontFamily: fontMono, letterSpacing: "0.03em", textTransform: "uppercase" }}>{label}</span>
    </div>
    <div style={{ fontSize: 30, fontWeight: 800, fontFamily: fontDisplay, color: T.text, letterSpacing: "-0.02em" }}>{value}</div>
    {change && <div style={{ fontSize: 12, color: trend === "up" ? T.success : T.danger, marginTop: 6, fontWeight: 500 }}>{change}</div>}
  </div>
);

/* ══════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════ */
export default function SecurityApp() {
  const [page, setPage] = useState(PAGES.DASHBOARD);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: PAGES.DASHBOARD, label: "Дашборд", icon: "dashboard" },
    { id: PAGES.VISITORS, label: "Журнал посещений", icon: "visitors" },
    { id: PAGES.PASSES, label: "Пропуска", icon: "pass" },
    { id: PAGES.INSPECTION, label: "Досмотр транспорта", icon: "car" },
    { id: PAGES.DOCUMENTS, label: "Документы охраны", icon: "doc" },
    { id: PAGES.HR_SYNC, label: "HR синхронизация", icon: "hr" },
    { id: PAGES.SCHEDULE, label: "График дежурств", icon: "calendar" },
    { id: PAGES.SETTINGS, label: "Настройки", icon: "settings" },
  ];

  const Sidebar = () => (
    <div style={{
      width: sidebarCollapsed ? 68 : 252, background: T.sidebarBg,
      display: "flex", flexDirection: "column", transition: "width 0.25s ease",
      overflow: "hidden", flexShrink: 0,
      backgroundImage: "linear-gradient(180deg, #2C2420 0%, #1E1A16 100%)",
    }}>
      <div style={{
        padding: sidebarCollapsed ? "22px 14px" : "22px 20px",
        display: "flex", alignItems: "center", gap: 14,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "linear-gradient(135deg, " + T.accent + ", " + T.gold + ")",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          boxShadow: "0 2px 8px " + T.accent + "40",
        }}>
          <Icon name="shield" size={22} color="#FFF" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#F0EBE4", fontFamily: fontDisplay, whiteSpace: "nowrap" }}>MineGuard</div>
            <div style={{ fontSize: 10, color: T.sidebarText, fontFamily: fontMono, letterSpacing: "0.06em", opacity: 0.6 }}>СБ • ГОРНОДОБЫЧА</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: "14px 10px" }}>
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: sidebarCollapsed ? "11px 15px" : "11px 16px",
              background: active ? T.sidebarActive : "transparent",
              border: active ? "1px solid " + T.accent + "30" : "1px solid transparent",
              borderRadius: 9, cursor: "pointer",
              marginBottom: 3, transition: "all 0.15s",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? T.sidebarActive : "transparent"; }}
            >
              <Icon name={item.icon} size={18} color={active ? T.accentLight : T.sidebarText} />
              {!sidebarCollapsed && (
                <span style={{
                  fontSize: 13, fontFamily: fontBody, color: active ? "#F0EBE4" : T.sidebarText,
                  fontWeight: active ? 600 : 400, whiteSpace: "nowrap",
                }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {!sidebarCollapsed && (
        <div style={{ padding: "16px 18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            background: "rgba(166,139,43,0.1)", border: "1px solid rgba(166,139,43,0.2)",
            borderRadius: 10, padding: "12px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Icon name="mountain" size={14} color={T.gold} />
              <span style={{ fontSize: 11, color: T.gold, fontFamily: fontMono, fontWeight: 600, letterSpacing: "0.04em" }}>КАРЬЕР «СЕВЕРНЫЙ»</span>
            </div>
            <div style={{ fontSize: 11, color: T.sidebarText, opacity: 0.7 }}>Смена: дневная • КПП активны</div>
          </div>
        </div>
      )}

      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 12, width: "100%",
          padding: "10px 16px", background: "transparent", border: "none",
          borderRadius: 8, cursor: "pointer", justifyContent: sidebarCollapsed ? "center" : "flex-start",
        }}>
          <Icon name="logout" size={18} color={T.sidebarText} />
          {!sidebarCollapsed && <span style={{ fontSize: 13, color: T.sidebarText, fontFamily: fontBody }}>Выход</span>}
        </button>
      </div>
    </div>
  );

  const TopBar = () => (
    <div style={{
      height: 60, background: T.surface, borderBottom: "1px solid " + T.border,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: T.bg,
          border: "1px solid " + T.border, borderRadius: 10, padding: "8px 16px", width: 300, cursor: "pointer",
        }} onClick={() => setSearchOpen(true)}>
          <Icon name="search" size={16} color={T.textDim} />
          <span style={{ color: T.textDim, fontSize: 13, fontFamily: fontBody }}>Поиск по системе...</span>
          <span style={{ marginLeft: "auto", fontSize: 10, color: T.textDim, fontFamily: fontMono, background: T.surface, padding: "2px 7px", borderRadius: 5, border: "1px solid " + T.border }}>⌘K</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
          background: T.successDim, borderRadius: 8, border: "1px solid " + T.success + "20",
        }}>
          <StatusDot color={T.success} />
          <span style={{ fontSize: 11, color: T.success, fontFamily: fontMono, fontWeight: 600 }}>СИСТЕМА АКТИВНА</span>
        </div>

        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{
            background: T.bg, border: "1px solid " + T.border, borderRadius: 10,
            cursor: "pointer", padding: 8, position: "relative", display: "flex",
          }}>
            <Icon name="bell" size={18} color={T.textMuted} />
            <span style={{
              position: "absolute", top: 4, right: 4, width: 8, height: 8,
              borderRadius: "50%", background: T.danger, border: "2px solid " + T.surface,
            }} />
          </button>
          {notifOpen && (
            <div style={{
              position: "absolute", top: 46, right: 0, width: 340, background: T.surface,
              border: "1px solid " + T.border, borderRadius: 12, padding: 16, zIndex: 200,
              boxShadow: "0 16px 48px rgba(30,26,22,0.15)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: fontDisplay, color: T.text }}>Уведомления</div>
              {[
                { text: "Заявка на пропуск #247 ожидает согласования", time: "5 мин", color: T.warning },
                { text: "Досмотр ТС г/н К456ВА — несоответствие груза", time: "12 мин", color: T.danger },
                { text: "HR: обновлён график смен на май", time: "1 ч", color: T.slate },
              ].map((n, i) => (
                <div key={i} style={{
                  padding: "10px 0", borderBottom: i < 2 ? "1px solid " + T.borderLight : "none",
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <StatusDot color={n.color} />
                  <div>
                    <div style={{ fontSize: 13, color: T.text, fontFamily: fontBody, lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: T.textDim, marginTop: 4 }}>{n.time} назад</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: 1, height: 28, background: T.border }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, " + T.accent + ", " + T.earth + ")",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#FFF", fontFamily: fontDisplay,
          }}>АК</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: fontDisplay }}>Ахметов К.Б.</div>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: fontMono }}>Нач. СБ</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Dashboard ── */
  const DashboardPage = () => (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Icon name="mountain" size={22} color={T.accent} />
          <span style={{ fontSize: 12, fontFamily: fontMono, color: T.accent, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Карьер «Северный» — Служба безопасности</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>Панель управления</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0", fontFamily: fontBody }}>01 мая 2026, четверг • Дневная смена • 08:00–20:00</p>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard icon="visitors" label="Посетители сегодня" value="34" change="+12% к вчера" trend="up" color={T.accent} />
        <StatCard icon="pass" label="Заявки на согласовании" value="7" change="2 срочных" color={T.warning} />
        <StatCard icon="car" label="Досмотров за смену" value="18" change="3 нарушения" color={T.slate} />
        <StatCard icon="shield" label="Охранники на смене" value="12" change="Полная смена" color={T.success} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontFamily: fontDisplay, color: T.text, fontWeight: 700 }}>Последние посещения</h3>
            <Btn small variant="ghost" onClick={() => setPage(PAGES.VISITORS)}>Все →</Btn>
          </div>
          {[
            { name: "Иванов П.С.", company: "ТОО «СтройМонтаж»", time: "09:45", status: "inside" },
            { name: "Сидорова А.В.", company: "ИП «ТехСервис»", time: "09:32", status: "inside" },
            { name: "Козлов Д.М.", company: "АО «МеталлПром»", time: "09:15", status: "left" },
            { name: "Нурланов Е.Б.", company: "ТОО «ЭнергоГрупп»", time: "08:50", status: "left" },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 3 ? "1px solid " + T.borderLight : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.bg, border: "1px solid " + T.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="user" size={16} color={T.textMuted} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v.name}</div>
                <div style={{ fontSize: 11, color: T.textDim }}>{v.company}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontFamily: fontMono, color: T.textMuted }}>{v.time}</div>
                <Badge color={v.status === "inside" ? T.success : T.textDim}>{v.status === "inside" ? "На территории" : "Вышел"}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontFamily: fontDisplay, color: T.text, fontWeight: 700 }}>Заявки на пропуск</h3>
            <Btn small variant="ghost" onClick={() => setPage(PAGES.PASSES)}>Все →</Btn>
          </div>
          {[
            { id: "#247", from: "Литвинов А.К.", type: "Люди (5 чел.)", date: "01.05.2026", status: "pending" },
            { id: "#246", from: "Касымова Н.Р.", type: "Техника (2 ед.)", date: "01.05.2026", status: "pending" },
            { id: "#245", from: "Бектуров С.А.", type: "Люди (3 чел.)", date: "30.04.2026", status: "approved" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 2 ? "1px solid " + T.borderLight : "none" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: p.status === "pending" ? T.warningDim : T.successDim,
                border: "1px solid " + (p.status === "pending" ? T.warning : T.success) + "20",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="pass" size={16} color={p.status === "pending" ? T.warning : T.success} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{p.id} • {p.from}</div>
                <div style={{ fontSize: 11, color: T.textDim }}>{p.type} • {p.date}</div>
              </div>
              {p.status === "pending" ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn small onClick={() => showToast("Заявка одобрена")} icon="check">OK</Btn>
                  <Btn small variant="danger" onClick={() => showToast("Заявка отклонена", "danger")} icon="x">✕</Btn>
                </div>
              ) : <Badge color={T.success}>Одобрено</Badge>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, padding: 22, marginTop: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 18px", fontSize: 16, fontFamily: fontDisplay, color: T.text, fontWeight: 700 }}>Лента событий</h3>
        {[
          { time: "09:47", event: "Въезд техники: БелАЗ г/н А123ВС — КПП-2 (Карьерный)", icon: "truck", color: T.slate },
          { time: "09:45", event: "Посетитель Иванов П.С. зарегистрирован — КПП-1 (Главный)", icon: "user", color: T.accent },
          { time: "09:40", event: "Досмотр: нарушение — ТС г/н К456ВА — незадекларированный груз", icon: "eye", color: T.danger },
          { time: "09:32", event: "Посетитель Сидорова А.В. зарегистрирована — КПП-2", icon: "user", color: T.accent },
          { time: "09:15", event: "Выезд посетителя Козлов Д.М. — КПП-1", icon: "logout", color: T.textDim },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0" }}>
            <span style={{ fontSize: 12, fontFamily: fontMono, color: T.textDim, width: 48, flexShrink: 0 }}>{e.time}</span>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: e.color + "10", border: "1px solid " + e.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={e.icon} size={14} color={e.color} />
            </div>
            <span style={{ fontSize: 13, color: T.text, fontFamily: fontBody }}>{e.event}</span>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── Visitors ── */
  const VisitorsPage = () => {
    const [filterStatus, setFilterStatus] = useState("all");
    const visitors = [
      { id: 1, name: "Иванов Пётр Сергеевич", iin: "850412301245", company: "ТОО «СтройМонтаж»", purpose: "Встреча с гл. инженером", host: "Каримов А.Б.", post: "КПП-1", timeIn: "09:45", timeOut: "—", status: "inside", doc: "Удостоверение" },
      { id: 2, name: "Сидорова Анна Вячеславовна", iin: "900615402158", company: "ИП «ТехСервис»", purpose: "Обслуживание оборудования", host: "Темирбаев Д.К.", post: "КПП-2", timeIn: "09:32", timeOut: "—", status: "inside", doc: "Паспорт" },
      { id: 3, name: "Козлов Дмитрий Михайлович", iin: "780923501369", company: "АО «МеталлПром»", purpose: "Поставка ГСМ", host: "Жумагалиев Н.О.", post: "КПП-1", timeIn: "09:15", timeOut: "10:30", status: "left", doc: "Удостоверение" },
      { id: 4, name: "Нурланов Ерлан Бахтиярович", iin: "880301600847", company: "ТОО «ЭнергоГрупп»", purpose: "Проверка электросети карьера", host: "Смагулов Т.Е.", post: "КПП-1", timeIn: "08:50", timeOut: "11:45", status: "left", doc: "Паспорт" },
    ];
    const filtered = filterStatus === "all" ? visitors : visitors.filter(v => v.status === filterStatus);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>Журнал посещений</h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>Электронный журнал регистрации посетителей на КПП</p>
          </div>
          <Btn icon="plus" onClick={() => setModal("visitor")}>Новый посетитель</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[{ v: "all", l: "Все" }, { v: "inside", l: "На территории" }, { v: "left", l: "Покинули" }].map(f => (
            <button key={f.v} onClick={() => setFilterStatus(f.v)} style={{
              padding: "8px 18px", borderRadius: 8, border: "1px solid " + (filterStatus === f.v ? T.accent : T.border),
              background: filterStatus === f.v ? T.accentDim : T.surface,
              color: filterStatus === f.v ? T.accent : T.textMuted,
              cursor: "pointer", fontSize: 13, fontFamily: fontBody, fontWeight: 500,
            }}>{f.l}</button>
          ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <Table columns={[
            { key: "name", label: "ФИО", render: (v, row) => <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: T.textDim }}>ИИН: {row.iin}</div></div> },
            { key: "company", label: "Организация" }, { key: "purpose", label: "Цель визита" },
            { key: "host", label: "К кому" }, { key: "post", label: "КПП" },
            { key: "timeIn", label: "Вход", render: v => <span style={{ fontFamily: fontMono }}>{v}</span> },
            { key: "timeOut", label: "Выход", render: v => <span style={{ fontFamily: fontMono }}>{v}</span> },
            { key: "status", label: "Статус", render: v => <Badge color={v === "inside" ? T.success : T.textDim}>{v === "inside" ? "На территории" : "Вышел"}</Badge> },
          ]} data={filtered} onRowClick={row => setModal({ type: "visitorDetail", data: row })} />
        </div>
      </div>
    );
  };

  /* ── Passes ── */
  const PassesPage = () => {
    const [tab, setTab] = useState("all");
    const passes = [
      { id: "#247", requester: "Литвинов А.К.", dept: "Горный цех", type: "people", count: "5 чел.", dateRange: "01.05 – 15.05.2026", status: "pending", urgency: "normal", reason: "Ремонт дробилки" },
      { id: "#246", requester: "Касымова Н.Р.", dept: "Логистика", type: "vehicle", count: "2 ед.", dateRange: "01.05 – 03.05.2026", status: "pending", urgency: "urgent", reason: "Завоз ВМ" },
      { id: "#245", requester: "Бектуров С.А.", dept: "АХО", type: "people", count: "3 чел.", dateRange: "30.04.2026", status: "approved", urgency: "normal", reason: "Обслуживание вентиляции" },
      { id: "#244", requester: "Мусин Р.Т.", dept: "IT отдел", type: "people", count: "2 чел.", dateRange: "29–30.04.2026", status: "approved", urgency: "normal", reason: "Настройка АСУТП" },
      { id: "#243", requester: "Жангозин Б.К.", dept: "Склад ГСМ", type: "vehicle", count: "1 ед.", dateRange: "28.04.2026", status: "rejected", urgency: "normal", reason: "Вывоз масла" },
    ];
    const filtered = tab === "all" ? passes : passes.filter(p => p.status === tab);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>Заявки на пропуск</h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>Согласование пропусков людей и техники на территорию карьера</p>
          </div>
          <Btn icon="plus" onClick={() => setModal("pass")}>Новая заявка</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[{ v: "all", l: "Все", c: passes.length }, { v: "pending", l: "Ожидают", c: 2 }, { v: "approved", l: "Одобрены", c: 2 }, { v: "rejected", l: "Отклонены", c: 1 }].map(f => (
            <button key={f.v} onClick={() => setTab(f.v)} style={{
              padding: "8px 18px", borderRadius: 8, border: "1px solid " + (tab === f.v ? T.accent : T.border),
              background: tab === f.v ? T.accentDim : T.surface,
              color: tab === f.v ? T.accent : T.textMuted,
              cursor: "pointer", fontSize: 13, fontFamily: fontBody, fontWeight: 500,
            }}>{f.l} ({f.c})</button>
          ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <Table columns={[
            { key: "id", label: "№", render: (v, row) => <div><span style={{ fontFamily: fontMono, fontWeight: 700 }}>{v}</span>{row.urgency === "urgent" && <span style={{ marginLeft: 6 }}><Badge color={T.danger}>СРОЧНО</Badge></span>}</div> },
            { key: "requester", label: "Заявитель", render: (v, row) => <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: T.textDim }}>{row.dept}</div></div> },
            { key: "type", label: "Тип", render: v => <Badge color={v === "people" ? T.slate : T.earth}>{v === "people" ? "Люди" : "Техника"}</Badge> },
            { key: "count", label: "Кол-во" }, { key: "dateRange", label: "Период" }, { key: "reason", label: "Основание" },
            { key: "status", label: "Статус", render: v => { const s = { pending: { c: T.warning, l: "Ожидает" }, approved: { c: T.success, l: "Одобрено" }, rejected: { c: T.danger, l: "Отклонено" } }; return <Badge color={s[v].c}>{s[v].l}</Badge>; } },
            { key: "actions", label: "", render: (_, row) => row.status === "pending" ? <div style={{ display: "flex", gap: 6 }}><Btn small onClick={() => showToast("Заявка " + row.id + " одобрена")} icon="check">Одобрить</Btn><Btn small variant="danger" onClick={() => showToast("Заявка " + row.id + " отклонена", "danger")} icon="x">Откл.</Btn></div> : null },
          ]} data={filtered} onRowClick={row => setModal({ type: "passDetail", data: row })} />
        </div>
      </div>
    );
  };

  /* ── Inspection ── */
  const InspectionPage = () => {
    const data = [
      { plate: "А 123 ВС 01", driver: "Мухамедов А.Н.", type: "БелАЗ-75131", direction: "Въезд", time: "09:47", post: "КПП-2", cargo: "Порода", status: "passed", inspector: "Серіков Б.Т.", notes: "Без замечаний" },
      { plate: "К 456 ВА 01", driver: "Петренко И.В.", type: "КамАЗ-6520", direction: "Выезд", time: "09:40", post: "КПП-1", cargo: "Руда медная", status: "violation", inspector: "Қасымов Е.Р.", notes: "Незадекларированный груз" },
      { plate: "В 789 СТ 01", driver: "Жарылгасинов Т.С.", type: "Toyota LC", direction: "Въезд", time: "09:20", post: "КПП-1", cargo: "—", status: "passed", inspector: "Серіков Б.Т.", notes: "Без замечаний" },
      { plate: "Н 012 ХМ 01", driver: "Кузнецов В.П.", type: "Автокран КС-55713", direction: "Въезд", time: "08:55", post: "КПП-2", cargo: "Спецтехника", status: "passed", inspector: "Қасымов Е.Р.", notes: "Разрешение в порядке" },
    ];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>Досмотр транспорта</h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>Регистрация и досмотр ТС на КПП карьера</p>
          </div>
          <Btn icon="plus" onClick={() => setModal("inspection")}>Новый досмотр</Btn>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          <StatCard icon="car" label="Всего за смену" value="18" color={T.slate} />
          <StatCard icon="truck" label="Карьерная техника" value="8" color={T.earth} />
          <StatCard icon="eye" label="Нарушений" value="3" color={T.danger} />
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <Table columns={[
            { key: "plate", label: "Гос. номер", render: v => <span style={{ fontFamily: fontMono, fontWeight: 700, fontSize: 14 }}>{v}</span> },
            { key: "driver", label: "Водитель" }, { key: "type", label: "Тип ТС" },
            { key: "direction", label: "Направление", render: v => <span style={{ color: v === "Въезд" ? T.success : T.accent, fontWeight: 600 }}>{v === "Въезд" ? "→ " : "← "}{v}</span> },
            { key: "time", label: "Время", render: v => <span style={{ fontFamily: fontMono }}>{v}</span> },
            { key: "post", label: "КПП" }, { key: "cargo", label: "Груз" },
            { key: "status", label: "Результат", render: v => <Badge color={v === "passed" ? T.success : T.danger}>{v === "passed" ? "Пройден" : "Нарушение"}</Badge> },
          ]} data={data} onRowClick={row => setModal({ type: "inspectionDetail", data: row })} />
        </div>
      </div>
    );
  };

  /* ── Documents ── */
  const DocumentsPage = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>Документы охраны</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>Электронный архив документов службы безопасности</p>
        </div>
        <Btn icon="upload" onClick={() => setModal("upload")}>Загрузить документ</Btn>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {[{ name: "Приказы", count: 24, color: T.accent }, { name: "Инструкции", count: 18, color: T.slate }, { name: "Акты проверок", count: 42, color: T.earth }, { name: "Журналы", count: 8, color: T.gold }].map((c, i) => (
          <div key={i} style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, padding: "18px 22px", flex: 1, minWidth: 160, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderTop: "3px solid " + c.color, cursor: "pointer" }}>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 8 }}>{c.name}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: T.text, fontFamily: fontDisplay }}>{c.count}</div>
          </div>
        ))}
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <Table columns={[
          { key: "name", label: "Название", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "category", label: "Категория", render: v => <Badge color={T.slate}>{v}</Badge> },
          { key: "date", label: "Дата", render: v => <span style={{ fontFamily: fontMono }}>{v}</span> },
          { key: "author", label: "Автор" },
          { key: "status", label: "Статус", render: v => <Badge color={v === "active" ? T.success : T.textDim}>{v === "active" ? "Действующий" : "Архив"}</Badge> },
          { key: "actions", label: "", render: () => <div style={{ display: "flex", gap: 6 }}><Btn small variant="ghost" icon="eye">Открыть</Btn><Btn small variant="ghost" icon="download">Скачать</Btn></div> },
        ]} data={[
          { name: "Приказ №145 — О пропускном режиме на карьере", category: "Приказы", date: "28.04.2026", author: "Ахметов К.Б.", status: "active" },
          { name: "Инструкция — Порядок досмотра ТС (вкл. БелАЗ)", category: "Инструкции", date: "15.04.2026", author: "Серіков Б.Т.", status: "active" },
          { name: "Акт проверки КПП-1 от 25.04.2026", category: "Акты", date: "25.04.2026", author: "Қасымов Е.Р.", status: "active" },
          { name: "Приказ №132 — Безопасность на взрывных работах", category: "Приказы", date: "10.03.2026", author: "Ахметов К.Б.", status: "active" },
          { name: "Журнал выдачи ключей — Апрель 2026", category: "Журналы", date: "01.04.2026", author: "Мусин Р.Т.", status: "archive" },
        ]} />
      </div>
    </div>
  );

  /* ── HR Sync ── */
  const HRSyncPage = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>HR Синхронизация</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>Данные сотрудников СБ из кадровой системы предприятия</p>
        </div>
        <Btn icon="sync" variant="secondary" onClick={() => showToast("Синхронизировано с HR")}>Синхронизировать</Btn>
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.success + "25", borderRadius: 12, padding: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: T.successDim, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="sync" size={20} color={T.success} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: fontDisplay }}>Последняя синхронизация: 01.05.2026 в 08:00</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>Источник: 1С:ЗУП «Горнодобывающая компания» • ✓ Успешно • 48 сотрудников</div>
        </div>
        <Badge color={T.success}>Актуально</Badge>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard icon="user" label="Всего сотрудников СБ" value="48" color={T.slate} />
        <StatCard icon="shield" label="На смене" value="12" color={T.success} />
        <StatCard icon="calendar" label="В отпуске" value="3" color={T.warning} />
        <StatCard icon="hr" label="На больничном" value="2" color={T.danger} />
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <Table columns={[
          { key: "name", label: "ФИО", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "position", label: "Должность" },
          { key: "shift", label: "Смена", render: v => <Badge color={v === "Дневная" ? T.accent : T.earth}>{v}</Badge> },
          { key: "status", label: "Статус", render: v => { const s = { on_duty: { c: T.success, l: "На смене" }, off_duty: { c: T.textDim, l: "Не на смене" }, vacation: { c: T.warning, l: "Отпуск" }, sick: { c: T.danger, l: "Больничный" } }; return <span style={{ display: "flex", alignItems: "center", gap: 6 }}><StatusDot color={s[v].c} />{s[v].l}</span>; } },
          { key: "phone", label: "Телефон", render: v => <span style={{ fontFamily: fontMono, fontSize: 12 }}>{v}</span> },
        ]} data={[
          { name: "Серіков Бауыржан Тимурович", position: "Охранник КПП", shift: "Дневная", status: "on_duty", phone: "+7 701 123 4567" },
          { name: "Қасымов Ерлан Русланович", position: "Старший охранник", shift: "Дневная", status: "on_duty", phone: "+7 702 234 5678" },
          { name: "Мусин Рустем Тагирович", position: "Охранник периметра", shift: "Ночная", status: "off_duty", phone: "+7 705 345 6789" },
          { name: "Жуматаев Арман Кайратович", position: "Охранник карьера", shift: "Дневная", status: "vacation", phone: "+7 707 456 7890" },
          { name: "Бисенов Даулет Нурланович", position: "Охранник КПП", shift: "Ночная", status: "sick", phone: "+7 708 567 8901" },
        ]} />
      </div>
    </div>
  );

  /* ── Schedule ── */
  const SchedulePage = () => {
    const days = ["Пн 28", "Вт 29", "Ср 30", "Чт 01", "Пт 02", "Сб 03", "Вс 04"];
    const guards = [
      { name: "Серіков Б.Т.", post: "КПП-1", shifts: ["day", "day", "night", "night", "off", "off", "day"] },
      { name: "Қасымов Е.Р.", post: "КПП-2", shifts: ["day", "day", "off", "off", "day", "day", "night"] },
      { name: "Мусин Р.Т.", post: "Периметр", shifts: ["night", "night", "day", "day", "off", "off", "night"] },
      { name: "Жуматаев А.К.", post: "Карьер", shifts: ["off", "off", "day", "day", "night", "night", "off"] },
      { name: "Алиев М.С.", post: "КПП-2", shifts: ["night", "off", "off", "day", "day", "night", "night"] },
    ];
    const sc = { day: { bg: T.accentDim, c: T.accent, l: "День", b: T.accentBorder }, night: { bg: T.earthDim, c: T.earth, l: "Ночь", b: T.earth + "30" }, off: { bg: "transparent", c: T.textDim, l: "—", b: "transparent" } };
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: 0 }}>График дежурств</h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "6px 0 0" }}>28 апреля — 04 мая 2026</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}><Btn variant="ghost">← Пред.</Btn><Btn variant="ghost">След. →</Btn></div>
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, overflow: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              <th style={{ textAlign: "left", padding: "14px 18px", fontSize: 10, fontFamily: fontMono, color: T.textDim, borderBottom: "2px solid " + T.border, background: T.bg }}>СОТРУДНИК</th>
              <th style={{ textAlign: "left", padding: "14px 12px", fontSize: 10, fontFamily: fontMono, color: T.textDim, borderBottom: "2px solid " + T.border, background: T.bg }}>ПОСТ</th>
              {days.map(d => <th key={d} style={{ textAlign: "center", padding: "14px 8px", fontSize: 11, fontFamily: fontMono, color: d.includes("01") ? T.accent : T.textDim, borderBottom: "2px solid " + T.border, background: d.includes("01") ? T.accentDim : T.bg, fontWeight: 600 }}>{d}</th>)}
            </tr></thead>
            <tbody>{guards.map((g, i) => (
              <tr key={i}>
                <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600, fontFamily: fontBody, color: T.text, borderBottom: "1px solid " + T.borderLight }}>{g.name}</td>
                <td style={{ padding: "12px 12px", fontSize: 12, fontFamily: fontMono, color: T.textMuted, borderBottom: "1px solid " + T.borderLight }}>{g.post}</td>
                {g.shifts.map((s, j) => <td key={j} style={{ textAlign: "center", padding: 8, borderBottom: "1px solid " + T.borderLight, background: days[j]?.includes("01") ? T.accent + "05" : "transparent" }}>
                  <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 6, background: sc[s].bg, color: sc[s].c, border: "1px solid " + sc[s].b, fontSize: 11, fontFamily: fontMono, fontWeight: 600 }}>{sc[s].l}</span>
                </td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          {[["day", "День"], ["night", "Ночь"]].map(([k, l]) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: sc[k].bg, border: "1px solid " + sc[k].b }} /><span style={{ fontSize: 12, color: T.textMuted }}>{l}</span></div>)}
        </div>
      </div>
    );
  };

  /* ── Settings ── */
  const SettingsPage = () => (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: fontDisplay, color: T.text, margin: "0 0 24px" }}>Настройки системы</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { title: "Посты охраны (КПП)", desc: "КПП карьера", items: ["КПП-1 (Главный вход)", "КПП-2 (Карьерный)", "КПП-3 (Склад ГСМ)", "КПП-4 (Обогатительная фабрика)"] },
          { title: "Роли и доступ", desc: "Права пользователей", items: ["Администратор", "Начальник СБ", "Старший охранник", "Охранник КПП"] },
          { title: "Интеграции", desc: "Внешние системы", items: ["1С:ЗУП — ✓ Активна", "СКУД — ✓ Активна", "Видеонаблюдение — ✓ Активна", "АСУТП — ⚠ Настроить"] },
          { title: "Уведомления", desc: "Оповещения", items: ["Email — Включено", "SMS — Включено", "Telegram-бот — ✓ Активен", "Push — Отключено"] },
        ].map((s, i) => (
          <div key={i} style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontFamily: fontDisplay, color: T.text, fontWeight: 700 }}>{s.title}</h3>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: T.textDim }}>{s.desc}</p>
            {s.items.map((item, j) => (
              <div key={j} style={{ padding: "10px 14px", background: T.bg, borderRadius: 8, marginBottom: 6, fontSize: 13, color: T.textSecondary, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid " + T.borderLight }}>
                <span>{item}</span><Icon name="chevron" size={14} color={T.textDim} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  /* ═══ Modals ═══ */
  const renderModal = () => {
    if (!modal) return null;
    if (modal === "visitor") return (
      <Modal title="Регистрация посетителя" onClose={() => setModal(null)}>
        <Input label="ФИО посетителя" placeholder="Иванов Пётр Сергеевич" value="" onChange={() => {}} />
        <Input label="ИИН" placeholder="850412301245" value="" onChange={() => {}} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Input label="Документ" select options={[{ value: "id", label: "Удостоверение" }, { value: "passport", label: "Паспорт" }]} value="id" onChange={() => {}} />
          <Input label="Номер документа" placeholder="012345678" value="" onChange={() => {}} />
        </div>
        <Input label="Организация" placeholder="ТОО «СтройМонтаж»" value="" onChange={() => {}} />
        <Input label="Цель визита" placeholder="Встреча с гл. инженером карьера" value="" onChange={() => {}} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Input label="К кому" placeholder="Каримов А.Б." value="" onChange={() => {}} />
          <Input label="КПП" select options={[{ value: "1", label: "КПП-1 (Главный)" }, { value: "2", label: "КПП-2 (Карьерный)" }, { value: "3", label: "КПП-3 (Склад ГСМ)" }]} value="1" onChange={() => {}} />
        </div>
        <Input label="Наличие СИЗ" select options={[{ value: "yes", label: "Да" }, { value: "no", label: "Нет" }, { value: "issued", label: "Выдано на КПП" }]} value="yes" onChange={() => {}} />
        <Input label="Примечания" textarea placeholder="Дополнительная информация..." value="" onChange={() => {}} />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Отмена</Btn>
          <Btn icon="check" onClick={() => { setModal(null); showToast("Посетитель зарегистрирован"); }}>Зарегистрировать</Btn>
        </div>
      </Modal>
    );
    if (modal === "pass") return (
      <Modal title="Новая заявка на пропуск" onClose={() => setModal(null)} wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Заявитель" placeholder="Литвинов А.К." value="" onChange={() => {}} />
          <Input label="Подразделение" select options={[{ value: "q", label: "Горный цех" }, { value: "e", label: "Обогатительная фабрика" }, { value: "l", label: "Логистика" }, { value: "g", label: "Склад ГСМ" }]} value="q" onChange={() => {}} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Input label="Тип" select options={[{ value: "p", label: "Люди" }, { value: "v", label: "Техника" }, { value: "b", label: "Люди + Техника" }]} value="p" onChange={() => {}} />
          <Input label="Дата начала" type="date" value="2026-05-01" onChange={() => {}} />
          <Input label="Дата окончания" type="date" value="2026-05-15" onChange={() => {}} />
        </div>
        <Input label="Основание" textarea placeholder="Подрядные работы по ремонту дробильного оборудования..." value="" onChange={() => {}} />
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, color: T.textMuted, marginBottom: 10, fontFamily: fontMono, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>Маршрут согласования</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {["Заявитель ✓", "Нач. подразделения", "Служба безопасности", "Директор"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, background: i === 0 ? T.successDim : T.bg, color: i === 0 ? T.success : T.textMuted, border: "1px solid " + (i === 0 ? T.success : T.border) + "30", fontFamily: fontBody, fontWeight: 500 }}>{s}</div>
                {i < 3 && <span style={{ color: T.textDim }}>→</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Отмена</Btn>
          <Btn icon="check" onClick={() => { setModal(null); showToast("Заявка отправлена"); }}>Отправить</Btn>
        </div>
      </Modal>
    );
    if (modal === "inspection") return (
      <Modal title="Новый досмотр транспорта" onClose={() => setModal(null)} wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Input label="Гос. номер" placeholder="А 123 ВС 01" value="" onChange={() => {}} />
          <Input label="Тип ТС" select options={[{ value: "c", label: "Легковой" }, { value: "t", label: "Грузовой" }, { value: "b", label: "БелАЗ" }, { value: "s", label: "Спецтехника" }]} value="c" onChange={() => {}} />
          <Input label="Направление" select options={[{ value: "in", label: "Въезд" }, { value: "out", label: "Выезд" }]} value="in" onChange={() => {}} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Водитель" placeholder="Мухамедов А.Н." value="" onChange={() => {}} />
          <Input label="КПП" select options={[{ value: "1", label: "КПП-1" }, { value: "2", label: "КПП-2" }]} value="1" onChange={() => {}} />
        </div>
        <Input label="Груз / ТМЦ" textarea placeholder="Руда медная, 20 тонн..." value="" onChange={() => {}} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="ТТН" placeholder="ТТН-2026-0547" value="" onChange={() => {}} />
          <Input label="Заявка" placeholder="#246" value="" onChange={() => {}} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, color: T.textMuted, marginBottom: 10, fontFamily: fontMono, letterSpacing: "0.05em", textTransform: "uppercase" }}>Результат досмотра</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ l: "Без нарушений", c: T.success }, { l: "Нарушение", c: T.danger }].map(r => (
              <button key={r.l} style={{ flex: 1, padding: "14px 16px", borderRadius: 10, border: "2px solid " + r.c + "30", background: r.c + "06", cursor: "pointer", fontSize: 14, fontWeight: 600, color: r.c, fontFamily: fontBody }}>{r.l}</button>
            ))}
          </div>
        </div>
        <div style={{ border: "2px dashed " + T.border, borderRadius: 12, padding: 28, textAlign: "center", marginBottom: 16, cursor: "pointer", background: T.bg }}>
          <Icon name="camera" size={32} color={T.textDim} />
          <div style={{ fontSize: 13, color: T.textMuted, marginTop: 8 }}>Прикрепить фото досмотра</div>
        </div>
        <Input label="Комментарий" textarea placeholder="Заметки по результатам..." value="" onChange={() => {}} />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Отмена</Btn>
          <Btn icon="check" onClick={() => { setModal(null); showToast("Акт досмотра сохранён"); }}>Сохранить</Btn>
        </div>
      </Modal>
    );
    if (modal === "upload") return (
      <Modal title="Загрузка документа" onClose={() => setModal(null)}>
        <Input label="Название" placeholder="Приказ №146..." value="" onChange={() => {}} />
        <Input label="Категория" select options={[{ value: "o", label: "Приказы" }, { value: "i", label: "Инструкции" }, { value: "a", label: "Акты" }, { value: "j", label: "Журналы" }]} value="o" onChange={() => {}} />
        <div style={{ border: "2px dashed " + T.border, borderRadius: 12, padding: 36, textAlign: "center", marginBottom: 16, cursor: "pointer", background: T.bg }}>
          <Icon name="upload" size={36} color={T.textDim} />
          <div style={{ fontSize: 14, color: T.textMuted, marginTop: 10 }}>Перетащите файл или нажмите</div>
          <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>PDF, DOC, DOCX до 50 МБ</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Отмена</Btn>
          <Btn icon="upload" onClick={() => { setModal(null); showToast("Документ загружен"); }}>Загрузить</Btn>
        </div>
      </Modal>
    );
    if (modal?.type === "visitorDetail") { const d = modal.data; return (
      <Modal title="Карточка посетителя" onClose={() => setModal(null)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["ФИО", d.name], ["ИИН", d.iin], ["Организация", d.company], ["Документ", d.doc], ["Цель", d.purpose], ["К кому", d.host], ["КПП", d.post], ["Вход", d.timeIn], ["Выход", d.timeOut]].map(([l, v], i) => (
            <div key={i}><div style={{ fontSize: 10, color: T.textDim, fontFamily: fontMono, textTransform: "uppercase", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{v}</div></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          {d.status === "inside" && <Btn icon="logout" variant="secondary" onClick={() => { setModal(null); showToast("Выход отмечен"); }}>Отметить выход</Btn>}
          <Btn variant="ghost" onClick={() => setModal(null)}>Закрыть</Btn>
        </div>
      </Modal>
    ); }
    if (modal?.type === "passDetail") { const d = modal.data; return (
      <Modal title={"Заявка " + d.id} onClose={() => setModal(null)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Заявитель", d.requester], ["Подразделение", d.dept], ["Тип", d.type === "people" ? "Люди" : "Техника"], ["Количество", d.count], ["Период", d.dateRange], ["Основание", d.reason]].map(([l, v], i) => (
            <div key={i}><div style={{ fontSize: 10, color: T.textDim, fontFamily: fontMono, textTransform: "uppercase", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{v}</div></div>
          ))}
        </div>
        {d.status === "pending" && <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn icon="check" onClick={() => { setModal(null); showToast("Одобрено"); }}>Одобрить</Btn>
          <Btn variant="danger" icon="x" onClick={() => { setModal(null); showToast("Отклонено", "danger"); }}>Отклонить</Btn>
        </div>}
      </Modal>
    ); }
    if (modal?.type === "inspectionDetail") { const d = modal.data; return (
      <Modal title="Акт досмотра" onClose={() => setModal(null)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Гос. номер", d.plate], ["Тип ТС", d.type], ["Водитель", d.driver], ["Направление", d.direction], ["КПП", d.post], ["Время", d.time], ["Груз", d.cargo], ["Инспектор", d.inspector], ["Результат", d.status === "passed" ? "Без нарушений" : "Нарушение"], ["Примечание", d.notes]].map(([l, v], i) => (
            <div key={i}><div style={{ fontSize: 10, color: T.textDim, fontFamily: fontMono, textTransform: "uppercase", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 14, color: v === "Нарушение" ? T.danger : T.text, fontWeight: 600 }}>{v}</div></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" icon="download">Скачать акт</Btn>
          <Btn variant="ghost" onClick={() => setModal(null)}>Закрыть</Btn>
        </div>
      </Modal>
    ); }
    return null;
  };

  const SearchModal = () => searchOpen ? (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120, background: "rgba(30,26,22,0.35)", backdropFilter: "blur(6px)" }} onClick={() => setSearchOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 14, width: 540, maxWidth: "90vw", overflow: "hidden", boxShadow: "0 24px 80px rgba(30,26,22,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid " + T.borderLight }}>
          <Icon name="search" size={18} color={T.textDim} />
          <input autoFocus placeholder="Поиск по системе..." style={{ flex: 1, background: "none", border: "none", color: T.text, fontSize: 15, fontFamily: fontBody, outline: "none" }} />
        </div>
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: T.textDim, padding: "8px 10px", fontFamily: fontMono, letterSpacing: "0.06em" }}>БЫСТРЫЙ ДОСТУП</div>
          {[{ icon: "plus", label: "Зарегистрировать посетителя", page: "visitor" }, { icon: "pass", label: "Создать заявку на пропуск", page: "pass" }, { icon: "car", label: "Оформить досмотр ТС", page: "inspection" }, { icon: "doc", label: "Загрузить документ", page: "upload" }].map((item, i) => (
            <div key={i} onClick={() => { setSearchOpen(false); setModal(item.page); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = T.cardHover}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Icon name={item.icon} size={16} color={T.accent} />
              <span style={{ fontSize: 14, color: T.text, fontFamily: fontBody }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;

  const Toast = () => toast ? (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 3000,
      background: "#FFF", border: "1px solid " + (toast.type === "danger" ? T.danger : T.success) + "30",
      borderLeft: "4px solid " + (toast.type === "danger" ? T.danger : T.success),
      borderRadius: 10, padding: "14px 22px", display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 8px 32px rgba(30,26,22,0.15)", animation: "slideIn 0.3s ease",
    }}>
      <Icon name={toast.type === "danger" ? "x" : "check"} size={18} color={toast.type === "danger" ? T.danger : T.success} />
      <span style={{ fontSize: 14, color: T.text, fontFamily: fontBody, fontWeight: 600 }}>{toast.msg}</span>
    </div>
  ) : null;

  const pages = { [PAGES.DASHBOARD]: DashboardPage, [PAGES.VISITORS]: VisitorsPage, [PAGES.PASSES]: PassesPage, [PAGES.INSPECTION]: InspectionPage, [PAGES.DOCUMENTS]: DocumentsPage, [PAGES.HR_SYNC]: HRSyncPage, [PAGES.SCHEDULE]: SchedulePage, [PAGES.SETTINGS]: SettingsPage };
  const PageComponent = pages[page] || DashboardPage;

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, color: T.text, fontFamily: fontBody, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        select option { background: ${T.surface}; color: ${T.text}; }
        input::placeholder, textarea::placeholder { color: ${T.textDim}; }
      `}</style>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <div style={{ flex: 1, overflow: "auto", padding: 28 }} onClick={() => setNotifOpen(false)}>
          <PageComponent />
        </div>
      </div>
      {renderModal()}
      <SearchModal />
      <Toast />
    </div>
  );
}
