import { NextResponse } from "next/server";
import type {
  ApiErrorCode,
  ApiErrorResponse,
  CreateCotizacionResponse,
} from "@/types/api";
import { notifyNewQuotation } from "@/server/cotizaciones/notifications";
import { createQuotation } from "@/server/cotizaciones/repository";
import { validateCotizacion } from "@/features/cotizaciones/lib/validation";

export const runtime = "nodejs";

function errorResponse(code: ApiErrorCode, message: string, status: number) {
  const body: ApiErrorResponse = { error: { code, message } };
  return NextResponse.json(body, { status });
}

function acceptedResponse() {
  const body: CreateCotizacionResponse = { data: { status: "received" } };
  return NextResponse.json(body, { status: 201 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return errorResponse(
      "BAD_REQUEST",
      "La solicitud debe contener datos válidos.",
      400,
    );
  }

  const input = {
    email: typeof body.email === "string" ? body.email : "",
    celular: typeof body.celular === "string" ? body.celular : "",
    documento: typeof body.documento === "string" ? body.documento : "",
    servicio: typeof body.servicio === "string" ? body.servicio : "",
    fechaServicio:
      typeof body.fechaServicio === "string" ? body.fechaServicio : "",
    mensaje: typeof body.mensaje === "string" ? body.mensaje : "",
    website: typeof body.website === "string" ? body.website : "",
  };

  // Honeypot: respondemos como éxito para no dar señales útiles a bots.
  if (input.website) {
    return acceptedResponse();
  }

  const validation = validateCotizacion(input);
  if (!validation.success) {
    return errorResponse("VALIDATION_ERROR", validation.message, 400);
  }

  try {
    const quotation = await createQuotation(validation.data);
    await notifyNewQuotation({ quotationId: quotation.id });

    return acceptedResponse();
  } catch (error) {
    console.error("[cotizaciones] No se pudo registrar la solicitud", error);

    return errorResponse(
      "SERVICE_UNAVAILABLE",
      "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
      503,
    );
  }
}
