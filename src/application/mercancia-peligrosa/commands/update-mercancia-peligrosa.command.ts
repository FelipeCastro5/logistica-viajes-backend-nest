export class UpdateMercanciaPeligrosaCommand {
  constructor(
    public readonly id: number,
    public readonly fk_remesa: number,
    public readonly codigo_un: string,
    public readonly grupo_riesgo: string,
    public readonly caracteristica_peligrosidad: string,
    public readonly embalaje_envase: string,
  ) {}
}
