export const GENERATIONS = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Teselia',
  'Kalos',
  'Alola',
  'Galar',
] as const

export type Generation = (typeof GENERATIONS)[number]
