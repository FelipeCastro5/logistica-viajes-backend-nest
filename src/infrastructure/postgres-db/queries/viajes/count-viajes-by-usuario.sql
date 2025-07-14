SELECT COUNT(*) AS total
FROM viaje
WHERE fk_usuario = $1;
