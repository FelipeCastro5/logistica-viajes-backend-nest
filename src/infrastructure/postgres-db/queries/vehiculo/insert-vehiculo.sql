INSERT INTO vehiculo (
  fk_usuario, placa, marca, configuracion, tipo_vehiculo, peso_vacio, peso_remolque
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;