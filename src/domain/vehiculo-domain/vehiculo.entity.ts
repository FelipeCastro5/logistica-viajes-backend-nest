export class Vehiculo {
  id_vehiculo: number;
  fk_usuario: number | null;
  placa: string;
  marca: string;
  configuracion: string;
  tipo_vehiculo: string;
  peso_vacio: number;
  peso_remolque: number;
}
