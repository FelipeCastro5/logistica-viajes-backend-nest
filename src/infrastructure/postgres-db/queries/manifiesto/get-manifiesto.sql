SELECT 
  m.*
FROM 
  viaje v
JOIN 
  manifiesto m ON v.fk_manifiesto = m.id_manifiesto
WHERE 
  v.id_viaje = $1;
