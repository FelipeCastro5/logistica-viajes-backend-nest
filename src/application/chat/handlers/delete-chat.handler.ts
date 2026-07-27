/**
 * Importamos los decoradores e interfaces necesarias de CQRS para implementar un CommandHandler.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Importamos el comando DeleteChatCommand, que contiene los datos necesarios para la operación.
 */
import { DeleteChatCommand } from '../commands/delete-chat.command';
/**
 * Importamos los decoradores de inyección de dependencias de NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';
/**
 * Importamos la interfaz del repositorio de Chat para poder interactuar con la base de datos de manera abstracta.
 */
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
/**
 * Importamos la utilidad ResponseUtil para estandarizar las respuestas de nuestra API.
 */
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Decorador @CommandHandler: Vincula este manejador con el comando DeleteChatCommand.
 * Cuando se despacha un DeleteChatCommand, el bus de comandos ejecutará automáticamente esta clase.
 */
@CommandHandler(DeleteChatCommand)
/**
 * Decorador @Injectable: Marca la clase como un proveedor que puede ser inyectado por NestJS.
 */
@Injectable()
export class DeleteChatHandler implements ICommandHandler<DeleteChatCommand> {
  /**
   * Constructor de la clase donde inyectamos las dependencias requeridas.
   * 
   * @param chatRepository Inyectamos la implementación del repositorio bajo el token 'ChatInterface'.
   */
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  /**
   * Método execute: Punto de entrada del CommandHandler.
   * Contiene la lógica de negocio para procesar el DeleteChatCommand.
   * 
   * @param command Instancia de DeleteChatCommand que trae consigo el ID del chat a eliminar.
   * @returns Retorna un objeto estandarizado mediante ResponseUtil.
   */
  async execute(command: DeleteChatCommand) {
    try {
      // 1. Invocamos el método deleteChat del repositorio, pasando el ID proporcionado en el comando.
      // Esto intenta eliminar el registro en la base de datos.
      const result = await this.chatRepository.deleteChat(command.id_chat);
      
      // 2. Validamos el resultado de la eliminación.
      // Si la base de datos (ej. Postgres) indica que no se afectó ninguna fila (rowCount es 0 o indefinido),
      // significa que el chat con ese ID no existía.
      if (!result?.rowCount) {
        // En caso de no existir, retornamos una respuesta de error con código HTTP 404 (Not Found).
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      
      // 3. Si se eliminó correctamente, retornamos una respuesta exitosa.
      // Pasamos null como datos (ya que se eliminó) y un HTTP 200 (OK).
      return ResponseUtil.success(null, 'Chat eliminado exitosamente', 200);
      
    } catch (error) {
      // Si ocurre un error inesperado (fallo de red, error de DB, etc.), lo capturamos aquí.
      
      // Imprimimos el error en consola para fines de depuración y registro en logs.
      console.error('Error en DeleteChatHandler:', error);
      
      // Obtenemos el código de estado del error si está definido, de lo contrario usamos un 500 (Internal Server Error) genérico.
      const status = error.getStatus?.() ?? 500;
      
      // Obtenemos el mensaje de la respuesta del error, o un mensaje genérico de fallback.
      const message = error.response?.message || 'Error al eliminar el chat';
      
      // Retornamos la respuesta estandarizada de error.
      return ResponseUtil.error(message, status);
    }
  }
}
