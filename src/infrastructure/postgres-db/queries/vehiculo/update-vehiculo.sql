UPDATE vehiculo SET
  fk_usuario = $1,
  placa = $2,
  marca = $3,
  configuracion = $4,
  tipo_vehiculo = $5,
  peso_vacio = $6,
  peso_remolque = $7
WHERE id_vehiculo = $8;