INSERT INTO gasto (
  nombre_gasto
)
VALUES (
  $1
)
RETURNING *;
