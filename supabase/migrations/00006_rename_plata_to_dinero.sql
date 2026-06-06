-- Rename 'plata' to 'dinero' in all enums
-- PostgreSQL doesn't support renaming enum values directly, so we:
-- 1. Add new value 'dinero'
-- 2. Update all data
-- 3. Remove old value 'plata'

-- tipo_donacion
ALTER TYPE tipo_donacion ADD VALUE IF NOT EXISTS 'dinero' BEFORE 'especie';
UPDATE ong SET tipos_donacion_habilitados = array_replace(tipos_donacion_habilitados, 'plata', 'dinero') WHERE 'plata' = ANY(tipos_donacion_habilitados);

-- tipo_necesidad
ALTER TYPE tipo_necesidad ADD VALUE IF NOT EXISTS 'dinero' BEFORE 'especie';
UPDATE campania SET tipo_necesidad = 'dinero' WHERE tipo_necesidad = 'plata';

-- tipo_aporte
ALTER TYPE tipo_aporte ADD VALUE IF NOT EXISTS 'dinero' BEFORE 'especie';
UPDATE aporte SET tipo = 'dinero' WHERE tipo = 'plata';

-- tipo_objetivo
ALTER TYPE tipo_objetivo ADD VALUE IF NOT EXISTS 'dinero' BEFORE 'especie';
UPDATE objetivo_donante SET tipo = 'dinero' WHERE tipo = 'plata';

-- Update seed data
UPDATE ong SET tipos_donacion_habilitados = array_replace(tipos_donacion_habilitados, 'plata', 'dinero') WHERE 'plata' = ANY(tipos_donacion_habilitados);
UPDATE campania SET tipo_necesidad = 'dinero' WHERE tipo_necesidad = 'plata';
UPDATE aporte SET tipo = 'dinero' WHERE tipo = 'plata';
UPDATE objetivo_donante SET tipo = 'dinero' WHERE tipo = 'plata';

-- Note: We cannot drop the old 'plata' value from enums in PostgreSQL.
-- The old value will remain in the enum type but won't be used.
-- If you need to remove it, you'd need to create new enum types and migrate.
