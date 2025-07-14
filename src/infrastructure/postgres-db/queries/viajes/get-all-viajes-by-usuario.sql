SELECT 
  v.id_viaje,
  v.codigo,
  v.producto,
  v.detalle_producto,
  v.direccion_llegada,
  v.observaciones,
  v.estado_viaje,
  v.fecha_salida,
  v.fecha_llegada,

  -- Usuario
  u.id_usuario,
  
  -- Cliente
  c.id_cliente,
  c.nombre_cliente,
  c.telefono AS telefono_cliente,

  -- Origen y destino
  origen.nombre_lugar AS nombre_origen,
  destino.nombre_lugar AS nombre_destino,

  -- Manifiesto
  m.flete_total,
  m.neto_a_pagar,
  m.saldo_a_pagar,
  m.total_gastos,
  m.queda_al_carro,
  m.ganacia_conductor

FROM viaje v
INNER JOIN usuario u ON v.fk_usuario = u.id_usuario
LEFT JOIN cliente c ON v.fk_cliente = c.id_cliente
LEFT JOIN lugar origen ON v.fk_origen = origen.id_lugar
LEFT JOIN lugar destino ON v.fk_destino = destino.id_lugar
LEFT JOIN manifiesto m ON v.fk_manifiesto = m.id_manifiesto

WHERE v.fk_usuario = $1;
