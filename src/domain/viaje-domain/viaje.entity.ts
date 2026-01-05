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

  latitud_origen: number;
  longitud_origen: number;
  latitud_destino: number;
  longitud_destino: number;

  fecha_hora_salida: Date;
  fecha_hora_llegada: Date;

  horas_pactadas_cargue: number;
  horas_pactadas_descargue: number;
  exoneracion_legal: string;
}
