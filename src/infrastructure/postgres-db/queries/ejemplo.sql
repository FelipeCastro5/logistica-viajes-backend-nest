dame la query de esta tabla como estos ejemplos
DELETE FROM usuario WHERE id_usuario = $1;
SELECT * FROM usuario;
SELECT * FROM usuario WHERE id_usuario = $1;
INSERT INTO usuario (
  fk_tipodoc, num_doc, fk_rol, fk_contador,
  p_nombre, s_nombre, p_apellido, s_apellido,
  telefono, correo, contrasena
)
VALUES (
  $1, $2, $3, $4,
  $5, $6, $7, $8,
  $9, $10, $11
)
RETURNING *;
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