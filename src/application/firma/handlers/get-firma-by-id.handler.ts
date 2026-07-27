import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFirmaByIdCommand } from '../commands/get-firma-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetFirmaByIdCommand)
@Injectable()
export class GetFirmaByIdHandler
  implements IQueryHandler<GetFirmaByIdCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param firmaRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: GetFirmaByIdCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const firma = await this.firmaRepository.getById(command.id);

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!firma) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Firma no encontrada', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(
            firma,
            'Firma encontrada exitosamente',
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetFirmaByIdHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al obtener la firma';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
