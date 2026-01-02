UPDATE firma
SET
  fk_viaje = $1,
  tipo_firma = $2,
  firma_digital = $3
WHERE id_firma = $4;
