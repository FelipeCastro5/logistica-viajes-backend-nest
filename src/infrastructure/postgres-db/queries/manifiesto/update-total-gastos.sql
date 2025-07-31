UPDATE manifiesto
SET 
  total_gastos = $2,
  queda_al_carro = saldo_a_pagar - $2,
  a_favor_del_carro = anticipo - $2
WHERE id_manifiesto = (
  SELECT fk_manifiesto
  FROM viaje
  WHERE id_viaje = $1
);
