import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Inbox,
  LayoutDashboard,
  LogOut,
  Search,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Quotation = {
  id: number;
  email: string;
  celular: string;
  servicio: string;
  fecha_servicio: string;
  estado: string;
  created_at: string;
};

const statusMeta: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  nuevo: { label: "Nuevo", className: "status-new", dot: "status-dot-blue" },
  contactado: {
    label: "Contactado",
    className: "status-contacted",
    dot: "status-dot-violet",
  },
  en_cotizacion: {
    label: "En cotización",
    className: "status-quote",
    dot: "status-dot-yellow",
  },
  ganado: { label: "Ganado", className: "status-won", dot: "status-dot-green" },
  descartado: {
    label: "Descartado",
    className: "status-dismissed",
    dot: "status-dot-gray",
  },
};

const navItems = [
  { label: "Resumen", icon: LayoutDashboard, active: true },
  { label: "Cotizaciones", icon: Inbox, count: true },
  { label: "Clientes", icon: Users },
  { label: "Rendimiento", icon: BarChart3 },
];

function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("es-CL", options).format(new Date(value));
}

function formatServiceDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default async function AdminPage() {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) redirect("/admin/login?error=unauthorized");

  const { data, error } = await createSupabaseAdminClient()
    .from("cotizaciones")
    .select("id,email,celular,servicio,fecha_servicio,estado,created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error("No se pudieron cargar las cotizaciones.");

  const quotations = (data ?? []) as Quotation[];
  const now = Date.now();
  const recentCount = quotations.filter(
    (quotation) =>
      now - new Date(quotation.created_at).getTime() < 7 * 24 * 60 * 60 * 1000,
  ).length;
  const activeCount = quotations.filter((quotation) =>
    ["nuevo", "contactado", "en_cotizacion"].includes(quotation.estado),
  ).length;
  const wonCount = quotations.filter(
    (quotation) => quotation.estado === "ganado",
  ).length;
  const conversionRate = quotations.length
    ? Math.round((wonCount / quotations.length) * 100)
    : 0;
  const firstName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "equipo";

  return (
    <main className="admin-shell">
      <a className="skip-link" href="#admin-content">
        Saltar al contenido
      </a>
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">T</span>
          <span>
            <strong>TRASANDES</strong>
            <small>OPS CONSOLE</small>
          </span>
        </div>
        <div className="sidebar-section-label">Workspace</div>
        <nav aria-label="Navegación principal" className="sidebar-nav">
          {navItems.map(({ label, icon: Icon, active, count }) => (
            <Link
              key={label}
              href="#"
              className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
              {count && quotations.length > 0 && (
                <span className="sidebar-count">{quotations.length}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-section-label sidebar-section-settings">
          Sistema
        </div>
        <nav aria-label="Navegación secundaria" className="sidebar-nav">
          <Link href="#" className="sidebar-link">
            <Settings2 size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Configuración</span>
          </Link>
          <Link href="#" className="sidebar-link">
            <CircleHelp size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Ayuda</span>
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="status-pulse" />
            <span>Todos los sistemas operativos</span>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="sidebar-logout" type="submit">
              <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Cerrar sesión</span>
            </button>
          </form>
          <div className="sidebar-build">
            <span>TRASANDES / OPS</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="mobile-brand">
            <span className="sidebar-brand-mark">T</span>
            <strong>OPS CONSOLE</strong>
          </div>
          <div className="topbar-search">
            <Search size={17} aria-hidden="true" />
            <span>Buscar solicitudes…</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Notificaciones"
            >
              <Bell size={18} strokeWidth={1.8} aria-hidden="true" />
              <span className="notification-dot" />
            </button>
            <div className="topbar-divider" />
            <div className="user-chip">
              <span className="user-avatar">
                {getInitials(user.email ?? "OP")}
              </span>
              <span className="user-chip-copy">
                <strong>{firstName}</strong>
                <small>Administrador</small>
              </span>
              <ChevronRight
                size={15}
                className="user-chip-chevron"
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        <div id="admin-content" className="admin-content">
          <div className="admin-heading">
            <div>
              <p className="admin-kicker">
                <span className="status-pulse" />
                {formatDate(new Date().toISOString(), {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1>Buenos días, {firstName}.</h1>
              <p className="admin-heading-copy">
                Aquí tienes el pulso de tu operación comercial.
              </p>
            </div>
            <div className="admin-heading-actions">
              <span className="last-sync">
                <Activity size={15} aria-hidden="true" /> Actualizado hace unos
                segundos
              </span>
              <button className="primary-action" type="button">
                <BriefcaseBusiness size={16} aria-hidden="true" /> Nueva
                cotización <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <section className="metric-grid" aria-label="Métricas de operación">
            <article className="metric-card metric-card-highlight">
              <div className="metric-card-top">
                <span className="metric-label">Solicitudes activas</span>
                <span className="metric-icon">
                  <Inbox size={17} aria-hidden="true" />
                </span>
              </div>
              <strong className="metric-value">{activeCount}</strong>
              <div className="metric-foot">
                <span className="metric-positive">
                  <TrendingArrow /> {recentCount} esta semana
                </span>
                <span className="metric-foot-note">en seguimiento</span>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card-top">
                <span className="metric-label">Total recibidas</span>
                <span className="metric-icon metric-icon-muted">
                  <CalendarDays size={17} aria-hidden="true" />
                </span>
              </div>
              <strong className="metric-value">{quotations.length}</strong>
              <div className="metric-foot">
                <span className="metric-foot-note">últimos 100 registros</span>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card-top">
                <span className="metric-label">Conversiones</span>
                <span className="metric-icon metric-icon-green">
                  <CheckCircle2 size={17} aria-hidden="true" />
                </span>
              </div>
              <strong className="metric-value">{wonCount}</strong>
              <div className="metric-foot">
                <span className="metric-positive">{conversionRate}%</span>
                <span className="metric-foot-note">tasa de cierre</span>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card-top">
                <span className="metric-label">Tiempo de respuesta</span>
                <span className="metric-icon metric-icon-muted">
                  <Clock3 size={17} aria-hidden="true" />
                </span>
              </div>
              <strong className="metric-value metric-value-text">—</strong>
              <div className="metric-foot">
                <span className="metric-foot-note">Próximamente</span>
              </div>
            </article>
          </section>

          <section className="content-card requests-card">
            <div className="content-card-header">
              <div>
                <p className="section-overline">Bandeja de entrada</p>
                <h2>Solicitudes recientes</h2>
              </div>
              <div className="table-tools">
                <button
                  className="filter-button filter-button-active"
                  type="button"
                >
                  Todas <span>{quotations.length}</span>
                </button>
                <button className="filter-button" type="button">
                  Nuevas{" "}
                  <span>
                    {
                      quotations.filter(
                        (quotation) => quotation.estado === "nuevo",
                      ).length
                    }
                  </span>
                </button>
                <button
                  className="filter-button filter-button-icon"
                  type="button"
                  aria-label="Buscar en solicitudes"
                >
                  <Search size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="table-wrap">
              <table className="requests-table">
                <caption className="sr-only">
                  Solicitudes de cotización recientes
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Solicitud</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Fecha de servicio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">
                      <span className="sr-only">Abrir</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.slice(0, 8).map((quotation) => {
                    const status =
                      statusMeta[quotation.estado] ?? statusMeta.nuevo;
                    return (
                      <tr key={quotation.id}>
                        <td>
                          <div className="request-person">
                            <span className="request-avatar">
                              {getInitials(quotation.email)}
                            </span>
                            <span className="request-person-copy">
                              <strong>{quotation.email}</strong>
                              <small>
                                #{quotation.id} · recibida{" "}
                                {formatDate(quotation.created_at, {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </small>
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="service-name">
                            {quotation.servicio}
                          </span>
                          <small className="service-phone">
                            {quotation.celular}
                          </small>
                        </td>
                        <td>
                          <span className="date-cell">
                            {formatServiceDate(quotation.fecha_servicio)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${status.className}`}>
                            <span className={`status-dot ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="row-arrow"
                            aria-label={`Abrir solicitud ${quotation.id}`}
                          >
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {quotations.length === 0 && (
                <div className="empty-state">
                  <Inbox size={24} aria-hidden="true" />
                  <strong>Aún no hay solicitudes</strong>
                  <p>Cuando llegue una nueva cotización, aparecerá aquí.</p>
                </div>
              )}
            </div>
            <div className="content-card-footer">
              <span>
                Mostrando {Math.min(quotations.length, 8)} de{" "}
                {quotations.length} solicitudes
              </span>
              <Link href="#" className="view-all-link">
                Ver todas <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="bottom-grid">
            <article className="content-card activity-card">
              <div className="content-card-header">
                <div>
                  <p className="section-overline">Actividad</p>
                  <h2>Ritmo de solicitudes</h2>
                </div>
                <span className="period-pill">
                  Últimos 7 días <ChevronRight size={14} aria-hidden="true" />
                </span>
              </div>
              <div className="activity-visual">
                <div className="activity-axis">
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div
                  className="activity-chart"
                  aria-label="Gráfico de actividad de solicitudes"
                >
                  <div className="chart-grid-line chart-grid-line-one" />
                  <div className="chart-grid-line chart-grid-line-two" />
                  <div className="chart-grid-line chart-grid-line-three" />
                  <div className="chart-bars">
                    <span style={{ height: "34%" }} />
                    <span style={{ height: "51%" }} />
                    <span style={{ height: "42%" }} />
                    <span
                      className="chart-bar-active"
                      style={{ height: "76%" }}
                    />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "85%" }} />
                    <span style={{ height: "66%" }} />
                  </div>
                  <div className="chart-labels">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </div>
              </div>
            </article>
            <article className="content-card status-summary-card">
              <div className="content-card-header">
                <div>
                  <p className="section-overline">Distribución</p>
                  <h2>Por estado</h2>
                </div>
                <BarChart3
                  size={18}
                  className="header-icon"
                  aria-hidden="true"
                />
              </div>
              <div className="status-summary-list">
                {Object.entries(statusMeta)
                  .slice(0, 4)
                  .map(([key, status]) => {
                    const count = quotations.filter(
                      (quotation) => quotation.estado === key,
                    ).length;
                    const width = quotations.length
                      ? Math.max(
                          (count / quotations.length) * 100,
                          count ? 6 : 0,
                        )
                      : 0;
                    return (
                      <div className="summary-row" key={key}>
                        <div className="summary-label">
                          <span className={`status-dot ${status.dot}`} />
                          {status.label}
                          <strong>{count}</strong>
                        </div>
                        <div className="summary-track">
                          <span
                            className={`summary-bar ${status.className}`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}

function TrendingArrow() {
  return (
    <span className="trend-arrow" aria-hidden="true">
      ↗
    </span>
  );
}
