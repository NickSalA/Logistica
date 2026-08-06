export type CotizacionEstado =
  | "nuevo"
  | "contactado"
  | "en_cotizacion"
  | "ganado"
  | "descartado";

/**
 * Representación de una fila de `public.cotizaciones`.
 * Debe sustituirse por tipos generados desde Supabase al iniciar el panel admin.
 */
export type CotizacionRow = {
  id: number;
  email: string;
  celular: string;
  documento: string;
  servicio: string;
  fecha_servicio: string;
  mensaje: string;
  estado: CotizacionEstado;
  notas_internas: string;
  created_at: string;
  updated_at: string;
};
