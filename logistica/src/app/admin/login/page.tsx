import { ArrowUpRight, LockKeyhole, Route, ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;
  const isUnauthorized = error === "unauthorized";

  return (
    <main className="admin-auth-shell">
      <div className="auth-grid" aria-hidden="true" />
      <div className="auth-glow auth-glow-top" aria-hidden="true" />
      <div className="auth-glow auth-glow-bottom" aria-hidden="true" />

      <section className="auth-story" aria-label="Trasandes Ops">
        <div className="auth-brand-lockup">
          <span className="auth-brand-mark">T</span>
          <span>
            <strong>TRASANDES</strong>
            <small>OPS CONSOLE</small>
          </span>
        </div>

        <div className="auth-story-copy">
          <p className="eyebrow">
            <span className="status-pulse" /> Control operativo
          </p>
          <h1>El movimiento empieza con una buena decisión.</h1>
          <p className="auth-story-lead">
            Una vista clara para responder antes, coordinar mejor y mantener
            cada solicitud en ruta.
          </p>
        </div>

        <div className="route-visual" aria-hidden="true">
          <div className="route-line route-line-one" />
          <div className="route-line route-line-two" />
          <div className="route-node route-node-origin">
            <span>SCL</span>
          </div>
          <div className="route-node route-node-mid">
            <span>OPS</span>
          </div>
          <div className="route-node route-node-destination">
            <span>→</span>
          </div>
          <div className="route-label route-label-origin">Santiago</div>
          <div className="route-label route-label-destination">
            En movimiento
          </div>
        </div>

        <div className="auth-story-footer">
          <div>
            <span className="auth-footer-dot" /> Sistema operativo
          </div>
          <span className="auth-version">v1.0 / interno</span>
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-panel-topline">
          <span>01</span>
          <span>Acceso seguro</span>
        </div>
        <div className="auth-card">
          <div className="auth-card-icon">
            <LockKeyhole size={20} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <p className="eyebrow">Área privada</p>
          <h2 id="login-title">Bienvenido de vuelta.</h2>
          <p className="auth-card-copy">
            Accede con tu cuenta corporativa para revisar y gestionar las
            solicitudes.
          </p>

          {isUnauthorized && (
            <p className="auth-error" role="alert">
              <ShieldCheck size={16} aria-hidden="true" /> Esta cuenta no tiene
              permisos para entrar al panel.
            </p>
          )}
          <LoginForm />

          <div className="auth-trust">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Acceso protegido por Google Auth</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </div>
        </div>
        <p className="auth-panel-note">
          <Route size={14} aria-hidden="true" /> Solo para equipos autorizados
          de Trasandes
        </p>
      </section>
    </main>
  );
}
