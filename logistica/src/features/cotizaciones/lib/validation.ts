import type { CreateCotizacionRequest } from "@/types/api";

export type CotizacionValidationResult =
  | {
      success: true;
      data: Required<Omit<CreateCotizacionRequest, "website">>;
    }
  | { success: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function validateCotizacion(
  input: CreateCotizacionRequest,
): CotizacionValidationResult {
  const data = {
    email: input.email.trim().toLowerCase(),
    celular: input.celular.trim(),
    documento: input.documento.trim(),
    servicio: input.servicio.trim(),
    fechaServicio: input.fechaServicio.trim(),
    mensaje: input.mensaje.trim(),
  };

  if (!emailPattern.test(data.email) || data.email.length > 254) {
    return { success: false, message: "Ingresa un correo electrónico válido." };
  }

  if (data.celular.length < 7 || data.celular.length > 30) {
    return { success: false, message: "Ingresa un número de celular válido." };
  }

  if (data.documento.length < 3 || data.documento.length > 30) {
    return { success: false, message: "Ingresa un DNI o RUC válido." };
  }

  if (!data.servicio || data.servicio.length > 120) {
    return { success: false, message: "Selecciona un tipo de servicio." };
  }

  const parsedServiceDate = new Date(`${data.fechaServicio}T00:00:00.000Z`);
  if (
    !datePattern.test(data.fechaServicio) ||
    Number.isNaN(parsedServiceDate.getTime()) ||
    parsedServiceDate.toISOString().slice(0, 10) !== data.fechaServicio
  ) {
    return { success: false, message: "Ingresa una fecha de servicio válida." };
  }

  if (!data.mensaje || data.mensaje.length > 2000) {
    return {
      success: false,
      message: "El mensaje debe tener entre 1 y 2000 caracteres.",
    };
  }

  return { success: true, data };
}
