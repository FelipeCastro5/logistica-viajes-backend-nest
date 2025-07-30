-- update-total-gastos-manifiesto.sql
UPDATE manifiesto
SET total_gastos = $2
WHERE id_manifiesto = $1;
