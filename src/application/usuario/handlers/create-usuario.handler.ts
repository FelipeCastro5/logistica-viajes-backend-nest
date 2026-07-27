// create-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsuarioCommand } from '../commands/create-usuario.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { HashService } from '../../../application/utilities/hash.service';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateUsuarioCommand)
@Injectable()
export class CreateUsuarioHandler implements ICommandHandler<CreateUsuarioCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param usuarioRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) { }

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: CreateUsuarioCommand) {
        try {
        const hashedPassword = await HashService.hash(command.contrasena);
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const usuario = await this.usuarioRepository.createUsuario(
            command.fk_tipodoc,
            command.num_doc,
            command.fk_rol,
            command.fk_contador,
            command.p_nombre,
            command.s_nombre,
            command.p_apellido,
            command.s_apellido,
            command.telefono,
            command.correo,
            hashedPassword 
          );
          const { contrasena, ...usuarioSinContrasena } = usuario;
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(usuarioSinContrasena, 'Usuario creado exitosamente', 201);
        } catch (error) {
          // Si es HttpException, extrae su status
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateUsuarioHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al crear el usuario';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
