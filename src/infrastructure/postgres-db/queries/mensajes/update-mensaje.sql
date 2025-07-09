UPDATE mensajes
SET
  fk_chat = $1,
  pregunta = $2,
  respuesta = $3
WHERE id_mensaje = $4
RETURNING *;
