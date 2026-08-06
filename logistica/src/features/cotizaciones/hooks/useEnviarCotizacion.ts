"use client";

import { useCallback, useState } from "react";
import { createCotizacion } from "@/api";
import type { CreateCotizacionRequest } from "@/types/api";

export type CotizacionSubmissionStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

export function useEnviarCotizacion() {
  const [status, setStatus] = useState<CotizacionSubmissionStatus>("idle");
  const [message, setMessage] = useState("");

  const send = useCallback(async (payload: CreateCotizacionRequest) => {
    setStatus("sending");
    setMessage("");

    try {
      await createCotizacion(payload);
      setStatus("success");
      setMessage(
        "Recibimos tu solicitud. Nuestro equipo se comunicará contigo pronto.",
      );
      return true;
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
      );
      return false;
    }
  }, []);

  return { message, send, status };
}
