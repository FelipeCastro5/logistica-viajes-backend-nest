UPDATE gasto
SET
  nombre_gasto = $1
WHERE id_gasto = $2
RETURNING *;