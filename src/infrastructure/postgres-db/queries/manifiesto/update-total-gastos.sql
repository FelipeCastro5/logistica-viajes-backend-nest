UPDATE manifiesto
SET total_gastos = (
  SELECT SUM(gxv.valor)
  FROM gastosxviaje gxv
  JOIN viaje v ON gxv.fk_viaje = v.id_viaje
  WHERE v.fk_manifiesto = manifiesto.id_manifiesto
)
WHERE id_manifiesto = (
  SELECT fk_manifiesto
  FROM viaje
  WHERE id_viaje = $1
);
