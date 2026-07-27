/**
 * Clase de comando CQRS que representa la operación UpdateViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateViajeCommand {
  /**
     * Constructor del comando UpdateViajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param fk_manifiesto Dato requerido de tipo number para la ejecución del comando.
     * @param fk_cliente Dato requerido de tipo number para la ejecución del comando.
     * @param fk_origen Dato requerido de tipo number para la ejecución del comando.
     * @param fk_destino Dato requerido de tipo number para la ejecución del comando.
     * @param codigo Dato requerido de tipo string para la ejecución del comando.
     * @param observaciones Dato requerido de tipo string para la ejecución del comando.
     * @param estado_viaje Dato requerido de tipo boolean para la ejecución del comando.
     * @param producto Dato requerido de tipo string para la ejecución del comando.
     * @param detalle_producto Dato requerido de tipo string para la ejecución del comando.
     * @param direccion_llegada Dato requerido de tipo string para la ejecución del comando.
     * @param fecha_salida Dato requerido de tipo Date para la ejecución del comando.
     * @param fecha_llegada Dato requerido de tipo Date para la ejecución del comando.
     * @param latitud_origen Dato requerido de tipo number para la ejecución del comando.
     * @param longitud_origen Dato requerido de tipo number para la ejecución del comando.
     * @param latitud_destino Dato requerido de tipo number para la ejecución del comando.
     * @param longitud_destino Dato requerido de tipo number para la ejecución del comando.
     * @param hora_salida Dato requerido de tipo Date para la ejecución del comando.
     * @param hora_llegada Dato requerido de tipo Date para la ejecución del comando.
     * @param horas_pactadas_cargue Dato requerido de tipo number para la ejecución del comando.
     * @param horas_pactadas_descargue Dato requerido de tipo number para la ejecución del comando.
     * @param exoneracion_legal Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_usuario: number,
    public readonly fk_manifiesto: number,
    public readonly fk_cliente: number,
    public readonly fk_origen: number,
    public readonly fk_destino: number,
    public readonly codigo: string,
    public readonly observaciones: string,
    public readonly estado_viaje: boolean,
    public readonly producto: string,
    public readonly detalle_producto: string,
    public readonly direccion_llegada: string,
    public readonly fecha_salida: Date,
    public readonly fecha_llegada: Date,
    public readonly latitud_origen: number,
    public readonly longitud_origen: number,
    public readonly latitud_destino: number,
    public readonly longitud_destino: number,
    public readonly hora_salida: Date,
    public readonly hora_llegada: Date,
    public readonly horas_pactadas_cargue: number,
    public readonly horas_pactadas_descargue: number,
    public readonly exoneracion_legal: string,
  ) {}
}
