import * as migration_20260823_140315_initial from './20260823_140315_initial'

export const migrations = [
  {
    up: migration_20260823_140315_initial.up,
    down: migration_20260823_140315_initial.down,
    name: '20260823_140315_initial',
  },
]
