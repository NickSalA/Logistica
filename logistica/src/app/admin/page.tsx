import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminTopbar } from "@/features/admin/components/AdminTopbar";
import { DashboardMetrics } from "@/features/admin/components/DashboardMetrics";
import {
  QuotationsTable,
  statusMeta,
  type Quotation,
} from "@/features/admin/components/QuotationsTable";
import { createSupabaseAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "./dashboard-page.module.css";

function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("es-CL", options).format(new Date(value));
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
    <main className={styles.shell}>
      <a className={styles["skip-link"]} href="#admin-content">
        Saltar al contenido
      </a>
      <AdminSidebar quotationCount={quotations.length} />

      <div className={styles.main}>
        <AdminTopbar email={user.email ?? "OP"} firstName={firstName} />

        <div id="admin-content" className={styles.content}>
          <div className={styles.heading}>
            <div>
              <p className={styles.kicker}>
                <span className={styles["status-pulse"]} />
                {formatDate(new Date().toISOString(), {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1>Buenos días, {firstName}.</h1>
              <p className={styles["heading-copy"]}>
                Aquí tienes el pulso de tu operación comercial.
              </p>
            </div>
            <div className={styles["heading-actions"]}>
              <span className={styles["last-sync"]}>
                <Activity size={15} aria-hidden="true" /> Actualizado hace unos
                segundos
              </span>
              <button className={styles["primary-action"]} type="button">
                <BriefcaseBusiness size={16} aria-hidden="true" /> Nueva
                cotización <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <DashboardMetrics
            activeCount={activeCount}
            recentCount={recentCount}
            quotationCount={quotations.length}
            wonCount={wonCount}
            conversionRate={conversionRate}
          />

          <QuotationsTable quotations={quotations} />

          <section className={styles["bottom-grid"]}>
            <article className={styles["content-card"]}>
              <div className={styles["content-card-header"]}>
                <div>
                  <p className={styles["section-overline"]}>Actividad</p>
                  <h2>Ritmo de solicitudes</h2>
                </div>
                <span className={styles["period-pill"]}>
                  Últimos 7 días <ChevronRight size={14} aria-hidden="true" />
                </span>
              </div>
              <div className={styles["activity-visual"]}>
                <div className={styles["activity-axis"]}>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div
                  className={styles["activity-chart"]}
                  aria-label="Gráfico de actividad de solicitudes"
                >
                  <div
                    className={`${styles["chart-grid-line"]} ${styles["chart-grid-line-one"]}`}
                  />
                  <div
                    className={`${styles["chart-grid-line"]} ${styles["chart-grid-line-two"]}`}
                  />
                  <div
                    className={`${styles["chart-grid-line"]} ${styles["chart-grid-line-three"]}`}
                  />
                  <div className={styles["chart-bars"]}>
                    <span style={{ height: "34%" }} />
                    <span style={{ height: "51%" }} />
                    <span style={{ height: "42%" }} />
                    <span
                      className={styles["chart-bar-active"]}
                      style={{ height: "76%" }}
                    />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "85%" }} />
                    <span style={{ height: "66%" }} />
                  </div>
                  <div className={styles["chart-labels"]}>
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
            <article className={styles["content-card"]}>
              <div className={styles["content-card-header"]}>
                <div>
                  <p className={styles["section-overline"]}>Distribución</p>
                  <h2>Por estado</h2>
                </div>
                <BarChart3
                  size={18}
                  className={styles["header-icon"]}
                  aria-hidden="true"
                />
              </div>
              <div className={styles["status-summary-list"]}>
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
                      <div className={styles["summary-row"]} key={key}>
                        <div className={styles["summary-label"]}>
                          <span className={`status-dot ${status.dot}`} />
                          {status.label}
                          <strong>{count}</strong>
                        </div>
                        <div className={styles["summary-track"]}>
                          <span
                            className={`${styles["summary-bar"]} ${status.className}`}
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
