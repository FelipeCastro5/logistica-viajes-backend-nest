import { Inject, Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { GoogleDriveService } from '../../../infrastructure/google-drive-api/google-drive.service';
import { DownloadGastoXViajeFacturaCommand } from '../commands/download-gastoxviaje-factura.command';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(DownloadGastoXViajeFacturaCommand)
@Injectable()
export class DownloadGastoxviajeFacturaHandler implements IQueryHandler<DownloadGastoXViajeFacturaCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param repository Dependencia inyectada para el uso dentro del manejador.
     * @param googleDriveService Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: DownloadGastoXViajeFacturaCommand) {
        const reference = command.reference?.trim();
        // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
        if (!reference) {
          throw new BadRequestException('Debes enviar una referencia válida.');
        }

        let fileReference = reference;

        if (/^\d+$/.test(reference)) {
          const parsedId = Number(reference);
          if (Number.isNaN(parsedId)) {
            throw new BadRequestException('id_gastoxviaje debe ser un número válido.');
          }

          const gasto = await this.repository.getById(parsedId);
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!gasto) {
            throw new BadRequestException('No se encontró el gasto por viaje.');
          }

          fileReference = gasto.url_factura || gasto.id_factura || undefined;
        }

        // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

        if (!fileReference) {
          throw new BadRequestException('No se encontró una referencia de factura válida para descargar.');
        }

        console.log('[gastoxviaje:download-factura] referencia resuelta', {
          reference,
          fileReference,
        });

        return this.googleDriveService.downloadFileByUrl(fileReference);
    }
}