/**
 * Importamos los decoradores e interfaces necesarias de CQRS para implementar un CommandHandler.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Importamos el comando CreateChatCommand, que contiene los datos necesarios para la creación del chat.
 */
import { CreateChatCommand } from '../commands/create-chat.command';
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
 * Decorador @CommandHandler: Vincula este manejador con el comando CreateChatCommand.
 * Cuando se despacha un CreateChatCommand, el bus de comandos ejecutará automáticamente esta clase.
 */
@CommandHandler(CreateChatCommand)
/**
 * Decorador @Injectable: Marca la clase como un proveedor que puede ser inyectado por NestJS.
 */
@Injectable()
export class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
  /**
   * Constructor del manejador donde se inyectan las dependencias requeridas.
   * 
   * @param chatRepository Inyectamos la implementación del repositorio bajo el token 'ChatInterface'.
   */
    constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  /**
   * Método execute: Punto de entrada del CommandHandler para la creación.
   * Contiene la lógica paso a paso para procesar el CreateChatCommand.
   * 
   * @param command Instancia de CreateChatCommand con los datos del nuevo chat (fk_usuario, nombre_chat).
   * @returns Retorna un objeto estandarizado mediante ResponseUtil.
   */
    async execute(command: CreateChatCommand) {
    try {
      // 1. Invocamos el método createChat del repositorio pasándole los datos extraídos del comando.
      // Esto insertará un nuevo registro en la tabla de chats de la base de datos.
      const chat = await this.chatRepository.createChat(
        command.fk_usuario,
        command.nombre_chat
      );
      
      // 2. Si la creación fue exitosa, retornamos el objeto de chat creado.
      // Utilizamos ResponseUtil.success para enviar una respuesta con HTTP 201 (Created).
      return ResponseUtil.success(chat, 'Chat creado exitosamente', 201);
      
    } catch (error) {
      // Si ocurre cualquier error durante la creación (ej. usuario no existe, fallo de red, etc.), se captura aquí.
      
      // Registramos el error en la consola para depuración.
      console.error('Error en CreateChatHandler:', error);
      
      // Intentamos extraer un código de estado específico del error, de lo contrario asumimos un error 500 (Internal Server Error).
      const status = error.getStatus?.() ?? 500;
      
      // Extraemos el mensaje original del error, o proveemos un mensaje de fallback descriptivo.
      const message = error.response?.message || 'Error al crear el chat';
      
      // Retornamos el error formateado con ResponseUtil.
      return ResponseUtil.error(message, status);
    }
  }
}
