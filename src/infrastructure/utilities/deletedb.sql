-- Primero eliminamos las más dependientes (hijas)
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS chat CASCADE;
DROP TABLE IF EXISTS gastosxviaje CASCADE;
DROP TABLE IF EXISTS viaje CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;

-- Luego eliminamos las que referencian o son menos dependientes
DROP TABLE IF EXISTS usuario CASCADE;

-- Tablas base sin dependencias o ya liberadas
DROP TABLE IF EXISTS tipodoc CASCADE;
DROP TABLE IF EXISTS rol CASCADE;
DROP TABLE IF EXISTS lugar CASCADE;
DROP TABLE IF EXISTS gasto CASCADE;
DROP TABLE IF EXISTS manifiesto CASCADE;
