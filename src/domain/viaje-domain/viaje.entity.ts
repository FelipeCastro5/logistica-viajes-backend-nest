export class Viaje {
  id_viaje: number;
  fk_usuario: number;
  fk_manifiesto: number;
  fk_cliente: number;
  fk_origen: number;
  fk_destino: number;
  codigo: string;
  observaciones: string;
  estado_viaje: boolean;
  producto: string;
  detalle_producto: string;
  direccion_llegada: string;
  fecha_salida: Date;
  fecha_llegada: Date;
}
