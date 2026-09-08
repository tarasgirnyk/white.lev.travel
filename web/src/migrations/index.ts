import * as migration_20260907_222716_initial from './20260907_222716_initial';

export const migrations = [
  {
    up: migration_20260907_222716_initial.up,
    down: migration_20260907_222716_initial.down,
    name: '20260907_222716_initial'
  },
];
