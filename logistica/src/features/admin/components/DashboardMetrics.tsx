import { CalendarDays, CheckCircle2, Clock3, Inbox } from "lucide-react";
import styles from "./DashboardMetrics.module.css";

type DashboardMetricsProps = {
  activeCount: number;
  recentCount: number;
  quotationCount: number;
  wonCount: number;
  conversionRate: number;
};

export function DashboardMetrics({
  activeCount,
  recentCount,
  quotationCount,
  wonCount,
  conversionRate,
}: DashboardMetricsProps) {
  return (
    <section
      className={styles["metric-grid"]}
      aria-label="Métricas de operación"
    >
      <article
        className={`${styles["metric-card"]} ${styles["metric-card-highlight"]}`}
      >
        <div className={styles["metric-card-top"]}>
          <span className={styles["metric-label"]}>Solicitudes activas</span>
          <span className={styles["metric-icon"]}>
            <Inbox size={17} aria-hidden="true" />
          </span>
        </div>
        <strong className={styles["metric-value"]}>{activeCount}</strong>
        <div className={styles["metric-foot"]}>
          <span className={styles["metric-positive"]}>
            <TrendingArrow /> {recentCount} esta semana
          </span>
          <span className={styles["metric-foot-note"]}>en seguimiento</span>
        </div>
      </article>
      <article className={styles["metric-card"]}>
        <div className={styles["metric-card-top"]}>
          <span className={styles["metric-label"]}>Total recibidas</span>
          <span
            className={`${styles["metric-icon"]} ${styles["metric-icon-muted"]}`}
          >
            <CalendarDays size={17} aria-hidden="true" />
          </span>
        </div>
        <strong className={styles["metric-value"]}>{quotationCount}</strong>
        <div className={styles["metric-foot"]}>
          <span className={styles["metric-foot-note"]}>
            últimos 100 registros
          </span>
        </div>
      </article>
      <article className={styles["metric-card"]}>
        <div className={styles["metric-card-top"]}>
          <span className={styles["metric-label"]}>Conversiones</span>
          <span
            className={`${styles["metric-icon"]} ${styles["metric-icon-green"]}`}
          >
            <CheckCircle2 size={17} aria-hidden="true" />
          </span>
        </div>
        <strong className={styles["metric-value"]}>{wonCount}</strong>
        <div className={styles["metric-foot"]}>
          <span className={styles["metric-positive"]}>{conversionRate}%</span>
          <span className={styles["metric-foot-note"]}>tasa de cierre</span>
        </div>
      </article>
      <article className={styles["metric-card"]}>
        <div className={styles["metric-card-top"]}>
          <span className={styles["metric-label"]}>Tiempo de respuesta</span>
          <span
            className={`${styles["metric-icon"]} ${styles["metric-icon-muted"]}`}
          >
            <Clock3 size={17} aria-hidden="true" />
          </span>
        </div>
        <strong
          className={`${styles["metric-value"]} ${styles["metric-value-text"]}`}
        >
          —
        </strong>
        <div className={styles["metric-foot"]}>
          <span className={styles["metric-foot-note"]}>Próximamente</span>
        </div>
      </article>
    </section>
  );
}

function TrendingArrow() {
  return (
    <span className={styles["trend-arrow"]} aria-hidden="true">
      ↗
    </span>
  );
}
