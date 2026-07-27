/**
 * Importamos la funcionalidad de NestJS CQRS para manejar Comandos (escrituras/modificaciones).
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Importamos el comando UpdateChatCommand, el cual trae los datos (id, fk_usuario, nombre_chat) necesarios para actualizar.
 */
import { UpdateChatCommand } from '../commands/update-chat.command';
/**
 * Importamos decoradores para inyección de dependencias (DI) desde el core de NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';
/**
 * Importamos la interfaz del repositorio ChatInterface para acceder a la base de datos de manera desacoplada.
 */
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
/**
 * Importamos ResponseUtil para devolver una respuesta HTTP homogénea en toda la aplicación.
 */
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Decorador @CommandHandler: Vincula este manejador con la ejecución del UpdateChatCommand.
 */
@CommandHandler(UpdateChatCommand)
/**
 * Decorador @Injectable: Marca a esta clase como un proveedor inyectable por el framework.
 */
@Injectable()
export class UpdateChatHandler implements ICommandHandler<UpdateChatCommand> {
  /**
   * Constructor del manejador. Recibe las dependencias requeridas.
   * 
   * @param chatRepository Instancia que cumple con ChatInterface inyectada mediante su token.
   */
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  /**
   * Método execute: Encargado de orquestar la actualización de un chat.
   * 
   * @param command Instancia del comando con los nuevos datos a actualizar.
   * @returns Retorna un objeto con la confirmación de la actualización o un error 404.
   */
  async execute(command: UpdateChatCommand) {
    try {
      // 1. Invocamos la actualización en el repositorio enviando los datos del comando.
      // Se pasan el id del chat a modificar y los nuevos valores.
      const result = await this.chatRepository.updateChat(
        command.id,
        command.fk_usuario,
        command.nombre_chat
      );
      
      // 2. Evaluamos el resultado que devuelve la base de datos.
      // Si rowCount es 0 o indefinido, la base de datos nos indica que no modificó ningún registro (el ID no existe).
      if (!result?.rowCount) {
        // En ese caso devolvemos error 404 (Not Found).
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      
      // 3. Si la actualización fue exitosa (se modificó al menos una fila), devolvemos respuesta exitosa 200.
      return ResponseUtil.success(null, 'Chat actualizado exitosamente', 200);
      
    } catch (error) {
      // Si la base de datos lanza un error, por ejemplo, violar una llave foránea o falla de red, entra aquí.
      
      // Registramos en el log del servidor para auditoría y debug.
      console.error('Error en UpdateChatHandler:', error);
      
      // Obtenemos el código HTTP (o 500 por defecto).
      const status = error.getStatus?.() ?? 500;
      
      // Asignamos un mensaje de error controlado para el cliente.
      const message = error.response?.message || 'Error al actualizar el chat';
      
      // Retornamos la respuesta de error estandarizada.
      return ResponseUtil.error(message, status);
    }
  }
}
