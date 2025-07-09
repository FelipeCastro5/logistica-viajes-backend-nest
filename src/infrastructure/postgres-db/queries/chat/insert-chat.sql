INSERT INTO chat (
  fk_usuario,
  nombre_chat
)
VALUES (
  $1, $2
)
RETURNING *;
