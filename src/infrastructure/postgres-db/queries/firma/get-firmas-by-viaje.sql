SELECT
  id_firma,
  fk_viaje,
  tipo_firma,
  firma_digital,
  fecha_firma
FROM firma
WHERE fk_viaje = $1;
