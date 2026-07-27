/**
 * Clase de comando CQRS que representa la operación UpdateTotalGastosCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateTotalGastosCommand {
  /**
     * Constructor del comando UpdateTotalGastosCommand.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_viaje: number) {}
}
