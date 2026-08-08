import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/config/env";
import { serverEnv } from "@/config/env.server";

export type StoredQuotation = {
  id: number;
};

type CreateQuotation = {
  email: string;
  celular: string;
  documento: string;
  servicio: string;
  fechaServicio: string;
  mensaje: string;
};

export async function createQuotation(
  quotation: CreateQuotation,
): Promise<StoredQuotation> {
  const supabase = createClient(
    publicEnv.supabaseUrl,
    serverEnv.supabaseSecretKey,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
  const { data, error } = await supabase
    .from("cotizaciones")
    .insert({
      email: quotation.email,
      celular: quotation.celular,
      documento: quotation.documento,
      servicio: quotation.servicio,
      fecha_servicio: quotation.fechaServicio,
      mensaje: quotation.mensaje,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error("Supabase rechazó la cotización.");
  }

  return data;
}
