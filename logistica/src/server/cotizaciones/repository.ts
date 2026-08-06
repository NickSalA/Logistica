import "server-only";
import { createClient } from "@supabase/supabase-js";

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

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase no está configurado para guardar cotizaciones.");
  }

  return { url, secretKey };
}

export async function createQuotation(
  quotation: CreateQuotation,
): Promise<StoredQuotation> {
  const { url, secretKey } = getSupabaseConfig();
  const supabase = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
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
