import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMercanciaPeligrosaByIdCommand } from '../commands/get-mercancia-peligrosa-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetMercanciaPeligrosaByIdCommand)
@Injectable()
export class GetMercanciaPeligrosaByIdHandler
  implements IQueryHandler<GetMercanciaPeligrosaByIdCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param mercanciaRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: GetMercanciaPeligrosaByIdCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const mercancia =
            await this.mercanciaRepository.getById(command.id);

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!mercancia) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Mercancía no encontrada', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(
            mercancia,
            'Mercancía peligrosa encontrada exitosamente',
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetMercanciaPeligrosaByIdHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message ||
            'Error al obtener la mercancía peligrosa';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
