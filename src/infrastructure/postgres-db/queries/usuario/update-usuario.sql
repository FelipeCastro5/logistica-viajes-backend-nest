UPDATE usuario
SET
  fk_tipodoc = $1,
  num_doc = $2,
  fk_rol = $3,
  fk_contador = $4,
  p_nombre = $5,
  s_nombre = $6,
  p_apellido = $7,
  s_apellido = $8,
  telefono = $9,
  correo = $10,
  contrasena = $11
WHERE id_usuario = $12
RETURNING *;
