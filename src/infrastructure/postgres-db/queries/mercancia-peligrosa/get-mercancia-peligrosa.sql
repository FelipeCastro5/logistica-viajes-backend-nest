SELECT
  id_mercancia,
  fk_remesa,
  codigo_un,
  grupo_riesgo,
  caracteristica_peligrosidad,
  embalaje_envase
FROM mercancia_peligrosa
WHERE id_mercancia = $1;