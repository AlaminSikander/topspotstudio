import * as migration_20261021_150424_initial_cms_schema from './20261021_150424_initial_cms_schema';
import * as migration_20261025_195558_media_storage_fields from './20261025_195558_media_storage_fields';

export const migrations = [
  {
    up: migration_20261021_150424_initial_cms_schema.up,
    down: migration_20261021_150424_initial_cms_schema.down,
    name: '20261021_150424_initial_cms_schema',
  },
  {
    up: migration_20261025_195558_media_storage_fields.up,
    down: migration_20261025_195558_media_storage_fields.down,
    name: '20261025_195558_media_storage_fields'
  },
];
