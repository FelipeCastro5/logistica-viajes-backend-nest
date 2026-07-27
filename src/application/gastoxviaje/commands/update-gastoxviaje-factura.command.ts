import { Express } from 'express';

/**
 * Clase de comando CQRS que representa la operación UpdateGastoXViajeFacturaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateGastoXViajeFacturaCommand {
  /**
     * Constructor del comando UpdateGastoXViajeFacturaCommand.
     * @param id_gastoxviaje Dato requerido de tipo number para la ejecución del comando.
     * @param file Dato requerido de tipo Express.Multer.File para la ejecución del comando.
     */
    constructor(
    public readonly id_gastoxviaje: number,
    public readonly file: Express.Multer.File,
  ) {}
}