import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMensajeByIdCommand } from '../commands/get-mensaje-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetMensajeByIdCommand)
@Injectable()
export class GetMensajeByIdHandler implements IQueryHandler<GetMensajeByIdCommand> {
  constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  async execute(command: GetMensajeByIdCommand) {
    try {
      const mensaje = await this.mensajeRepository.getById(command.id);
      if (!mensaje) {
        return ResponseUtil.error('Mensaje no encontrado', 404);
      }
      return ResponseUtil.success(mensaje, 'Mensaje obtenido exitosamente');
    } catch (error) {
      console.error('Error en GetMensajeByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el mensaje';
      return ResponseUtil.error(message, status);
    }
  }
}
