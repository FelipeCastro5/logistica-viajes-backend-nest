import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClienteCommand } from '../commands/update-cliente.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(UpdateClienteCommand)
@Injectable()
export class UpdateClienteHandler implements ICommandHandler<UpdateClienteCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param clienteRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: UpdateClienteCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const result = await this.clienteRepository.updateCliente(
            command.id,
            command.fk_usuario,
            command.nit,
            command.nombre_cliente,
            command.telefono,
          );
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!result?.rowCount) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Cliente no encontrado', 404);
          }
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(null, 'Cliente actualizado exitosamente', 200);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en UpdateClienteHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al actualizar el cliente';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
