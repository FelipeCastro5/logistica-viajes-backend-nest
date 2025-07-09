INSERT INTO gastosxviaje (
  fk_viaje, fk_gasto, valor, detalles
)
VALUES (
  $1, $2, $3, $4
)
RETURNING *;
