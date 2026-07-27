import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllVehiculosCommand } from '../commands/get-all-vehiculos.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllVehiculosCommand)
@Injectable()
export class GetAllVehiculosHandler
  implements IQueryHandler<GetAllVehiculosCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param vehiculoRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute() {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const vehiculos = await this.vehiculoRepository.getAll();
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!vehiculos || vehiculos.length === 0) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Vehículos no encontrados', 404);
          }
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(
            vehiculos,
            'Vehículos obtenidos exitosamente',
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetAllVehiculosHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al obtener los vehículos';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
