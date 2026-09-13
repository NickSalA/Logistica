import { describe, it, expect } from 'vitest';
import { validateCotizacion } from '@/features/cotizaciones/lib/validation';

describe('Vitest Test Runner & Path Alias Sanity Check', () => {
  it('executes in-memory assertions correctly', () => {
    expect(1 + 1).toBe(2);
    expect(true).toBe(true);
  });

  it('resolves @/* path alias and validates valid domain payload', () => {
    const validPayload = {
      email: 'contacto@logisticatrasandes.com',
      celular: '987654321',
      documento: '12345678',
      servicio: 'Transporte de Carga Pesada',
      fechaServicio: '2026-10-15',
      mensaje: 'Cotización de flete Lima - Arequipa',
    };

    const result = validateCotizacion(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('contacto@logisticatrasandes.com');
    }
  });

  it('rejects invalid email formats', () => {
    const payload = {
      email: 'not-an-email',
      celular: '987654321',
      documento: '12345678',
      servicio: 'Transporte',
      fechaServicio: '2026-10-15',
      mensaje: 'Hola',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('correo');
    }
  });

  it('rejects invalid celular length', () => {
    const payload = {
      email: 'valid@example.com',
      celular: '123',
      documento: '12345678',
      servicio: 'Transporte',
      fechaServicio: '2026-10-15',
      mensaje: 'Hola',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('celular');
    }
  });

  it('rejects invalid documento length', () => {
    const payload = {
      email: 'valid@example.com',
      celular: '987654321',
      documento: '1',
      servicio: 'Transporte',
      fechaServicio: '2026-10-15',
      mensaje: 'Hola',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('DNI o RUC');
    }
  });

  it('rejects empty servicio', () => {
    const payload = {
      email: 'valid@example.com',
      celular: '987654321',
      documento: '12345678',
      servicio: '',
      fechaServicio: '2026-10-15',
      mensaje: 'Hola',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('servicio');
    }
  });

  it('rejects invalid fechaServicio format', () => {
    const payload = {
      email: 'valid@example.com',
      celular: '987654321',
      documento: '12345678',
      servicio: 'Transporte',
      fechaServicio: 'not-a-date',
      mensaje: 'Hola',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('fecha');
    }
  });

  it('rejects empty mensaje', () => {
    const payload = {
      email: 'valid@example.com',
      celular: '987654321',
      documento: '12345678',
      servicio: 'Transporte',
      fechaServicio: '2026-10-15',
      mensaje: '',
    };
    const result = validateCotizacion(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('mensaje');
    }
  });
});
