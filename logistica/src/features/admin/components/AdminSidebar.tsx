import {
  BarChart3,
  CircleHelp,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings2,
  Users,
} from "lucide-react";
import Link from "next/link";

import styles from "./AdminSidebar.module.css";

const navItems = [
  { label: "Resumen", icon: LayoutDashboard, active: true },
  { label: "Cotizaciones", icon: Inbox, count: true },
  { label: "Clientes", icon: Users },
  { label: "Rendimiento", icon: BarChart3 },
];

type AdminSidebarProps = {
  quotationCount: number;
};

export function AdminSidebar({ quotationCount }: AdminSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>T</span>
        <span>
          <strong>TRASANDES</strong>
          <small>OPS CONSOLE</small>
        </span>
      </div>
      <div className={styles.sectionLabel}>Workspace</div>
      <nav aria-label="Navegación principal" className={styles.nav}>
        {navItems.map(({ label, icon: Icon, active, count }) => (
          <Link
            key={label}
            href="#"
            className={
              active ? `${styles.link} ${styles.linkActive}` : styles.link
            }
            aria-current={active ? "page" : undefined}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
            {count && quotationCount > 0 && (
              <span className={styles.count}>{quotationCount}</span>
            )}
          </Link>
        ))}
      </nav>
      <div className={`${styles.sectionLabel} ${styles.sectionSettings}`}>
        Sistema
      </div>
      <nav aria-label="Navegación secundaria" className={styles.nav}>
        <Link href="#" className={styles.link}>
          <Settings2 size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Configuración</span>
        </Link>
        <Link href="#" className={styles.link}>
          <CircleHelp size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Ayuda</span>
        </Link>
      </nav>
      <div className={styles.bottom}>
        <form action="/api/admin/logout" method="post">
          <button className={styles.logout} type="submit">
            <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
