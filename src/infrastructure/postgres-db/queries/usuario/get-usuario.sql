SELECT 
  u.id_usuario,
  u.num_doc,
  u.p_nombre,
  u.s_nombre,
  u.p_apellido,
  u.s_apellido,
  u.telefono,
  u.correo,
  u.estado_usuario,

  -- Nombres legibles de las claves foráneas
  td.nombre_documento AS tipo_documento,
  td.abreviatura AS tipo_doc_abreviado,

  r1.nombre_rol AS rol,
  r2.nombre_rol AS contador

FROM 
  usuario u

LEFT JOIN tipodoc td ON u.fk_tipodoc = td.id_tipodoc
LEFT JOIN rol r1 ON u.fk_rol = r1.id_rol
LEFT JOIN rol r2 ON u.fk_contador = r2.id_rol

WHERE 
  u.id_usuario = $1;
