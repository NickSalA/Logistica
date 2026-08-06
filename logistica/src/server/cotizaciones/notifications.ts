type NewQuotationNotification = {
  quotationId: number;
};

/**
 * Punto de extensión para el proveedor de correo.
 * No registra datos personales ni envía mensajes hasta integrar un proveedor.
 */
export async function notifyNewQuotation(
  notification: NewQuotationNotification,
): Promise<void> {
  console.info("[cotizaciones] Notificación de correo simulada", {
    quotationId: notification.quotationId,
  });
}
