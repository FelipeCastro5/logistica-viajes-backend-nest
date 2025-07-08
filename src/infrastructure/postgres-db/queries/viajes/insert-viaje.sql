INSERT INTO viaje (
  fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
  codigo, observaciones, estado_viaje, producto, detalle_producto,
  direccion_llegada, fecha_salida, fecha_llegada
)
VALUES (
  $1, $2, $3, $4, $5,
  $6, $7, $8, $9, $10,
  $11, $12, $13
)
RETURNING *;
