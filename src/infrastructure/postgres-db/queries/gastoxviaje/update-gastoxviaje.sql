UPDATE gastosxviaje
SET
  fk_viaje = $1,
  fk_gasto = $2,
  valor = $3,
  detalles = $4
WHERE id_gastoxviaje = $5
RETURNING *;
