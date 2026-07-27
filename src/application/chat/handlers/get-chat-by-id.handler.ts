/**
 * Importamos los decoradores y la interfaz de NestJS CQRS para manejar consultas (Queries).
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
/**
 * Importamos la consulta que este handler va a procesar: GetChatByIdCommand.
 */
import { GetChatByIdCommand } from '../commands/get-chat-by-id.command';
/**
 * Importamos los decoradores de inyección de dependencias de NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';
/**
 * Importamos la interfaz del dominio para interactuar con la persistencia de chats.
 */
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
/**
 * Importamos ResponseUtil para estructurar las respuestas de manera consistente.
 */
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Decorador @QueryHandler: Relaciona este handler específicamente con GetChatByIdCommand.
 */
@QueryHandler(GetChatByIdCommand)
/**
 * Decorador @Injectable: Permite inyectar dependencias en esta clase a través de NestJS.
 */
@Injectable()
export class GetChatByIdHandler implements IQueryHandler<GetChatByIdCommand> {
  /**
   * Constructor: Aquí se inyectan las implementaciones necesarias para la lógica.
   * 
   * @param chatRepository Implementación inyectada que cumple con ChatInterface.
   */
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  /**
   * Método execute: Realiza la búsqueda de un chat por su ID.
   * 
   * @param command Contiene el ID del chat proporcionado en la petición.
   * @returns Un objeto estándar con los datos del chat o un error si no se encuentra.
   */
  async execute(command: GetChatByIdCommand) {
    try {
      // 1. Solicitamos al repositorio que busque el chat usando el ID que viene en el comando.
      const chat = await this.chatRepository.getById(command.id);
      
      // 2. Evaluamos si el resultado fue nulo (es decir, no se encontró ningún chat con ese ID).
      if (chat == null) {
        // En caso de ser nulo, devolvemos una respuesta de error con código 404 (Not Found).
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      
      // 3. Si el chat existe, lo devolvemos con una respuesta exitosa (código 200 implícito en success por defecto).
      return ResponseUtil.success(chat, 'Chat encontrado exitosamente');
      
    } catch (error) {
      // Capturamos cualquier error en la operación de base de datos o de red.
      
      // Registramos en logs de consola el error técnico para los desarrolladores.
      console.error('Error en GetChatByIdHandler:', error);
      
      // Intentamos extraer el status HTTP del error, o aplicamos un 500 por defecto.
      const status = error.getStatus?.() ?? 500;
      
      // Obtenemos un mensaje seguro para el cliente o establecemos un genérico.
      const message = error.response?.message || 'Error al obtener el chat';
      
      // Respondemos estandarizadamente con el error atrapado.
      return ResponseUtil.error(message, status);
    }
  }
}
