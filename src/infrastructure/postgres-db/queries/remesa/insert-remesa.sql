INSERT INTO remesa (
  fk_viaje,
  numero_remesa,
  numero_autorizacion,
  tipo_empaque,
  naturaleza_carga,
  codigo_armonizado,
  cantidad,
  unidad_medida,
  peso_total,
  mercancia_peligrosa,
  observaciones
) VALUES (
  $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
)
RETURNING *;
