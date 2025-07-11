SELECT id_usuario, contrasena, fk_rol, p_nombre, p_apellido, correo
FROM usuario
WHERE correo = $1;
