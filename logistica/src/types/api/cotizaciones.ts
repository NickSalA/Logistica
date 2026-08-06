export type CreateCotizacionRequest = {
  email: string;
  celular: string;
  documento: string;
  servicio: string;
  fechaServicio: string;
  mensaje: string;
  website?: string;
};

export type CreateCotizacionResponse = {
  ok: true;
};

export type ApiErrorResponse = {
  message: string;
};
