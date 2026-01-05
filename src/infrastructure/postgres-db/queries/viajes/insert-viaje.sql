INSERT INTO viaje (
  fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
  codigo, observaciones, estado_viaje, producto, detalle_producto,
  direccion_llegada, fecha_salida, fecha_llegada,
  latitud_origen, longitud_origen,
  latitud_destino, longitud_destino,
  hora_salida, hora_llegada,
  horas_pactadas_cargue, horas_pactadas_descargue,
  exoneracion_legal
)
VALUES (
  $1,$2,$3,$4,$5,
  $6,$7,$8,$9,$10,
  $11,$12,$13,
  $14,$15,
  $16,$17,
  $18::timestamp,
  $19::timestamp,
  $20,$21,
  $22
)
RETURNING *;
