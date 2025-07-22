SELECT m.*
FROM mensajes m
WHERE fk_chat = $1
ORDER BY m.fecha
LIMIT 5;
