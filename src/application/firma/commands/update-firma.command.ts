/**
 * Clase de comando CQRS que representa la operación UpdateFirmaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateFirmaCommand {
  /**
     * Constructor del comando UpdateFirmaCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     * @param tipo_firma Dato requerido de tipo string para la ejecución del comando.
     * @param firma_digital Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_viaje: number,
    public readonly tipo_firma: string,
    public readonly firma_digital: string,
  ) {}
}
