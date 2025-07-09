INSERT INTO tipodoc (
  nombre_documento,
  abreviatura
)
VALUES (
  $1,
  $2
)
RETURNING *;
