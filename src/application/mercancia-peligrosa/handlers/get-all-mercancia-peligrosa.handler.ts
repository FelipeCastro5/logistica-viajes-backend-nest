import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllMercanciaPeligrosaCommand } from '../commands/get-all-mercancia-peligrosa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllMercanciaPeligrosaCommand)
@Injectable()
export class GetAllMercanciaPeligrosaHandler
    implements IQueryHandler<GetAllMercanciaPeligrosaCommand> {
    /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param mercanciaRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
        @Inject('MercanciaPeligrosaInterface')
        private readonly mercanciaRepository: MercanciaPeligrosaInterface,
    ) { }

    /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute() {
        try {
            // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
            const data = await this.mercanciaRepository.getAll();

            // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

            if (!data || data.length === 0) {
                // Devolvemos la respuesta de error estandarizada al cliente.
                return ResponseUtil.error('Mercancías no encontradas', 404);
            }

            // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

            return ResponseUtil.success(
                data,
                'Mercancías peligrosas obtenidas exitosamente',
            );
        } catch (error) {
            // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
            // Registramos el error internamente para depuración técnica.
            console.error('Error en GetAllMercanciaPeligrosaHandler:', error);
            // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
            const status = error.getStatus?.() ?? 500;
            const message =
                error.response?.message ||
                'Error al obtener las mercancías peligrosas';
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error(message, status);
        }
    }
}
