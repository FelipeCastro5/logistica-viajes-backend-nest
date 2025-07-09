INSERT INTO mensajes (
  fk_chat, pregunta, respuesta
)
VALUES (
  $1, $2, $3
)
RETURNING *;
