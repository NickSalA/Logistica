"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/config/env";
import styles from "./GoogleSignInButton.module.css";

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.638-.0573-1.2527-.1636-1.8409H9v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7968 2.7164v2.2582h2.9082c1.702-1.5673 2.685-3.8741 2.685-6.6155z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.8059 5.9568-2.18l-2.9082-2.2582c-.8059.54-1.8377.8591-3.0486.8591-2.3441 0-4.3286-1.5845-5.0368-3.7105H.9573v2.3318C2.4382 15.9836 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9632 10.7104A5.41 5.41 0 0 1 3.6818 9c0-.5932.1023-1.17.2814-1.7105V4.9577H.9573A9 9 0 0 0 0 9c0 1.4523.3477 2.8277.9573 4.0423l3.0059-2.3319z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.3459l2.5818-2.5818C13.4632.8918 11.4268 0 9 0 5.4818 0 2.4382 2.0164.9573 4.9577l3.0059 2.3318C4.6714 5.1641 6.6559 3.5795 9 3.5795z"
      />
    </svg>
  );
}

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    setLoading(true);
    setError("");

    const supabase = createBrowserClient(
      publicEnv.supabaseUrl,
      publicEnv.supabasePublishableKey,
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
    <div className={styles.actions}>
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={loading}
        className={styles.button}
      >
        <GoogleLogo />
        <span>{loading ? "Conectando…" : "Continuar con Google"}</span>
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
