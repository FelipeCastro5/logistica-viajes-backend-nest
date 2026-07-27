/**
 * Clase de comando CQRS que representa la operación UpdateMercanciaPeligrosaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateMercanciaPeligrosaCommand {
  /**
     * Constructor del comando UpdateMercanciaPeligrosaCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_remesa Dato requerido de tipo number para la ejecución del comando.
     * @param codigo_un Dato requerido de tipo string para la ejecución del comando.
     * @param grupo_riesgo Dato requerido de tipo string para la ejecución del comando.
     * @param caracteristica_peligrosidad Dato requerido de tipo string para la ejecución del comando.
     * @param embalaje_envase Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_remesa: number,
    public readonly codigo_un: string,
    public readonly grupo_riesgo: string,
    public readonly caracteristica_peligrosidad: string,
    public readonly embalaje_envase: string,
  ) {}
}
