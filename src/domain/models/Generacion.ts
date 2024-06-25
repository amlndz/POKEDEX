export const GENERATIONS = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'teselia',
  'kalos',
  'alola',
  'galar',
] as const

export type Generation = (typeof GENERATIONS)[number]
