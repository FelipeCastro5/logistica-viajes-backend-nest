UPDATE manifiesto
SET
  flete_total = $1,
  porcentaje_retencion_fuente = $2,
  valor_retencion_fuente = $3,
  porcentaje_ica = $4,
  valor_ica = $5,
  deduccion_fiscal = $6,
  neto_a_pagar = $7,
  anticipo = $8,
  saldo_a_pagar = $9,
  total_gastos = $10,
  queda_al_carro = $11,
  a_favor_del_carro = $12,
  porcentaje_conductor = $13,
  ganancia_conductor = $14
WHERE id_manifiesto = $15
RETURNING *;
