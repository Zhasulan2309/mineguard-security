import { useState } from "react";

/* ─── Polymetal Logo (base64 PNG with transparent bg) ─── */
const LOGO_SRC =
  "data:image/png;base64,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";
const PolymetalLogo = ({ size = 36 }) => (
  <img
    src={LOGO_SRC}
    width={size}
    height={size}
    style={{ objectFit: "contain" }}
    alt="Polymetal"
  />
);

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

const T = {
  bg: "#F3F1EC",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  cardHover: "#F9F7F3",
  border: "#E2DDD5",
  borderLight: "#EBE7E0",
  text: "#1A1612",
  textSecondary: "#4A4238",
  textMuted: "#8A8078",
  textDim: "#B0A89E",
  accent: "#F0960E",
  accentDark: "#D4820A",
  accentDim: "rgba(240,150,14,0.10)",
  accentBorder: "rgba(240,150,14,0.25)",
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
  grey: "#A8A9AD",
  sidebarBg: "#1E1A16",
  sidebarText: "#C8BEB4",
  sidebarActive: "rgba(240,150,14,0.15)",
};

const fd = "'Outfit','DM Sans',sans-serif",
  fm = "'IBM Plex Mono','SF Mono',monospace",
  fb = "'DM Sans','Segoe UI',sans-serif";

/* ─── Subsidiaries ─── */
const COMPANIES = [
  { id: "all", name: "Все компании", short: "Все" },
  { id: "head", name: "Polymetal (Головной)", short: "Головной" },
  { id: "kyzyl", name: "Кызыл (Золото)", short: "Кызыл" },
  { id: "varvara", name: "Варвара (Медь)", short: "Варвара" },
  { id: "altyntau", name: "Алтынтау (Золото)", short: "Алтынтау" },
];

const COMPANY_STATS = {
  all: { visitors: 34, passes: 7, inspections: 18, guards: 48 },
  head: { visitors: 8, passes: 2, inspections: 3, guards: 12 },
  kyzyl: { visitors: 12, passes: 3, inspections: 7, guards: 14 },
  varvara: { visitors: 8, passes: 1, inspections: 5, guards: 12 },
  altyntau: { visitors: 6, passes: 1, inspections: 3, guards: 10 },
};

/* ─── Icons ─── */
const Icon = ({ name, size = 20, color = T.textMuted }) => {
  const p = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    visitors: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    pass: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h4" />
      </>
    ),
    car: (
      <>
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
        <circle cx="8" cy="14" r="1.5" />
        <circle cx="16" cy="14" r="1.5" />
      </>
    ),
    doc: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </>
    ),
    hr: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <path d="M2 21h20" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    chevron: (
      <>
        <polyline points="9 18 15 12 9 6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    truck: (
      <>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    sync: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),
    mountain: (
      <>
        <path d="M8 21l4.5-9 3.5 5 3-4 3 8H2L5.5 11z" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
        <path d="M9 22v-4h6v4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {p[name]}
    </svg>
  );
};

const Badge = ({ children, color = T.accent, bg }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 10px",
      borderRadius: 5,
      fontSize: 11,
      fontFamily: fm,
      fontWeight: 600,
      color,
      background: bg || color + "12",
      letterSpacing: "0.02em",
      border: "1px solid " + color + "20",
    }}
  >
    {children}
  </span>
);
const StatusDot = ({ color }) => (
  <span
    style={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      display: "inline-block",
      boxShadow: "0 0 0 3px " + color + "20",
    }}
  />
);
const Btn = ({
  children,
  onClick,
  variant = "primary",
  icon,
  small,
  style: s,
}) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    border: "none",
    cursor: "pointer",
    fontFamily: fb,
    fontWeight: 600,
    borderRadius: 8,
    transition: "all 0.2s",
    fontSize: small ? 12 : 13,
    padding: small ? "6px 14px" : "10px 20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  };
  const v = {
    primary: { background: T.accent, color: "#FFF" },
    secondary: {
      background: T.bg,
      color: T.textSecondary,
      border: "1px solid " + T.border,
    },
    danger: {
      background: T.dangerDim,
      color: T.danger,
      border: "1px solid " + T.danger + "25",
    },
    ghost: {
      background: "transparent",
      color: T.textMuted,
      border: "1px solid " + T.border,
      boxShadow: "none",
    },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...v[variant], ...s }}>
      {icon && (
        <Icon
          name={icon}
          size={small ? 14 : 16}
          color={variant === "primary" ? "#FFF" : v[variant].color}
        />
      )}
      {children}
    </button>
  );
};
const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
  select,
  options,
}) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: T.textMuted,
          marginBottom: 6,
          fontFamily: fm,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
    )}
    {select ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: T.bg,
          border: "1px solid " + T.border,
          borderRadius: 8,
          color: T.text,
          fontSize: 14,
          fontFamily: fb,
          outline: "none",
          appearance: "none",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ) : textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: T.bg,
          border: "1px solid " + T.border,
          borderRadius: 8,
          color: T.text,
          fontSize: 14,
          fontFamily: fb,
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: T.bg,
          border: "1px solid " + T.border,
          borderRadius: 8,
          color: T.text,
          fontSize: 14,
          fontFamily: fb,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    )}
  </div>
);
const Table = ({ columns, data, onRowClick }) => (
  <div style={{ overflowX: "auto" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: fb,
        fontSize: 13,
      }}
    >
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              style={{
                textAlign: "left",
                padding: "12px 16px",
                color: T.textDim,
                fontSize: 10,
                fontFamily: fm,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "2px solid " + T.border,
                fontWeight: 600,
                background: T.bg,
              }}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            onClick={() => onRowClick && onRowClick(row)}
            style={{
              cursor: onRowClick ? "pointer" : "default",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = T.cardHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {columns.map((c) => (
              <td
                key={c.key}
                style={{
                  padding: "13px 16px",
                  borderBottom: "1px solid " + T.borderLight,
                  color: T.text,
                }}
              >
                {c.render ? c.render(row[c.key], row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const StatCard = ({ icon, label, value, change, color = T.accent, trend }) => (
  <div
    style={{
      background: T.surface,
      border: "1px solid " + T.border,
      borderRadius: 12,
      padding: "20px 24px",
      flex: 1,
      minWidth: 180,
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg," + color + "," + color + "40)",
        borderRadius: "12px 12px 0 0",
      }}
    />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: color + "10",
          border: "1px solid " + color + "20",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={17} color={color} />
      </div>
      <span
        style={{
          fontSize: 11,
          color: T.textMuted,
          fontFamily: fm,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{ fontSize: 28, fontWeight: 800, fontFamily: fd, color: T.text }}
    >
      {value}
    </div>
    {change && (
      <div
        style={{
          fontSize: 12,
          color: trend === "up" ? T.success : T.danger,
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        {change}
      </div>
    )}
  </div>
);

/* ═══ SlideOver Panel ═══ */
const SlideOver = ({ title, children, onClose, wide }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "flex-end",
    }}
    onClick={onClose}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(30,26,22,0.35)",
        backdropFilter: "blur(4px)",
      }}
    />
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative",
        width: wide ? 680 : 480,
        maxWidth: "92vw",
        height: "100vh",
        background: T.surface,
        borderLeft: "1px solid " + T.border,
        boxShadow: "-8px 0 40px rgba(30,26,22,0.15)",
        display: "flex",
        flexDirection: "column",
        animation: "slideRight 0.25s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: "1px solid " + T.border,
          flexShrink: 0,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 17,
            fontFamily: fd,
            color: T.text,
            fontWeight: 700,
          }}
        >
          {title}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: T.bg,
            border: "1px solid " + T.border,
            borderRadius: 8,
            cursor: "pointer",
            padding: 6,
            display: "flex",
          }}
        >
          <Icon name="x" size={16} color={T.textMuted} />
        </button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 24 }}>{children}</div>
    </div>
  </div>
);

