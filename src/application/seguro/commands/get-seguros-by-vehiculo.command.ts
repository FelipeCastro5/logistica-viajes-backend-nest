/**
 * Clase de comando CQRS que representa la operación GetSegurosByVehiculoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetSegurosByVehiculoCommand {
  /**
     * Constructor del comando GetSegurosByVehiculoCommand.
     * @param fk_vehiculo Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_vehiculo: number) {}
}
