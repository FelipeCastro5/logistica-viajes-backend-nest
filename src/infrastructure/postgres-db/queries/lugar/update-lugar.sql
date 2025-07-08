UPDATE lugar
SET nombre_lugar = $1
WHERE id_lugar = $2
RETURNING *;