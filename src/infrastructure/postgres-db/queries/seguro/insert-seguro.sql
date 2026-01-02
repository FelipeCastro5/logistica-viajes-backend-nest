INSERT INTO seguro (
  fk_vehiculo,
  tipo_seguro,
  numero_poliza,
  aseguradora,
  fecha_vencimiento,
  valor
) VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
