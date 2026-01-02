UPDATE seguro SET
  fk_vehiculo = $1,
  tipo_seguro = $2,
  numero_poliza = $3,
  aseguradora = $4,
  fecha_vencimiento = $5,
  valor = $6
WHERE id_seguro = $7;
