UPDATE viaje
SET
  fk_usuario = $1,
  fk_manifiesto = $2,
  fk_cliente = $3,
  fk_origen = $4,
  fk_destino = $5,
  codigo = $6,
  observaciones = $7,
  estado_viaje = $8,
  producto = $9,
  detalle_producto = $10,
  direccion_llegada = $11,
  fecha_salida = $12,
  fecha_llegada = $13
WHERE id_viaje = $14
RETURNING *;
