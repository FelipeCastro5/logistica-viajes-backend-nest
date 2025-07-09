import { Tipodoc } from './tipodoc.entity';

export interface TipodocInterface {
  getAll(): Promise<Tipodoc[]>;
  getById(id: number): Promise<Tipodoc | null>;
  createTipodoc(nombre_documento: string, abreviatura: string): Promise<Tipodoc>;
  updateTipodoc(id: number, nombre_documento: string, abreviatura: string): Promise<any>;
  deleteTipodoc(id: number): Promise<any>;
}
