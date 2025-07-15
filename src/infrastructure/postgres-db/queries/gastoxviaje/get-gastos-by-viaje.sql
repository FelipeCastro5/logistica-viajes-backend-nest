SELECT 
  gxv.id_gastoxviaje,
  gxv.fk_viaje,
  gxv.valor,
  gxv.detalles,
  g.nombre_gasto
FROM 
  gastosxviaje gxv
JOIN 
  gasto g ON gxv.fk_gasto = g.id_gasto
WHERE 
  gxv.fk_viaje = $1;
