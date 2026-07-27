import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolCommand } from '../commands/create-rol.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateRolCommand)
@Injectable()
export class CreateRolHandler implements ICommandHandler<CreateRolCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param rolRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: CreateRolCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const rol = await this.rolRepository.createRol(command.nombre_rol);
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(rol, 'Rol creado exitosamente', 201);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateRolHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al crear el rol';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
