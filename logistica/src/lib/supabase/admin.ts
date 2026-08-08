import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/config/env";
import { serverEnv } from "@/config/env.server";

export function createSupabaseAdminClient() {
  return createClient(publicEnv.supabaseUrl, serverEnv.supabaseSecretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function isAdminEmail(email: string | undefined) {
  const allowed = serverEnv.adminEmails;
  return Boolean(email && allowed.includes(email.toLowerCase()));
}
