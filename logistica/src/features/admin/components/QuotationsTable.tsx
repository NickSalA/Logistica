import { ArrowUpRight, Inbox, Search } from "lucide-react";
import Link from "next/link";

import styles from "./QuotationsTable.module.css";

export type Quotation = {
  id: number;
  email: string;
  celular: string;
  servicio: string;
  fecha_servicio: string;
  estado: string;
  created_at: string;
};

export const statusMeta: Record<
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

type QuotationsTableProps = {
  quotations: Quotation[];
};

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

export function QuotationsTable({ quotations }: QuotationsTableProps) {
  const newCount = quotations.filter(
    (quotation) => quotation.estado === "nuevo",
  ).length;

  return (
    <section className={styles.contentCard}>
      <div className={styles.contentCardHeader}>
        <div>
          <p className={styles.sectionOverline}>Bandeja de entrada</p>
          <h2>Solicitudes recientes</h2>
        </div>
        <div className={styles.tableTools}>
          <button
            className={`${styles.filterButton} ${styles.filterButtonActive}`}
            type="button"
          >
            Todas <span>{quotations.length}</span>
          </button>
          <button className={styles.filterButton} type="button">
            Nuevas <span>{newCount}</span>
          </button>
          <button
            className={`${styles.filterButton} ${styles.filterButtonIcon}`}
            type="button"
            aria-label="Buscar en solicitudes"
          >
            <Search size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.requestsTable}>
          <caption className={styles.srOnly}>
            Solicitudes de cotización recientes
          </caption>
          <thead>
            <tr>
              <th scope="col">Solicitud</th>
              <th scope="col">Servicio</th>
              <th scope="col">Fecha de servicio</th>
              <th scope="col">Estado</th>
              <th scope="col">
                <span className={styles.srOnly}>Abrir</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {quotations.slice(0, 8).map((quotation) => {
              const status = statusMeta[quotation.estado] ?? statusMeta.nuevo;
              return (
                <tr key={quotation.id}>
                  <td>
                    <div className={styles.requestPerson}>
                      <span className={styles.requestAvatar}>
                        {getInitials(quotation.email)}
                      </span>
                      <span className={styles.requestPersonCopy}>
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
                    <span className={styles.serviceName}>
                      {quotation.servicio}
                    </span>
                    <small className={styles.servicePhone}>
                      {quotation.celular}
                    </small>
                  </td>
                  <td>
                    <span className={styles.dateCell}>
                      {formatServiceDate(quotation.fecha_servicio)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles[status.className]}`}
                    >
                      <span
                        className={`${styles.statusDot} ${styles[status.dot]}`}
                      />
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.rowArrow}
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
          <div className={styles.emptyState}>
            <Inbox size={24} aria-hidden="true" />
            <strong>Aún no hay solicitudes</strong>
            <p>Cuando llegue una nueva cotización, aparecerá aquí.</p>
          </div>
        )}
      </div>
      <div className={styles.contentCardFooter}>
        <span>
          Mostrando {Math.min(quotations.length, 8)} de {quotations.length}{" "}
          solicitudes
        </span>
        <Link href="#" className={styles.viewAllLink}>
          Ver todas <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
