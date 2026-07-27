import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetSegurosByVehiculoCommand } from '../commands/get-seguros-by-vehiculo.command';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetSegurosByVehiculoCommand)
@Injectable()
export class GetSegurosByVehiculoHandler
  implements IQueryHandler<GetSegurosByVehiculoCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param seguroRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: GetSegurosByVehiculoCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const seguros =
            await this.seguroRepository.getSegurosByVehiculo(
              command.fk_vehiculo,
            );

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!seguros || seguros.length === 0) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Seguros no encontrados', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(
            seguros,
            'Seguros encontrados exitosamente',
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetSegurosByVehiculoHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al obtener los seguros';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
