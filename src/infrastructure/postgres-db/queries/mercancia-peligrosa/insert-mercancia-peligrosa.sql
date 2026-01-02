INSERT INTO mercancia_peligrosa (
  fk_remesa,
  codigo_un,
  grupo_riesgo,
  caracteristica_peligrosidad,
  embalaje_envase
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
