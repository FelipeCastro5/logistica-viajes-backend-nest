// src/application/utilities/placa.util.ts

export interface PlacaResult {
  valid: boolean;
  value: string | null;
  message: string | null;
}

/**
 * Valida y normaliza una placa de vehículo.
 * - Entrada: cualquier string
 * - Salida:
 *    - valid: true si es correcto, false si no
 *    - value: placa normalizada en mayúsculas sin guiones ni espacios (ABC123)
 *    - message: null si es válido, mensaje de error si no
 */
export function parsePlaca(rawPlaca: string): PlacaResult {
  if (!rawPlaca || rawPlaca.trim() === '') {
    return { valid: false, value: null, message: 'La placa es requerida' };
  }

  // Quitamos guiones, espacios y otros caracteres no alfanuméricos
  const cleaned = rawPlaca.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Validamos formato: 3 letras + 3 números
  const regex = /^[A-Z]{3}[0-9]{3}$/;
  if (!regex.test(cleaned)) {
    return {
      valid: false,
      value: null,
      message:
        `Placa inválida: debe tener 3 letras mayúsculas seguidas de 3 números (ej: ABC123). Valor recibido: "${rawPlaca}"`,
    };
  }

  return { valid: true, value: cleaned, message: null };
}
