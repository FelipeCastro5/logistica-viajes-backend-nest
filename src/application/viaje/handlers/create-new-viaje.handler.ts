import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewViajeCommand } from '../commands/create-new-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateNewViajeCommand)
@Injectable()
export class CreateNewViajeHandler
  implements ICommandHandler<CreateNewViajeCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param viajeRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) { }

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: CreateNewViajeCommand) {
        try {
          const estado_viaje = true;

          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.

          const viaje = await this.viajeRepository.createNewViaje(
            command.fk_usuario,
            command.fk_cliente,
            command.fk_origen,
            command.fk_destino,
            command.codigo,
            command.observaciones,
            estado_viaje,
            command.producto,
            command.detalle_producto,
            command.direccion_llegada,
            command.fecha_salida,
            command.fecha_llegada,
            command.latitud_origen,
            command.longitud_origen,
            command.latitud_destino,
            command.longitud_destino,
            command.hora_salida,
            command.hora_llegada,
            command.horas_pactadas_cargue,
            command.horas_pactadas_descargue,
            command.exoneracion_legal,

            // Manifiesto
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
            command.ganancia_conductor,

            // Remesa
            command.numero_remesa,
            command.numero_autorizacion,
            command.tipo_empaque,
            command.naturaleza_carga,
            command.codigo_armonizado,
            command.cantidad,
            command.unidad_medida,
            command.peso_total,
            command.mercancia_peligrosa,
            command.observaciones_remesa,
            // Mercancía peligrosa (opcionales)
            command.codigo_un,
            command.grupo_riesgo,
            command.caracteristica_peligrosidad,
            command.embalaje_envase,
          );

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(viaje, 'Viaje creado exitosamente', 201);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateNewViajeHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al crear el viaje';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
