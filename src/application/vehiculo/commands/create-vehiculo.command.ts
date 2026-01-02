export class CreateVehiculoCommand {
  constructor(
    public readonly fk_usuario: number | null,
    public readonly placa: string,
    public readonly marca: string,
    public readonly configuracion: string,
    public readonly tipo_vehiculo: string,
    public readonly peso_vacio: number,
    public readonly peso_remolque: number,
  ) {}
}
