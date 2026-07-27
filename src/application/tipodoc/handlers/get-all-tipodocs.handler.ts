import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllTipodocsCommand } from '../commands/get-all-tipodocs.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetAllTipodocsCommand)
@Injectable()
export class GetAllTipodocsHandler implements IQueryHandler<GetAllTipodocsCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param tipodocRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(): Promise<any> {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const tipodocs = await this.tipodocRepository.getAll();
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(tipodocs, 'Tipos de documento obtenidos exitosamente');
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetAllTipodocsHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener los tipos de documento';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
