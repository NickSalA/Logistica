import { NextResponse } from "next/server";
import { notifyNewQuotation } from "@/server/cotizaciones/notifications";
import { createQuotation } from "@/server/cotizaciones/repository";
import { validateCotizacion } from "@/features/cotizaciones/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "La solicitud debe contener datos válidos." },
      { status: 400 },
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
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const validation = validateCotizacion(input);
  if (!validation.success) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  try {
    const quotation = await createQuotation(validation.data);
    await notifyNewQuotation({ quotationId: quotation.id });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[cotizaciones] No se pudo registrar la solicitud", error);

    return NextResponse.json(
      { message: "No pudimos enviar tu solicitud. Inténtalo nuevamente." },
      { status: 503 },
    );
  }
}
