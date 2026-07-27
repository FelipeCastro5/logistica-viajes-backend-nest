/**
 * Clase de comando CQRS que representa la operación CreateVehiculoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateVehiculoCommand {
  /**
     * Constructor del comando CreateVehiculoCommand.
     * @param fk_usuario Dato requerido de tipo number | null para la ejecución del comando.
     * @param placa Dato requerido de tipo string para la ejecución del comando.
     * @param marca Dato requerido de tipo string para la ejecución del comando.
     * @param configuracion Dato requerido de tipo string para la ejecución del comando.
     * @param tipo_vehiculo Dato requerido de tipo string para la ejecución del comando.
     * @param peso_vacio Dato requerido de tipo number para la ejecución del comando.
     * @param peso_remolque Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly fk_usuario: number | null,
    public readonly placa: string,
    public readonly marca: string,
    public readonly configuracion: string,
    public readonly tipo_vehiculo: string,
    public readonly peso_vacio: number,
    public readonly peso_remolque: number,
  ) {}
}
