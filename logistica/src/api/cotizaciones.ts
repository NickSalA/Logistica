import { apiPost } from "./axiosInstance";
import type {
  CreateCotizacionRequest,
  CreateCotizacionResponse,
} from "@/types/api";

export function createCotizacion(payload: CreateCotizacionRequest) {
  return apiPost<CreateCotizacionResponse>("/cotizaciones", payload);
}
