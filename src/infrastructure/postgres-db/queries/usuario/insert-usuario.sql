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
