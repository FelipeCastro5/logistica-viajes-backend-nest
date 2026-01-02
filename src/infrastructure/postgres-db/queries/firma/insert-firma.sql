INSERT INTO firma (
  fk_viaje,
  tipo_firma,
  firma_digital
)
VALUES ($1, $2, $3)
RETURNING *;
