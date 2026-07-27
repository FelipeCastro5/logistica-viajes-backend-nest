// create-manifiesto.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateManifiestoCommand } from '../commands/create-manifiesto.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateManifiestoCommand)
@Injectable()
export class CreateManifiestoHandler implements ICommandHandler<CreateManifiestoCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param manifiestoRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: CreateManifiestoCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const manifiesto = await this.manifiestoRepository.createManifiesto(
            command.fk_vehiculo,
            command.flete_total,
            command.porcentaje_retencion_fuente,
            command.valor_retencion_fuente,
            command.porcentaje_ica,
            command.valor_ica,
            command.deduccion_fiscal,
            command.neto_a_pagar,
            command.anticipo,
            command.saldo_a_pagar,
            command.total_gastos,
            command.queda_al_carro,
            command.a_favor_del_carro,
            command.porcentaje_conductor,
            command.ganancia_conductor
          );
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(manifiesto, 'Manifiesto creado exitosamente', 201);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateManifiestoHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al crear el manifiesto';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
