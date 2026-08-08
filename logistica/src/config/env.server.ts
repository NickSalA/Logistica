import "server-only";

function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}.`);
  }

  return value;
}

export const serverEnv = {
  supabaseSecretKey: required(
    "SUPABASE_SECRET_KEY",
    process.env.SUPABASE_SECRET_KEY,
  ),
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
} as const;
