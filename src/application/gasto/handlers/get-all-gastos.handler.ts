import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllGastosCommand } from '../commands/get-all-gastos.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllGastosCommand)
@Injectable()
export class GetAllGastosHandler implements IQueryHandler<GetAllGastosCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param gastoRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(): Promise<any> {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const gastos = await this.gastoRepository.getAll();
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(gastos, 'Gastos obtenidos exitosamente');
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetAllGastosHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener los gastos';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
