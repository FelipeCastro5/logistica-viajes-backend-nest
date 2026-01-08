export class UpdateRemesaCommand {
  constructor(
    public readonly id_remesa: number,
    public readonly fk_viaje: number,
    public readonly numero_remesa: string,
    public readonly numero_autorizacion: string,
    public readonly tipo_empaque: string,
    public readonly naturaleza_carga: string,
    public readonly codigo_armonizado: string,
    public readonly cantidad: number,
    public readonly unidad_medida: string,
    public readonly peso_total: number,
    public readonly mercancia_peligrosa: boolean,
    public readonly observaciones: string,
    
    public readonly id_mercancia?: number,
    public readonly codigo_un?: string,
    public readonly grupo_riesgo?: string,
    public readonly caracteristica_peligrosidad?: string,
    public readonly embalaje_envase?: string,
  ) {}
}
