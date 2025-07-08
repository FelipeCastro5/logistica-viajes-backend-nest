INSERT INTO rol (nombre_rol)
VALUES ($1)
RETURNING *;
