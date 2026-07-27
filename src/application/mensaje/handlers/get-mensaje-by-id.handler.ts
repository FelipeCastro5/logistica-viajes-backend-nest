import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMensajeByIdCommand } from '../commands/get-mensaje-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetMensajeByIdCommand)
@Injectable()
export class GetMensajeByIdHandler implements IQueryHandler<GetMensajeByIdCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param mensajeRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: GetMensajeByIdCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const mensaje = await this.mensajeRepository.getById(command.id);
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!mensaje) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Mensaje no encontrado', 404);
          }
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(mensaje, 'Mensaje obtenido exitosamente');
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetMensajeByIdHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener el mensaje';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
