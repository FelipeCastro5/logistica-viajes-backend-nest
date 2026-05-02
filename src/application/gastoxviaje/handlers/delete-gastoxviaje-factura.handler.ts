import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { DeleteGastoXViajeFacturaCommand } from '../commands/delete-gastoxviaje-factura.command';
import { GoogleDriveService } from '../../../infrastructure/google-drive-api/google-drive.service';

@CommandHandler(DeleteGastoXViajeFacturaCommand)
@Injectable()
export class DeleteGastoxviajeFacturaHandler implements ICommandHandler<DeleteGastoXViajeFacturaCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async execute(command: DeleteGastoXViajeFacturaCommand) {
    try {
      const gasto = await this.repository.getById(command.id_gastoxviaje);

      if (!gasto) {
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }

      const fileReference = gasto.id_factura || gasto.url_factura;

      if (fileReference) {
        await this.googleDriveService.deleteFileByUrl(fileReference);
      }

      const updated = await this.repository.clearGastoxviajeFactura(command.id_gastoxviaje);

      if (!updated) {
        return ResponseUtil.error('Gasto por viaje no encontrado al limpiar la factura', 404);
      }

      return ResponseUtil.success(updated, 'Factura eliminada del Drive y desvinculada del gasto por viaje', 200);
    } catch (error) {
      console.error('Error en DeleteGastoxviajeFacturaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || error.message || 'Error al eliminar la factura';
      return ResponseUtil.error(message, status);
    }
  }
}