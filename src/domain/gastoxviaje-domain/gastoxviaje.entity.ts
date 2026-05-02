export class Gastoxviaje {
  id_gastoxviaje: number;
  fk_viaje: number;
  fk_gasto: number;
  valor: number;
  detalles: string;
  url_factura?: string | null;
  id_factura?: string | null;
}
