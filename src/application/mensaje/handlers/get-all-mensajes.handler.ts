import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllMensajesCommand } from '../commands/get-all-mensajes.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllMensajesCommand)
@Injectable()
export class GetAllMensajesHandler implements IQueryHandler<GetAllMensajesCommand> {
  constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  async execute() {
    try {
      const mensajes = await this.mensajeRepository.getAll();
      return ResponseUtil.success(mensajes, 'Mensajes obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllMensajesHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los mensajes';
      return ResponseUtil.error(message, status);
    }
  }
}
