import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateViajeCommand } from '../commands/create-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateViajeCommand)
@Injectable()
export class CreateViajeHandler implements ICommandHandler<CreateViajeCommand> {
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
    async execute(command: CreateViajeCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const viaje = await this.viajeRepository.createViaje(
            command.fk_usuario,
            command.fk_manifiesto,
            command.fk_cliente,
            command.fk_origen,
            command.fk_destino,
            command.codigo,
            command.observaciones,
            command.estado_viaje,
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
            command.exoneracion_legal
          );
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(viaje, 'Viaje creado exitosamente', 201);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateViajeHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al crear el viaje';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
