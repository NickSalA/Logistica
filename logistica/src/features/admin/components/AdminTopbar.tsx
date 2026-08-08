import { Bell, ChevronRight, Search } from "lucide-react";

import styles from "./AdminTopbar.module.css";

type AdminTopbarProps = {
  email: string;
  firstName: string;
};

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export function AdminTopbar({ email, firstName }: AdminTopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.mobileBrand}>
        <span className={styles.brandMark}>T</span>
        <strong>OPS CONSOLE</strong>
      </div>
      <div className={styles.search}>
        <Search size={17} aria-hidden="true" />
        <span>Buscar solicitudes…</span>
        <kbd>⌘ K</kbd>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Notificaciones"
        >
          <Bell size={18} strokeWidth={1.8} aria-hidden="true" />
          <span className={styles.notificationDot} />
        </button>
        <div className={styles.divider} />
        <div className={styles.userChip}>
          <span className={styles.userAvatar}>{getInitials(email)}</span>
          <span className={styles.userChipCopy}>
            <strong>{firstName}</strong>
            <small>Administrador</small>
          </span>
          <ChevronRight
            size={15}
            className={styles.userChipChevron}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
