import { GoogleSignInButton } from "../../../features/admin/components/GoogleSignInButton";
import { LockKeyhole, Route, ShieldCheck } from "lucide-react";
import styles from "./login-page.module.css";

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;
  const isUnauthorized = error === "unauthorized";

  return (
    <main className={styles.shell}>
      <div className={styles.grid} aria-hidden="true" />
      <div
        className={`${styles.glow} ${styles["glow-top"]}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.glow} ${styles["glow-bottom"]}`}
        aria-hidden="true"
      />

      <section className={styles.story} aria-label="Trasandes Ops">
        <div className={styles["brand-lockup"]}>
          <span className={styles["brand-mark"]}>T</span>
          <span>
            <strong>TRASANDES</strong>
            <small>OPS CONSOLE</small>
          </span>
        </div>

        <div className={styles["story-copy"]}>
          <p className={styles.eyebrow}>
            <span className={styles["status-pulse"]} /> Control operativo
          </p>
          <h1>El movimiento empieza con una buena decisión.</h1>
          <p className={styles["story-lead"]}>
            Una vista clara para responder antes, coordinar mejor y mantener
            cada solicitud en ruta.
          </p>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="login-title">
        <div className={styles.card}>
          <div className={styles["card-icon"]}>
            <LockKeyhole size={20} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <p className={styles.eyebrow}>Área privada</p>
          <h2 id="login-title">Bienvenido de vuelta.</h2>
          <p className={styles["card-copy"]}>
            Accede con tu cuenta corporativa para revisar y gestionar las
            solicitudes.
          </p>

          {isUnauthorized && (
            <p className={styles.error} role="alert">
              <ShieldCheck size={16} aria-hidden="true" /> Esta cuenta no tiene
              permisos para entrar al panel.
            </p>
          )}
          <GoogleSignInButton />
        </div>
        <p className={styles["panel-note"]}>
          <Route size={14} aria-hidden="true" /> Solo para equipos autorizados
          de Trasandes
        </p>
      </section>
    </main>
  );
}
