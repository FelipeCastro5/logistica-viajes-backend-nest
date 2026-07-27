/**
 * Clase de utilidad/servicio: PaginatedDto.
 * Provee funciones auxiliares reutilizables a nivel de aplicación.
 */
export class PaginatedDto {
  /** Propiedad utilitaria: logs. */
    logs: any[];
  /** Propiedad utilitaria: pagination. */
    pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}
