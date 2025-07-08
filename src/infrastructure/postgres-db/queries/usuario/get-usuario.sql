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

  -- Rol principal
  r1.id_rol AS id_rol,
  r1.nombre_rol AS rol,

  -- Contador (es otro usuario)
  uc.id_usuario AS fk_contador,
  uc.p_nombre AS contador_p_nombre,
  uc.p_apellido AS contador_p_apellido,
  r2.nombre_rol AS rol_contador

FROM 
  usuario u

-- Documento
LEFT JOIN tipodoc td ON u.fk_tipodoc = td.id_tipodoc

-- Rol principal
LEFT JOIN rol r1 ON u.fk_rol = r1.id_rol

-- Contador (es otro usuario con su propio rol)
LEFT JOIN usuario uc ON u.fk_contador = uc.id_usuario
LEFT JOIN rol r2 ON uc.fk_rol = r2.id_rol

WHERE 
  u.id_usuario = $1;
