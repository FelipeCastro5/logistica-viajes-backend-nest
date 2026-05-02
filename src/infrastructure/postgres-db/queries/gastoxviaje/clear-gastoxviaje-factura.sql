UPDATE gastosxviaje
SET
  url_factura = NULL,
  id_factura = NULL
WHERE id_gastoxviaje = $1
RETURNING *;