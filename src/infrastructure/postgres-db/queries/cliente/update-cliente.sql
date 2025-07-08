UPDATE cliente
SET
  fk_usuario = $1,
  nit = $2,
  nombre_cliente = $3,
  telefono = $4
WHERE id_cliente = $5
RETURNING *;