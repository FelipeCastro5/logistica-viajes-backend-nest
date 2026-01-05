INSERT INTO manifiesto (
  fk_vehiculo,
  flete_total, porcentaje_retencion_fuente, valor_retencion_fuente,
  porcentaje_ica, valor_ica, deduccion_fiscal, neto_a_pagar,
  anticipo, saldo_a_pagar, total_gastos, queda_al_carro,
  a_favor_del_carro, porcentaje_conductor, ganancia_conductor
)
VALUES (
  $1, $2, $3, $4, $5, $6, $7,
  $8, $9, $10, $11, $12,
  $13, $14, $15
)
RETURNING *;
