import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGastoXViajeCommand } from '../commands/create-gastoxviaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateGastoXViajeCommand)
@Injectable()
export class CreateGastoxviajeHandler implements ICommandHandler<CreateGastoXViajeCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param repository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: CreateGastoXViajeCommand) {
        try {
          const gasto = await this.repository.createGastoxviaje(
            command.fk_viaje,
            command.fk_gasto,
            command.valor,
            command.detalles
          );
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(gasto, 'Gasto por viaje creado exitosamente', 201);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateGastoXViajeHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al crear el gasto por viaje';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
