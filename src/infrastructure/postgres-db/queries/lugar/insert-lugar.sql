INSERT INTO lugar (nombre_lugar)
VALUES ($1)
RETURNING *;