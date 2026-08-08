"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    setLoading(true);
    setError("");
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (signInError) {
      setError("No pudimos iniciar sesión con Google. Inténtalo otra vez.");
      setLoading(false);
    }
  }

  return (
    <div className="login-actions">
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={loading}
        className="google-login-button"
      >
        <span className="google-glyph" aria-hidden="true">
          G
        </span>
        <span>{loading ? "Conectando…" : "Continuar con Google"}</span>
        <span className="google-arrow" aria-hidden="true">
          ↗
        </span>
      </button>
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
