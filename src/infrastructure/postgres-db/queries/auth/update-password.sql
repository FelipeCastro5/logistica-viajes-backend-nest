UPDATE usuario
SET
  contrasena = $1
WHERE id_usuario = $2
RETURNING *;
