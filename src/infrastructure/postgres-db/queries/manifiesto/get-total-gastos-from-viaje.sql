SELECT COALESCE(SUM(gxv.valor), 0) AS total_gastos
FROM gastosxviaje gxv
JOIN viaje v ON gxv.fk_viaje = v.id_viaje
WHERE v.fk_manifiesto = (
  SELECT fk_manifiesto
  FROM viaje
  WHERE id_viaje = $1 
);
