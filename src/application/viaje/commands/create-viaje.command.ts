export class CreateViajeCommand {
  constructor(
    public readonly fk_usuario: number,
    public readonly fk_manifiesto: number,
    public readonly fk_cliente: number,
    public readonly fk_origen: number,
    public readonly fk_destino: number,
    public readonly codigo: string,
    public readonly observaciones: string,
    public readonly estado_viaje: boolean,
    public readonly producto: string,
    public readonly detalle_producto: string,
    public readonly direccion_llegada: string,
    public readonly fecha_salida: Date,
    public readonly fecha_llegada: Date,
  ) {}
}
