/**
 * Clase de comando CQRS que representa la operación GetFirmasByViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetFirmasByViajeCommand {
  /**
     * Constructor del comando GetFirmasByViajeCommand.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_viaje: number) {}
}
