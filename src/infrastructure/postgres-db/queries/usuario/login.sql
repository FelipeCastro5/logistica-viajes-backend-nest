SELECT 
  u.id_usuario, 
  u.contrasena, 
  u.fk_rol, 
  r.nombre_rol,         -- <- este es el nombre del rol
  u.p_nombre, 
  u.p_apellido, 
  u.correo, 
  u.fk_contador
FROM usuario u
JOIN rol r ON u.fk_rol = r.id_rol
WHERE u.correo = $1;
