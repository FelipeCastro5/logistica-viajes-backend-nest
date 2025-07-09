UPDATE tipodoc
SET
  nombre_documento = $1,
  abreviatura = $2
WHERE id_tipodoc = $3
RETURNING *;
