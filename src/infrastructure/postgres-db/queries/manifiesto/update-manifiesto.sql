UPDATE manifiesto
SET
  fk_vehiculo = $1,
  flete_total = $2,
  porcentaje_retencion_fuente = $3,
  valor_retencion_fuente = $4,
  porcentaje_ica = $5,
  valor_ica = $6,
  deduccion_fiscal = $7,
  neto_a_pagar = $8,
  anticipo = $9,
  saldo_a_pagar = $10,
  total_gastos = $11,
  queda_al_carro = $12,
  a_favor_del_carro = $13,
  porcentaje_conductor = $14,
  ganancia_conductor = $15
WHERE id_manifiesto = $16
RETURNING *;