/* ═══ MAIN APP ═══ */
export default function App() {
  const [page, setPage] = useState(PAGES.DASHBOARD);
  const [collapsed, setCollapsed] = useState(false);
  const [panel, setPanel] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [company, setCompany] = useState("all");

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

  const NOTIFS = [
    {
      text: "Заявка #247 ожидает согласования",
      time: "5 мин",
      color: T.warning,
      company: "Кызыл",
    },
    {
      text: "Досмотр ТС К456ВА — несоответствие груза",
      time: "12 мин",
      color: T.danger,
      company: "Варвара",
    },
    {
      text: "HR: обновлён график смен на май",
      time: "1 ч",
      color: T.slate,
      company: "Головной",
    },
    {
      text: "Новый посетитель без СИЗ — КПП-2 Алтынтау",
      time: "1.5 ч",
      color: T.warning,
      company: "Алтынтау",
    },
    {
      text: "Заявка #244 одобрена нач. IT отдела",
      time: "2 ч",
      color: T.success,
      company: "Головной",
    },
    {
      text: "Смена караула завершена — Варвара",
      time: "3 ч",
      color: T.slate,
      company: "Варвара",
    },
  ];

  /* ─── Detail fields helper ─── */
  const DetailFields = ({ fields }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {fields.map(([l, v], i) => (
        <div key={i}>
          <div
            style={{
              fontSize: 10,
              color: T.textDim,
              fontFamily: fm,
              textTransform: "uppercase",
              marginBottom: 4,
              letterSpacing: "0.05em",
            }}
          >
            {l}
          </div>
          <div
            style={{
              fontSize: 14,
              color: T.text,
              fontWeight: 600,
              fontFamily: fb,
            }}
          >
            {v}
          </div>
        </div>
      ))}
    </div>
  );

  /* ─── Sidebar ─── */
  const Sidebar = () => (
    <div
      style={{
        width: collapsed ? 68 : 252,
        background: "linear-gradient(180deg,#2C2420,#1E1A16)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 14px" : "20px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <PolymetalLogo size={collapsed ? 36 : 38} />
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#F0EBE4",
                fontFamily: fd,
                whiteSpace: "nowrap",
              }}
            >
              Polymetal СБ
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.sidebarText,
                fontFamily: fm,
                letterSpacing: "0.06em",
                opacity: 0.6,
              }}
            >
              СЛУЖБА БЕЗОПАСНОСТИ
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: "14px 10px" }}>
        {navItems.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: collapsed ? "11px 15px" : "11px 16px",
                background: active ? T.sidebarActive : "transparent",
                border: active
                  ? "1px solid " + T.accent + "30"
                  : "1px solid transparent",
                borderRadius: 9,
                cursor: "pointer",
                marginBottom: 3,
                transition: "all 0.15s",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = active
                  ? T.sidebarActive
                  : "transparent";
              }}
            >
              <Icon
                name={item.icon}
                size={18}
                color={active ? T.accent : T.sidebarText}
              />
              {!collapsed && (
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: fb,
                    color: active ? "#F0EBE4" : T.sidebarText,
                    fontWeight: active ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div
        style={{
          padding: "12px 10px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={() => showToast("Выход из системы", "danger")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: "10px 16px",
            background: "transparent",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <Icon name="logout" size={18} color={T.sidebarText} />
          {!collapsed && (
            <span
              style={{ fontSize: 13, color: T.sidebarText, fontFamily: fb }}
            >
              Выход
            </span>
          )}
        </button>
      </div>
    </div>
  );

  /* ─── TopBar ─── */
  const TopBar = () => (
    <div
      style={{
        height: 58,
        background: T.surface,
        borderBottom: "1px solid " + T.border,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={T.textMuted}
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: T.bg,
            border: "1px solid " + T.border,
            borderRadius: 10,
            padding: "7px 16px",
            width: 280,
            cursor: "pointer",
          }}
          onClick={() => setSearchOpen(true)}
        >
          <Icon name="search" size={15} color={T.textDim} />
          <span style={{ color: T.textDim, fontSize: 13, fontFamily: fb }}>
            Поиск...
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 10,
              color: T.textDim,
              fontFamily: fm,
              background: T.surface,
              padding: "2px 7px",
              borderRadius: 5,
              border: "1px solid " + T.border,
            }}
          >
            ⌘K
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: T.successDim,
            borderRadius: 7,
            border: "1px solid " + T.success + "20",
          }}
        >
          <StatusDot color={T.success} />
          <span
            style={{
              fontSize: 10,
              color: T.success,
              fontFamily: fm,
              fontWeight: 600,
            }}
          >
            ONLINE
          </span>
        </div>
        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
            style={{
              background: T.bg,
              border: "1px solid " + T.border,
              borderRadius: 10,
              cursor: "pointer",
              padding: 7,
              position: "relative",
              display: "flex",
            }}
          >
            <Icon name="bell" size={18} color={T.textMuted} />
            <span
              style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: T.danger,
                border: "2px solid " + T.surface,
              }}
            />
          </button>
          {notifOpen && (
            <div
              style={{
                position: "absolute",
                top: 44,
                right: 0,
                width: 380,
                background: T.surface,
                border: "1px solid " + T.border,
                borderRadius: 12,
                padding: 0,
                zIndex: 200,
                boxShadow: "0 16px 48px rgba(30,26,22,0.18)",
                maxHeight: 420,
                overflow: "auto",
              }}
            >
              <div
                style={{
                  padding: "16px 18px 10px",
                  borderBottom: "1px solid " + T.borderLight,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: fd,
                    color: T.text,
                  }}
                >
                  Уведомления
                </span>
                <Badge color={T.danger}>{NOTIFS.length}</Badge>
              </div>
              {NOTIFS.map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 18px",
                    borderBottom: "1px solid " + T.borderLight,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = T.cardHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <StatusDot color={n.color} />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        color: T.text,
                        fontFamily: fb,
                        lineHeight: 1.4,
                      }}
                    >
                      {n.text}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: T.textDim,
                        marginTop: 4,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span>{n.time} назад</span>
                      <Badge color={T.slate}>{n.company}</Badge>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "10px 18px", textAlign: "center" }}>
                <Btn small variant="ghost">
                  Все уведомления
                </Btn>
              </div>
            </div>
          )}
        </div>
        <div style={{ width: 1, height: 28, background: T.border }} />
        {/* User */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 10,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg," + T.accent + "," + T.earth + ")",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#FFF",
                fontFamily: fd,
              }}
            >
              АК
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: T.text,
                  fontFamily: fd,
                }}
              >
                Ахметов К.Б.
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: fm }}>
                Нач. СБ
              </div>
            </div>
            <Icon name="chevron" size={14} color={T.textDim} />
          </div>
          {userOpen && (
            <div
              style={{
                position: "absolute",
                top: 50,
                right: 0,
                width: 300,
                background: T.surface,
                border: "1px solid " + T.border,
                borderRadius: 12,
                zIndex: 200,
                boxShadow: "0 16px 48px rgba(30,26,22,0.18)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: 20,
                  background: T.bg,
                  borderBottom: "1px solid " + T.border,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg," +
                      T.accent +
                      "," +
                      T.earth +
                      ")",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFF",
                    fontFamily: fd,
                    margin: "0 auto 12px",
                  }}
                >
                  АК
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: T.text,
                    fontFamily: fd,
                  }}
                >
                  Ахметов Кайрат Бакытович
                </div>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>
                  Начальник Службы Безопасности
                </div>
              </div>
              <div style={{ padding: 16 }}>
                {[
                  ["Должность", "Начальник СБ"],
                  ["Компания", "Polymetal (Головной)"],
                  ["Email", "akhmetov@polymetal.kz"],
                  ["Телефон", "+7 701 555 1234"],
                  ["Таб. №", "PM-00142"],
                ].map(([l, v], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom:
                        i < 4 ? "1px solid " + T.borderLight : "none",
                    }}
                  >
                    <span style={{ fontSize: 12, color: T.textMuted }}>
                      {l}
                    </span>
                    <span
                      style={{ fontSize: 12, color: T.text, fontWeight: 600 }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 16px 16px" }}>
                <Btn
                  variant="danger"
                  icon="logout"
                  onClick={() => showToast("Выход из системы", "danger")}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Выйти из системы
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ═══ PAGES ═══ */

  /* ── Dashboard ── */
  const DashboardPage = () => {
    const st = COMPANY_STATS[company];
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <PolymetalLogo size={26} />
            <span
              style={{
                fontSize: 12,
                fontFamily: fm,
                color: T.accent,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Polymetal — Служба безопасности
            </span>
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              fontFamily: fd,
              color: T.text,
              margin: 0,
            }}
          >
            Панель управления
          </h1>
          <p
            style={{
              fontSize: 13,
              color: T.textMuted,
              margin: "6px 0 0",
              fontFamily: fb,
            }}
          >
            01 мая 2026 • Дневная смена • 08:00–20:00
          </p>
        </div>
        {/* Company Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 20,
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 10,
            padding: 4,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {COMPANIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCompany(c.id)}
              style={{
                padding: "9px 18px",
                borderRadius: 7,
                border: "none",
                background: company === c.id ? T.accent : "transparent",
                color: company === c.id ? "#FFF" : T.textMuted,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: fb,
                fontWeight: company === c.id ? 700 : 500,
                transition: "all 0.2s",
                flex: 1,
              }}
            >
              {c.short}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          <StatCard
            icon="visitors"
            label="Посетители"
            value={st.visitors}
            change="+12% к вчера"
            trend="up"
            color={T.accent}
          />
          <StatCard
            icon="pass"
            label="Заявки"
            value={st.passes}
            change={st.passes > 2 ? "Срочные" : "Все обычные"}
            color={T.warning}
          />
          <StatCard
            icon="car"
            label="Досмотров"
            value={st.inspections}
            color={T.slate}
          />
          <StatCard
            icon="shield"
            label="Охранники"
            value={st.guards}
            change="На смене"
            color={T.success}
          />
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          <div
            style={{
              background: T.surface,
              border: "1px solid " + T.border,
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontFamily: fd,
                  color: T.text,
                  fontWeight: 700,
                }}
              >
                Последние посещения
              </h3>
              <Btn
                small
                variant="ghost"
                onClick={() => setPage(PAGES.VISITORS)}
              >
                Все →
              </Btn>
            </div>
            {[
              {
                name: "Иванов П.С.",
                co: "ТОО «СтройМонтаж»",
                time: "09:45",
                s: "inside",
                sub: "Кызыл",
              },
              {
                name: "Сидорова А.В.",
                co: "ИП «ТехСервис»",
                time: "09:32",
                s: "inside",
                sub: "Варвара",
              },
              {
                name: "Козлов Д.М.",
                co: "АО «МеталлПром»",
                time: "09:15",
                s: "left",
                sub: "Головной",
              },
              {
                name: "Нурланов Е.Б.",
                co: "ТОО «ЭнергоГрупп»",
                time: "08:50",
                s: "left",
                sub: "Алтынтау",
              },
            ].map((v, i) => (
              <div
                key={i}
                onClick={() =>
                  setPanel({
                    type: "visitorDetail",
                    data: {
                      name: v.name,
                      iin: "850412301245",
                      company: v.co,
                      purpose: "Встреча",
                      host: "Каримов А.Б.",
                      post: "КПП-1",
                      timeIn: v.time,
                      timeOut: v.s === "left" ? "11:30" : "—",
                      status: v.s,
                      doc: "Удостоверение",
                      sub: v.sub,
                    },
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: i < 3 ? "1px solid " + T.borderLight : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: T.bg,
                    border: "1px solid " + T.border,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="user" size={15} color={T.textMuted} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {v.name}
                  </div>
                  <div style={{ fontSize: 11, color: T.textDim }}>{v.co}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ fontSize: 11, fontFamily: fm, color: T.textMuted }}
                  >
                    {v.time}
                  </div>
                  <Badge color={v.s === "inside" ? T.success : T.textDim}>
                    {v.s === "inside" ? "На территории" : "Вышел"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: T.surface,
              border: "1px solid " + T.border,
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontFamily: fd,
                  color: T.text,
                  fontWeight: 700,
                }}
              >
                Заявки на пропуск
              </h3>
              <Btn small variant="ghost" onClick={() => setPage(PAGES.PASSES)}>
                Все →
              </Btn>
            </div>
            {[
              {
                id: "#247",
                from: "Литвинов А.К.",
                type: "Люди (5 чел.)",
                date: "01.05",
                s: "pending",
                sub: "Кызыл",
              },
              {
                id: "#246",
                from: "Касымова Н.Р.",
                type: "Техника (2 ед.)",
                date: "01.05",
                s: "pending",
                sub: "Варвара",
              },
              {
                id: "#245",
                from: "Бектуров С.А.",
                type: "Люди (3 чел.)",
                date: "30.04",
                s: "approved",
                sub: "Головной",
              },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid " + T.borderLight : "none",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: p.s === "pending" ? T.warningDim : T.successDim,
                    border:
                      "1px solid " +
                      (p.s === "pending" ? T.warning : T.success) +
                      "20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="pass"
                    size={15}
                    color={p.s === "pending" ? T.warning : T.success}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {p.id} • {p.from}
                  </div>
                  <div style={{ fontSize: 11, color: T.textDim }}>
                    {p.type} • {p.date} • <Badge color={T.slate}>{p.sub}</Badge>
                  </div>
                </div>
                {p.s === "pending" ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn
                      small
                      onClick={() => showToast("Одобрено")}
                      icon="check"
                    >
                      OK
                    </Btn>
                    <Btn
                      small
                      variant="danger"
                      onClick={() => showToast("Отклонено", "danger")}
                      icon="x"
                    >
                      ✕
                    </Btn>
                  </div>
                ) : (
                  <Badge color={T.success}>Одобрено</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Activity Feed */}
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            padding: 20,
            marginTop: 18,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px",
              fontSize: 15,
              fontFamily: fd,
              color: T.text,
              fontWeight: 700,
            }}
          >
            Лента событий
          </h3>
          {[
            {
              time: "09:47",
              event: "Въезд БелАЗ г/н А123ВС — КПП-2 Кызыл",
              icon: "truck",
              color: T.slate,
            },
            {
              time: "09:45",
              event: "Посетитель Иванов П.С. — КПП-1 Головной",
              icon: "user",
              color: T.accent,
            },
            {
              time: "09:40",
              event: "Нарушение — ТС К456ВА незадекларированный груз — Варвара",
              icon: "eye",
              color: T.danger,
            },
            {
              time: "09:32",
              event: "Посетитель Сидорова А.В. — КПП-2 Алтынтау",
              icon: "user",
              color: T.accent,
            },
            {
              time: "09:15",
              event: "Выезд Козлов Д.М. — КПП-1 Головной",
              icon: "logout",
              color: T.textDim,
            },
          ].map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "8px 0",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontFamily: fm,
                  color: T.textDim,
                  width: 46,
                  flexShrink: 0,
                }}
              >
                {e.time}
              </span>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: e.color + "10",
                  border: "1px solid " + e.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={e.icon} size={13} color={e.color} />
              </div>
              <span style={{ fontSize: 13, color: T.text, fontFamily: fb }}>
                {e.event}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── Visitors ── */
  const VisitorsPage = () => {
    const [f, setF] = useState("all");
    const data = [
      {
        id: 1,
        name: "Иванов Пётр Сергеевич",
        iin: "850412301245",
        company: "ТОО «СтройМонтаж»",
        purpose: "Встреча с гл. инженером",
        host: "Каримов А.Б.",
        post: "КПП-1",
        timeIn: "09:45",
        timeOut: "—",
        status: "inside",
        doc: "Удостоверение",
        sub: "Кызыл",
      },
      {
        id: 2,
        name: "Сидорова Анна В.",
        iin: "900615402158",
        company: "ИП «ТехСервис»",
        purpose: "Обслуживание оборудования",
        host: "Темирбаев Д.К.",
        post: "КПП-2",
        timeIn: "09:32",
        timeOut: "—",
        status: "inside",
        doc: "Паспорт",
        sub: "Варвара",
      },
      {
        id: 3,
        name: "Козлов Дмитрий М.",
        iin: "780923501369",
        company: "АО «МеталлПром»",
        purpose: "Поставка ГСМ",
        host: "Жумагалиев Н.О.",
        post: "КПП-1",
        timeIn: "09:15",
        timeOut: "10:30",
        status: "left",
        doc: "Удостоверение",
        sub: "Головной",
      },
      {
        id: 4,
        name: "Нурланов Ерлан Б.",
        iin: "880301600847",
        company: "ТОО «ЭнергоГрупп»",
        purpose: "Проверка электросети",
        host: "Смагулов Т.Е.",
        post: "КПП-1",
        timeIn: "08:50",
        timeOut: "11:45",
        status: "left",
        doc: "Паспорт",
        sub: "Алтынтау",
      },
    ];
    const fd2 = f === "all" ? data : data.filter((v) => v.status === f);
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              Журнал посещений
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              Электронный журнал КПП
            </p>
          </div>
          <Btn icon="plus" onClick={() => setPanel({ type: "visitorForm" })}>
            Новый посетитель
          </Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[
            { v: "all", l: "Все" },
            { v: "inside", l: "На территории" },
            { v: "left", l: "Покинули" },
          ].map((x) => (
            <button
              key={x.v}
              onClick={() => setF(x.v)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "1px solid " + (f === x.v ? T.accent : T.border),
                background: f === x.v ? T.accentDim : T.surface,
                color: f === x.v ? T.accent : T.textMuted,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: fb,
                fontWeight: 500,
              }}
            >
              {x.l}
            </button>
          ))}
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Table
            columns={[
              {
                key: "name",
                label: "ФИО",
                render: (v, r) => (
                  <div>
                    <div style={{ fontWeight: 600 }}>{v}</div>
                    <div style={{ fontSize: 11, color: T.textDim }}>
                      ИИН: {r.iin}
                    </div>
                  </div>
                ),
              },
              { key: "company", label: "Организация" },
              { key: "purpose", label: "Цель" },
              { key: "host", label: "К кому" },
              { key: "post", label: "КПП" },
              {
                key: "timeIn",
                label: "Вход",
                render: (v) => <span style={{ fontFamily: fm }}>{v}</span>,
              },
              {
                key: "timeOut",
                label: "Выход",
                render: (v) => <span style={{ fontFamily: fm }}>{v}</span>,
              },
              {
                key: "sub",
                label: "Филиал",
                render: (v) => <Badge color={T.slate}>{v}</Badge>,
              },
              {
                key: "status",
                label: "Статус",
                render: (v) => (
                  <Badge color={v === "inside" ? T.success : T.textDim}>
                    {v === "inside" ? "На территории" : "Вышел"}
                  </Badge>
                ),
              },
            ]}
            data={fd2}
            onRowClick={(r) => setPanel({ type: "visitorDetail", data: r })}
          />
        </div>
      </div>
    );
  };

  /* ── Passes ── */
  const PassesPage = () => {
    const [tab, setTab] = useState("all");
    const data = [
      {
        id: "#247",
        requester: "Литвинов А.К.",
        dept: "Горный цех",
        type: "people",
        count: "5 чел.",
        dateRange: "01–15.05.2026",
        status: "pending",
        urgency: "urgent",
        reason: "Ремонт дробилки",
        sub: "Кызыл",
      },
      {
        id: "#246",
        requester: "Касымова Н.Р.",
        dept: "Логистика",
        type: "vehicle",
        count: "2 ед.",
        dateRange: "01–03.05.2026",
        status: "pending",
        urgency: "normal",
        reason: "Завоз ВМ",
        sub: "Варвара",
      },
      {
        id: "#245",
        requester: "Бектуров С.А.",
        dept: "АХО",
        type: "people",
        count: "3 чел.",
        dateRange: "30.04.2026",
        status: "approved",
        urgency: "normal",
        reason: "Обслуживание вентиляции",
        sub: "Головной",
      },
      {
        id: "#244",
        requester: "Мусин Р.Т.",
        dept: "IT отдел",
        type: "people",
        count: "2 чел.",
        dateRange: "29–30.04.2026",
        status: "approved",
        urgency: "normal",
        reason: "Настройка АСУТП",
        sub: "Алтынтау",
      },
      {
        id: "#243",
        requester: "Жангозин Б.К.",
        dept: "Склад ГСМ",
        type: "vehicle",
        count: "1 ед.",
        dateRange: "28.04.2026",
        status: "rejected",
        urgency: "normal",
        reason: "Вывоз масла",
        sub: "Варвара",
      },
    ];
    const fd2 = tab === "all" ? data : data.filter((p) => p.status === tab);
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              Заявки на пропуск
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              Согласование пропусков на территорию
            </p>
          </div>
          <Btn icon="plus" onClick={() => setPanel({ type: "passForm" })}>
            Новая заявка
          </Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[
            { v: "all", l: "Все", c: data.length },
            { v: "pending", l: "Ожидают", c: 2 },
            { v: "approved", l: "Одобрены", c: 2 },
            { v: "rejected", l: "Отклонены", c: 1 },
          ].map((x) => (
            <button
              key={x.v}
              onClick={() => setTab(x.v)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "1px solid " + (tab === x.v ? T.accent : T.border),
                background: tab === x.v ? T.accentDim : T.surface,
                color: tab === x.v ? T.accent : T.textMuted,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: fb,
                fontWeight: 500,
              }}
            >
              {x.l} ({x.c})
            </button>
          ))}
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Table
            columns={[
              {
                key: "id",
                label: "№",
                render: (v, r) => (
                  <div>
                    <span style={{ fontFamily: fm, fontWeight: 700 }}>{v}</span>
                    {r.urgency === "urgent" && (
                      <span style={{ marginLeft: 6 }}>
                        <Badge color={T.danger}>СРОЧНО</Badge>
                      </span>
                    )}
                  </div>
                ),
              },
              {
                key: "requester",
                label: "Заявитель",
                render: (v, r) => (
                  <div>
                    <div style={{ fontWeight: 600 }}>{v}</div>
                    <div style={{ fontSize: 11, color: T.textDim }}>
                      {r.dept}
                    </div>
                  </div>
                ),
              },
              {
                key: "type",
                label: "Тип",
                render: (v) => (
                  <Badge color={v === "people" ? T.slate : T.earth}>
                    {v === "people" ? "Люди" : "Техника"}
                  </Badge>
                ),
              },
              { key: "count", label: "Кол-во" },
              { key: "dateRange", label: "Период" },
              {
                key: "sub",
                label: "Филиал",
                render: (v) => <Badge color={T.accent}>{v}</Badge>,
              },
              {
                key: "status",
                label: "Статус",
                render: (v) => {
                  const s = {
                    pending: { c: T.warning, l: "Ожидает" },
                    approved: { c: T.success, l: "Одобрено" },
                    rejected: { c: T.danger, l: "Отклонено" },
                  };
                  return <Badge color={s[v].c}>{s[v].l}</Badge>;
                },
              },
            ]}
            data={fd2}
            onRowClick={(r) => setPanel({ type: "passDetail", data: r })}
          />
        </div>
      </div>
    );
  };

  /* ── Inspection ── */
  const InspectionPage = () => {
    const data = [
      {
        plate: "А 123 ВС 01",
        driver: "Мухамедов А.Н.",
        type: "БелАЗ-75131",
        direction: "Въезд",
        time: "09:47",
        post: "КПП-2",
        cargo: "Порода",
        status: "passed",
        inspector: "Серіков Б.Т.",
        notes: "Без замечаний",
        sub: "Кызыл",
      },
      {
        plate: "К 456 ВА 01",
        driver: "Петренко И.В.",
        type: "КамАЗ-6520",
        direction: "Выезд",
        time: "09:40",
        post: "КПП-1",
        cargo: "Руда медная",
        status: "violation",
        inspector: "Қасымов Е.Р.",
        notes: "Незадекларированный груз",
        sub: "Варвара",
      },
      {
        plate: "В 789 СТ 01",
        driver: "Жарылгасинов Т.С.",
        type: "Toyota LC",
        direction: "Въезд",
        time: "09:20",
        post: "КПП-1",
        cargo: "—",
        status: "passed",
        inspector: "Серіков Б.Т.",
        notes: "Без замечаний",
        sub: "Головной",
      },
      {
        plate: "Н 012 ХМ 01",
        driver: "Кузнецов В.П.",
        type: "Автокран КС-55713",
        direction: "Въезд",
        time: "08:55",
        post: "КПП-2",
        cargo: "Спецтехника",
        status: "passed",
        inspector: "Қасымов Е.Р.",
        notes: "Разрешение в порядке",
        sub: "Алтынтау",
      },
    ];
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              Досмотр транспорта
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              Регистрация и досмотр ТС на КПП
            </p>
          </div>
          <Btn icon="plus" onClick={() => setPanel({ type: "inspectionForm" })}>
            Новый досмотр
          </Btn>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <StatCard icon="car" label="Всего" value="18" color={T.slate} />
          <StatCard
            icon="truck"
            label="Карьерная техника"
            value="8"
            color={T.earth}
          />
          <StatCard icon="eye" label="Нарушений" value="3" color={T.danger} />
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Table
            columns={[
              {
                key: "plate",
                label: "Гос. номер",
                render: (v) => (
                  <span
                    style={{ fontFamily: fm, fontWeight: 700, fontSize: 14 }}
                  >
                    {v}
                  </span>
                ),
              },
              { key: "driver", label: "Водитель" },
              { key: "type", label: "Тип ТС" },
              {
                key: "direction",
                label: "Напр.",
                render: (v) => (
                  <span
                    style={{
                      color: v === "Въезд" ? T.success : T.accent,
                      fontWeight: 600,
                    }}
                  >
                    {v === "Въезд" ? "→" : "←"} {v}
                  </span>
                ),
              },
              {
                key: "time",
                label: "Время",
                render: (v) => <span style={{ fontFamily: fm }}>{v}</span>,
              },
              { key: "post", label: "КПП" },
              { key: "cargo", label: "Груз" },
              {
                key: "sub",
                label: "Филиал",
                render: (v) => <Badge color={T.accent}>{v}</Badge>,
              },
              {
                key: "status",
                label: "Результат",
                render: (v) => (
                  <Badge color={v === "passed" ? T.success : T.danger}>
                    {v === "passed" ? "Пройден" : "Нарушение"}
                  </Badge>
                ),
              },
            ]}
            data={data}
            onRowClick={(r) => setPanel({ type: "inspectionDetail", data: r })}
          />
        </div>
      </div>
    );
  };

  /* ── Documents ── */
  const DocumentsPage = () => {
    const docs = [
      {
        id: 1,
        name: "Приказ №145 — О пропускном режиме",
        category: "Приказы",
        date: "28.04.2026",
        author: "Ахметов К.Б.",
        status: "active",
        sub: "Головной",
        pages: 12,
      },
      {
        id: 2,
        name: "Инструкция — Досмотр ТС (вкл. БелАЗ)",
        category: "Инструкции",
        date: "15.04.2026",
        author: "Серіков Б.Т.",
        status: "active",
        sub: "Кызыл",
        pages: 8,
      },
      {
        id: 3,
        name: "Акт проверки КПП-1",
        category: "Акты",
        date: "25.04.2026",
        author: "Қасымов Е.Р.",
        status: "active",
        sub: "Варвара",
        pages: 4,
      },
      {
        id: 4,
        name: "Приказ №132 — Безопасность взрывных работ",
        category: "Приказы",
        date: "10.03.2026",
        author: "Ахметов К.Б.",
        status: "active",
        sub: "Алтынтау",
        pages: 6,
      },
      {
        id: 5,
        name: "Журнал выдачи ключей — Апрель",
        category: "Журналы",
        date: "01.04.2026",
        author: "Мусин Р.Т.",
        status: "archive",
        sub: "Головной",
        pages: 32,
      },
    ];
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              Документы охраны
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              Электронный архив
            </p>
          </div>
          <Btn icon="upload" onClick={() => setPanel({ type: "uploadForm" })}>
            Загрузить
          </Btn>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "Приказы", count: 24, color: T.accent },
            { name: "Инструкции", count: 18, color: T.slate },
            { name: "Акты", count: 42, color: T.earth },
            { name: "Журналы", count: 8, color: T.gold },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: T.surface,
                border: "1px solid " + T.border,
                borderRadius: 12,
                padding: "16px 20px",
                flex: 1,
                minWidth: 140,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                borderTop: "3px solid " + c.color,
                cursor: "pointer",
              }}
            >
              <div
                style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: T.text,
                  fontFamily: fd,
                }}
              >
                {c.count}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Table
            columns={[
              {
                key: "name",
                label: "Название",
                render: (v) => <span style={{ fontWeight: 600 }}>{v}</span>,
              },
              {
                key: "category",
                label: "Категория",
                render: (v) => <Badge color={T.slate}>{v}</Badge>,
              },
              {
                key: "date",
                label: "Дата",
                render: (v) => <span style={{ fontFamily: fm }}>{v}</span>,
              },
              { key: "author", label: "Автор" },
              {
                key: "sub",
                label: "Филиал",
                render: (v) => <Badge color={T.accent}>{v}</Badge>,
              },
              {
                key: "status",
                label: "Статус",
                render: (v) => (
                  <Badge color={v === "active" ? T.success : T.textDim}>
                    {v === "active" ? "Действующий" : "Архив"}
                  </Badge>
                ),
              },
            ]}
            data={docs}
            onRowClick={(r) => setPanel({ type: "docDetail", data: r })}
          />
        </div>
      </div>
    );
  };

  /* ── HR Sync ── */
  const HRSyncPage = () => {
    const emps = [
      {
        name: "Серіков Бауыржан Т.",
        position: "Охранник КПП",
        shift: "Дневная",
        status: "on_duty",
        phone: "+7 701 123 4567",
        hired: "12.03.2022",
        sub: "Кызыл",
        tabN: "PM-00201",
      },
      {
        name: "Қасымов Ерлан Р.",
        position: "Старший охранник",
        shift: "Дневная",
        status: "on_duty",
        phone: "+7 702 234 5678",
        hired: "05.08.2020",
        sub: "Варвара",
        tabN: "PM-00156",
      },
      {
        name: "Мусин Рустем Т.",
        position: "Охранник периметра",
        shift: "Ночная",
        status: "off_duty",
        phone: "+7 705 345 6789",
        hired: "20.01.2023",
        sub: "Головной",
        tabN: "PM-00289",
      },
      {
        name: "Жуматаев Арман К.",
        position: "Охранник карьера",
        shift: "Дневная",
        status: "vacation",
        phone: "+7 707 456 7890",
        hired: "11.06.2021",
        sub: "Алтынтау",
        tabN: "PM-00215",
      },
      {
        name: "Бисенов Даулет Н.",
        position: "Охранник КПП",
        shift: "Ночная",
        status: "sick",
        phone: "+7 708 567 8901",
        hired: "03.09.2023",
        sub: "Кызыл",
        tabN: "PM-00312",
      },
    ];
    const stMap = {
      on_duty: { c: T.success, l: "На смене" },
      off_duty: { c: T.textDim, l: "Не на смене" },
      vacation: { c: T.warning, l: "Отпуск" },
      sick: { c: T.danger, l: "Больничный" },
    };
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              HR Синхронизация
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              Кадровые данные сотрудников СБ
            </p>
          </div>
          <Btn
            icon="sync"
            variant="secondary"
            onClick={() => showToast("Синхронизировано с HR")}
          >
            Синхронизировать
          </Btn>
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.success + "25",
            borderRadius: 12,
            padding: 16,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: T.successDim,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="sync" size={18} color={T.success} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.text,
                fontFamily: fd,
              }}
            >
              Синхронизация: 01.05.2026 08:00
            </div>
            <div style={{ fontSize: 12, color: T.textMuted }}>
              1С:ЗУП Polymetal • ✓ Успешно • 48 сотрудников
            </div>
          </div>
          <Badge color={T.success}>Актуально</Badge>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <StatCard icon="user" label="Всего СБ" value="48" color={T.slate} />
          <StatCard
            icon="shield"
            label="На смене"
            value="12"
            color={T.success}
          />
          <StatCard
            icon="calendar"
            label="Отпуск"
            value="3"
            color={T.warning}
          />
          <StatCard icon="hr" label="Больничный" value="2" color={T.danger} />
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Table
            columns={[
              {
                key: "name",
                label: "ФИО",
                render: (v) => <span style={{ fontWeight: 600 }}>{v}</span>,
              },
              { key: "position", label: "Должность" },
              {
                key: "shift",
                label: "Смена",
                render: (v) => (
                  <Badge color={v === "Дневная" ? T.accent : T.earth}>
                    {v}
                  </Badge>
                ),
              },
              {
                key: "status",
                label: "Статус",
                render: (v) => (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <StatusDot color={stMap[v].c} />
                    {stMap[v].l}
                  </span>
                ),
              },
              {
                key: "sub",
                label: "Филиал",
                render: (v) => <Badge color={T.accent}>{v}</Badge>,
              },
              {
                key: "phone",
                label: "Телефон",
                render: (v) => (
                  <span style={{ fontFamily: fm, fontSize: 12 }}>{v}</span>
                ),
              },
            ]}
            data={emps}
            onRowClick={(r) => setPanel({ type: "employeeDetail", data: r })}
          />
        </div>
      </div>
    );
  };

  /* ── Schedule ── */
  const SchedulePage = () => {
    const days = [
      "Пн 28",
      "Вт 29",
      "Ср 30",
      "Чт 01",
      "Пт 02",
      "Сб 03",
      "Вс 04",
    ];
    const guards = [
      {
        name: "Серіков Б.Т.",
        post: "КПП-1",
        sub: "Кызыл",
        shifts: ["day", "day", "night", "night", "off", "off", "day"],
      },
      {
        name: "Қасымов Е.Р.",
        post: "КПП-2",
        sub: "Варвара",
        shifts: ["day", "day", "off", "off", "day", "day", "night"],
      },
      {
        name: "Мусин Р.Т.",
        post: "Периметр",
        sub: "Головной",
        shifts: ["night", "night", "day", "day", "off", "off", "night"],
      },
      {
        name: "Жуматаев А.К.",
        post: "Карьер",
        sub: "Алтынтау",
        shifts: ["off", "off", "day", "day", "night", "night", "off"],
      },
      {
        name: "Алиев М.С.",
        post: "КПП-2",
        sub: "Кызыл",
        shifts: ["night", "off", "off", "day", "day", "night", "night"],
      },
    ];
    const sc = {
      day: { bg: T.accentDim, c: T.accent, l: "День", b: T.accentBorder },
      night: { bg: T.earthDim, c: T.earth, l: "Ночь", b: T.earth + "30" },
      off: { bg: "transparent", c: T.textDim, l: "—", b: "transparent" },
    };
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: fd,
                color: T.text,
                margin: 0,
              }}
            >
              График дежурств
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
              28 апреля — 04 мая 2026
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost">← Пред.</Btn>
            <Btn variant="ghost">След. →</Btn>
          </div>
        </div>
        <div
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 12,
            overflow: "auto",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: 10,
                    fontFamily: fm,
                    color: T.textDim,
                    borderBottom: "2px solid " + T.border,
                    background: T.bg,
                  }}
                >
                  СОТРУДНИК
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px 10px",
                    fontSize: 10,
                    fontFamily: fm,
                    color: T.textDim,
                    borderBottom: "2px solid " + T.border,
                    background: T.bg,
                  }}
                >
                  ПОСТ
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px 10px",
                    fontSize: 10,
                    fontFamily: fm,
                    color: T.textDim,
                    borderBottom: "2px solid " + T.border,
                    background: T.bg,
                  }}
                >
                  ФИЛИАЛ
                </th>
                {days.map((d) => (
                  <th
                    key={d}
                    style={{
                      textAlign: "center",
                      padding: "12px 6px",
                      fontSize: 11,
                      fontFamily: fm,
                      color: d.includes("01") ? T.accent : T.textDim,
                      borderBottom: "2px solid " + T.border,
                      background: d.includes("01") ? T.accentDim : T.bg,
                      fontWeight: 600,
                    }}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guards.map((g, i) => (
                <tr
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setPanel({
                      type: "employeeDetail",
                      data: {
                        name: g.name,
                        position: "Охранник",
                        shift: "Дневная",
                        status: "on_duty",
                        phone: "+7 701 123 4567",
                        hired: "12.03.2022",
                        sub: g.sub,
                        tabN: "PM-00201",
                      },
                    })
                  }
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.text,
                      borderBottom: "1px solid " + T.borderLight,
                    }}
                  >
                    {g.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      fontFamily: fm,
                      color: T.textMuted,
                      borderBottom: "1px solid " + T.borderLight,
                    }}
                  >
                    {g.post}
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      borderBottom: "1px solid " + T.borderLight,
                    }}
                  >
                    <Badge color={T.accent}>{g.sub}</Badge>
                  </td>
                  {g.shifts.map((s, j) => (
                    <td
                      key={j}
                      style={{
                        textAlign: "center",
                        padding: 6,
                        borderBottom: "1px solid " + T.borderLight,
                        background: days[j]?.includes("01")
                          ? T.accent + "05"
                          : "transparent",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 6,
                          background: sc[s].bg,
                          color: sc[s].c,
                          border: "1px solid " + sc[s].b,
                          fontSize: 11,
                          fontFamily: fm,
                          fontWeight: 600,
                        }}
                      >
                        {sc[s].l}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  /* ── Settings ── */
  const SettingsPage = () => (
    <div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          fontFamily: fd,
          color: T.text,
          margin: "0 0 22px",
        }}
      >
        Настройки
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {[
          {
            title: "КПП",
            items: [
              "КПП-1 Главный",
              "КПП-2 Карьерный",
              "КПП-3 Склад ГСМ",
              "КПП-4 Обогатительная",
            ],
          },
          {
            title: "Роли и доступ",
            items: [
              "Администратор",
              "Начальник СБ",
              "Старший охранник",
              "Охранник КПП",
            ],
          },
          {
            title: "Интеграции",
            items: [
              "1С:ЗУП — ✓",
              "СКУД — ✓",
              "Видеонаблюдение — ✓",
              "АСУТП — ⚠ Настроить",
            ],
          },
          {
            title: "Уведомления",
            items: ["Email — ✓", "SMS — ✓", "Telegram — ✓", "Push — Откл."],
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: T.surface,
              border: "1px solid " + T.border,
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 15,
                fontFamily: fd,
                color: T.text,
                fontWeight: 700,
              }}
            >
              {s.title}
            </h3>
            {s.items.map((item, j) => (
              <div
                key={j}
                onClick={() =>
                  setPanel({
                    type: "settingDetail",
                    data: { title: s.title, item },
                  })
                }
                style={{
                  padding: "10px 14px",
                  background: T.bg,
                  borderRadius: 8,
                  marginBottom: 6,
                  fontSize: 13,
                  color: T.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid " + T.borderLight,
                  cursor: "pointer",
                }}
              >
                <span>{item}</span>
                <Icon name="chevron" size={14} color={T.textDim} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  /* ═══ Slide-over Panels ═══ */
  const renderPanel = () => {
    if (!panel) return null;
    const { type, data } =
      typeof panel === "object" ? panel : { type: panel, data: null };

    if (type === "visitorForm")
      return (
        <SlideOver
          title="Регистрация посетителя"
          onClose={() => setPanel(null)}
        >
          <Input
            label="ФИО"
            placeholder="Иванов Пётр Сергеевич"
            value=""
            onChange={() => {}}
          />
          <Input
            label="ИИН"
            placeholder="850412301245"
            value=""
            onChange={() => {}}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="Документ"
              select
              options={[
                { value: "id", label: "Удостоверение" },
                { value: "p", label: "Паспорт" },
              ]}
              value="id"
              onChange={() => {}}
            />
            <Input
              label="Номер"
              placeholder="012345678"
              value=""
              onChange={() => {}}
            />
          </div>
          <Input
            label="Организация"
            placeholder="ТОО «СтройМонтаж»"
            value=""
            onChange={() => {}}
          />
          <Input
            label="Цель визита"
            placeholder="Встреча с гл. инженером"
            value=""
            onChange={() => {}}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="К кому"
              placeholder="Каримов А.Б."
              value=""
              onChange={() => {}}
            />
            <Input
              label="КПП"
              select
              options={[
                { value: "1", label: "КПП-1" },
                { value: "2", label: "КПП-2" },
                { value: "3", label: "КПП-3" },
              ]}
              value="1"
              onChange={() => {}}
            />
          </div>
          <Input
            label="Филиал"
            select
            options={COMPANIES.slice(1).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value="head"
            onChange={() => {}}
          />
          <Input
            label="СИЗ"
            select
            options={[
              { value: "y", label: "Да" },
              { value: "n", label: "Нет" },
              { value: "i", label: "Выдано на КПП" },
            ]}
            value="y"
            onChange={() => {}}
          />
          <Input
            label="Примечания"
            textarea
            placeholder="Доп. информация..."
            value=""
            onChange={() => {}}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Отмена
            </Btn>
            <Btn
              icon="check"
              onClick={() => {
                setPanel(null);
                showToast("Посетитель зарегистрирован");
              }}
            >
              Зарегистрировать
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "visitorDetail")
      return (
        <SlideOver title="Карточка посетителя" onClose={() => setPanel(null)}>
          <DetailFields
            fields={[
              ["ФИО", data.name],
              ["ИИН", data.iin],
              ["Организация", data.company],
              ["Документ", data.doc],
              ["Цель", data.purpose],
              ["К кому", data.host],
              ["КПП", data.post],
              ["Филиал", data.sub || "—"],
              ["Вход", data.timeIn],
              ["Выход", data.timeOut],
            ]}
          />
          <div
            style={{
              marginTop: 20,
              padding: 14,
              background: data.status === "inside" ? T.successDim : T.bg,
              borderRadius: 10,
              border:
                "1px solid " +
                (data.status === "inside" ? T.success : T.border) +
                "25",
              textAlign: "center",
            }}
          >
            <Badge color={data.status === "inside" ? T.success : T.textDim}>
              {data.status === "inside"
                ? "На территории"
                : "Покинул территорию"}
            </Badge>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            {data.status === "inside" && (
              <Btn
                icon="logout"
                variant="secondary"
                onClick={() => {
                  setPanel(null);
                  showToast("Выход отмечен");
                }}
              >
                Отметить выход
              </Btn>
            )}
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Закрыть
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "passForm")
      return (
        <SlideOver
          title="Новая заявка на пропуск"
          onClose={() => setPanel(null)}
          wide
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="Заявитель"
              placeholder="Литвинов А.К."
              value=""
              onChange={() => {}}
            />
            <Input
              label="Подразделение"
              select
              options={[
                { value: "q", label: "Горный цех" },
                { value: "e", label: "Обогатительная фабрика" },
                { value: "l", label: "Логистика" },
              ]}
              value="q"
              onChange={() => {}}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <Input
              label="Тип"
              select
              options={[
                { value: "p", label: "Люди" },
                { value: "v", label: "Техника" },
              ]}
              value="p"
              onChange={() => {}}
            />
            <Input
              label="Дата начала"
              type="date"
              value="2026-05-01"
              onChange={() => {}}
            />
            <Input
              label="Дата окончания"
              type="date"
              value="2026-05-15"
              onChange={() => {}}
            />
          </div>
          <Input
            label="Филиал"
            select
            options={COMPANIES.slice(1).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value="head"
            onChange={() => {}}
          />
          <Input
            label="Основание"
            textarea
            placeholder="Подрядные работы..."
            value=""
            onChange={() => {}}
          />
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                color: T.textMuted,
                marginBottom: 10,
                fontFamily: fm,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Маршрут согласования
            </label>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {["Заявитель ✓", "Нач. подразделения", "СБ", "Директор"].map(
                (s, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        background: i === 0 ? T.successDim : T.bg,
                        color: i === 0 ? T.success : T.textMuted,
                        border:
                          "1px solid " +
                          (i === 0 ? T.success : T.border) +
                          "30",
                        fontFamily: fb,
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </div>
                    {i < 3 && <span style={{ color: T.textDim }}>→</span>}
                  </div>
                ),
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Отмена
            </Btn>
            <Btn
              icon="check"
              onClick={() => {
                setPanel(null);
                showToast("Заявка отправлена");
              }}
            >
              Отправить
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "passDetail")
      return (
        <SlideOver title={"Заявка " + data.id} onClose={() => setPanel(null)}>
          <DetailFields
            fields={[
              ["Заявитель", data.requester],
              ["Подразделение", data.dept],
              ["Тип", data.type === "people" ? "Люди" : "Техника"],
              ["Количество", data.count],
              ["Период", data.dateRange],
              ["Филиал", data.sub],
              ["Основание", data.reason],
              ["Срочность", data.urgency === "urgent" ? "Срочная" : "Обычная"],
            ]}
          />
          {data.status === "pending" && (
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Btn
                icon="check"
                onClick={() => {
                  setPanel(null);
                  showToast("Одобрено");
                }}
              >
                Одобрить
              </Btn>
              <Btn
                variant="danger"
                icon="x"
                onClick={() => {
                  setPanel(null);
                  showToast("Отклонено", "danger");
                }}
              >
                Отклонить
              </Btn>
            </div>
          )}
        </SlideOver>
      );

    if (type === "inspectionForm")
      return (
        <SlideOver title="Новый досмотр ТС" onClose={() => setPanel(null)} wide>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <Input
              label="Гос. номер"
              placeholder="А 123 ВС 01"
              value=""
              onChange={() => {}}
            />
            <Input
              label="Тип ТС"
              select
              options={[
                { value: "c", label: "Легковой" },
                { value: "t", label: "Грузовой" },
                { value: "b", label: "БелАЗ" },
                { value: "s", label: "Спецтехника" },
              ]}
              value="c"
              onChange={() => {}}
            />
            <Input
              label="Направление"
              select
              options={[
                { value: "in", label: "Въезд" },
                { value: "out", label: "Выезд" },
              ]}
              value="in"
              onChange={() => {}}
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="Водитель"
              placeholder="Мухамедов А.Н."
              value=""
              onChange={() => {}}
            />
            <Input
              label="КПП"
              select
              options={[
                { value: "1", label: "КПП-1" },
                { value: "2", label: "КПП-2" },
              ]}
              value="1"
              onChange={() => {}}
            />
          </div>
          <Input
            label="Филиал"
            select
            options={COMPANIES.slice(1).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value="head"
            onChange={() => {}}
          />
          <Input
            label="Груз / ТМЦ"
            textarea
            placeholder="Руда медная, 20 тонн..."
            value=""
            onChange={() => {}}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="ТТН"
              placeholder="ТТН-2026-0547"
              value=""
              onChange={() => {}}
            />
            <Input
              label="Заявка"
              placeholder="#246"
              value=""
              onChange={() => {}}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                color: T.textMuted,
                marginBottom: 10,
                fontFamily: fm,
                textTransform: "uppercase",
              }}
            >
              Результат
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { l: "Без нарушений", c: T.success },
                { l: "Нарушение", c: T.danger },
              ].map((r) => (
                <button
                  key={r.l}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: 10,
                    border: "2px solid " + r.c + "30",
                    background: r.c + "06",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    color: r.c,
                    fontFamily: fb,
                  }}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              border: "2px dashed " + T.border,
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              marginBottom: 16,
              cursor: "pointer",
              background: T.bg,
            }}
          >
            <Icon name="camera" size={28} color={T.textDim} />
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 6 }}>
              Фото досмотра
            </div>
          </div>
          <Input
            label="Комментарий"
            textarea
            placeholder="Заметки..."
            value=""
            onChange={() => {}}
          />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Отмена
            </Btn>
            <Btn
              icon="check"
              onClick={() => {
                setPanel(null);
                showToast("Акт сохранён");
              }}
            >
              Сохранить
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "inspectionDetail")
      return (
        <SlideOver title="Акт досмотра" onClose={() => setPanel(null)}>
          <DetailFields
            fields={[
              ["Гос. номер", data.plate],
              ["Тип ТС", data.type],
              ["Водитель", data.driver],
              ["Направление", data.direction],
              ["КПП", data.post],
              ["Время", data.time],
              ["Груз", data.cargo],
              ["Филиал", data.sub],
              ["Инспектор", data.inspector],
              [
                "Результат",
                data.status === "passed" ? "Без нарушений" : "Нарушение",
              ],
              ["Примечание", data.notes],
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Btn variant="ghost" icon="download">
              Скачать акт
            </Btn>
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Закрыть
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "uploadForm")
      return (
        <SlideOver title="Загрузка документа" onClose={() => setPanel(null)}>
          <Input
            label="Название"
            placeholder="Приказ №146..."
            value=""
            onChange={() => {}}
          />
          <Input
            label="Категория"
            select
            options={[
              { value: "o", label: "Приказы" },
              { value: "i", label: "Инструкции" },
              { value: "a", label: "Акты" },
              { value: "j", label: "Журналы" },
            ]}
            value="o"
            onChange={() => {}}
          />
          <Input
            label="Филиал"
            select
            options={COMPANIES.slice(1).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            value="head"
            onChange={() => {}}
          />
          <div
            style={{
              border: "2px dashed " + T.border,
              borderRadius: 12,
              padding: 32,
              textAlign: "center",
              marginBottom: 16,
              cursor: "pointer",
              background: T.bg,
            }}
          >
            <Icon name="upload" size={32} color={T.textDim} />
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 8 }}>
              Перетащите файл
            </div>
            <div style={{ fontSize: 11, color: T.textDim, marginTop: 4 }}>
              PDF, DOC, DOCX до 50 МБ
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Отмена
            </Btn>
            <Btn
              icon="upload"
              onClick={() => {
                setPanel(null);
                showToast("Загружено");
              }}
            >
              Загрузить
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "docDetail")
      return (
        <SlideOver title="Документ" onClose={() => setPanel(null)}>
          <DetailFields
            fields={[
              ["Название", data.name],
              ["Категория", data.category],
              ["Дата", data.date],
              ["Автор", data.author],
              ["Филиал", data.sub],
              ["Статус", data.status === "active" ? "Действующий" : "Архив"],
              ["Страниц", String(data.pages)],
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Btn variant="ghost" icon="eye">
              Открыть
            </Btn>
            <Btn variant="ghost" icon="download">
              Скачать
            </Btn>
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Закрыть
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "employeeDetail")
      return (
        <SlideOver title="Карточка сотрудника" onClose={() => setPanel(null)}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg," + T.accent + "," + T.earth + ")",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFF",
                fontFamily: fd,
                margin: "0 auto 12px",
              }}
            >
              {data.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
                fontFamily: fd,
              }}
            >
              {data.name}
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 2 }}>
              {data.position}
            </div>
          </div>
          <DetailFields
            fields={[
              ["Должность", data.position],
              ["Смена", data.shift],
              [
                "Статус",
                {
                  on_duty: "На смене",
                  off_duty: "Не на смене",
                  vacation: "Отпуск",
                  sick: "Больничный",
                }[data.status] || "—",
              ],
              ["Филиал", data.sub],
              ["Телефон", data.phone],
              ["Принят", data.hired],
              ["Таб. №", data.tabN || "—"],
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Закрыть
            </Btn>
          </div>
        </SlideOver>
      );

    if (type === "settingDetail")
      return (
        <SlideOver title={data.title} onClose={() => setPanel(null)}>
          <div
            style={{
              padding: 20,
              background: T.bg,
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>
              {data.item}
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 8 }}>
              Настройка параметра
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Btn variant="ghost" onClick={() => setPanel(null)}>
              Закрыть
            </Btn>
            <Btn
              icon="check"
              onClick={() => {
                setPanel(null);
                showToast("Сохранено");
              }}
            >
              Сохранить
            </Btn>
          </div>
        </SlideOver>
      );

    return null;
  };

  /* ═══ Search ═══ */
  const SearchModal = () =>
    searchOpen ? (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2000,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 100,
          background: "rgba(30,26,22,0.35)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => setSearchOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: T.surface,
            border: "1px solid " + T.border,
            borderRadius: 14,
            width: 520,
            maxWidth: "90vw",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(30,26,22,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              borderBottom: "1px solid " + T.borderLight,
            }}
          >
            <Icon name="search" size={18} color={T.textDim} />
            <input
              autoFocus
              placeholder="Поиск по системе..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                color: T.text,
                fontSize: 15,
                fontFamily: fb,
                outline: "none",
              }}
            />
          </div>
          <div style={{ padding: 12 }}>
            <div
              style={{
                fontSize: 10,
                color: T.textDim,
                padding: "8px 10px",
                fontFamily: fm,
                letterSpacing: "0.06em",
              }}
            >
              БЫСТРЫЙ ДОСТУП
            </div>
            {[
              {
                icon: "plus",
                label: "Зарегистрировать посетителя",
                p: "visitorForm",
              },
              {
                icon: "pass",
                label: "Создать заявку на пропуск",
                p: "passForm",
              },
              {
                icon: "car",
                label: "Оформить досмотр ТС",
                p: "inspectionForm",
              },
              { icon: "doc", label: "Загрузить документ", p: "uploadForm" },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearchOpen(false);
                  setPanel({ type: item.p });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = T.cardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Icon name={item.icon} size={16} color={T.accent} />
                <span style={{ fontSize: 14, color: T.text, fontFamily: fb }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : null;

  const Toast = () =>
    toast ? (
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 3000,
          background: "#FFF",
          border:
            "1px solid " +
            (toast.type === "danger" ? T.danger : T.success) +
            "30",
          borderLeft:
            "4px solid " + (toast.type === "danger" ? T.danger : T.success),
          borderRadius: 10,
          padding: "14px 22px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 8px 32px rgba(30,26,22,0.15)",
          animation: "slideIn 0.3s ease",
        }}
      >
        <Icon
          name={toast.type === "danger" ? "x" : "check"}
          size={18}
          color={toast.type === "danger" ? T.danger : T.success}
        />
        <span
          style={{
            fontSize: 14,
            color: T.text,
            fontFamily: fb,
            fontWeight: 600,
          }}
        >
          {toast.msg}
        </span>
      </div>
    ) : null;

  const pages = {
    [PAGES.DASHBOARD]: DashboardPage,
    [PAGES.VISITORS]: VisitorsPage,
    [PAGES.PASSES]: PassesPage,
    [PAGES.INSPECTION]: InspectionPage,
    [PAGES.DOCUMENTS]: DocumentsPage,
    [PAGES.HR_SYNC]: HRSyncPage,
    [PAGES.SCHEDULE]: SchedulePage,
    [PAGES.SETTINGS]: SettingsPage,
  };
  const P = pages[page] || DashboardPage;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: fb,
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
        @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes slideRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
        select option{background:${T.surface};color:${T.text}} input::placeholder,textarea::placeholder{color:${T.textDim}}
      `}</style>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar />
        <div
          style={{ flex: 1, overflow: "auto", padding: 26 }}
          onClick={() => {
            setNotifOpen(false);
            setUserOpen(false);
          }}
        >
          <P />
        </div>
      </div>
      {renderPanel()}
      <SearchModal />
      <Toast />
    </div>
  );
}
