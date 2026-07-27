// get-all-usuarios.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllUsuariosCommand } from '../commands/get-all-usuarios.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllUsuariosCommand)
@Injectable()
export class GetAllUsuariosHandler implements IQueryHandler<GetAllUsuariosCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param usuarioRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(): Promise<any> {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const usuarios = await this.usuarioRepository.getAll();
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(usuarios, 'Usuarios obtenidos exitosamente');
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetAllUsuariosHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener los usuarios';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
