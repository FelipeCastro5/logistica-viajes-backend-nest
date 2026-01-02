import { Firma } from './firma.entity';

export interface FirmaInterface {
  getAll(): Promise<Firma[]>;
  getById(id: number): Promise<Firma | null>;

  createFirma(
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<Firma>;

  updateFirma(
    id: number,
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<any>;

  deleteFirma(id: number): Promise<any>;

  getFirmasByViaje(fk_viaje: number): Promise<Firma[]>;
}
