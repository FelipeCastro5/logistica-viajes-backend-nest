SELECT
  u.id_usuario,
  td.nombre_documento,
  td.abreviatura,
  u.num_doc,
  u.p_nombre,
  u.s_nombre,
  u.p_apellido,
  u.s_apellido,
  u.telefono,
  u.correo,
  u.estado_usuario,
  r.nombre_rol
FROM usuario u
LEFT JOIN tipodoc td ON u.fk_tipodoc = td.id_tipodoc
LEFT JOIN rol r ON u.fk_rol = r.id_rol
WHERE
  u.p_nombre ILIKE $1 OR
  u.s_nombre ILIKE $1 OR
  u.p_apellido ILIKE $1 OR
  u.s_apellido ILIKE $1 OR
  u.num_doc ILIKE $1 OR
  u.correo ILIKE $1
ORDER BY u.p_nombre, u.p_apellido
LIMIT $2 OFFSET $3;
