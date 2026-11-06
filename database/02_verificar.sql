SELECT current_database() AS base, current_user AS usuario;
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
SELECT id, nombre, ciudad, aforo_maximo, fecha_creacion, fecha_modificacion, fecha_eliminacion
FROM recintos ORDER BY nombre;
SELECT id, id_recinto, titulo, estado, fecha_evento, fecha_eliminacion
FROM eventos_culturales ORDER BY fecha_evento;
