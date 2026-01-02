UPDATE remesa SET
  fk_viaje = $1,
  numero_remesa = $2,
  numero_autorizacion = $3,
  tipo_empaque = $4,
  naturaleza_carga = $5,
  codigo_armonizado = $6,
  cantidad = $7,
  unidad_medida = $8,
  peso_total = $9,
  mercancia_peligrosa = $10,
  observaciones = $11
WHERE id_remesa = $12;
