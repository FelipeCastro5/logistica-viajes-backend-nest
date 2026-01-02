import { MercanciaPeligrosa } from './mercancia-peligrosa.entity';

export interface MercanciaPeligrosaInterface {
  getAll(): Promise<MercanciaPeligrosa[]>;
  getById(id: number): Promise<MercanciaPeligrosa | null>;

  createMercanciaPeligrosa(
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<MercanciaPeligrosa>;

  updateMercanciaPeligrosa(
    id: number,
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<any>;

  deleteMercanciaPeligrosa(id: number): Promise<any>;

  getByRemesa(fk_remesa: number): Promise<MercanciaPeligrosa[]>;
}
