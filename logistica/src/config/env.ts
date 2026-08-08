function requiredPublic(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Falta la variable de entorno pública ${name}.`);
  }

  return value;
}

function getSupabasePublishableKey() {
  return requiredPublic(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export const publicEnv = {
  supabaseUrl: requiredPublic(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  ),
  supabasePublishableKey: getSupabasePublishableKey(),
  prismicEnvironment: process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ?? "",
  isProduction: process.env.NODE_ENV === "production",
} as const;
