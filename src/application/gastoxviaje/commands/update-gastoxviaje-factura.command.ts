import { Express } from 'express';

export class UpdateGastoXViajeFacturaCommand {
  constructor(
    public readonly id_gastoxviaje: number,
    public readonly file: Express.Multer.File,
  ) {}
}