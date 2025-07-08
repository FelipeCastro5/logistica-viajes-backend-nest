UPDATE rol
SET nombre_rol = $1
WHERE id_rol = $2
RETURNING *;
