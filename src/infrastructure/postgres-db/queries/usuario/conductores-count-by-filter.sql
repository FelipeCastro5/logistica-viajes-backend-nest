SELECT COUNT(*) AS total
FROM usuario u
WHERE
  u.p_nombre ILIKE $1 OR
  u.s_nombre ILIKE $1 OR
  u.p_apellido ILIKE $1 OR
  u.s_apellido ILIKE $1 OR
  u.num_doc ILIKE $1 OR
  u.correo ILIKE $1;
