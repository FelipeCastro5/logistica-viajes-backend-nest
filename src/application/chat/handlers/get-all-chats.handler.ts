/**
 * Importamos los decoradores e interfaces de CQRS necesarias.
 * IQueryHandler se usa para consultas (operaciones de solo lectura), a diferencia de ICommandHandler.
 */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
/**
 * Importamos el comando (o consulta en este caso) GetAllChatsCommand.
 */
import { GetAllChatsCommand } from '../commands/get-all-chats.command';
/**
 * Importamos los decoradores de inyección de dependencias de NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';
/**
 * Importamos la interfaz del repositorio de Chat.
 */
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
/**
 * Importamos la utilidad ResponseUtil para dar formato a la respuesta HTTP.
 */
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Decorador @QueryHandler: Vincula esta clase manejadora con la consulta GetAllChatsCommand.
 */
@QueryHandler(GetAllChatsCommand)
/**
 * Decorador @Injectable: Permite a NestJS inyectar esta clase como una dependencia.
 */
@Injectable()
export class GetAllChatsHandler implements IQueryHandler<GetAllChatsCommand> {
  /**
   * Constructor del manejador donde inyectamos el repositorio.
   * 
   * @param chatRepository Implementación de ChatInterface inyectada.
   */
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  /**
   * Método execute: Ejecuta la lógica para obtener todos los chats.
   * 
   * @param query Instancia de GetAllChatsCommand.
   * @returns Un objeto de respuesta estándar que contiene un arreglo de chats.
   */
  async execute(query: GetAllChatsCommand) {
    try {
      // 1. Llamamos al método getAll() del repositorio.
      // Esto ejecutará un "SELECT *" o su equivalente en la base de datos para obtener todos los registros de chat.
      const chats = await this.chatRepository.getAll();
      
      // 2. Verificamos si el arreglo retornado está vacío.
      if (!chats || chats.length === 0) {
        // Si no hay chats, retornamos una respuesta exitosa pero con datos nulos y código HTTP 204 (No Content) o 200 con un mensaje.
        // Aquí optamos por 200 y mensaje informativo.
        return ResponseUtil.success([], 'No se encontraron chats', 200);
      }
      
      // 3. Si se encontraron chats, los retornamos dentro de una respuesta exitosa (HTTP 200).
      return ResponseUtil.success(chats, 'Chats obtenidos exitosamente', 200);
      
    } catch (error) {
      // Manejo de errores: si ocurre un fallo de red o problema con la BD.
      
      // Se registra en la consola.
      console.error('Error en GetAllChatsHandler:', error);
      
      // Se obtiene el código de estado (por defecto 500 si no existe).
      const status = error.getStatus?.() ?? 500;
      
      // Se obtiene o define un mensaje de error.
      const message = error.response?.message || 'Error al obtener los chats';
      
      // Se devuelve el error envuelto.
      return ResponseUtil.error(message, status);
    }
  }
}
