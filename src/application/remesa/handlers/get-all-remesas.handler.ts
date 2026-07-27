import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllRemesasCommand } from '../commands/get-all-remesas.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllRemesasCommand)
@Injectable()
export class GetAllRemesasHandler
  implements IQueryHandler<GetAllRemesasCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param remesaRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute() {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const remesas = await this.remesaRepository.getAll();

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!remesas || remesas.length === 0) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Remesas no encontradas', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(remesas, 'Remesas obtenidas exitosamente');
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetAllRemesasHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener las remesas';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
