export class Remesa {
  id_remesa: number;
  fk_viaje: number;
  numero_remesa: string;
  numero_autorizacion: string;
  tipo_empaque: string;
  naturaleza_carga: string;
  codigo_armonizado: string;
  cantidad: number;
  unidad_medida: string;
  peso_total: number;
  mercancia_peligrosa: boolean;
  observaciones: string;
}
