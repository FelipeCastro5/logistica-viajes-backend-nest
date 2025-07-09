UPDATE chat
SET
  fk_usuario = $1,
  nombre_chat = $2
WHERE id_chat = $3
RETURNING *;
