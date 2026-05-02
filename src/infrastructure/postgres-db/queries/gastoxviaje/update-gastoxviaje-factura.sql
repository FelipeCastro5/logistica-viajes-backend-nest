UPDATE gastosxviaje
SET
  url_factura = $1,
  id_factura = $2
WHERE id_gastoxviaje = $3
RETURNING *;