UPDATE mercancia_peligrosa
SET
  fk_remesa = $1,
  codigo_un = $2,
  grupo_riesgo = $3,
  caracteristica_peligrosidad = $4,
  embalaje_envase = $5
WHERE id_mercancia = $6;
