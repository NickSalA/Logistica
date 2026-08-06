import type { ApiSuccessResponse } from "./common";

export type CreateCotizacionRequest = {
  email: string;
  celular: string;
  documento: string;
  servicio: string;
  fechaServicio: string;
  mensaje: string;
  website?: string;
};

export type CreateCotizacionResponse = ApiSuccessResponse<{
  status: "received";
}>;
