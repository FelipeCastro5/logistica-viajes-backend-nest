INSERT INTO cliente (
  fk_usuario,
  nit,
  nombre_cliente,
  telefono
)
VALUES (
  $1, $2, $3, $4
)
RETURNING *;
